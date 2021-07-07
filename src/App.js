import Portfolio from "./components/Portfolio";
import "./assets/scss/style.scss";
import About from "./components/About";
import Header from "./components/Header";
import Contact from "./components/Contact";
import {useApp} from "./useApp";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

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
      <Router>
        <div className="App">
          <div className="bg-animation-effect"></div>
          <div className="overlay-effect"></div>
          <Header />
          <Switch>
            <Route path="/contact" component={Contact} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/" component={About} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
