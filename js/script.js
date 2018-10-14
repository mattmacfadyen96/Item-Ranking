/* 
	Create an id for a radio button or checkbox by concatenating the 
	the groupId with newValue and then replacing the spaces with 
	underscores '_'
*/
function makeId(groupId, newValue) {
	var newId = groupId + "_" + newValue;
  return newId.replace(new RegExp(' ', 'g'), '_');
}

/* 
	Create a text node from a newText string 
*/
function makeTextNode(newText) {
	return document.createTextNode(newText);
}

/* 
	Make an HTML <label> element with the specified labelText and newId
	
	newId is an optional parameter	
*/	
function makeLabel(labelText, newId) {
	var newLabel = document.createElement("label");
	if (newId !== undefined && newId != "") {
		newLabel.setAttribute("for", newId);
	}
	newLabel.appendChild(makeTextNode(labelText));
	return newLabel;
}

/* 
	Make an HTML <input> element of the specified type with 
	optional labelText, newId, newName, and newValue.
	
	By default required is false. If you set required to true, class="required" will be added. 
	
	If type is button, the Bootstrap CSS class btn and btn-primary are added
*/
function makeInput(type, labelText, newId, newName, newValue, required = false) {
	var newInput = document.createElement("input");
	newInput.setAttribute("type", type);
	if (newId !== undefined && newId != "") {
		newInput.setAttribute("id", newId);
	}
	if (newName !== undefined && newName != "") {
		newInput.setAttribute("name", newName);
	}
	if (newValue !== undefined && newValue != "") {
		newInput.setAttribute("value", newValue);
	}
	if (required) {
		newInput.classList.add("required");
	}
	if (type == "button") {
		newInput.classList.add("btn");
		newInput.classList.add("btn-primary");
	}	
	if (labelText !== undefined && labelText != "") { 	 	
		var newLabel = makeLabel(labelText, newId);
		// If radio or checkbox insert the newInput before the labelText node of the newLabel
		if (type == "radio"  || type == "checkbox") {
			newLabel.insertBefore(newInput, newLabel.firstChild);
			return newLabel;
		}
		else {
		  var newDiv = document.createElement("div");
			newDiv.appendChild(newLabel);
			newDiv.appendChild(newInput);
			return newDiv;
		}
	}
	else {
		return newInput;
	}
}

/* 
	Make a group of radio buttons or checkboxes 

	The buttons or checkboxes are in a <span> element
	
	newID is used as the id of the span
		
	If labelText is defined, a <label> element is created and 
	the label and span are put inside of a <div> element.
	
	If type is checkbox then "[]" is appended to newID
	
	newID is used as the name of each radio button or checkbox.
	
	Each radio button or checkbox id is generated using 
	the makeId function (see above)
*/
function makeGroup(type, arrayOfValues, labelText, newId, required = false) {
	var newSpan = document.createElement('span');
	if (newId !== undefined && newId != "") {
		if (type == "checkbox") {
			newId = newId + "[]";
		}
		newSpan.setAttribute("id", newId);
	}
	if (required) {
		newSpan.setAttribute("class", "required");
	}
	for (var v = 0; v < arrayOfValues.length; v++) {
		var value = arrayOfValues[v];
		var itemId = "";
		if (newId !== undefined && newId != "") {
			itemId = makeId(newId, value);
		}
		var newInput = makeInput(type, value, itemId, newId, value);
		newSpan.appendChild(newInput);
	}
	if (labelText !== undefined && labelText != "") {
		var newDiv = document.createElement("div");
		newDiv.appendChild(makeLabel(labelText, newId));
		newDiv.appendChild(newSpan);
		return newDiv;
	}
	else {
		return newSpan;
	}
}

/* 
	When the AJAX response is received/loaded, 
	the server-side script output will be put in the listArea's innerHTML 
*/
function responseReceived() {
	if (this.status === 200) {
		listArea.innerHTML = this.response;
  } 
  else {
		listArea.innerHTML = "The request failed, status: " + this.status + " " + this.statusText;
  }
}

