
///// Modals /////

// DOM Selectors
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

// Names

// When you submit your name, change out the form for a p tag
// change unready to ready


// $(document).ready(function() {
//     console.log("DOM loaded.")
// 	// Array which holds all firebase data
// 	var firebaseData = [] 
// 	// Connect to Firebase
// 	// Keep firebaseData updated
// 	databaseRef.on("value", function(snapshot) {
// 		console.log(snapshot.val())
// 		$opponentName.text(snapshot.val()) 
// 	})

// 	// Send info to firebase on form submit
//   	$setUpForm.submit(function(event){
// 	    var $form = $(this)
// 	    console.log("submit to Firebase")
// 	    // Disable the normal submit behaviors
// 	    // $submitNameButton.prop('disabled', true)
// 	    // Extract the name from the input, in order to send to Firebase
// 	    var nameToSend = $nameInput.val();
// 	    console.log(nameToSend);
// 	    // Format it like a JSON object
// 	    firebaseData.playerTwoName = nameToSend
// 	    // Send the new firebaseData to Firebase
// 		databaseRef.set(firebaseData);
// 	    console.log(firebaseData);

// 	    return false;
//   	})
// })

// Connect to the whole database with a "reference"
var databaseRef = firebase.database().ref().child('gameData')

databaseRef.on("value", dataChangeSuite)

function dataChangeSuite(snapshot) {
	// This is where firebase data will be stored
	// gameData is an object
	// 		blackName - str
	//		whiteName - str
	//		tester - str
	gameData = snapshot.val()

	// set opponent if opponent exists already
	if (gameData.whiteName) {
		$opponentName.text(gameData.whiteName)
		$opponentStatusImg.prop('src', './assets/ready.png') 	
	}

	// set you if the data is available
	if (gameData.blackName) {
		$setUpForm.remove()
		$setUpDiv.append('<p id="your-name" class="name">' + gameData.blackName + '</p>')
		$yourStatusImg.prop('src', './assets/ready.png') 	
	}

}

///// Alter the Database /////

$setUpForm.on('submit', function(event) {
    // Disable the button
    $submitNameButton.prop('disabled', true)
    // Update the gameData
    gameData.blackName = $nameInput.val()
    // Send the whole object back to the database
    databaseRef.set(gameData)
    console.log($nameInput.val())
    // Stop the page from reloading
    return false
	
})


// undo button
// commit button
// dice interface
// forfeit button


// end interface, play again or close up shop

