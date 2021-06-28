import { BrowserRouter as Router, Route } from "react-router-dom";

// Local imports
import './bootstrap.min.css'

// Screens
import HomeScreen from "./screens/HomeScreen"
import NewEmployeeScreen from "./screens/NewEmployeeScreen";

// Components
import Footer from "./components/footer"
import Header from './components/header'

function App() {
  return (
    <Router>
      <Header/>

      <main className="py-5">
        <Route path="/" component={HomeScreen} exact /> 
        <Route path="/RegisterEmployer" component={NewEmployeeScreen} exact /> 
      </main>

      <Footer />
    </Router>
  );
}

export default App;
