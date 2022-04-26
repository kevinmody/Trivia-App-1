const initState = {
    options: {
        loading: false,
        category: ``,
        difficulty: ``,
        qtype: ``,
        number: `5`,
        time_limit: 15
    },
    questions: [],
    index: 0,
    score: 0
}

const Reducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_LOADING":
            return {
                ...state,
                options: {
                    ...state.options,
                    loading: action.value
                }
            }
        case "CHANGE_CATEGORY":
            return {
                ...state,
                options: {
                    ...state.options,
                    category: action.value
                }
            }
        case "CHANGE_DIFFICULTY":
            return {
                ...state,
                options: {
                    ...state.options,
                    difficulty: action.value
                }
            }
        case "CHANGE_TYPE":
            return {
                ...state,
                options: {
                    ...state.options,
                    qtype: action.value
                }
            }
        case "CHANGE_NUMBER":
            return {
                ...state,
                options: {
                    ...state.options,
                    number: action.value
                }
            }
        case "CHANGE_TIMER":
            return {
                ...state,
                options: {
                    ...state.options,
                    time_limit: action.value
                }
            }
        case "SET_QUESTIONS":
            return {
                ...state,
                questions: action.questions
            }
        case "SET_INDEX":
            return {
                ...state,
                index: action.index
            }
        case "SET_SCORE":
            return {
                ...state,
                score: action.score
            }
        default:
            return state
    }
}

export default Reducer;