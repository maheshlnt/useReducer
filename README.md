# useReducer
UseReducer used for  more complex forms, ex; step forms prev step to be passed to next step in form


const [state, dispatchFn]=useReducer(reducerFn,initialState, initFn)

1@state::: The state snapshot used in the component re-render/re-evaluation cycle 
2@dispatchFn::: A function that can be used to dispatch a new action (ie,trigger an update of the state)(ie., to update that above state snapshot) 
3@reducerFn::: (prevState, action)=>newState A function that is triggered automatically once an action is dispatched(via dispatchFn())-it receives that the latest state snapshot and should return the new, updated state. (ie, anytime new action is performed this function triggers) 
4@initialState::: initial state 
5@initFn::: A function to set the initial state programatically.
