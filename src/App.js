import { BrowserRouter as Router, Route } from "react-router-dom";

// Local imports
import './bootstrap.min.css'

// Screens
import HomeScreen from "./screens/HomeScreen"
import NewUserScreen from "./screens/NewUserScreen";
import NewProjectScreen from "./screens/NewProjectScreen";

// Components
import Footer from "./components/Footer"
import Header from './components/Header'
import NewClientScreen from "./screens/NewClientScreen";
import NewPhaseScreen from "./screens/NewPhaseScreen";
import PhasesScreen from "./screens/PhasesScreen";
import PrivateRoute from "./components/PrivateRoute";

// Constants
import {ADMINISTRATOR_PERM, PROJECT_MANAGER_PERM, SECRETARY_PERM} from './utils'
import {LINK_NEW_CLIENT, LINK_NEW_PROJECT, LINK_NEW_PHASE, LINK_NEW_USER, LINK_PHASES} from './constants/linkConstants'

function App() {
  return (
    <Router>
      <Header/>

      <main className="py-5">
        <Route path="/" component={HomeScreen} exact /> 

        <PrivateRoute path={LINK_NEW_USER} component={NewUserScreen} permName={ADMINISTRATOR_PERM} exact/> 
        <PrivateRoute path={LINK_NEW_CLIENT} component={NewClientScreen} permName={SECRETARY_PERM} exact/> 
        <PrivateRoute path={LINK_NEW_PHASE} component={NewPhaseScreen} permName={PROJECT_MANAGER_PERM} /> 
        <PrivateRoute path={LINK_PHASES} component={PhasesScreen} permName={PROJECT_MANAGER_PERM} exact/> 
        <PrivateRoute path={LINK_NEW_PROJECT} component={NewProjectScreen} permName={SECRETARY_PERM} exact/> 
      </main>

      <Footer />
    </Router>
  );
}

export default App;
