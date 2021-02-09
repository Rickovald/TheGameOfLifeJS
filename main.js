/*
Для того, чтобы мы могли лучше познакомиться с вашим уровнем знаний, выполните задание на JavaScript.

Дана доска размером M × N клеток. Клетка может находиться в одном из двух состояний: 1 — живая, 0 — мёртвая. Каждая клетка взаимодействует с восемью соседями. Правила таковы:

Живая клетка, у которой меньше двух живых соседей, погибает.

Живая клетка, у которой два или три живых соседа, выживает.

Живая клетка, у которой больше трёх живых соседей, погибает.

Мёртвая клетка, у которой три живых соседа, возрождается.

Напишите программу, которая будет:
— случайным образом генерить стартовое состояние;
— уметь получать его из файла (способ выбирается через параметры запуска в консоли);
— каждую секунду выводить в консоль новое состояние доски.
*/

/* 
	Я реализовал прочтение файла с содержанием типа:
	1,3,0,5
	0,8,1,4
	1,3,0,0

	можно и по-другому, например в файле в котором написан массив, но я, пожалуй, сделаю этот вариант только если попросите ибо сейчас 3 часа ночи, а мне на пары в 8)))
*/
function createMatrix (){
	let matrixArr = [],
		rowsM = Math.floor(Math.random() * Math.floor(11)),
		columnsN = Math.floor(Math.random() * Math.floor(11));

	for (var i = 0; i < rowsM; i++) {
		var newRow = [];
		for(var j = 0; j < columnsN; j++){
			var randomNumber = Math.floor(Math.random() * 2);;
			newRow.push(randomNumber);
		}
		matrixArr.push(newRow);
	}
	beginLoop(matrixArr)
}

function getData(fileAdress){	
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4) {
			var lines = xmlhttp.responseText;
			intoArray(lines);
		}
	}
	xmlhttp.open("GET", fileAdress, true);
	xmlhttp.send();    
}

function intoArray (lines) {
	var matrixArr = lines.split("\r\n").map(function(x){return x.split(",").map(Number)});
	beginLoop(matrixArr)
}
console.log('Вызовите функцию toMakeOrToRead(x) чтоб определить создавать ли новую матрицу, 1 - создавать, 0 - не создавать ')
function toMakeOrToRead(thatIsTheQuestion){
	if (thatIsTheQuestion) {
		createMatrix()
	} else {
		getData("matrixTest.txt")
	}
}



var rewriteField = function(inputField) {
	let targetField = [];
	let nullRow = [];
	for (let i = 0; i < inputField[0].length; i++) {
		nullRow[i] = 0;
	};  
	targetField.push(nullRow);
	for (let i = 0; i < inputField.length; i++) {
		targetField.push(inputField[i]);
	};
	targetField.push(nullRow);
	
	let newField = [];
	for (let i = 1; i <= inputField.length; i++) {
		newField[i-1] = [];
		for (let j = 0; j < inputField[0].length; j++) {
			let aliveNeighbours = 0;
			if (targetField[i-1][j-1]) {aliveNeighbours++};
			if (targetField[i-1][j]) {aliveNeighbours++};
			if (targetField[i-1][j+1]) {aliveNeighbours++};
			if (targetField[i][j-1]) {aliveNeighbours++};
			if (targetField[i][j+1]) {aliveNeighbours++};
			if (targetField[i+1][j-1]) {aliveNeighbours++};
			if (targetField[i+1][j]) {aliveNeighbours++};
			if (targetField[i+1][j+1]) {aliveNeighbours++};
			
			if (targetField[i][j]) {
				if (aliveNeighbours === 2 || aliveNeighbours === 3) {
					newField[i-1][j] = 1;
			  	} else {
					  newField[i-1][j] = 0
				}
			} else {
				if (aliveNeighbours === 3) {
					newField[i-1][j] = 1;
				} else {
					newField[i-1][j] = 0
				}
			};      
		};
	};
	return newField
};
  
var beginLoop = function (startMatrix) {
	console.log("start array");
	console.log(startMatrix);
	let nextArr = startMatrix;
	let t = 1;
	setInterval(function() {
		nextArr = rewriteField(nextArr);
		console.log(t + ' change');
		console.log(nextArr);
		t++;
	},1000);
};

// для кнопки в html которая по клику будет вырубать все таймеры чтоб можно было снова поиграть :) 
function clearAllIntervals (){
	var max_id;

	max_id = setTimeout(function () {});
	while (max_id--) {
	    clearTimeout(max_id);
	}
}

// можно скачать версию с веб страничкой и файликом матрицы туть https://github.com/Rickovald/TheGameOfLifeJS