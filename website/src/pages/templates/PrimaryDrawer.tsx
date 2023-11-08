import React, { ReactNode, useEffect, useState } from "react";
import { Box, Drawer as MuiDrawer, useMediaQuery } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import DrawerToggle from "../../components/PrimaryDrawer/DrawerToggle";


type Props = { children: ReactNode }

type ChildProps = { open: boolean }

type ChildElement = React.ReactElement<ChildProps>

const PrimaryDraw: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const below600 = useMediaQuery("(max-width: 599px)")
  const [open, setOpen] = useState(!below600)

  useEffect(() => {
    setOpen(!below600)
  }, [below600])

  const handleDrawer = (open: boolean) => setOpen(!open)

  const commonMixin = {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: "hidden"
  }

  const openedMixin = {
    ...commonMixin,
  }

  const closedMixin = {
    ...commonMixin,
    width: theme.primaryDrawer.closed,
  }

  const Drawer = styled(
    MuiDrawer, {})(({ theme, open }) => ({
      width: theme.primaryDrawer.width,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      ...(open ? {
        ...openedMixin,
        "& .MuiDrawer-paper": openedMixin,
      } : {
        ...closedMixin,
        "& .MuiDrawer-paper": closedMixin,
      }),
    }));

  return (
    <Drawer
      open={open}
      variant={below600 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: theme.primaryDrawer.width,
        },
      }}>
      <Box>
        <Box sx={{ position: 'absolute', top: 0, right: 0, padding: 0, width: open ? 'auto' : '100%' }}>
          <DrawerToggle
            open={open}
            handler={handleDrawer} />
        </Box>
        {React.Children.map(children, child => {
          return React.isValidElement(child)
            ? React.cloneElement(child as ChildElement, { open })
            : child
        })}
      </Box>
    </Drawer >
  )
}

export default PrimaryDraw;