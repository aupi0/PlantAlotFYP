export const REGISTER = 'REGISTER';

export const LOGIN = 'LOGIN';

export const register = (username, email, password) => {
    return async dispatch => {
        
        //fetch users from database here
        //error handling on response here

        dispatch({type: SIGNUP });
    };
};

export const login = (username, password) => {
    return async dispatch => {
        
        //fetch users from database here
        //error handling on response here

        dispatch({type: LOGIN });
    };
};