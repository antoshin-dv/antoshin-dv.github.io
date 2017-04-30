var count = 99;
while (count > 0)
{
	document.write(count + " " + GetButtles(count) + " пива на стене<br>");
	document.write(count + " " + GetButtles(count) + " пива!<br>");
	document.write("<b>Возьми одну</b>, пусти по кругу<br>");
	count = count - 1;
	if (count > 0)
	{
		document.write(count + " " + GetButtles(count) + " пива на стене!<br>");
	}
	else
	{
		document.write("Нет больше " + GetButtles(count) + " пива на стене!<br>")
	}
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
	
	return "<i>" + word + "</i>";
}