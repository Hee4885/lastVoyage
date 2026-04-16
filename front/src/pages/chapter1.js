import React, { useState, useEffect } from "react";
import './css/Chapter1.css';
import { useNavigate } from "react-router-dom";

function Chapter1() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [fadeOut, setFadeOut] = useState(false); // Chapter1 페이드아웃
  const [gameFadeIn, setGameFadeIn] = useState(false); // game1 fade-in
  const [index, setIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [alterMessage, setAlterMessage] = useState("");
  const [showAlterMessage, setShowAlterMessage] = useState(false);
  const [showStory, setShowStory] = useState(true);
  const [Favorability, setFavorability] = useState(0);
  const [showFavorability, setShowFavorability] = useState(false);
  const [showDialogues, setShowDialogues] = useState(false);
  const [dIndex, setDindex] = useState(0);

  const story = [
    "세상에서 가장 큰 배, 하지만 가장 외로운 마음들.",
    "호화로운 출항식, 음악이 울리고 카메라는 갑판을 가로지른다.",
    "3등석 데크 끝자락에서 잭은 스케치북을 손에 쥔 채 바다를 바라보고 있었다.",
    "그의 눈빛은 자유로웠지만, 그 자유는 가난의 다른 이름이었다.",
    "그때, 갑판 위로 붉은 모자를 쓴 여인이 다가온다.",
  ];

  const dialogues = [
    { speaker: "잭", text: "이런 세상도 있군요. 부자들의 천국이란 게." },
    { speaker: "로즈", text: "천국처럼 보여도, 벽은 감옥과 다르지 않아요." }
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (showStory) {
          if (index < story.length - 1) setIndex(prev => prev + 1);
          else {
            setShowStory(false);
            setShowDialogues(true);
          }
        } else if (showDialogues) {
          if (dIndex < dialogues.length - 1) setDindex(prev => prev + 1);
          else {
            setShowDialogues(false);
            setShowButtons(true);
            setShowFavorability(true);
          }
        }
      }

      if (event.key === "Enter") {
        // Chapter1 페이드아웃 후 game1 fade-in
        setFadeOut(true);
        setTimeout(() => setGameFadeIn(true), 1500); 
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [index, dIndex, showStory, showDialogues]);

  const handleChoice = (choice) => {
    let score = 0;

    if (choice === "postive") score = 10;
    else if (choice === "neutral") score = 0;
    else if (choice === "negative") score = -10;

    fetch("http://localhost:3001/favorability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, score })
    })
      .then(res => res.json())
      .then(data => {
        setFavorability(data.favorability);
        setAlterMessage(`호감도 : ${score >= 0 ? "+" : ""}${score}`);
        setShowAlterMessage(true);
        localStorage.setItem("favorability",score);
        setTimeout(() => setShowAlterMessage(false), 1500);
      })
      .catch(err => console.error(err));

    setTimeout(() => navigate("/chapter2"), 1500);
  };

  return (
    <div className="container c1">
      <div className={`container Chapter1 ${fadeOut ? "fade-out" : ""}`}>
        <h1>Chapter 1</h1>
        <h3>출항의 아침</h3>
        <p>스페이스바로 다음, 엔터로 페이드아웃</p>
      </div>

      <div className={`container game1 ${gameFadeIn ? "fade-in" : ""}`}>
        <p className={`f-score ${showFavorability ? "fade-in" : ""}`}>
          <img src={require("./images/f-score.png")} className="f-icon" alt="호감도 아이콘" />
          {Favorability}
        </p>

        <div className={`story-text ${showStory ? "" : "clear-story"}`}>
          {story[index]}
        </div>

        <div className={`dialogues-text ${showDialogues ? "" : "clear-dialogues"}`}>
          <strong>{dialogues[dIndex].speaker}</strong> : <br /><br />
          {dialogues[dIndex].text}
        </div>

        <div className={`select-button ${showButtons ? "fade-in" : ""}`}>
          <button onClick={() => handleChoice("postive")}>당신은 자유로워 보여요.</button>
          <button onClick={() => handleChoice("neutral")}>그럼 왜 그 안에 머물죠?</button>
          <button onClick={() => handleChoice("negative")}>부자들은 원래 그래요.</button>
          <button onClick={() => handleChoice("neutral")}>감옥이라도 아름답네요.</button>
        </div>

        {showAlterMessage && <div className="alert-box">{alterMessage}</div>}
      </div>
    </div>
  );
}

export default Chapter1;
