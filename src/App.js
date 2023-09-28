import "./App.css";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Context as AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Provider as CreativesProvider } from "./context/CreativesContext";
import { Provider as JobsProvider } from "./context/JobsContext";
import { Provider as AgenciesProvider } from "./context/AgenciesContext";

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
    setToken,
    state: { token },
  } = useContext(AuthContext);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    if (cookies.token !== undefined) {
      setToken(cookies.token);
    }
  }, []);

  useEffect(() => {
    if (token) {
      setCookie("token", token);
    }
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <CreativesProvider>
        <AgenciesProvider>
          <JobsProvider>
            <div className="App">
              <ScrollRestoration />
              <Header />
              <Outlet />
              <Footer />
            </div>
          </JobsProvider>
        </AgenciesProvider>
      </CreativesProvider>
    </ThemeProvider>
  );
}

export default App;
