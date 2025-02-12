import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Play, Pause, ChevronRight, ChevronLeft } from "lucide-react"

const vowels = [
  { letter: "a", example: "amanzi", meaning: "water", color: "bg-red-400", audioUrl: "/a-sound.mp3" },
  { letter: "e", example: "ekhaya", meaning: "home", color: "bg-blue-400", audioUrl: "/e-sound.mp3" },
  { letter: "i", example: "isibhamu", meaning: "gun", color: "bg-green-400", audioUrl: "/i-sound.mp3" },
  { letter: "o", example: "ubaba", meaning: "father", color: "bg-yellow-400", audioUrl: "/o-sound.mp3" },
  { letter: "u", example: "umama", meaning: "mother", color: "bg-purple-400", audioUrl: "/u-sound.mp3" },
]

export default function OnkamisaComponent() {
  const [currentVowelIndex, setCurrentVowelIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const currentVowel = vowels[currentVowelIndex]

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const nextVowel = () => {
    setCurrentVowelIndex((prevIndex) => (prevIndex + 1) % vowels.length)
    setIsPlaying(false)
  }

  const prevVowel = () => {
    setCurrentVowelIndex((prevIndex) => (prevIndex - 1 + vowels.length) % vowels.length)
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 via-yellow-300 to-cyan-300 flex items-center justify-center p-4 overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-green-400"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 rounded-lg bg-blue-400"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl border-4 border-pink-400 shadow-2xl">
        <CardHeader>
          <CardTitle
            className="text-4xl font-bold text-center text-pink-600"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          >
            Onkamisa (Vowels) Fun!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVowelIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div
                className={`text-9xl font-bold text-center mb-4 ${currentVowel.color} text-white p-8 rounded-full w-40 h-40 mx-auto flex items-center justify-center`}
              >
                {currentVowel.letter}
              </div>
              <div
                className="text-2xl font-semibold text-center mb-4 text-purple-600"
                style={{ fontFamily: "'Comic Sans MS', cursive" }}
              >
                Example: {currentVowel.example}
              </div>
              <div className="text-xl text-center mb-4 text-gray-600">Meaning: {currentVowel.meaning}</div>
              <div className="flex justify-center space-x-4 mb-4">
                <Button
                  onClick={toggleAudio}
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-700 text-xl rounded-full p-6 transform transition-transform duration-200 hover:scale-110"
                >
                  {isPlaying ? <Pause className="mr-2 h-6 w-6" /> : <Play className="mr-2 h-6 w-6" />}
                  {isPlaying ? "Pause" : "Play"} Sound
                </Button>
                <audio ref={audioRef} src={currentVowel.audioUrl} onEnded={() => setIsPlaying(false)} />
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={prevVowel}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xl rounded-full p-6 transform transition-transform duration-200 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={nextVowel}
                  className="bg-green-500 hover:bg-green-600 text-white text-xl rounded-full p-6 transform transition-transform duration-200 hover:scale-110"
                >
                  Next
                  <ChevronRight className="h-6 w-6 ml-2" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
