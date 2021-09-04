import Swal from "sweetalert2";

const MainInput = ({setUsername,username,setUser,socket}) =>{
    const join = () =>{
      if(username==="") {
        Swal.fire({
          title:"Enter some text please",
          icon:'error'
        })
        return;
      }
      socket.auth = {username};
      socket.connect();
      setUser(true);
    }
    return(
      <div className="MainInput__container">
       <div>
        <input 
          type="text" 
          value={username} 
          onChange={(e)=>setUsername(e.target.value)} 
          placeholder="enter username"/>
          <button onClick={join}>JOIN</button>
        </div>
      </div>
    );
}

export default MainInput;