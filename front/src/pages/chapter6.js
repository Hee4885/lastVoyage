import React, { useState, useEffect } from "react";
import './css/Chapter6.css';
import { useNavigate } from "react-router-dom";

function Chapter6() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [fadeOut, setFadeOut] = useState(false);
  const [gameFadeIn, setGameFadeIn] = useState(false);
  const [alterMessage, setAlterMessage] = useState("");
  const [showAlterMessage, setShowAlterMessage] = useState(false);
  const [favorability, setFavorability] = useState(Number(localStorage.getItem("favorability") ?? 0));
  const [sceneIndex, setSceneIndex] = useState(0);

  const scenes = [
    { type: "story", text: "“찬 바다와 따뜻한 손끝, 그 온도차가 사랑이었다.”\n구명정은 거의 없다.\n잭은 로즈를 부둣가 쪽으로 이끌며 조용히 말한다." },
    { type: "dialogue", speaker: "잭", text: "당신은 살아야 해요. 약속해줘요.." },
    { type: "dialogue", speaker: "로즈", text: "당신 없이 어떻게요?" },
    {
      type: "choice", options: [
        { text: "난 괜찮아요. 당신이 살아야 해요.", score: 15 },
        { text: "우리 함께라면 괜찮아요.", score: 10 }
      ]
    },
    { type: "story", text: "“한 명만 더.”\n구조원의 외침.\n잭은 마지막 구명정을 바라보다, 로즈를 본다." },
    { type: "dialogue", speaker: "잭", text: "이제 선택할 시간이야." },
    { type: "dialogue", speaker: "로즈", text: "무슨 선택을 말하는 거예요?" },
    {
      type: "choice", options: [
        { text: "운명이라면 받아들일래요.", score: 5 },
        { text: "이건 끝이에요.", score: -10 },
        { text: "조금만 더 기다릴래요.", score:0},
        { text: "잭, 부디 살아서 만나요..", score:5}
      ]
    }
  ];

  // 서버에서 기존 호감도 불러오기
  useEffect(() => {
    fetch(`http://localhost:3001/favorability/${userId}`)
      .then(res => res.json())
      // .then(data => setFavorability(data.favorability || 0))
      .catch(err => console.error(err));
  }, [userId]);

  // 스페이스바로 다음 장면
  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      const current = scenes[sceneIndex];
      if (current.type !== "choice" && sceneIndex < scenes.length - 1) {
        setSceneIndex(prev => prev + 1);
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
  }, [handleKeyPress]);


  const handleChoice = (score, choiceText) => {
    const finalScore = favorability + score;
    setFavorability(finalScore);
    setAlterMessage(`호감도 : ${score >= 0 ? "+" : ""}${score}`);
    setShowAlterMessage(true);

    setTimeout(() => {
      setShowAlterMessage(false);

      // 현재 씬 직접 가져오기 (useState 값 최신 반영)
      const current = scenes[sceneIndex];
      const isLastChoice = current.type === "choice" && sceneIndex === scenes.length - 1;

      if (isLastChoice) {
        let endingPath = "";

        if (finalScore < 60) {
          endingPath = "/ending4";
        } else {
          if (choiceText === "이건 끝이에요.") endingPath = "/ending4";
          else if (choiceText === "운명이라면 받아들일래요.") endingPath = "/ending2";
          else if (choiceText === "조금만 더 기다릴래요.") endingPath = "/ending3";
          else if (choiceText === "잭, 부디 살아서 만나요..") endingPath = "/ending1";
        }

        console.log("navigate to:", endingPath);


        // 엔딩 저장
        /*
        로컬스토리지에서 기존 엔딩 목록(endings)을 불러와, 
        새 엔딩 경로를 형식에 맞게 바꾼 뒤 중복이 없으면 추가하고, 다시 문자열로 저장합니다.
        */
        const endings = JSON.parse(localStorage.getItem("endings") || "[]");
        if (!endings.includes(endingPath.replace("/", "").replace("ending", "Ending"))) {
          endings.push(endingPath.replace("/", "").replace("ending", "Ending"));
          localStorage.setItem("endings", JSON.stringify(endings));
        }

        // 호감도 초기화
        localStorage.setItem("favorability", 0);

        setFadeOut(true);
        setTimeout(() => navigate(endingPath), 1500);
      } else {
        setSceneIndex(prev => prev + 1);
      }
    }, 1000);
  };



  const currentScene = scenes[sceneIndex];

  return (
    <div className="container c6">
      <div className={`container Chapter6 ${fadeOut ? "fade-out" : ""}`}>
        <h1>Chapter 6</h1>
        <h3>어둠의 속삭임</h3>
        <p>스페이스바로 다음, 엔터로 페이드아웃</p>
      </div>

      <div className={`container game6 ${gameFadeIn ? "fade-in" : ""}`}>
        <p className="f-score fade-in">
          <img src={require("./images/f-score.png")} className="f-icon" alt="호감도 아이콘" />
          {favorability}
        </p>

        {currentScene.type === "story" && <div className="story-text">{currentScene.text}</div>}

        {currentScene.type === "dialogue" && (
          <div className="dialogues-text">
            <strong>{currentScene.speaker}</strong> : <br /><br />
            {currentScene.text}
          </div>
        )}

        {currentScene.type === "choice" && (
          <div className="select-button fade-in">
            {currentScene.options.map((c, idx) => (
              <button key={idx} onClick={() => handleChoice(c.score, c.text)}>
                {c.text}
              </button>
            ))}
          </div>
        )}

        {showAlterMessage && <div className="alert-box">{alterMessage}</div>}
      </div>
    </div>
  );
};

export default Chapter6;
