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

$playAgainButton = $('#play-again')
// go back to opening roll
$leaveButton = $('#leave-game')
// go back to signin


///// Read From the Database /////

// "white", "black"
// make sure you very explicitly think about what happens if someone shows up to your game
// while it's in progress. Happily, anyone who hasn't submitted a form doesn't have a myColor.
// Take advantage of that.
var myColor = null
var theirColor = null

var gameData
// This is where firebase data will be stored
//		controllerToken - int
// 		blackName - str
//		whiteName - str

// Connect to the whole database with a "reference"
var databaseRef = firebase.database().ref().child('gameData')

// Set an event listener to fire every time the data changes
databaseRef.on("value", dataChangeController)

function dataChangeController(snapshot) {
	// Update gameData
	gameData = snapshot.val()
	
	switch (gameData.controllerToken) {
		case 0:
			testing()
			break
		case 1:
			setUpGame()
			break
		case 2:
			openingRoll()
			break
		case 3:
			startGame()
			break
		case 4:
			// end of the game
			break
	}
}

///// PHASE 1 /////

function setUpGame() {
	// no players in the database
	if (gameData.whiteName === "" && gameData.blackName === "") {
		// the player will commit their name to whiteName
		$setUpForm.on('submit', function(event) {
			// I have joined the game, set my color
			myColor = "white"
			theirColor = "black"
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
				// I have joined the game, set my color
				myColor = "black"
				theirColor = "white"
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
		// in several seconds, move to the opening roll
		setTimeout(openingRoll, 2000)
		//switch to the opening roll modal
		setTimeout(function() {
			$welcomeSetUpModal.removeClass('active-modal')
			$openingRollModal.addClass('active-modal')
		}, 2000)
	}
}

///// PHASE 2 /////

function openingRoll() {
	// update the controller token
	if (gameData.controllerToken === 1) {
		gameData.controllerToken = 2
		// commit the change
		databaseRef.set(gameData)

		// make sure nothing else gets executed before the token is updated
	} else if (myColor === 'white') {
		// if neither has already delivered a result
		if (!gameData.whiteOpener && !gameData.blackOpener) {
			// display names
			$whiteDiceLabel.text(gameData.whiteName)
			$blackDiceLabel.text(gameData.blackName)
			// make my die active
			$openingWhiteDice.addClass('active')
			// when I click on it, roll it, delivering a result
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
		// if I have already delivered a result
		} else if (!!gameData.whiteOpener && !gameData.blackOpener){
			// I don't think anything happens in this case...
			
		// if they have already delivered a result
		} else if (!gameData.whiteOpener && !!gameData.blackOpener) {
			// display names
			$whiteDiceLabel.text(gameData.whiteName)
			$blackDiceLabel.text(gameData.blackName)
			// make my die active
			$openingWhiteDice.addClass('active')
			// when I click on it, roll it, delivering a result
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
					// commit the changes
					databaseRef.set(gameData)
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
				// move to the next controller phase
				setTimeout(function(){
					// hand over important information
					gameData.currentTurn = gameData.whiteOpener > gameData.blackOpener ? "white" : "black"
					gameData.controllerToken = 3
					// commit the changes
					databaseRef.set(gameData)
				}, 1000)
			}
		}

	} else if (myColor === 'black') {
		// if neither has already delivered a result
		if (!gameData.whiteOpener && !gameData.blackOpener) {
			// display names
			$whiteDiceLabel.text(gameData.whiteName)
			$blackDiceLabel.text(gameData.blackName)
			// make my die active
			$openingBlackDice.addClass('active')
			// when I click on it, roll it, delivering a result
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
		// if I have already delivered a result
		} else if (!gameData.whiteOpener && !!gameData.blackOpener){
			// I don't think anything happens in this case...
			
		// if they have already delivered a result
		} else if (!!gameData.whiteOpener && !gameData.blackOpener) {
			// display names
			$whiteDiceLabel.text(gameData.whiteName)
			$blackDiceLabel.text(gameData.blackName)
			// make my die active
			$openingBlackDice.addClass('active')
			// when I click on it, roll it, delivering a result
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

///// PHASE 3 is in gameplay.js /////

///// PHASE 4 /////




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
	gameData.controllerToken = 0
	gameData.currentTurn = ""

	// gameData.whiteName = "Nora"
	// gameData.blackName = "Gus"
	// gameData.controllerToken = 2

	gameData.whiteOpener = null
	gameData.blackOpener = null

	databaseRef.set(gameData)
}



