// pages/machines.tsx (Correct)
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Stack, 
  Typography, 
  Skeleton, 
  Box,
  Grid,
  Paper,
  InputBase,
  IconButton,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Fade,
  useTheme,
  SelectChangeEvent
} from '@mui/material';
import MachineCard from '../components/MachineCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { motion, AnimatePresence } from 'framer-motion';

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
    const YOUR_API_ENDPOINT = 'https://fakestoreapi.com/products';
    try {
        const res = await fetch(YOUR_API_ENDPOINT);
        if (!res.ok) {
            throw new Error(`Failed to fetch machines: ${res.status}`);
        }
        const data = await res.json();
        const machines: Machine[] = data
            .map((item: unknown) => {
                if (isMachine(item)) {
                    return item;
                } else {
                    console.error('Invalid machine data:', item);
                    return null;
                }
            })
            .filter((item: Machine | null): item is Machine => item !== null);

        return machines;
    } catch (error) {
        console.error('Error fetching machines:', error);
        throw error;
    }
}

function MachineCardSkeleton() {
    return (
        <Paper 
            elevation={2}
            sx={{ 
                p: 2, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="text" width="70%" height={32} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="40%" height={24} />
            <Stack direction="row" spacing={1}>
                <Skeleton variant="rounded" width={80} height={32} />
                <Skeleton variant="rounded" width={80} height={32} />
            </Stack>
        </Paper>
    );
}

function MachinesPage() {
    const theme = useTheme();
    const [machines, setMachines] = useState<Machine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getMachines();
                setMachines(data);
                // Extract unique categories
                const uniqueCategories = Array.from(new Set(data.map(machine => machine.category)));
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategoryFilter(event.target.value);
    };

    const filteredAndSortedMachines = machines
        .filter(machine => {
            const matchesSearch = machine.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                machine.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || machine.category === categoryFilter;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <Box 
            sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                height: '100%'
            }}
        >
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ mb: 6 }}>
                    <Typography 
                        variant="h2" 
                        component="h1" 
                        gutterBottom 
                        align="center"
                        sx={{
                            background: theme.palette.mode === 'dark'
                                ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Our Machines
                    </Typography>
                    
                    {/* Search and Filter Section */}
                    <Paper 
                        elevation={2}
                        sx={{ 
                            p: 2, 
                            mb: 4,
                            background: theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.05)'
                                : 'rgba(0, 0, 0, 0.02)'
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <Paper
                                    sx={{
                                        p: '2px 4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search machines..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <IconButton sx={{ p: '10px' }}>
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        onChange={handleSortChange}
                                        label="Sort By"
                                        startAdornment={<SortIcon sx={{ mr: 1 }} />}
                                    >
                                        <MenuItem value="default">Default</MenuItem>
                                        <MenuItem value="price-asc">Price: Low to High</MenuItem>
                                        <MenuItem value="price-desc">Price: High to Low</MenuItem>
                                        <MenuItem value="title">Title</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={categoryFilter}
                                        onChange={handleCategoryChange}
                                        label="Category"
                                        startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
                                    >
                                        <MenuItem value="all">All Categories</MenuItem>
                                        {categories.map(category => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Paper>

                    {error ? (
                        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'error.light' }}>
                            <Typography variant="h6" color="error">
                                Error: {error}
                            </Typography>
                        </Paper>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Grid container spacing={3}>
                                <AnimatePresence>
                                    {loading ? (
                                        // Skeleton loading state
                                        Array.from(new Array(6)).map((_, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
                                                <MachineCardSkeleton />
                                            </Grid>
                                        ))
                                    ) : (
                                        // Actual machines
                                        filteredAndSortedMachines.map((machine) => (
                                            <Grid item xs={12} sm={6} md={4} key={machine.id}>
                                                <motion.div variants={itemVariants}>
                                                    <MachineCard machine={machine} />
                                                </motion.div>
                                            </Grid>
                                        ))
                                    )}
                                </AnimatePresence>
                            </Grid>
                        </motion.div>
                    )}

                    {!loading && filteredAndSortedMachines.length === 0 && (
                        <Paper sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="h6" color="text.secondary">
                                No machines found matching your criteria
                            </Typography>
                        </Paper>
                    )}
                </Box>
            </Container>
        </Box>
    );
}

export default MachinesPage;