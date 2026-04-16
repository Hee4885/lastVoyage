import React, { useState, useEffect } from "react";
import './css/Chapter2.css';
import { useNavigate } from "react-router-dom";

function Chapter2() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [fadeOut, setFadeOut] = useState(false); // Chapter2 페이드아웃
  const [gameFadeIn, setGameFadeIn] = useState(false); // game2 fade-in
  const [index, setIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [alterMessage, setAlterMessage] = useState("");
  const [showAlterMessage, setShowAlterMessage] = useState(false);
  const [showStory, setShowStory] = useState(true);
  const [Favorability, setFavorability] = useState(Number(localStorage.getItem("favorability")??0));
  const [showDialogues, setShowDialogues] = useState(false);
  const [dIndex, setDindex] = useState(0);

  const story = [
    "밤바람이 차갑게 스친다. 로즈는 난간에 몸을 기댄다.",
    "그녀의 손끝이 위태롭게 흔들릴 때 잭이 다가와 조용히 손을 붙든다."
  ];

  const dialogues = [
    { speaker: "잭", text: "가끔, 세상이 너무 커서 내 자리가 없다고 느껴요." },
    { speaker: "로즈", text: "나도 그래요. 하지만 당신은 적어도 자유롭잖아요." }
  ];

  const choices = [
    { text: "자유는 가진 게 없을 때만 가능한 거예요.", score: 10 },
    { text: "당신도 자유로워질 수 있어요.", score: 15 },
    { text: "별이 떨어지면 소원을 빌어요.", score: 5 },
    { text: "감상은 사치죠.", score: -10 }
  ];

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
      // Chapter2 페이드아웃 후 game2 fade-in
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
          localStorage.setItem("favorability",newScore);
          return newScore;
        });
        setTimeout(() => setShowAlterMessage(false), 1500);
      })
      .catch(err => console.error(err));

    setTimeout(() => navigate("/chapter3"), 1500);
  };

  return (
    <div className="container c2">
      <div className={`container Chapter2 ${fadeOut ? "fade-out" : ""}`}>
        <h1>Chapter 2</h1>
        <h3>별빛 아래에서</h3>
        <p>스페이스바로 다음, 엔터로 페이드아웃</p>
      </div>

      <div className={`container game2 ${gameFadeIn ? "fade-in" : ""}`}>
        <p className={`f-score fade-in`}>
          <img src={require("./images/f-score.png")} className="f-icon" alt="호감도 아이콘"/>
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

export default Chapter2;
