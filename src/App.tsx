import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { ProductsPage } from './ProductsPage';
import { ProductPage } from './ProductPage';
import { API } from './types';
import {getProductsList, getProductById} from './api';
import logo from './logo.svg';
import './App.css';

const defaultAPI = {getProductsList, getProductById};

export default function App(props: AppProps) {

  const {api = defaultAPI} = props;

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="flex items-center p-3 flex-wrap">
            <Link to="/" className="p-2 mr-4 inline-flex items-center">
              <img src={logo} className="App-logo" alt="logo" style={{width: '50px', height: '40px'}} />
            </Link>
            <button
              className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
              data-target="#navigation">
              <i className="material-icons">menu</i>
            </button>
            <div
              className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
              id="navigation">
              <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                <Link to="/" className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white">
                  <span>Home</span>
                </Link>
              </div>
            </div>
          </nav>

          <Switch>
            <Route path="/product/:id">
              <ProductPage api={api} />
            </Route>
            <Route path="/">
              <ProductsPage api={api} />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

type AppProps = {
    api: API
}
