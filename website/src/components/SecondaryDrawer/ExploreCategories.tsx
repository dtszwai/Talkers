import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar, Avatar, Box, Typography, useTheme } from '@mui/material'
import useCrud from '../../hooks/useCrud'
import { useEffect } from 'react'
import { MEDIA_URL } from '../../config'
import { Link } from 'react-router-dom'

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const ExploreCategories = () => {
  const { dataCRUD, fetchData, error, isLoading } = useCrud<Category>([], "/server/category");
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  useEffect(() => { fetchData() }, [])

  return <>
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: 'center',
        px: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: "sticky",
        top: 0,
        backgroundColor: theme.palette.background.default
      }}>
      Explore
    </Box>
    <List sx={{ py: 0 }}>
      {dataCRUD.map(item =>
        <ListItem key={item.id} disablePadding sx={{ display: 'block' }} dense={true}>
          <Link to={`/explore/${item.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ minHeight: 48 }}>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                <ListItemAvatar sx={{ minWidth: '0px' }}>
                  <Avatar
                    alt="Category Icon"
                    src={`${MEDIA_URL}${item.icon}`}
                    sx={{ width: "25px", height: "25px", margin: "auto", filter: isDarkMode ? "invert(100%)" : "none" }}
                  />
                </ListItemAvatar>
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body1" textAlign="start" paddingLeft={1}>{item.name}</Typography>}
              />
            </ListItemButton>
          </Link>
        </ListItem>)}
    </List>
  </>
}

export default ExploreCategories;