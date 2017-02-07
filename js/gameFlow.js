console.log('gamelogic.js connected')

///// Global Variables /////
// Any function should feel free to alter and read these without taking them as arguments

var board
var preview

var thisTurn

var white
var black

///// Game Setup Functions /////

function newGame(whiteName, blackName) {
	white = new Player(whiteName, 'white')
	white.dice = [new Dice(), new Dice()]
	console.log(white.name + ' joined the game.')
	black = new Player(blackName, 'black')
	black.dice = [new Dice(), new Dice()]
	console.log(black.name + ' joined the game.')

	board = new BackgammonBoard()
	console.log('Board created.')
	var whitePieces = []
	for (var i = 1; i <= 15; i++) {
		whitePieces.push(new Piece(i, white))
	}
	var blackPieces = []
	for (var i = 1; i <= 15; i++) {
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
	console.log('--------------------------')
}

///// Gameplay Functions /////

// determines who goes first and what roll they use
function openingRoll() {
	white.dice[0].roll()
	console.log(white.name + ' rolled a ' + white.dice[0].declare())
	black.dice[0].roll()
	console.log(black.name + ' rolled a ' + black.dice[0].declare())
	if (white.dice[0].value === black.dice[0].value) {
		console.log('Tie on opening roll, rolling again...')
 		openingRoll()
 	} else if (white.dice[0].value > black.dice[0].value) {
 		white.dice[1].value = black.dice[0].value
		console.log(white.name + ' goes first.')
		console.log('--------------------------')
		turnBuilder(white)
	} else if (white.dice[0].value < black.dice[0].value) {
		black.dice[1].value = white.dice[0].value
		console.log(black.name + ' goes first.')
		console.log('--------------------------')
		turnBuilder(black)
	} else {
		console.log('!!! the openingRoll function is broken.')
	}
}

// creates a new turn object and builds moves for it
function turnBuilder(player) {
	thisTurn = new Turn(player) 
	thisTurn.updatePreview()
	console.log(player.name + ' may move ' + thisTurn.availableResources.join(', '))
	
	// no more resources, no more possible moves
	if (thisTurn.availableResources.length === 0 || thisTurn.possibleMoves().length === 0) {
		
		// the player can't do anything, acknowledge that, next turn
		if (thisTurn.moves.length === 0) {
			console.log('Sorry, ' + thisTurn.player.name + ' there are no possible moves for you.')
			// roll the other player's dice
			getOtherPlayer(thisTurn.player).dice[0].roll()
			getOtherPlayer(thisTurn.player).dice[1].roll()
			// start a new turn with whoever is not this player
			turnBuilder(getOtherPlayer(thisTurn.player))
		
		// the player has exhausted all possible moves, provide commit option
		} else {

			// the player has not used all of their dice
			if (thisTurn.availableResources.length !== 0) {
				// display commit button
				console.log('No more possible moves. Feel free to undo and try other moves.')
				
				// while the commit button is clicked
				// remove the commit button
				// roll the other player's dice
				getOtherPlayer(thisTurn.player).dice[0].roll()
				getOtherPlayer(thisTurn.player).dice[1].roll()
				// start a new turn with whoever is not this player
				turnBuilder(getOtherPlayer(thisTurn.player))
				
			// the player has used all of their dice, provide commit option	
			} else {
				// display commit button
				console.log("You've used all of your dice!")
				
				// while the commit button is clicked
				// remove the commit button
				// roll the other player's dice
				getOtherPlayer(thisTurn.player).dice[0].roll()
				getOtherPlayer(thisTurn.player).dice[1].roll()
				// start a new turn with whoever is not this player
				turnBuilder(getOtherPlayer(thisTurn.player))
			}
		}
	}

	moveBuilder(thisTurn)
}


function moveBuilder() {
	// get all possible moves
	// var move
	// make pieces and points clickable
	// if player clicks a piece or a point
	// calculate remaining moves
	// if a player clicks the same thing - clear and restart
	// if a player clicks the same kind of thing - if it's on the same point, and has possible moves
	//												special case where this will commit two moves
	// if a player clicks the same kind of thing - and no possible moves... this should never happen
	// if a player clicks a different kind of thing - push the move to the turn and update the board
	// pass it on to the turn builder
}

// function for updating clickable things on the board
// takes an array of move objects
function updateClickable(arr) {
	var clickable = []
	for (var i = 0; i < arr.length; i++) {
		if (clickable.indexOf(arr[i].piece.declare()) === -1) clickable.push(arr[i].piece.declare())
		if (clickable.indexOf(arr[i].destination) === -1) clickable.push(arr[i].destination)
	}
	// make sure there are no errant classes and listeners
	$('.piece, .point').off()	
	$('.piece, .point').removeClass('active')	
	// if clickable is empty, don't make anything active
	if (clickable.length > 0) {	
		// add classes and listeners
		$('#' + clickable.join(',#')).addClass('active')	
	}
}

///// Game End Functions /////

//reset the board
//	reset global variables
//  save the names
//  

///// Helper Functions /////

function runGame() {
	newGame('Nora', 'Gus')
	visualizeBoard(board)
	openingRoll()
}
runGame()


function whoseTurn() {
	if (white.turn) {
		return white
	} else if (black.turn) {
		return black
	} else {
		console.log("!!! whoseTurn returned null.")
		return null
	}
}

function visualizeBoard(brd) {
	for (var point in brd) {
		for (var i in brd[point]) {
			var $piece = $('#' + brd[point][i].declare())
			$piece.css('left', gridLookup(point, i, 'left'))
			$piece.css('top', gridLookup(point, i, 'top'))
		}
	}
	console.log('!!! updated the DOM with visualizeboard')
}

function DOMtoPiece(id) {
	for (var point in board) {
		for (var i in board[point]) {
			if (board[point][i].declare() === id) return board[point][i]
		}
	}
}

function DOMtoPosition(id, brd) {
	for (var point in brd) {
		for (var i in brd[point]) {
			if (brd[point][i].declare() === id) return point.toString()
		}
	}
}

// checks to see if a spot on the given board is occupied by the
// other player, and so cannot be moved to
function isOccupied(point, brd, thisPlayer) {
	if (brd[point].length > 1) {
		if (brd[point][0].player === thisPlayer) {
			return false
		} else {
			return true 
		}
	} else {
		return false
	}
}

//returns the player you don't pass to it
function getOtherPlayer(player) {
	if (player.color === "white") {
		return black
	} else {
		return white
	}
}

//returns an array of this player's pieces on the preview board
function getPieces(player) {
	var pieces = []
	for (var point in preview) {
		for (var i in preview[point]) {
			if (preview[point][i].player === player) pieces.push(preview[point][i])
		}
	}
	return pieces
}

function gridLookup(point, position, axis) {
	if (axis === 'left') {
		var left = {
			point1: 458, point24: 458, 
			point2: 421, point23: 421, 
			point3: 385, point22: 385, 
			point4: 347, point21: 347, 
			point5: 311, point20: 311, 
			point6: 273, point19: 273, 
			point7: 212, point18: 212, 
			point8: 175, point17: 175, 
			point9: 137, point16: 137, 
			point10: 100, point15: 100, 
			point11: 64, point14: 64, 
			point12: 26, point13: 26, 
			bar: 242,
			point0: 515, point25: 515
		}
		return left[point].toString() + 'px'
	} else if (axis === 'top') {
		var top
		if (point.toString() === 'bar') {
			top = {0: 228, 1: 211, 2: 188, 3: 171, 4: 154, 
					5: 154, 6: 154, 7: 154, 8: 154, 9: 154, 
					10: 154, 11: 154, 12: 154, 13: 154, 14: 154}
		} else if (point.toString() === 'point0') {
			top = {0: 20, 1: 28, 2: 36, 3: 44, 4: 52, 
					5: 60, 6: 68, 7: 76, 8: 84, 9: 92, 
					10: 100, 11: 108, 12: 116, 13: 124, 14: 132}
		} else if (point.toString() === 'point25') {
			top = {0: 270, 1: 278, 2: 286, 3: 294, 4: 302, 
					5: 310, 6: 318, 7: 326, 8: 334, 9: 342, 
					10: 350, 11: 358, 12: 366, 13: 374, 14: 382}
		} else if (parseInt(point.toString().slice(5)) <= 12){
			top = {0: 390, 1: 355, 2: 320, 3: 285, 4: 250, 
					5: 240, 6: 240, 7: 240, 8: 240, 9: 240, 
					10: 240, 11: 240, 12: 240, 13: 240, 14: 240}
		} else {
			top = {0: 20, 1: 55, 2: 90, 3: 125, 4: 160, 
					5: 30, 6: 30, 7: 30, 8: 30, 9: 30, 
					10: 30, 11: 30, 12: 30, 13: 30, 14: 30}
		}
		return top[position]
	} else {
		console.log('!!! passed ' + axis.toString() + ' to gridLookup')
	}
}





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

* right now barred is hard coded, and the move manages setting and
resetting it. It might be easier if that were a function, and each
player object could figure out if it was barred or not based on the 
preview board... that's where there's some drama regarding when you
update the preview board. Maybe I could have it return the objective
board... but then I'll have to check it against the preview board and
who wants that.

* a graphic should come up and tell you which direction you'll move at game start.
might not be neccesary when dashboard is working?


* When this gets more visually interesting, pieces in the move builder should be locked
to the pointer of the player, so when the final click happens they can just rest right
at whatever spot they were put at




* A "can I take that back" button - which simply alerts you with "no"


* A "stakes" feature, where at setup, I ask - what issue is this game going to settle?

"Who does the dishes."
"Who's the better beatboxer."
"Whether Livia really poisoned Augustus with figs."

That is displayed all throughout the game.

++ if I have the program read "who", and pop a name in there on game win
	or ask who's on what side of an issue - there could be two inputs
	if I see "whether", or "what", maybe I could direct the players to an
	interface that takes two inputs


* is math.random.floor really a fair random engine? Look into that, might be worth finding a better solution.

*/


