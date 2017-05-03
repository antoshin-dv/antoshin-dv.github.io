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
		{ locations: ["B0", "C0", "D0"], hits: [false, false, false] },
		{ locations: ["D2", "D3", "D4"], hits: [false, false, false] },
		{ locations: ["G3", "G4", "G5"], hits: [false, false, false] }
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
	}
};

// Контроллер
var controller =
{
	guesses: 0,
	
	processGuess: function(location)
	{
		if (this.checkGuess(location))
		{
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips)
				view.displayMessage("Вы победили");
		}
		return this.guesses;
	},
	
	checkGuess: function(location)
	{
		if (location === null || location.length !== 2)
			return false;
		
		// Первый символ должен принимать значение от А до А+размер поля
		var codeCh = location[0].toUpperCase().charCodeAt(0);
		var codeA = "A".charCodeAt(0);
		if (codeCh < codeA || (codeCh >= codeA + model.boardSize))
			return false;
		
		// Второй символ должен быть числом от 0 до размера поля
		var col = location[1];
		if (isNaN(col) || col < 0 || col >= model.boardSize)
			return false;
		
		return true;
	}
}

var userFire = ["A0", "D4", "F5", "B2", "C5", "C6", "C0", "D0", "B0",
	"D2", "D3", "G3", "G4", "G5"];
for (var i = 0; i < userFire.length; i++)
	controller.processGuess(userFire[i]);
