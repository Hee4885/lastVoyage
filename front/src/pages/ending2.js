import React, { useState, useEffect } from "react";
import './css/Ending.css';
import { useNavigate } from "react-router-dom";
import endingImg from './images/ending2.png'; 


function Ending2() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);

  const stories = [
    "둘은 차가운 파도 속에서도 서로의 손을 놓지 않는다.",
    "사랑과 운명을 함께하며 끝을 맞이한다."
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
<div className="container ending2">
  {/* 배경 이미지 */}
  <div className="background-img" style={{ backgroundImage: `url(${endingImg})` }} />

  {!showStory && (
    <div className={`initial ${fadeOut ? "fade-out" : ""}`}>
      <h1>Ending 2</h1>
      <h3>함께한 죽음</h3>
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

export default Ending2;
