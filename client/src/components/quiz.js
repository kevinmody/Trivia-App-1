import { useSelector } from "react-redux";
import Setup from "./setup";
import Question from "./question";
import QuizEnd from "./quiz-end";

function Quiz() {
    const questions = useSelector((state) => state.questions)
    const index = useSelector((state) => state.index)
    let component;

    if (!questions.length) {
        component = <Setup />
    }
    else if (index + 1 <= questions.length) {
        component = <Question />
    }
    else {
        component = <QuizEnd />
    }

    return (
        <div className="quiz_page">
            <div>
                {component}
            </div>
        </div>
    );
}

export default Quiz;