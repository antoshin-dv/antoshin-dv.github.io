var word="бутылок";
var count = 99;
while (count > 0)
{
	document.write(count + " " + word + " пива на стене<br>");
	document.write(count + " " + word + " пива!<br>");
	document.write("<b>Возьми одну</b>, пусти по кругу<br>");
	count = count - 1;
	if (count > 0)
	{
		document.write(count + " " + word + " пива на стене!<br>");
	}
	else
	{
		document.write("Нет больше " + word + " пива на стене!<br>")
	}
}