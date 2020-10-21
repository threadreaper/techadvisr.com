const qS = document.querySelector.bind(document),
	modal = qS(".modal"),
	modalClose = qS(".modalClose"),
	modalTrigger = getComputedStyle(document.documentElement).getPropertyValue('--modal-trigger'),
	storage = window.sessionStorage;

function showModal() {
	if (storage.getItem("modalSeen")) return;
	storage.setItem("modalSeen", "true");
	modal.style.visibility = "visible";
}

if (modal) {
	document.addEventListener("click", (evt) => {
		let targetElement = evt.target; // clicked element
		if (targetElement != modalReveal) {
			do {
				if (targetElement == modal) {
					return;
				}
				targetElement = targetElement.parentNode;
			} while (targetElement);
			modal.style.visibility = "hidden";
		}
	});
}

if (modalClose) {
	modalClose.addEventListener("click", function () {
		modal.style.visibility = "hidden";
	});
}

function getVerticalScrollPercentage(elm) {
	var p = elm.parentNode,
		pos =
			((elm.scrollTop || p.scrollTop) /
				(p.scrollHeight - p.clientHeight)) *
			100;

	return pos;
}

if (modalTrigger) {
	document.onscroll = function () {
		var pos = getVerticalScrollPercentage(document.body);
		var modalTrigger = getComputedStyle(document.documentElement)
			.getPropertyValue("--modal-trigger")
			.trim();
		if (pos > modalTrigger) {
			showModal();
		}
	}
}

document.addEventListener("mouseleave", function (event) {
	var exitIntent = getComputedStyle(document.documentElement)
		.getPropertyValue("--exit-intent")
		.trim();

	// If this is an autocomplete element.
	if (event.target.tagName)
		if (event.target.tagName.toLowerCase() == "input") return;

	// Get the current viewport width.
	var vpWidth = Math.max(
		document.documentElement.clientWidth,
		window.innerWidth || 0
	);

	// If the current mouse X position is within 50px of the right edge
	// of the viewport, return.
	if (event.clientX >= vpWidth - 50) return;

	// If the current mouse Y position is not within 50px of the top
	// edge of the viewport, return.
	if (event.clientY >= 50) return;

	// Reliable, works on mouse exiting window and
	// user switching active program
	var from = event.relatedTarget || event.toElement;
	if (!from) if (exitIntent == 1) showModal();
});
