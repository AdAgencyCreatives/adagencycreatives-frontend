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
  const { getToken } = useContext(AuthContext);
  useMemo(() => {
    getToken();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <CreativesProvider>
          <AgenciesProvider>
            <SpotlightProvider>
              <JobsProvider>
                <div className="App">
                  <ScrollRestoration />
                  <Header />
                  <Outlet />
                  <Footer />
                </div>
              </JobsProvider>
            </SpotlightProvider>
          </AgenciesProvider>
        </CreativesProvider>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
