import { AppBar, Box, Drawer, IconButton, Link, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ExploreCategories from "../../components/SecondaryDrawer/ExploreCategories";
import AccountButton from "../../components/PrimaryAppBar/AccountButton";

const PrimaryAppBar = () => {
  const theme = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isSmallScreen && isSidebarOpen) {
      setIsSidebarOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSmallScreen])

  const list = () => (
    <Box
      sx={{ paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200 }} role="presentation">
      <ExploreCategories />
    </Box>
  )

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
      <Toolbar
        variant='dense' sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}>
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ mr: 2 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer anchor="left" open={isSidebarOpen}>
          {list()}
        </Drawer>
        <Link href="/" underline="none" color="inherit">
          <Typography variant="h6" noWrap component="div" sx={{ display: { fontWeight: 700, letterSpacing: "-0.5px" } }}>
            Talkers
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }}></Box>
        <AccountButton />
      </Toolbar>
    </AppBar>
  )
}

export default PrimaryAppBar;