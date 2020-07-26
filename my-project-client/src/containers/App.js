import React from 'react';
import '../App.css';
import { Route, Switch} from 'react-router-dom';
import Home from '../components/Home';
import Auth from '../components/Auth';
import Users from '../components/Users';
import UserPage from '../components/UserPage';
import Navbar from '../components/Navbar';

const userAPI = 'http://localhost:3000/api/v1/users'
const parkAPI = 'http://localhost:3000/api/v1/parks'
const listAPI = 'http://localhost:3000/api/v1/lists'


class App extends React.Component {
  state = {
    users: [],
    parks: [],
    lists: [],
    filter: ""
  }

  

  componentDidMount(){
    fetch(userAPI).then(r => r.json()).then(user => this.setState({users: user }))
    fetch(parkAPI).then(r => r.json()).then(park => this.setState({parks: park }))
    fetch(listAPI).then(r => r.json()).then(list => this.setState({lists: list }))
}

  createUser = (name, pass) => {
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
      this.setState({users: [...this.state.users, user], filter: user.id})
    })
  };

  createList = (user) => {
    this.state.parks.forEach(park => {
        fetch(listAPI, {
          method: 'POST',
          body: JSON.stringify({
            user_id: user,
            park_id: park.id,
            visited: false
          }),
          headers: {
            "Content-type": "application/json",
            Accept: "application/json"
          }
        })
        .then(r => r.json())
        .then(list => console.log(list))
      })
    }
  
 
  

  render(){
    // console.log(this.state.lists)
    return (
      <div className="App">
        <Navbar />
        <Switch>

          <Route path="/users/:id" render={(routerProps) => <UserPage {...routerProps} lists={this.state.lists} parks={this.state.parks} /> } />

          <Route path="/users" render={(routerProps) => <Users {...routerProps} lists={this.state.lists} parks={this.state.parks} filter={this.state.filter} createList={this.createList} /> } />

          <Route path="/login" render={(routerProps) => <Auth {...routerProps} createUser={this.createUser} createList={this.createList} users={this.state.users} /> } />

          <Route exact path="/" render={() => <Home />} />

        </Switch>
      </div>
    );
  }
}

export default App;
