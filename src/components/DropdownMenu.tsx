// src/components/DropdownMenu.tsx (Corrected)
'use client';
import React, { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, useTheme, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import StyledTooltip from './StyledTooltip';


interface DropdownItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void; //onClick function
}

interface Props {
  label: React.ReactNode;
  items: DropdownItem[];
}

function DropdownMenu({ label, items }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color="inherit"
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ textTransform: 'none', color: 'white' }}

      >
        {label}
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
         PaperProps={{
          sx: {
            boxShadow: 1,
            borderRadius: 1,
            backgroundColor: theme.palette.background.paper,
            minWidth: 200, // Ensure sufficient width
            mt: 0.5,
          }
        }}
        TransitionProps={{
            timeout: 300
        }}
      >
        {items.map((item, index) => (
          <StyledTooltip key={index} title={item.label} placement="left">
          <MenuItem  onClick={() => {
              handleClose();
              if (item.onClick) {
                item.onClick();
                }
            }}>
            {item.href ? (
                <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex', alignItems: 'center' }}>
                    {item.icon && <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>{item.icon}</ListItemIcon>}
                    <ListItemText primary={<Typography variant="body2">{item.label}</Typography>}/>
                </Link>
            ) : (

                <>
                    {item.icon && <ListItemIcon sx={{minWidth: 'auto', mr: 1}}>{item.icon}</ListItemIcon>}
                    <ListItemText  primary={<Typography variant="body2">{item.label}</Typography>}/>
                </>

            )}
          </MenuItem>
            </StyledTooltip>
        ))}
      </Menu>
    </div>
  );
}

export default DropdownMenu;