import React, { Component } from 'react';
import './App.css';

// Board needs to be abstracted into stateful component
// Footer also needs to be abstracted into the same stateful component



const squareObj=()=>{
return {
  systemSelected: false,
  userClicked: false
}
}


const ONE = '1'
const TWO = '2'
const THREE = '3'
const FOUR = '4'
const FIVE ='5'

const generateSquares = () => {
  const arr = [];
  for(let i = 0; i < 12; i++) {
    arr.push(squareObj());
  }
  return arr;
}

const getColor = (square, currentBoardState) => {
  if (currentBoardState === THREE && square.systemSelected)
    return 'blue';  
  else if (currentBoardState === FIVE){
    if (square.systemSelected && square.userSelected)
      return 'green';

    else if (square.systemSelected && !square.userSelected)
        return 'yellow';
    
    else if(!square.systemSelected && !square.userSelected)
      return 'red';
  }
  else
    return 'gray';

      }
    


class BoardState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBoardState: ONE,
      squares: generateSquares(),
    }
  }


 createSquare(id){
 
  const statusBoard=this.state.squares
  let x = statusBoard[id]
   return <button onClick={()=>this.userClicked(id)} className = 'board-button' style={{background:getColor(x,this.state.currentBoardState)}}> </button >

 }
  updateBoardState() {
    let newState = ''
    switch(this.state.currentBoardState) {
      case ONE:
        newState = TWO;
        break;
      case TWO:
        newState = THREE;
        break;
      case THREE:
        newState = FOUR;
        break;
      case FOUR:
        newState = FIVE;
        break;
      case FIVE:
        newState = TWO;
        break;
      default:
        throw new Error('Something bad happened')
    }
    this.setState({currentBoardState: newState});
  }


  userClicked(index) {
  //will recieve an ID which is the loation of the square of the array in this.state
  //grab the value of the id in the squares array in state
  let square =this.state.squares[index];
  square.userClicked = true;
    const squares= this.state.squares.slice()
    squares[index] = square;
    this.setState({squares:squares})
  }

  randomizeArray() {
    // This function will randomize the squares array in state
  }

  gameStart() {
    // Initializes the state
    // Starts the 3 second countdown
  }

  render() {
    return (


      <div className="Board-State">
        <div className="board">
          <div className="row">
           {this.createSquare(0)}
           {this.createSquare(1)}
           {this.createSquare(2)}
           {this.createSquare(3)}
          </div>
          <div className="row">
          {this.createSquare(4)}
          {this.createSquare(5)}
          {this.createSquare(6)}
          {this.createSquare(7)}
          </div>
          <div className="row">
          {this.createSquare(8)}
          {this.createSquare(9)}
          {this.createSquare(10)}
          {this.createSquare(11)}
          </div>
        </div>
        <div className="footer">
          <button >Start Game</button>
        </div>
      </div>
    )
  }
}

const App = props => (
  <div className="App">
    <h1 className="header" >Memory Game</h1>
    <BoardState />
  </div>
)

export default App;

