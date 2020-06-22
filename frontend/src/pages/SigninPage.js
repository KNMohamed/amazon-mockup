import React, { useEffect, useState } from 'react'
import { signin } from '../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function SigninPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;
  const history = useHistory()
  const redirect = props.location.search?props.location.search.split("=")[1]:'/'
  
  useEffect(() => {
    /* If already logged in redirect to homepage*/
    if (userInfo) {
      history.push(redirect);
      
    }
    return () => {
      //
    }
  }, [userInfo, history,redirect]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  }

  return (
    <>
    {(redirect !== '/') &&
      <CheckoutSteps step1 />
    }
    <div className="form">
      <form action="post" onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>{loading && <div>Loading..</div>}</li>
          <li>{error && <div>{error}</div>}</li>
          <li>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
          </li>
          <li><button className="button primary" type="submit">Sign in</button></li>
          <li>New to Amazona?</li>
          <li><Link to={redirect === "/" ? "/register" : "/register?redirect=" + redirect} className="button secondary text-center">Create your Amazona account</Link></li>
        </ul>
      </form>
    </div>
    </>
  )
}
