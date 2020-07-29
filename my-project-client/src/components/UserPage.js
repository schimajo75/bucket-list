import React from 'react';
import ParkCard from '../components/ParkCard'
import ParkCardBack from '../components/ParkCardBack'

const listAPI = 'http://localhost:3000/api/v1/lists'


class UserPage extends React.Component {

  state = {
    lists: [],
    team: ""
  }

  componentDidMount() {
    let id = parseInt(this.props.match.params.id)
    fetch(listAPI)
    .then(r => r.json())
    .then(list => {
      let filtered = list.filter(list => list.user_id === id)
      this.setState({lists: filtered})
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
  

  visit = (id) => {
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

  unVisit = (id) => {
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
    <h1 className="create">Batter Up!</h1>
    <button onClick={this.createList}>Create List</button>
    </>
    )
  }

  deleteUserLists = () => {
    let userId = this.props.match.params.id
    this.state.lists.forEach(list => {
      if (list.user_id === parseInt(userId)) {
        fetch(`${listAPI}/${list.id}`, {
        method: 'DELETE'
      })
      .then(this.setState({lists: []}))
      .then(this.props.history.push(`/`))
      }
    }
  )
}

handleChange = e => this.setState({ [e.target.name]: e.target.value })

clearFilter = e => {
  e.preventDefault()
  this.setState({team: ""})
} 
    
render() {
  return (
        <div className="user-page">
          {this.props.users.map(user => user.id === parseInt(this.props.match.params.id) && !this.state.lists.length?
          <h1 className="username">{user.username}</h1>
          : null)}
          {this.props.users.map(user => user.id === parseInt(this.props.match.params.id) && this.state.lists.length ?
          <> <button className="delete" onClick={() => { if (window.confirm('Are you sure you wish to delete this list?')) this.deleteUserLists() } }>Delete My Park List</button> 
          <h1 className="username">{user.username}'s list:</h1>
          <form onSubmit={this.clearFilter}>
            <input name="team" placeholder="filter by team name" value={this.state.team} onChange={this.handleChange}></input>
            <button>clear form</button>
          </form>
          </>
          : null)}
          { this.state.lists.length ? 
          (this.props.parks.map(park => 
            this.state.lists.map(list => 
             { if (park.id === list.park_id && !list.visited && park.team.toLowerCase().includes(this.state.team.toLowerCase())) {
             return <ParkCard key={park.id} {...park} visited={() => this.visit(park.id)} />}
             else if (park.id === list.park_id && list.visited && park.team.toLowerCase().includes(this.state.team.toLowerCase())) {
             return <ParkCardBack key={park.id} {...park} unVisited={() => this.unVisit(park.id)} />
             } 
              })
            )).reverse()
            :
            this.setCreate() }
        </div>
    )
  }
}

export default UserPage;


