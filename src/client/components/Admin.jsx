import React, { useState, useEffect } from 'react';


const Admin = ({ token, user }) => {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviewIdToDelete, setReviewIdToDelete] = useState('');
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  const API = "http://localhost:3000/api";

  useEffect(() => {
      fetchUsers();
      fetchReviews();
      fetchComments();  
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch(`${API}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  }

  async function fetchReviews() {
    try {
      const response = await fetch(`${API}/reviews`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  async function fetchComments() {
    try {
      const response = await fetch(`${API}/comments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  async function handleReviewDelete() {
    try {
      await fetch(`${API}/reviews/admin/${reviewIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review: ', error);
    }
  }

  async function handleCommentDelete() {
    try {
      await fetch(`${API}/comments/admin/${commentIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment: ', error);
    }
  }

  return (
    <div className='adminPage'>
      <h1>ADMIN PANEL</h1>

      <section className='adminusers'>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </section>

      <section className='adminreviews'>
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review) => (
            <li key={reviews.id}>
              {review.content} - {review.rating}
              <button onClick={handleReviewDelete}>Delete Review</button>
            </li>
          ))}
        </ul>
      </section>

      <section className='admincomments'>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              {comment.content}
              <button onClick={handleCommentDelete}>Delete Comment</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Admin;

