import React, { Component } from 'react';
import './App.css';

const s = 40

const square = (s) => {
  const x = []
  const y = []

  for (let i = 0; i < s; i++) {
    x.push(i)
  }

  for (let i = 0; i < s; i++) {
    y.push(x.map(y => ['dead', 0]))
  }

  return y;
}

const game = square(s)

class App extends Component {
  constructor() {
    super()

    this.state = { game }
  }

  cellClick = (event) => {
    this.toggleState(event.target)
    const game = this.neighbors()
    this.setState({ game })
  }

  toggleState = (cell) => {
    const game = this.state.game
    const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
    game[x][y][0] = game[x][y][0] === 'alive' ? 'dead' : 'alive'
  }

  neighbors = () => {
    const game = this.state.game
    return game.map((x, xi) => {
      return x.map((y, yi) => {
        const xiL = xi + 1 === s ? xi - s + 1 : xi + 1
        const xiR = xi - 1 < 0 ? xi + s - 1 : xi - 1
        const yiU = yi + 1 === s ? yi - s + 1 : yi + 1
        const yiD = yi - 1 < 0 ? yi + s - 1 : yi - 1
        return [y[0], [game[xiL][yiU][0], game[xi][yiU][0], game[xiR][yiU][0], game[xiL][yi][0], game[xiR][yi][0], game[xiL][yiD][0], game[xi][yiD][0], game[xiR][yiD][0]].filter(c => c === 'alive').length]
      })
    })
  }

  random = () => {
    const g = this.state.game
    const game = g.map(r => r.map(c => {
      const density = Math.floor(Math.random() * 2)
      return density === 1 ? ['dead', c[1]] : [`alive`, c[1]]
    }))
    console.log(game)
    this.setState( {game})
  }

  step = (event) => {
    const game = this.neighbors().map(x => {
      return x.map(y => {
        return [y[0] === 'alive' ? (y[1] < 2 ? `dead` : (y[1] > 3 ? `dead` : `alive`)) : (y[1] === 3 ? `alive` : `dead`), y[1]]
      })
    })
    this.setState({ game })
  }

  run = () => {
    setInterval(this.step, 1);
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.game.map((x, xi) => {
              return (
                <tr key={xi} id={`row-${xi}`}>
                  {x.map((y, yi) => {
                    const cellId = `cell-${xi}-${yi}`
                    return (
                      <td id={cellId} key={cellId} className={y[0]} onClick={this.cellClick}>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <button onClick={this.run}> </button>
        <button onClick={this.random}> </button>
      </div>
    )
  }
}

export default App;

