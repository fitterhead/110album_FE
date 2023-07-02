import React from "react";
import { styled, keyframes } from "@mui/system";
import { SvgIcon } from "@mui/material";

const IQIconContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
`;

const IQIcon = styled(SvgIcon)`
  font-size: 48px; /* Adjust the size as desired */
`;

const Line = styled("line")`
  stroke: #12e2dc;
  stroke-width: 2;
  animation-duration: 1s; /* Adjust the animation duration as desired */
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;

const randomOffset = (maxOffset) => Math.random() * maxOffset * 2 - maxOffset;

const lineAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(${randomOffset(5)}px);
  }
  100% {
    transform: translateY(0);
  }
`;

const spacing = 3; // Adjust the spacing as desired

const IQIconComponent = () => {
  return (
    <IQIconContainer>
      <IQIcon viewBox="0 0 24 24">
        <Line x1="8" y1="21" x2="8" y2="10" animation-name={lineAnimation} />
        <Line
          x1={8 + spacing}
          y1="21"
          x2={8 + spacing}
          y2="12"
          animation-name={lineAnimation}
          animation-delay="0.2s" /* Adjust the delay as desired */
        />
        <Line
          x1={8 + 2 * spacing}
          y1="21"
          x2={8 + 2 * spacing}
          y2="14"
          animation-name={lineAnimation}
          animation-delay="0.4s" /* Adjust the delay as desired */
        />
        <Line
          x1={8 + 3 * spacing}
          y1="21"
          x2={8 + 3 * spacing}
          y2="12"
          animation-name={lineAnimation}
          animation-delay="0.6s" /* Adjust the delay as desired */
        />
        <Line
          x1={8 + 4 * spacing}
          y1="21"
          x2={8 + 4 * spacing}
          y2="10"
          animation-name={lineAnimation}
          animation-delay="0.8s" /* Adjust the delay as desired */
        />
      </IQIcon>
    </IQIconContainer>
  );
};

export default IQIconComponent;
