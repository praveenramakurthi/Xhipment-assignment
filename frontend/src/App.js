import React, { useState,useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Home from './Components/Home';
import NewPost from './Components/NewPost';
import EditPost from './Components/EditPost';
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const { state } = useAuth();
  console.log("newPost", posts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/new-post" element={state.user ? <NewPost addPost={addPost} /> : <Navigate to="/signin" />} />
        <Route path="/edit-post/:id" element={state.user ? <EditPost /> : <Navigate to="/signin" />} />
      </Routes>
    </div>
  );
};

export default App;