/* 
	Encode the specified dataStructure into a JSON string, 
	send it to the specified URL and
	call responseReceived when the response is ready/loaded
*/
function jsonSend(dataStructure, url) {
	var jsonData = JSON.stringify(dataStructure);
	var request = new XMLHttpRequest();
	request.addEventListener("load", responseReceived);
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(jsonData);		
}

/* 
	Return a random number between min and max
	
	Hints:
		- Use Math.floor and Math.random
*/
function rand(min, max) {
	// Add your code here
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    
}

/* 
	Return a random rgb color string with value between hi and low
	
	Example: rgb(99,126,81)
	
	Hints:
		- The numeric values are random values between 0 and 255
		- Use the rand function you defined 
		- Use the concatenation + operator to build the string 
	
*/
function randomColor(low,hi) {
	// Add your code here
    var red = rand(low, hi);
    var green = rand(low, hi);
    var blue = rand(low, hi);
    
    return "rgb(" + red + ", " + green + ", " + blue + ")";
    
}


/* 
	Pops a random value from the selectedItems array
	
	Help:  
		- Make sure selectedItems has length greater than zero
		- Use the rand function (see above) to get a random index between 0 and selectedItems.length
		- Using a local variable, save the value of the array at that random index
		- Remove the array item at the index using the JavaScript's array splice function
		- Return the saved value 
*/
function popRandomValue() {
	// Add your code here
    
    // check to make sure the array has a greater length then 0
    if(selectedItems.length >= 0)
        {
             var index = rand(0, selectedItems.length)
             var newItem = selectedItems.splice(index, 1);
            
        }
    return newItem;
    
}


/*
	Updates a button with a new random value from the selectedItems array
	and give the button a random color
	
	Hints:
		- Use the popRandomValue function (see above) to get and remove a value from selectedItems 
		- Set the button's value to this new randomly selected value
		- Use the randomColor function (see above) to set the button's style.backgroundColor
*/
function updateButton(button) {
	// Add your code here
    button.value = popRandomValue();
    button.style.backgroundColor = randomColor(0, 255); 
    
}


/*
	This function is called each time itemOne or itemTwo is clicked.
	
	It will record the winner, i.e., the button the user clicked, and 
	the loser, i.e., the button the user did not click.
	
	If itemOne was clicked it will be passed as the winner and itemTwo 
	will be passed as the loser, or vice versa if itemTwo was clicked

	We will send the value of the winner and loser using AJAX/JSON 
	as an object with two fields
	
	Create an object (called ranking), i.e., var ranking = new Object();
	
	Set ranking.winner to winner.value
	Set ranking.loser to loser.value
	
	Use the jsonSend function to send the ranking object to the following server-side script:
	http://breimer.sienacs.com/courses/csis-390-s17/projects/project3/addrankings.php
	
	if selectedItems is now empty 
		remove the btnArea and set the messageArea's innerHTML to say:
		"All Done.  Reload the page to start over."
	else
		use the updateButton function to change the loser to a new value and color
*/
function recordRanking(winner, loser) {
    var ranking = new Object();
    ranking.winner = winner.value;
    ranking.loser = loser.value;
    
    jsonSend(ranking, "http://s874934.sienasellbacks.com/project3/php/addrankings.php");
    
    // check to see if the selected array is now empty 
    if(selectedItems.length == 0)
        {
            var element = document.getElementById('button');
			element.parentNode.remove(element);
            btnArea.innerHTML = "All Done. Reload the page to start over."
        }
    else {
        updateButton(loser);
    }
}


