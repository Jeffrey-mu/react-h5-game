import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

import type { groupByDatePara } from '@/lib/utils';
import { GameSeriesPath } from '@/pages/Game';
interface GameCardrops {
  value: groupByDatePara;
}
export default function GameCard({ value }: GameCardrops) {
  return (
    <>
      <Card className="game-card">
        <CardContent className='px-3 py-3'>
          <Drawer>
            <DrawerTrigger asChild>
              <div>
                <img
                  className='m-auto rounded-lg'
                  src={`${GameSeriesPath}/s-assets/H5-1/${value.folderName}.png`}
                  alt=""
                  width="100"
                  height="100"
                />
                {value.folderName.replace('.apps.minigame.vip', '')}
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <iframe src={`${GameSeriesPath}/games/${value.folderName}/index.html`} className="play_box" />
            </DrawerContent>
          </Drawer>
        </CardContent>
      </Card>
    </>
  );
}
