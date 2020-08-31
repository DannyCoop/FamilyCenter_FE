const familyReducer = (state = [], action) => {
    let idx;
    switch (action.type) {
        case "ADD_MEMBER":
        return [...state, action.member];

        case "REMOVE_MEMBER":
        idx = state.findIndex(author => author.id === action.id);
        return [...state.slice(0, idx), ...state.slice(idx + 1)];

        default:
        return state;
    }
}
export default familyReducer