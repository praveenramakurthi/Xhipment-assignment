import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPost = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });
      const newPost = await response.json();

      addPost(newPost);
      alert("Post added successfully!!!")
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "100px" }}>
      <h2 className="text-center">New Post</h2>
      <form onSubmit={handleSubmit} className="form-group" style={{ maxWidth: "600px", margin: "0 auto", paddingTop: "30px" }}>
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit" className="btn btn-success w-100">Submit</button>
      </form>
    </div>
  );
};

export default NewPost;
