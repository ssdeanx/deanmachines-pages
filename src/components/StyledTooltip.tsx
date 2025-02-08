// src/components/StyledTooltip.tsx
import React from 'react';
import { Tooltip, TooltipProps, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

interface StyledTooltipProps extends TooltipProps {
  children: React.ReactElement;
}

const StyledTooltip: React.FC<StyledTooltipProps> = ({ children, title, ...props }) => {
  const theme = useTheme();

  // Handle empty title: Don't render the tooltip if the title is empty
  if (!title) {
    return <>{children}</>;
  }

  return (
    <Tooltip
      title={
        <React.Fragment>
          {typeof title === 'string' ? (
            <Typography variant="body2">{title}</Typography>
          ) : (
            title
          )}
        </React.Fragment>
      }
      {...props}
      arrow
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
        border: `1px solid ${grey[700]}`,
        '& .MuiTooltip-arrow': {
          color: theme.palette.background.paper,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      }}
    >
      {children}
    </Tooltip>
  );
};

export default StyledTooltip;