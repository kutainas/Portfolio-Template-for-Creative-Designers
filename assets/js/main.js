/**
 * ==========================================================================
 * PORTFOLIO - VANILLA JAVASCRIPT
 * Animaciones de scroll, navegación activa y comportamiento de UI
 * ==========================================================================
 *
 * CARACTERÍSTICAS:
 * - Animaciones de scroll usando IntersectionObserver (mejor rendimiento)
 * - Navegación con indicador visual animado
 * - Cursor personalizado con smooth follow
 * - Scroll suave accesible
 * - Respeta preferencias de reduced motion
 *
 * CUSTOMIZABLE: Configuraciones marcadas con "// CUSTOMIZABLE:" pueden
 * modificarse para ajustar comportamiento, duraciones y umbrales.
 */

// ==========================================================================
// CONFIGURATION
// ==========================================================================

// CUSTOMIZABLE: Opciones del IntersectionObserver
const observerOptions = {
	root: null,
	rootMargin: '0px 0px -10% 0px', // Activa cuando elemento entra 10% en viewport
	threshold: 0.1,                  // Trigger cuando 10% del elemento es visible
};

// ==========================================================================
// SCROLL ANIMATIONS
// ==========================================================================

/**
 * Callback para revelar elementos individuales al hacer scroll
 */
const revealOnScroll = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			// Deja de observar después de revelar (optimización)
			observer.unobserve(entry.target);
		}
	});
};

/**
 * Callback para revelar contenedores con animación escalonada
 */
const revealStaggered = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('revealed');
			observer.unobserve(entry.target);
		}
		}
	});
};

// Crear instancias de observers
const singleObserver = new IntersectionObserver(revealOnScroll, observerOptions);
const staggerObserver = new IntersectionObserver(revealStaggered, observerOptions);

// ==========================================================================
// INITIALIZATION
// ==========================================================================

/**
 * Inicializar animaciones de scroll
 * Respeta preferencia de reduced motion del usuario
 */
function initScrollAnimations() {
	// Verificar si el usuario prefiere animaciones reducidas
	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)'
	).matches;

	if (prefersReducedMotion) {
		// Mostrar todo inmediatamente sin animaciones
		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			el.classList.add('visible');
		});
		document.querySelectorAll('[data-reveal-stagger]').forEach((el) => {
			el.classList.add('revealed');
		});
		return;
	}

	// Observar elementos para animaciones
	document.querySelectorAll('.animate-on-scroll').forEach((el) => {
		singleObserver.observe(el);
	});

	document.querySelectorAll('[data-reveal-stagger]').forEach((el) => {
		staggerObserver.observe(el);
	});
}

// ==========================================================================
// 3. SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================================================

/**
 * Enhanced smooth scrolling for in-page navigation.
 *
 * 🎓 WHY NOT JUST USE CSS scroll-behavior: smooth?
 * CSS smooth scrolling works great, but it has limitations:
 * 1. Can't account for fixed header height
 * 2. Can't update URL without page jump
 * 3. Less control over timing/easing
 *
 * This JavaScript approach gives us full control while still being simple.
 *
 * 📐 THE PATTERN:
 * 1. Find all links starting with "#" (anchor links)
 * 2. On click, prevent default jump behavior
 * 3. Calculate target position accounting for fixed nav height
 * 4. Smoothly scroll to that position
 * 5. Update URL for bookmarking/sharing
 */
function updateHeaderHeight(){
	const header = document.querySelector('.site-header');
	const h = header ? header.offsetHeight : 0;
	// Update CSS var so CSS-based offsets (body padding) remain correct
	document.documentElement.style.setProperty('--header-h', `${h}px`);
	// Trigger a resize so other components (observers, underline) recalculate
	window.dispatchEvent(new Event('resize'));
	return h;
}

