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

$whitePlayerName = $('#whiteHome')
$blackPlayerName = $('#blackHome')

$diceHolder = $('#dice')
$dice0 = $('#dice-0')
$dice1 = $('#dice-1')

$undoButton = $('#undo-button')
$commitButton = $('#commit-button')

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
		me.dice[1].value = gameData.blackOpener
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
		// make movable points clickable
		turnBuilder(me)
		// make the undo and commit buttons live
		$undoButton.off()
		$undoButton.addClass('active')
		$undoButton.on('click', function(e) {
			// if there are moves to undo, undo them
			if (thisTurn.moves.length > 0) {
				thisTurn.undo()
				moveBuilder()
			} else {
				alert('There are no moves to undo, and I think you knew that, so what the hell?')
			}
		})
		$commitButton.off()
		$commitButton.addClass('active')
		$commitButton.on('click', function(e) {
			// turn off all my event listeners
			$undoButton.off()
			$commitButton.off()
			// change the dice
			$dice0.attr('src', './assets/' + them.color + '_naked.png')
			$dice1.attr('src', './assets/' + them.color + '_naked.png')
			// commit the preview to the board
			thisTurn.commitToBoard()
			// firebasify the board object and set it to gameData.board
			gameData.turnData = firebasify(board)
			// set the controller token to 4
			gameData.controllerToken = 4
			// set the current turn to the other player
			gameData.currentTurn = them.color
			// commit the change
			databaseRef.set(gameData)
		})
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
		// create the preview board
		preview = jQuery.extend(true, {}, board)
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
		// create the preview board
		preview = jQuery.extend(true, {}, board)
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

///// PHASE 4 /////

