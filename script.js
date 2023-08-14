const gameField = document.getElementById('game-field');

let array1 = generateArray(6, 6, 1, 4);
displayArray(array1, gameField);

let array2 = [];

function generateArray(length1, length2, min, max) {
	let tempArray = [];
	
	for (let i = 0; i < length1; i++) {
		tempArray[i] = [];
		for (let j = 0; j < length2; j++) {
			const value = getRandomNumber(min, max);
			tempArray[i][j] = ({value});
		}
	}
	return tempArray;
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayArray(sourceArray, targetElement) {
	let gameFieldWidth = 54 * sourceArray[0].length;
	// console.log(gameFieldWidth);

	targetElement.innerHTML = '';
	targetElement.style.width = gameFieldWidth;

	let cellCol = '';
	let cellRow = '';
	let btnClass = 'btn-style';

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

let tempIndex = 0;
let count = 0;

function update() {
	const buttons = document.querySelectorAll("button");

	buttons.forEach((button, index) => {
		button.addEventListener('click', function() {

			// const array3 = copy2DArray(array1);
			const dataCol = button.getAttribute("data-col");
			const dataRow = button.getAttribute("data-row");

			// console.log('Array[' + dataCol + '][' + dataRow + '].value = ' + array1[dataCol][dataRow].value);

			if (count == 0) {
					
				tempIndex = parseInt(array1[dataCol][dataRow].value);
				count++;
			} else if (count == 1) {
				console.log(tempIndex);

				array1[dataCol][dataRow].value = tempIndex;
				button.textContent = tempIndex;
				button.classList.remove(`btn${tempIndex}`);
				button.classList.add(`btn${tempIndex}`);


				count = 0;
			}

		});
	}); 
}


function copy2DArray(sourceArray) {
    const copiedArray = [];

    for (let i = 0; i < sourceArray.length; i++) {
        copiedArray[i] = [...sourceArray[i]]; // Копіюємо рядок масиву
    }

    return copiedArray;
}



update();