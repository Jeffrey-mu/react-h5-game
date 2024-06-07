import {
  Card,
  CardContent,
} from '@/components/ui/card'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

import type { groupByDatePara } from '@/lib/utils'
import { GameSeriesPath } from '@/pages/Game'
interface GameCardrops {
  value: groupByDatePara
}
export default function GameCard({ value }: GameCardrops) {
  return (
    <>
      <Card className="game-card">
        <CardContent className='px-3 py-3'>
          <Drawer onOpenChange={(isOpen) => {
            document.title = isOpen ? value.folderName.replace('.apps.minigame.vip', '') : 'H5自研游戏'
          }}>
            <DrawerTrigger asChild>
              <div>
                <img
                  className='m-auto rounded-lg'
                  src={`https://res.minigame.vip/gc-assets/${value.folderName.replace('.apps.minigame.vip', '')}/${value.folderName.replace('.apps.minigame.vip', '')}_icon.png`}
                  alt=""
                  width="100"
                  height="100"
                />
                {value.folderName.replace('.apps.minigame.vip', '')}
              </div>
            </DrawerTrigger>
            <DrawerContent className='h-[90%]'>
              <iframe src={`${GameSeriesPath}/games/${value.folderName}/index.html`} className="play_box" />
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    </>
  )
}
