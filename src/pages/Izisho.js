import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button"; // Adjust path as needed
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Play, Pause } from "lucide-react";

const proverbs = [
  {
    izisho: "Umuntu ngumuntu ngabantu",
    meaning: "A person is a person through other people",
    options: [
      "A person is a person through other people",
      "Every man for himself",
      "The early bird catches the worm",
      "Actions speak louder than words",
    ],
    correctAnswer: 0,
    audioUrl: "/placeholder.mp3",
  },
  {
    izisho: "Izandla ziyagezana",
    meaning: "Hands wash each other",
    options: [
      "Cleanliness is next to godliness",
      "Two heads are better than one",
      "Hands wash each other",
      "Practice makes perfect",
    ],
    correctAnswer: 2,
    audioUrl: "/placeholder.mp3",
  },
  {
    izisho: "Inkomo ingazala umuntu",
    meaning: "A cow may give birth to a human",
    options: [
      "Expect the unexpected",
      "Like father, like son",
      "Don't count your chickens before they hatch",
      "A cow may give birth to a human",
    ],
    correctAnswer: 3,
    audioUrl: "/placeholder.mp3",
  },
];

export default function IzishoIzagaQuiz() {
  const [currentProverbIndex, setCurrentProverbIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentProverb = proverbs[currentProverbIndex];

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === currentProverb.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
  };

  const handleNext = () => {
    setCurrentProverbIndex((prevIndex) => (prevIndex + 1) % proverbs.length);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsPlaying(false);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-pink-300 to-cyan-300 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-purple-400"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl border-4 border-purple-400 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-purple-600">
            Izisho/Izaga Fun Quiz!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div key={currentProverbIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-2xl font-semibold text-center mb-4 text-blue-600">{currentProverb.izisho}</div>
            <div className="flex justify-center mb-4">
              <Button onClick={toggleAudio} className="bg-yellow-400 hover:bg-yellow-500 text-purple-700 text-xl rounded-full p-6">
                {isPlaying ? <Pause className="mr-2 h-6 w-6" /> : <Play className="mr-2 h-6 w-6" />}
                {isPlaying ? "Pause" : "Play"} Sound
              </Button>
              <audio ref={audioRef} src={currentProverb.audioUrl} onEnded={() => setIsPlaying(false)} />
            </div>
            <RadioGroup value={selectedAnswer?.toString()} onChange={(value) => setSelectedAnswer(Number.parseInt(value))} className="space-y-4">
              {currentProverb.options.map((option, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 p-4 rounded-2xl bg-purple-300">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} className="sr-only" />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer text-xl font-semibold text-white">
                    {option}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
            {isCorrect === null ? (
              <Button onClick={handleSubmit} className="w-full text-2xl py-6 bg-purple-500 hover:bg-purple-600 text-white rounded-full">
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} className="w-full text-2xl py-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                Next
              </Button>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
