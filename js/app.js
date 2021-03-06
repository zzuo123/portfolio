const navSlide = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const body = document.querySelector('html');
	const navLinks = document.querySelectorAll('.nav-links li');

	burger.addEventListener('click', () => {
		if (body.style.overflowY == "") {
			body.style.overflowY = 'hidden';
		} else {
			body.style.overflowY = "";
		}
		// animate links using keyframe called navLinkFade
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				// remove animation closed
				link.style.animation = '';
			} else {
				// "index / 7 + 0.2" delay fading in of links based on index (top first, bottom last)
				link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
			}
			link.addEventListener('click', () => {
				body.style.overflowY = "";
				navLinks.forEach(l => {
					l.style.animation = '';
				})
				nav.classList.remove('nav-active');
				burger.classList.remove('toggle');
			})
		});
		// toggle nav (add if class not exist, remove if it does)
		nav.classList.toggle('nav-active');
		// burger animation
		burger.classList.toggle('toggle');
	});
}

class TxtType {
	constructor(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	}
	tick() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

		var that = this;
		var delta = 200 - Math.random() * 100;

		if (this.isDeleting) { delta /= 2; }

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function () {
			that.tick();
		}, delta);
	}
}

const editor = () => {
	var elements = document.getElementsByClassName('typewrite');
	for (var i = 0; i < elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
			new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS (for the | bar thingy)
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 3px solid #fff; animation: blinker 1s ease-in-out infinite;}";
	document.body.appendChild(css);
}

const random_bg = () => {
	const items = document.querySelectorAll('.randombg');
	items.forEach(item => {
		var x = Math.floor(Math.random() * 256);
		var y = Math.floor(Math.random() * 256);
		var z = Math.floor(Math.random() * 256);
		var bgColor = "rgba(" + x + "," + y + "," + z + ", 0.5)";
		item.style.background = bgColor;
	});
}

const app = () => {
	editor();
	navSlide();
	random_bg();
}

window.onload = app();