import { List, ListItem, ListItemButton, ListItemText, Box, Typography, useTheme } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { Server } from '../../@types/server'


interface ServerChannelsProps {
  data: Server[]
}

const ServerChannel = (props: ServerChannelsProps) => {
  const { data } = props
  const serverName = data?.[0]?.name ?? "Server";
  const { serverId } = useParams();
  const theme = useTheme()

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
      <Typography variant='body1' style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
        {serverName}
      </Typography>
    </Box>
    <List sx={{ py: 0 }}>
      {data.flatMap(obj =>
        obj.channel_server.map(item =>
          <ListItem key={item.id} disablePadding sx={{ display: 'block', maxHeight: "40px" }} dense={true}>
            <Link to={`/server/${serverId}/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemText
                  primary={<Typography variant="body1" textAlign="start" paddingLeft={1}>{item.name}</Typography>}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
    </List>
  </>
}

export default ServerChannel;