# Last Voyage (LAST-VOYAGE)

React + Express.js + SQLite로 만든 타이타닉 바탕 스토리 진행형 게임.  
회원가입/로그인 → 멀티 스토리 진행 → 캐릭터 호감도 시스템 → 멀티 엔딩을 제공하는 학생 팀 프로젝트.

---

## 한 줄 요약

React(Frontend) + Express.js(Backend) + SQLite 기반 인터랙티브 비주얼 노벨 게임 — 회원 인증, 선택지 분기 게임플레이, 캐릭터 호감도 시스템 및 멀티 엔딩 수집 구현.

---

## 주요 기능

- **회원 관리** (회원가입, 로그인)
- **선택지 기반 스토리 진행** (플레이어 선택에 따른 분기)
- **캐릭터 호감도 시스템** (선택지별 호감도 변동 및 누적)
- **멀티 엔딩 수집** (호감도에 따른 다양한 엔딩)
- **게임 데이터 영속성** (사용자별 진행 상태 저장)
- **게임 설명 및 튜토리얼** (게임 방법 안내)

---

## 사용된 기술

### Frontend
- **언어** : JavaScript (React)
- **프레임워크** : React 19.2.0
- **라우팅** : React Router DOM 7.9.5
- **UI** : React Icons (아이콘 라이브러리)
- **빌드 도구** : Create React App (Webpack/Babel)

### Backend
- **언어** : JavaScript (Node.js)
- **서버** : Express.js 5.2.1
- **데이터베이스** : SQLite3
- **미들웨어** : CORS (크로스 오리진 요청 처리)

### 개발 도구
- **버전 관리** : Git / GitHub
- **패키지 관리** : npm

---

## 저장소 구조 (요약)

```text
.
├─ front/                          # React 클라이언트 (프론트엔드)
│  ├─ public/                      # 정적 파일 (index.html 등)
│  ├─ src/                         # React 소스 코드
│  │  ├─ components/               # 재사용 컴포넌트
│  │  ├─ pages/                    # 페이지 컴포넌트
│  │  ├─ App.js                    # 메인 앱 컴포넌트
│  │  └─ index.js                  # 진입점
│  ├─ package.json                 # 프론트 의존성
│  └─ .gitignore
│
├─ back/                           # Express.js 서버 (백엔드)
│  ├─ server.js                    # 서버 진입점 (PORT 3001)
│  ├─ db.js                        # SQLite 연결 및 테이블 생성
│  ├─ user.db                      # SQLite 데이터베이스 파일
│  ├─ package.json                 # 백엔드 의존성
│  └─ .gitignore
│
├─ .gitignore                      # Git 제외 파일 설정
└─ README.md                       # 이 파일

```

---

## API 엔드포인트 (백엔드)

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/` | 서버 상태 확인 |
| `GET` | `/explain` | 게임 설명 페이지 |
| `POST` | `/signup` | 회원가입 (id, password) |
| `POST` | `/login` | 로그인 (id, password) |
| `GET` | `/users` | 전체 사용자 조회 |
| `POST` | `/favorability` | 호감도 저장 및 누적 (id, score) |
| `GET` | `/favorability/:id` | 특정 사용자 호감도 조회 |
| `GET` | `/endings/:userId` | 사용자 엔딩 컬렉션 조회 |

---

## 데이터베이스 스키마

### users 테이블
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    favorability INT DEFAULT 0,       -- 캐릭터 호감도 (누적)
    ending TEXT DEFAULT ''             -- 엔딩 컬렉션 (콤마 구분)
)
```

---

## 실행 방법

### 1. 저장소 클론
```bash
git clone https://github.com/Hee4885/lastVoyage.git
cd lastVoyage
```

### 2. 백엔드 실행

```bash
cd back
npm install
node server.js
```
- 서버 실행: `http://localhost:3001`

### 3. 프론트엔드 실행 (다른 터미널)

```bash
cd front
npm install
npm start
```
- 앱 실행: `http://localhost:3000`

### 4. 브라우저에서 접속
- 프론트엔드: `http://localhost:3000`
- 백엔드 테스트: `http://localhost:3001`

---

## 주의사항

- **Node.js & npm** 설치 필수
- **포트 3000 (React), 3001 (Express)** 사용 가능해야 함
- SQLite 데이터베이스는 자동으로 생성됨 (`back/user.db`)
- 프론트 & 백을 **동시에** 실행해야 게임이 정상 작동

---

## 간단한 개발 메모

- 백엔드와 프론트는 **CORS로 통신** (크로스 오리진 요청 허용)
- 사용자 호감도는 **누적 방식**으로 저장 (회차별 선택에 따라 증감)
- 엔딩은 **콤마로 구분**된 텍스트 형태로 저장
- 비밀번호는 현재 **평문 저장** (보안 취약점)
- 데이터베이스는 로컬 SQLite 사용

---

## 권장 개선 사항

- 비밀번호 **해싱** (bcrypt 등)으로 보안 강화
- **JWT 토큰** 기반 인증 추가
- 비밀번호 **재설정 기능** 추가
- 게임 진행 상태 저장/로드 기능
- 에러 처리 및 입력 검증 보강
- 유닛 테스트 작성
- 배포 환경 설정 (Docker, CI/CD)

---

## 팀 역할

- **프론트엔드** : React 기반 UI/UX 구현, 게임 인터페이스 개발
- **백엔드** : Express 서버, SQLite 데이터베이스, API 설계
- **게임 디자인** : 스토리, 선택지, 호감도 시스템 기획

---

## 라이선스

개인 학습용 프로젝트

---

### 추가로 원하시면

- 스크린샷 및 실행 예시 이미지 추가
- API 테스트 (Postman/curl) 예시
- 배포 가이드 (Vercel, Heroku 등)
- 게임 스토리라인 문서화
