import './style.css'
import { useState } from 'react';
import MainInput from './MainInput';
import Userlist from './Userlist';

function App({socket}) {
  const [user, setUser] = useState(false);
  const [username, setUsername] = useState("")
  return (
    <div>
      {user?
      <Userlist socket={socket} username={username}/>:
      <MainInput setUser={setUser}
      setUsername={setUsername} 
      username={username}
      socket={socket}/>}
    </div>
  );
}

export default App;
