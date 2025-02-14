import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description'; // New Icons
import BookIcon from '@mui/icons-material/Book';
import CodeIcon from '@mui/icons-material/Code';
import RuleIcon from '@mui/icons-material/Rule';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    width: 240,
    // background: `linear-gradient(45deg, #424242 30%, #303030 90%)`, // Old gradient background
    background: '#333', // Solid dark grey background
    color: '#fff',
    borderRight: 0,
    boxShadow: '0.25rem 0.25rem 0.5rem rgba(0,0,0,0.25)',
    transition: 'width 0.3s ease-in-out',
  },
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
  '&:hover': {
    // backgroundColor: '#90caf9', // Old hover color
    backgroundColor: '#555', // Lighter grey hover color
    color: '#fff', // Keep text white on hover
    '& .MuiListItemIcon-root': {
      color: '#fff', // Keep icon white on hover
    },
    transition: 'background-color 0.2s ease-in-out', // Smooth hover transition
  },
  '&.Mui-selected': {
    backgroundColor: '#1976d2',
    color: '#fff',
    '& .MuiListItemIcon-root': {
      color: '#fff',
    },
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#0d47a1',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(() => ({
  color: '#9E9E9E', // Keep icon color as is
}));

const StyledListItemText = styled(ListItemText)(() => ({
  '& .MuiTypography-root': {
    fontWeight: 500,
  },
}));


const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => (
    <StyledDrawer
      open={isOpen}
      onClose={onClose}
      variant="persistent"
      anchor="left"
    >
      <List>
        {['Components', 'Contributing', 'FPV', 'Requirements'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link href={`/docs/${text.toLowerCase()}`} passHref>
                <StyledListItemButton
                  selected={`/docs/${text.toLowerCase()}` === window.location.pathname}
                >
                  <StyledListItemIcon>
                    {/* Updated Icons based on index */}
                    {index === 0 && <CodeIcon />}
                    {index === 1 && <BookIcon />}
                    {index === 2 && <DescriptionIcon />}
                    {index === 3 && <RuleIcon />}
                  </StyledListItemIcon>
                  <StyledListItemText primary={text} />
                </StyledListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );

export default Sidebar;