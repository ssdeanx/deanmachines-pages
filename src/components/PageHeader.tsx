import { Box, Breadcrumbs, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const PageHeader = ({ title, subtitle, breadcrumbs }: PageHeaderProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 4,
        background: `linear-gradient(to right, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        {breadcrumbs && (
          <Breadcrumbs sx={{ mb: 2 }}>
            {breadcrumbs.map((item, index) => (
              item.href ? (
                <Link key={index} href={item.href} passHref legacyBehavior>
                  <MuiLink color="inherit" underline="hover">
                    {item.label}
                  </MuiLink>
                </Link>
              ) : (
                <Typography key={index} color="text.primary">
                  {item.label}
                </Typography>
              )
            ))}
          </Breadcrumbs>
        )}
        <Typography variant="h3" component="h1" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default PageHeader; 