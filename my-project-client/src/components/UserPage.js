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
    this.state.lists.sort((a,b) => a.id > b.id ? 1 : -1)
    let id = parseInt(this.props.match.params.id)
    fetch(listAPI)
    .then(r => r.json())
    .then(list => {
      let filtered = list.filter(list => list.user_id === id)
      list.length > 0 ? 
      this.setState({lists: filtered}) : 
      this.setState({newUser: true}) 
      this.state.lists.sort((a,b) => a.id > b.id ? 1 : -1)
    })
  }

  visited = (id) => {
    let targetList = this.state.lists.find(list => list.park_id === id)
    let index = this.state.lists.findIndex(list => list.park_id === id)
    let listId = targetList.id
    fetch(`${listAPI}/${listId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        visited: true
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
    
    
render() {
  console.log(this.state.lists)
  return (
        <div className="user-page">
          {this.state.lists.map(list => 
            this.props.parks.map(park => 
             { if (park.id === list.park_id && !list.visited) {
             return (<ParkCard key={park.id} {...park} visited={this.visited} />)}
             else if (park.id === list.park_id && list.visited) {
               return <ParkCardBack key={park.id} {...park} visited={this.visited} />
             } 
              })
            )}
        </div>
    )
  }
}

export default UserPage;

