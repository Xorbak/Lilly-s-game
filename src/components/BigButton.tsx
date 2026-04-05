import { Button, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
  label: string;
  emoji?: string;
}

export const BigButton = ({ label, emoji, sx, ...rest }: Props) => (
  <Button
    variant="contained"
    sx={{
      fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
      fontWeight: 800,
      borderRadius: 6,
      py: { xs: 2, sm: 3 },
      px: { xs: 2.5, sm: 4 },
      minWidth: { xs: 130, sm: 160, md: 180 },
      minHeight: { xs: 90, sm: 110, md: 120 },
      textTransform: 'none',
      boxShadow: 4,
      touchAction: 'manipulation',
      ...sx,
    }}
    {...rest}
  >
    {emoji && <span style={{ marginRight: 8, fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>{emoji}</span>}
    {label}
  </Button>
);
