// pages/docs/fpv.tsx
import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, FormControlLabel, Checkbox, Button, Divider, Box } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Head from 'next/head';

function FPVPage() {
    const [videoUrl, setVideoUrl] = useState('');
    const [savedUrl, setSavedUrl] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(event.target.value);
    };

    const handleSaveUrl = () => {
        setSavedUrl(videoUrl);
        // In a real application, you would likely save this to local storage or a database.
        console.log('Saving URL:', videoUrl);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar isOpen={true} onClose={() => {}} />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Head>
                    <title>FPV Video</title>
                    <meta name="description" content="FPV Video Feed" />
                </Head>

                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom align="center">
                        FPV Video Feed
                    </Typography>

                    <Typography paragraph>
                        This page displays a live video stream from the FPV drone.
                    </Typography>

                    <TextField
                      fullWidth
                      label="Enter Video URL"
                      variant="outlined"
                      value={videoUrl}
                      onChange={handleUrlChange}
                      sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSaveUrl} sx={{ mb: 2}}>
                        Save URL
                    </Button>

                    {savedUrl && (
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Saved URL: {savedUrl}
                        </Typography>
                    )}

                    <FormControlLabel
                        control={<Checkbox checked={showAdvanced} onChange={() => setShowAdvanced(!showAdvanced)} />}
                        label="Show Advanced Options"
                        sx={{ mb: 2 }}
                    />

                    {showAdvanced && (
                        <>
                          <Divider sx={{ my: 2 }} />
                          <Typography variant="h6" gutterBottom>
                            Advanced Options
                          </Typography>
                          <List>
                            <ListItem>
                              <ListItemText primary="Real-time video processing" secondary="Enable real-time object detection and tracking." />
                            </ListItem>
                            <ListItem>
                              <ListItemText primary="Low-latency streaming" secondary="Minimize video delay for better control." />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Adaptive bitrate" secondary="Adjust video quality based on network conditions."/>
                            </ListItem>
                          </List>
                        </>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* Placeholder for the video element.  You'd replace this with your actual video streaming logic. */}
                    <div style={{ width: '100%', height: '400px', backgroundColor: 'lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6">Video Stream Placeholder</Typography>
                    </div>
                </Container>
            </Box>
        </Box>
    );
}

export default FPVPage;