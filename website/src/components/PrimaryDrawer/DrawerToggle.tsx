import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

type Props = {
  open: boolean;
  handler: (arg0: boolean) => void;
}

const DrawerToggle: React.FC<Props> = ({ open, handler }) => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <IconButton onClick={() => handler(open)}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  )
}

export default DrawerToggle;