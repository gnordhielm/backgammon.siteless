console.log('main.js connected')

///// Object Constructors /////

function Player(name) {
	this.name = name
	this.turn = false
	this.dice = [] 
}

function Dice(){
	this.value = null
	this.roll = function () {
		this.value = Math.floor(Math.random() * 6) + 1
	}
}

function Piece(id, player) {
	this.id = id
	this.player = player
	this.declare = function() {
		return this.player.toString() + this.id.toString()
	}
}

function BackgammonBoard() {		
	this.point1 = [], 
	this.point2 = [], 
	this.point3 = [], 
	this.point4 = [], 
	this.point5 = [], 
	this.point6 = [], 

	this.point7 = [], 
	this.point8 = [], 
	this.point9 = [],
	this.point10 = [],
	this.point11 = [],
	this.point12 = [],
		
	this.point13 = [],
	this.point14 = [],
	this.point15 = [],
	this.point16 = [],
	this.point17 = [],
	this.point18 = [],
		
	this.point19 = [],
	this.point20 = [],
	this.point21 = [],
	this.point22 = [],
	this.point23 = [],
	this.point24 = [],
		
	this.bar = [], 
	this.whiteHome = [], 
	this.blackHome = []
}

function Turn(player) {
	this.player = player
	this.resources = []
	this.moves = []
	this.undo = function() {
		// pop the last move and visualize it
		console.log('undo')
	}
	this.commit = function() {
		// alter the objects to reflect the moves
		console.log('commit move')
	}
}

function Move(player) {
	this.player = player
	this.location = ''
	this.destination = ''
	this.resourcesUsed = []
}

///// Game Setup Functions, Global Variables /////

// NOTE: this code is written such that ANY function should be able to
// alter the board, players, turnBuilder, or winner without explicity taking any of
// them as a parameter. In cases where a function could, at one time or
// another, be applied to either player, "player" is specified as a parameter

// player one is assigned to white, player two to black (as in chess)
// the colors are used to refer back to the player once the piece is
// separated from that player's array

var board
var white
var black
var winner

function newGame(whiteName, blackName) {
	white = new Player(whiteName)
	white.dice = [new Dice(), new Dice()]
	console.log(white.name + ' joined the game.')
	black = new Player(blackName)
	black.dice = [new Dice(), new Dice()]
	console.log(black.name + ' joined the game.')

	board = new BackgammonBoard()
	console.log('Board created.')
	var whitePieces = []
	for (var i = 1; i <= 15; i++) {
		whitePieces.push(new Piece(i, white))
	}
	var blackPieces = []
	for (var i = 15; i >= 1; i--) {
		blackPieces.push(new Piece(i, black))
	}
	console.log('Created ' + blackPieces.length.toString() + ' black pieces and ' 
						   + whitePieces.length.toString() + ' white pieces.')
	board.point24 = blackPieces.splice(-2)
	board.point19 = whitePieces.splice(-5)
	board.point17 = whitePieces.splice(-3)
	board.point13 = blackPieces.splice(-5)
	board.point12 = whitePieces.splice(-5)
	board.point8 = blackPieces.splice(-3)
	board.point6 = blackPieces.splice(-5)
	board.point1 = whitePieces.splice(-2)
	console.log('Assigned pieces to their point arrays.')
}


///// Gameplay Functions /////

// function rollDice(player) {
// 	player.dice[0].roll()
// 	player.dice[1].roll()
// 	console.log(player.name + " rolled " + player.dice[0].value.toString() + " and " + player.dice[1].value.toString())
// }

// function openingRoll() {
// 	rollDice(playerOne)
// 	rollDice(playerTwo)
// 	if (addDice(playerOne) === addDice(playerTwo)) {
// 		console.log('Tie on opening roll.')
// 		openingRoll()
// 	} else if (addDice(playerOne) > addDice(playerTwo)) {
// 		playerOne.turn = true
// 		console.log(playerOne.name + ' wins opening roll.')
// 	} else if (addDice(playerOne) < addDice(playerTwo)) {
// 		playerTwo.turn = true
// 		console.log(playerTwo.name + ' wins opening roll.')
// 	}
// }

// I need the ability to take pieces out of this array - which means I might need to 
// make it a javascript object. Maybe I go through and apply a class to each point,
// then select that class in jquery and add the event listener - derive the js array
// from the actual board object, how 'bout?
// function activatePieces(player) {
// 	var $pieces = $('.' + player.color + '-piece')
// 	$pieces.addClass('active')
// 	$pieces.on('click', function(e){
// 		console.log('clicked ' + this.id)
// 	})
// 	console.log(player.name + "'s pieces are clickable.")
// }

// function activatePoints(player) {
// 	var $points = $('.point')
// 	$points.pop
// 	$points.addClass('active')
// 	$points.on('click', function(e){
// 		console.log('clicked point ' + this.id)
// 	})
// 	console.log(player.name + "'s points are clickable.")

