import logo from './logo.svg';
import './App.css';
import ProductPage from './ProductPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="150" />

        <ProductPage />
      </header>
    </div>
  );
}

export default App;
