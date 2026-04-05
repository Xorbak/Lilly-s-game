import { Box, IconButton, SxProps, Theme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  back?: boolean;
  sx?: SxProps<Theme>;
}

export const Layout = ({ children, back = false, sx }: Props) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFF9F0', p: 2, position: 'relative', ...sx }}>
      {back && (
        <IconButton
          onClick={() => navigate('/')}
          sx={{ position: 'absolute', top: 16, left: 16, bgcolor: '#fff', boxShadow: 2, zIndex: 10 }}
          size="large"
        >
          <HomeIcon sx={{ fontSize: 36 }} />
        </IconButton>
      )}
      {children}
    </Box>
  );
};
