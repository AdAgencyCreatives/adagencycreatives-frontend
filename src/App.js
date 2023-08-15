import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import Creatives from "./pages/Creatives";

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
        <Header />
        {/* <Home /> */}
        <Creatives />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
