// pages/machines.tsx (Correct)
import MachineCard from '../components/MachineCard';
import { Container, Stack, Typography, Skeleton, Box } from '@mui/material'; // Import Stack and Box
import { Suspense, useState, useEffect } from 'react';

interface Machine {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
}

// Type guard function
function isMachine(item: unknown): item is Machine {
    return (
        typeof item === 'object' &&
        item !== null &&
        'id' in item && typeof item.id === 'number' &&
        'title' in item && typeof item.title === 'string' &&
        'description' in item && typeof item.description === 'string' &&
        'image' in item && typeof item.image === 'string' &&
        'price' in item && typeof item.price === 'number' &&
        (!('category' in item) || typeof item.category === 'string')
    );
}

// Server Component to fetch the data
async function getMachines() {
    const YOUR_API_ENDPOINT = 'https://fakestoreapi.com/products'; // REPLACE THIS!
    const res = await fetch(YOUR_API_ENDPOINT);

    if (!res.ok) {
      // Throw an error if the response is not ok
      throw new Error(`Failed to fetch machines: ${res.status}`);
    }

    const data = await res.json();

    const machines: Machine[] = data.map((item: unknown) => {
        if (isMachine(item)) {
            return item;
        } else {
            console.error('Invalid machine data:', item);
            return null; //  Return null for invalid items
        }
    }).filter((item: Machine | null): item is Machine => item !== null); // Filter out null values


    return machines
}

function MachineCardSkeleton() {
    return (
        // Use Box instead of Grid item
        <Box width={{ xs: '100%', sm: '50%', md: '33.33%' }}>
            <Skeleton variant="rectangular" width={345} height={140} />
            <Skeleton variant="text" width={200} sx={{ fontSize: 'h5.fontSize' }} />
            <Skeleton variant="text" width={300} />
            <Skeleton variant="text" width={100} sx={{ fontSize: 'h6.fontSize' }}/>
            <Skeleton variant="text" width={80} />
        </Box>
    )
}
// Server Component to render
async function MachinesPage() {
    const machines = await getMachines();

    return (
        <div>
            <title>Machines</title>
            <meta name="description" content="List of machines" />
            <Container>
                <Typography variant="h2" component="h1" gutterBottom align="center">
                    Our Machines
                </Typography>
                {/* Use Stack instead of Grid container */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} flexWrap="wrap">
                    {machines.map((machine) => (
                        // Use Box instead of Grid item
                        <Box width={{ xs: '100%', sm: '50%', md: '33.33%' }} key={machine.id}>
                            <MachineCard machine={machine} />
                        </Box>
                    ))}
                </Stack>
            </Container>
        </div>
    );
}

// Wrap with Suspense for loading state and handle errors
export default function Page() {
    const [error, setError] = useState<string | null>(null);

      useEffect(() => {
    // Clear any previous error when the component mounts or remounts
    setError(null);
  }, []);

    return (
        <Suspense fallback={<Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} flexWrap="wrap"><MachineCardSkeleton/><MachineCardSkeleton/><MachineCardSkeleton/></Stack>}>
            {error ? (
              <Container maxWidth="md" sx={{mt: 4}}>
                <Typography variant="h5" color="error" align="center">
                  Error: {error}
                </Typography>
              </Container>
            ) : (
                <Suspense fallback={<Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} flexWrap="wrap"><MachineCardSkeleton/><MachineCardSkeleton/><MachineCardSkeleton/></Stack>}>
                  <MachinesPage />
                </Suspense>
            )}
        </Suspense>
    )
}