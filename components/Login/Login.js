import React, { useState, useReducer, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer= (state,action)=>{
  if(action.type==='USER_INPUT'){
    return { value:action.val, isValid:action.val.includes('@')};
  }
  if(action.type==='INPUT_BLUR'){
    return  {value: state.value,isValid:state.value.includes('@')}
  }
  return {value:'', isValid:false}
}
const passReducer=(state,action)=>{
  if(action.type==="PASS"){
    return {value:action.val,isValid:action.val.length>3}
  }
  if(action.type==="ERR"){
    return {value:state.value, isValid:state.value.length>3}
  }
return {value:'',isValid:false}
}
const Login = (props) => {
  
  const [formIsValid, setFormIsValid] = useState(false);
const [emailstate, dispatchEmail]=useReducer(emailReducer,{value:'', isValid:null});
const [passState,dispatchPass]=useReducer(passReducer,{value:"",isValid:null});
 

  const emailChangeHandler = (event) => {
 dispatchEmail({type:'USER_INPUT',val:event.target.value })
 
   };
   const {isValid: emailIsValid}=emailstate; // only tests till it is valid after wont run this ie.till @ found
   const {isValid: passwordIsValid}=passState;// only tests till it is valid after wont run this ie till 6 letters
useEffect(()=>{
const identifier= setTimeout(()=>{
  console.log('checking validity');//After 500milliseconds this line/code runs, pausing typing more than 500millis
  setFormIsValid(
    // emailstate.isValid && passState.isValid
    emailIsValid && passwordIsValid
  );
},500);
return ()=>{
  console.log("cleanup");
  clearTimeout(identifier);
}
},[emailIsValid, passwordIsValid]);
// },[emailstate, passState]);
  const passwordChangeHandler = (event) => {
    dispatchPass({type:"PASS", val:event.target.value})
     setFormIsValid(
      event.target.value.trim().length > 6 && emailstate.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR' })
    
  };

  const validatePasswordHandler = () => {
    dispatchPass({"type":"ERR"})
     
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
