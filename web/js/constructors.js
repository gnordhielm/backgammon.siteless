console.log('constructors.js connected')

///// Object Constructors /////

var Player = function(name, color) {
	this.name = name
	this.color = color
	this.dice = [] 

	// operator used to advance up/down the board
	this.operator = this.color === 'white' ? '+' : '-'

	// point number of this player's home
	this.home = this.color === 'white' ? 'point25' : 'point0'

	// point used as the bar - opposite of home
	this.barCountOut = this.color === 'white' ? 'point0' : 'point25'

	// has pieces on the bar
	this.barred = false

	// all in home quadrant
	this.homeStretch = false

	// all pieces in home
	this.hasWon = false

	// updates homeStretch and barred based on the state of the board.
	this.updateState = function() {
		this.barred = isThere(this, 'bar') ? true : false
		this.homeStretch = areAllInHomeStretch(this)
		this.hasWon = areAllInHome(this)
	}
}

var Dice = function(){
	this.value = NaN

	// gives the die a new random value
	this.roll = function () {
		this.value = Math.floor(Math.random() * 6) + 1
	}

	// returns a description of the dice's value as a string
	this.declare = function() {
		return this.value.toString()
	}
}

var Piece = function(id, player) {
	this.id = id
	this.player = player

	// returns a description of the piece's attributes as a string
	// in the same format as the corresponding DOM node
	this.declare = function() {
		return this.player.color + this.id.toString()
	}
}

var BackgammonBoard = function() {		
	this.point1 = [], this.point2 = [], this.point3 = [], 
	this.point4 = [], this.point5 = [], this.point6 = [], 

	this.point7 = [], this.point8 = [], this.point9 = [],
	this.point10 = [],this.point11 = [],this.point12 = [],
		
	this.point13 = [],this.point14 = [],this.point15 = [],
	this.point16 = [],this.point17 = [],this.point18 = [],
		
	this.point19 = [],this.point20 = [],this.point21 = [],
	this.point22 = [],this.point23 = [],this.point24 = [],
		
	this.bar = [], this.point25 = [], this.point0 = []
}


