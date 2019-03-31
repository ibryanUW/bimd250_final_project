/*
 * This class is used to create a sphere and hold that data as an object.
 * The data being used is coming fro the loop inside setup() from the 'sketch.js' class.
 * Methods included in this class are kept simple because of the amount of processing
 * that has to happen for each sphere. (I think there is also a far greater demand on processes
 * that involve drawing with WEBGL but I don't know enough about the underlying functions
 * of WEBGL to confirm this).
 */

class anAsteroid {

	/*
	 * Constructor function overrides the default, given constructor so parameters can
	 * be populated from outside sources.
	 */
	constructor(astId, astMass, astYear, translateXY) {
		this.givenAstId = astId;
		this.givenAstMass = astMass;
		this.givenAstYear = astYear;
		
		this.translateXY = noise(translateXY) * 0.25;
	}

	/*
	 *
	 */
	formatYear() {
		return this.givenAstYear.split('-', 1);
	}

	
	translateSphere(translateSphereX, translateSphereY){
		translate(translateSphereX, translateSphereY);
	}
	
	
	/*
	 * 
	 */
	showAsteroid() {

		let someYearString = this.formatYear();
		let year = parseInt(someYearString);

		// Required to be able to see the largest possible sphere.
		// Change to `1` if you want to see the real magnitude.
		// (Will turn screen black from density of sphere's @ scale of 1).
		scale(0.15);
		fill(255, 0);
		
		sphere(this.givenAstMass);
	}
}