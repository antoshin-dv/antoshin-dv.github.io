// Представление
var view = 
{
	displayMessage: function(msg)
	{
		var messageArea = document.getElementById("messageArea");
		if (messageArea)
			messageArea.innerHTML = msg;
	},
	displayHit: function(location)
	{
		var cell = document.getElementById(location);
		if (cell)
			cell.setAttribute("class", "hit");
	},
	displayMiss: function(location)
	{
		var cell = document.getElementById(location);
		if (cell)
			cell.setAttribute("class", "miss");
	}
};

// Модель
var model =
{
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: 
	[
		{ locations: [0, 0, 0], hits: [false, false, false] },
		{ locations: [0, 0, 0], hits: [false, false, false] },
		{ locations: [0, 0, 0], hits: [false, false, false] }
	],
	
	fire: function(location)
	{
		for (var i = 0; i < this.ships.length; i++)
		{
			var ship = this.ships[i];
			var idx = ship.locations.indexOf(location);
			if (idx >= 0)
			{
				ship.hits[idx] = true;
				view.displayHit(location);
				if (this.isSunk(ship))
				{
					this.shipsSunk++;
					view.displayMessage("Убил");
				}
				else
					view.displayMessage("Ранил");
				return true;
			}
		}
		view.displayMiss(location);
		view.displayMessage("Мимо");
		return false;
	},
	
	isSunk: function(ship)
	{
		for (var i = 0; i < ship.hits.length; i++)
			if (!ship.hits[i])
				return false;
		return true;
	},
	
	generateShipLocations: function()
	{
		var locations;
		for (var i = 0; i < this.numShips; i++)
		{
			do
			{
				locations = this.generateShip();
			}while (this.Collision(locations));
			this.ships[i].locations = locations;
		}
	},
	
	generateShip: function()
	{
		var direction = Math.floor(Math.random() * 2);
		var row, col;
		if (direction === 1)
		{
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		}
		else
		{
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}
		
		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++)
		{
			if (direction === 1)
				newShipLocations.push(this.getChar(row) + (col + i));
			else
				newShipLocations.push(this.getChar(row + i) + col);
		}
		
		return newShipLocations;
	},
	
	getChar: function(number)
	{
		var codeA = "A".charCodeAt(0);
		return String.fromCharCode(codeA + number);
	},
	
	Collision: function(locations)
	{
		for (var i = 0; i < this.numShips; i++)
		{
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++)
				if (ship.locations.indexOf(locations[j]) >= 0)
					return true;
		}
		return false;
	}
};

// Контроллер
var controller =
{
	guesses: 0,
	
	processGuess: function(location)
	{
		var newLocation = this.checkGuess(location);
		if (newLocation)
		{
			this.guesses++;
			var hit = model.fire(newLocation);
			if (hit && model.shipsSunk === model.numShips)
				view.displayMessage("Вы победили");
		}
	},
	
	checkGuess: function(location)
	{
		if (location === null || location.length !== 2)
			return null;
		
		// Первый символ должен принимать значение от А до А+размер поля
		var codeCh = location[0].toUpperCase().charCodeAt(0);
		var codeA = "A".charCodeAt(0);
		if (codeCh < codeA || (codeCh >= codeA + model.boardSize))
			return null;

		// Второй символ должен быть числом от 0 до размера поля
		var col = location[1];
		if (isNaN(col) || col < 0 || col >= model.boardSize)
			return null;
		
		return String.fromCharCode(codeCh) + col;
	}
}

function init()
{
	var fireButton = document.getElementById("fireButton");
	if (fireButton)
		fireButton.onclick = handleFireButton;
	
	var guessInput = document.getElementById("guessInput");
	if (guessInput)
		guessInput.onkeypress = handleKeyPress;
	
	model.generateShipLocations();
}

function handleFireButton()
{
	var guessInput = document.getElementById("guessInput");
	if (guessInput)
	{
		var guess = guessInput.value;
		controller.processGuess(guess);
		
		guessInput.value = "";
	}
}

function handleKeyPress(e)
{
	if (e.keyCode === 13)
	{
		var fireButton = document.getElementById("fireButton");
		if (fireButton) 
		{
			fireButton.click();
			return false;
		}
	}		
}

window.onload = init;
