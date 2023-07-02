import React from "react";
import { styled, keyframes } from "@mui/system";

const lineAnimation = keyframes`
  0% {
    transform: scaleY(1);
    transform-origin: bottom;
  }
  50% {
    transform: scaleY(0.5);
    transform-origin: bottom;
  }
  100% {
    transform: scaleY(1);
    transform-origin: bottom;
  }
`;

const spacing = "2px"; // Adjust the spacing value as desired

const IconContainer = styled("div")`
  display: inline-block; /* Change display to inline-block */
  align-items: center; /* Align items in the center vertically */
  animation: ${lineAnimation} 2s linear infinite; /* Adjust animation properties as desired */
  margin-right: ${spacing}; /* Add spacing between IconContainers */
`;

const LineIcon = styled("div")`
  width: 2px; /* Adjust the width of the line */
  height: 24px; /* Adjust the height of the line */
  background-color: #12e2dc; /* Adjust the color of the line */
  margin-right: 4px; /* Add margin-right to create spacing between the LineIcons */
  &:last-child {
    margin-right: 0; /* Remove margin-right from the last LineIcon */
  }
`;

/* -------------------------------------------------------------------------- */
/*                                      2                                     */
/* -------------------------------------------------------------------------- */

const IconContainer3 = styled("div")`
  display: inline-block; /* Change display to inline-block */
  align-items: center; /* Align items in the center vertically */
  animation: ${lineAnimation} 4s linear infinite; /* Adjust animation properties as desired */
  margin-right: ${spacing}; /* Add spacing between IconContainers */
`;

const LineIcon3 = styled("div")`
  width: 2px; /* Adjust the width of the line */
  height: 24px; /* Adjust the height of the line */
  background-color: #12e2dc; /* Adjust the color of the line */
  margin-right: 4px; /* Add margin-right to create spacing between the LineIcons */
  &:last-child {
    margin-right: 0; /* Remove margin-right from the last LineIcon */
  }
`;

/* -------------------------------------------------------------------------- */
/*                                      3                                     */
/* -------------------------------------------------------------------------- */
const IconContainer4 = styled("div")`
  display: inline-block; /* Change display to inline-block */
  align-items: center; /* Align items in the center vertically */
  animation: ${lineAnimation} 6s linear infinite; /* Adjust animation properties as desired */
  margin-right: ${spacing}; /* Add spacing between IconContainers */
`;

const LineIcon4 = styled("div")`
  width: 2px; /* Adjust the width of the line */
  height: 24px; /* Adjust the height of the line */
  background-color: #12e2dc; /* Adjust the color of the line */
  margin-right: 4px; /* Add margin-right to create spacing between the LineIcons */
  &:last-child {
    margin-right: 0; /* Remove margin-right from the last LineIcon */
  }
`;
/* -------------------------------------------------------------------------- */
/*                                      4                                     */
/* -------------------------------------------------------------------------- */
const IconContainer5 = styled("div")`
  display: inline-block; /* Change display to inline-block */
  align-items: center; /* Align items in the center vertically */
  animation: ${lineAnimation} 5s linear infinite; /* Adjust animation properties as desired */
  margin-right: ${spacing}; /* Add spacing between IconContainers */
`;

const LineIcon5 = styled("div")`
  width: 2px; /* Adjust the width of the line */
  height: 24px; /* Adjust the height of the line */
  background-color: #12e2dc; /* Adjust the color of the line */
  margin-right: 4px; /* Add margin-right to create spacing between the LineIcons */
  &:last-child {
    margin-right: 0; /* Remove margin-right from the last LineIcon */
  }
`;
/* -------------------------------------------------------------------------- */
/*                                      5                                     */
/* -------------------------------------------------------------------------- */
const IconContainer2 = styled("div")`
  display: inline-block; /* Change display to inline-block */
  align-items: center; /* Align items in the center vertically */
  animation: ${lineAnimation} 3s linear infinite; /* Adjust animation properties as desired */
  margin-right: ${spacing}; /* Add spacing between IconContainers */
`;

const LineIcon2 = styled("div")`
  width: 2px; /* Adjust the width of the line */
  height: 24px; /* Adjust the height of the line */
  background-color: #12e2dc; /* Adjust the color of the line */
  margin-right: 4px; /* Add margin-right to create spacing between the LineIcons */
  &:last-child {
    margin-right: 0; /* Remove margin-right from the last LineIcon */
  }
`;
const AnimatedIcon = () => {
  return (
    <>
      <IconContainer>
        <LineIcon />
      </IconContainer>
      <IconContainer2>
        <LineIcon2 />
      </IconContainer2>
      <IconContainer3>
        <LineIcon3 />
      </IconContainer3>
      <IconContainer4>
        <LineIcon4 />
      </IconContainer4>
      <IconContainer5>
        <LineIcon5 />
      </IconContainer5>
    </>
  );
};

export default AnimatedIcon;