function initSmoothScroll() {
	// Select all anchor links (href starts with "#")
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', (e) => {
			const targetId = anchor.getAttribute('href');

			// Ignore links that are just "#" (often used for JavaScript triggers)
			if (targetId === '#') return;

			const target = document.querySelector(targetId);
			if (target) {
				// Prevent the default "jump to anchor" behavior
				e.preventDefault();

				/**
				 * CALCULATE SCROLL POSITION
				 *
				 * We need to account for the fixed site header height, otherwise
				 * the target would be hidden behind it.
				 */
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

// ==========================================================================
// 4. ACTIVE NAVIGATION STATE
// ==========================================================================

/**
 * Highlight the nav link corresponding to the currently visible section.
 *
 * 🎓 UX PRINCIPLE: LOCATION AWARENESS
 * Users should always know where they are in the page. Highlighting the
 * active nav link provides this feedback without requiring user action.
 *
 * 📐 THE APPROACH:
 * We use IntersectionObserver again! But with different rootMargin settings
 * that define a "detection zone" in the middle of the viewport.
 *
 * rootMargin: '-50% 0px -50% 0px' means:
 * - Shrink the detection area by 50% from top AND bottom
 * - This creates a narrow band in the middle of the viewport
 * - Only the section crossing this band is considered "active"
 */
function initActiveNav() {
	const navContainer = document.querySelector('.hero-nav');
	if (!navContainer) return;

	// Also initialize the theme observer that toggles header light/dark classes
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
				// Narrow detection band at the top of viewport (just under header)
				rootMargin: `-${headerH + 4}px 0px -${window.innerHeight - headerH - 4}px 0px`,
				threshold: 0,
			});
		}

		let themeObserver = createThemeObserver();
		themed.forEach((el) => themeObserver.observe(el));

		// Initial theme heuristic (element at header position)
		(function setInitial(){
			const headerH = header.offsetHeight || 0;
			const el = document.elementFromPoint(10, headerH + 2);
			const themedAncestor = el ? el.closest('[data-nav-theme]') : null;
			const theme = themedAncestor ? themedAncestor.getAttribute('data-nav-theme') : 'light';
			header.classList.remove('nav-on-light','nav-on-dark');
			header.classList.add(`nav-on-${theme}`);
		})();

		// Recreate observer on resize
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

	// Shared function to move underline under any link
	function setActiveLink(link) {
		links.forEach((l) => l.classList.remove('is-active'));
		if (!link) return;
		link.classList.add('is-active');

		if (!underline) return;

		// Measure text and container and compute left relative to container
		const containerRect = navContainer.getBoundingClientRect();
		const textEl = link.querySelector('.nav-text') || link;
		const textRect = textEl.getBoundingClientRect();
		const offset = Math.round(textRect.left - containerRect.left + navContainer.scrollLeft);
		const width = Math.round(textRect.width);

		// Apply measured width & transform. Using translateX keeps layout stable.
		underline.style.width = `${width}px`;
		underline.style.transform = `translateX(${offset}px)`;

		// If user prefers reduced motion, jump instantly (no transition)
		if (prefersReducedMotion) {
			underline.style.transition = 'none';
			// Force a reflow to ensure the style takes effect then remove none so
			// future interactions (if motion allowed) will animate.
			underline.getBoundingClientRect();
			underline.style.transition = '';
		}
	}

	// Page-based active state: detect current page and set active link
	function setActiveNavByPage() {
		const pathname = location.pathname;
		const currentPage = pathname.split('/').pop() || 'index.html';
		
		// Normalize empty string to index.html
		const normalizedPage = currentPage === '' ? 'index.html' : currentPage;
		
		// Find the link that matches current page
		let matchedLink = null;
		links.forEach((link) => {
			const href = link.getAttribute('href') || '';
			// Match if href ends with the current page name (ignore query/hash)
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

	// Check if we're on index.html and have sections to observe
	const isIndexPage = location.pathname.endsWith('index.html') || 
	                     location.pathname === '/' || 
	                     location.pathname.endsWith('/');
	const hasSections = sections.length > 0;

	if (isIndexPage && hasSections) {
		// INDEX PAGE: Use scroll-based IntersectionObserver
		// compute nav height and use it when building the observer rootMargin so
		// intersections account for the sticky header height (prevents sections
		// being hidden under the header)
		function createObserver() {
			// Use the fixed site header height when computing rootMargin so the
			// 'active' detection accounts for the header covering part of the viewport.
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

		// Position the underline under INICIO by default
		const startLink = navContainer.querySelector('.nav-link[href="#inicio"]') || links[0];
		setActiveLink(startLink);

		// Recalculate observer and underline on resize (debounced)
		let resizeTimer = null;
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				// Recreate observer to use updated navHeight
				navObserver.disconnect();
				navObserver = createObserver();
				sections.forEach((section) => navObserver.observe(section));

				// Reposition underline for the active link
				const active = navContainer.querySelector('.nav-link.is-active') || startLink;
				setActiveLink(active);
			}, 120);
		});
	} else {
		// OTHER PAGES: Use page-based active state
		setActiveNavByPage();

		// Recalculate underline position on resize
		let resizeTimer = null;
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				const active = navContainer.querySelector('.nav-link.is-active');
				if (active) setActiveLink(active);
			}, 120);
		});
	}

	// Clicking a nav link should move the underline immediately
	links.forEach((link) => {
		link.addEventListener('click', () => setActiveLink(link));
	});
}

// ==========================================================================
// 5. INITIALIZATION
// ==========================================================================

/**
 * DOMContentLoaded: The safe time to run DOM-manipulating JavaScript.
 *
 * 🎓 WHY DOMContentLoaded?
 * - Fires when HTML is fully parsed (DOM is ready)
 * - Doesn't wait for images/stylesheets to load (that's 'load' event)
 * - Safe to query and manipulate DOM elements
 *
 * If your script is in <head> without 'defer', this is essential.
 * If your script is at end of <body> or has 'defer', it's optional but good practice.
 */
document.addEventListener('DOMContentLoaded', () => {
	// Ensure CSS variable for header height is accurate before other init
	updateHeaderHeight();
	initScrollAnimations();
	initSmoothScroll();
	initActiveNav();

	// Recompute header height after fonts/layout settle
	setTimeout(updateHeaderHeight, 250);

	// Keep header height accurate on resize (debounced)
	let headerResizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(headerResizeTimer);
		headerResizeTimer = setTimeout(updateHeaderHeight, 150);
	});

	console.log('🚀 Grade 1 Demo: Vanilla scroll animations initialized');

	// Services accordion behavior (only one service open at a time)
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

	// WhatsApp copy-to-clipboard handler (uses Clipboard API)
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

	// State
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

// ==========================================================================
// 6. CLEANUP (FOR SPA ENVIRONMENTS)
// ==========================================================================

/**
 * Cleanup function for Single Page Application (SPA) routing.
 *
 * 🎓 WHY IS CLEANUP IMPORTANT?
 * In SPAs (React, Vue, etc.), pages don't fully reload when navigating.
 * If you don't disconnect observers, they keep watching elements that
 * may have been removed, causing memory leaks and bugs.
 *
 * 📐 WHEN TO CALL THIS:
 * - Before navigating away from this page in an SPA
 * - In React: useEffect cleanup function
 * - In Vue: onUnmounted lifecycle hook
 *
 * For traditional multi-page sites, this isn't needed (page reload cleans up).
 */
window.cleanupScrollObservers = () => {
	singleObserver.disconnect();  // Stop observing all elements
	staggerObserver.disconnect();
	console.log('🧹 Observers cleaned up');
};