import React, { useState, useEffect } from "react";
import './css/Chapter5.css';
import { useNavigate } from "react-router-dom";

function Chapter5() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [fadeOut, setFadeOut] = useState(false); // Chapter 화면 fade-out
  const [gameFadeIn, setGameFadeIn] = useState(false); // game 화면 fade-in
  const [index, setIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [alterMessage, setAlterMessage] = useState("");
  const [showAlterMessage, setShowAlterMessage] = useState(false);
  const [showStory, setShowStory] = useState(true);
  const [Favorability, setFavorability] = useState(Number(localStorage.getItem("favorability")??0));
  const [showDialogues, setShowDialogues] = useState(false);
  const [dIndex, setDindex] = useState(0);

  const story = [
    "물은 빠르게 차오르고, 사람들의 비명이 뒤섞인다.",
    "로즈의 손이 잭의 팔을 붙잡는다."
  ];

  const dialogues = [
    { speaker: "로즈", text: "이게 끝인가요?" },
    { speaker: "잭", text: "아니요. 우린 아직 살아 있어요." }
  ];

  const choices = [
    { text: "당신과 함께면, 어디든 갈 수 있어요.", score: 10 },
    { text: "당신이 먼저 가요.", score: 5 },
    { text: "모두를 도와야 해요.", score: 0 },
    { text: "우리 죽을 거예요, 그렇죠?", score: -5 }
  ];

  // 초기 호감도 불러오기
  useEffect(() => {
    fetch(`http://localhost:3001/favorability/${userId}`)
      .then(res => res.json())
      // .then(data => setFavorability(data.favorability || 0))
      .catch(err => console.error(err));
  }, [userId]);

  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      if (showStory) {
        if (index < story.length - 1) setIndex(prev => prev + 1);
        else { setShowStory(false); setShowDialogues(true); }
      } else if (showDialogues) {
        if (dIndex < dialogues.length - 1) setDindex(prev => prev + 1);
        else { setShowDialogues(false); setShowButtons(true); }
      }
    }

    if (event.key === "Enter") {
      setFadeOut(true);
      setTimeout(() => setGameFadeIn(true), 1500);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [index, dIndex, showStory, showDialogues]);

  const handleChoice = (score) => {
    fetch("http://localhost:3001/favorability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, score })
    })
      .then(res => res.json())
      .then(data => {
        // setFavorability(data.favorability);
        setAlterMessage(`호감도 : ${score >= 0 ? "+" : ""}${score}`);
        setShowAlterMessage(true);
        setFavorability(prev => {
          const newScore = prev + score;
          localStorage.setItem("favorability",newScore)
          return newScore;
        });
        setTimeout(() => setShowAlterMessage(false), 1500);
      })
      .catch(err => console.error(err));

    setTimeout(() => navigate("/chapter6"), 1500);
  };

  return (
    <div className="container c5">
      <div className={`container Chapter5 ${fadeOut ? "fade-out" : ""}`}>
        <h1>Chapter 5</h1>
        <h3>균열</h3>
        <p>스페이스바로 다음, 엔터로 페이드아웃</p>
      </div>

      <div className={`container game5 ${gameFadeIn ? "fade-in" : ""}`}>
        <p className="f-score fade-in">
          <img src={require("./images/f-score.png")} className="f-icon" alt="호감도 아이콘" />
          {Favorability}
        </p>

        <div className={`story-text ${showStory ? "" : "clear-story"}`}>{story[index]}</div>

        <div className={`dialogues-text ${showDialogues ? "" : "clear-dialogues"}`}>
          <strong>{dialogues[dIndex].speaker}</strong> : <br /><br /> {dialogues[dIndex].text}
        </div>

        <div className={`select-button ${showButtons ? "fade-in" : ""}`}>
          {choices.map((c, i) => (
            <button key={i} onClick={() => handleChoice(c.score)}>{c.text}</button>
          ))}
        </div>

        {showAlterMessage && <div className="alert-box">{alterMessage}</div>}
      </div>
    </div>
  );
}

export default Chapter5;
