console.log('interface.js connected')
///// DOM Selectors /////

// Welcome Modal
$welcomeSetUpModal = $('#welcome-setup')
$setUpDiv = $('#your-setup')
$setUpForm = $('#setup-form')
$nameInput = $('#name-input')
$submitNameButton = $('#submit-name')
$yourStatusImg = $('#your-status')
$opponentStatusImg = $('#opponent-status')
$opponentName = $('#opponent-name')
$setUpMsg = $('#setup-msg')

// Opening Roll Modal
$openingRollModal = $('#opening-roll')
$openingRollMsg = $('#roll-msg')
$whiteDiceLabel = $('#white-dice-label')
$openingWhiteDice = $('#opening-white-dice')
$blackDiceLabel = $('#black-dice-label')
$openingBlackDice = $('#opening-black-dice')

$gameEndModal = $('#game-end')
$winnerNameSpan = $('#winner-name')
$loserNameSpan = $('#loser-name')
$pcsHomeSpan = $('#pcs-home')
$pcsBarSpan = $('#pcs-bar')

$buttonHolder = $('#button-holder')


///// Read From the Database /////

// "white", "black"
// make sure you very explicitly think about what happens if someone shows up to your game
// while it's in progress. Happily, anyone who hasn't submitted a form doesn't have a myColor.
// Take advantage of that.
var myColor
var myName

var theirColor
var theirName

var gameData
// This is where firebase data will be stored
//		controllerToken - int
// 		blackName - str
//		whiteName - str

// RULE - before you set an event listener to an object, you explicity clear it of event listeners

// Connect to the whole database with a "reference"
var databaseRef = firebase.database().ref().child('gameData')

// Set an event listener to fire every time the data changes
databaseRef.on("value", dataChangeController)

function dataChangeController(snapshot) {
	// Update gameData
	gameData = snapshot.val()
	
	switch (gameData.controllerToken) {
		case 0:
			// testing()
			break
		case 1:
			setUpGame()
			break
		case 2:
			openingRoll()
			break
		case 3:
			firstMove()
			break
		case 4:
			regularGameplay()
			break
		case 5:
			endGame()
			break
	}
}

///// PHASE 1 /////

function setUpGame() {
	// no players in the database
	if (gameData.whiteName === "" && gameData.blackName === "") {
		// the player will commit their name to whiteName
		$setUpForm.off()
		$setUpForm.on('submit', function(event) {
			// I have joined the game, set my color and name
			myColor = "white"
			theirColor = "black"
			myName = $nameInput.val()
		    // Disable the button
		    $submitNameButton.prop('disabled', true)
		    // Update the gameData
		    gameData.whiteName = $nameInput.val()
		    // Send the whole object back to the database
		    databaseRef.set(gameData)
		    // Stop the page from reloading
		    return false
		})
	// one player in the database
	} else if (gameData.blackName === "") {
		// update the DOM, depending on which player is coming through here
		if (myColor === "white") {
			$setUpForm.remove()
			$setUpDiv.append('<p id="your-name" class="name">' + gameData.whiteName + '</p>')
			$yourStatusImg.prop('src', './assets/ready_white.png') 
		} else {
			$yourStatusImg.prop('src', './assets/unready_black.png') 
			// the player will commit their name to blackName
			$opponentName.text(gameData.whiteName)
			$opponentStatusImg.prop('src', './assets/ready_white.png') 
			// take off the listener that commits to white name
			$setUpForm.off()
			// add the listener that commits to black name
			$setUpForm.on('submit', function(event) {
				// I have joined the game, set my color and name
				myColor = "black"
				theirColor = "white"
				myName = $nameInput.val()
			    // Disable the button
			    $submitNameButton.prop('disabled', true)
			    // Update the gameData
			    gameData.blackName = $nameInput.val()
			    // Send the whole object back to the database
			    databaseRef.set(gameData)
			    // Stop the page from reloading
			    return false
			})
		}
	// both players in the database
	} else {
		// if this is one of the players, just update their display in the appropriate way
		if (myColor === "white") {
			// set black to ready
			$opponentName.text(gameData.blackName)
			$opponentStatusImg.prop('src', './assets/ready_black.png') 
		} else if (myColor === "black"){
			// remove the form, set to ready
			$setUpForm.remove()
			$setUpDiv.append('<p id="your-name" class="name">' + gameData.blackName + '</p>')
			$yourStatusImg.prop('src', './assets/ready_black.png') 

		// for spectators
		} else {
			// make sure no spectators can alter the database
			$setUpForm.off() 
			// render the whole damn thing
			$setUpForm.remove()
			$setUpDiv.append('<p id="your-name" class="name">' + gameData.blackName + '</p>')
			$yourStatusImg.prop('src', './assets/ready_black.png') 
			$opponentName.text(gameData.whiteName)
			$opponentStatusImg.prop('src', './assets/ready_white.png') 
		}
		$setUpMsg.text('The game will begin shortly.')
		// in several seconds, move to the opening roll by updating the controller token
		setTimeout(function() {
			gameData.controllerToken = 2
			databaseRef.set(gameData)
		}, 1500)
	}
}

