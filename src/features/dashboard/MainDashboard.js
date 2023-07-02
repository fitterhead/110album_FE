import { Box, Card, Grid, Paper } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Playlist from "../playlist/playlist";
import DashboardPage from "./DashboardPage";
import DashboardUser from "./DashboardUser";
import SongPage from "../song/SongPage";

function MainDashboard() {
  const [currentTab, setCurrentTab] = useState("ALBUM");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  // const { user } = useAuth();

  const PROFILE_TABS = [
    {
      value: "ALBUM",
      component: <DashboardPage />,
    },
    {
      value: "USER",
      component: <DashboardUser />,
    },
    {
      value: "SONG",
      component: <SongPage />,
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        flexGrow: 1,
        maxWidth: "1344px",
        padding: "2rem",
        "@media screen and (max-width: 600px)": { padding: "0rem" },
      }}
    >
      <Card>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => handleChangeTab(value)}
        >
          {PROFILE_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              value={tab.value}
              label={tab.value}
            />
          ))}
        </Tabs>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Card>
    </Container>
  );
}

export default MainDashboard;
