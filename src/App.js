import { BrowserRouter as Router, Route } from "react-router-dom";

// Local imports
import './App.css';
import './bootstrap.min.css'
import HomeScreen from "./screens/HomeScreen"
import Footer from "./components/footer"
function App() {
  return (
    <Router>
      <main>
        <Route path="/" component={HomeScreen} exact /> 
      </main>
      <Footer />
    </Router>
  );
}

export default App;
