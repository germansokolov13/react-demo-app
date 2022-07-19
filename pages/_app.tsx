import React from 'react';

import '../styles/globals.css';
import 'react-tabs/style/react-tabs.css';
import 'filepond/dist/filepond.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

function MyApp({ Component, pageProps }: any) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...pageProps} />
  );
}

export default MyApp;
