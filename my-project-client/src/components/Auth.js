import React from 'react';

class Auth extends React.Component {
    state = {
        isNewUser: false,
        username: '',
        password: '',
        confirmation: '',
    }

    toggleNewUser = () => this.setState(prevState => ({ isNewUser: !prevState.isNewUser, username: '', password: '', name: '', confirmation: '' }))

    handleChange = e => this.setState({ [e.target.name]: e.target.value })


    handleSignUp = e => {
        const { isNewUser, password, confirmation, username } = this.state;
        if (isNewUser && password === confirmation) {
          this.props.createUser(username, password)
          this.props.history.push(`/users`)
        } else {
          alert('try again!')
        }
    }


    handleLogin = e => {
      const { password, username } = this.state;
      let login = this.props.users.find(user => 
        username === user.username && password === user.password 
      )
      login ? this.props.history.push(`/users/${login.id}`) : alert("try again, or Sign up.")
      }
        
    

    renderLogin = () => {
        const { username, password } = this.state;
        return (
            <>
                <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
                <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange}/>
                <button type="submit" onClick={this.handleLogin}>Submit</button>
            </>
        )
    }

    renderSignup = () => {
        const { username, password, confirmation } = this.state;
        return (
            <>
                <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
                <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange}/>
                <input name="confirmation" placeholder="Confirm Password"  type="password" value={confirmation} onChange={this.handleChange}/>
                <button type="submit" onClick={this.handleSignUp}>Submit</button>
            </>
        )
    }
    
    render(){
        let { isNewUser } = this.state;
        return (
            <div className="simple-flex-col">
                <h3>{isNewUser ? 'Sign Up' : 'Login'}</h3>
                { isNewUser ? this.renderSignup() : this.renderLogin() }
                <div onClick={this.toggleNewUser}>{isNewUser ? "Login Instead" : "Sign Up Instead"}</div>
            </div>
        )
    }
}

export default Auth;