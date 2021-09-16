import '../../assets/scss/style.scss';
import About from '../About';
import Header from '../Header';
import Contact from '../Contact';
import Portfolio from '../Portfolio';
import useApp from './hooks/useApp';
import Loader from './Loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
  const isOverlayActive = useSelector((state) => state.ui.isOverlayActive);

  useApp();

  return (
    <>
      <Loader />
      <Router>
        <div className="App">
          <div className="bg-animation-effect"></div>
          <div
            className={`overlay-effect${
              isOverlayActive ? ' overlay-effect--active' : ''
            }`}
          ></div>
          <Header />
          <Switch>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
