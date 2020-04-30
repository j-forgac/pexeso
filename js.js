window.addEventListener("load", startGame);
let cardsArray = [];
let wholePexeso;
let divCards = [];
let rowCards;
let clickCounter = 0;

let last1CardY;
let last1CardX;
let last2CardY;
let last2CardX;
let last3CardY;
let last3CardX;

let attemptCounter = 0;

function startGame() {
	wholePexeso = document.getElementById("wholePexeso");
	renderCards();
}

function renderCards() {
	generateRandCards();

}

function generateRandCards() {
	let possibleNum;
	let y;
	for (let x = 0; x < 10; x++) {
		cardsArray[x] = [];
		y = 0;
		while (y < 10) {
			possibleNum = Math.floor(Math.random() * 50) + 1;
			if (check(x, y, possibleNum)) {
				cardsArray[x][y] = possibleNum;
				y++;
			}
		}
	}
	for (let x = 0; x < cardsArray.length; x++) {
		rowCards = document.createElement("div");
		rowCards.setAttribute("class", "rowCards");
		wholePexeso.appendChild(rowCards);
		divCards[x] = [];
		for (let y = 0; y < cardsArray[x].length; y++) {
			divCards[x][y] = document.createElement("div");
			divCards[x][y].setAttribute("class", "void");
			divCards[x][y].dataset.x = x.toString();
			divCards[x][y].dataset.y = y.toString();
			divCards[x][y].addEventListener("click", changeSide);
			rowCards.appendChild(divCards[x][y]);
		}
	}
}

function check(x, y, possibleNum) {
	let checkAmount = 0;

	for (let a = 0; a <= cardsArray.length - 1; a++) {
		for (let b = 0; b <= cardsArray[a].length - 1; b++) {
			let checkNum = cardsArray[a][b];
			if (possibleNum === checkNum) {
				checkAmount++;
				if (checkAmount === 2) {
					return false;
				}
			}
		}
	}
	return true;
}

function changeSide() {

	if (this.getAttribute("class") === "void") {
		attemptCounter++;
		console.log(attemptCounter);
		let x = parseInt(this.dataset.x);
		let y = parseInt(this.dataset.y);

		last3CardX = last2CardX;
		last3CardY = last2CardY;

		last2CardX = last1CardX;
		last2CardY = last1CardY;

		last1CardX = x;
		last1CardY = y;

		divCards[x][y].setAttribute("class", "img-" + cardsArray[x][y]);
		clickCounter++;


		let firstClass = divCards[last3CardX][last3CardY].getAttribute("class");
		let secondClass = divCards[last2CardX][last2CardY].getAttribute("class");
		if (firstClass === secondClass) {
			clickCounter = 1;
		} else if (clickCounter === 3) {
			clickCounter = 1;
			divCards[last2CardX][last2CardY].setAttribute("class", "void");
			divCards[last3CardX][last3CardY].setAttribute("class", "void");
		}
		for (let d = 0; d < 10; d++) {
			for (let e = 0; e < 10; e++) {
				let checkVoid = divCards[d][e].getAttribute("class");
				if (checkVoid === "void") {
					return;
				}
			}
		}
		window.location = "win.html";
		attemptCounter = attemptCounter/2;

		localStorage.setItem("score",attemptCounter);
	}
}