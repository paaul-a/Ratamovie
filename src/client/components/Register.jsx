import { useState } from "react";
let API = "http://localhost:3000/api"

function Register({ setToken }) {
  const [name, setName ] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${API}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },

        body: JSON.stringify({
          name,
          email, 
          password,
        })
      })

      const result = await response.json()
      console.log('set token:', result.token)
      setToken(result.token)
      setName("");
      // setFirstName("");
      // setLastName("");
      setEmail("");
      setPassword("");

    } catch(err) {
      console.error(err.message)
    }
  }

  return (
    <>
        <div className="signup">
          <form onSubmit={handleSubmit}>
            <label for="chk" aria-hidden="true">Sign Up</label>
            <input type="text" placeholder={"Name"} required="" value={name}
              onChange={(event) => setName(event.target.value)}/>
            <input type="email" placeholder={"Email"} required="" value={email}
              onChange={(event) => setEmail(event.target.value)}/>
            <input type="password" placeholder={"Password"} required="" value={password}
              onChange={(event) => {
                setPassword(event.target.value)
              }} />
            <button type="submit">Sign Up</button>
          </form>
        </div>
          {/* <label htmlFor="chk" aria-hidden="true">Sign Up</label> */}
          
          {/* <input type="text" name="name" placeholder={"Name"} required="" value={name}
            onChange={(event) => setName(event.target.value)}/> */}

          {/* <input type="text" name="lastname" placeholder={"Last Name"} required="" value={lastName}
            onChange={(event) => setLastName(event.target.value)}/> */}

          {/* <input type="email" name="email" placeholder={"Email"} required="" value={email}
            onChange={(event) => setEmail(event.target.value)}/> */}

          {/* <input type="password" name="pswd" placeholder={"Password"} required="" value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }} /> */}

          {/* <button type="submit">Sign Up</button>
        </form>

       </div> */}
  
    </>
  )

}

export default Register 