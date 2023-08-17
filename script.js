const gameField = document.getElementById("game-field");
const scoreField = document.getElementById("score-field");
let score = 0;
scoreField.innerHTML = score;

let cellCol = "";
let cellRow = "";
let btnClass = "btn-style";

let arrayMain = generateArray(10, 6, 1, 4);
displayArray(arrayMain, gameField);

function generateArray(length1, length2, min, max) {
  const tempArray = [];
  const maxRepeats = 2;

  let prevValues = new Array(length2).fill(null);
  let repeatCounts = new Array(length2).fill(0);

  for (let i = 0; i < length1; i++) {
    tempArray[i] = [];
    for (let j = 0; j < length2; j++) {
      let value;
      do {
        value = getRandomNumber(min, max);
      } while (
        (value === prevValues[j] && repeatCounts[j] >= maxRepeats) ||
        value === tempArray[i][j - 1]?.value
      );

      if (value === prevValues[j]) {
        repeatCounts[j]++;
      } else {
        repeatCounts[j] = 1;
        prevValues[j] = value;
      }

      tempArray[i][j] = { value };
    }
  }

  return tempArray;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayArray(sourceArray, targetElement) {
  let gameFieldWidth = 54 * sourceArray[0].length;

  targetElement.innerHTML = "";
  targetElement.style.minWidth = gameFieldWidth + "px";

  for (let i = 0; i < sourceArray.length; i++) {
    for (let j = 0; j < sourceArray[i].length; j++) {
      const value = sourceArray[i][j].value;
      cellCol = i;
      cellRow = j;
      targetElement.innerHTML += `<button class='${btnClass} btn${value}' data-col="${cellCol}" data-row="${cellRow}">${value}</button>`;
    }
    targetElement.innerHTML += `<br>`;
  }
}

// ---------------------------------------------------------

function clearAndFillArray(arrayMain) {
  let cleared = false;

  for (let i = 0; i < arrayMain.length; i++) {
    for (let j = 0; j < arrayMain[i].length - 2; j++) {
      if (
        arrayMain[i][j].value === arrayMain[i][j + 1].value &&
        arrayMain[i][j].value === arrayMain[i][j + 2].value
      ) {
        arrayMain[i][j].value = 0;
        arrayMain[i][j + 1].value = 0;
        arrayMain[i][j + 2].value = 0;
        cleared = true;
      }
    }
  }

  for (let i = 0; i < arrayMain.length - 2; i++) {
    for (let j = 0; j < arrayMain[i].length; j++) {
      if (
        arrayMain[i][j].value === arrayMain[i + 1][j].value &&
        arrayMain[i][j].value === arrayMain[i + 2][j].value
      ) {
        arrayMain[i][j].value = 0;
        arrayMain[i + 1][j].value = 0;
        arrayMain[i + 2][j].value = 0;
        cleared = true;
      }
    }
  }

  for (let j = 0; j < arrayMain[0].length; j++) {
    let nonZeroValues = [];
    for (let i = arrayMain.length - 1; i >= 0; i--) {
      if (arrayMain[i][j].value !== 0) {
        nonZeroValues.push(arrayMain[i][j].value);
        arrayMain[i][j].value = 0;
      }
    }
    for (let i = nonZeroValues.length - 1; i >= 0; i--) {
      arrayMain[arrayMain.length - 1 - i][j].value = nonZeroValues[i];
    }
  }

  return cleared;
}

function generateNewButtons(arrayMain, min, max) {
  for (let i = 0; i < arrayMain.length; i++) {
    for (let j = 0; j < arrayMain[i].length; j++) {
      if (arrayMain[i][j].value === 0) {
        arrayMain[i][j].value = getRandomNumber(min, max);
      }
    }
  }
  checkMatch();
}

// ---------------------------------------------------------

let tempValue1, tempValue2, tempCol, tempRow;
let count = 0;
let lastButton = null;

function update() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const dataCol = parseInt(button.getAttribute("data-col"));
      const dataRow = parseInt(button.getAttribute("data-row"));
      checkSelected(button, dataCol, dataRow, arrayMain);
      checkMatch();
    });
  });
}

