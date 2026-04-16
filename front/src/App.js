import React from "react";
// BrowerRouter : url 연동해서 페이지 바꾸는 라우터
// Routes : 여러 Route를 묶어서 관리
// Route : url과 보여줄 컴포넌트 연결
// Home, SignUp, Login : 각 페이지 컴포넌트
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import Explain from "./pages/Explain";
import EndingCollection from "./pages/EndingCollection";

import Chapter1 from "./pages/chapter1";
import Chapter2 from "./pages/chapter2";
import Chapter3 from "./pages/chapter3";
import Chapter4 from "./pages/chapter4";
import Chapter5 from "./pages/chapter5";
import Chapter6 from "./pages/chapter6";

import Ending1 from "./pages/ending1";
import Ending2 from "./pages/ending2";
import Ending3 from "./pages/ending3";
import Ending4 from "./pages/ending4";
// import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home />}/>
        <Route path = "/login" element={<Login />}/>
        <Route path = "/signup" element={<SignUp />}/>      
        <Route path = "/users" element={<Users />}/>      
        <Route path="/explain" element={<Explain />} />
        <Route path="/endingCollection" element={<EndingCollection />} />

        <Route path="/chapter1" element={<Chapter1 />} />
        <Route path="/chapter2" element={<Chapter2 />} />
        <Route path="/chapter3" element={<Chapter3 />} />
        <Route path="/chapter4" element={<Chapter4 />} />
        <Route path="/chapter5" element={<Chapter5 />} />
        <Route path="/chapter6" element={<Chapter6 />} />

        <Route path="/ending1" element={<Ending1 />} />
        <Route path="/ending2" element={<Ending2 />} />
        <Route path="/ending3" element={<Ending3 />} />
        <Route path="/ending4" element={<Ending4 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
