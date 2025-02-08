// src/components/FeatureCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';
// import Image from 'next/image'; // Removed
import Link from 'next/link';
import StyledTooltip from './StyledTooltip';
import { useTheme } from '@mui/material/styles';

interface FeatureCardProps {
  title: string;
  subtitle?: string; // Optional
  description: string;
  link?: string;    // Optional
    linkText?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, subtitle, description, link, linkText }) => {
     const theme = useTheme();
  return (
    <Card sx={{ maxWidth: 345 }}>
        {/* Placeholder background color */}
        <Box sx={{
            width: '100%',
            height: 200,
            backgroundColor: theme.palette.grey[300], // Light gray fallback
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant="h6" color="text.secondary">
                Image Placeholder
            </Typography>
        </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {link && (
        <CardActions>
           <StyledTooltip title={linkText || "Learn More"} placement="bottom">
          <Link href={link} passHref legacyBehavior>
          <Button size="small" color="primary">
            {linkText || "Learn More"}
          </Button>
          </Link>
            </StyledTooltip>
        </CardActions>
      )}
    </Card>
  );
};

export default FeatureCard;