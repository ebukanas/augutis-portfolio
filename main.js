const header = document.querySelector('[data-header]')
const sections = [...document.querySelectorAll('[data-section]')]
const logo = document.querySelector('.logo')
const email = document.querySelector('.contact span:first-child')
const phone = document.querySelector('.contact span:last-child')
const workHide = document.querySelector('.whitespace')
const hamburgerMenu = document.querySelectorAll('.line')

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

const updateColors = (target) => {
	const theme = target.dataset.section
	header.setAttribute('data-theme', theme)
	email.setAttribute('data-email', theme)
	phone.setAttribute('data-phone', theme)
	logo.setAttribute('data-logo', theme)
	workHide.setAttribute('data-hide', theme);
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