import "./App.css";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Context as AuthContext } from "./context/AuthContext";
import { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
// import { useCookies } from "react-cookie";
import { Provider as DataProvider } from "./context/DataContext";
import { Provider as CreativesProvider } from "./context/CreativesContext";
import { Provider as GroupsProvider } from "./context/GroupsContext";
import { Provider as JobsProvider } from "./context/JobsContext";
import { Provider as AgenciesProvider } from "./context/AgenciesContext";
import { Provider as SpotlightProvider } from "./context/SpotlightContext";
import { Provider as CommunityProvider } from "./context/CommunityContext";
import { Provider as SubscriptionProvider } from "./context/SubscriptionContext";
import { Provider as ChatProvider } from "./context/ChatContext";
import { Provider as AlertProvider } from "./context/AlertContext";
import PusherListener from "./components/PusherListener";
import { Provider as NotificationsProvider } from "./context/NotificationsContext";
import Caching from "./components/Caching";

const theme = createTheme({
  typography: {
    fontFamily: [],
    button: false,
  },
  palette: {
    primary: {
      main: "#d3a11f",
    },
    link: {
      main: "#000",
    },
    white: "#fff"
  },
});


function App() {

  const [skipHeaderFooter, setSkipHeaderFooter] = useState(false);

  const { getToken } = useContext(AuthContext);
  useMemo(() => { getToken(); }, []);

  const isCurrentPage = (relativeUrl) => {
    return (window.location.pathname + (window.location.search && window.location.search.length > 1 ? window.location.search : '')) == relativeUrl;
  }

  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <DataProvider>
          <SubscriptionProvider>
            <CreativesProvider>
              <AgenciesProvider>
                <ChatProvider>
                  <SpotlightProvider>
                    <JobsProvider>
                      <CommunityProvider>
                        <GroupsProvider>
                          <NotificationsProvider>
                            {/* {!isLoading ? ( */}
                            <div className="App">
                              <PusherListener />
                              <ScrollRestoration />
                              <Caching />
                              {!skipHeaderFooter ? (<>
                                <Header />
                              </>) : (<></>)}
                              <Outlet context={[setSkipHeaderFooter]} />
                              {!skipHeaderFooter ? (<>
                                <Footer />
                              </>) : (<></>)}
                            </div>
                            {/* ) : (
                              <Loader />
                            )} */}
                          </NotificationsProvider>
                        </GroupsProvider>
                      </CommunityProvider>
                    </JobsProvider>
                  </SpotlightProvider>
                </ChatProvider>
              </AgenciesProvider>
            </CreativesProvider>
          </SubscriptionProvider>
        </DataProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