/*
	Starts the ranking process
	
	Only do this if the selectedItems array has 2 or more items
	
	Remove the nextButton.  Hint: use removeChild on the parentNode of the nextButton
	
	Use the jsonSend function to send the selectedItems array to the following server-side script:
	http://breimer.sienacs.com/courses/csis-390-s17/projects/project3/additems.php
	
	Change the messageArea's innerHTML to:
	"Which of the items below do you like better? <b>Click one</b>:"
	
	Make two new buttons (i.e., <input type="button"> and 
	assign them to the global variables itemOne and itemTwo
	
	Use the updateButton function (see above) to give itemOne and itemTwo random values and colors
	
	Append itemOne and itemTwo to the btnArea
	
	After itemOne and itemTwo are appended, add event listeners as follows:
	
	itemOne.addEventListener("click", function() {
		recordRanking(itemOne, itemTwo);
	});	
	
	itemTwo.addEventListener("click", function() {
		recordRanking(itemTwo, itemOne);
	});
	
	Note that the first parameter of the recordRanking function is the winner, i.e.,
	If you click itemOne, then itemOne is the winner and itemTwo is the loser
*/	
function rankSelectedItems() {
	// Add your code here
    
    //Only do this if the selectedItems array has 2 or more items
    if(selectedItems.length >= 2)
        {
           // Remove the nextButton.  Hint: use removeChild on the parentNode of the nextButton
            nextbutton.parentNode.removeChild(nextbutton);
            
            jsonSend(selectedItems, "http://s874934.sienasellbacks.com/project3/php/additems.php");
            
            messageArea.innerHTML = "Which of the items below do you like better? <b>Click one</b>:";
            
            //type, labelText, newId, newName, newValue, required = false
             itemOne = makeInput("button", "", "buttonNew1", "button", "", true);
            
             updateButton(itemOne);
            
             itemTwo = makeInput("button", "", "buttonNew2", "button", "", true);
            
             updateButton(itemTwo);
            
            btnArea.appendChild(itemOne);
            btnArea.appendChild(itemTwo);
            
            itemOne.addEventListener("click", function() {
		    recordRanking(itemOne, itemTwo); });	
	
	        itemTwo.addEventListener("click", function() {
		    recordRanking(itemTwo, itemOne); });
            
            
        
            
        }
}

/* 
	Update the innerHTML of the messageArea to indicate which items are selected.

	If less than 2 items are selected display "You must select two or more items"

	If two items are selected, display "You have selected Item1 and Item2"

	If three or more items are selected, display  the items if the following format:
	"You have selected Item1, Item2, ..., ItemN-1 and Item N"
	
	Help:
		- Use selectedItems.length to determine how many items are selected
		- Use an if statement to handle the special case, i.e., only two items
		- Iterate over the selectedItems array and create a message string with value and commas
*/
function updateMessageArea() {
	// Add your code here
    if(selectedItems.length < 2 )
        {
            messageArea.innerHTML = "You must select two or more items";
            
        }
    if(selectedItems.length == 2)
        {
            var message = "You have selected" + " " + selectedItems[0] + " and " + selectedItems[1];
            
            messageArea.innerHTML = message; 
            
        }
    if(selectedItems.length >= 3)
        {
            var message2 = "You have selected" + " ";
            for(var i = 0; i < selectedItems.length; i++)
                {
                    if(i == selectedItems.length-1)
                        {
                            message2 = message2 + " and " + selectedItems[i];
                        }
                    else {
                        message2 = message2 + selectedItems[i] + ", "  
                    }
                }
            messageArea.innerHTML = message2;
        }
}


/* 
	This function gets called when any of the checkboxes (i.e., <input type="checkbox">) are changed
	
	If this checkbox is checked, 
		add the class "highlight" to the parent (i.e., the <label> of the checkbox) and 
		add the value of the checkbox to the the selectedItems array, 
	otherwise if the element is not checked
		remove the "highlight" class and remove the value from the selectedItems array.
	
	Then, call updateMessageArea (see above) to display the updated list of selected items
	
	Help:
		- You can use the this pointer to refer to the checkbox being changed
		- Elements have fields called parentNode and classList that are useful here
		- JavaScript arrays have functions such as push, splice and indexOf that are useful here
*/
function addSelectedItem() {
	// Add your code here
    
    if(this.checked)
        {
            this.parentNode.classList.add("highlight");
            selectedItems.push(this.value);
            
        }
    else {
        
        var index = selectedItems.indexOf(this)
        
        this.parentNode.classList.remove("highlight");
        selectedItems.splice(index, 1);
    }
    
    updateMessageArea();
}


