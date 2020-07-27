import React from 'react';
import ParkCard from '../components/ParkCard'
import ParkCardBack from '../components/ParkCardBack'

const listAPI = 'http://localhost:3000/api/v1/lists'

class UserPage extends React.Component {

  state = {
    lists: [],
    newUser: false
  }

  componentDidMount() {
    let id = parseInt(this.props.match.params.id)
    fetch(listAPI)
    .then(r => r.json())
    .then(list => {
      let filtered = list.filter(list => list.user_id === id)
      filtered.length > 0 ? 
      this.setState({lists: filtered}) : 
      this.setState({newUser: true}) 
    })  
    }

     createList = () => {
      this.props.parks.forEach(park => {      
       fetch(listAPI, {                  
        method: 'POST',
        body: JSON.stringify({
          user_id: this.props.match.params.id,
          park_id: park.id,
          visited: false
          }),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json"
          }
        })
        .then(r => r.json())
        .then(list => this.setState({lists: [...this.state.lists, list]})
        )
      })       
    }
  

  visited = (id) => {
    let targetList = this.state.lists.find(list => list.park_id === id)
    let index = this.state.lists.findIndex(list => list.park_id === id)
    let listId = targetList.id
    fetch(`${listAPI}/${listId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        visited: !this.state.visited
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => res.json())
    .then(visit => {
      let newLists= [...this.state.lists]
      newLists[index] = visit
      this.setState({lists: newLists})
    })
  }

  unVisited = (id) => {
    let targetList = this.state.lists.find(list => list.park_id === id)
    let index = this.state.lists.findIndex(list => list.park_id === id)
    let listId = targetList.id
    fetch(`${listAPI}/${listId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        visited: false
      }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => res.json())
    .then(visit => {
      let newLists= [...this.state.lists]
      newLists[index] = visit
      this.setState({lists: newLists})
    })
  }

  setCreate = () => {
    return (
    <>
    <h1>Hello and Welcome</h1>
    <button onClick={this.createList}>Create List</button>
    </>)
  }
   
    
render() {
  return (
        <div className="user-page">
          {this.props.users.map(user => user.id === parseInt(this.props.match.params.id) ?
          <h1>{user.username}</h1> : null)}       
          { this.state.lists.length ? (this.state.lists.map(list => 
            this.props.parks.map(park => 
             { if (park.id === list.park_id && !list.visited) {
             return (<ParkCard key={park.id} {...park} visited={this.visited} />)}
             else if (park.id === list.park_id && list.visited) {
             return <ParkCardBack key={park.id} {...park} unVisited={this.unVisited} />
             } 
              })
            )) 
            :
            this.setCreate() }
        </div>
    )
  }
}

export default UserPage;
