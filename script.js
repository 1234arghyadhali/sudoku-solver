const size = 9;
const grid = [];

function createGrid() {
  const table = document.getElementById('sudoku-grid');
  for (let row = 0; row < size; row++) {
    const tr = document.createElement('tr');
    grid[row] = [];
    for (let col = 0; col < size; col++) {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', '*');
      input.setAttribute('maxlength', '1');
      td.appendChild(input);
      tr.appendChild(td);
      grid[row][col] = input;
    }
    table.appendChild(tr);
  }
}

function getGridValues() {
  return grid.map(row =>
    row.map(cell => {
      const val = cell.value.trim();
      return val === '*' || val === '' ? 0 : parseInt(val);
    })
  );
}

function setGridValues(values) {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      grid[r][c].value = values[r][c] || '*';
    }
  }
}

function isValid(board, row, col, num) {
  for (let i = 0; i < size; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(col / 3) + i % 3;
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solve() {
  const board = getGridValues();
  if (solveSudoku(board)) {
    setGridValues(board);
    alert("🧠 Sudoku Solved!");
  } else {
    alert("❌ No solution exists.");
  }
}

window.onload = createGrid;
