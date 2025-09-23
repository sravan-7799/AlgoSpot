# Pathfinding Visualizer

An interactive web application built with React to visualize the mechanics of various pathfinding algorithms on a grid. This tool allows users to set start and end points, add walls, and observe how different algorithms find a path from the start to the finish node.

---

## ✨ Features

* **Algorithm Visualization:** Watch algorithms explore the grid step-by-step.
* **Multiple Algorithms:** Includes implementations for:
    * **Dijkstra's Algorithm:** Finds the shortest path on a weighted or unweighted graph. (Treats all unblocked cells as weight 1 for simplicity in this visualizer).
    * **Breadth-First Search (BFS):** Finds the shortest path on an unweighted graph.
    * **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking. (Does not guarantee the shortest path).
* **Interactive Grid:**
    * Toggle walls on the grid by clicking and dragging your mouse.
    * Clear the grid to start a new visualization.
* **Real-time Animation:** See the pathfinding process unfold with animations.

---

## 📸 Screenshots

Witness the visualizer in action, showcasing pathfinding and algorithm selection:

### Dijkstra's Algorithm in Action

A clear path found using Dijkstra's algorithm, showing visited nodes and the shortest path.

<img width="1410" alt="Screenshot 2025-06-10 at 10 55 13 AM" src="https://github.com/user-attachments/assets/cf6d9936-6943-43ad-a19c-be248b94af91" />


### BFS Algorithm in Action

<img width="1373" alt="Screenshot 2025-06-10 at 10 55 57 AM" src="https://github.com/user-attachments/assets/e75a52d5-8fd6-47a5-9c0e-43da3029dc3e" />


### DFS Algorithm in Action

<img width="1371" alt="Screenshot 2025-06-10 at 10 56 47 AM" src="https://github.com/user-attachments/assets/375f6a6b-fb91-41a4-a076-3c73b9ab5143" />




### Algorithm Selection Interface

The user interface allowing selection between Dijkstra's, BFS, and DFS algorithms.

![Algorithm Selection Dropdown]()

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You'll need to have [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) (Node Package Manager) installed on your machine.

* **Node.js:** Ensure you have a stable version (e.g., v16.x or v18.x recommended). Older versions might require setting `NODE_OPTIONS` (see below).
* **npm:** Comes bundled with Node.js.



### Running the Application

To run the app in development mode:

```powershell
# For Windows PowerShell/CMD (handles OpenSSL compatibility)
$env:NODE_OPTIONS="--openssl-legacy-provider"; npm start
