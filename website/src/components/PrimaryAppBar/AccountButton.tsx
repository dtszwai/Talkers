import { AccountCircle, Brightness4 } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import DarkModeSwitch from "./DarkMode/DarkModeSwitch";
import { useContext, useState } from "react";
import { ColorModeContext } from "../../context/DarkModeContext";

const AccountButton = () => {
  const colorMode = useContext(ColorModeContext)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl)

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const renderMenu = (
    <Menu
      open={isMenuOpen}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      keepMounted
      onClose={handleMenuClose}>
      <MenuItem
        onClick={colorMode.toggleColorMode}
      >
        <Brightness4 sx={{ marginRight: "6px", fontSize: "20px" }}></Brightness4>
        <DarkModeSwitch />
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ display: { xs: "flex" } }}>
      <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
        <AccountCircle />
      </IconButton>
      {renderMenu}
    </Box>
  )
}

export default AccountButton;