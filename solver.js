function isAtEnd(pos, width, height) {
    return pos.x === width - 1 && pos.y === height - 1;
}
function getPossibleMoves(pos, cells, width, height) {
    let moves = [];
    if (cells[pos.y][pos.x][0] && pos.y > 0) moves.push({ x: pos.x, y: pos.y - 1, dir: "up" });
    if (cells[pos.y][pos.x][1] && pos.x < width - 1) moves.push({ x: pos.x + 1, y: pos.y, dir: "right" });
    if (cells[pos.y][pos.x][2] && pos.y < height - 1) moves.push({ x: pos.x, y: pos.y + 1, dir: "down" });
    if (cells[pos.y][pos.x][3] && pos.x > 0) moves.push({ x: pos.x - 1, y: pos.y, dir: "left" });
    return moves;
}

function solveMazeIteratively(startPos, cells, width, height) {
    let stack = [startPos];
    let visited = new Set([${startPos.x},${startPos.y}]);
    let path = [];

    while (stack.length > 0) {
        let currentPos = stack[stack.length - 1];

        if (isAtEnd(currentPos, width, height)) {
            console.log("Maze solved!");
            break;
        }

        let possibleMoves = getPossibleMoves(currentPos, cells, width, height);
        let moved = false;

        for (let move of possibleMoves) {
            let moveKey = ${move.x},${move.y};
            if (!visited.has(moveKey)) {
                stack.push(move);
                path.push(move.dir); // Store the direction of the move
                visited.add(moveKey);
                moved = true;
                break;
            }
        }

        if (!moved) {
            stack.pop(); // Backtrack: remove the current position from the stack
            path.pop(); // Also remove the last move from the path
        }
    }

    if (isAtEnd(stack[stack.length - 1], width, height)) {
        return path; // Return the path that led to the end
    } else {
        return false; // No solution found
    }
}

// Example usage:
time = 1
let startPos = { x: 0, y: 0 };
let solutionPath = solveMazeIteratively(startPos, cells, width, height);
if (solutionPath) {
    // If a solution is found, the moves can be simulated or displayed
    console.log(solutionPath);
    solutionPath.forEach(dir => tryMove(dir)); // Simulate the moves
} else {
    console.log("No solution exists for the maze.");
}