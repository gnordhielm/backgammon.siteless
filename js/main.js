console.log('main.js connected')

///// Object Constructors /////

function Piece(id, color) {
	this.id = id
	this.color = color
}

function Dice(){
	this.value = null
	this.roll = function () {
		this.value = Math.floor(Math.random() * 6) + 1
	}
}

function Player(name, color) {
	this.name = name
	this.color = color
	this.turn = false
	this.pieces = []
	this.dice = [] 
}

// There's some question as to whether Players should have pieces, or
// Pieces should have players. The latter lends itself more to resembling
// the real game, but it's a little strange to attribute the pieces back
// to their players because they're the same color.

function BackgammonBoard() {
	this.points = {
		 point1: []
		 point2: []
		 point3: []
		 point4: []
		 point5: []
		 point6: []
		 point7: []
		 point8: []
		 point9: []
		point10: []
		point11: []
		point12: []
		point13: []
		point14: []
		point15: []
		point16: []
		point17: []
		point18: []
		point19: []
		point20: []
		point21: []
		point22: []
		point23: []
		point24: []
		point25: []
		point26: []
	}
}

///// Game Setup Functions, Global Variables /////

// NOTE: this code is written such that ANY function should be able to
// alter the board, players, or winner without explicity taking any of
// them as a parameter. In cases where a function could, at one time or
// another, be applied to either player, "player" is specified as a parameter

// player one is assigned to white, player two to black (as in chess)
// the colors are used to refer back to the player once the piece is
// separated from that player's array

var playerOne
var playerTwo
var board
var winner = null

function makePlayers(nameOne, nameTwo) {
	playerOne = new Player(nameOne, 'white')
	playerTwo = new Player(nameTwo, 'black')
	for (var i=1; i <= 15; i++) {
		playerOne.pieces.push(new Piece(i, 'white'))
		playerTwo.pieces.push(new Piece(i, 'black'))
	}
	playerOne.dice = [new Dice(), new Dice()]
	playerTwo.dice = [new Dice(), new Dice()]
}

function setUpBoard() {
	board = new BackgammonBoard()
	// move white pieces into place
	board.point1 = playerTwo.pieces.splice(-2)
	board.point12 = playerTwo.pieces.splice(-5)
	board.point17 = playerTwo.pieces.splice(-3)
	board.point19 = playerTwo.pieces.splice(-5)
	// move black pieces into place
	board.point24 = playerTwo.pieces.splice(-2)
	board.point13 = playerTwo.pieces.splice(-5)
	board.point8 = playerTwo.pieces.splice(-3)
	board.point6 = playerTwo.pieces.splice(-5)
}


