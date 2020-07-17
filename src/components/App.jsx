import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HelmetMeta from 'components/HelmetMeta';
import { META_INFO } from 'config/fallbacks';

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <HelmetMeta {...META_INFO} />
        <div>Hi</div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