///// PHASE 2 /////

function openingRoll() {
	//switch to the opening roll modal
	if ($welcomeSetUpModal.hasClass('active-modal')) {
		$welcomeSetUpModal.removeClass('active-modal')
		$openingRollModal.addClass('active-modal')
	}

	if (myColor === 'white') {
		// set their name
		theirName = gameData.blackName
		// if neither has already delivered a result
		if (!gameData.whiteOpener && !gameData.blackOpener) {
			// display names
			$whiteDiceLabel.text(gameData.whiteName)
			$blackDiceLabel.text(gameData.blackName)
			// make my die active
			$openingWhiteDice.addClass('active')
			// when I click on it, roll it, delivering a result
			$openingWhiteDice.off()
			$openingWhiteDice.on('click', function(e) {
				//roll the dice, set the result appropriately
				$openingWhiteDice.off()
				var result = openingDiceAnimate('white')
				setTimeout(function() {
					var roll = Math.floor(Math.random() * 6) + 1
					gameData.whiteOpener = roll
					$openingWhiteDice.attr('src', './assets/white_' + roll.toString() + '.png')
					$openingWhiteDice.removeClass('active')
					//commit the result
					databaseRef.set(gameData)
				}, 500)
			})
		// if they have already delivered a result
		} else if (!gameData.whiteOpener && !!gameData.blackOpener) {
			// display names
			$whiteDiceLabel.text(gameData.whiteName)
			$blackDiceLabel.text(gameData.blackName)
			// make my die active
			$openingWhiteDice.addClass('active')
			// when I click on it, roll it, delivering a result
			$openingWhiteDice.off()
			$openingWhiteDice.on('click', function(e) {
				//roll the dice, set the result appropriately
				$openingWhiteDice.off()
				var result = openingDiceAnimate('white')
				setTimeout(function() {
					var roll = Math.floor(Math.random() * 6) + 1
					gameData.whiteOpener = roll
					$openingWhiteDice.attr('src', './assets/white_' + roll.toString() + '.png')
					$openingWhiteDice.removeClass('active')
					//commit the result
					databaseRef.set(gameData)
				}, 500)
			})
			// render their roll
			$openingBlackDice.attr('src', './assets/black_' + gameData.blackOpener.toString() + '.png')

		// if we both have already delivered a result
		} else if (!!gameData.whiteOpener && !!gameData.blackOpener) {
			// render their roll
			$openingBlackDice.attr('src', './assets/black_' + gameData.blackOpener.toString() + '.png')
			// if the results are equal, start the hell over
			if (gameData.whiteOpener === gameData.blackOpener) {
				// DOM stuff, everybody has to do this.
				$openingRollMsg.text("It's a tie, roll again.")
				setTimeout(function(){
					$openingWhiteDice.attr('src', './assets/white_naked.png')
					$openingBlackDice.attr('src', './assets/black_naked.png')
					// reset the dice
					gameData.whiteOpener = null
					gameData.blackOpener = null
					gameData.controllerToken = 2
					// commit the changes
					databaseRef.set(gameData)
				}, 500)
			} else if (gameData.whiteOpener > gameData.blackOpener) {
				 	// if white goes first
					$openingRollMsg.text(gameData.whiteName + " goes first!")
					$openingBlackDice.attr('src', './assets/white_' + gameData.blackOpener.toString() + '.png')
					// move to the next controller phase
					setTimeout(function(){
						// hand over important information
						gameData.currentTurn = "white"
						gameData.controllerToken = 3
						// commit the changes
						databaseRef.set(gameData)
					}, 1500)
			} else if(gameData.whiteOpener < gameData.blackOpener) {
				 	// if black goes first
					$openingRollMsg.text(gameData.blackName + " goes first!")
					$openingWhiteDice.attr('src', './assets/black_' + gameData.whiteOpener.toString() + '.png')
				// move to the next controller phase
				setTimeout(function(){
					// hand over important information
					gameData.currentTurn = "black"
					gameData.controllerToken = 3
					// commit the changes
					databaseRef.set(gameData)
				}, 1500)
			}
		}
	} else if (myColor === 'black') {
		// set their name
		theirName = gameData.whiteName
		// if neither has already delivered a result
		if (!gameData.whiteOpener && !gameData.blackOpener) {
			// display names
			$whiteDiceLabel.text(gameData.whiteName)
			$blackDiceLabel.text(gameData.blackName)
			// make my die active
			$openingBlackDice.addClass('active')
			// when I click on it, roll it, delivering a result
			$openingBlackDice.off()
			$openingBlackDice.on('click', function(e) {
				//roll the dice, set the result appropriately
				$openingBlackDice.off()
				var result = openingDiceAnimate('black')
				setTimeout(function() {
					var roll = Math.floor(Math.random() * 6) + 1
					gameData.blackOpener = roll
					$openingBlackDice.attr('src', './assets/black_' + roll.toString() + '.png')
					$openingBlackDice.removeClass('active')
					//commit the result
					databaseRef.set(gameData)
				}, 500)
			})
		// if they have already delivered a result
		} else if (!!gameData.whiteOpener && !gameData.blackOpener) {
			// display names
			$whiteDiceLabel.text(gameData.whiteName)
			$blackDiceLabel.text(gameData.blackName)
			// make my die active
			$openingBlackDice.addClass('active')
			// when I click on it, roll it, delivering a result
			$openingBlackDice.off()
			$openingBlackDice.on('click', function(e) {
				//roll the dice, set the result appropriately
				$openingBlackDice.off()
				var result = openingDiceAnimate('black')
				setTimeout(function() {
					var roll = Math.floor(Math.random() * 6) + 1
					gameData.blackOpener = roll
					$openingBlackDice.attr('src', './assets/black_' + roll.toString() + '.png')
					$openingBlackDice.removeClass('active')
					//commit the result
					databaseRef.set(gameData)
				}, 500)
			})
			// render their roll
			$openingWhiteDice.attr('src', './assets/white_' + gameData.whiteOpener.toString() + '.png')

		// if we both have already delivered a result
		} else if (!!gameData.whiteOpener && !!gameData.blackOpener) {
			// render their roll
			$openingWhiteDice.attr('src', './assets/white_' + gameData.whiteOpener.toString() + '.png')
			// if the results are equal, start the hell over
			if (gameData.whiteOpener === gameData.blackOpener) {
				// DOM stuff, everybody has to do this.
				$openingRollMsg.text("It's a tie, roll again.")
				setTimeout(function(){
					$openingWhiteDice.attr('src', './assets/white_naked.png')
					$openingBlackDice.attr('src', './assets/black_naked.png')
				}, 500)
			} else {			
				// compare the results
				// alter the DOM
				if (gameData.whiteOpener > gameData.blackOpener) {
				 	// if white goes first
					$openingRollMsg.text(gameData.whiteName + " goes first!")
					$openingBlackDice.attr('src', './assets/white_' + gameData.blackOpener.toString() + '.png')
				} else {
				 	// if black goes first
					$openingRollMsg.text(gameData.blackName + " goes first!")
					$openingWhiteDice.attr('src', './assets/black_' + gameData.whiteOpener.toString() + '.png')
				}
			}
		}

	} else {
		// for spectators, just render both rolls
		$whiteDiceLabel.text(gameData.whiteName)
		$blackDiceLabel.text(gameData.blackName)
		if (!!gameData.whiteOpener) {
			$openingWhiteDice.attr('src', './assets/white_' + gameData.whiteOpener.toString() + '.png')
		}
		if (!!gameData.blackOpener) {
			$openingBlackDice.attr('src', './assets/black_' + gameData.blackOpener.toString() + '.png')
		}
		if (!!gameData.whiteOpener && !! gameData.blackOpener){
			// if the results are equal, start the hell over
			if (gameData.whiteOpener === gameData.blackOpener) {
				// DOM stuff, everybody has to do this.
				$openingRollMsg.text("It's a tie, roll again.")
				setTimeout(function(){
					$openingWhiteDice.attr('src', './assets/white_naked.png')
					$openingBlackDice.attr('src', './assets/black_naked.png')
				}, 500)
			} else {			
				// compare the results
				// alter the DOM
				if (gameData.whiteOpener > gameData.blackOpener) {
				 	// if white goes first
					$openingRollMsg.text(gameData.whiteName + " goes first!")
					$openingBlackDice.attr('src', './assets/white_' + gameData.blackOpener.toString() + '.png')
				} else {
				 	// if black goes first
					$openingRollMsg.text(gameData.blackName + " goes first!")
					$openingWhiteDice.attr('src', './assets/black_' + gameData.whiteOpener.toString() + '.png')
				}
			}
		}
	}
}

