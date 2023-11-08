import { Box, CssBaseline } from "@mui/material"
import PrimaryAppBar from './templates/PrimaryAppBar';
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import Main from "./templates/Main";
import PopularChannels from "../components/PrimaryDrawer/PopularChannels";
import ExploreCategories from "../components/SecondaryDrawer/ExploreCategories";
import ExploreServers from "../components/Main/ExploreServers";

const Home = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <PrimaryAppBar />
        <PrimaryDrawer>
          <PopularChannels open={true} />
        </PrimaryDrawer>
        <SecondaryDrawer>
          <ExploreCategories />
        </SecondaryDrawer>
        <Main>
          <ExploreServers />
        </Main>
      </Box>
    </>
  )
}

export default Home