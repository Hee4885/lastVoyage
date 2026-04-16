import React from "react";
import './css/Home.css';
import { useNavigate } from "react-router-dom";
import letter from "./images/letter_button.png";

function Home() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userId = localStorage.getItem("userId"); //로그인 아이디 가져오기
    const navigator = useNavigate(); // 페이지 전환 함수

    return (
        <div className="container home">
            <h2>마지막 항해</h2>
            {
                isLoggedIn ? (
                    <div>
                        <p>id : {userId}</p>
                        
                        

                        <button
                            onClick={() => {
                                localStorage.removeItem("isLoggedIn"); // 로그인 상태 제거
                                alert("로그아웃 되었습니다!");
                                navigator("/"); // 홈으로 이동
                            }}
                        >
                            로그아웃하기
                        </button>

                        <img src={letter} onClick={()=>navigator("/explain")}/>
                    </div>
                ) : (
                    <button onClick={() => (window.location.href = "/login")}>
                        로그인/회원가입 하기
                    </button>
                )
            }
        </div>
    );
}

export default Home;