/* 
	Add eventListeners to all the checkboxes so that when a checkbox is changed 
	the function addSelectedItem (see above) is called 
	
	Help:
		- querySelectorAll returns an array of elements
		- Iterate over the array of elements and add an event listerner to each one
		- The query "input[type=checkbox]" will select all the checkboxes
		- Use the "change" event, not the "click" event
*/
function addCheckboxListeners() {
	// Add your code here
    var elements = document.querySelectorAll("input[type=checkbox]");
    
    for(var i = 0; i < elements.length; i++) 
        {
            elements[i].addEventListener("change", addSelectedItem );
        }
}


/* ---------------------------------------------------------------------

	Below is the main program which will set up the user interface and
	all the event listeners which will call the functions above.

	The main program will define global variables that are very important:
	
	listOfItems is an array of all the values used to make the checkboxes
	selectedItems is an array of the items the user checks
	messageArea is used to display messages
	btnArea is used to display the buttons
	listArea is used to display the checkboxes and the server's response
	
	nextButton, itemOne and itemTwo are buttons

------------------------------------------------------------------------ */



/* 
		1. Create an array called listOfItems with at least 10 strings. 
			These strings can be sports teams, celebrities, new sources, etc. 
			Be creative.
			
            
            */ 

        var listOfItems = ["The Legend of Zelda", "Zelda II: The Adventure of Link",
                          "The Legend of Zelda: A Link to the Past", "The Legend of Zelda: Link's Awakening", "The Legend of Zelda: Ocarina of Time", "The Legend of Zelda: Majora's Mask", "The Legend of Zelda: The Wind Waker", "The Legend of Zelda: Twilight Princess", "The Legend of Zelda: Phantom Hourglass", "The Legend of Zelda: Skyward Sword", "The Legend of Zelda: Breath of the Wild"];


   /*
		2. Create an empty array called selectedItems 
        
        */
                          
        var selectedItems = [];                       
/*                          
		
		3. Create two variables called itemOne and itemTwo and set them to null 
*/

        var itemOne = null;
        var itemTwo = null;


/*
		
		4. Create a <div> element called messageArea and set the innerHTML to:
			"Select all the items that you know and click Next"
			Append messageArea to the <body> element.
            
*/

            var messageArea = document.createElement("div")
            messageArea.innerHTML = "Select all the items that you know and click Next";

            document.body.appendChild(messageArea);
            
/*
			
		5. Create a <div> element called btnArea 
			Create a button (<input type="button" value="Next") called nextButton
			Add an event listener to nextButton so rankSelectedItems function (see above)
			is called when the nextButton is clicked
			Append nextButton to the btnArea
			Append the btnArea to the <body> element
            
            */ 

            var btnArea = document.createElement("div2");
             
            // create a button type, labelText, newId, newName, newValue, required = false 
            
            var nextbutton = makeInput("button", "", "button", "Next", "Next", true  );

            nextbutton.addEventListener("click", rankSelectedItems);
            btnArea.appendChild(nextbutton);
            document.body.appendChild(btnArea);

/*
	
		6. Use makeGroup to generate an element called listArea that will contain 
			checkboxes and labels for all the strings in your listOfItems
			Append the listArea to the <body> element
                        
*/

            var listArea = document.createElement("span");

            // makeGroup(labelText, newId, required = false
            listArea = makeGroup("checkbox", listOfItems, "Items", "items", true );
            document.body.appendChild(listArea);
            
/*
	
		7. Call the addCheckboxListeners function (see above)
        
*/

            addCheckboxListeners();