import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { Avatar as MuiAvatar, styled } from "@mui/material";
import { addMedia } from "../../features/song/songSlice";
import { addPlaylistImage } from "../../features/song/songSlice";
import { useDispatch, useSelector } from "react-redux";

const AvatarContainer = styled("div")({
  width: "300px",
  height: "300px",
  minWidth: "300px",
  minHeight: "300px",
  overflow: "hidden",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: "#ccc", // Gray background color
});

const AvatarImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const Avatar = ({ playlistId, playlistImage, userId }) => {
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  console.log("playlistImage", playlistImage);
  let count = 0;
  const playlistInfo = useSelector((state) => state.content);

  console.log("playlistInfo", playlistInfo);

  useEffect(() => {
    console.log("playlistInfo update", playlistInfo);
  }, [avatar, playlistInfo]);

  console.log("test count", count);
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    dispatch(
      addPlaylistImage({
        file,
        playlistId,
        folder: `image/${playlistId}`,
        userId,
      })
    );

    reader.onload = (e) => {
      setAvatar(e.target.result);
    };

    reader.readAsDataURL(file);

    // console.log("File information:", file); // Log the file information
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <AvatarContainer {...getRootProps()}>
            {playlistImage ? (
              <AvatarImage src={playlistImage} alt="Avatar" />
            ) : (
              <div>
                <span style={{ fontSize: "48px" }}>📝</span>
              </div>
            )}
            <input {...getInputProps()} />
          </AvatarContainer>
        )}
      </Dropzone>
    </div>
  );
};

export default Avatar;
