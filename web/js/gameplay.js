console.log('gameplay.js connected')

///// Global Variables /////

var board // object which holds the local state of the game
var preview // copy of board used to test out moves

var thisTurn // object which manages possible moves and enforcing rules
var thisMoves // array of possible move objects

var them // stores the object of the other player
var me // stores the object of my player

///// Gameplay DOM Selectors /////

$setUpWrapper = $('#setup')
$gameWrapper = $('#game')

$whitePlayerName = $('#white-dashboard-name')
$blackPlayerName = $('#black-dashboard-name')

$dice0 = $('#dice-0')
$dice1 = $('#dice-1')

// $undoButton = $
// $commitButton = $

///// PHASE 3 /////

function firstMove() {
	if ($openingRollModal.hasClass('active-modal')) {
		// alter the DOM
		$openingRollModal.removeClass('active-modal')
		$setUpWrapper.removeClass('active-wrapper')
		$gameWrapper.addClass('active-wrapper')
			}
	// if it's my turn
	if (gameData.currentTurn === myColor) {

		// create the player objects
		me = new Player(myName, myColor)
		them = new Player(theirName, theirColor)
		// create dice for the player objects
		them.dice = [new Dice(), new Dice()]
		me.dice = [new Dice(), new Dice()]
		// assign values to my dice
		me.dice[0].value = gameData.whiteOpener
		console.log(me.dice[0].value)
		me.dice[1].value = gameData.blackOpener
		console.log(me.dice[1].value)
		// create a new board
		newBoard(me, them)
		// render that board
		renderBoard(board)
		// render my dice
		$dice0.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.whiteOpener + '.png')
		$dice1.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.blackOpener + '.png')
		// render player names
		$whitePlayerName.text(gameData.whiteName)
		$blackPlayerName.text(gameData.blackName)
		// let me play:
		// make my pieces clickable
		turnBuilder(me)
		// make movable points clickable
		// make the undo and commit buttons live
		// render my moves
		// when I click 'commit'
			// firebaseify the board object
			// set the controller token to 4
			// set it to gameData.board
			// commit the change
			// we will not come through here again!

	// if it's not my turn, and I am a player
	} else if (!!myColor){
		// create the player objects
		me = new Player(myName, myColor)
		them = new Player(theirName, theirColor)
		// create dice for the player objects
		them.dice = [new Dice(), new Dice()]
		me.dice = [new Dice(), new Dice()]
		// create a new board
		newBoard(me, them)
		// render that board
		renderBoard(board)
		// render the current player's dice
		$dice0.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.whiteOpener + '.png')
		$dice1.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.blackOpener + '.png')
		// render player names
		$whitePlayerName.text(gameData.whiteName)
		$blackPlayerName.text(gameData.blackName)
		// when they commit, we will all leave this godforsaken function
	
	// if I am not a player 
	} else {
		// ensure old modals are gone
		$welcomeSetUpModal.removeClass('active-modal')
		$openingRollModal.removeClass('active-modal')
		$setUpWrapper.removeClass('active-wrapper')
		$gameWrapper.addClass('active-wrapper')
		// create the player objects
		me = new Player(gameData.whiteName, "white")
		them = new Player(gameData.blackName, "black")
		// create dice for the player objects
		me.dice = [new Dice(), new Dice()]
		them.dice = [new Dice(), new Dice()]
		// create a new board
		newBoard(me, them)
		// render that board
		renderBoard(board)
		// render the current player's dice
		$dice0.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.whiteOpener + '.png')
		$dice1.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.blackOpener + '.png')
		// render player names
		$whitePlayerName.text(gameData.whiteName)
		$blackPlayerName.text(gameData.blackName)

	}
}

	// set up the actual game interface
	// if there is a winner, move to the next phase

	// let somebody play a turn
	// let somebody pass that info back to the database
	// because this is all based on the board, and the board doesn't let you make illegal moves,
	// the only challenge here is going to be undoing the gameflow I put together.


///// Game Setup Functions /////

