import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [memos, setMemos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMemos = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/memos`);
      if (!res.ok) throw new Error(`API 응답 오류: ${res.status}`);
      const data = await res.json();
      setMemos(data);
    } catch (err) {
      setError(`백엔드(${API_URL}) 호출에 실패했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemos();
  }, []);

  const addMemo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await fetch(`${API_URL}/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      if (!res.ok) throw new Error(`API 응답 오류: ${res.status}`);
      setText("");
      await loadMemos();
    } catch (err) {
      setError(`메모 추가에 실패했습니다: ${err.message}`);
    }
  };

  const deleteMemo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/memos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`API 응답 오류: ${res.status}`);
      await loadMemos();
    } catch (err) {
      setError(`메모 삭제에 실패했습니다: ${err.message}`);
    }
  };

  return (
    <div className="app">
      <nav className="topnav">
        <a href="/intro.html">← 개인 소개 페이지</a>
      </nav>

      <h1>📝 프론트엔드·백엔드 연동 실습</h1>
      <p className="api-info">
        백엔드 API 주소: <code>{API_URL}</code>
      </p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={addMemo} className="memo-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="메모를 입력하세요"
        />
        <button type="submit">추가</button>
      </form>

      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <ul className="memo-list">
          {memos.map((m) => (
            <li key={m.id}>
              <span>{m.content}</span>
              <button onClick={() => deleteMemo(m.id)}>삭제</button>
            </li>
          ))}
          {memos.length === 0 && <li className="empty">등록된 메모가 없습니다.</li>}
        </ul>
      )}
    </div>
  );
}

export default App;
