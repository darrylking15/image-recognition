
const initialState = {
    user: {},
    credentials: {}
}

// Action Types
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_SESSION = 'GET_SESSION';

// Redux Creators
export function loginUser(user) {
    //console.log("Login User Reducer",user)
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function logoutUser() {
    //console.log("Reducer Logout");
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export function getUserSession(user) {
    //console.log("Reducer getUserSession");
    return {
        type: GET_SESSION,
        payload: user
    }
}


// Reducer Function
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER: 
            return { ...state, user: action.payload.data}
        case LOGOUT_USER: 
            return initialState
        case GET_SESSION + "_PENDING":
            return state
        case GET_SESSION + "_FULFILLED":
                return { ...state, user: action.payload.data}
        case GET_SESSION + "_REJECTED":
            return initialState
        default: 
            return initialState
    }
} 
