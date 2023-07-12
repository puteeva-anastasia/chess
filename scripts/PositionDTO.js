'use strict';

/**
 * Этот класс будет хранить в себе информацию о какой-то конкретной позиции
 */
class PositionDTO {
	/**
	 * @param {string} coordCol координаты по горизонтали
	 * @param {number} coordRow координаты по вертикали
	 * @param {string} figure название фигуры
	 * @param {string} color цвет фигуры
	 */
	constructor(coordCol, coordRow, figure, color) {
		this.coordCol = coordCol;
		this.coordRow = coordRow;
		this.figure = figure;
		this.color = color;
	}

}