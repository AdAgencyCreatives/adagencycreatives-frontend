import "./App.css";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";

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
  return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <ScrollRestoration />
          <Header />
          <Outlet />
          <Footer />
        </div>
      </ThemeProvider>
  );
}

export default App;
