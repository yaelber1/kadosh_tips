import * as React from 'react';
import Box from '@mui/material/Box';
import NumberInputBox from './NumberInputBox';
import backgroundImage from './2.png'; 
import { Container } from '@mui/material';

export default function App() {
  const containerStyle = {
    position: 'absolute',
    width: '60px',
    height: '76px',
    left: '185px',
    top: '7px',
    background: `url(${backgroundImage})`,
  };

  return (
      <div >
        <div>
          <NumberInputBox></NumberInputBox>
        </div>
      </div>
  );
}