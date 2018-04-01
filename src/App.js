import React, { Component } from 'react';
import './App.css';

const s = 25

const square = (s) => {
  const x = []
  const y = []

  for (let i = 0; i < s; i++) {
    x.push(i)
  }

  for (let i = 0; i < s; i++) {
    y.push(x.map(y => [i, y, 'dead', 0]))
  }

  return y;
}

const game = square(s)

class App extends Component {
  constructor() {
    super()
    
    this.state = { game }
  }
  
  handleClick = (event) => {
    this.toggleState(event.target)
    this.neighbors(event.target)
  }
  
  toggleState = (cell) => {
    const g = this.state.game
    const x = cell.id.split('-')[1]
    const y = cell.id.split('-')[2]
    g[x][y][2] = g[x][y][2] === 'alive' ? 'dead' : 'alive'
    this.setState({g})
  }

  neighbors = (cell) => {
    const g = this.state.game
    const x = cell.id.split('-')[1]
    const y = cell.id.split('-')[2]
    const c = g[x][y]
    const n = 
  }
  
  render() {
    return (
      <table>
        <tbody>
          {this.state.game.map(x => {
            const rowId = `row-${x[0][0]}`
            return (
              <tr key={rowId} id={rowId}>
                {x.map(y => {
                  const cellId = `cell-${y[0]}-${y[1]}`
                  return (
                    <td id={cellId} key={cellId} className={y[2]} onClick={this.handleClick}>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default App;