function newBoard(playerObj1, playerObj2) {
	board = new BackgammonBoard()
	if (playerObj1.color === "white") {
		var whitePieces = []
		for (var i = 1; i <= 15; i++) {
			whitePieces.push(new Piece(i, playerObj1))
		}
		var blackPieces = []
		for (var i = 1; i <= 15; i++) {
			blackPieces.push(new Piece(i, playerObj2))
		}
	} else {
		var whitePieces = []
		for (var i = 1; i <= 15; i++) {
			whitePieces.push(new Piece(i, playerObj2))
		}
		var blackPieces = []
		for (var i = 1; i <= 15; i++) {
			blackPieces.push(new Piece(i, playerObj1))
		}
	}
	board.point24 = blackPieces.splice(-2)
	board.point19 = whitePieces.splice(-5)
	board.point17 = whitePieces.splice(-3)
	board.point13 = blackPieces.splice(-5)
	board.point12 = whitePieces.splice(-5)
	board.point8 = blackPieces.splice(-3)
	board.point6 = blackPieces.splice(-5)
	board.point1 = whitePieces.splice(-2)
}

///// Gameplay Functions /////

// creates a new turn object and builds moves for it
function turnBuilder(player) {
	thisTurn = new Turn(player) 
	thisTurn.updatePreview()
	console.log(player.name + ' may move ' + thisTurn.availableResources.join(', '))
	moveBuilder()

}

function moveBuilder() {

	// reflect the last move in the state of the player
	thisTurn.player.updateState()
	// end game from here if someone has won
	if (thisTurn.player.hasWon) endGame(thisTurn.player)
	// set up for next move, given the the previous moves
	thisMoves = thisTurn.possibleMoves()

	// no more resources, no more possible moves
	if (thisMoves.length === 0) {
		
		// the player hasn't been able to do anything this turn, acknowledge that, next turn
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

			// in cases where, after the first winnow, only one move remains, play it.
			if (thisMoves.length === 1) endMove()

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
	renderBoard(preview)
	// start a new move
	moveBuilder()
}


// handles the transition into the next player's turn
function endTurn() {
	// commit my moves
	thisTurn.commitToBoard()

	// roll the other player's dice
	them.dice[0].roll()
	them.dice[1].roll()
}

///// Game End Functions /////

function endGame(winner) {

	// commit the most recent player's moves
	thisTurn.commitToBoard()

	// by the bar and the number of pieces in the other player's home
	// if it was a win, gammon, or backgammon
	alert(winner.name + " wins the whole damn game!")
}

//reset the board
//	reset global variables
//  save the names
//  

///// Helper Functions /////

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
	// if this gets passed overshoot, just return false
	if (point === 'overshoot') return false
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

// returns true if a player has a piece on the given point on the preview board
function isThere(player, point) {
		for (var i in preview[point]) {
			if (preview[point][i].player === player) return true
		}
	return false
}

// returns true if a player has all of their pieces in the home stretch
function areAllInHomeStretch(player) {
	if (player.barred) { return false }
	var points = [ 
	'bar',

	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 1).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 2).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 3).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 4).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 5).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 6).toString(),

	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 7).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 8).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 9).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 10).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 11).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 12).toString(),

	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 13).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 14).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 15).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 16).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 17).toString(),
	'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + 18).toString()
	]
	for (var i = 0; i < points.length; i++) {
		if (isThere(player, points[i])) return false
	}
	return true
}

// returns true if a player's pieces are all home
function areAllInHome(player) {
	if (player.barred) { return false }
	if (!player.homeStretch) { return false }
	if (preview[player.home].length === 15) { 
		return true 
	} else {
		return false
	}
}

