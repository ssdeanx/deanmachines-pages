'use client';
import { useEffect, useState } from 'react';
import { Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop = () => {
  const [mounted, setMounted] = useState(false);
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!mounted) return null;

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        size="small"
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop; 