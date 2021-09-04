import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import  Chess  from "chess.js";
import Chessboard from "chessboardjsx";
import Swal from  'sweetalert2'

const game =new Chess();
const MainChess = ({socket,username}) =>{
    const [fen, setFen] = useState("start")
    const [play, setPlay] = useState(false);
    const [orientation, setOrientation] = useState('white');
    const [otherusername, setOtherusername] = useState('');
    const [otherid, setOtherid] = useState('');
    const [turn, setTurn] = useState('w');
    const [width,setWidth] = useState(0)
    const [overmessage, setOvermessage] = useState('');
  
    useEffect(()=>{
      socket.on('join',(res)=>{
        setPlay(true);
        setTurn(res['white']===socket.id?'w':'b')
        setOrientation(res['black']===socket.id?'black':'white');
        setOtherusername(res['white']===socket.id?res['blackUsername']:res['whiteUsername'])
        setOtherid(res['white']===socket.id?res['black']:res['white'])
      })
    },[])
  
    useEffect(()=>{
      socket.on('move',({sourceSquare,targetSquare})=>{
        let move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion:'q'
        });
        if (move === null) return;
        checkGameState();
        setFen(game.fen());
       
      })
    },[])
  
    const onDrop = ({sourceSquare, targetSquare}) =>{
        if(game.turn()!==turn){
          return;
        }
        // see if the move is legal
        let move = game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion:'q'
        });
        if (move === null) return;
        checkGameState();
        setFen(game.fen()); 
        let userturn = game.turn()
        socket.emit('move',{sourceSquare,targetSquare,userturn,otherid})
    }

    const changeWidth = ({screenWidth}) =>{
      if(screenWidth>600){
        setWidth(480)
        return;
      }
      setWidth(screenWidth-30)
    }


  
    const checkGameState = () =>{
      if(game.game_over()){
        if(game.in_draw()){
          Swal.fire({
            title: "Its a draw",
            icon:'info'
          })
          return;
        }
        if(game.in_stalemate()){
          Swal.fire({
            title: "its a stalemate.",
            icon:'info'
          })
          return;
        }
        if(game.in_threefold_repetition()){
          Swal.fire({
            title: "its a threefold repitition.",
            icon:'info'
          })
          return;
        }
        if(game.insufficient_material()){
          Swal.fire({
            title: "game over due to insufficient material.",
            icon:'info'
          })
          return;
        }
        Swal.fire({
          title: game.turn()==='w'?'black wins':'white wins',
          icon:'success'
        })
      }
    }
  
    return (
      <div className="MainChess__container">
        {!play?<Spinner />:
        <div className="MainChess__inside">
          <div className={`MainChess__turn ${turn===game.turn()?'myTurn':'otherTurn'}`} style={{textAlign:'center'}}>
            {overmessage===''?game.turn()==='w'?'whites turn':'blacks turn':overmessage}
          </div>
          <div className="MainChess__other">
            <i className="fas fa-circle"></i>
            &nbsp;
            {otherusername}
          </div>
          <Chessboard 
            position={fen}
            width={width}
            calcWidth={changeWidth}
            orientation={orientation}
            onDrop={onDrop}/>
          <div className="MainChess__you">
            <i className="fas fa-circle"></i> &nbsp;
            {username}
          </div>
  
        </div>
        }
      </div>
    );
  }

  export default MainChess;