# CHESS GAME - Socket.io

![](socketchess.gif)

## REQUEST RESPONSE CYCLE

<table>
  <tr>
    <th>EVENT</td>
    <th>REQUEST(frontend)</td>
    <th>RESPONSE(backend)</td>
  </tr>
  <tr>
    <td>Connect</td>
    <td> { <br> &nbsp;&nbsp;socketId : id <br> &nbsp;&nbsp;username : name <br>} </td>
    <td> { <br> &nbsp;&nbsp;userList : { <br> &nbsp;&nbsp;&nbsp;&nbsp;username : "string|username" <br>  &nbsp;&nbsp;} <br> }</td>
  </tr>
  <tr>
    <td>Create</td>
    <td> { <br> &nbsp;&nbsp;clientId : id <br> } </td>
    <td> {  <br> &nbsp;&nbsp;OtherPlayerId : id, <br> &nbsp;&nbsp;gameId : id  <br>  }</td>
  </tr>
  <tr>
    <td>Join</td>
    <td> { <br> &nbsp;&nbsp;clientId : guid, <br>&nbsp;&nbsp;gameId : guid, <br> &nbsp;&nbsp;OtherPlayerId : guid <br> } </td>
    <td> { <br> &nbsp;&nbsp;gameId : guid <br> }</td>
  </tr>
  <tr>
    <td>Move</td>
    <td> { <br> &nbsp;&nbsp;SourceSquare : "string", <br> &nbsp;&nbsp;TargetSquare : "string", <br> &nbsp;&nbsp;userTurn : "string", <br> &nbsp;&nbsp;clientId : id <br>  } </td>
    <td> { <br> &nbsp;&nbsp;&nbsp;&nbsp;(Same Response) To Other Player <br> }</td>
  </tr>
  <tr>
    <td>Disconnect</td>
    <td> { } </td>
    <td> { <br> &nbsp;&nbsp;disconnect : true <br> }</td>
  </tr>
</table>

## How To Run

- Open both frontend and backend folder in a separate editor.
- open Command prompt and run npm install for both the folder to download the necessary modules.
- Run the backend first by opening the backend directory in the command prompt and type 'npm start'
- Now Run the frontend by oepning the frontend directory in the command prompt and type 'npm start'
- You can open localhost:3000 in many tabs as you can and play with yourself.

## Modules Used

### Frontend Modules

- React is used on frontend.
- chessboard is the frontend of the chess.
- chess.js is the main logic function to validate the moves.
- sweetalert2 is used for beautiful alert.
- socket.io-client is the socket module to connect with the server via socket connection.

### Backend Modules

- express is the webserver that serves as a backend.
- socket.io is the main module to handle client socket request and respond to it correspondingly.

## Applicaton Process

- When user runs the application, He/she must enter his/her username and join.
- Upon joining, user is shown a list of other users connected to the server.
- User can play with other user via clicking the play button.
- When the player clicked the button, the other player will receive the alert in his machine to join. He presses join and both player can play.
- Each player gets an equal turn where white begins the game as seen in chess.









