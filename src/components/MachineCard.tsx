// src/components/MachineCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
    Box
} from '@mui/material';
import Image from 'next/image';
import StyledTooltip from './StyledTooltip'; // Import

interface Machine {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

interface Props {
  machine: Machine;
}

function MachineCard({ machine }: Props) {
  return (
     <StyledTooltip title={<>
                        <Typography variant="h6" component="div">
                    {machine.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click anywhere on card for more options.
                  </Typography>
                  </>} placement='top'>
    <Card sx={{ maxWidth: 345 }}>
      <StyledTooltip title={machine.title} placement="top">
      {/* Use Box with sx prop instead of div with inline styles */}
      <Box sx={{ position: 'relative', width: '100%', height: 140 }}>
        <Image
          src={machine.image}
          alt={machine.title}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="/placeholder.png"  // You need to create this file
        />
      </Box>
      </StyledTooltip>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {machine.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {machine.description}
        </Typography>
        <Typography variant="h6" color="text.primary">
          ${machine.price}
        </Typography>
      </CardContent>
      <CardActions>
      <StyledTooltip title="Learn More" placement="bottom-start">
        <Button size="small" color="primary">
          Learn More
        </Button>
         </StyledTooltip>
      </CardActions>
    </Card>
    </StyledTooltip>
  );
}

export default MachineCard;