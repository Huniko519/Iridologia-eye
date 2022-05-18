const initState = {
    widthLeft: "700px",
    widthRight: "700px",
    widthRuler1 : "180px",
    widthRuler2 : "180px",
    widthRuler3 : "180px",
    widthRuler4 : "180px",
    widthRuler5 : "180px",
    widthRuler6 : "180px"
}

const patientReducer = (state = initState, action) => {
    switch (action.type) {
            //Change character name
        case 'CHANGE_WIDTHLEFT':
            return {
                ...state,
                widthLeft: action.payload
            }
        case 'CHANGE_WIDTHRIGHT':
            return {
                ...state,
                widthRight: action.payload
            }
        case 'CHANGE_WIDTHRULER1':
            return {
                ...state,
                widthRuler1: action.payload
            }
        case 'CHANGE_WIDTHRULER2':
            return {
                ...state,
                widthRuler2: action.payload
            }
        case 'CHANGE_WIDTHRULER3':
            return {
                ...state,
                widthRuler3: action.payload
            }
        case 'CHANGE_WIDTHRULER4':
            return {
                ...state,
                widthRuler4: action.payload
            }
        case 'CHANGE_WIDTHRULER5':
            return {
                ...state,
                widthRuler5: action.payload
            }
        case 'CHANGE_WIDTHRULER6':
            return {
                ...state,
                widthRuler6: action.payload
            }
        default:
            return state
    }
}

export default patientReducer;