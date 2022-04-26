import React, { useEffect, useState } from "react";
import { getLeaderboardData } from "../firebase";

function Leaderboard() {
    const [loading, setLoading] = useState(true);
    const [docsArray, setDocsArray] = useState([]);

    useEffect(() => {
        getLeaderboardData()
            .then((data) => {
                setDocsArray(data)
                setLoading(false)
            })

    }, [])

    if (loading) {
        return (
            <div>
                <p>LOADING...</p>
            </div>
        )
    } else {
        return (
            <div id="leaderboard_page" className="page_placeholder">
                <h2>Leaderboard</h2>
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Quiz ID</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Difficulty</th>
                            <th>Question Amount</th>
                            <th>Question Type</th>
                            <th>Time Limit</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {docsArray && docsArray.map((doc) => {
                            return (
                                <tr key={doc.id}>
                                    <td>{doc.user}</td>
                                    <td>{doc.id}</td>
                                    <td>{doc.date.toDate().toLocaleString('en-US')}</td>
                                    <td>{doc.category}</td>
                                    <td>{doc.difficulty}</td>
                                    <td>{doc.question_number}</td>
                                    <td>{doc.question_type}</td>
                                    <td>{doc.time_limit}</td>
                                    <td>{doc.score}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Leaderboard;