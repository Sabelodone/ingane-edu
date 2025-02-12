"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "./button"
import { Progress } from "./components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { motion, AnimatePresence } from "framer-motion"

const Izindatshana = () => {
  const [story, setStory] = useState("")
  const [audioPreview, setAudioPreview] = useState("")
  const [audioFull, setAudioFull] = useState("")
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [previewShown, setPreviewShown] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioPlayer = useRef<HTMLAudioElement>(null)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    fetchStory()
  }, [])

  const fetchStory = async () => {
    setLoading(true)
    try {
      const storyText = `Isisho Sezinkanyezi

Ekhaya elincane elisemaphandleni aphakeme, lapho izintaba ezinkulu zikhukhuleka khona, kwakukhona ibali elidumile ngendawo ethokomele, eyayiwumgibeli wehlathi elithokozisayo elingaphezulu kwezintaba. Lezi zindawo zazihlala zikhanya ngombala owakhayo, zinezakhiwo eziluhlaza ezithokozisayo.

Abahlali bendawo babekhuluma ngalezi zinkanyezi ezithokozisayo ezazivela emithini. Izihlahla zazikhuluma ngama-secrets, zisho imiyalezo emikhulu nezifundo ezikhanyayo. Kwakukhona izihlahla ezincane eziphakamisayo izinyawo zazo, ezazingenamikhawulo, futhi zibhalela ezinkanyezi, futhi zazizolile, zikhalela ezindabeni zomhlaba.

Kwakukhona intombazane encane, uThandi, owayethanda kakhulu leli hlathi. Ngenkathi abanye bebazama ukuhamba kude, uThandi wayekwazi ukuhamba ngezinyawo ezithokozisayo, azibophezele kulolu hlobo lwenkanyezi. Wayelalela izimfihlo ezazizwakala phakathi kwezihlahla, futhi wayekwazi ukuhlangana nezilwane ezazihamba zodwa.

Ngelinye ilanga, ngesikhathi elingaka phakathi kwezihlahla, uThandi wahlangana nephupho. Ukhanya komoya kwazisa ukuba izinto ezinhle zikhona, bese ezifihla kuzo. Ihlathi laqala ukuchichima ngezakhiwo ezithokozisayo. Lokhu kwaba isikhathi sokuhlola, lapho uThandi ehamba phakathi kwezihlahla, edinga izimfihlo ezikhanyayo.`
      setStory(storyText)

      // Set sample audio URLs for testing
      setAudioPreview("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")
      setAudioFull("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3")
    } catch (err) {
      setError("Error loading the story. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const showPreview = () => {
    setPreviewShown(true)
    setDisplayedText(story.substring(0, 100) + "...")
    setTimeout(() => {
      setPaid(true)
      setDisplayedText("")
    }, 5000)
  }

  const handleAudioProgress = () => {
    if (audioPlayer.current) {
      const currentTime = audioPlayer.current.currentTime
      const totalDuration = audioPlayer.current.duration
      if (isPlaying && totalDuration > 0) {
        const percentage = (currentTime / totalDuration) * 100
        setProgress(percentage)
        const charsToDisplay = Math.floor((currentTime / totalDuration) * story.length)
        setDisplayedText(story.substring(0, charsToDisplay))
      }
    }
  }

  const startReading = () => {
    if (speechRef.current) {
      window.speechSynthesis.cancel()
    }
    const utterance = new SpeechSynthesisUtterance(story)
    utterance.lang = "zu-ZA"
    speechRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const stopReading = () => {
    window.speechSynthesis.cancel()
  }

  const togglePlayPause = () => {
    if (audioPlayer.current) {
      if (isPlaying) {
        audioPlayer.current.pause()
      } else {
        audioPlayer.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const skipForward = () => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime += 10
    }
  }

  const skipBackward = () => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime -= 10
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-purple-200 to-pink-200 min-h-screen">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white p-6">
            <CardTitle className="text-4xl font-bold text-center">
              <motion.span
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ yoyo: Number.POSITIVE_INFINITY, duration: 0.6 }}
              >
                🌟
              </motion.span>{" "}
              Izindaba Ezimfishane{" "}
              <motion.span
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ yoyo: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.3 }}
              >
                📚
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <AnimatePresence>
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-64"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-yellow-100 p-4 rounded-2xl h-64 overflow-y-auto border-4 border-yellow-300">
                    <p className="text-lg text-gray-800">{displayedText || "Preview the story to start reading..."}</p>
                  </div>

                  <div className="space-y-4">
                    <audio
                      src={paid ? audioFull : audioPreview}
                      ref={audioPlayer}
                      onPlay={() => {
                        setIsPlaying(true)
                        handleAudioProgress()
                      }}
                      onPause={() => setIsPlaying(false)}
                      onTimeUpdate={handleAudioProgress}
                      className="hidden"
                    />

                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={skipBackward}
                        variant="outline"
                        size="icon"
                        className="bg-blue-400 hover:bg-blue-500 text-white rounded-full w-12 h-12"
                      >
                        ⏪
                      </Button>
                      <Button
                        onClick={togglePlayPause}
                        variant="outline"
                        size="icon"
                        className="bg-green-400 hover:bg-green-500 text-white rounded-full w-12 h-12"
                      >
                        {isPlaying ? "⏸️" : "▶️"}
                      </Button>
                      <Button
                        onClick={skipForward}
                        variant="outline"
                        size="icon"
                        className="bg-blue-400 hover:bg-blue-500 text-white rounded-full w-12 h-12"
                      >
                        ⏩
                      </Button>
                    </div>

                    <Progress value={progress} className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                        style={{ width: `${progress}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </Progress>

                    {!paid && !previewShown && (
                      <Button
                        onClick={showPreview}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                      >
                        Preview Story for 5 Seconds
                      </Button>
                    )}

                    {paid && (
                      <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-center text-green-600 font-bold text-xl"
                      >
                        🎉 Enjoy the full story! 🎉
                      </motion.p>
                    )}

                    <div className="flex justify-center space-x-4">
                      <Button
                        onClick={startReading}
                        variant="secondary"
                        className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-full"
                      >
                        🗣️ Read Story Aloud
                      </Button>
                      <Button
                        onClick={stopReading}
                        variant="secondary"
                        className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-full"
                      >
                        🤫 Stop Reading
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"
                      role="alert"
                    >
                      <p className="font-bold">Oops!</p>
                      <p>{error}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Izindatshana

