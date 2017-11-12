
var colors    = createColors(9);
var squares   = document.querySelectorAll(".square");
var pickedColor = getRandomNumber(9);
var colorDisplay = document.getElementById("colorDisplay");
var message =  document.querySelector("#message");
var header = document.querySelector("#header");
var refresh = document.querySelector("#refresh");
var btn = document.querySelectorAll(".btn");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var easyMode = true;
var range = 120;
var rangeInput = document.getElementById("range");
colorDisplay.innerHTML = colors[pickedColor];

rangeInput.addEventListener("change", function(){
	range = rangeInput.value;
	refreshHardColors();
});

rangeInput.style.display = "none";

// This is the basic game functionality it loops through
//the squares and adds an event listener that checks if
// the clicked square is the correct one then provides the functionality for each
//case
for(var i=0;i<squares.length;i++){
		squares[i].style.backgroundColor = colors[i];	
		squares[i].addEventListener("click", function(){
				var clickedColor = this.style.backgroundColor;

				if(clickedColor === colors[pickedColor]){
					message.textContent = "Correct";
					changeColors(clickedColor);
					header.style.backgroundColor = colors[pickedColor];
				}else{
					this.style.backgroundColor = "#121212";
					message.textContent = "Wrong";
				}
		});
}
// add event listenrs to difficulty modes
for(var i =0; i<btn.length;i++){
	
	btn[i].addEventListener("click",function(){
		btn[0].classList.remove("active");
		btn[1].classList.remove("active");
		this.classList.add("active");	
		if(this.textContent === "Easy"){
			easyMode = true;
			rangeInput.style.display = "none";
			refreshEasyColors();		
		}else{
			easyMode = false;
			rangeInput.style.display = "inherit";
			refreshHardColors();
		}
	});
};

// refresh button
refresh.addEventListener("click", function(){
	if(easyMode === true){
		refreshEasyColors();		
		}else{
			easyMode = false;
			refreshHardColors();
		}
});



// function to reset square colors
function reset(){
	pickedColor = getRandomNumber(squares.length);
		header.style.backgroundColor = "lightblue";
		message.textContent = "";
		colorDisplay.innerHTML = colors[pickedColor];
		for(var i = 0; i<squares.length;i++){
			squares[i].style.backgroundColor = colors[i];
		}
}
// this function is called by the easy colors button
function refreshEasyColors(){
		colors = createColors(squares.length);
		reset();

};

// this functions is called by the hard button 
function refreshHardColors(){
	    colors = createHardColors(squares.length , range);
		reset();
}

// loops through the suares and changes all of the colors
// to the correct color
function changeColors(color){
	for(var i = 0; i<squares.length;i++){
		// change colors
		squares[i].style.backgroundColor =  color;
	}
};

// gets random number based on number of squares
// this decide which is the correct square.
function getRandomNumber(num){
	return Math.floor(Math.random() * num);
}


// function creates an array and pushes random colors
// to it dependig on the number of squares
function createColors(num){
		var arr = [];
		for(var i=0; i<num; i++){
			arr.push(randomColor());

		}
		return arr;
}

// returns a random color in an rgb string format
function randomColor(){
	var red    = getRandomNumber(255);
	var green  = getRandomNumber(255);
	var blue   = getRandomNumber(255);
	return "rgb(" + red +", " + green + ", "+ blue + ")";
}





//***************************************************************
//THIS SECTION OF THE CODE CREATES THE RANGES 
//FOR THE HARD SETTING OF THE APP
//*************************************************************

// function to create a minimum number based on a 0-255 rgb scale with a range of 40 total
// possible color value differences
function minRange (num , range){

	if(num >= (range/2)){
	
		return (num - (range/2));
	}else {		
		return 0;
	}
}
// create max range based on minRange function
function maxRange(num , range){
	
		if((num +(range/2)) >= 255){
				return 255 		
		}else {
			return (num + (range/2));
		}
	
}


//  takes a min and max number and generates a random number within 
//that range
function getRangedNumber(num, range) {
	var min = minRange (num, range);
	var max = maxRange (num,range);	
    min = Math.ceil(min);
    max = Math.floor(max);
  //The maximum is inclusive and the minimum is inclusive 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

//*************************************************************
//END RANGING AND MIN MAXING SECTION
//********************************************************


// *******************************************************************
//********************************************************************
//HARD SETTING FUNCTIONALITY
//**********************************************************************
//**********************************************************************



// generate ramdom number within range
function randomHardColor(redBase, greenBase, blueBase, range){
	var red   = getRangedNumber(redBase, range);
    var green  = getRangedNumber(greenBase, range);
    var blue   = getRangedNumber(blueBase, range);

	return "rgb(" + red +", " + green + ", "+ blue + ")";

};


// creates an array with strings of rgb colors 
function createHardColors(num, range){
	var arr =[];
	var redBase    = getRandomNumber(255);
	var greenBase  = getRandomNumber(255);
	var blueBase   = getRandomNumber(255);


	for(var i=0;i<num;i++){
	arr.push(randomHardColor(redBase, greenBase, blueBase, range));
	}
	return arr;
}