// pages/index.tsx
import React from 'react';
import Head from 'next/head';
import {
  Stack,
    Box
} from '@mui/material';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import FeatureCard from '@/components/FeatureCard';

const HomePage: React.FC = () => {
    return (
        <>
            <Head>
              <title>Dean Machines</title>
              <meta name="description" content="Welcome to Dean Machines! Explore our cutting-edge robotics solutions." />
                <meta name="keywords" content="robotics, automation, machines, industrial, technology" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Hero />
             <Section title="FPV Projects" >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center" >
                  <Box width={{ xs: '100%', sm: '50%', md: '33.33%' }}>
                    <FeatureCard
                      title="FPV Project 1"
                      subtitle="High-Speed Drone"
                      description="Learn about my first FPV drone build and its capabilities."
                      link="/docs/fpv"
                      linkText="View FPV Docs"
                    />
                  </Box>
                  <Box width={{ xs: '100%', sm: '50%', md: '33.33%' }}>
                    <FeatureCard
                      title="FPV Project 2"
                      subtitle="Long-Range Flight"
                      description="Explore my experiments with long-range FPV flights."
                      link="/docs/fpv"
                      linkText="View FPV Docs"
                    />
                  </Box>
                   <Box width={{ xs: '100%', sm: '50%', md: '33.33%' }}>
                    <FeatureCard
                      title="FPV Project 3"
                      subtitle="Cinematic Drone"
                      description="Discover how I built a drone for capturing cinematic footage."
                      link="/docs/fpv"
                      linkText="View FPV Docs"
                    />
                  </Box>
                </Stack>
            </Section>
            </>

    );
};

export default HomePage;