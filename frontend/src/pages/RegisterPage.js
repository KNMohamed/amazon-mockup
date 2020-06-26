import React, { useEffect, useState } from 'react'
import { register } from '../actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

export default function RegisterPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = props.location.search?props.location.search.split("=")[1]:'/'

  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }

  useEffect(() => {
    /* If already logged in redirect to homepage*/
    if (userInfo) {
      history.push(redirect);
    }
    return () => {
      //
    }
  }, [userInfo, history,redirect]);

  return (
    <div className="form">
      <form action="post" onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>{loading && <div>Loading..</div>}</li>
          <li>{error && <div>{error}</div>}</li>
          <li>
            <label htmlFor="name">Name</label>
            <input type="name" name="name" id="name" required={true} onChange={(e) => setName(e.target.value)} />
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required={true} onChange={(e) => setEmail(e.target.value)} />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required={true} onChange={(e) => setPassword(e.target.value)} />
          </li>
          <li>
            <label htmlFor="rePassword">Re-enter Password</label>
            <input type="password" name="rePassword" id="rePassword" required={true} />
          </li>
          <li><button className="button primary" type="submit">Register</button></li>
          <li>Already have an account?</li>
          <li><Link to={redirect === "/" ? "/signin" : "/signin?redirect=" + redirect} className="button secondary text-center">Sign-in</Link></li>
        </ul>
      </form>
    </div>
  )
}
