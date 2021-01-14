import {ADD_TODO, TOGGLE_TODO, SET_FILTER} from './actionTypes'

let TodoId = 0;

/* 
"Object shorthand" of Redux's mapDispatchToProps function.
This form is recommended unless you have a specific reason to customise the
dispatch behaviour.
*/
export const addTask = (content) => ({
    type: ADD_TODO,
    payload: {
        id: ++TodoId,
        content
    }
});


/*
Alternative function form of mapDispatchToProps:

export const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (content) => {
            dispatch({
                type: ADD_TDO,
                payload: {
                    id: ++TodoID,
                    content
                }
            }),
        }
    }
}


*/