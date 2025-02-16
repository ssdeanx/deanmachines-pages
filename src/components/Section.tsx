// src/components/Section.tsx
import React from 'react';
import { Typography, Container, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bgColor?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  centered?: boolean;
  withGradient?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  bgColor,
  maxWidth = 'lg',
  centered = false,
  withGradient = false,
}) => {
  const theme = useTheme();

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box
      component={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      sx={{
        position: 'relative',
        py: { xs: 6, md: 8 },
        backgroundColor: bgColor || 'transparent',
        overflow: 'hidden',
        '&::before': withGradient ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, ${theme.palette.primary.main}15, transparent)`,
          zIndex: 0,
        } : undefined,
      }}
    >
      <Container 
        maxWidth={maxWidth}
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: centered ? 'center' : 'left',
        }}
      >
        <Box sx={{ mb: subtitle ? 4 : 6 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              background: withGradient 
                ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                : 'inherit',
              WebkitBackgroundClip: withGradient ? 'text' : 'none',
              WebkitTextFillColor: withGradient ? 'transparent' : 'inherit',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: centered ? '600px' : 'none',
                margin: centered ? '0 auto' : 'inherit',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: 4,
            alignItems: 'center',
            justifyContent: centered ? 'center' : 'flex-start',
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Section;