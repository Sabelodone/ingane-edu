import React, { useState } from "react"

const SoundEffect = ({ children, soundUrl }) => {
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio(soundUrl) : null)

  const handleClick = (e) => {
    e.preventDefault()
    if (audio) {
      audio.currentTime = 0
      audio.play()
    }
    if (e.currentTarget instanceof HTMLAnchorElement) {
      setTimeout(() => {
        window.location.href = e.currentTarget.href
      }, 200)
    }
  }

  return <span onClick={handleClick}>{children}</span>
}

export default SoundEffect

