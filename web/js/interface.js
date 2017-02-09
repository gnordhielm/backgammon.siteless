
///// DOM Selectors /////
$welcomeSetUpModal = $('#welcome-setup')

$setUpDiv = $('#your-setup')
$setUpForm = $('#setup-form')
$nameInput = $('#name-input')
$submitNameButton = $('#submit-name')
$yourStatusImg = $('#your-status')

$opponentStatusImg = $('#opponent-status')
$opponentName = $('#opponent-name')


$welcomeInProgressModal = $('#welcome-in-progress')


$gameEndModal = $('#game-end')
$winnerNameSpan = $('#winner-name')
$loserNameSpan = $('#loser-name')
$pcsHomeSpan = $('#pcs-home')
$pcsBarSpan = $('#pcs-bar')

$playAgainButton = $('#play-again')
$leaveButton = $('#leave-game')

///// Read From the Database /////

// "white", "black"
// make sure you very explicitly think about what happens if someone shows up to your game
// while it's in progress. Happily, anyone who hasn't submitted a form doesn't have a myColor.
// Take advantage of that.
var myColor
var theirColor

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
		case 1:
			setUpGame()
			break
		case 2:
			// opening roll
			break
		case 3:
			// turn exchanges
			break
		case 4:
			// end of the game
			break
	}
}

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
			$yourStatusImg.prop('src', './assets/ready.png') 
		} else {
			// the player will commit their name to blackName
			$opponentName.text(gameData.whiteName)
			$opponentStatusImg.prop('src', './assets/ready.png') 
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
			$opponentStatusImg.prop('src', './assets/ready.png') 
		} else if (myColor === "black"){
			// remove the form, set to ready
			$setUpForm.remove()
			$setUpDiv.append('<p id="your-name" class="name">' + gameData.blackName + '</p>')
			$yourStatusImg.prop('src', './assets/ready.png') 

		// for spectators
		} else {
			// make sure no spectators can alter the database
			$setUpForm.off() 
			// render the whole damn thing
			$setUpForm.remove()
			$setUpDiv.append('<p id="your-name" class="name">' + gameData.whiteName + '</p>')
			$yourStatusImg.prop('src', './assets/ready.png') 
			$opponentName.text(gameData.blackName)
			$opponentStatusImg.prop('src', './assets/ready.png') 
		}
		// in several seconds, start the game
		function startGame() {
			console.log('and so the game begins!')
		}
		setTimeout(startGame, 2000)
	}
}




///// Alter the Database /////

// reset a set of explicitly declared values in the database
function resetDatabase() {
	gameData.whiteName = ""
	gameData.blackName = ""
	gameData.controllerToken = 1

	databaseRef.set(gameData)
}



