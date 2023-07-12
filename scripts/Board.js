"use strict";

class Board {
	constructor() {
		this.config = {
			rows: [8, 7, 6, 5, 4, 3, 2, 1],
			cols: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		}
	}

	run() {
		//Генерируем доску
		let gameBoard = this.generateBoard();

		document.body.innerHTML = gameBoard;

		//Помещаем на доску все фигуры, кроме пешек
		this.insertFiguresOnDesk();

		//Помещаем на доску пешки
		this.insertPawns();

		//Добавляем колонку с номерами строк
		this.insertRowsNumbers();

		//Добавляем строку с названиями колонок
		this.insertColsChars();
	}

	/**
	 * Метод вставляет внизу строку с указанием названий колонок
	 */
	insertColsChars() {
		let tr = document.createElement('tr');

		tr.innerHTML = "<td></td>"

		for (let i = 0; i < this.config.cols.length; i++) {
			tr.innerHTML += `<td>${this.config.cols[i].toUpperCase()}</td>`;
		}

		document.querySelector('tbody').insertAdjacentElement("beforeend", tr);
	}

	/**
	 * Метод вставляет слева колонку с указанием номеров строк
	 */
	insertRowsNumbers() {
		let trs = document.querySelectorAll('tr');

		for (let i = 0; i < trs.length; i++) {
			let td = document.createElement('td');

			td.innerText = this.config.rows[i];

			trs[i].insertAdjacentElement("afterbegin", td);
		}
	}

	/**
	 * Метод вставляет пешки на доску
	 */
	insertPawns() {
		let blackPawnsRow = document.querySelectorAll('[data-rowNum="7"]');
		let whitePawnsRow = document.querySelectorAll('[data-rowNum="2"]');

		for (let i = 0; i < blackPawnsRow.length; i++) {
			blackPawnsRow[i].innerHTML = this.getFigure("pawn", "blackFigure");
		}

		for (let i = 0; i < whitePawnsRow.length; i++) {
			whitePawnsRow[i].innerHTML = this.getFigure("pawn", "whiteFigure");
		}

	}

	/**
	 * Метод вставляет на игровое поле все фигуры, кроме пешек
	 */
	insertFiguresOnDesk() {
		for (let i = 0; i < positions.length; i++) {
			let cell = document.querySelector(`[data-rowNum="${positions[i].coordRow}"][data-colChar="${positions[i].coordCol}"]`);
			let figure = this.getFigure(positions[i].figure, positions[i].color + "Figure");
			cell.innerHTML = figure;
		}
	}

	/**
	 * Метод возвращает тег i в виде строки с подставлением названия фигуры и класса, управляющего цветом фигуры
	 * @param {string} name название фигуры
	 * @param {string} colorClass цвет фигуры
	 * @returns {string} html-разметка в виде строки
	 */
	getFigure(name, colorClass) {
		return `<i class="fas fa-chess-${name} ${colorClass}"></i>`;
	}

	/**
	 * Метод генерирует игровое поле
	 * @returns {string} html-разметка в виде строки
	 */
	generateBoard() {
		let gameBoard = "";

		//Цвет, с которого начинается линия на игровом поле
		let rowStartWithColor = "white";

		for (let i = 0; i < this.config.rows.length; i++) {
			let row = this.generateRow(rowStartWithColor, this.config.rows[i]);

			//Чтобы каждый раз строка начиналась с нового цвета
			if (rowStartWithColor === 'white') {
				rowStartWithColor = "black";
			} else {
				rowStartWithColor = "white";
			}

			gameBoard += row;
		}

		return `<table>${gameBoard}</table>`;
	}

	/**
	 * Метод генерирует тег tr
	 * @param {string} startWithColor цвет, с которого начнется строка на игровом поле
	 * @param {number} rowNum номер строки
	 * @returns {string} html-разметка в виде строки
	 */
	generateRow(startWithColor, rowNum) {
		let currentColorClass = startWithColor;
		let row = "";

		for (let i = 0; i < this.config.cols.length; i++) {
			let field = this.generateField(currentColorClass, rowNum, this.config.cols[i]);

			//Чтобы каждая клеточка была нового цвета
			if (currentColorClass === "white") {
				currentColorClass = "black";
			} else {
				currentColorClass = "white";
			}

			row += field;
		}

		return `<tr>${row}</tr>`;
	}

	/**
	 * Метод генерирует ячейку (тег td)
	 * @param {string} colorClass класс цвета ячейки
	 * @param {number} rowNum номер строки
	 * @param {string} colChar буква колонки
	 * @returns {string} html-разметка с заполненными атрибутами координат и классом цвета
	 */
	generateField(colorClass, rowNum, colChar) {
		return `<td class="${colorClass}" data-rowNum="${rowNum}" data-colChar="${colChar}"></td>`;
	}
}

let board = new Board();
board.run();