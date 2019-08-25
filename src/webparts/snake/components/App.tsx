import * as React from 'react';
import './App.css';
import Snake from './SnakeComponent';
import Food from './FoodComponent';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 9;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*10;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*10;
  return [x,y];
};

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeParts: [
    [50,50],
    [40,50]
  ]
};

class App extends React.Component {

  public state = initialState;

  /*
  public createFood = () => {
    let isFreeSpace = false;
    let coordinates = getRandomCoordinates();
    while (isFreeSpace === false){
      isFreeSpace = this.isSnakePart(coordinates);
      console.log(isFreeSpace);
      if (isFreeSpace === true){
        coordinates = getRandomCoordinates();
        this.setState({
          food: coordinates
        })
      } else {
        return [coordinates[0], coordinates[1]]
      }
    }
  }

  public isSnakePart = (coordinates) => {
    let snake = [...this.state.snakeParts];
    let boolean = snake.every(function(part){
      if (part[0] !== coordinates[0] && part[1] !== coordinates[1]){
        return false;
      } else {
        console.log("Touched");
        return true;
      }
    })
    return boolean;
  }
  */

  public componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  public componentDidUpdate() {
    this.checkIfTouchedWall();
    this.checkifTouchedSnake();
    this.checkIfEaten();
  }

  public onKeyDown = (event) => {
    event = (event || window.event).keyCode;
    switch (event) {
      case 37:
        if (this.state.direction !== 'RIGHT')
          this.setState({direction: 'LEFT'});
        break;
      case 38:
        if (this.state.direction !== 'DOWN')
          this.setState({direction: 'UP'});
        break;
      case 39:
        if (this.state.direction !== 'LEFT')
          this.setState({direction: 'RIGHT'});
        break;
      case 40:
        if (this.state.direction !== 'UP')
          this.setState({direction: 'DOWN'});
        break;
      default:
    }
  }

  public moveSnake = () => {
    let parts = [...this.state.snakeParts];
    let head = parts[parts.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 10, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 10, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 10];
        break;
      case 'UP':
        head = [head[0], head[1] - 10];
        break;
      default:
    }
    parts.push(head);
    parts.shift();
    this.setState({
      snakeParts: parts
    });
  }

  public checkIfTouchedWall() {
    let head = this.state.snakeParts[this.state.snakeParts.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  public checkifTouchedSnake() {
    let snake = [...this.state.snakeParts];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(part => {
      if (head[0] === part[0] && head[1] === part[1]) {
        this.onGameOver();
      }
    });
  }

  public checkIfEaten() {
    let head = this.state.snakeParts[this.state.snakeParts.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      });
      this.growSnake();
      this.increaseSpeed();
    }
  }

  public growSnake() {
    let newSnake = [...this.state.snakeParts];
    newSnake.unshift([]);
    this.setState({
      snakeParts: newSnake
    });
  }

  public increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      });
    }
  }

  public onGameOver() {
    alert(`Snake Length: ${this.state.snakeParts.length}`);
    this.setState(initialState);
  }

  public render() {
    return (
      <div className="canvas">
        <Snake snakeParts={this.state.snakeParts}/>
        <Food food={this.state.food}/>
      </div>
    );
  }
}

export default App;
