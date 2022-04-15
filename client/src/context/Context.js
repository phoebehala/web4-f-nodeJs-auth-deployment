// contextAPI: to use a user information across the app

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

import {createContext, useEffect, useReducer} from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    // whenever the browser get refreshed, fetching this user from local storage
    // .getItem("user") >>> "user" the 'key' we set in the local storage
    // if there is no user, it'll be null
    user: JSON.parse(localStorage.getItem("user")) || null,  // JSON.parse() >>> Converts a JavaScript Object Notation (JSON) string into an object.
    isFetching: false,
    error: false
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);   // Reducer >>> use this Reducer I just created ; INITIAL_STATE >>> indicate the initialState I want to update

    useEffect(()=>{
        // to store this user to the localStorage
        localStorage.setItem("user",JSON.stringify(state.user))  // .setItem(key, value--JSON)

    }, [state.user]) // [state.user] >>> dependency。whenever state.user get changed, fire the callback -- to store the user info
    return(
        // use Context which I created as a provider
        // value={{user:..., isFetching:..., error:..., dispatch }} >>> these are properties/states we want to use across the app
        <Context.Provider value={{
            user:state.user,
            isFetching: state.isFetching,
            error:state.error,
            dispatch
        }}>  
            {children}
        </Context.Provider>
    )
}