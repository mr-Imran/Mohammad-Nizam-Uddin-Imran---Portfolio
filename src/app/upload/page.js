// src/app/upload/page.js
"use client";
import React, { useState } from 'react';
import { Container, Typography, Button, Box, CircularProgress, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { CSSTransition } from 'react-transition-group';
import './upload.module.css';

const UploadContainer = styled(Container)({
  textAlign: 'center',
  marginTop: '64px', // Adjust as needed
});

const UploadTypography = styled(Typography)({
  marginBottom: '24px', // Adjust as needed
  color: '#26355D', // Text color from palette
});

const FileInput = styled('input')({
  display: 'none',
});

const FileInputLabel = styled(Button)({
  marginTop: '16px', // Adjust as needed
  backgroundColor: '#AF47D2', // Button color from palette
  color: 'white', // Button text color from palette
});

const UploadButton = styled(Button)({
  marginTop: '16px', // Adjust as needed
  backgroundColor: '#26355D', // Button color from palette
  color: 'white', // Button text color from palette
});

const UploadAnimation = styled(CircularProgress)({
  marginTop: '16px', // Adjust as needed
});

const BlastContainer = styled('div')({
  textAlign: 'center',
  marginTop: '20px', // Adjust as needed
});

const BlastEffect = styled('div')({
  transform: 'scale(1)',
  opacity: 1,
  transition: 'transform 500ms cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 500ms cubic-bezier(0.18, 0.89, 0.32, 1.28)',
});

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Imran' && password === 'Imran4004@') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result); // Assuming result handling logic

      setUploaded(true);
    } catch (error) {
      console.error('Error uploading file: ', error);
    } finally {
      setUploading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <UploadContainer maxWidth="sm">
        <UploadTypography variant="h4" component="h1" gutterBottom>
          Login
        </UploadTypography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            color="primary"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            color="primary"
          />
          <Box my={2}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </form>
      </UploadContainer>
    );
  }

  // If logged in, show upload form
  return (
    <UploadContainer maxWidth="sm">
      <UploadTypography variant="h4" component="h1" gutterBottom>
        Upload File
      </UploadTypography>
      <form onSubmit={handleSubmit}>
        <FileInput
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.gif"
        />
        <label htmlFor="fileInput">
          <FileInputLabel
            variant="contained"
            color="primary"
            component="span"
          >
            Select File
          </FileInputLabel>
        </label>
        <Box my={2}>
          <UploadButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={!file || uploading}
          >
            Upload
          </UploadButton>
        </Box>
      </form>

      {/* Upload Animation */}
      <CSSTransition
        in={uploading}
        timeout={300}
        classNames="upload-animation"
        unmountOnExit
      >
        <UploadAnimation />
      </CSSTransition>

      {/* Upload Success Blast Effect */}
      <CSSTransition
        in={uploaded}
        timeout={500}
        classNames="blast-effect"
        unmountOnExit
      >
        <BlastContainer>
          <BlastEffect>
            <Typography variant="body1" gutterBottom style={{ color: '#26355D' }}>
              File Uploaded Successfully!
            </Typography>
          </BlastEffect>
        </BlastContainer>
      </CSSTransition>
    </UploadContainer>
  );
};

export default UploadPage;
