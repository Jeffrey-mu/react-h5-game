import GameCard from '@/components/game/Card'
import { useFetch } from '@/lib/utils'
import { groupByDatePara, groupByDate, groupByDateReturn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import "@/style/index.css"
import { Button } from '@/components/ui/button'
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
export const host = window.location.host
// export  const GameSeriesPath = 'http://' + host
export  const GameSeriesPath = 'http://localhost:3230'
// export const GameSeriesPath = 'http://101.43.206.247:3230'
function Game() {
  const [data, setData] = useState<groupByDateReturn[]>([])
  const [addGame, setAddGame] = useState<string>('')
  const [gameName, setGameName] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [open, setOpen] = useState(false)
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
        url: addGame,
        name: gameName,
        imageUrl: imageUrl
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
    <div className="container mx-auto px-4 py-6">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between pb-4 border-b">
          <h1 className="text-3xl font-bold text-primary">游戏库</h1>
          {host !== '101.43.206.247:3230' && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mr-2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  添加游戏
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    添加新游戏
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    请填写游戏的详细信息
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="url" className="text-right font-medium">
                      游戏链接
                    </Label>
                    <Input
                      id="url"
                      placeholder="输入游戏下载链接"
                      value={addGame}
                      onChange={(e) => setAddGame(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right font-medium">
                      游戏名称
                    </Label>
                    <Input
                      id="name"
                      placeholder="输入游戏名称"
                      value={gameName}
                      onChange={(e) => setGameName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right font-medium">
                      封面图片
                    </Label>
                    <Input
                      id="image"
                      placeholder="输入图片URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="submit" 
                    onClick={handleAdd}
                    className="w-full sm:w-auto"
                  >
                    确认添加
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] pr-4 mt-6">
        <div className="space-y-8">
          {data.map((item) => (
            <Card key={item.date} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary">
                  {item.date}
                </h2>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {item.items.length} 个游戏
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {item.items.map((game) => (
                  <GameCard value={game} key={game.folderName} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <Toaster />
    </div>
  )
}

export default Game
