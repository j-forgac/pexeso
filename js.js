window.addEventListener("load", startGame);
let cardsArray = [];
let wholePexeso;
let divCards = [];
let rowCards;

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
			if(check(x,y,possibleNum)){
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

function check(x,y,possibleNum) {
	let checkAmount = 0;

		for (let a = 0; a <= cardsArray.length-1; a++) {
			for (let b = 0;b <= cardsArray[a].length-1; b++) {
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
	let x = parseInt(this.dataset.x);
	let y = parseInt(this.dataset.y);
	divCards[x][y].setAttribute("class", "img-" + cardsArray[x][y]);
}