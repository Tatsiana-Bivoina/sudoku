module.exports = function solveSudoku(matrix) {
  const size = 9;
  const boxSize = 3;

  const findEmpty = (matrix) => {
    // row
    for(let r = 0; r < size; r++) {
      // column
      for(let c = 0; c < size; c++) {
        if (matrix[r][c] === 0) {
          return [r, c];
        }
      }
    }
    // если в судоку нет больше пустых ячеек
    return null;
  }

  const validate = (num, pos, matrix) => {
    const [r, c] = pos;

    // проверка строк(есть ли в строке число)
    for(let i = 0; i < size; i++) {
      if (matrix[i][c] === num && i != r) {
        return false;
      }
    }

    // проверка колонок
    for(let i = 0; i < size; i++) {
      if (matrix[r][i] === num && i != c) {
        return false;
      }
    }

    // проверка квадрата 
    const boxRow = Math.floor(r / boxSize) * boxSize;
    const boxCol = Math.floor(c / boxSize) * boxSize;

    for(let i = boxRow; i < boxRow + boxSize; i++) {
      for(let j = boxCol; j < boxCol + boxSize; j++) {
        if (matrix[i][j] === num && i != r && j != c) {
          return false;
        }
      }
    }

    return true;
  }

  const solve = () => {
    const currentPos = findEmpty(matrix);

    if (currentPos === null) {
      return true;
    }

    for(let i = 1; i < size + 1; i++) {
      const currentNumber = i;
      const isValid = validate(currentNumber, currentPos, matrix);

      if(isValid) {
        const [x, y] = currentPos;
        matrix[x][y] = currentNumber;

        if(solve()) {
          return true;
        }

        matrix[x][y] = 0;
      }
    }

    return false;
  }

  solve();
  return matrix;
}
