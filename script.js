const gameField = document.getElementById('game-field');
const scoreField = document.getElementById('score-field');

let field = [];
let rows = 10;
let cols = 6;
let score = 0;
let count = 0;
let firstTile, secondTile;

let gameFieldWidth = 54 * cols;
gameField.style.width = gameFieldWidth + 'px';

window.onload = function () {
	startGame();

	window.setInterval( function () {
		checkMatch();
		slideTiles();
		generateTiles();
	}, 200);

}

function randomTile() {
	return Math.floor((Math.random() * 6) + 1);
}

function startGame() {
	for (let i = 0; i < rows; i++) {
		let row = [];
		for (let j = 0; j < cols; j++) {
			let tile = document.createElement("div");
			tile.id = i.toString() + "_" + j.toString();
			tile.classList.add(`tile${randomTile()}`);
			tile.addEventListener('mousedown', handleMouseDown);
			gameField.append(tile);
			row.push(tile);
		}
		field.push(row);
	}
}

function handleMouseDown() {
    if (count == 0) {
		firstTile = this;
		count++;
		firstTile.classList.add('selected');
	} else {
		secondTile = this;
		count--;
		firstTile.classList.remove('selected');

		checkMove();
	}
}
    
function checkMove() {
	if (firstTile.className.includes("tile0") || secondTile.className.includes("tile0")) {
			return;
		}

	let firstCoords = firstTile.id.split("_");
	let row1 = parseInt(firstCoords[0]);
	let col1 = parseInt(firstCoords[1]);
	let secondCoords = secondTile.id.split("_");
	let row2 = parseInt(secondCoords[0]);
	let col2 = parseInt(secondCoords[1]);

	let moveLeft = col2 == col1 - 1 && row1 == row2;
	let moveRight = col2 == col1 + 1 && row1 == row2;
	let moveUp = col1 == col2 && row2 == row1 - 1;
	let moveDown = col1 == col2 && row2 == row1 + 1;

	let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

	if (isAdjacent) {
		let tempFirstTile = firstTile.className;
		let tempSecondTile = secondTile.className;
		firstTile.className = tempSecondTile;
		secondTile.className = tempFirstTile;

		let validMove = isMovable();
		console.log(validMove);
		if (!validMove) {
			let tempFirstTile = firstTile.className;
			let tempSecondTile = secondTile.className;
			firstTile.className = tempSecondTile;
			secondTile.className = tempFirstTile;
		}
	}
}
    
function checkMatch() {
	matchFive();
	matchFour();
	matchThree();
	scoreField.innerHTML = score;
}

function matchThree () {

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols - 2; j++) {
			let tempTile1 = field[i][j];
			let tempTile2 = field[i][j + 1];
			let tempTile3 = field[i][j + 2];
			if (
				tempTile1.className == tempTile2.className &&
				tempTile2.className == tempTile3.className &&
				!tempTile1.className.includes("tile0")
				) {
				tempTile1.className = "tile0";
				tempTile2.className = "tile0";
				tempTile3.className = "tile0";
				score += 3;
			}
		}
	}
	for (let j = 0; j < cols; j++) {
		for (let i = 0; i < rows - 2; i++) {
			let tempTile1 = field[i][j];
			let tempTile2 = field[i + 1][j];
			let tempTile3 = field[i + 2][j];
			if (
				tempTile1.className == tempTile2.className &&
				tempTile2.className == tempTile3.className &&
				!tempTile1.className.includes("tile0")
				) {
				tempTile1.className = "tile0";
				tempTile2.className = "tile0";
				tempTile3.className = "tile0";
				score += 3;
			}
		}
	}
}

