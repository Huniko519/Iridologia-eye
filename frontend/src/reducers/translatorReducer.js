const initState = {
    translateFlag: "4"
}

const translatorReducer = (state = initState, action) =>{
    switch(action.type){
        case "CHANGE_LANGUAGE" :
            return {
                ...state,
                translateFlag: action.payload
            }
        default:
            return state
    }
    }


export default translatorReducer;