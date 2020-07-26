import React from 'react';

class UserPage extends React.Component {

  componentDidMount() {
    let id = parseInt(this.props.match.params.id)
    let userList = this.props.lists.filter(list => list.user_id === id)
    userList.length > 0 ? console.log(userList) : console.log("empty")
  }

    
    
render() {
  return (
        <div className="user-page">
          User Page
        </div>
    )
  }
}

export default UserPage;