const initialState = {
    isAuthenticated: false,
    user : {},
}
export default function Auth (state = initialState, action) {
    switch (action.type) {
        
        case "SET_CURRENT_USER":
            var newState = Object.assign({}, state);
            newState.isAuthenticated = true;
            newState.user = action.payload
            return newState;
            break;
        default:
            return state;
            break;
    }
}