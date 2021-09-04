import { useState,useEffect } from "react";
import MainChess from "./MainChess";
import Swal from  'sweetalert2'


const Userlist = ({socket,username}) => {
    const [start,setStart] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(()=>{
      socket.on('list',(res)=>{
        const user = [];
        for (var key of Object.keys(res)) {
          if(key!==socket.id){
            let data = {
                id : key,
                username : res[key].username
            }
            user.push(data)
          }
        }
        setUsers(user)
      })
    },[])
  
    useEffect(()=>{
      socket.on('create', ({gameid,id})=>{
        Swal.fire({
          title: "You are being invited",
          icon:'question',
          confirmButtonText:"join"
        }).then(res=>{
          if(res.isConfirmed){
            let myid = socket.id
            socket.emit('join',{gameid,id,myid});
            setStart(true)
          }
        })
      })
    },[])
  
    const startGame = (id) =>{
      socket.emit('create',id);
      setStart(true)
    }
    return(
      <div>
          
          {!start?<div className="userlist"><ul>
            <li className="first">{username}</li>
          {users&&users.map((value,index)=>(
            <li key={index}>{value.username} {<button onClick={()=>startGame(value.id)}>play</button>}</li>
          ))}</ul></div>
          :<MainChess 
          username={username}
          socket={socket}/>}
      </div>
    );
  }

  export default Userlist;