function matchFour () {

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols - 3; j++) {
			let tempTile1 = field[i][j];
			let tempTile2 = field[i][j + 1];
			let tempTile3 = field[i][j + 2];
			let tempTile4 = field[i][j + 3];
			if (
				tempTile1.className == tempTile2.className &&
				tempTile2.className == tempTile3.className &&
				tempTile3.className == tempTile4.className &&
				!tempTile1.className.includes("tile0")
				) {
				tempTile1.className = "tile0";
				tempTile2.className = "tile0";
				tempTile3.className = "tile0";
				tempTile4.className = "tile0";
				score += 4;
			}
		}
	}
	for (let j = 0; j < cols; j++) {
		for (let i = 0; i < rows - 3; i++) {
			let tempTile1 = field[i][j];
			let tempTile2 = field[i + 1][j];
			let tempTile3 = field[i + 2][j];
			let tempTile4 = field[i + 3][j];
			if (
				tempTile1.className == tempTile2.className &&
				tempTile2.className == tempTile3.className &&
				tempTile3.className == tempTile4.className &&
				!tempTile1.className.includes("tile0")
				) {
				tempTile1.className = "tile0";
				tempTile2.className = "tile0";
				tempTile3.className = "tile0";
				tempTile4.className = "tile0";
				score += 4;
			}
		}
	}
}

function matchFive () {

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols - 4; j++) {
			let tempTile1 = field[i][j];
			let tempTile2 = field[i][j + 1];
			let tempTile3 = field[i][j + 2];
			let tempTile4 = field[i][j + 3];
			let tempTile5 = field[i][j + 4];
			if (
				tempTile1.className == tempTile2.className &&
				tempTile2.className == tempTile3.className &&
				tempTile3.className == tempTile4.className &&
				tempTile4.className == tempTile5.className &&
				!tempTile1.className.includes("tile0")
				) {
				tempTile1.className = "tile0";
				tempTile2.className = "tile0";
				tempTile3.className = "tile0";
				tempTile4.className = "tile0";
				tempTile5.className = "tile0";
				score += 5;
			}
		}
	}
	for (let j = 0; j < cols; j++) {
		for (let i = 0; i < rows - 44444; i++) {
			let tempTile1 = field[i][j];
			let tempTile2 = field[i + 1][j];
			let tempTile3 = field[i + 2][j];
			let tempTile4 = field[i + 3][j];
			let tempTile5 = field[i + 4][j];
			if (
				tempTile1.className == tempTile2.className &&
				tempTile2.className == tempTile3.className &&
				tempTile3.className == tempTile4.className &&
				tempTile4.className == tempTile5.className &&
				!tempTile1.className.includes("tile0")
				) {
				tempTile1.className = "tile0";
				tempTile2.className = "tile0";
				tempTile3.className = "tile0";
				tempTile4.className = "tile0";
				tempTile5.className = "tile0";
				score += 5;
			}
		}
	}
}

function isMovable() {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols - 2; j++) {
			let tempTile1 = field[i][j];
			let tempTile2 = field[i][j + 1];
			let tempTile3 = field[i][j + 2];
			if (
				tempTile1.className == tempTile2.className &&
				tempTile2.className == tempTile3.className &&
				!tempTile1.className.includes("tile0")
				) {
				return true;
			}
		}
	}
	for (let j = 0; j < cols; j++) {
		for (let i = 0; i < rows - 2; i++) {
			let tempTile1 = field[i][j];
			let tempTile2 = field[i + 1][j];
			let tempTile3 = field[i + 2][j];
			if (
				tempTile1.className == tempTile2.className &&
				tempTile2.className == tempTile3.className &&
				!tempTile1.className.includes("tile0")
				) {
				return true;
			}
		}
	}
	return false;
}

function slideTiles() {
    for (let i = 0; i < cols; i++) {
        let slideIndex = rows - 1;
        for (let j = rows - 1; j >= 0; j--) {
            if (!field[j][i].className.includes("tile0")) {
                field[slideIndex][i].className = field[j][i].className;
                if (slideIndex !== j) {
                    field[j][i].className = "tile0";
                }
                slideIndex--;
            }
        }
    }
}

function generateTiles() {
	for (let i = 0; i < cols; i++) {
		if (field[0][i].className.includes("tile0")) {
			field[0][i].className = `tile${randomTile()}`;
		}
	}
}