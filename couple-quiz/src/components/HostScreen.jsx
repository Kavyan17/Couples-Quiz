import { useState, useEffect } from "react";
import { loadCSV } from "../utils/csvLoader";
import { v4 as uuidv4 } from "uuid";

const HostScreen = () => {
  const [roomId, setRoomId] = useState(uuidv4());
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({ A: [], B: [] });
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    loadCSV("/questions.csv").then(qs => setQuestions(qs.slice(0, 10)));
  }, []);

  useEffect(() => {
    const keyA = `${roomId}_A`;
    const keyB = `${roomId}_B`;
    const interval = setInterval(() => {
      const ansA = JSON.parse(localStorage.getItem(keyA) || "[]");
      const ansB = JSON.parse(localStorage.getItem(keyB) || "[]");
      setAnswers({ A: ansA, B: ansB });
    }, 1000);
    return () => clearInterval(interval);
  }, [roomId]);

  useEffect(() => {
    if (answers.A.length === questions.length && answers.B.length === questions.length) {
      setShowResults(true);
    }
  }, [answers, questions.length]);

  const renderLinks = () => (
    <div>
      <h3>Share these links:</h3>
      <p>Player A: <a href={`/room/${roomId}/A`} target="_blank">/room/{roomId}/A</a></p>
      <p>Player B: <a href={`/room/${roomId}/B`} target="_blank">/room/{roomId}/B</a></p>
    </div>
  );

  if (showResults) {
    let matches = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers.A[i]?.toLowerCase() === answers.B[i]?.toLowerCase()) matches++;
    }
    return (
      <div>
        <h2>Results</h2>
        <p>Match Score: {matches}/{questions.length} 💖</p>
        <button onClick={() => window.location.reload()}>New Room</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Couple Compatibility Quiz</h1>
      {renderLinks()}
      <h2>Questions are being answered...</h2>
    </div>
  );
};

export default HostScreen;
