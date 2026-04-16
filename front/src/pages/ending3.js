import React, { useState, useEffect } from "react";
import './css/Ending.css';
import { useNavigate } from "react-router-dom";
import endingImg from './images/ending3.png'; 


function Ending3() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);

  const stories = [
    "잭만 살아남고, 로즈는 구조되지 않는다.",
    "호감도는 높지만, 씁쓸한 결말이 남는다."
  ];

  useEffect(() => {
    const handleEnter = (event) => {
      if (event.key === "Enter") {
        setFadeOut(true);
        setTimeout(() => setShowStory(true), 1500);
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, []);

  useEffect(() => {
    const handleSpace = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (storyIndex < stories.length - 1) setStoryIndex(prev => prev + 1);
        else navigate("/endingCollection");
      }
    };
    window.addEventListener("keydown", handleSpace);
    return () => window.removeEventListener("keydown", handleSpace);
  }, [storyIndex, stories.length, navigate]);

  return (
    <div className="container ending3">
      <div className="background-img" style={{ backgroundImage: `url(${endingImg})` }} />      
      {!showStory && (
            <div className={`initial ${fadeOut ? "fade-out" : ""}`}>
          <h1>Ending 3</h1>
          <h3>잭만 살아남음</h3>
        </div>
      )}

      {showStory && (
        <div className="container story-page">
          <div className="story-text">{stories[storyIndex]}</div>
        </div>
      )}
    </div>
  );
}

export default Ending3;