///// PHASE 3 and 4 are in gameplay.js /////

///// PHASE 5 /////

function endGame() {
	if (gameData.currentTurn !== myColor) {
		//unpack data
		board = unfirebasify(gameData.turnData)
		// render the board
		renderBoard(board)
	}
	// bring up the win modal for everybody
	setTimeout(function(){
		$gameWrapper.removeClass('active-wrapper')
		
		$gameEndModal.addClass('active-modal')
		$setUpWrapper.addClass('active-wrapper')
		if (gameData.winner === 'white') {
			$winnerNameSpan.text(gameData.whiteName)
			$loserNameSpan.text(gameData.blackName)
			$pcsHomeSpan.text((15 - gameData.blackPiecesHome).toString())
			$pcsBarSpan.text(gameData.barAtEnd)

		} else {
			$winnerNameSpan.text(gameData.blackName)
			$loserNameSpan.text(gameData.whiteName)
			$pcsHomeSpan.text((15 - gameData.whitePiecesHome).toString())
			$pcsBarSpan.text(gameData.barAtEnd)
		}

	}, 1500)
	// If I was a player, I get the option to play again or not.
	if (!!myColor) {
		$buttonHolder.append('<button id="play-again">Again</button>')
		$buttonHolder.append('<button id="leave-game">Quit</button>')
		$('#play-again').off()
		$('#play-again').addClass('active')
		$('#play-again').on('click', function(e){
			$('#play-again').off()
			$('#play-again').removeClass('active')
			$gameEndModal.removeClass('active-modal')
			$welcomeSetUpModal.addClass('active-modal')
			gameData.controllerToken = 2
			gameData.currentTurn = null
			gameData.currentRoll0 = null
			gameData.currentRoll1 = null
			gameData.whiteOpener = null
			gameData.blackOpener = null
			gameData.turnData = null
			gameData.whitePiecesHome = null
			gameData.blackPiecesHome = null
			gameData.winner = null
			gameData.barAtEnd = null

			databaseRef.set(gameData)
		})
		$('#leave-game').off()
		$('#leave-game').addClass('active')
		$('#leave-game').on('click', function(e){
			$('#leave-game').off()
			$('#leave-game').removeClass('active')
			$gameEndModal.removeClass('active-modal')
			$welcomeSetUpModal.addClass('active-modal')
			gameData.whiteName = ""
			gameData.blackName = ""
			gameData.controllerToken = 1
			gameData.currentTurn = null
			gameData.currentRoll0 = null
			gameData.currentRoll1 = null
			gameData.whiteOpener = null
			gameData.blackOpener = null
			gameData.turnData = null
			gameData.whitePiecesHome = null
			gameData.blackPiecesHome = null
			gameData.winner = null
			gameData.barAtEnd = null
			databaseRef.set(gameData)
		})
	}
}


