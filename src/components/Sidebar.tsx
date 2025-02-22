import type React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import { styled, useTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import BookIcon from '@mui/icons-material/Book';
import CodeIcon from '@mui/icons-material/Code';
import RuleIcon from '@mui/icons-material/Rule';
import ArticleIcon from '@mui/icons-material/Article';
import DvrIcon from '@mui/icons-material/Dvr';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useEffect, useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 260,
    background: theme.palette.grey[900],
    color: theme.palette.common?.white,
    borderRight: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[8],
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette?.action?.hover,
    '& .MuiListItemIcon-root': {
      color: theme.palette?.primary?.light,
    },
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common?.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.common?.white,
    },
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.grey[500],
  minWidth: 40,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontWeight: 500,
    color: theme.palette.grey[300],
  },
}));

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const [pathname, setPathname] = useState<string>('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <StyledDrawer
      open={isOpen}
      onClose={onClose}
      variant="persistent"
      anchor="left"
    >
      <List>
        {['Components', 'Contributing', 'FPV', 'Requirements'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link href={`/docs/${text.toLowerCase()}`} passHref legacyBehavior>
              <StyledListItemButton
                selected={`/docs/${text.toLowerCase()}` === pathname}
              >
                <StyledListItemIcon>
                  {index === 0 && <LibraryBooksIcon />} {index === 0 && <DescriptionIcon />}
                  {index === 1 && <ArticleIcon />} {index === 1 && <BookIcon />}
                  {index === 2 && <DvrIcon />} {index === 2 && <CodeIcon />}
                  {index === 3 && <AssignmentLateIcon />} {index === 3 && <RuleIcon />}
                </StyledListItemIcon>
                <StyledListItemText primary={text} />
              </StyledListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;