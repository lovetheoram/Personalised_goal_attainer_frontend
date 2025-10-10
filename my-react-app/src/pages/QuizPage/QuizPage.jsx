import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { startQuiz, submitQuiz } from "../../api";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadQuiz() {
      try {
        setLoading(true);
        const data = await startQuiz();
        setQuestions(data);
      } catch (err) {
        console.error("Failed to load quiz", err);
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, []);

  const handleAnswer = (option) => {
    const currentQ = questions[currentIndex];
    const isCorrect = option === currentQ.correct;

    // Save answer
    setAnswers((prev) => ({
      ...prev,
      [currentQ.text]: option,
    }));

    // Show feedback
    setFeedback(isCorrect ? "✅ Correct!" : "❌ Wrong");

    // Update score
    if (isCorrect) setScore((prev) => prev + 1);

    // Move to next question after a short delay
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setQuizCompleted(true); // mark quiz as finished
      }
    }, 1200);
  };

  const handleSubmit = async () => {
    try {
      const results = questions.map((q) => {
        const userAnswer = answers[q.text];
        const isCorrect = userAnswer === q.correct;

        // You can adjust score logic here, e.g., partial credit
        const scoreValue = isCorrect ? 1.0 : 0.0;

        return {
          concept_id: q.concept_id,
          score: parseFloat(scoreValue.toFixed(2)),
          understood: scoreValue >= 0.7,
        };
      });

      const payload = {
        study_date: new Date().toISOString().split("T")[0],
        results,
      };

      console.log("Submitting payload:", payload);

      await submitQuiz(payload);
      setSubmitted(true);
    } catch (err) {
      console.error("Quiz submission failed", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading quiz...</p>;

  if (submitted)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">🎉 Quiz Submitted!</h1>
        <p className="text-lg mb-6">
          You scored <span className="font-semibold">{score}</span> out of {questions.length}
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-medium text-gray-700 mb-6"
        >
          {score / questions.length >= 0.8
            ? "🔥 Amazing job! You're crushing it!"
            : score / questions.length >= 0.5
            ? "💪 Good effort! Keep pushing forward!"
            : "🌱 Every expert was once a beginner — keep learning!"}
        </motion.p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Progress Bar */}
      <div className="w-full max-w-xl mb-6">
        <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
          <motion.div
            className="bg-blue-600 h-3"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="text-center text-sm mt-1 text-gray-600">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="bg-white w-full max-w-xl p-6 rounded-2xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {currentQ.text}
          </h2>

          <div className="flex flex-col gap-3">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-left"
              >
                {opt}
              </button>
            ))}
          </div>

          {feedback && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mt-4 font-medium text-center ${
                feedback.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Manual submit message */}
      {quizCompleted && !submitted && (
        <div className="mt-6 text-center">
          <p className="text-lg font-medium text-gray-700 mb-4">
            🎯 You have completed all questions!
          </p>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
