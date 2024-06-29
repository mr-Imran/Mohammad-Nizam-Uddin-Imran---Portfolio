/* eslint no-use-before-define: 0 */  // --> OFF
"use client";
import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Box, Avatar, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ColorThief from 'colorthief';
import styles from './HomePage.module.css';
import Head from 'next/head';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [titleColor, setTitleColor] = useState('#000');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3001/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const img = document.querySelector('#profile-avatar');
    const colorThief = new ColorThief();

    img.addEventListener('load', () => {
      const color = colorThief.getColor(img);
      setTitleColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    });

    if (img.complete) {
      const color = colorThief.getColor(img);
      setTitleColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    }
  }, []);

  return (
    <Container>
      <Head>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org/",
            "@type": "Person",
            "name": "Mohammad Nizam Uddin Imran",
            "image": "https://yourwebsite.com/profile.jpg",
            "jobTitle": "Student",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dhaka",
              "addressCountry": "Bangladesh"
            },
            "email": "contact@imrann.my.id"
          }`}
        </script>
      </Head>

      {/* Hero Section */}
      <Box my={4} textAlign="center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" component="h1" gutterBottom style={{ color: titleColor }}>
            Welcome to My Portfolio
          </Typography>
          <div className={styles.avatarFrame}>
            <Avatar
              id="profile-avatar"
              src="/profile.jpg"
              alt="Mohammad Nizam Uddin Imran"
              sx={{ width: 150, height: 150 }}
            />
          </div>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 2 }}>
            Mohammad Nizam Uddin Imran
          </Typography>
          <Typography variant="body1" component="p" sx={{ mt: 1 }}>
            Hi, I’m Mohammad Nizam Uddin Imran. I’m a student living in Dhaka. I am a fan of technology, web development, and programming. I’m also interested in gaming and innovation.
          </Typography>
        </motion.div>
      </Box>

      {/* Blog Posts Section */}
      <Box my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Blog Posts
        </Typography>
        {posts.length === 0 ? (
          <Typography>No posts available</Typography>
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card variant="outlined" sx={{ mb: 2, backgroundColor: '#FFF3E0' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </Box>

      {/* Portfolio Section */}
      <Box my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          My Projects
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Cheesy Bites App
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A delightful UX design project for a food delivery app.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Apple Health App
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  UX design for Apple's health tracking app.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Bookit App
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A UX project for a hotel booking app.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Contact Section */}
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Me
        </Typography>
        <Typography variant="body1" component="p" sx={{ mt: 2 }}>
          Feel free to reach out for collaborations or just a friendly chat.
        </Typography>
        <Typography variant="body1" component="p" sx={{ mt: 1 }}>
          Email: work.nizamuddin@gmail.com
        </Typography>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Get in Touch
          </Button>
        </motion.div>
      </Box>

      {/* Footer Animation */}
      <Box className={styles.footerAnimation}>
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 10,
            ease: 'linear'
          }}
          className={styles.animatedBar}
        />
      </Box>
    </Container>
  );
};

export default HomePage;
