import React, { useState, useEffect } from "react";
import './css/Ending.css';
import { useNavigate } from "react-router-dom";
import endingImg from './images/ending4.png';

function Ending4() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);

  const stories = [
    "둘 다 살아남지만 서로 멀리 떨어져 구조를 기다린다.",
    "묘한 감정과 아련한 여운을 남긴 채 각자의 길을 걷는다."
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
    <div className="ending4-wrapper">
      {/* 배경 이미지 */}
      <div className="background-img" style={{ backgroundImage: `url(${endingImg})` }} />

      {!showStory && (
        <div className={`initial ${fadeOut ? "fade-out" : ""}`}>
          <h1>Ending 4</h1>
          <h3>둘 다 살아남음</h3>
        </div>
      )}

      {showStory && (
        <div className="story-page">
          <div className="story-text">{stories[storyIndex]}</div>
        </div>
      )}
    </div>

  );
}

export default Ending4;
