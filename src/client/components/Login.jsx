import React, { useState } from 'react';
import Register from './Register';



const Login = ({setToken, setUserId}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        });
        const result = await response.json();
        console.log('login result:', result)
        console.log('token result:', result.token)
        // console.log('id result:', result.id)

        // console.log('userId:', result.user?.id);
        // setUserId(result.user?.id);


        // Adjust this line based on the actual structure of the result object
        // setUserId(result.id || result.user?.id);

        // const userId = result.id || result.user?.id;
        // console.log('userId:', userId)

        // setUserId(userId);
        setToken(result.token);
        setMessage(result.message);

        if(!response.ok) {
          throw(result)
        }
        setEmail('');
        setPassword('');

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

          {/* <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>Please login with your personal info</p>
                <button className="ghost" id="signIn">Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello</h1>
                <p>Enter your personal details to create an account</p>
                <button className="ghost" id="signUp">Sign Up</button>
              </div>
            </div>
          </div> */}

        </div>
      </div>
    </>
    // <div>
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor='email'>Email:</label>
    //       <input
    //         type='email'
    //         id='email'
    //         value={email}
    //         onChange={handleEmailChange}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor='password'>Password:</label>
    //       <input
    //         type='password'
    //         id='password'
    //         value={password}
    //         onChange={handlePasswordChange}
    //         required
    //       />
    //     </div>
    //     <button type='submit'>Login</button>
    //   </form>
    //   <p>{message}</p>

    //   <Register />
    // </div>
  );
};

export default Login;
