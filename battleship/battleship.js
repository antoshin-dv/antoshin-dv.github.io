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

view.displayMessage("Да начнётся тестирование.");
var userFire = ["A0", "D4", "F5", "B2", "C5", "C6"];
var isHit = [false, true, false, true, false, true];
for (var i = 0; i < userFire.length; i++)
{
	if (isHit[i])
		view.displayHit(userFire[i]);
	else
		view.displayMiss(userFire[i]);
}
