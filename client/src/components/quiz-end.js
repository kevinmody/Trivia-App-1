import { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth, addData } from "../firebase";

function QuizEnd() {
    const score = useSelector(state => state.score);
    const index = useSelector(state => state.index);
    const options = useSelector(state => state.options);
    const date = new Date(Date.now());
    const user = auth.currentUser;

    let uid, category, difficulty, qtype;

    if (user === null) {
        uid = "anonymous"
    } else {
        uid = user.uid;
    }

    if (options.category === "") {
        category = "all"
    } else {
        category = options.category
    }

    if (options.difficulty === "") {
        difficulty = "all"
    } else {
        difficulty = options.difficulty
    }

    if (options.qtype === "") {
        qtype = "all"
    } else if (options.qtype === "boolean") {
        qtype = "true/false"
    } else {
        qtype = "multiple choice"
    }

    let data = {
        category: category,
        date: date,
        difficulty: difficulty,
        question_number: parseInt(options.number, 10),
        question_type: qtype,
        score: score.toFixed(2),
        time_limit: options.time_limit,
        uid: uid
    }

    useEffect(() => {
        addData("Scores", data)
    }, [])

    return (
        <div id="page_placeholder">
            <h2>End of Quiz!</h2>
            <div id="quiz_stats">
                <h4>Quiz Stats:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Difficulty</th>
                            <th>Question Type</th>
                            <th>Question Amount</th>
                            <th>Time Limit</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.category}</td>
                            <td>{data.difficulty}</td>
                            <td>{data.question_type}</td>
                            <td>{data.question_number}</td>
                            <td>{data.time_limit}</td>
                            <td>{data.score}</td>
                            <td>{date.toString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default QuizEnd;