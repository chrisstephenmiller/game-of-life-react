import React, { Component } from 'react';
import './App.css';

const s = 12

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
    this.neighbors(event.target)
    this.cellState(event.target)
    // this.step()
  }

  toggleState = (cell) => {
    const g = this.state.game
    const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
    g[x][y][0] = g[x][y][0] === 'alive' ? 'dead' : 'alive'
    this.setState({ g })
  }

  neighbors = (cell) => {
    const g = this.state.game
    const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
    const xR = x - 1 < 0 ? x + s - 1 : x - 1
    const xL = x + 1 === s ? x - s + 1 : x + 1
    const yD = y - 1 < 0 ? y + s - 1 : y - 1
    const yU = y + 1 === s ? y - s + 1 : y + 1
    g[x][y][1] = [g[xL][yU][0], g[x][yU][0], g[xR][yU][0], g[xL][y][0], g[xR][y][0], g[xL][yD][0], g[x][yD][0], g[xR][yD][0]].filter(c => c === 'alive').length
    console.log (g[x][y][1])
    console.log (g[x][y])
    console.log (g[x])
    this.setState({ g })
  }

  cellState = (cell) => {
    const g = this.state.game
    const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
  }

  step = () => {
    const g = this.state.game
    const nextG = g.map(x => {
      return x.map(y => {
        return y[1]
        // return y[0] === 'alive' ? (y[1] < 2 ? `dead` : (y[1] > 3 ? `dead` : `alive`) ) : y[1]
        // return y[0] === 'alive' ? (y[1] < 2 ? `dead` : (y[1] > 3 ? `dead` : `alive`)) : (y[1] === 3 ? `alive` : `dead`)
      })
    })
    // console.log(nextG)
    this.setState({nextG})
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
        <button onClick={this.step}> </button>
      </div>
    )
  }
}

export default App;

