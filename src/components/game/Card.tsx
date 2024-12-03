import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { GameSeriesPath } from '@/pages/Game'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface GameCardProps {
  value: {
    folderName: string
  }
}

function GameCard({ value }: GameCardProps) {
  const [imgSrc, setImgSrc] = useState<string>('/game-placeholder.png')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (value.folderName) {
      const img = new Image()
      img.src = `${GameSeriesPath}/s-assets/H5-1/${value.folderName}.png`
      img.onload = () => {
        setImgSrc(`${GameSeriesPath}/s-assets/H5-1/${value.folderName}.png`)
        setIsLoading(false)
      }
      img.onerror = () => {
        setImgSrc('/game-placeholder.png')
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [value.folderName])

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card className="group overflow-hidden transition-all hover:shadow-lg cursor-pointer">
          <CardContent className="p-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={imgSrc}
                alt={value.folderName}
                className={cn(
                  "object-cover w-full h-full transition-transform duration-300 group-hover:scale-110",
                  "duration-300 ease-in-out",
                  isLoading && "blur-sm"
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium">
                    Play
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                {value.folderName}
              </h3>
            </div>
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="h-[90%]">
        <iframe 
          src={`${GameSeriesPath}/games/${value.folderName}/index.html`} 
          className="w-full h-full border-none"
        />
      </DrawerContent>
    </Drawer>
  )
}

export default GameCard
