import Home from "./views/home/home.component";
import Detail from "./views/detail/detail.component";
import Create from "./views/create/create.component";
import LandingPage from "./views/landing/landingPage.component";
import { Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route path="/create" component={Create} />
      </Switch>
    </div>
  );
}

export default App;
