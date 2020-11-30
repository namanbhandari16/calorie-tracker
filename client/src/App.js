import './App.css';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import Register from './screens/Register'
import User from './screens/User'
import Calorie from'./screens/Calorie'
function App() {
  return (
    <Router>
    <div className="container mt-5 center">
      <Link to="/" style={{textDecoration:'none'}}><h1 className="mb-5">Calorie Tracker</h1></Link>
      <Route exact path="/" component={HomeScreen}/>
      <Route exact path="/register" component={Register}/>
      <Route exact path="/user/:id" component={User}/>
      <Route exact path="/user/:id/calories" component={Calorie}/>
    </div>
    </Router>
  );
}

export default App;
