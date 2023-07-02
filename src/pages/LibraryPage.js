/* --------------------------------- import --------------------------------- */
import { Box, Card } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import UserProfile from "../features/user/UserProfile";
import "./styles.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Playlist from "../features/playlist/playlist";
import PlaylistPage from "../features/playlist/PlaylistPage";

function LibraryPage() {
  /* ---------------------------------- state --------------------------------- */
  const [currentTab, setCurrentTab] = useState("playlist");

  /* -------------------------------- function -------------------------------- */
  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "playlist",
      component: <PlaylistPage />,
    },
    {
      value: "album",
      component: <Playlist />,
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

export default LibraryPage;
