import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserList from "./components/user-list";
import UserDetails from "./components/user-details";
import AddOrEditUser from "./components/add-update-user";
import Header from "./components/header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/user/:userId" exact component={UserDetails} />
        <Route path="/edit-user/:userId" exact component={AddOrEditUser} />
        <Route path="/add-user" exact component={AddOrEditUser} />
        <Route exact component={UserList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
