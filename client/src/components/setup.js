import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import GetQuestions from "../services/get-questions-service";

function Setup() {
    const dispatch = useDispatch();
    const [options, setOptions] = useState(null);
    const loading = useSelector(state => state.options.loading);
    const category = useSelector(state => state.options.category);
    const difficulty = useSelector(state => state.options.difficulty);
    const qtype = useSelector(state => state.options.qtype);
    const number = useSelector(state => state.options.number);
    const time_limit = useSelector(state => state.options.time_limit);

    useEffect(() => {
        const api_url = `https://opentdb.com/api_category.php`;
        const handleLoadingChange = (value) => {
            dispatch({
                type: 'CHANGE_LOADING',
                loading: value
            })
        }
        handleLoadingChange(true);

        fetch(api_url)
            .then((res) => res.json())
            .then((res) => {
                handleLoadingChange(false);
                setOptions(res.trivia_categories);
            });
    }, [setOptions, dispatch]);

    const handleCategoryChange = (event) => {
        dispatch({
            type: 'CHANGE_CATEGORY',
            value: event.target.value
        })
    }

    const handleDifficultyChange = (event) => {
        dispatch({
            type: 'CHANGE_DIFFICULTY',
            value: event.target.value
        })
    }

    const handleTypeChange = (event) => {
        dispatch({
            type: 'CHANGE_TYPE',
            value: event.target.value
        })
    }

    const handleNumberChange = (event) => {
        dispatch({
            type: 'CHANGE_NUMBER',
            value: event.target.value
        })
    }

    const handleTimeLimitChange = (event) => {
        dispatch({
            type: 'CHANGE_TIMER',
            value: event.target.value
        })
    }

    if (loading) {
        return (
            <div>
                <p>LOADING...</p>
            </div>
        )
    } else {
        return (
            <div id="setup_page">
                <Container>
                    <h3>Quiz Setup Options</h3>
                    <Form>

                        <Form.Group className="mb-3" controlId="option_category">
                            <Form.Label>Select Category:</Form.Label>
                            <Form.Select value={category} onChange={handleCategoryChange}>
                                <option>All</option>
                                {options && options.map((opt) => (
                                    <option value={opt.id} key={opt.id}>
                                        {opt.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="option_difficulty">
                            <Form.Label>Select Difficulty:</Form.Label>
                            <Form.Select value={difficulty} onChange={handleDifficultyChange}>
                                <option value="" key="difficulty-0">All</option>
                                <option value="easy" key="difficulty-1">Easy</option>
                                <option value="medium" key="difficulty-2">Medium</option>
                                <option value="hard" key="difficulty-3">Hard</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="option_type">
                            <Form.Label>Select Question Type:</Form.Label>
                            <Form.Select value={qtype} onChange={handleTypeChange}>
                                <option value="" key="type-0">All</option>
                                <option value="multiple" key="type-1">Multiple Choice</option>
                                <option value="boolean" key="type-2">True/False</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="option_number">
                            <Form.Label>Select Number of Questions:</Form.Label>
                            <Form.Select value={number} onChange={handleNumberChange}>
                                <option value="5" key="5">5</option>
                                <option value="10" key="10">10</option>
                                <option value="15" key="15">15</option>
                                <option value="20" key="20">20</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="time_limit">
                            <Form.Label>Select Time Limit Per Question:</Form.Label>
                            <Form.Select value={time_limit} onChange={handleTimeLimitChange}>
                                <option value={15} key="15">15</option>
                                <option value={20} key="20">20</option>
                                <option value={25} key="25">25</option>
                                <option value={30} key="30">30</option>
                            </Form.Select>
                        </Form.Group>

                        <GetQuestions text="Start Quiz!"/>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Setup;