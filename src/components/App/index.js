import '../../assets/scss/style.scss';
import About from '../About';
import Header from '../Header';
import Contact from '../Contact';
import Portfolio from '../Portfolio';
import useApp from './hooks/useApp';
import Loader from './Loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';

const App = () => {
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  useApp();

  return (
    <>
      <Loader />
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
                isOverlayActive={isOverlayActive}
                setIsOverlayActive={setIsOverlayActive}
              />
            </Route>
            <Route path="/portfolio">
              <Portfolio
                isOverlayActive={isOverlayActive}
                setIsOverlayActive={setIsOverlayActive}
              />
            </Route>
            <Route path="/">
              <About
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