// given a roll, a player, and a starting position, returns the end position 
function projectMove(start, roll, player) {
	var result
	var blackFictionalPoints = ['point-1','point-2','point-3','point-4','point-5','point-6']
	var whiteFictionalPoints = ['point26','point27','point28','point29','point30','point31']
	var overshoot
	// if the player is barred, project differently
	if (player.barred) {
		result = 'point' + eval(player.barCountOut.slice(5) + player.operator + ' ' + roll).toString()
	// if the player is in their home stretch, project differently
	} else if (player.homeStretch) {
		result = 'point' + eval(start.slice(5) + player.operator + roll).toString()
		// calculate 'overshoot' for the particular player
		if (blackFictionalPoints.indexOf(result) !== -1) overshoot = blackFictionalPoints.indexOf(result) + 1
		if (whiteFictionalPoints.indexOf(result) !== -1) overshoot = whiteFictionalPoints.indexOf(result) + 1
		
		// check if there is overshoot, if not don't mess with the result
		if (overshoot > 0) {
			// compare overshoot to the distance of the farthest occupied point
			// the order of this array is very important - needs to count outward
			var farthestArr = [
				'point' + eval(player.home.slice(5) + them.operator + ' ' + 1).toString(),
				'point' + eval(player.home.slice(5) + them.operator + ' ' + 2).toString(),
				'point' + eval(player.home.slice(5) + them.operator + ' ' + 3).toString(),
				'point' + eval(player.home.slice(5) + them.operator + ' ' + 4).toString(),
				'point' + eval(player.home.slice(5) + them.operator + ' ' + 5).toString(),
				'point' + eval(player.home.slice(5) + them.operator + ' ' + 6).toString()
			]
			var farthest
			for (var i = 0; i < farthestArr.length; i++) {
				if (isThere(player, farthestArr[i])) farthest = i + 1
			}
			// if the dice equals or is less than the farthest occupied point, return overshoot
			if (roll <= farthest) result = 'overshoot'
		}
	} else {
		result = 'point' + eval(start.slice(5) + player.operator + roll).toString()
		// makes sure countOut is actually the board, flattens it to home (which will not be allowed)
		if (blackFictionalPoints.includes(result)) {
			result = 'point0'
		} else if (whiteFictionalPoints.includes(result)) {
			result = 'point25'
		}
	}
	return result
}

// given a board object with valid pieces, arranges the DOM to visualize it
function renderBoard(brd) {
	for (var point in brd) {
		for (var i in brd[point]) {
			var $piece = $('#' + brd[point][i].declare())
			$piece.attr('x', gridLookup(point, i, 'x'))
			$piece.attr('y', gridLookup(point, i, 'y'))
		}
	}
}

// given a position, point, and axis - returns the proper spot on the board
// for this piece to be positioned
function gridLookup(point, position, axis) {
	if (axis === 'x') {
		var x = {
			point0: 1124.97, point25: 1124.97,
			point1: 1011.32, point24: 1011.32, 
			point2: 929.35, point23: 929.35, 
			point3: 847.38, point22: 847.38, 
			point4: 765.41, point21: 765.41, 
			point5: 683.44, point20: 683.44, 
			point6: 601.47, point19: 601.47, 
			point7: 420.1, point18: 420.1, 
			point8: 338.13, point17: 338.13, 
			point9: 256.16, point16: 256.16, 
			point10: 174.19, point15: 174.19, 
			point11: 92.22, point14: 92.22, 
			point12: 10.25, point13: 10.25, 
			bar: 504.61
		}
		return x[point]
	} else if (axis === 'y') {
		var top
		if (point.toString() === 'bar') {
			if (parseInt(position) >= 4) {
				return 452.02
			} else {
				top = {0: 340.51, 1: 368.39, 2: 396.27, 3: 424.14}
			}
		} else if (point.toString() === 'point0') {
			top = {0: 17.19, 1: 37.78, 2: 58.37, 3: 78.96, 4: 99.55, 
					5: 120.14, 6: 140.73, 7: 161.32, 8: 181.91, 9: 202.5, 
					10: 223.09, 11: 243.68, 12: 264.27, 13: 284.86, 14: 305.45}
		} else if (point.toString() === 'point25') {
			top = {0: 784.43, 1: 763.84, 2: 743.25, 3: 722.66, 4: 702.07, 
					5: 681.48, 6: 660.89, 7: 640.3, 8: 619.71, 9: 599.12, 
					10: 578.53, 11: 557.94, 12: 537.35, 13: 516.76, 14: 496.17}
		} else if (parseInt(point.toString().slice(5)) <= 12){
			if (parseInt(position) >= 5) {
				return 452.02
			} else {
				top = {0: 760.23, 1: 704.47, 2: 648.71, 3: 592.96, 4: 537.2}
			}
		} else {
			if (parseInt(position) >= 5) {
				return 310.84
			} else {
				top = {0: 32.06, 1: 87.82, 2: 143.57, 3: 199.33, 4: 255.08}
			}
		}
		return top[position]
	} else {
		console.log('!!! passed ' + axis.toString() + ' to gridLookup')
	}
}


