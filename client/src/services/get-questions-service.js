import React from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';

function GetQuestions(props) {
    const category = useSelector(state => state.options.category)
    const difficulty = useSelector(state => state.options.difficulty)
    const qtype = useSelector(state => state.options.qtype)
    const number = useSelector(state => state.options.number)
    //const index = useSelector(state => state.index)
    const dispatch = useDispatch()

    const setLoading = (value) => {
        dispatch({
            type: 'CHANGE_LOADING',
            loading: value
        })
    }

    const setQuestions = (value) => {
        dispatch({
            type: 'SET_QUESTIONS',
            questions: value
        })
    }

    const handleQuery = async (event) => {
        event.preventDefault()
        console.log("querying questions...")
        let apiUrl = `https://opentdb.com/api.php?amount=${number}`;

        if (category.length) {
            apiUrl = apiUrl.concat(`&category=${category}`)
        }
        if (difficulty.length) {
            apiUrl = apiUrl.concat(`&difficulty=${difficulty}`)
        }
        if (qtype.length) {
            apiUrl = apiUrl.concat(`&type=${qtype}`)
        }

        setLoading(true);

        await fetch(apiUrl)
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((res) => {
                console.log(res)
                setQuestions(res.results);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e)
            })

        /*if (index > 0) {
            dispatch({
                type: 'SET_INDEX',
                index: 0
            })

            dispatch({
                type: 'SET_SCORE',
                score: 0
            })
        }*/
    }

    return <Button onClick={handleQuery}>{props.text}</Button>;
}

export default GetQuestions;