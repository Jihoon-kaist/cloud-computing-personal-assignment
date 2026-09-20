# 개인과제 - 개인 소개 페이지 제작 및 프론트엔드·백엔드 연동

클라우드 컴퓨팅 실습 개인과제. React(Vite) 프론트엔드가 FastAPI 백엔드의 메모(Memo) API를 호출하고,
개인 소개 페이지는 별도의 정적 HTML로 제공됩니다.

## 프로젝트 소개

- **개인 소개 페이지** (`frontend/public/intro.html`) — 배포 후 `/intro.html`로 접근
- **프론트엔드** (`frontend/`) — React(Vite)로 만든 메모 CRUD 화면. 백엔드 API를 호출해 결과를 보여줍니다.
- **백엔드** (`backend/`) — FastAPI + SQLAlchemy(SQLite)로 만든 메모 API.
- 두 페이지는 서로 링크로 연결되어 있습니다. (`/intro.html` ↔ `/`)

## 주요 구성

| 구분 | 기술 | 배포처 |
| --- | --- | --- |
| 개인 소개 페이지 | HTML/CSS | Vercel (`/intro.html`) |
| 프론트엔드 | React (Vite) | Vercel |
| 백엔드 | FastAPI + SQLAlchemy + SQLite | Render |
| 소스 코드 | GitHub | - |

### API 엔드포인트

| 메서드 | 경로 | 설명 |
| --- | --- | --- |
| GET | `/` | 환영 메시지 |
| GET | `/health` | 헬스 체크 |
| GET | `/memos` | 메모 목록 조회 |
| POST | `/memos` | 메모 생성 (`{"content": "..."}`) |
| DELETE | `/memos/{id}` | 메모 삭제 |

## 로컬 실행

### 백엔드

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt
fastapi dev main.py           # http://127.0.0.1:8000, 문서: /docs
```

### 프론트엔드

```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

`frontend/.env.local`의 `VITE_API_URL`이 로컬 백엔드 주소(`http://localhost:8000`)를 가리킵니다.

## 배포 방법

### 백엔드 (Render)

1. Render에서 New → Web Service, 이 저장소의 `backend/` 디렉터리를 루트로 지정
2. Build Command: `pip install -r requirements.txt`
3. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. 환경변수 `ALLOWED_ORIGINS`에 배포된 Vercel 주소(`https://<project>.vercel.app`)를 등록
5. 배포 후 Swagger UI: `https://<render-service>.onrender.com/docs`

### 프론트엔드 (Vercel)

1. Vercel에서 New Project, 이 저장소의 `frontend/` 디렉터리를 루트로 지정 (Framework: Vite)
2. 환경변수 `VITE_API_URL`에 Render 백엔드 주소를 등록
3. 배포 후 `/`는 연동 실습 페이지, `/intro.html`은 개인 소개 페이지

## 배포 주소

- GitHub 저장소: (배포 후 채워 넣기)
- Vercel 배포 페이지: (배포 후 채워 넣기)
- 백엔드 Swagger UI: (배포 후 채워 넣기)
