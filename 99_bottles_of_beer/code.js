var count = 99;
while (count > 0)
{
	document.write(GetNumber(count) + " " + GetButtles(count) + " пива на стене<br>");
	document.write(GetNumber(count) + " " + GetButtles(count) + " пива!<br>");
	document.write("<b>Возьми одну</b>, пусти по кругу<br>");
	count = count - 1;
	if (count > 0)
	{
		document.write(GetNumber(count) + " " + GetButtles(count) + " пива на стене!<br>");
	}
	else
	{
		document.write("Нет больше " + GetButtles(count) + " пива на стене!<br>")
	}
}

function GetNumber(count)
{
	var str_1_9 = ["одна", "две", "три", "четыре", "пять",
				"шесть", "семь", "восемь", "девять"];
	var str_10_19 = ["десять", "одиннадцать", "двенадцать", "тринадцать",
		"четырнадцать", "пятнадцать", "шестнадцать", "семнадцать",
		"восемнадцать", "девятнадцать"];
	var str_20_90 = ["двадцать", "тридцать", "сорок", "пятьдесят",
		"шестьдесят", "семьдесят", "восемьдесят", "девяносто"];
		
	var number;
	if (count <= 0 || count >= 100)
		return number;
	
	if (count >= 10 && count < 20)
	{
		number = str_10_19[count % 10];
	}
	else
	{
		var pos0 = "";
		if (count % 10)
			pos0 = str_1_9[count % 10 - 1];
		
		var pos1 = "";
		if (count / 10 > 1)
			pos1 = str_20_90[Math.floor(count / 10) - 2];
		
		number = pos1 + " " + pos0;
	}
	
	return number;
}

function GetButtles(count)
{
	var word;
	var mod = count % 10;
	if (mod == 0 || mod >= 5 || (count >= 11 && count <= 14))
		word = "бутылок";
	else if (mod >= 2)
		word = "бутылки";
	else
		word = "бутылка";
	
	return word;
}