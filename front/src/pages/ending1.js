import React, { useState, useEffect } from "react";
import './css/Ending.css';
import { useNavigate } from "react-router-dom";
import endingImg from './images/ending1.png';


function Ending1() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);

  const stories = [
    "잭은 결국 사랑하는 로즈를 살리기 위해 찬 바다에 머물기로 한다.",
    "로즈는 구조선에 올라 잭을 떠올리며 아련한 그리움을 느낀다."
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
    <div className="ending-wrapper">
      {/* 배경 이미지 */}
      <div className="background-img" style={{ backgroundImage: `url(${endingImg})` }} />

      {/* 초기 화면 */}
      {!showStory && (
        <div className={`initial ${fadeOut ? "fade-out" : ""}`}>
          <h1>Ending 1</h1>
          <h3>로즈만 살아남음</h3>
        </div>
      )}

      {/* 스토리 페이지 */}
      {showStory && (
        <div className="story-page">
          <div className="story-text">{stories[storyIndex]}</div>
        </div>
      )}
    </div>

  );
}

export default Ending1;
