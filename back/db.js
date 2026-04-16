// DB 연결 및 테이블 생성 코드

const sqlite3 = require("sqlite3").verbose();

// user.db가 없으면 자동 생성됨
const db = new sqlite3.Database("./user.db", (err) => {
    if (err) console.error("DB 연결 오류 :", err);
    else console.log("DB 연결 성공");
});

// 유저 테이블 생성(id, password)

db.run(`
        CREATE TABLE IF NOT EXISTS users 
        (
            id TEXT PRIMARY KEY,
            password TEXT NOT NULL
        )
     `);


// 게임 불러오기 table

// 호감도 저장 (필요한가?)

module.exports = db;