import GameCard from '@/components/game/Card';
import { useFetch } from '@/lib/utils';
import { groupByDatePara, groupByDate, groupByDateReturn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import "@/style/index.css"
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
export const host = window.location.host
export  const GameSeriesPath = 'http://' + host
// export const GameSeriesPath = 'http://101.43.206.247:3230'
function Game() {
  const [data, setData] = useState<groupByDateReturn[]>([])
  const [addGame, setAddGame] = useState<string>('')
  const [open, setOpen] = useState(false);
  const { toast } = useToast()


  function getGameList() {
    useFetch<groupByDatePara[]>(`${GameSeriesPath}/game-files/list`).then(res => {
      setData(groupByDate(res.data))
    })
  }
  useEffect(() => {
    // @ts-ignore
    getGameList()
  }, [])

  function handleAdd() {
    useFetch(`${GameSeriesPath}/game-files/create-local-game-dir`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: addGame
      })
    }).then(res => {
      const data = {
        // @ts-ignore
        title: res.status === 200 ? "添加成功！" : "添加失败！",
        // @ts-ignore
        description: res.message,
      }
      toast(data)
      // @ts-ignore
      if (res.status === 200) {
        setOpen(false)
        getGameList()
      }
    })

  }
  return (
    <>
      {host !== '101.43.206.247:3230' ?
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">添加游戏</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  添加游戏
                </DialogTitle>
                <DialogDescription>
                  请复制游戏链接 URL
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    URL
                  </Label>
                  <Input id="name" value={addGame} onChange={(e) => setAddGame(e.target.value)} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAdd}>提交</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Toaster /></> : <></>}
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
    </>
  )
}

export default Game
