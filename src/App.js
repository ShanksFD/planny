import { BrowserRouter as Router, Route } from "react-router-dom";

// Local imports
import './bootstrap.min.css'

// Screens
import HomeScreen from "./screens/HomeScreen"
import NewUserScreen from "./screens/NewUserScreen";
import NewProjectScreen from "./screens/NewProjectScreen";

// Components
import Footer from "./components/footer"
import Header from './components/header'
import NewClientScreen from "./screens/NewClientScreen";
import NewPhaseScreen from "./screens/NewPhaseScreen";

function App() {
  return (
    <Router>
      <Header/>

      <main className="py-5">
        <Route path="/" component={HomeScreen} exact /> 
        <Route path="/employee" component={NewUserScreen} /> 
        <Route path="/client" component={NewClientScreen} /> 
        <Route path="/project" component={NewProjectScreen} /> 
        <Route path="/phase" component={NewPhaseScreen} /> 
      </main>

      <Footer />
    </Router>
  );
}

export default App;
