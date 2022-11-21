const header = document.querySelector('[data-header]')
const sections = [...document.querySelectorAll('[data-section]')]
const logo = document.querySelector('.logo')
const email = document.querySelectorAll('.email-logo')
const phone = document.querySelectorAll('.phone-logo')
const workHide = document.querySelector('.whitespace')
const hamburgerMenu = document.querySelectorAll('.line')
const mobile_nav_menu = document.querySelector('#menu')
const mobile_nav_menu_toggle = document.querySelectorAll('.menu-lines')
const mobile_nav_menu_toggle_checked = document.querySelector('#menuToggle input:checked ~ span');



//mobile responsiveness height hack
let timeoutId = null;
const documentHeight = () => {
  clearTimeout(timeoutId); // avoid execution of previous timeouts
  timeoutId = setTimeout(() => {
   const doc = document.documentElement;
   doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }, 200);
};
window.addEventListener('resize', documentHeight);
documentHeight();
// ----


let prevYPosition = 0
let direction = 'up'

const options = {
	rootMargin: `${header.offsetHeight * -1}px`,
	threshold: 0
}

const getTargetSection = (entry) => {
	const index = sections.findIndex((section) => section == entry.target)

	if (index >= sections.length - 1) {
	 return entry.target
	} else {
	 return sections[index + 1]
	}
}

//sets the default header colors to white on load
window.addEventListener("load", () => {
	logo.setAttribute('data-logo', "purple")
	mobile_nav_menu_toggle.forEach((obj) => {
		obj.setAttribute('data-mobile_menu_lines', "purple");
	})
})


const updateColors = (target) => {
	const theme = target.dataset.section
	header.setAttribute('data-theme', theme)
	logo.setAttribute('data-logo', theme)
	workHide.setAttribute('data-hide', theme)
	mobile_nav_menu.setAttribute('data-mobile_nav_menu', theme)

	mobile_nav_menu_toggle.forEach((obj) => {
		obj.setAttribute('data-mobile_menu_lines', theme);
	})

	email.forEach((obj) => {
		obj.setAttribute('data-email', theme);
	})

	phone.forEach((obj) => {
		obj.setAttribute('data-phone', theme);
	})

	hamburgerMenu.forEach((obj) => {
		obj.setAttribute('data-nav', theme);
	})
	
  console.log('background color is ' + theme);
}

const shouldUpdate = (entry) => {
	if (direction === 'down' && !entry.isIntersecting) {
		return true
	}

	if (direction === 'up' && entry.isIntersecting) {
		return true
	}

	return false
}


const onIntersect = (entries) => {
	entries.forEach((entry) => {
		if (window.scrollY > prevYPosition) {
			direction = 'down'
		} else {
			direction = 'up'
		}

		prevYPosition = window.scrollY

		const target = direction === 'down' ? getTargetSection(entry) : entry.target

		if (shouldUpdate(entry)) {
			updateColors(target)
		}
	})
}

const observer = new IntersectionObserver(onIntersect, options)

sections.forEach((section) => {
	observer.observe(section)
})