import Portfolio from "./components/Portfolio";
import "./assets/scss/style.scss";
import About from "./components/About";
import Header from "./components/Header";
import Contact from "./components/Contact";
import {useApp} from "./useApp";

const App = () => {
  useApp();

  return (
    <>
      <div className="loader center">
        <div className="loader__body flex align-center">
          <div className="loader__icon"></div>
          <p>Loading</p>
        </div>
      </div>
      <div className="App">
        <div class="bg-animation-effect"></div>
        <div class="overlay-effect"></div>
        <Header />
        <Portfolio />
        <About />
        <Contact />
      </div>
    </>
  );
};

export default App;
