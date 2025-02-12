import React, { createContext, useContext, useState, useEffect } from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    points: 0,
    completedStories: [],
    badges: [],
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem("progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem("progress", JSON.stringify(newProgress));
  };

  const addPoints = (points) => {
    updateProgress({ ...progress, points: progress.points + points });
  };

  const completeStory = (storyId) => {
    if (!progress.completedStories.includes(storyId)) {
      updateProgress({
        ...progress,
        completedStories: [...progress.completedStories, storyId],
      });
    }
  };

  const awardBadge = (badgeId) => {
    if (!progress.badges.includes(badgeId)) {
      updateProgress({
        ...progress,
        badges: [...progress.badges, badgeId],
      });
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, addPoints, completeStory, awardBadge }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};