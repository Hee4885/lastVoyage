import React, { useState, useEffect } from "react";
import './css/Chapter3.css';
import { useNavigate } from "react-router-dom";

function Chapter3() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [fadeOut, setFadeOut] = useState(false); // Chapter3 페이드아웃
  const [gameFadeIn, setGameFadeIn] = useState(false); // game3 fade-in
  const [index, setIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [alterMessage, setAlterMessage] = useState("");
  const [showAlterMessage, setShowAlterMessage] = useState(false);
  const [showStory, setShowStory] = useState(true);
  const [Favorability, setFavorability] = useState(Number(localStorage.getItem("favorability")??0));
  const [showDialogues, setShowDialogues] = useState(false);
  const [dIndex, setDindex] = useState(0);

  const story = [
    "3등석의 선창에서 연회가 벌어지고 있다.",
    "웃음소리, 바이올린, 그리고 자유로운 발걸음.",
    "잭은 조심스레 손을 내민다."
  ];

  const dialogues = [
    { speaker: "잭", text: "이 세상에서 단 한 번이라도, 당신이 진짜로 웃을 수 있다면… 그걸로 충분해요." }
  ];

  const choices = [
    { text: "그럼요. 오늘만큼은, 나도 웃을래요.", score: 20 },
    { text: "이건 미친 짓이에요.", score: -10 },
    { text: "누가 보든 상관없어요.", score: 10 },
    { text: "음악이 우리를 부르네요.", score: 5 }
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

    setTimeout(() => navigate("/chapter4"), 1500);
  };

  return (
    <div className="container c3">
      <div className={`container Chapter3 ${fadeOut ? "fade-out" : ""}`}>
        <h1>Chapter 3</h1>
        <h3>춤의 초대</h3>
        <p>스페이스바로 다음, 엔터로 페이드아웃</p>
      </div>

      <div className={`container game3 ${gameFadeIn ? "fade-in" : ""}`}>
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

export default Chapter3;
