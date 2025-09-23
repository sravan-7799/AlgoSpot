

import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { bfs, getNodesInShortestPathOrderBFS } from '../algorithms/bfs';
import { dfs, getNodesInShortestPathOrderDFS } from '../algorithms/dfs';

import './PathfindingVisualizer.css';


const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      selectedAlgorithm: 'dijkstra',
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  
  clearGrid() {
   
    const grid = getInitialGrid();
    for (const row of grid) {
      for (const node of row) {
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        if (nodeElement) {
          nodeElement.className = 'node';
          if (node.isStart) nodeElement.className += ' node-start';
          if (node.isFinish) nodeElement.className += ' node-finish';
        }
      }
    }
    this.setState({ grid });
  }

 
  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      const node = visitedNodesInOrder[i];
      setTimeout(() => {
        
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
       
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        }
      }, 50 * i); 
    }
  }

  visualizeAlgorithm() {
    this.clearGrid();

    const { grid, selectedAlgorithm } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    let visitedNodesInOrder;
    let nodesInShortestPathOrder;

    switch (selectedAlgorithm) {
      case 'dijkstra':
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        break;
      case 'bfs':
        visitedNodesInOrder = bfs(grid, startNode, finishNode);
       
        nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
        break;
      case 'dfs':
        visitedNodesInOrder = dfs(grid, startNode, finishNode);
      
        nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode);
        break;
      default:
        console.error('Unknown algorithm selected:', selectedAlgorithm);
        return;
    }

    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed, selectedAlgorithm } = this.state;

    return (
      <>
        {}
        <div className="controls">
          <select
            value={selectedAlgorithm}
            onChange={(e) => this.setState({ selectedAlgorithm: e.target.value })}
            className="algorithm-select"
          >
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="bfs">Breadth-First Search (BFS)</option>
            <option value="dfs">Depth-First Search (DFS)</option>
          </select>
          <button onClick={() => this.visualizeAlgorithm()} className="visualize-button">
            Visualize {selectedAlgorithm.toUpperCase()}
          </button>
          <button onClick={() => this.clearGrid()} className="clear-button">
            Clear Grid
          </button>
        </div>

        {}
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="grid-row">
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}



const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) { 
    const currentRow = [];
    for (let col = 0; col < 50; col++) { 
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};