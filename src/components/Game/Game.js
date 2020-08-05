import React from 'react';
import Board from '../Board';
import style from './game.module.css';

const mayImprove = {
  1: '在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。',
  2: '在历史记录列表中加粗显示当前选择的项目。',
  3: '使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。',
  4: '添加一个可以升序或降序显示历史记录的按钮。',
  5: '每当有人获胜时，高亮显示连成一线的 3 颗棋子。',
  6: '当无人获胜时，显示一个平局的消息。',
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  handleClick(i) {
    // const squares = this.state.squares.slice();
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    // this.setState({
    //   squares,
    //   xIsNext: !this.state.xIsNext,
    // })
    this.setState({
      history: history.concat([{
        squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(stepNumber) {
    this.setState({
      stepNumber,
      xIsNext: (stepNumber % 2) === 0,
    })
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    // console.log(history);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start'

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    })

    let status;
    let draw = current.squares.findIndex((square) => square === null);
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (draw === -1) {
      status = 'Game draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className={style.game_container}>
        <div className={style.game}>
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className={style.info}>
            <div className={style.status}>
              {status}
            </div>
            <ol className={style.game_TODO}>
              {moves}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
