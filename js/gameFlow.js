console.log('gamelogic.js connected')

// Thank God 'piece', 'point', 'white', and 'black' are all five letters long...

///// Global Variables /////
// Any function should feel free to alter and read these without taking them as arguments

var board // object which holds the state of the game

var thisTurn // object with all kinds of functionality
var preview // copy of board used to test out moves
var thisMoves // array of possible move objects

var white // object for player one
var black // object for player two

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
	moveBuilder()

}


function moveBuilder() {
	thisMoves = thisTurn.possibleMoves()

	// no more resources, no more possible moves
	if (thisTurn.availableResources.length === 0 || thisMoves.length === 0) {
		
		// the player can't do anything, acknowledge that, next turn
		if (thisTurn.moves.length === 0) {
			console.log('Sorry, ' + thisTurn.player.name + ' there are no possible moves for you.')
			endTurn()
		
		// the player has exhausted all possible moves, provide commit option
		} else {

			// the player has not used all of their dice
			if (thisTurn.availableResources.length !== 0) {
				// display commit button
				console.log('No more possible moves. Feel free to undo and try other moves.')
				
				// while the commit button is clicked
					// remove the commit button
					endTurn()
				
			// the player has used all of their dice, provide commit option	
			} else {
				// display commit button
				console.log("You've used all of your dice!")
				
				// while the commit button is clicked
					// remove the commit button
					endTurn()
			}
		}

	// go ahead with making a new move
	} else {
		updateClickable(thisMoves, 1)

	}
}

// function for updating clickable things on the board
// takes an array of move objects
function updateClickable(arr, timesThrough) {
	var timesThrough = timesThrough
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
		$('#' + clickable.join(',#')).on('click', function(e) {
			// first time through
			if (timesThrough === 1) {
				// is this a piece or a point?
				switch (this.id.substring(0, 5)) {
					case 'point':
						// set thisMoves to only the moves with this point as a destination
						winnowMoves('point', this.id)
						// update clickable with the new array
						break
					case thisTurn.player.color:
						// set thisMoves to only the moves with this point as a destination
						winnowMoves('piece', this.id)
						// update clickable with the new array
						break
					default:
						console.log('!!! the function that is supposed to figure out\
									if things are pieces or points was just fed neither.')
				}
			updateClickable(thisMoves, 2)

			// second time through
			} else if (timesThrough === 2) {
				// is this a piece or a point?
				switch (this.id.substring(0, 5)) {
					case 'point':
						winnowMoves('point', this.id)
						break
					case thisTurn.player.color:
						winnowMoves('piece', this.id)
						break
					default:
						console.log('!!! the function that is supposed complete a move with\
									 either a piece or a point was just fed neither.')
				}
			endMove()
			}
			
		})	
	}
	console.log(thisMoves.length.toString() + " possible moves remain.")
}

// takes a type (point/piece) as a string and the particular value as a string
// used by updateClickable to narrow thisMoves down to only moves with that value
function winnowMoves(type, id) {
	var result = []
	// loop through thisMoves, cut away everything of the type which isn't the id
	switch(type) {
		case 'point':
			for (var move in thisMoves) {
				if (thisMoves[move].destination === id) result.push(thisMoves[move])
			}
			break
		case 'piece':
			for (var move in thisMoves) {
				if (thisMoves[move].piece.declare() === id) result.push(thisMoves[move]) 
			}
			break
	}
	thisMoves = result
}

// handles the transition into the next move
function endMove() {
	// make sure nothing is clickable
	updateClickable([], 3)
	// push this move to the turn
	thisTurn.moves.push(thisMoves[0])
	// preview the turn
	thisTurn.updatePreview()
	// visualize the preview board
	visualizeBoard(preview)
	// start a new move
	moveBuilder()
}


// handles the transition into the next player's turn
function endTurn() {
	// commit this player's moves
	thisTurn.commitToBoard()

	// roll the other player's dice
	getOtherPlayer(thisTurn.player).dice[0].roll()
	getOtherPlayer(thisTurn.player).dice[1].roll()

	// start a new turn with whoever is not this player
	turnBuilder(getOtherPlayer(thisTurn.player))
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

// given a roll, a player, and a starting position, returns the end position 
function projectMove(start, roll, player) {
	var result = 'point' + eval(start.slice(5) + player.operand + roll).toString()
	var blackFictionalPoints = ['point-1','point-2','point-3','point-4','point-5','point-6']
	var whiteFictionalPoints = ['point26','point27','point28','point29','point30','point31']
	// makes sure countOut is actually the board
	if (blackFictionalPoints.includes(result)) {
		result = 'point0'
	}
	if (whiteFictionalPoints.includes(result)) {
		result = 'point25'
	}
	return result
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
		} else if (point.toString() === 'point25') {
			top = {0: 20, 1: 28, 2: 36, 3: 44, 4: 52, 
					5: 60, 6: 68, 7: 76, 8: 84, 9: 92, 
					10: 100, 11: 108, 12: 116, 13: 124, 14: 132}
		} else if (point.toString() === 'point0') {
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


/*

* right now barred is hard-coded, and the move manages setting and
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


