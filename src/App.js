import { BrowserRouter as Router, Route } from "react-router-dom";

// Local imports
import './App.css';
import './bootstrap.min.css'
import HomeScreen from "./screens/HomeScreen"

function App() {
  return (
    <Router>
      <main>
        <Route path="/" component={HomeScreen} exact /> 
      </main>
    </Router>
  );
}

export default App;
