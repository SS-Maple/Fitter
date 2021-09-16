import React from 'react';
import FriendProfile from './friendProfile/friendProfile.jsx';
import TopBar from './SharedComponents/TopBar.jsx';
import BottomNav from './SharedComponents/BottomNav/bottomNav.jsx';
import MyProfile from './myProfile/myProfile.jsx';
import FriendsList from './FriendsList/FriendsList.jsx';
import HomeFeed from './HomeFeed/HomeFeed.jsx';
import Login from './LoginForms/Login.jsx';
import Main from './Main.jsx';
import useToken from './LoginForms/useToken.js';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       test: []
//     }
//     this.handleClick = this.handleClick.bind(this)
//     this.setUserId = this.setUserId.bind(this)
//     this.setToken = this.setToken.bind(this)
//   }

//   handleClick(e) {
//     console.log(e.target.alt)
//   }

//   setUserId(value) {
//     this.setState({ user: value })
//   }

//   // setToken(tokenValue) {
//   //   sessionStorage.setItem('token', JSON.stringify(tokenValue))
//   //   this.setState({ token: tokenValue})
//   // }
//   setToken(tokenValue) {
//     sessionStorage.setItem('token', JSON.stringify(tokenValue.token))
//     sessionStorage.setItem('userId', JSON.stringify(tokenValue.userId))
//     console.log(tokenValue)
//     this.setState({
//       token: tokenValue.token,
//       userId: tokenValue.userId
//     })
//   }


//   render() {
//     if (!this.state.token) {
//       return (
//         <div>
//           <TopBar />
//           <Login setToken={this.setToken} setUserId={this.setUserId}/>
//         </div>
//       )
//     }

//     return (
//       <div>
//         <TopBar />
//         {/* <FriendProfile /> */}
//         {/* temporarily hidding FriendsList */}
//         {/* <FriendsList /> */}
//         {/* <Login /> */}
//         {/* <MyProfile /> */}
//         <Main />
//         <BottomNav handleClick={this.handleClick} />
//       </div>
//     )
//   }
// }

// function App() {
//   const { token, setToken } = useToken();





//   if (!token) {
//     console.log('render token', token)
//     return (
//       <div>
//         <TopBar />
//         <Login setToken={setToken} />
//       </div>
//     )
//   }
function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <TopBar />
      {/* <FriendProfile /> */}
      {/* temporarily hidding FriendsList */}
      {/* <FriendsList /> */}
      {/* <Login /> */}
      {/* <MyProfile /> */}
      <Main />
      <BottomNav />
    </div>
  )

}

export default App;