/*
 * @author Ian Bryan
 * @version 13
 * Description:
 * * Recorded asteroid impacts compared by mass and year in an abstract visualization.
 * * [json data page](https://data.nasa.gov/resource/y77d-th95.json)
 * * Some asteroid mass data was not available so they are left out of this
 * * data visualization.
 * * Asteroids are represented by sphere's and scaled to 1/100 (metric ton / pixel) in order
 * * to have space for all valid representations visible on screen.
 * * NASA was also kind enough to have this data set already sorted by ID which I found very
 ** useful in managing the flow of objects drawn to screen.
 */

/* GLOBAL VARIABLES */
let asteroidImpactData; // Holds JSON Objects from data set.
// Holds key-value pairs of asteroids and ID's using object literals.
let asteroidComparables = {};
// Holds index of asteroid masses
let asteroidMasses = [];
// An array of indexes with values assigned to each 
// that are used in another array as identifiers of mass values.
let asteroids = [];
let asteroidYears = []; // 
// let asteroidCount = 0;
let asteroidObjects = [];

/*
 * Preload() uses p5.js libary function `loadJSON()` to initialize data set.
 * The second argument is a function that is called and handed an argument of 
 * the JSON object file.
 */
function preload() {
	// P5 function `loadJSON()` will return an object with index #'s as keys.
	// Adding second argument means the function will send the first object as an argument
	// to the function specified.
	asteroidImpactData = loadJSON("asteroids.json", breakdownJsonData);
}


function setup() {
	// Set background to no color.
	// Set windows dimensions according to browser.
	background(0);
	createCanvas(window.innerWidth, window.innerHeight, WEBGL);

	//
	populateAsteroidArray();

	// Will change the program to only call the `draw()` function once and then end.
	// This dramatically increases the speed of the program and may
	// be commented out for seeing the process happen in real time with
	// a significant decrease to performance. Not recommended to change.
	noLoop();
}


function draw() {

	let formattedYear = "";

	/*
	 * Simple loop to call the method which generates a sphere from the data
	 * held for each asteroid object.
	 */
	console.log("*************START*************");
	for (var a = asteroids.length; a > 0; a--) {
		let x = noise(millis() * 500) * (width/2);
		
		if (asteroidObjects[a] != null) {
			
			asteroidObjects[a].translateSphere(x / 4, x / 8);
			asteroidObjects[a].showAsteroid();
		}
		console.log("*************END*************");
	}
}


/*
 * This function is called during setup() to populate the array before
 * the draw method is called. This helps ensure the data is available
 * before all the objects are drawn to screen.
 * @param asteroidImpactData - argument passed in that holds all
 * objects from the JSON file.
 */
function breakdownJsonData(newData) {
	/*
	 * For..in (loop) will move over all items in the JSON array.
	 * The loop begins by assigning each new held asteroid value in the list to a new variable.
	 * The newAsteroid is an object that is parsed for mass, id, and year.
	 */
	for (var asteroid in newData) {

		// Assign each held object in the list to a new variable called 'newAsteroid'
		let newAsteroid = newData[asteroid];

		// Get the mass and id for storing into array as key-value pairs.
		let asteroidId = newAsteroid["id"];
		let asteroidMass = newAsteroid["mass"];
		let updatedAsteroidYear = newAsteroid["year"]; // Unformatted (Raw)

		// Basic null handling.
		// On condition that the mass is provided in the data, then add the asteroidId as
		// the index marker for the asteroidMass value.
		if (asteroidMass != null && updatedAsteroidYear != null) {
			// asteroidCount++;
			asteroidYears.push(updatedAsteroidYear);
			asteroidComparables[asteroidId] = asteroidMass;
		}
	}
	// Add data set of comparable data to array
	// which leaves a 973 item array that contains
	// an index and corresponding ID.
	asteroids = Object.keys(asteroidComparables);
}


/*
 *
 */
function populateAsteroidArray() {
	// Since asteroidCount was already evaluated during preload() it can be used
	// here as well for sending an index reference to the asteroidCreator class.
	for (var i = asteroids.length; i >= 0; i--) {
		let currAsteroidId = asteroids[i];
		let currAsteroidMass = asteroidComparables[currAsteroidId];
		let aNewAsteroid = new anAsteroid(currAsteroidId, currAsteroidMass, asteroidYears[i]);
		asteroidObjects.push(aNewAsteroid);
	}
}