function regularGameplay() {
	// if it's my turn
	if (gameData.currentTurn === myColor) {
		// if I have not rolled
		if (!gameData.currentRoll0) {
			//unpack data
			board = unfirebasify(gameData.turnData)
			// render the board
			renderBoard(board)
			// reset the dice
			$dice0.attr('src', './assets/' + gameData.currentTurn + '_naked.png')
			$dice1.attr('src', './assets/' + gameData.currentTurn + '_naked.png')
			// let me roll
			$diceHolder.off()
			$diceHolder.addClass('active')
			$diceHolder.on('click', function(e){
				$diceHolder.off()
				$diceHolder.removeClass('active')
				me.dice[0].roll()
				me.dice[1].roll()
				gameData.currentRoll0 = me.dice[0].value
				gameData.currentRoll1 = me.dice[1].value
				// commit the changes
				databaseRef.set(gameData)
			})
		// if I have rolled
		} else {
			$dice0.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.currentRoll0 + '.png')
			$dice1.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.currentRoll1 + '.png')
			// make my pieces clickable
			// make movable points clickable
			turnBuilder(me)
			// make the undo and commit buttons live
			$undoButton.off()
			$undoButton.addClass('active')
			$undoButton.on('click', function(e) {
				// if there are moves to undo, undo them
				if (thisTurn.moves.length > 0) {
					thisTurn.undo()
					moveBuilder()
				} else {
					alert('There are no moves to undo, and I think you knew that, so what the hell?')
				}
			})
			$commitButton.off()
			$commitButton.addClass('active')
			$commitButton.on('click', function(e) {
				// turn off all my event listeners
				$undoButton.off()
				$commitButton.off()
				// change the dice
				$dice0.attr('src', './assets/' + them.color + '_naked.png')
				$dice1.attr('src', './assets/' + them.color + '_naked.png')
				// commit the preview to the board
				thisTurn.commitToBoard()
				// firebasify the board object and set it to gameData.board
				gameData.turnData = firebasify(board)
				// clear out the current roll
				gameData.currentRoll0 = null
				gameData.currentRoll1 = null
				// set the current turn to the other player
				gameData.currentTurn = them.color
				// commit the changes
				databaseRef.set(gameData)
			})
		}
	// if it's not my turn, but I am a player
	} else if (!!myColor) { 
		// render the current player's dice, if it's possible
		if (!!gameData.currentRoll0) {
			$dice0.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.currentRoll0 + '.png')
			$dice1.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.currentRoll1 + '.png')
		}
	// if I'm not a player
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
		// create the preview board
		preview = jQuery.extend(true, {}, board)
		// read the latest game data
		board = unfirebasify(gameData.turnData)
		// render the board
		renderBoard(board)
		// render the current player's dice, if it's possible
		// render player names
		$whitePlayerName.text(gameData.whiteName)
		$blackPlayerName.text(gameData.blackName)
		if (!!gameData.currentRoll0) {
			$dice0.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.currentRoll0 + '.png')
			$dice1.attr('src', './assets/' + gameData.currentTurn + '_' + gameData.currentRoll1 + '.png')
		}
	}
}

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
	// end the game from here if someone has won
	if (thisTurn.player.hasWon) {
		gameData.winner = thisTurn.player.color
		gameData.turnBuilder = firebasify(board)
		gameData.whitePiecesHome = board.point25.length
		gameData.blackPiecesHome = board.point0.length
		gameDada.barAtEnd = board.bar.length
		gameData.controllerToken = 5
		databaseRef.set(gameData)
	}
	// set up for next move, given the the previous moves
	thisMoves = thisTurn.possibleMoves()

	// no more resources, no more possible moves
	if (thisMoves.length === 0) {
		
		// the player hasn't been able to do anything this turn, acknowledge that
		if (thisTurn.moves.length === 0) {
			alert('Sorry, ' + thisTurn.player.name + ' there are no possible moves for you.')
		} else {

			// the player has not used all of their dice
			if (thisTurn.availableResources.length !== 0) {
				alert('No more possible moves. Feel free to undo and try other moves.')
			} else {
				console.log("You've used all of your dice!")
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
	// call moveBuilder to see if we start a new move
	moveBuilder()
}

///// Helper Functions /////

function firebasify(brd) {
	// for every point in the board, get an array of piece declarations
	var result = {
			bar: [], point0: [], point25: [],
			point1: [], point2: [], point3: [], point4: [], point5: [], point6: [],
			point7: [], point8: [], point9: [], point10: [], point11: [], point12: [],
			point13: [], point14: [], point15: [], point16: [], point17: [], point18: [],
			point19: [], point20: [], point21: [], point22: [], point23: [], point24: []
	}
	for (var point in board) {
		for (var i in board[point]) {
			result[point].push(board[point][i].declare())
		}
	}
	return result
}

function unfirebasify(data) {
	// create firebase preview
	var firebasePreview = {
			bar: [], point0: [], point25: [],
			point1: [], point2: [], point3: [], point4: [], point5: [], point6: [],
			point7: [], point8: [], point9: [], point10: [], point11: [], point12: [],
			point13: [], point14: [], point15: [], point16: [], point17: [], point18: [],
			point19: [], point20: [], point21: [], point22: [], point23: [], point24: []
	}
	// loop through and get strings in the right places
	for (var point in data) {
		for (var i in data[point]) {
			firebasePreview[point].push(data[point][i])
		}
	}
	// turn the strings into piece objects
	for (var point in firebasePreview) {
		for (var i in firebasePreview[point]) {
			firebasePreview[point][i] = DOMtoPiece(firebasePreview[point][i])
		}
	}
	me.updateState()
	them.updateState()
	return firebasePreview
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
	// if this gets passed overshoot, just return false - overshoots are handled by projectMove
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
				top = {0: 368.39, 1: 340.51, 2: 396.27, 3: 424.14}
			}
		} else if (point.toString() === 'point25') {
			top = {0: 17.19, 1: 37.78, 2: 58.37, 3: 78.96, 4: 99.55, 
					5: 120.14, 6: 140.73, 7: 161.32, 8: 181.91, 9: 202.5, 
					10: 223.09, 11: 243.68, 12: 264.27, 13: 284.86, 14: 305.45}
		} else if (point.toString() === 'point0') {
			top = {0: 784.43, 1: 763.84, 2: 743.25, 3: 722.66, 4: 702.07, 
					5: 681.48, 6: 660.89, 7: 640.3, 8: 619.71, 9: 599.12, 
					10: 578.53, 11: 557.94, 12: 537.35, 13: 516.76, 14: 496.17}
		} else if (parseInt(point.toString().slice(5)) <= 12){
			if (parseInt(position) >= 5) {
				return 481.45 
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


