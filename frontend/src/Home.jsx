import React from 'react';

import UserInfo from './components/UserInfo';
import Map from './components/Map';
import TopBar from './components/TopBar';

export const AppContext = React.createContext();

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <>
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <TopBar />
        <Map />
        <UserInfo />
      </AppContext.Provider>
    </>
  );
}