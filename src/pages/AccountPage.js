import { Box, Card, Grid, Paper } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useState } from "react";
import AlbumRanking from "../components/form/AlbumRanking";
import NumberOneAlbum from "../components/form/NumberOneAlbum";
import FriendList from "../features/friend/FriendList";
import UserProfile from "../features/user/UserProfile";
import "./styles.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Playlist from "../features/playlist/playlist";
import FavouriteArtist from "../features/favouriteArtist/favouriteArtist";
function AccountPage() {
  const [currentTab, setCurrentTab] = useState("profile");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      value: "profile",
      component: <UserProfile />,
    },
    {
      value: "friends",
      component: <FriendList />,
    },
    {
      value: "playlist",
      component: <Playlist />,
    },
    {
      value: "favourite artists",
      component: <FavouriteArtist />,
    },
  ];

  return (
    <Container
      maxWidth="false"
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

export default AccountPage;
