import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./Izindatshana.css"

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
  const audioPlayer = useRef(null)
  const speechRef = useRef(null)

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
    <div className="container">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card">
          <div className="card-header">
            <h1 className="card-title">
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
            </h1>
          </div>
          <div className="card-content">
            <AnimatePresence>
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="loading"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    className="spinner"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="story-content"
                >
                  <div className="story-display">
                    <p>{displayedText || "Preview the story to start reading..."}</p>
                  </div>

                  <div className="controls">
                    <audio
                      src={paid ? audioFull : audioPreview}
                      ref={audioPlayer}
                      onPlay={() => {
                        setIsPlaying(true)
                        handleAudioProgress()
                      }}
                      onPause={() => setIsPlaying(false)}
                      onTimeUpdate={handleAudioProgress}
                    />

                    <div className="audio-controls">
                      <button onClick={skipBackward} className="control-button">
                        ⏪
                      </button>
                      <button onClick={togglePlayPause} className="control-button">
                        {isPlaying ? "⏸️" : "▶️"}
                      </button>
                      <button onClick={skipForward} className="control-button">
                        ⏩
                      </button>
                    </div>

                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    {!paid && !previewShown && (
                      <button onClick={showPreview} className="preview-button">
                        Preview Story for 5 Seconds
                      </button>
                    )}

                    {paid && (
                      <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="enjoy-message">
                        🎉 Enjoy the full story! 🎉
                      </motion.p>
                    )}

                    <div className="reading-controls">
                      <button onClick={startReading} className="reading-button">
                        🗣️ Read Story Aloud
                      </button>
                      <button onClick={stopReading} className="reading-button">
                        🤫 Stop Reading
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="error-message">
                      <p>
                        <strong>Oops!</strong> {error}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Izindatshana

