import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import FeatureModal from "../components/FeatureModal"
import AnimatedCharacter from "../components/AnimatedCharacter"
import LoadingScreen from "../components/LoadingScreen"
import SoundEffect from "../components/SoundEffect"
import { useTheme } from "../components/ThemeContext"

const features = [
  {
    id: "short-stories",
    title: "Izindatshana",
    description: "Funda izindaba ezimnandi ezizokhuthaza izingane zakho.",
    icon: "📚",
  },
  { id: "izinganekwane", title: "Izinganekwane", description: "Izinsomi ezikhuluma ngempilo nezingane.", icon: "🧚" },
  {
    id: "ukuphicaphica",
    title: "Ukuphicaphica",
    description: "Thola ukuphicaphica okuhle nezifundo ezinzulu.",
    icon: "🧩",
  },
  {
    id: "izisho",
    title: "Izisho/Nezaga",
    description: "Izisho ezinamandla nezaga ezizokhuthaza izingane.",
    icon: "💬",
  },
  { id: "onkamisa", title: "Onkamisa", description: "Amathiphu nezindlela zokuphila.", icon: "🌈" },
  {
    id: "imisindo",
    title: "Imisindo",
    description: "Izinsizakalo ezithokozisayo ezizokwenza izingane zifunde.",
    icon: "🎵",
  },
]

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  const getThemeClasses = () => {
    switch (theme) {
      case "space":
        return "from-indigo-900 to-purple-900"
      case "underwater":
        return "from-blue-400 to-teal-500"
      case "jungle":
        return "from-green-400 to-green-700"
      default:
        return "from-blue-400 to-blue-600"
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getThemeClasses()}`}>
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative z-10"
          >
            <h1 className="text-7xl font-bold mb-4 text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
                Ingane Edu
              </span>
            </h1>
            <p className="text-3xl mb-8 text-white">Hlangana nokuphicaphica okujabulisayo nezingane</p>
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Button
                asChild
                size="lg"
                className="bg-accent text-white hover:bg-accent-hover font-bold text-2xl px-12 py-6 rounded-full shadow-lg transform transition hover:scale-105"
              >
                <Link to="/signup">
                  <SoundEffect soundUrl="/sounds/signup.mp3">Qala Mahhala</SoundEffect>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
       
        </section>

        <section className="mb-16">
          <h2 className="text-5xl font-bold mb-12 text-center text-white">Izici Zethu Eziyingqayizivele</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white rounded-2xl overflow-hidden border-4 border-accent"
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <CardContent className="p-6">
                      <motion.div
                        className="text-6xl mb-4"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2 text-primary">{feature.title}</h3>
                      <p className="text-secondary">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section className="mb-16">
          <motion.div
            className="bg-accent rounded-3xl p-12 text-white text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400 to-pink-500 opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-6">Qala Uhambo Lwakho Namuhla!</h2>
              <p className="text-2xl mb-8">
                Joyina namuhla ukuze uthole izindaba eziningi, imisebenzi, kanye nokufunda okuningi!
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-accent hover:bg-gray-100 font-bold text-2xl px-12 py-6 rounded-full shadow-lg transform transition hover:scale-105"
              >
                <Link to="/signup">
                  <SoundEffect soundUrl="/sounds/signup.mp3">Bhalisela Mahhala</SoundEffect>
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

        <AnimatedCharacter />
      </main>

      <FeatureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} feature={selectedFeature} />
    </div>
  )
}

export default Home
  