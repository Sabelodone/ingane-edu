import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import "./Izinganekwane.css"; // Ensure the correct path to your CSS file

const izinganekwane = [
  {
    title: "Umlando KaZulu",
    content: "Umlando kaZulu ungumlando omkhulu...",
    color: "bg-red-400",
    icon: "🦁",
  },
  {
    title: "Uthando Lwenkosi",
    content: "Uthando Lwenkosi lwenziwa uMvelinqangi...",
    color: "bg-blue-400",
    icon: "🐘",
  },
  {
    title: "Uhlanga",
    content: "Uhlanga lwenziwe ngomoya...",
    color: "bg-green-400",
    icon: "🌳",
  },
  {
    title: "Izingane Zethu",
    content: "Izingane zethu ziwumsebenzi wethu...",
    color: "bg-yellow-400",
    icon: "👧🏾",
  },
  {
    title: "Ukuphila Kwesizwe",
    content: "Ukuphila kwesizwe kubalulekile...",
    color: "bg-purple-400",
    icon: "🏠",
  },
];

const Izinganekwane = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.unload();
      }
    };
  }, []);

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    if (audioRef.current) {
      audioRef.current.unload();
    }
    audioRef.current = new Howl({
      src: [`/audio/${story.title.toLowerCase().replace(/ /g, "-")}.mp3`], // Ensure correct path
      html5: true,
      onend: () => setIsPlaying(false),
      onload: () => setDuration(audioRef.current.duration()),
      onplay: () => {
        requestAnimationFrame(updateProgress);
      },
    });
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.mute(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const playSound = (soundFile) => {
    const sound = new Howl({
      src: [soundFile],
      html5: true,
    });
    sound.play();
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    playSound("/MALOME VECTOR & SANNERE - HAE BOHLA [r9kqPtA4H-4].mp3");
  };
  

  const updateProgress = () => {
    if (audioRef.current?.playing()) {
      setProgress(audioRef.current.seek());
      requestAnimationFrame(updateProgress);
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.seek(newTime);
      setProgress(newTime);
    }
  };

  const fastForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.seek() + 5, duration);
      audioRef.current.seek(newTime);
      setProgress(newTime);
    }
  };

  const rewind = () => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.seek() - 5, 0);
      audioRef.current.seek(newTime);
      setProgress(newTime);
    }
  };

  return (
    <div className={`izinganekwane-container ${isDarkMode ? "dark" : ""}`}>
      <div className="content-wrapper">
        <div className="header">
          <motion.h1
            className="title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Izinganekwane ZikaZulu
          </motion.h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!selectedStory ? (
            <motion.div
              key="story-list"
              className="story-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {izinganekwane.map((story, index) => (
                <motion.div
                  key={index}
                  className={`story-card ${story.color}`}
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playSound("/audio/pop.mp3");
                    handleStoryClick(story);
                  }}
                >
                  <span className="story-icon">{story.icon}</span>
                  <h2 className="story-title">{story.title}</h2>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="story-content"
              className={`story-content ${selectedStory.color}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="story-header">
                <h2 className="story-title">{selectedStory.title}</h2>
                <span className="story-icon">{selectedStory.icon}</span>
              </div>
              <div className="story-scroll-area">
                <p className="story-text">{selectedStory.content}</p>
              </div>
              <div className="story-controls">
                <div className="audio-controls">
                  <button className="audio-button" onClick={togglePlayPause}>
                    {isPlaying ? "⏸️" : "▶️"}
                  </button>
                  <button className="audio-button" onClick={toggleMute}>
                    {isMuted ? "🔇" : "🔊"}
                  </button>
                  <button className="audio-button" onClick={rewind}>
                    ⏪
                  </button>
                  <button className="audio-button" onClick={fastForward}>
                    ⏩
                  </button>
                </div>
                <div
                  ref={progressRef}
                  className="progress-bar"
                  onClick={handleProgressClick}
                >
                  <div
                    className="progress"
                    style={{ width: `${(progress / duration) * 100}%` }}
                  ></div>
                </div>
                <button
                  className="back-button"
                  onClick={() => {
                    playSound("/audio/whoosh.mp3");
                    setSelectedStory(null);
                    if (audioRef.current) {
                      audioRef.current.stop();
                      setIsPlaying(false);
                    }
                  }}
                >
                  ← Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Izinganekwane;