// }

// function nextTurn() {
// 	player1.turn = !player1.turn
// 	player2.turn = !player2.turn
// }

// function fullTurn(player){
// 	console.log(player.name + "'s full turn.")
// }

///// Boolean Functions /////

// function hasDoubles(player) {
// 	if (player.dice[0].value === player.dice[1].value) {
// 		console.log(player.name + " has doubles.")
// 		return true
// 	} else {
// 		console.log(player.name + " does not have doubles.")
// 		return false
// 	}
// }

// function isWinner(player) {
// 	if (board[player.color].length === 15) {
// 		console.log(player.name + " wins the game!")
// 		return true
// 	} else {
// 		console.log(player.name + " has not won the game.")
// 		return false
// 	}
// }
// this is not the right approach. This is: player clicks on something, I take that in
// and tell player if it's okay or not. It should be, player clicks on something, if it's
// not legal, I don't take the information in.
// Which means I need to start with the activate pieces function. Do not activate pieces
// if they can't be moved
// do not activate points if they can't be moved to.

// function hasOnBar(player) {
// 	var onBar = []
// 	for (var i = 0; i < board.bar.length; i++) {
// 		if (board.bar[i].color === player.color) onBar.push(board.bar[i])
// 	}
// 	return onBar
// }

// function isOnBar(piece) {
// 	var result = false
// 	for (var i = 0; i < board.bar.length; i++) {
// 		if (board.bar[i].id === piece.id) result = true
// 	}
// 	return result
// }


// function isLegalMove(piece, place, player) {
// 	// if there is a same-color piece on the bar and this is not it
// 	if (!!hasOnBar(player).length && !isOnBar(piece)) {
// 		return false
// 	}
// 	// if the place is occupied by more than one of the other color
// 	// else true
// }



///// Game End Functions /////

//reset the board
//	reset global variables
//  save the names
//  

///////////////////////////////

///// Utility and Dev Functions /////
// will be deleted in final code
newGame('Gus', 'Nora')


// function visualizeBoard() {
// 	for (var point in board.points) {
// 		for (var i = 0; i < board.points[point].length; i++) {
// 			var color = board.points[point][i].color
// 			var id = board.points[point][i].id
// 			var pointLoc = point <= 12 ? "bottom" : "top"
// 			var pointPos = i + 1
// 			$('#' + color + id.toString()).addClass('point' + point.toString() + ' ' + pointLoc + pointPos.toString())
// 		}
// 	}
// }



// function addDice(player) {
//     return player.dice[0].value +  player.dice[1].value
// }

// function whoseTurn() {
// 	if (playerOne.turn) {
// 		console.log(playerOne.name + "'s turn.")
// 		return playerOne
// 	} else if (playerTwo.turn) {
// 		console.log(playerTwo.name + "'s turn.")
// 		return playerTwo
// 	} else {
// 		console.log("nobody's turn.")
// 		return null
// 	}
// }


// plyr = whoseTurn()
// at the beginning of any given turn 

// play turns
	// for a given piece, return legal moves
	// buld a move, submit it or cancel it
// trigger a win
	// a while loop which breaks when either player's home is not full
	// when it's full, a variable is assigned to the player's object,
	// an if statement in the turn function handles it from there


// roll dice - determine how many moves (4 if doubles, 2 otherwise)
// make a player's pieces clickable
// when they click a piece, move that into the turn builder's first spot
// if they click another piece on the same point, 
// also move that into the turn builder's second spot
// if they click the same piece again, or a piece on another point,
// move it out of the turn builder's spot

// if their turn builder puts all of their pieces in their home, they win right away

// if they click undo, empty turn builder
// if they click submit, commit the turn builder
// check if they win the game
// next turn!
// and on an on until the winner variable has some value


// possible moves

// ramifications of move (process move)

// For every point my dice can get me to

// >is empty
// 	move there
// >has one piece of another color
// 	eat it
// >has more than one piece of another color
// 	can't move there


/*

a graphic should come up and tell you which direction you'll move. 

I find myself translating js info into DOM info a lot - I definitely need
a single function which will speed that up. 

When this gets more visually interesting, pieces in the move builder should be locked
to the pointer of the player, so when the final click happens they can just rest right
at whatever spot they were put at



rules say that you determine first player by each rolling one dice, then the
winner plays the cumulative roll.


A "can I take that back" button - which simply alerts you with "no"


A "stakes" feature, where at setup, I ask - what issue is this game going to settle?

"Who does the dishes."
"Who's the better beatboxer."
"Whether Livia really poisoned Augustus with figs."

That is displayed all throughout the game.

++ if I have the program read "who", and pop a name in there on game win
	or ask who's on what side of an issue - there could be two inputs
	if I see "whether", or "what", maybe I could direct the players to an
	interface that takes two inputs


*/
