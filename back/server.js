const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./db"); // SQLite DB 연결

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// 서버 실행 라우트
app.get("/", (req, res) => {
    res.send("홈 페이지");
});

// 게임 설명
app.get("/explain", (req, res) => {
    res.send("게임 설명 페이지");
});

// 호감도 저장 및 업데이트
// POST /favorability
app.post("/favorability", (req, res) => {
    const { id, score } = req.body; // score만 보냄

    if (!id || typeof score !== "number") {
        return res.status(400).json({ error: "아이디와 점수를 보내야 합니다." });
    }


    // 기존 호감도에 누적
    const sqlUpdate = `UPDATE users SET favorability = COALESCE(favorability,0) + ? WHERE id = ?`;
    db.run(sqlUpdate, [score, id], function(err) {
        if (err) return res.status(500).json({ error: "호감도 저장 실패" });

        db.get(`SELECT favorability FROM users WHERE id = ?`, [id], (err, row) => {
            if (err) return res.status(500).json({ error: "호감도 조회 실패" });
            res.json({ favorability: row.favorability }); // 누적된 값 반환
        });
    });
});




// 호감도 불러오기
app.get("/favorability/:id", (req, res) => {
  const { id } = req.params;
  db.get(`SELECT favorability FROM users WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: "호감도 조회 실패" });
    if (!row) return res.status(404).json({ error: "사용자 없음" });
    res.json({ favorability: row.favorability ?? 0 });
  });
});



// 엔딩 컬렉션 불러오기
app.get("/endings/:userId", (req, res) => {
    const { userId } = req.params;
    db.get(`SELECT ending FROM users WHERE id = ?`, [userId], (err, row) => {
        if (err) return res.status(500).json({ error: "DB 조회 실패" });
        if (!row || !row.ending) return res.json({ endings: [] });
        const endings = row.ending.split(","); // 엔딩 여러 개 콤마로 구분
        res.json({ endings });
    });
});


// 회원가입 - 비밀번호는 bcrypt 해시로 저장
app.post("/signup", async (req, res) => {
    const { id, password } = req.body;

    if (!id || !password) {
        return res.status(400).json({ error: "아이디와 비밀번호를 모두 입력해주세요." });
    }

    try {
        const hashed = await bcrypt.hash(password, 10); // 평문 대신 해시 저장
        db.run(
            `INSERT INTO users (id, password) VALUES (?, ?)`,
            [id, hashed],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ error: "이미 존재하는 아이디 또는 오류 발생" });
                }
                res.status(200).json({ message: "회원가입 성공" });
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});

// 로그인 - 저장된 해시와 비교
app.post("/login", (req, res) => {
    const { id, password } = req.body;

    if (!id || !password) {
        return res.status(400).json({ error: "아이디와 비밀번호를 모두 입력해주세요." });
    }

    db.get(`SELECT password FROM users WHERE id = ?`, [id], async (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "서버 오류 발생" });
        }
        const ok = row && await bcrypt.compare(password, row.password);
        if (ok) {
            res.status(200).json({ message: "로그인 성공" });
        } else {
            // 아이디가 없는 경우와 비밀번호가 틀린 경우를 같은 메시지로 응답
            res.status(401).json({ error: "아이디나 비밀번호가 올바르지 않습니다." });
        }
    });
});

// 전체 유저 조회 - 비밀번호는 응답에서 제외
app.get("/users", (req, res) => {
    db.all(
        `SELECT id, favorability FROM users ORDER BY favorability DESC`,
        [],
        (err, rows) => {
            if (err) return res.status(500).json({ error: "DB 조회 오류" });
            res.json(rows);
        }
    );
});


// 404 처리 - JSON 반환
app.use((req, res) => {
    res.status(404).json({ error: "페이지를 찾을 수 없습니다." });
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버 실행 중 : http://localhost:${PORT}`);
});
