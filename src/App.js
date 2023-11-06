import "./App.css";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Context as AuthContext } from "./context/AuthContext";
import { useContext, useEffect, useMemo } from "react";
// import { useCookies } from "react-cookie";
import { Provider as DataProvider } from "./context/DataContext";
import { Provider as CreativesProvider } from "./context/CreativesContext";
import { Provider as JobsProvider } from "./context/JobsContext";
import { Provider as AgenciesProvider } from "./context/AgenciesContext";
import { Provider as SpotlightProvider } from "./context/SpotlightContext";
import { Provider as CommunityProvider } from "./context/CommunityContext";
import { Provider as SubscriptionProvider } from "./context/SubscriptionContext";
import { Provider as ChatProvider } from "./context/ChatContext";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;


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
  },
});

function App() {
  const {
    state: { token, user },
    getToken,
  } = useContext(AuthContext);
  useMemo(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {

      const script = document.createElement('script');
      script.src = 'https://js.pusher.com/8.2.0/pusher.min.js';
      script.async = true;
      console.log(token);

      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      var pusher = new Pusher('c2125739f0d66b777906', {
        cluster: 'mt1',

      });

      var channel = pusher.subscribe("messanger." + user.uuid);
      channel.bind('private_msg', function (data) {
        console.log(data);
      });

    }
  }, [token, user]);

  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <SubscriptionProvider>
          <CreativesProvider>
            <AgenciesProvider>
              <ChatProvider>
                <SpotlightProvider>
                  <JobsProvider>
                    <CommunityProvider>
                      <div className="App">
                        <ScrollRestoration />
                        <Header />
                        <Outlet />
                        <Footer />
                      </div>
                    </CommunityProvider>
                  </JobsProvider>
                </SpotlightProvider>
              </ChatProvider>
            </AgenciesProvider>
          </CreativesProvider>
        </SubscriptionProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
