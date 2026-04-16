import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/EndingCollection.css';
import ending1Img from "./images/ending1.png";
import ending2Img from "./images/ending2.png";
import ending3Img from "./images/ending3.png";
import ending4Img from "./images/ending4.png";

function EndingCollection() {
  const navigate = useNavigate();
  const [endingList, setEndingList] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);

  const endingImages = {
    Ending1: ending1Img,
    Ending2: ending2Img,
    Ending3: ending3Img,
    Ending4: ending4Img
  };

  useEffect(() => {
    const endings = JSON.parse(localStorage.getItem("endings") || "[]");
    setEndingList(endings);
  }, []);

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      setFadeOut(true);
      setTimeout(() => navigate("/"), 1500);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, []);

  return (
    <div className="ending-collection-container">
      <div className={`collection ${fadeOut ? "fade-out" : ""}`}>
        <h1>Ending Collection</h1>
        <div className="ending-grid">
          {endingList.length > 0 ? (
            endingList.map((ending, idx) => (
              <div key={idx} className="ending-card" onClick={() => navigate(`/${ending.toLowerCase()}`)}>
                <img src={endingImages[ending]} alt={ending} />
                <div className="ending-title">{ending}</div>
              </div>
            ))
          ) : (
            <p>아직 획득한 엔딩이 없습니다.</p>
          )}
        </div>
        <p>엔터를 눌러 메인으로 돌아가기</p>
      </div>
    </div>
  );
}

export default EndingCollection;
