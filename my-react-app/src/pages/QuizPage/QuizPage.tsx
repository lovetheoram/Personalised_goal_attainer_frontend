import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// API helpers
const API_BASE = "/api/quiz";

async function fetchQuiz() {
  const res = await fetch(`${API_BASE}/start/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return await res.json();
}

async function submitQuiz(results, understood = true) {
  const res = await fetch(`${API_BASE}/submit/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ results, understood }),
  });
  return await res.json();
}

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function loadQuiz() {
      const data = await fetchQuiz();
      setQuestions(data);
      setLoading(false);
    }
    loadQuiz();
  }, []);

  const handleSelect = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    const results = questions.map((q) => {
      const userAnswer = answers[q.text] || "";
      const isCorrect = userAnswer === q.correct;
      if (isCorrect) calculatedScore += 1;
      return {
        concept_id: q.concept_id,
        answer: userAnswer,
        score: isCorrect ? 1 : 0,
      };
    });

    const resp = await submitQuiz(results);
    console.log(resp);
    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (loading) return <p className="text-center mt-10">Loading quiz...</p>;

  if (submitted)
    return (
      <div className="p-6 bg-gray-100 min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz Completed!</h1>
        <p className="text-xl mb-4">
          You scored {score} out of {questions.length}
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Quiz Page</h1>
      <form>
        {questions.map((q, idx) => (
          <div key={idx} className="mb-6 bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">
              Q{idx + 1}: {q.text}
            </h2>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={q.text}
                    value={opt}
                    checked={answers[q.text] === opt}
                    onChange={() => handleSelect(q.text, opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizPage;
