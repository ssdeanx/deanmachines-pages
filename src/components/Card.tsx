import { Box, Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  elevation?: number;
  hover?: boolean;
}

const Card = ({ title, children, elevation = 1, hover = true }: CardProps) => {
  const theme = useTheme();

  return (
    <Paper
      component={motion.div}
      whileHover={hover ? { y: -5, boxShadow: theme.shadows[elevation + 2] } : undefined}
      transition={{ duration: 0.2 }}
      elevation={elevation}
      sx={{
        overflow: 'hidden',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      {title && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
        </Box>
      )}
      <Box sx={{ p: 2 }}>{children}</Box>
    </Paper>
  );
};

export default Card; 