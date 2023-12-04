import { useState } from "react";
let API = "http://localhost:3000/api"

function Register({ setToken }) {
  const [firstName, setFirstName ] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${API}/users/register`, {
        methd: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstname: firstName,
          lastName: lastName,
          email, 
          password,
        })
      })

      const result = await response.json()
      setToken(result.token)
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

    } catch(err) {
      console.error(err.message)
    }
  }

  return (
    <>
       < div>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">Sign Up</label>
          <input type="text" name="firstname" placeholder={"First Name"} required="" value={firstName}
            onChange={(event) => setFirstName(event.target.value)}/>

          <input type="text" name="lastname" placeholder={"Last Name"} required="" value={lastName}
            onChange={(event) => setLastName(event.target.value)}/>

          <input type="email" name="email" placeholder={"Email"} required="" value={email}
            onChange={(event) => setEmail(event.target.value)}/>

          <input type="password" name="pswd" placeholder={"Password"} required="" value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }} />

          <button type="submit">Sign Up</button>
        </form>

       </div>
  
    </>
  )

}

export default Register 