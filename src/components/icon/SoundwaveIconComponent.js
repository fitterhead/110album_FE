import React from 'react';
import { styled } from '@mui/system';
import { SvgIcon } from '@mui/material';

const SoundwaveIconContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SoundwaveIcon = styled(SvgIcon)`
  font-size: 48px; /* Adjust the size as desired */
`;

const SoundwaveBox = styled('rect')`
  fill: #12E2DC;
  border-radius: 4px;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;

const SoundwaveIconComponent = () => {
  return (
    <SoundwaveIconContainer>
      <SoundwaveIcon viewBox="0 0 24 24">
        <SoundwaveBox
          x="1"
          y="6"
          width="3"
          height="12"
          animation-name="quiet"
        />
        <SoundwaveBox
          x="6"
          y="4"
          width="3"
          height="16"
          animation-name="normal"
        />
        <SoundwaveBox
          x="11"
          y="2"
          width="3"
          height="20"
          animation-name="quiet"
        />
        <SoundwaveBox
          x="16"
          y="4"
          width="3"
          height="16"
          animation-name="loud"
        />
        <SoundwaveBox
          x="21"
          y="6"
          width="3"
          height="12"
          animation-name="quiet"
        />
      </SoundwaveIcon>
    </SoundwaveIconContainer>
  );
};

export default SoundwaveIconComponent;
