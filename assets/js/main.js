const observerOptions = {
	root: null,
	rootMargin: '0px 0px -10% 0px',
	threshold: 0.1,
};
const revealOnScroll = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			observer.unobserve(entry.target);
		}
	});
};

const revealStaggered = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('revealed');
			observer.unobserve(entry.target);
		}
	});
};

const singleObserver = new IntersectionObserver(revealOnScroll, observerOptions);
const staggerObserver = new IntersectionObserver(revealStaggered, observerOptions);

function initScrollAnimations() {
	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches;

	if (prefersReducedMotion) {
		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			el.classList.add('visible');
		});
		document.querySelectorAll('[data-reveal-stagger]').forEach((el) => {
			el.classList.add('revealed');
		});
		return;
	}

	document.querySelectorAll('.animate-on-scroll').forEach((el) => {
		singleObserver.observe(el);
	});

	document.querySelectorAll('[data-reveal-stagger]').forEach((el) => {
		staggerObserver.observe(el);
	});
}

function updateHeaderHeight(){
	const header = document.querySelector('.site-header');
	const h = header ? header.offsetHeight : 0;
	document.documentElement.style.setProperty('--header-h', `${h}px`);
	window.dispatchEvent(new Event('resize'));
	return h;
}

function initSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', (e) => {
			const targetId = anchor.getAttribute('href');

			if (targetId === '#') return;

			const target = document.querySelector(targetId);
			if (target) {
				e.preventDefault();

				const headerH = document.querySelector('.site-header')?.offsetHeight || 0;
				const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerH;

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth',
				});

				history.pushState(null, '', targetId);
			}
		});
	});
}

function initActiveNav() {
	const navContainer = document.querySelector('.hero-nav');
	if (!navContainer) return;

	function initNavThemeObserver(){
		const header = document.querySelector('.site-header');
		if (!header) return;
		const themed = document.querySelectorAll('[data-nav-theme]');

		function createThemeObserver(){
			const headerH = header.offsetHeight || 0;
			return new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting){
						const theme = entry.target.getAttribute('data-nav-theme') || 'light';
						header.classList.remove('nav-on-light','nav-on-dark');
						header.classList.add(`nav-on-${theme}`);
					}
				});
			}, {
				root: null,
				rootMargin: `-${headerH + 4}px 0px -${window.innerHeight - headerH - 4}px 0px`,
				threshold: 0,
			});
		}

		let themeObserver = createThemeObserver();
		themed.forEach((el) => themeObserver.observe(el));

		(function setInitial(){
			const headerH = header.offsetHeight || 0;
			const el = document.elementFromPoint(10, headerH + 2);
			const themedAncestor = el ? el.closest('[data-nav-theme]') : null;
			const theme = themedAncestor ? themedAncestor.getAttribute('data-nav-theme') : 'light';
			header.classList.remove('nav-on-light','nav-on-dark');
			header.classList.add(`nav-on-${theme}`);
		})();

		let tResize = null;
		window.addEventListener('resize', () => {
			clearTimeout(tResize);
			tResize = setTimeout(() => {
				themeObserver.disconnect();
				themeObserver = createThemeObserver();
				themed.forEach((el) => themeObserver.observe(el));
			}, 150);
		});
	}

	initNavThemeObserver();

	const links = navContainer.querySelectorAll('.nav-link');
	const underline = navContainer.querySelector('.nav-underline');
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const sections = document.querySelectorAll('#inicio, #servicios, #proyectos, #contacto');

	function setActiveLink(link) {
		links.forEach((l) => l.classList.remove('is-active'));
		if (!link) return;
		link.classList.add('is-active');

		if (!underline) return;

		const containerRect = navContainer.getBoundingClientRect();
		const textEl = link.querySelector('.nav-text') || link;
		const textRect = textEl.getBoundingClientRect();
		const offset = Math.round(textRect.left - containerRect.left + navContainer.scrollLeft);
		const width = Math.round(textRect.width);

		underline.style.width = `${width}px`;
		underline.style.transform = `translateX(${offset}px)`;

		if (prefersReducedMotion) {
			underline.style.transition = 'none';
			underline.getBoundingClientRect();
			underline.style.transition = '';
		}
	}

	function setActiveNavByPage() {
		const pathname = location.pathname;
		const currentPage = pathname.split('/').pop() || 'index.html';
		
		const normalizedPage = currentPage === '' ? 'index.html' : currentPage;
		
		let matchedLink = null;
		links.forEach((link) => {
			const href = link.getAttribute('href') || '';
			const hrefPage = href.split('?')[0].split('#')[0].split('/').pop();
			if (hrefPage === normalizedPage || 
			    (normalizedPage === 'index.html' && href.startsWith('#'))) {
				matchedLink = link;
			}
		});

		if (matchedLink) {
			setActiveLink(matchedLink);
		}
	}

	const isIndexPage = location.pathname.endsWith('index.html') || 
	                     location.pathname === '/' || 
	                     location.pathname.endsWith('/');
	const hasSections = sections.length > 0;

	if (isIndexPage && hasSections) {
		function createObserver() {
			const headerH = document.querySelector('.site-header')?.offsetHeight || navContainer.offsetHeight || 0;
			const options = {
				root: null,
				rootMargin: `-${Math.round(headerH + 6)}px 0px -50% 0px`,
				threshold: 0,
			};

			return new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const id = entry.target.getAttribute('id');
						const link = navContainer.querySelector(`.nav-link[href="#${id}"]`);
						setActiveLink(link);
					}
				});
			}, options);
		}

		let navObserver = createObserver();
		sections.forEach((section) => navObserver.observe(section));

		const startLink = navContainer.querySelector('.nav-link[href="#inicio"]') || links[0];
		setActiveLink(startLink);

		let resizeTimer = null;
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				navObserver.disconnect();
				navObserver = createObserver();
				sections.forEach((section) => navObserver.observe(section));

				const active = navContainer.querySelector('.nav-link.is-active') || startLink;
				setActiveLink(active);
			}, 120);
		});
	} else {
		setActiveNavByPage();

		let resizeTimer = null;
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				const active = navContainer.querySelector('.nav-link.is-active');
				if (active) setActiveLink(active);
			}, 120);
		});
	}

	links.forEach((link) => {
		link.addEventListener('click', () => setActiveLink(link));
	});
}

