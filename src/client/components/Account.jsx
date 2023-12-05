import { useState, useEffect } from 'react'

// eslint-disable-next-line react/prop-types
function Account({ token }) {
  const [userData, setUserData] = useState({});
  const [reviewedMovies, setReviewedMovies] =useState([]);
  let API = "http://localhost:3000/api"
  
  useEffect(() =>{
    fetchAccount();
    fetchReviewedMovies();
  }, []);
  
  async function fetchAccount(){
      if (token){
        try{ 
          const response = await fetch (`${API}/users/me`,
          {
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const result = await response.json();
        setUserData(result);
      }catch(error){
        console.error(error.message)
      }
    }else{
      console.log("Sorry, you are not logged in!")
      
    }
  }
  async function fetchReviewedMovies(){
    if (token){
      try{
        const response = await fetch(`${API}/users/reviews`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setReviewedMovies(result.reviews);
      } catch(error) {
        console.error(error.message);
      }
    }
  }

  async function handleEditProfile() {
    try{
      const response = await fetch(`${API}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newUsername,
          newPassword,
        }),
      });
      if (response.ok){
        fetchAccount();
        setNewUsername('');
        setNewPassword('');
        setEditProfileMode(false);
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error){
      console.error('Error updating your profile:', error.message);
    }
  };
    return (
      <div>
        { token ? (
            <div>
          <h2>My Account</h2>
              <p>Name: {userData.firstname} {userData.lastname}</p>
              <p>Username: {userData.email}</p>
         <h3>Reviewed Movies:</h3>
         { reviewedMovies.length > 0 ? (

         <ul>    
          {reviewedMovies.map((movie) => {
            return (
                <li key={movie.id}>
                  {movie.title}
                  {movie.year}
                  {/* {movie.userid.review} */}
                  {/*CHANGE THIS TO BE WHEN U CLICK ON THE REVIEW YOU GET THE SINGLE PAGE RENDERED <button onClick={() => handleReturn(book.id)}>Return</button> */}
                </li>
            )
          } )}
         </ul>
         ) : (
          <h2> You havent reserved any movies yet!!</h2>
         )}
    </div>
         ) : (
          <h3>Sorry! You are not logged in! Please login or register to see this page!</h3>
         )}
     </div>
);
}

export default Account