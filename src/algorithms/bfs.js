
export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = [];

 
  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.previousNode = null;
    }
  }

  queue.push(startNode);
  startNode.isVisited = true; 

  while (queue.length > 0) {
    const currentNode = queue.shift(); 
    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

    visitedNodesInOrder.push(currentNode);

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
     
      if (!neighbor.isWall && !neighbor.isVisited) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode; 
        queue.push(neighbor);
      }
    }
  }

  
  return visitedNodesInOrder;
}


export function getNodesInShortestPathOrderBFS(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode); 
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}


function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  
  if (row > 0) neighbors.push(grid[row - 1][col]);
  
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
 
  if (col > 0) neighbors.push(grid[row][col - 1]);
  
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter(neighbor => !neighbor.isVisited);
}