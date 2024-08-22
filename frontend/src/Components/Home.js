import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
function Home({ posts, setPosts }) {
    const navigate = useNavigate();
    const { state } = useAuth();
    
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Post with ID ${id} has been deleted.`);
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            } else {
                console.log('Failed to delete post:', response.status);
            }
        } catch (error) {
            console.log('Error deleting post:', error);
        }
    };

    return (
        <div className="container mt">
            <h3 className="text-center mb-3" style={{ paddingTop: "70px" }}>Posts</h3>
            <div className="row">
                {posts.map((post) => (
                    <div key={post.id} className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                {state.user && (
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/edit-post/${post.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
