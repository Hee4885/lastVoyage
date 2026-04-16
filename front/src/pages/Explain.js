import React from "react";
import './css/Explain.css';
import letter_explain from './images/letter_explain.png';
import { useNavigate } from "react-router-dom";

function Explain() {
    const explain = 
    `
    <strong>타이타닉의 마지막 밤,</strong><br>
    당신은 그들의 기억 속 항해에 함께합니다.<br>
    두 사람의 웃음과 흔들림, 망설임 속에서 당신은 선택을 내리게 됩니다.<br><br>

    <strong>선택 하나가 신뢰와 관계를 바꿉니다</strong>.<br><br>

    어떤 선택은 희망을, 어떤 선택은 차가운 물결을 남깁니다.<br>
    <strong>Enter</strong>로 대화를 넘기고, 마음이 이끄는 대답을 선택하세요.<br>
    모든 결정은 바다 위에 남아, 영원히 이야기를 흐르게 합니다.
    `;

    // const [slideIndex, setSlideIndex] = useState(0); // 현재 설명 페이지
    // const [lineIndex, setLineIndex] = useState(0); // 현재 문장

    const userId = localStorage.getItem("userId");
    const navigator = useNavigate();

  return (
    <div className="container explain">
      
      <img src={letter_explain} alt="편지" className="letter-image" />

      <p id="dear"><strong>Dear. {userId}</strong></p>

      <p><strong>타이타닉의 마지막 밤,</strong></p>
      <p>당신은 그들의 기억 속 항해에 함께합니다.</p>
      <p>두 사람의 웃음과 흔들림, 망설임 속에서 당신은 선택을 내리게 됩니다.</p>

      <p><strong>선택 하나가 신뢰와 관계를 바꿉니다.</strong></p>

      <p>어떤 선택은 희망을, 어떤 선택은 차가운 물결을 남깁니다.</p>
      <p><strong>ENTER</strong> 로 대화를 넘기고, 마음이 이끄는 대답을 선택하세요.</p>
      <p>모든 결정은 바다 위에 남아, 영원히 이야기를 흐르게 합니다.</p>

      <p id="exit" onClick={()=> navigator("/")}><strong>EXIT</strong></p>
      
      {/* 게임 시작 */}
      <p id="start" onClick={()=> navigator("/chapter1")}><strong>START</strong></p>


    </div>
  );
}

export default Explain;
