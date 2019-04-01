
export const setCurrentUser = (user) => {
    return {
        type: "SET_CURRENT_USER", payload: user
    }
}
export const setUserProfile = (data) => {
    
    return {
        type: "SET_USER_PROFILE", payload: data
    }
}
export const editUserProfile = (data) => {

    return {
        type: "EDIT_USER_PROFILE", payload: data
    }
}