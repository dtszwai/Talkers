import { IconButton, Typography, useTheme } from "@mui/material"
import { ToggleOff, ToggleOn } from "@mui/icons-material";

const DarkModeSwitch = () => {
  const theme = useTheme();

  return (
    <>
      <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
        {theme.palette.mode} mode
      </Typography>
      <IconButton
        sx={{ m: 0, p: 0, pl: 2 }}
        color="inherit">
        {theme.palette.mode === 'dark'
          ? <ToggleOff sx={{ fontSize: "2.5rem", p: 0 }} />
          : <ToggleOn sx={{ fontSize: "2.5rem" }} />
        }
      </IconButton>
    </>
  )
}

export default DarkModeSwitch