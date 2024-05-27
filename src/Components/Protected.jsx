import React from "react";
import Button from "./Button";

const Protected = () => {
  return (
    <div>
      <div>
      <header>
      <h1>Welcome to My Express App</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about.html">About</a></li>
          <li><a href="/contact.html">Contact</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <h2>Home Page</h2>
      <p>This is the home page of your Express application.</p>
      <input
        type="number"
        id="post-limit"
        placeholder="Enter number of posts"
      />
      <button id="get-posts-btn">Get Posts</button>
      <div id="output"></div>
      <form id="add-post-form">
        <h3>Add a New Post</h3>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          required
        /><br />
        <textarea
          id="content"
          name="content"
          placeholder="Content"
          required
        ></textarea>
        <button type="submit">Add Post</button>
      </form>
      <script src="/js/main.js"></script>
    </main>
    <footer>
      <p>&copy; 2024 My Express App</p>
    </footer>s
        <Button>Log out</Button>
      </div>
    </div>
  );
};

export default Protected;
