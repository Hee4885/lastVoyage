import React, { useState, useEffect } from "react";
import './css/Chapter4.css';
import { useNavigate } from "react-router-dom";

function Chapter4() {
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
    "배 밑바닥에서 희미한 충격음이 들린다.",
    "사람들은 웃음을 멈추지 않지만, 금속의 울림은 점점 커진다."
  ];

  const dialogues = [
    { speaker: "로즈", text: "무슨 소리죠?" },
    { speaker: "잭", text: "얼음산에 닿은 것 같아요. 하지만 걱정 말아요, 곧 정리될 거예요." }
  ];

  const choices = [
    { text: "괜찮아요, 당신이 있어서.", score: 10 },
    { text: "아무 일 없을 거예요.", score: 5 },
    { text: "불길한 예감이 들어요.", score: 0 },
    { text: "제발 그냥 가요.", score: -10 }
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
          const newScore = score + prev;
          localStorage.setItem("favorability",newScore);
          return newScore
        });
        setTimeout(() => setShowAlterMessage(false), 1500);
      })
      .catch(err => console.error(err));

    setTimeout(() => navigate("/chapter5"), 1500);
  };

  return (
    <div className="container c4">
      <div className={`container Chapter4 ${fadeOut ? "fade-out" : ""}`}>
        <h1>Chapter 4</h1>
        <h3>불안한 진동</h3>
        <p>스페이스바로 다음, 엔터로 페이드아웃</p>
      </div>

      <div className={`container game4 ${gameFadeIn ? "fade-in" : ""}`}>
        <p className="f-score fade-in">
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

export default Chapter4;
