console.log('objects.js connected')

///// Object Constructors /////

var Player = function(name, color) {
	this.name = name
	this.color = color
	// operator used to advance up/down the board
	this.operand = this.color === 'white' ? '+' : '-'
	// point used as the bar - opposite of home
	this.barCountOut = this.color === 'white' ? 'point0' : 'point25'
	this.turn = false
	// all in home quadrant
	this.homeStretch = false
	// has pieces on the bar
	this.barred = false
	this.dice = [] 
}

var Dice = function(){
	this.value = NaN
	this.roll = function () {
		this.value = Math.floor(Math.random() * 6) + 1
	}
	this.declare = function() {
		// returns a description of the dice's value as a string
		return this.value.toString()
	}
}

var Piece = function(id, player) {
	this.id = id
	this.player = player
	this.declare = function() {
		// returns a description of the piece's attributes as a string
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
	this.doubles = (player.dice[0].value === player.dice[1].value) ? true : false
	this.availableResources = this.doubles ?
					 [player.dice[0].value, player.dice[0].value, player.dice[0].value, player.dice[0].value] :
					 [player.dice[0].value, player.dice[1].value]
	this.expendedResources = []
	this.moves = []
	this.undo = function() {
		// pop the last move
		// because a move can become retroactively illegal if an earlier move is 
		// undone, undos must happen in order
		var msg = this.moves.length === 0 ? "No moves left to undo" : "Removed the most recent move."
		this.moves.splice(-1).restorePlayer
		console.log(msg)
	}
	this.preview = function() {
		// makes a copy of the global board object in its current state
		// then applies moves and saves it to the preview variable
		preview = jQuery.extend(true, {}, board)
		if (this.moves.length) {
			for (var item in this.moves) {
				// catalogues the resource used by all the moves
				this.expendedResources.push(this.availableResources.splice(this.availableResources.indexOf(moves[item].dieUsed), 1))
				// splices the given piece from a location, pushes it to the destination
				var loc = preview[this.moves[item].location] // ex: preview[point24]
				var locIndex = loc.indexOf(this.moves[item].piece) // ex: 0 --> preview[point24][0]
				var dest = preview[this.moves[item].destination] // ex: preview[point22]
				dest.push(loc.splice(locIndex, 1)[0])
			}
			console.log('Updated preview with ' + this.moves.length.toString() + ' move(s).')	
		} else {
			console.log('Preview is identical to the board.')	
		}
	}
	this.possibleMoves = function() {
		var possible = []
		// check if the player has pieces on the bar
		if (this.player.barred) {
			// move player's possible bar pieces into possible
			for (var i = 0; i < preview.bar.length; i++) {
				if (preview.bar[i].player.color === this.player.color ) {
					for (var j = 0; j < this.availableResources.length; j++) {
						var countOut = 'point' + eval(this.player.barCountOut.slice(5) + 
											this.player.operand + 
											this.availableResources[j]).toString()
						if (!isOccupied(countOut, preview, this.player)) possible.push(new Move(preview.bar[i], countOut))			
					}
				}
			}
		// check if player is in the home stretch
		} else if (this.player.homeStretch) {
			// deal with that bullshit here.
		} else {
		
		}
		return possible
	}
	this.commit = function() {
		// sets "objective" board to whatever the preview board is
		this.preview()
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
	this.updatePlayer = function(val, bool) {
		this.piece.player[val]= bool
	}
	this.restoreToken = [this.piece.player.barred, this.piece.player.homeStretch] // [true,false]
	this.restorePlayer = function() {
		this.piece.player.barred = this.restoreToken[0]
		this.piece.player.homeStretch = this.restoreToken[1]
	}
}







