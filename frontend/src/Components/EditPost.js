import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching post: ${response.status}`);
        }
        const data = await response.json();
        setTitle(data.title);
        setBody(data.body);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        console.log('Post successfully updated:', updatedPost);
        navigate('/', { state: { updatedPost } });
      } else {
        console.error('Failed to update post:', response.status);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "100px" }}>
      <h2 className="text-center">Edit Post</h2>
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
          rows="5"
        />
        <button type="submit" className="btn btn-success w-100">Submit</button>
      </form>
    </div>
  );
};

export default EditPost;
