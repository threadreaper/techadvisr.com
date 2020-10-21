const qS = document.querySelector.bind(document);

function classToggle() {
	"use strict";
	var i, inputs;
	inputs = document.querySelectorAll(".text-input");
	for (i = 0; i < inputs.length; i += 1) {
		if (inputs[i].value !== "") {
			inputs[i].classList.add("has-content");
		} else {
			inputs[i].classList.remove("has-content");
		}
	}
}

var sliders;
sliders = document.querySelectorAll(".slider");

for (i = 0; i < sliders.length; i += 1) {
	sliders[i].addEventListener("click", function () {
		if (this.value == 0) {
			this.value = 1;
		} else {
			this.value = 0;
		}
	});
}

var modal, modalButton, modalClose;
var modal = qS(".modal");

function showModal() {
	storage = window.sessionStorage;

	if (storage.getItem("modalSeen")) return;
	storage.setItem("modalSeen", "true");
	modal.style.visibility = "visible";
}

modalReveal = qS(".modal-reveal");
if (modalReveal) {
	modalReveal.addEventListener("click", function () {
		modal.style.visibility = "visible";
	});
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

modalClose = qS(".modal-close");

if (modalClose) {
	modalClose.addEventListener("click", function () {
		modal.style.visibility = "hidden";
	});

	document.onscroll = function () {
		var pos = getVerticalScrollPercentage(document.body);
		var modalTrigger = getComputedStyle(document.documentElement)
			.getPropertyValue("--modal-trigger")
			.trim();
		if (modalTrigger) {
			if (pos > modalTrigger) {
				showModal();
			}
		}
	};
}

function getVerticalScrollPercentage(elm) {
	var p = elm.parentNode,
		pos =
			((elm.scrollTop || p.scrollTop) /
				(p.scrollHeight - p.clientHeight)) *
			100;

	return pos;
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
