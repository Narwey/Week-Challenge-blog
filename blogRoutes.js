const express = require('express');
const router = express.Router();


const blogPosts = [
    {
      id: 1,
      title: 'Harry Potter and the Sorcerer\'s Stone',
      content: 'In this blog post, we delve into the magic of Harry Potter and the Sorcerer\'s Stone, the first film in the series.',
      author: 'HarryPotterFan',
      releaseYear: 2001,
      image:'1.jpeg'
    },
    {
      id: 2,
      title: 'Harry Potter and the Chamber of Secrets',
      content: 'Explore the secrets hidden within Hogwarts in our blog post about the second film in the Harry Potter series.',
      author: 'WandWielder',
      releaseYear: 2002,
      image:'2.jpeg'
    },
    {
      id: 3,
      title: 'Harry Potter and the Prisoner of Azkaban',
      content: 'Take a journey through time with our analysis of Harry Potter and the Prisoner of Azkaban.',
      author: 'HogwartsHistorian',
      releaseYear: 2004,
      image:'3.jpeg'
    },
    {
    id: 4,
      title: 'Harry Potter And the Deathly Hallows',
      content: 'Take a journey through time with our analysis of harry potter and the deathly hallows.',
      author: 'NarweyArt',
      releaseYear: 2010,
      image:'4.jpeg'
    },
  ];

  router.get('/blogs', (req, res) => {
    res.render('blog', { blogPosts }); // Render the 'blog' template and pass 'blogPosts' data
  });
  
  // Get a specific blog post by ID
  router.get('/:id/edit', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find((post) => post.id === postId);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.render('edit', { post }); // Render the 'edit' template and pass the post data
    res.redirect('/blogs');
  });
  
  // Create a new blog post
  router.post('/:id/edit', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, author, releaseYear } = req.body;
    const post = blogPosts.find((post) => post.id === postId);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    post.title = title;
    post.content = content;
    post.author = author;
    post.releaseYear = releaseYear;
    res.redirect('/blogs'); // Redirect to the main blog page after updating
  });
  
  
  router.put('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, author, releaseYear } = req.body;
    const post = blogPosts.find((post) => post.id === postId);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    post.title = title;
    post.content = content;
    post.author = author;
    post.releaseYear = releaseYear;
    res.redirect('/blogs');
  });
  
  // Delete a blog post by ID
  router.post('/:id/delete', (req, res) => {
    const postId = parseInt(req.params.id);
    const index = blogPosts.findIndex((post) => post.id === postId);
    if (index === -1) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    blogPosts.splice(index, 1);
    res.redirect('/blogs'); // Redirect to the main blog page after deleting
  });
  
  module.exports = router;