var Turn = function(player) {
	this.player = player
	// uses the player's dice to see if they match, are 'doubles'
	this.doubles = (this.player.dice[0].value === this.player.dice[1].value) ? true : false
	
	// determines what dice the player can play with
	this.availableResources = this.doubles ?
					 [this.player.dice[0].value, this.player.dice[0].value, this.player.dice[0].value, this.player.dice[0].value] :
					 [this.player.dice[0].value, this.player.dice[1].value]					 
	this.expendedResources = []

	this.moves = []
	this.undo = function() {
		// pop the last move - because a move can become retroactively illegal 
		// if an earlier move is undone, undos must happen in order
		this.moves.pop()
		this.updatePreview()
		this.player.updateState()
	}
	this.updatePreview = function() {
		// makes a copy of the global board object in its current state
		// then applies moves and saves it to the preview variable
		preview = jQuery.extend(true, {}, board)
		// since you reset the board before each preview, also reset the resources
		this.expendedResources = []
		this.availableResources = this.doubles ?
				 [this.player.dice[0].value, this.player.dice[0].value, 
				 	this.player.dice[0].value, this.player.dice[0].value] :
				 [this.player.dice[0].value, this.player.dice[1].value]	
		if (this.moves.length) {
			for (var i = 0; i < this.moves.length; i++) {
				// catalogues the resources used by all the moves
				if (this.doubles) {
					this.expendedResources.push(this.availableResources.pop())
console.log(`preview moved ${this.moves[i].dieUsed} from available to expended.`)
				} else {
					this.expendedResources.push(this.availableResources.splice((this.availableResources.indexOf(this.moves[i].dieUsed)), 1)[0])
console.log(`preview moved ${this.moves[i].dieUsed} from available to expended.`)
				}
				// splices the given piece from a location, pushes it to the destination
				var loc = preview[this.moves[i].location] // ex: preview[point24] - returns an array of pieces
				var locIndex = loc.indexOf(this.moves[i].piece) // ex: 0 --> preview[point24][1]
				var dest = preview[this.moves[i].destination] // ex: preview[point22] - returns an array of pieces
				dest.push(loc.splice(locIndex, 1)[0])
				// if this is an eat move, also move the eaten piece to the bar
				if (this.moves[i].isEat) {
					var theirLoc = preview[this.moves[i].destination] // ex: preview[point24] - returns an array of pieces
					var theirLocIndex = theirLoc.indexOf(this.moves[i].piece) === 0 ? 1 : 0// ex: 0 --> preview[point24][1]
					preview['bar'].push(theirLoc.splice(theirLocIndex, 1)[0]) // push to the bar
				}
			}
			console.log('Updated preview with ' + this.moves.length.toString() + ' move(s).')
		} else {
			console.log('Preview is identical to the board.')	
		}
		renderBoard(preview)	
	}
	this.possibleMoves = function() {
		var possible = []

		// if there are no dice left, just return an empty array
		if (this.availableResources.length === 0) { return possible}

		// check if the player has pieces on the bar
		if (this.player.barred) {
			// move player's possible bar pieces into possible
			for (var i = 0; i < preview.bar.length; i++) {
				if (preview.bar[i].player === this.player ) {
					for (var j = 0; j < this.availableResources.length; j++) {
						var projection = projectMove(point, this.availableResources[j], this.player)
						if (!isOccupied(projection, preview, this.player)) possible.push(new Move(preview.bar[i], projection))			
					}
				}
			}

		// check if the player rolled doubles - if they are in home stretch, they can move into home
		} else if (this.doubles) {
			for (var point in preview) {
				for (var piece in preview[point]) {
					if (preview[point][piece].player === this.player) {
						var projection = projectMove(point, this.availableResources[0], this.player)		
						// if the projection returns overshoot, don't add this possible move
						if (projection === 'overshoot') {
							continue

						// otherwise, if the player is in the home stretch, make sure they can move home
						} else if (this.player.homeStretch && !isOccupied(projection, preview, this.player)) {
							possible.push(new Move(preview[point][piece], projection))

						// if they are not, mak sure they can't
						} else if (projection !== this.player.home && !isOccupied(projection, preview, this.player)) {
							possible.push(new Move(preview[point][piece], projection))
						}
					}
				}
			}

		// every other case - if they are in home stretch, they can move into home
		} else {
			for (var point in preview) {
				for (var piece in preview[point]) {
					if (preview[point][piece].player === this.player) {
						for (var dice in this.availableResources) {
							var projection = projectMove(point, this.availableResources[dice], this.player)		
							// if the projection returns overshoot, don't add this possible move
							if (projection === 'overshoot') {
								continue

							// otherwise, if the player is in the home stretch, make sure they can move home
							} else if (this.player.homeStretch && !isOccupied(projection, preview, this.player)) {
								possible.push(new Move(preview[point][piece], projection))

							// if they are not, mak sure they can't
							} else if (projection !== this.player.home && !isOccupied(projection, preview, this.player)) {
								possible.push(new Move(preview[point][piece], projection))
							}		
						}
					}
				}
			}	
		}
		return possible
	}
	this.commitToBoard = function() {
		// sets "objective" board to whatever the preview board is
		this.updatePreview()
		board = preview
		console.log('Committed ' + this.moves.length.toString() + ' move(s).')
	}
}

// keep an eye on this - dieUsed especially. Vetting should happen upstream. 
var Move = function(piece, destination) {
	this.piece = piece // white11
	this.location = DOMtoPosition(this.piece.declare(), preview)// 'point5'
	this.destination = destination // 'point0'
	this.dieUsed = this.location === 'bar' ? 
				   Math.abs(parseInt(this.piece.player.barCountOut.slice(5)) - parseInt(this.destination.slice(5))):
				   Math.abs(parseInt(this.location.slice(5)) - parseInt(this.destination.slice(5)))
 
	// any move which lands on another player's point is a move
	// is occupied will make sure there is never more than one piece there
	this.isEat = preview[this.destination].length === 1 ?
				 preview[this.destination][0].player !== this.piece.player :
				 false
	this.updatePlayers = function() {
		// did I capture another piece
		if (this.isEat) {
			them.barred = true
			them.homeStretch = false
		} 
		
		// did I win the game
		if (false) {
			this.piece.player.winsGame()
		}
		
		console.log("Updated players.")
	}
	this.restoreToken = [this.piece.player.barred, 
						 this.piece.player.homeStretch,
						 them.barred, 
						 them.homeStretch] // [true, false, false, false]
	this.restorePlayers = function() {
		this.piece.player.barred = this.restoreToken[0]
		this.piece.player.homeStretch = this.restoreToken[1]
		them.barred = this.restoreToken[2]
		them.homeStretch = this.restoreToken[3]
		console.log("Restored players.")
	}
}







