
import { useState, useEffect } from "react";
import axios from "axios";

interface Question {
	id: number;
	question: string;
	options: string[];
	correct_answer: string[];
}

const TestPractice = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Contador de respuestas correctas
	const [isAnswered, setIsAnswered] = useState(false); // Controla si ya se respondió la pregunta

	// URL de la API que contiene las preguntas
	const url_quations = import.meta.env.VITE_PATH_QUESTIONS_TEST;

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get(url_quations);
				setQuestions(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error al cargar las preguntas:", error);
			}
		};

		fetchQuestions();
	}, [url_quations]);

	// Controla si se ha respondido la pregunta actual
	const currentQuestion = questions[currentQuestionIndex];

	// Maneja la selección de una opción
	const handleSelectOption = (option: string) => {
		if (isAnswered) return; // No permitir seleccionar si ya se respondió

		setSelectedOption(option);
		setIsAnswered(true); // Marca la pregunta como respondida

		const isAnswerCorrect = currentQuestion.correct_answer.includes(option);
		setIsCorrect(isAnswerCorrect);

		if (isAnswerCorrect) {
			setCorrectAnswersCount((prevCount) => prevCount + 1); // Incrementa el contador si es correcta
		}
	};

	// Siguiente pregunta
	const handleNext = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setSelectedOption(null); // Resetea la opción seleccionada
			setIsCorrect(null); // Resetea el estado de la respuesta
			setIsAnswered(false); // Permitir que se responda la pregunta anterior
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		}
	};

	// Pregunta anterior
	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			// Resetear opción seleccionada para la pregunta anterior
			setSelectedOption(null);
			setIsCorrect(null); // Resetea el estado de la respuesta
			setIsAnswered(false); // Permitir que se responda la pregunta anterior
			setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
		}
	};

	// Mostrar resultados al finalizar el test
	const calculatePercentage = () => {
		return ((correctAnswersCount / questions.length) * 100).toFixed(2);
	};

	const handleReset = () => {
		setCurrentQuestionIndex(0);
		setSelectedOption(null);
		setIsCorrect(null);
		setCorrectAnswersCount(0); // Reinicia el contador de respuestas correctas
		setIsAnswered(false);
	};

	if (isLoading) {
		return (
			<p className="text-center text-xl font-semibold text-gray-700">
				Cargando preguntas...
			</p>
		);
	}


	return (
		<div className="mx-auto w-full lg:w-3/4">
			<h2 className="text-3xl text-gray-600 font-bold">
				Question {currentQuestionIndex + 1}:
			</h2>
			<h3 className="text-xl font-semibold text-gray-600">
				{currentQuestion.question}
			</h3>
			<ul>
				{currentQuestion.options.map((option, index) => (
					<li
						key={index}
						onClick={() => handleSelectOption(option)} // Asigna la opción seleccionada
						style={{
							cursor: "pointer",
							backgroundColor:
								selectedOption === option ? "lightblue" : "transparent", // Estilo condicional
							padding: "10px",
							border: "1px solid #ccc",
							marginBottom: "5px",
							borderRadius: "5px",
						}}
					>
						{option}
					</li>
				))}
			</ul>
			{selectedOption && isCorrect !== null && (
				<p
					className={`p-5 rounded-md text-center text-gray-200 text-xl font-medium ${
						isCorrect
							? "bg-green-500"
							: selectedOption && !isCorrect
							? "bg-red-500"
							: "bg-gray-200"
					}`}
				>
					{isCorrect
						? "Respuesta Correcta!"
						: "Respuesta Incorrecta, intenta de nuevo."}
				</p>
			)}

			<div className="flex justify-between mt-4">
				<button
					onClick={handlePrevious}
					disabled={currentQuestionIndex === 0} // Deshabilitar si es la primera pregunta
					className={`${
						currentQuestionIndex === 0
							? "bg-gray-300 cursor-not-allowed"
							: "bg-blue-500"
					} text-white px-4 py-2 rounded`}
				>
					Previous Question
				</button>

				<button
					onClick={handleNext}
					disabled={currentQuestionIndex === questions.length - 1} // Deshabilitar si es la última pregunta
					className={`${
						currentQuestionIndex === questions.length - 1
							? "bg-gray-300 cursor-not-allowed"
							: "bg-blue-500"
					} text-white px-4 py-2 rounded`}
				>
					Next Question
				</button>
			</div>
			{currentQuestionIndex === questions.length - 1 && isAnswered && (
				<div className="mt-6 text-xl font-medium text-gray-500">
					<h3>Resultados</h3>
					<p>
						Respuestas correctas: {correctAnswersCount} de {questions.length}
					</p>
					<p>Porcentaje de aciertos: {calculatePercentage()}%</p>
				</div>
			)}
			<button
				onClick={handleReset}
				className="bg-fuchsia-700 hover:bg-fuchsia-800 w-full xl:w-1/4 p-3 text-white font-black text-xl cursor-pointer mt-4 rounded-lg"
			>
				Intentar nuevamente
			</button>
		</div>
	);
};

export default TestPractice;

