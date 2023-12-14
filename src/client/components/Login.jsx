import React, { useState } from 'react';
import Register from './Register';
import { useNavigate } from 'react-router-dom'


const Login = ({ setToken, setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const result = await response.json();

      setToken(result.token);
      setMessage(result.message);

      if (!response.ok) {
        throw (result)
      }
      navigate(`/users/me`)
      setEmail('');
      setPassword('');
      setUserId(result.id);

    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      <div className="login-body">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="sign-up">
            <Register />
          </div>

          <div className="login">
            <form onSubmit={handleSubmit}>
              <label htmlFor="chk" aria-hidden="true">Login</label>
              <input type="email" placeholder={"Email"} value={email}
                onChange={handleEmailChange} required />

              <input type="password" placeholder={"Password"} value={password}
                onChange={handlePasswordChange} required />

              <button type="submit">Sign In</button>
            </form>
          </div>

        </div>
      </div>
    </>

  );
};

export default Login;
