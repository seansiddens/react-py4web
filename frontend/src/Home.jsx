import React from 'react';
import Typography from '@mui/material/Typography';

import UserInfo from './components/UserInfo';
import Map from './components/Map';
import TopBar from './components/TopBar';

export default function Home() {
  return (
    <>
      <TopBar />
      <Map />
      <UserInfo />
    </>
  );
}