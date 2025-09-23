
export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  
  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.previousNode = null;
    }
  }

 
  dfsRecursive(startNode, finishNode, grid, visitedNodesInOrder);

  return visitedNodesInOrder;
}


function dfsRecursive(currentNode, finishNode, grid, visitedNodesInOrder) {
  if (!currentNode || currentNode.isWall) return false; 

  currentNode.isVisited = true;
  visitedNodesInOrder.push(currentNode);

  if (currentNode === finishNode) return true;

  const neighbors = getUnvisitedNeighborsDFS(currentNode, grid); 
  for (const neighbor of neighbors) {
   
    if (!neighbor.isWall && !neighbor.isVisited) {
      neighbor.previousNode = currentNode;
      if (dfsRecursive(neighbor, finishNode, grid, visitedNodesInOrder)) {
        return true;
      }
    }
  }

  return false; 
}


export function getNodesInShortestPathOrderDFS(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}


function getUnvisitedNeighborsDFS(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  
  return neighbors.filter(neighbor => !neighbor.isVisited);
}