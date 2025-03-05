import React, { useState } from "react";

const subjects = ["Science", "Maths", "General Knowledge", "Social"];
const difficulties = ["Easy", "Medium", "Hard"];

const quizData = {
    Science: {
        Easy: [
            { question: "What is H2O?", options: ["Oxygen", "Hydrogen", "Water", "Carbon"], answer: "Water" },
            { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
            { question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
            { question: "What is the chemical symbol for Oxygen?", options: ["O", "O2", "O3", "H2O"], answer: "O2" }
        ],
        Medium: [
            { question: "What gas do humans exhale?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
            { question: "What is the boiling point of water?", options: ["100°C", "0°C", "50°C", "200°C"], answer: "100°C" }
        ],
        Hard: [
            { question: "What is the speed of light?", options: ["300 km/s", "3,000 km/s", "300,000 km/s", "3,000,000 km/s"], answer: "300,000 km/s" }
        ]
    },
    Maths: {
        Easy: [
            { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
            { question: "What is 5 × 5?", options: ["10", "15", "20", "25"], answer: "25" }
        ],
        Medium: [
            { question: "What is 12 × 12?", options: ["124", "144", "112", "121"], answer: "144" },
            { question: "Solve: 45 ÷ 5", options: ["9", "8", "7", "6"], answer: "9" }
        ],
        Hard: [
            { question: "What is the square root of 169?", options: ["11", "12", "13", "14"], answer: "13" }
        ]
    },
    "General Knowledge": {
        Easy: [
            { question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
            { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Plato", "Homer", "Dickens"], answer: "Shakespeare" }
        ],
        Medium: [
            { question: "Who invented the telephone?", options: ["Edison", "Newton", "Bell", "Tesla"], answer: "Bell" },
            { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: "Tokyo" }
        ],
        Hard: [
            { question: "Which year did World War II end?", options: ["1942", "1945", "1950", "1939"], answer: "1945" },
            { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "Malta", "Liechtenstein"], answer: "Vatican City" }
        ]
    },
    Social: {
        Easy: [
            { question: "Who is known as the Father of India?", options: ["Nehru", "Gandhi", "Patel", "Bose"], answer: "Gandhi" },
            { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" }
        ],
        Medium: [
            { question: "Who wrote the Indian National Anthem?", options: ["Rabindranath Tagore", "Bankim Chandra", "Sarojini Naidu", "Subhas Chandra Bose"], answer: "Rabindranath Tagore" },
            { question: "What is the national animal of India?", options: ["Lion", "Elephant", "Tiger", "Peacock"], answer: "Tiger" }
        ],
        Hard: [
            { question: "When did India gain independence?", options: ["1942", "1947", "1950", "1939"], answer: "1947" },
            { question: "Which Indian state has the longest coastline?", options: ["Kerala", "Maharashtra", "Gujarat", "Andhra Pradesh"], answer: "Gujarat" }
        ]
    }
};

function GamifiedLearning() {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [quiz, setQuiz] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const startQuiz = (subject, difficulty) => {
        console.log("Starting quiz for:", subject, difficulty);

        if (!quizData[subject] || !quizData[subject][difficulty]) {
            console.error(`Error: Quiz data not found for ${subject} - ${difficulty}`);
            return;
        }

        setSelectedSubject(subject);
        setSelectedDifficulty(difficulty);
        setQuiz(quizData[subject][difficulty]);
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
    };

    const checkAnswer = (option) => {
        if (option === quiz[currentQuestion].answer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < quiz.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const tryAgain = () => {
        setSelectedDifficulty(null);
        setShowResult(false);
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            {!selectedSubject ? (
                <div>
                    <h2 className="text-3xl font-bold mb-4">Select a Subject</h2>
                    <div className="space-x-4">
                        {subjects.map((subject) => (
                            <button
                                key={subject}
                                className="p-2 bg-green-500 rounded"
                                onClick={() => setSelectedSubject(subject)}
                            >
                                {subject}
                            </button>
                        ))}
                    </div>
                </div>
            ) : !selectedDifficulty ? (
                <div>
                    <h2 className="text-3xl font-bold mb-4">Select Difficulty for {selectedSubject}</h2>
                    <div className="space-x-4">
                        {difficulties.map((difficulty) => (
                            <button
                                key={difficulty}
                                className="p-2 bg-blue-500 rounded"
                                onClick={() => startQuiz(selectedSubject, difficulty)}
                            >
                                {difficulty}
                            </button>
                        ))}
                    </div>
                </div>
            ) : !showResult ? (
                <div>
                    <h2 className="text-2xl font-bold mb-4">{selectedSubject} - {selectedDifficulty} Quiz</h2>
                    <h3 className="text-xl mb-4">{quiz[currentQuestion].question}</h3>
                    <div className="space-y-2">
                        {quiz[currentQuestion].options.map((option, index) => (
                            <button key={index} className="p-2 bg-gray-700 rounded block w-full" onClick={() => checkAnswer(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
                    <p className="mb-4">Your Score: {score} / {quiz.length}</p>
                    <button onClick={tryAgain} className="p-2 bg-yellow-500 rounded">Try Again</button>
                </div>
            )}
        </div>
    );
}

export default GamifiedLearning;
