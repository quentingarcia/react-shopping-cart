import logo from './logo.svg';
import './App.css';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="150" />

        <ProductList></ProductList>
      </header>
    </div>
  );
}

export default App;
