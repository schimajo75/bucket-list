import React from 'react';
import '../App.css';
import { Route, Switch} from 'react-router-dom';
import Home from '../components/Home';
import Auth from '../components/Auth';
import UserPage from '../components/UserPage';
import Navbar from '../components/Navbar';

const userAPI = 'http://localhost:3000/api/v1/users'
const parkAPI = 'http://localhost:3000/api/v1/parks'



class App extends React.Component {
  state = {
    users: [],
    parks: [],
  }

  

  componentDidMount(){
    fetch(userAPI).then(r => r.json()).then(user => this.setState({users: user }))
    fetch(parkAPI).then(r => r.json()).then(park => this.setState({parks: park }))
}

  createUser = (name, pass, history) => {
    console.log(history)
    fetch(userAPI, {
      method: 'POST',
      body: JSON.stringify({
        username: name,
        password: pass
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
    .then(r => r.json())
    .then(user => {
      this.setState({users: [...this.state.users, user]}, () => history.push(`/users/${user.id}`))
    })
  };


  render(){
    console.log(this.props)
    return (
      <div className="App">
        <Navbar />
        <Switch>

          <Route path="/users/:id" render={(routerProps) => <UserPage {...routerProps} parks={this.state.parks} users={this.state.users} /> } />

          <Route path="/login" render={(routerProps) => <Auth {...routerProps} createUser={this.createUser} users={this.state.users} /> } />

          <Route exact path="/" render={() => <Home />} />

        </Switch>
      </div>
    );
  }
}

export default App;