function checkSelected(button, dataCol, dataRow, arrayMain) {
  if (count == 0) {
    tempValue1 = parseInt(arrayMain[dataCol][dataRow].value);

    tempCol = dataCol;
    tempRow = dataRow;
    count++;
    lastButton = button;
    button.classList.add("selected");
  } else if (count == 1) {
    const check = checkMove(tempCol, tempRow, dataCol, dataRow);
    if (check) {
      tempValue2 = parseInt(arrayMain[dataCol][dataRow].value);
      arrayMain[dataCol][dataRow].value = tempValue1;
      button.textContent = tempValue1;
      button.className = `btn-style btn${tempValue1}`;

      if (lastButton) {
        arrayMain[tempCol][tempRow].value = tempValue2;
        lastButton.textContent = tempValue2;
        lastButton.className = `btn-style btn${tempValue2}`;
        lastButton.classList.remove("selected");
      }

      count = 0;
      lastButton = null;
    } else {
      lastButton.classList.remove("selected");
      count = 0;
      lastButton = null;
      checkSelected(button, dataCol, dataRow, arrayMain);
    }
  }

  checkMatch();
}

function checkMatch() {
  const cleared = clearAndFillArray(arrayMain);
  if (cleared) {
    generateNewButtons(arrayMain, 1, 4);
    displayArray(arrayMain, gameField);
    update();
    score += 5;
  }
  scoreField.innerHTML = score;
}

function checkMove(fCol, fRow, sCol, sRow) {
  let isMove = false;

  const fSum = fCol + fRow;
  const sSum = sCol + sRow;
  if (fSum != sSum && fSum + 2 != sSum && fSum - 2 != sSum) {
    if (fCol == sCol || fCol + 1 == sCol || fCol - 1 == sCol) {
      if (fRow == sRow || fRow + 1 == sRow || fRow - 1 == sRow) {
        isMove = true;
      }
    }
  }
  return isMove;
}

update();

//--------------------------------------------------------

let tempTouchedValue1, tempTouchedValue2, tempTouchedCol, tempTouchedRow;
let draggingButton = null;

gameField.addEventListener("touchstart", (e) => {
  if (e.target.classList.contains(btnClass)) {
    draggingButton = e.target;
    const dataCol = draggingButton.dataset.col;
    const dataRow = draggingButton.dataset.row;
    e.target.style.borderColor = "red";

    tempTouchedValue1 = parseInt(arrayMain[dataCol][dataRow].value);
    tempTouchedCol = parseInt(dataCol);
    tempTouchedRow = parseInt(dataRow);

    draggingButton.classList.add("selected");
  }
});

gameField.addEventListener("touchend", (e) => {
  e.target.style.borderColor = "";
  if (draggingButton) {
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    const targetElement = document.elementFromPoint(x, y);
    const dataCol = parseInt(targetElement.dataset.col);
    const dataRow = parseInt(targetElement.dataset.row);

    if (Object.keys(e.target.dataset).length > 0) {
      console.log("Ok");
    }

    const move = checkMove(tempTouchedCol, tempTouchedRow, dataCol, dataRow);

    if (move) {
      tempTouchedValue2 = parseInt(arrayMain[dataCol][dataRow].value);

      arrayMain[dataCol][dataRow].value = tempTouchedValue1;
      targetElement.textContent = tempTouchedValue1;
      targetElement.className = `btn-style btn${tempTouchedValue1}`;

      arrayMain[tempTouchedCol][tempTouchedRow].value = tempTouchedValue2;
      draggingButton.textContent = tempTouchedValue2;
      draggingButton.className = `btn-style btn${tempTouchedValue2}`;
    }

    draggingButton.classList.remove("selected");

    draggingButton.style.left = "";
    draggingButton.style.top = "";
    draggingButton = null;
  }
  checkMatch();
});

//--------------------------------------------------------

document.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
  },

  { passive: false }
);
