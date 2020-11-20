import react from 'react';
import '../styles/globals.css'
import { ServiceLocator, ServiceLocatorContext } from "../services/service-locator";

const serviceLocator = new ServiceLocator();

function MyApp({ Component, pageProps }) {
  return(
    <>
      <ServiceLocatorContext.Provider value={serviceLocator} >
        <Component {...pageProps} />
      </ServiceLocatorContext.Provider>
    </>
  );
}

export default MyApp;