document.addEventListener('DOMContentLoaded', () => {
	updateHeaderHeight();
	initScrollAnimations();
	initSmoothScroll();
	initActiveNav();

	setTimeout(updateHeaderHeight, 250);

	let headerResizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(headerResizeTimer);
		headerResizeTimer = setTimeout(updateHeaderHeight, 150);
	});

	console.log('🚀 Grade 1 Demo: Vanilla scroll animations initialized');

	const serviceDetails = document.querySelectorAll('.service');
	serviceDetails.forEach(detail => {
		detail.addEventListener('toggle', () => {
			if (detail.open) {
				serviceDetails.forEach(other => {
					if (other !== detail && other.open) {
						other.removeAttribute('open');
					}
				});
			}
		});
	});

	const copyBtn = document.getElementById('copyWhatsAppBtn');
	if (copyBtn) {
		copyBtn.addEventListener('click', async () => {
			try {
				await navigator.clipboard.writeText('+34 689 57 18 25');
				const previous = copyBtn.textContent;
				copyBtn.textContent = 'Copiado';
				copyBtn.classList.add('is-copied');
				copyBtn.setAttribute('aria-pressed', 'true');
				setTimeout(() => {
					copyBtn.textContent = previous;
					copyBtn.classList.remove('is-copied');
					copyBtn.removeAttribute('aria-pressed');
				}, 1500);
			} catch (err) {
				console.warn('Clipboard copy failed', err);
			}
		});
	}
});

(function () {
	const follower = document.querySelector('.cursor-follower');
	if (!follower) return;

	const BASE_DIAM = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cf-base-size')) || 40;
	const DEFAULT_GROW_SCALE = 1.6;
	const NAV_GROW_SCALE = 2.5;
	const BUTTON_GROW_SCALE = 2.2;
	const LERP_POS = 0.14;
	const LERP_SCALE = Math.min(0.22, LERP_POS + 0.06);

	let targetX = -9999, targetY = -9999;
	let currentX = -9999, currentY = -9999;
	let targetScale = 1, currentScale = 1;
	let visible = false;

	const CUSTOM_ATTR = '[data-cursor-grow]';

	const lerp = (a, b, t) => a + (b - a) * t;

	function resolveScaleForElement(el){
		if (!el) return 1;
		const custom = el.closest(CUSTOM_ATTR);
		if (custom){
			const v = custom.getAttribute('data-cursor-grow');
			const parsed = parseFloat(v);
			if (!Number.isNaN(parsed) && parsed > 0) return parsed;
			return DEFAULT_GROW_SCALE;
		}
		if (el.closest('nav a, .nav-links a')) return NAV_GROW_SCALE;
		if (el.closest('button, [role="button"], .btn')) return BUTTON_GROW_SCALE;
		if (el.closest('a, input, textarea, select, label')) return DEFAULT_GROW_SCALE;
		return 1;
	}

	function onMouseMove(e){
		targetX = e.clientX;
		targetY = e.clientY;
		if (!visible){ follower.classList.add('is-visible'); visible = true; }
		const el = document.elementFromPoint(targetX, targetY);
		targetScale = resolveScaleForElement(el);
	}

	function onTouchMove(e){
		if (!e.touches || e.touches.length === 0) return;
		const t = e.touches[0];
		targetX = t.clientX; targetY = t.clientY; targetScale = 1;
		if (!visible){ follower.classList.add('is-visible'); visible = true; }
	}

	function animate(){
		currentX = lerp(currentX, targetX, LERP_POS);
		currentY = lerp(currentY, targetY, LERP_POS);
		currentScale = lerp(currentScale, targetScale, LERP_SCALE);
		follower.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(${currentScale})`;
		requestAnimationFrame(animate);
	}

	window.addEventListener('mousemove', onMouseMove, { passive: true });
	window.addEventListener('touchmove', onTouchMove, { passive: true });
	requestAnimationFrame(animate);

	window.cleanupCursorFollower = function(){
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('touchmove', onTouchMove);
	};
})();

window.cleanupScrollObservers = () => {
	singleObserver.disconnect();
	staggerObserver.disconnect();
	console.log('🧹 Observers cleaned up');
};