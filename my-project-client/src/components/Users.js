import React from 'react';
import UserPage from '../components/UserPage';

class Users extends React.Component {

handleClick = () => {
  this.props.createList(this.props.filter)
}

  render() {
    
    return(
    <div className="lists">
      {/* <form onSubmit={this.handleClick}>
      <button>Play Ball!</button>
      </form>
      
      <h1>{this.props.newUserId}</h1>
      {this.props.lists.map(list => 
        if (list.user_id === this.props.filter && list.visited) {
          this.props.parks.map(park => 
            )
        }
        )}
       */}
    </div>
  )
  }
}

// {this.props.parks.map(park => park
//   <ParkCard 
//   key={park.id}
//   {...park}
//   />
//   )}

export default Users

