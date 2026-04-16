import React, {useEffect, useState} from "react";
import './css/Users.css';


function Users() {
    const [users, setUsers] = useState([]);

    // useEffect : 처음 컨포넌트가 나타날 때 실행하는 함수
    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then((res) => res.json()) //서버에서 json 형태로 응답 받음
            .then((data) => setUsers(data)); //받아온 데이터를 users에 저장
    },[]);

    return(
        <div className="container users">
            <h2>회원 목록</h2>
            <ul>
                {
                //배열 반복
                users.map((user) => (
                    //React 필수 속성 -> key = {user.id} 
                    <li key={user.id}>{user.id} - 점수: {user.favorability ?? 0}</li>
                ))
                }                
            </ul>

        </div>
    );
}


export default Users;

/* 배열 반복 예시
const newArray = users.map(user => user.id);
console.log(newArray); // ["alice", "bob"]

-------

users = [
  { id: "alice", password: "1234" },
  { id: "bob", password: "5678" }
]
users.map 실행 결과:

jsx
코드 복사
[
  <li key="alice">alice</li>,
  <li key="bob">bob</li>
]
JSX에 넣으면:

html
코드 복사
<ul>
  <li>alice</li>
  <li>bob</li>
</ul>


*/