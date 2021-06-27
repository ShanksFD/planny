import { BrowserRouter as Router, Route } from "react-router-dom";

// Local imports
import './bootstrap.min.css'
import HomeScreen from "./screens/HomeScreen"
import Footer from "./components/footer"
import Header from './components/header'

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-5">
        <Route path="/" component={HomeScreen} exact /> 
      </main>
      <Footer />
    </Router>
  );
}

export default App;
