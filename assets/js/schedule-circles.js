function $$(selector, context) {
	context = context || document;
	var elements = context.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
}

$$('.circular p').forEach(function(e1) {
	var NS = "http://www.w3.org/2000/svg";
	var xlinkNS = "http://www.w3.org/1999/xlink";
	var svg = document.createElementNS(NS, "svg");
	var circle = document.createElementNS(NS, "path");
	var text = document.createElementNS(NS, "text");
	var textPath = document.createElementNS(NS, "textPath");

	svg.setAttribute("viewbox", "0 0 100 100");

	circle.setAttribute("d", "M0,45 a 50,50 0 1,1 0,1 z");
	circle.setAttribute("id", "circle");

	textPath.textContent = e1.textContent;
	textPath.setAttributeNS(xlinkNS, "xlink:href", "#circle");
	text.setAttribute("y", "-5");

	text.appendChild(textPath);
	svg.appendChild(circle);
	svg.appendChild(text);
	e1.textContent = '';
	e1.appendChild(svg);
});