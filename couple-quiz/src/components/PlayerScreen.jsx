import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PlayerScreen = () => {
  const { roomId, player } = useParams();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetch("/questions.csv")
      .then(res => res.text())
      .then(text => {
        const rows = text.trim().split("\n").slice(0, 10);
        setQuestions(rows);
      });
  }, []);

  const submitAnswer = () => {
    const key = `${roomId}_${player}`;
    const prev = JSON.parse(localStorage.getItem(key)) || [];
    localStorage.setItem(key, JSON.stringify([...prev, answer]));
    setAnswer("");
    setCurrent(prev => prev + 1);
  };

  if (current >= questions.length) {
    return <h2>Thank you! Waiting for results... 💌</h2>;
  }

  return (
    <div>
      <h2>Hi Player {player}</h2>
      <p>Q{current + 1}: {questions[current]}</p>
      <input value={answer} onChange={e => setAnswer(e.target.value)} />
      <button onClick={submitAnswer}>Submit</button>
    </div>
  );
};

export default PlayerScreen;
