function TestClass() {
	
	function init() {
		console.log("TestClass: init");
		methodOne();
	}

	function methodOne() {
		console.log("TestClass.methodOne: Denna privata metod är skriven innanför omfånget av klassen TestClass, dvs det är OK.");
	}

	init();
}

TestClass.prototype.methodTwo = function() {
	console.log("TestClass.methodTwo: Denna publika metod är kopplad till klassen TestClass via prototype, dvs det är OK.");
}

function methodThree() {
	console.log("window.methodThree: Denna metod är inte kopplad till någon klass, den kommer därför att sparas i window-objektet, dvs det är inte OK.");
}