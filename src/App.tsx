import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GameCard from '@/components/game/Card';
import { useFetch } from '@/lib/utils';
import { groupByDatePara, groupByDate, groupByDateReturn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import "@/style/index.css"
function App() {
  const [data, setData] = useState<groupByDateReturn[]>([])
  useEffect(() => {
    // useFetch('http://101.43.206.247:3230/game-files/list').then(res => {
    // @ts-ignore
    useFetch<groupByDatePara[]>('http://101.43.206.247:3230/game-files/list').then(res => {
      setData(groupByDate(res.data))
    }, [])
  })
  return (
    <>
      <Header />
      <div className="container">
        {data.map((item) => (
          <div key={item.date}>
            <>
              <div key={item.date}>
                <h2 className="my-3 font-black text-2xl">{item.date}</h2>
                <div className="game-list flex flex-wrap gap-3">
                  {item.items.map((game) => (
                    <GameCard value={game} key={game.folderName} />
                  ))}
                </div>
              </div>
            </>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}

export default App
