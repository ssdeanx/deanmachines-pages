// pages/docs/fpv.tsx
import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, TextField, FormControlLabel, Checkbox, Button, Box, Paper, Grid } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import VideocamIcon from '@mui/icons-material/Videocam';
import TuneIcon from '@mui/icons-material/Tune';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
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

    const advancedOptions = [
        {
            title: 'Real-time Video Processing',
            description: 'Enable real-time object detection and tracking.',
            icon: <VideocamIcon />
        },
        {
            title: 'Low-latency Streaming',
            description: 'Minimize video delay for better control.',
            icon: <SpeedIcon />
        },
        {
            title: 'Adaptive Bitrate',
            description: 'Adjust video quality based on network conditions.',
            icon: <TuneIcon />
        }
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar isOpen={true} onClose={() => {}} />
            <Box sx={{ flexGrow: 1, p: 4, backgroundColor: 'background.default' }}>
                <Head>
                    <title>FPV Video</title>
                    <meta name="description" content="FPV Video Feed" />
                </Head>

                <Container maxWidth="lg">
                    <Box textAlign="center" sx={{ mb: 6 }}>
                        <Typography variant="h2" component="h1" gutterBottom>
                            FPV Video Feed
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" paragraph>
                            Live video streaming and configuration for FPV drone control
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {/* Video Stream Section */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 4 }}>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h4" gutterBottom>
                                        Video Stream
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        label="Enter Video URL"
                                        variant="outlined"
                                        value={videoUrl}
                                        onChange={handleUrlChange}
                                        sx={{ mb: 2 }}
                                    />
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={handleSaveUrl}
                                        startIcon={<VideocamIcon />}
                                        sx={{ mb: 2 }}
                                    >
                                        Save URL
                                    </Button>
                                    {savedUrl && (
                                        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                                            Saved URL: {savedUrl}
                                        </Typography>
                                    )}
                                </Box>
                                <Box 
                                    sx={{ 
                                        width: '100%', 
                                        height: '400px', 
                                        backgroundColor: 'action.hover',
                                        borderRadius: 1,
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center' 
                                    }}
                                >
                                    <Typography variant="h6" color="text.secondary">
                                        Video Stream Placeholder
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Advanced Options Section */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 4 }}>
                                <Box display="flex" alignItems="center" mb={3}>
                                    <SettingsIcon fontSize="large" />
                                    <Typography variant="h4" sx={{ ml: 2 }}>
                                        Advanced Options
                                    </Typography>
                                </Box>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            checked={showAdvanced} 
                                            onChange={() => setShowAdvanced(!showAdvanced)}
                                            color="primary"
                                        />
                                    }
                                    label="Show Advanced Settings"
                                    sx={{ mb: 2 }}
                                />
                                {showAdvanced && (
                                    <List>
                                        {advancedOptions.map((option, index) => (
                                            <ListItem 
                                                key={option.title}
                                                sx={{
                                                    borderBottom: index < advancedOptions.length - 1 ? '1px solid' : 'none',
                                                    borderColor: 'divider',
                                                    py: 2
                                                }}
                                            >
                                                <Box sx={{ mr: 2 }}>{option.icon}</Box>
                                                <ListItemText
                                                    primary={option.title}
                                                    secondary={option.description}
                                                    primaryTypographyProps={{
                                                        variant: 'h6',
                                                        gutterBottom: true
                                                    }}
                                                    secondaryTypographyProps={{
                                                        variant: 'body2'
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default FPVPage;