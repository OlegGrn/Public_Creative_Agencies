function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});


function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();
"use strict";

let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};


if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
} else {
	document.querySelector('html').classList.add('_pc');
}

//========================================================================
// навигация к заголовкам ============================================
// атрибут в элементе <a> data-goto=".class"

if (document.querySelectorAll("a[data-goto]") != null) {
	document.querySelectorAll("a[data-goto]").forEach(item => {
		item.addEventListener("click", onMenuLinkClick);
	});
}

function onMenuLinkClick(e) {
	let menuLink = e.target;
	if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
		let nameClass = menuLink.dataset.goto;
		let MoveBlock = document.querySelector(nameClass);
		let boxMoveBlock = MoveBlock.getBoundingClientRect();
		let upMoveBlock = boxMoveBlock.top + window.pageYOffset - document.querySelector(".header").offsetHeight;
		e.preventDefault();

		if (document.querySelector(".menu__icon").classList.contains("_active")) {
			let menuIcon = document.querySelector(".menu__icon");
			let bodyLock = document.querySelector("body");
			let menuBody = document.querySelector(".menu__body");
			menuIcon.classList.remove("_active");
			bodyLock.classList.remove("_lock");
			menuBody.classList.remove("_active");
		}
		window.scrollTo({
			top: upMoveBlock,
			behavior: "smooth"
		});
		e.preventDefault();
	}
}
// Меню бургер добавляем класс ============================================

function addClas() {
	let menuIcon = document.querySelector(".menu__icon");
	let bodyLock = document.querySelector("body");
	let menuBody = document.querySelector(".menu__body");

	if (menuIcon != null) {
		menuIcon.classList.toggle("_active");
		bodyLock.classList.toggle("_lock");
		menuBody.classList.toggle("_active");
	}
}

document.querySelector(".menu__icon").addEventListener("click", addClas);

//========================================================================
// Меню BODY скрываем верхний скрол под полупрозрачное меню (без плашки)

if (document.querySelector(".menu__body_opacity") != 0) {
	let elem = document.querySelector(".menu__body_opacity");
	elem.addEventListener("scroll", hideMenuList);

}

function hideMenuList() {
	const arrLinkMenu = document.querySelectorAll(".menu__link");
	const header = document.querySelector(".header");
	let hightHeader = header.offsetHeight - 5;

	arrLinkMenu.forEach(item => {
		let hightOffTop = item.getBoundingClientRect().top;
		let hightOffBottom = item.getBoundingClientRect().top + item.clientHeight;

		let pointStart = hightOffTop + item.clientHeight / 4;
		let pointEnd = hightOffBottom - 12;
		let pointMidl = pointStart + (pointEnd - pointStart) / 2;

		hidenStart(item, pointStart);
		hedenMidl(item, pointMidl);
		hiddenEnd(item, pointEnd);

		function hidenStart(item, pointStart) {
			if (pointStart < hightHeader) {
				item.classList.add("_hiden_start");
			} else if (pointStart > hightHeader) {
				item.classList.remove("_hiden_start");
			}
		}

		function hedenMidl(item, pointMidl) {

			if (pointMidl < hightHeader) {
				item.classList.add("_hiden_midl");
			} else if (pointMidl > hightHeader) {
				item.classList.remove("_hiden_midl");
			}
		}


		function hiddenEnd(item) {
			if (pointEnd < hightHeader) {
				item.classList.add("_hiden_end");
			} else if (pointEnd > hightHeader) {
				item.classList.remove("_hiden_end");
			}
		}


	});
}

/* Когда пользователь прокручивает вниз, скрыть навигационную панель. 
Когда пользователь прокручивает вверх, показать навигационную панель

 */
function menuHiden() {

	let prevScrollpos = window.pageYOffset;
	const header = document.querySelector(".header");
	let hightHeader = header.offsetHeight;

	function menuScroll() {
		let currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) {
			document.getElementById("navbar").style.top = "0";
			header.classList.remove("_active");

		} else if (document.documentElement.clientWidth < 767) {
			document.getElementById("navbar").style.top = - hightHeader + "px";
		} else {
			header.classList.add("_active");
		}
		prevScrollpos = currentScrollPos;
	}

	return menuScroll;
}

let menuScrollHiden = menuHiden();
window.onscroll = menuScrollHiden;



function shrinkText() {
	let arrEl = document.querySelectorAll("._js_shrink");
	if (arrEl.length > 0) {
		arrEl.forEach(item => {
			let oldInner = item.innerHTML.split("");
			let newInner = oldInner.map(i => `<span>${i}</span>`);
			item.innerHTML = newInner.join("");
		}
		);
	}
}
shrinkText()
///=====================================================================================================================
// анимация / добабления класса _active при скроле ==============================

if (document.querySelectorAll("._anim-item").length > 0) {
	window.addEventListener("scroll", animOnScroll);

	//== вызов уже видимых блоков + задержка анимации ===
	setTimeout(() => { animOnScroll() }, 300);
}

function animOnScroll() {

	document.querySelectorAll("._anim-item").forEach(item => {

		const heightItem = item.offsetHeight;
		const heightItemOffTopPage = item.getBoundingClientRect().top + window.pageYOffset;

		// коэфициэнт регулировки старта анимации по высоте от величины блока. Максимум - это 1 ед ====
		const partItemOffStartAnim = 0.8;

		const heightWindow = windowHeight();
		function windowHeight() {
			let height = document.documentElement.clientHeight || document.body.clientHeight;
			return height;
		}

		let pointAnim = heightWindow - heightItem * partItemOffStartAnim;
		if (heightItem > heightWindow) {
			pointAnim = heightWindow - heightWindow * partItemOffStartAnim;
		}

		let startAnim = heightItemOffTopPage - pointAnim;
		let endAnim = heightItemOffTopPage + heightItem;

		// запрет анимации при скролле сверху вниз
		//   && (item.getBoundingClientRect().top > heightWindow)
		if (window.pageYOffset > startAnim && window.pageYOffset < endAnim) {
			item.classList.add("_active");
		} else if (!item.classList.contains("_active_one") && (item.getBoundingClientRect().top > heightWindow)) {
			item.classList.remove("_active");
		}
	});
}

///=====================================================================================================================
/*
Треугольник возле ссылки при тач-экране сlass="touch-arrow"
*/


if (document.querySelectorAll("._touch_arrow").length > 0) {

	document.querySelectorAll("._touch_arrow").forEach(item => {
		item.addEventListener("click", function (e) {

			item.classList.toggle("_click_arrow");

			// присваиваем класс слудующему соседу дедушке клика
			item.parentElement.nextElementSibling.classList.toggle("_click_text");
			_slideToggle(item.parentElement.nextElementSibling);


		});
	})
}







//====SlideToggle ======================================================
//SlideToggle  if () {
//  _slideToggle(elem) 
// } 
//========================================================================
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================




// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();


