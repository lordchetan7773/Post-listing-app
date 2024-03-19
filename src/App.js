import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  
  const filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="app-container">
      <header className="header">
        <div className="navbar"> 
          <h1 style={{border:'1px solid white' , padding:'5px' , background:'white'}}>POST LISTING APP</h1>
          {/* Search bar */}
          <input style={{padding : '15px 150px'}}
            type="text"
            placeholder="Search posts using title ..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </header>
      <div className="container">
        {filteredPosts.length === 0 ? (
          <div className="no-result">No posts found! Please try again.</div>
        ) : (
          <div className="card-container">
            {filteredPosts.map(post => (
              <div className="card" key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
