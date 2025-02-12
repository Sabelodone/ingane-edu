import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button"; // Update this path based on where Button is located
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"; // Update this path too
import { Play, Pause, ChevronRight, ChevronLeft, VolumeIcon as VolumeUp } from "lucide-react";

const sounds = [
  { letter: "bh", example: "bheka", meaning: "look", color: "bg-red-400", audioUrl: "/Oakdene Park Drive 3.m4a" },
  { letter: "dl", example: "dlala", meaning: "play", color: "bg-blue-400", audioUrl: "/dl-sound.mp3" },
  { letter: "hl", example: "hlala", meaning: "sit", color: "bg-green-400", audioUrl: "/hl-sound.mp3" },
  { letter: "kh", example: "khuluma", meaning: "speak", color: "bg-yellow-400", audioUrl: "/kh-sound.mp3" },
  { letter: "ng", example: "ngena", meaning: "enter", color: "bg-purple-400", audioUrl: "/ng-sound.mp3" },
  { letter: "ny", example: "nyama", meaning: "meat", color: "bg-pink-400", audioUrl: "/ny-sound.mp3" },
  { letter: "ph", example: "pheka", meaning: "cook", color: "bg-indigo-400", audioUrl: "/ph-sound.mp3" },
  { letter: "sh", example: "shaya", meaning: "hit", color: "bg-teal-400", audioUrl: "/sh-sound.mp3" },
];

const ImisindoComponent = () => {
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const audioRef = useRef(null);

  const currentSound = sounds[currentSoundIndex];

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSound = () => {
    setCurrentSoundIndex((prevIndex) => (prevIndex + 1) % sounds.length);
    setIsPlaying(false);
    setShowMeaning(false);
  };

  const prevSound = () => {
    setCurrentSoundIndex((prevIndex) => (prevIndex - 1 + sounds.length) % sounds.length);
    setIsPlaying(false);
    setShowMeaning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-300 via-pink-300 to-yellow-300 flex items-center justify-center p-4 overflow-hidden">
      {/* Decorative shapes */}
      <motion.div
        className="absolute top-10 right-10 w-24 h-24 rounded-full bg-green-400"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-36 h-36 rounded-lg bg-blue-400"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl border-4 border-purple-400 shadow-2xl">
        <CardHeader>
          <CardTitle
            className="text-4xl font-bold text-center text-purple-600"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          >
            Imisindo (Sounds) Adventure!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSoundIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div
                className={`text-7xl font-bold text-center mb-4 ${currentSound.color} text-white p-8 rounded-full w-48 h-48 mx-auto flex items-center justify-center`}
              >
                {currentSound.letter}
              </div>
              <div
                className="text-3xl font-semibold text-center mb-4 text-purple-600"
                style={{ fontFamily: "'Comic Sans MS', cursive" }}
              >
                Example: {currentSound.example}
              </div>
              <motion.div
                className="text-2xl text-center mb-4 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: showMeaning ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                Meaning: {showMeaning ? currentSound.meaning : "???"}
              </motion.div>
              <div className="flex justify-center space-x-4 mb-4">
                <Button
                  onClick={toggleAudio}
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-700 text-xl rounded-full p-6 transform transition-transform duration-200 hover:scale-110"
                >
                  {isPlaying ? <Pause className="mr-2 h-6 w-6" /> : <Play className="mr-2 h-6 w-6" />}
                  {isPlaying ? "Pause" : "Play"} Sound
                </Button>
                <Button
                  onClick={() => setShowMeaning(!showMeaning)}
                  className="bg-pink-400 hover:bg-pink-500 text-white text-xl rounded-full p-6 transform transition-transform duration-200 hover:scale-110"
                >
                  <VolumeUp className="mr-2 h-6 w-6" />
                  {showMeaning ? "Hide" : "Show"} Meaning
                </Button>
                <audio ref={audioRef} src={currentSound.audioUrl} onEnded={() => setIsPlaying(false)} />
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={prevSound}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xl rounded-full p-6 transform transition-transform duration-200 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={nextSound}
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
  );
};

export default ImisindoComponent;
