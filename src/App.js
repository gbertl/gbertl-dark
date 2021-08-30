import Portfolio from "./components/Portfolio";
import "./assets/scss/style.scss";
import About from "./components/About";
import Header from "./components/Header";
import Contact from "./components/Contact";
import { useApp } from "./useApp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { toggleBodyScroll } from "./components/helper";

const App = () => {
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useApp();

  useEffect(() => {
    let timeout;

    if (isLoading) {
      toggleBodyScroll();
      document.querySelector(".loader").classList.remove("loader--hide");
    } else {
      timeout = setTimeout(() => {
        toggleBodyScroll();
        document.querySelector(".loader").classList.add("loader--hide");
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  return (
    <>
      <div className="loader center">
        <div className="loader__body flex align-center">
          <div className="loader__icon"></div>
          <p>Loading</p>
        </div>
      </div>
      <Router>
        <div className="App">
          <div className="bg-animation-effect"></div>
          <div className="overlay-effect"></div>
          <Header
            isOverlayActive={isOverlayActive}
            setIsOverlayActive={setIsOverlayActive}
          />
          <Switch>
            <Route path="/contact">
              <Contact
                setIsLoading={setIsLoading}
                isOverlayActive={isOverlayActive}
                setIsOverlayActive={setIsOverlayActive}
              />
            </Route>
            <Route path="/portfolio">
              <Portfolio
                isOverlayActive={isOverlayActive}
                setIsOverlayActive={setIsOverlayActive}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </Route>
            <Route path="/">
              <About
                setIsLoading={setIsLoading}
                isOverlayActive={isOverlayActive}
                setIsOverlayActive={setIsOverlayActive}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
