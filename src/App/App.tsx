// Import the used components
import RouteProvider from './PageRoutes/RouteProvider';

// Import the used stylesheet
import './App.css';


function App() {
  return (

    // Component that builds on ALL pages regardless of route
    // EXAMPLE: Headers, Footers, NavBars, etc.


    // Component that contains ROUTE-SPECIFIC pages
    // EXAMPLE: Home, About, Product-Details
    <RouteProvider />

  );
}

export default App;
