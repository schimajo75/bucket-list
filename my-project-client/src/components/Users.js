import React from 'react';
import UserPage from '../components/UserPage';

class Users extends React.Component {

handleClick = () => {
  this.props.filter ? this.props.history.push(`/users/${this.props.filter}`) : alert("The username or password you chose is already taken. Please return to the login page")
}

  render() {
    console.log(this.props.filter)
    return(
    <div className="new_user">
      <h1>Welcome new user!</h1>
      <h4>Click below to get started</h4>
      <button onClick={this.handleClick}>Play Ball</button>
    </div>
  )
  }
}
// **THIS CREATES NEW LIST
// {this.props.parks.map(park => park
//   <ParkCard 
//   key={park.id}
//   {...park}
//   />
//   )}

export default Users

