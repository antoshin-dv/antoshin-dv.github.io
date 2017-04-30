var rand = 1 + Math.floor(Math.random() * 5);
var location1 = rand;
var location2 = rand + 1;
var location3 = rand + 2;

var guess;
var hits = 0;
var guesses = 0;

var isSunk = false;

while (!isSunk)
{
	guess = prompt("Готовься! Цель! Огонь! (Введите число от 1 до 7):");
	if (guess < 1 || guess > 7)
	{
		alert("Введите корректное число.");
	}
	else
	{
		guesses = guesses + 1;
	}
	
	if (guess == location1 || guess == location2 || guess == location3)
	{
		hits = hits + 1;
		if (hits == 3)
		{
			isSunk = true;
			alert("Потопил!");
		}
		else
		{
			alert("Ранил");
		}
	}
	else
	{
		alert("Мимо");
	}
}

var stats = "Ты сделал " + guesses + " выстрелов чтобы потопить корабль. " +
			"Твоя точность: " + (3/guesses);
alert(stats);