///// Helper Functions /////

function openingDiceAnimate(color) {
	var dice = color === 'white' ? $openingWhiteDice : $openingBlackDice
	dice.attr('src', './assets/'+ color + '_' + 
							(Math.floor(Math.random() * 6) + 1).toString() + '.png') 
	setTimeout(function() {
		dice.attr('src', './assets/'+ color + '_' + 
							(Math.floor(Math.random() * 6) + 1).toString() + '.png') 
	    setTimeout(function() {
			dice.attr('src', './assets/'+ color + '_' + 
							(Math.floor(Math.random() * 6) + 1).toString() + '.png')
			setTimeout(function() {
			dice.attr('src', './assets/'+ color + '_' + 
							(Math.floor(Math.random() * 6) + 1).toString() + '.png')
				setTimeout(function() {
			dice.attr('src', './assets/'+ color + '_' + 
							(Math.floor(Math.random() * 6) + 1).toString() + '.png')
	    		}, 100)
	    	}, 100)
	    }, 100)
	}, 100)
}

function testing() {
	console.log('testing')
}

// reset a set of explicitly declared values in the database
function resetDatabase() {
	gameData.whiteName = ""
	gameData.blackName = ""
	gameData.controllerToken = 1
	gameData.currentTurn = null
	gameData.currentRoll0 = null
	gameData.currentRoll1 = null
	gameData.whiteOpener = null
	gameData.blackOpener = null
	gameData.turnData = null
	gameData.whitePiecesHome = null
	gameData.blackPiecesHome = null
	gameData.barAtEnd = null
	gameData.winner = null

	databaseRef.set(gameData)
}



