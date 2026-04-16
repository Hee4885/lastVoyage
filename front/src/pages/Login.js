import React, { useState } from "react"; // state : 컴포넌트 안에 변하는 데이터 (입력값, 버튼 클릭 수 , 로그인 여부 등)
import './css/Login.css';
import letter_explain from './images/letter_explain.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";


function Login() {
    // id → 현재 아이디 입력값
    // setId → 아이디 값을 바꾸는 버튼 같은 역할
    // "" → 초기값, 아무것도 안 쓴 상태

    // 배열 구조 분해 
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const togglePasswordVisibility = () =>{
        setShowPassword((prev) => !prev);
    };

    // 버튼 클릭 등 이벤트에서 호출 되는 함수 (async는 서버와 통신 시 비동기 처리)
    const handleLogin = async () => {
        //id와 password 입력 유무 확인
        if (!id || !password) {
            setResult("아이디와 비밀번호를 모두 입력해주세요.");
            return; //서버 요청 중단
        }


        // fetch 는 서버에 http 요청
        const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, password }),
        });

        // response.json() : 서버에서 온 json 형식 데이터 읽기
        const data = await response.json();

        // setResult() : 상태 업데이트 -> 화면에 결과 표시 가능
        setResult(data.message || data.error);

        if (data.message === "로그인 성공") {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userId", id);

            alert("로그인 성공!");
            navigate("/"); //페이지 이동
        }
    };

    return (
        <div className="container login">
            <h2>로그인</h2>
            <h4>당신의 이름과 암호를 입력하세요</h4>
            <input
                value={id}
                onChange={(e) => setId(e.target.value)} // 아이디 값 바꾸기
                placeholder="아이디 입력"
            />

            <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                required
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            <button onClick={handleLogin}>로그인하기</button>
            <button onClick={() => navigate("/signup")}>
                회원가입 하러가기
            </button>
            <p>{result}</p>
           <img src={letter_explain} alt="편지" className="letter-image" />
            
        </div>
    );
}

export default Login;