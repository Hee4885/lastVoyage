import React,{useState} from "react";
import './css/SignUp.css';
import letter_explain from './images/letter_explain.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";


function SignUp() {
    const [id,setId] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () =>{
        setShowPassword((prev) => !prev);
    };

    const navigate = useNavigate()
    


    const handleSignUp = async () => {
        const response = await fetch("http://localhost:3001/signup", {
            method : "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({id,password}),
        });

        const data = await response.json();
        setResult(data.message || data.error);

        if(data.message === "회원가입 성공"){
            localStorage.setItem("isSignUp","true");
            alert("회원가입 성공!");
            navigate("/login");
        }
    };

    return (
        <div className="container signup">
            <h2>회원가입</h2>
            <h4>당신이 사용할 이름과 암호를 입력하세요</h4>

            <input
                value={id}
                onChange={(e) => setId(e.target.value)}
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

            <button onClick={handleSignUp}>회원가입하기</button>

            <button onClick={ () => navigate("/login")}>로그인 하러가기</button>
       
            <p>{result}</p>
        
            <img src={letter_explain} alt="편지" className="letter-image" />
        
        </div>
    );
}

export default SignUp;


// 첫 화면 만들기
// 게임 시작화면 만들기(동화이름 나오고 책 아이콘 누르면 스토리 진행)