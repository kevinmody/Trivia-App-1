import { auth, getUserScore, setNewDisplayName } from "../firebase";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./profile.css"

function Profile() {
    const user = auth.currentUser;
    const [userData, setUserData] = useState([]);
    const [showEdit, setShowEdit] = useState(true);
    const [displayName, setDisplayName] = useState(user.displayName);
    const [scoreShow, setScoreShow] = useState(true);

    useEffect(() => {
        getUserScore(user.uid)
            .then((data) => {
                setUserData(data);
            });
    }, []);

    const editName = (e) => {
        setShowEdit(!showEdit);
    }

    const nameChange = (e) => {
        setDisplayName(e.target.value)
    }

    const confirmName = () => {
        console.log(displayName);
        setNewDisplayName(displayName, user.uid)
        setShowEdit(!showEdit);
    }

    const showScore = () => {
        console.log("Here");
        setScoreShow(!scoreShow)
    }

    return (
        <div id="profile_page">
            <div id="profile_info">
                <h3>Profile Information</h3>
                <p>Email: {user.email}</p>
                <p>Display Name: {user.displayName}</p>

                {showEdit === true ? (
                    <div>
                        <Button id="edit_button" onClick={editName}>&ensp;Edit Display Name&ensp;</Button>
                    </div>
                ) : (
                    <div>
                        <form>
                            <label for="fname">Edit Display Name:{" "}
                                <input type="text" id="fname" name="fname"
                                    onChange={nameChange}>
                                </input> <br></br>
                            </label>
                        </form>
                        <form className="buttons">
                            <Button id="cancel_edit" onClick={editName}>Cancel</Button>
                            <Button id="confirm_edit" onClick={confirmName}>Confirm</Button>
                        </form>
                    </div>
                )}
            </div>

            <br></br>

            <div id="profile_scores">
                {scoreShow === true ? (
                    <div>
                        <h3>View your past quiz scores&ensp;</h3>
                        <br></br>
                        <Button id="show_scores" onClick={showScore}>&ensp;Show Scores&ensp;</Button>
                    </div>
                ) : (
                    <div>
                        <h3>Hide your past scores&ensp;</h3>
                        <br></br>
                        <Button id="hide_scores" onClick={showScore}>&ensp;Hide Scores!&ensp;</Button>
                    </div>
                )}
            </div>

            {scoreShow === false ? (
                <div id="leaderboard_page">
                    <h3>Past Quizzes</h3>
                    <table>
                        <thead>
                        <tr>
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
                        {userData.map((doc) => {
                            return (
                                <tr key={doc.id}>
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
            ) : (
                <div>
                </div>
            )}
        </div>
    )
}

export default Profile;
