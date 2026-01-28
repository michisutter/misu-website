// === Preload project images (returns a Promise).
// Preloads up to `count` images (default: all). Resolves early on timeout.
function preloadProjectImages(count = Infinity, timeoutMs = 3000) {
    return new Promise((resolve) => {
        if (!window.projects || !Array.isArray(window.projects)) return resolve([]);
        const list = window.projects.slice(0, count === Infinity ? window.projects.length : count);
        const urls = list.map(p => p.image).filter(Boolean);
        if (urls.length === 0) return resolve([]);

        const loaders = urls.map(src => new Promise(res => {
            const img = new Image();
            img.onload = () => res({ src, status: 'ok' });
            img.onerror = () => res({ src, status: 'error' });
            img.src = src;
        }));

        const all = Promise.all(loaders);
        const timer = new Promise(res => setTimeout(res, timeoutMs, 'timeout'));

        Promise.race([all, timer]).then(result => {
            // If timer won, still resolve (we don't want to block); otherwise resolve when done.
            resolve(urls);
        }).catch(() => resolve(urls));
    });
}

// Defer non-critical loads until user interaction or 3s fallback.
let __deferredStarted = false;
function startDeferredLoads() {
    if (__deferredStarted) return;
    __deferredStarted = true;

    // 1) Swap network images (data-src -> src)
    try {
        const deferredImgs = document.querySelectorAll('img[data-src]');
        deferredImgs.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.setAttribute('src', src);
                img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
                img.setAttribute('decoding', 'async');
                img.removeAttribute('data-src');
            }
        });
    } catch (e) {
        // ignore
    }

    // 2) Preload and build the projects stack (first 5)
    preloadProjectImages(5, 3000).then(() => {
        if (typeof buildProjectsStack === 'function') buildProjectsStack();
    }).catch(() => {
        if (typeof buildProjectsStack === 'function') buildProjectsStack();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    // Install one-time interaction listeners
    const events = ['scroll', 'wheel', 'touchstart', 'keydown'];
    const handler = (e) => {
        startDeferredLoads();
        events.forEach(ev => window.removeEventListener(ev, handler, { passive: true }));
        clearTimeout(fallbackTimer);
    };

    events.forEach(ev => window.addEventListener(ev, handler, { passive: true }));

    // Fallback: if no interaction within 3s, start loads
    const fallbackTimer = setTimeout(() => startDeferredLoads(), 3000);
});

// ============================================
// Check if projects.js loaded successfully
// ============================================
if (typeof projects === 'undefined' || !Array.isArray(projects)) {
    console.error('❌ ERROR: projects.js failed to load or projects array is missing.');
    console.error('Make sure projects.js is loaded before main.js in your HTML.');

    // Optionally show a user-friendly message
    document.addEventListener('DOMContentLoaded', () => {
        const projectSections = document.querySelectorAll('#projects-stack, #carousel');
        projectSections.forEach(section => {
            if (section) {
                section.innerHTML = '<p style="text-align:center; padding:2rem; color:#842e60;">Projects could not be loaded. Please refresh the page.</p>';
            }
        });
    });
}

const customCursor = document.getElementById('custom-cursor');
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';

        // Check if cursor is over clickable element
        const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
        if (elementUnderCursor) {
            const clickable = elementUnderCursor.closest('a, button, .project-card, .project-stack-card, .kompetenz-toggle, [onclick], #crestron-badge, #loudspeaker-badge, #scroll-circle, .carousel-item, .cursor-pointer, #prev-btn, #next-btn');
            if (clickable) {
                customCursor.classList.add('cursor-hover');
            } else {
                customCursor.classList.remove('cursor-hover');
            }
        }
    });
}

// ============================================
// iOS-safe scroll lock (prevents background scroll/pan)
// ============================================
let __scrollY = 0;

function lockScroll() {
    __scrollY = window.scrollY || 0;
    document.body.classList.add('no-scroll');

    // Only use position fixed trick on mobile
    if (window.innerWidth < 1024) {
        document.body.style.top = `-${__scrollY}px`;
    }
}

function unlockScroll() {
    // Only restore scroll on mobile
    if (window.innerWidth < 1024) {
        const top = document.body.style.top;
        const y = top ? Math.abs(parseInt(top, 10)) : __scrollY;
        
        // FIRST: Remove the fixed positioning
        document.body.classList.remove('no-scroll');
        document.body.style.top = '';
        
        // THEN: Restore scroll position
        const prevScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, y);
        document.documentElement.style.scrollBehavior = prevScrollBehavior || '';
    } else {
        document.body.classList.remove('no-scroll');
    }
}

// rAF throttle helper: ensures a callback runs at most once per animation frame
function rafThrottle(fn) {
    let ticking = false;
    return function (...args) {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                fn.apply(this, args);
                ticking = false;
            });
        }
    };
}

// Fullscreen menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const fullscreenMenu = document.getElementById('fullscreen-menu');
const menuLinks = document.querySelectorAll('.menu-link');

if (menuToggle && fullscreenMenu) {
    menuToggle.addEventListener('click', () => {
        openMenu();
    });
}

if (menuClose && fullscreenMenu) {
    menuClose.addEventListener('click', () => {
        closeMenu();
    });
}

function openMenu() {
    if (!fullscreenMenu) return;
    lockScroll();
    fullscreenMenu.classList.add('menu-open');
    // Change cursor to white for menu
    if (customCursor) {
        customCursor.style.backgroundColor = '#ffffff';
    }
}

function closeMenu() {
    if (!fullscreenMenu) return;
    fullscreenMenu.classList.remove('menu-open');
    fullscreenMenu.classList.add('menu-closing');

    // Change cursor back to misu-mint
    if (customCursor) {
        customCursor.style.backgroundColor = '#59d49b';
    }

    // Wait for animation, then unlock
    setTimeout(() => {
        fullscreenMenu.classList.remove('menu-closing');
        unlockScroll();
    }, 400);
}

// Close menu when clicking a link (and scroll AFTER unlock)
if (menuLinks.length > 0) {
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only intercept in-page anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();

                // Save the target BEFORE closing menu
                const target = document.querySelector(href);

                closeMenu(); // unlockScroll() happens inside closeMenu after 400ms

                // Scroll AFTER the menu close animation + unlock has finished
                setTimeout(() => {
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 420); // slightly > 400ms to be safe
            } else {
                // external links behave normally
                closeMenu();
            }
        });
    });
}


// Rotating circle scroll to footer
const scrollCircle = document.getElementById('scroll-circle');
if (scrollCircle) {
    scrollCircle.addEventListener('click', () => {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Reveal the circle only after the user scrolls past the hero section
    // (i.e. when the next section after #home becomes visible). This keeps
    // the circle out of LCP and only shows it once the page's main hero
    // animation/content has been passed.
    try {
        const sections = Array.from(document.querySelectorAll('section'));
        const homeIndex = sections.findIndex(s => s.id === 'home');
        let revealTarget = null;

        if (homeIndex >= 0 && homeIndex < sections.length - 1) {
            revealTarget = sections[homeIndex + 1];
        }

        if (revealTarget) {
            const sectionObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        scrollCircle.classList.add('scroll-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            sectionObserver.observe(revealTarget);
        } else {
            // Fallback: reveal after a short delay (hero animation finished)
            setTimeout(() => scrollCircle.classList.add('scroll-visible'), 2200);
        }
    } catch (err) {
        scrollCircle.classList.add('scroll-visible');
    }

    // Move circle left when reaching footer
    const footer = document.querySelector('footer');
    if (footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrollCircle.classList.add('at-footer');
                } else {
                    scrollCircle.classList.remove('at-footer');
                }
            });
        }, {
            threshold: 0.5
        });
        observer.observe(footer);
    }

    // Mobile: Ensure scroll-circle hides when leaving footer after interaction
    const isMobile = window.innerWidth <= 640;
    if (isMobile) {
        const handleScrollCircle = rafThrottle(() => {
            if (!footer) return;
            const footerRect = footer.getBoundingClientRect();
            const inView = footerRect.top < window.innerHeight && footerRect.bottom > 0;
            if (!inView) {
                scrollCircle.classList.remove('at-footer');
            }
        });
        window.addEventListener('scroll', handleScrollCircle, { passive: true });
    }
}

// Hero scroll indicator (down-arrow) -> scroll to section after #home
const heroScrollIndicator = document.getElementById('hero-scroll-indicator');
if (heroScrollIndicator) {
    heroScrollIndicator.addEventListener('click', () => {
        const sections = Array.from(document.querySelectorAll('section'));
        const homeIndex = sections.findIndex(s => s.id === 'home');
        let target = null;
        if (homeIndex >= 0 && homeIndex < sections.length - 1) {
            target = sections[homeIndex + 1];
        }
        if (!target) target = document.querySelector('footer');
        if (target) {
            const targetTop = target.offsetTop;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
    });
}

// Referenzen Carousel Section
const carousel = document.getElementById('carousel');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const dotsContainer = document.getElementById('carousel-dots');

// Check if all required elements exist AND projects data is available
if (typeof projects !== 'undefined' && carousel && modal && modalContent && closeModal && prevBtn && nextBtn && dotsContainer) {
    // Load projects into carousel - ONLY PROJECTS 6-10
    const carouselProjects = projects.slice(5); // Get projects from index 5 onwards

    let currentPage = 0;
    let itemsPerPage = 3;
    let totalPages = Math.ceil(carouselProjects.length / itemsPerPage);

    // Function to get current items per page based on screen size
    function getItemsPerPage() {
        if (window.innerWidth < 768) return 1;      // Mobile
        if (window.innerWidth < 1024) return 2;     // Tablet
        return 3;                                    // Desktop
    }

    // Update carousel configuration on resize
    function updateCarouselConfig() {
        itemsPerPage = getItemsPerPage();
        totalPages = Math.ceil(carouselProjects.length / itemsPerPage);

        // Adjust current page if it's now out of bounds
        if (currentPage >= totalPages) {
            currentPage = totalPages - 1;
        }

        // Recreate dots
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'w-3 h-3 rounded-full transition-colors';
            dot.addEventListener('click', () => goToPage(i));
            dotsContainer.appendChild(dot);
        }

        updateCarousel();
    }

    // Load projects into carousel
    carouselProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3';
        projectCard.innerHTML = `
        <div class="cursor-pointer group">
            <div class="relative aspect-square overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                 <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" width="600" height="600"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <h3 class="text-xl md:text-2xl font-semibold text-white">${project.title}</h3>
                </div>
            </div>
        </div>
    `;

        projectCard.addEventListener('click', () => openModal(project));
        carousel.appendChild(projectCard);
    });

    // Initialize carousel
    updateCarouselConfig();

    // Listen for window resize to adjust carousel
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarouselConfig();
        }, 200);
    });

    // Update carousel position
    function updateCarousel() {
        const offset = currentPage * itemsPerPage * (100 / itemsPerPage);
        carousel.style.transform = `translateX(-${offset}%)`;

        // Update dots
        const dots = dotsContainer.children;
        for (let i = 0; i < dots.length; i++) {
            if (i === currentPage) {
                dots[i].className = 'w-3 h-3 rounded-full transition-colors bg-misu-purple';
            } else {
                dots[i].className = 'w-3 h-3 rounded-full transition-colors bg-gray-300';
            }
        }

        // Update button states
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
        prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
    }

    // Navigation functions
    function goToPage(page) {
        currentPage = page;
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateCarousel();
        }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentPage < totalPages - 1) {
                // Swiped left - go to next
                currentPage++;
                updateCarousel();
            } else if (diff < 0 && currentPage > 0) {
                // Swiped right - go to previous
                currentPage--;
                updateCarousel();
            }
        }
    }

    // Initialize
    updateCarousel();

} else {
    console.warn('Carousel not initialized: missing elements or projects data');
}

// Open modal with project details
function openModal(project) {
    modalContent.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="w-full h-64 md:h-96 object-cover">
        <div class="p-8">
            <h2 class="text-3xl md:text-4xl font-semibold text-misu-purple mb-4">${project.title}</h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed">${project.description}</p>
            ${project.more ? `<div class="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">${project.more}</div>` : ''}
            <div class="flex flex-wrap gap-3 mt-6">
                ${project.tags.map(tag => {
        // Check if tag is an object with text and link
        if (typeof tag === 'object' && tag.text && tag.link) {
            return `
                            <a href="${tag.link}" target="_blank" class="px-4 py-2 bg-misu-mint/20 text-misu-purple text-sm font-normal hover:bg-misu-mint/40 transition-colors">
                                ${tag.text}
                            </a>
                        `;
        } else {
            // Plain text tag
            return `
                            <span class="px-4 py-2 bg-misu-mint/20 text-misu-purple text-sm font-normal">
                                ${tag}
                            </span>
                        `;
        }
    }).join('')}
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
    lockScroll();
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    unlockScroll();
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        unlockScroll();
    }
});

// Global ESC key handler for all modals and popups
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Project modal
        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            unlockScroll();
        }
        // Impressum modal
        if (impressumModal && !impressumModal.classList.contains('hidden')) {
            impressumModal.classList.add('hidden');
            unlockScroll();
        }
        // Datenschutz modal
        if (datenschutzModal && !datenschutzModal.classList.contains('hidden')) {
            datenschutzModal.classList.add('hidden');
            unlockScroll();
        }
        // Crestron badge popup
        if (typeof isPopupOpen !== 'undefined' && isPopupOpen && crestronPopup && crestronPopup.classList.contains('open')) {
            isPopupOpen = false;
            crestronPopup.classList.remove('open');
        }
        // Loudspeaker badge popup
        if (typeof isLoudspeakerPopupOpen !== 'undefined' && isLoudspeakerPopupOpen && loudspeakerPopup && loudspeakerPopup.classList.contains('open')) {
            isLoudspeakerPopupOpen = false;
            loudspeakerPopup.classList.remove('open');
        }
    }
});

// Impressum Modal
const impressumLinks = document.querySelectorAll('a[href="#impressum"]');
const impressumModal = document.getElementById('impressum-modal');
const closeImpressum = document.getElementById('close-impressum');

impressumLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        impressumModal.classList.remove('hidden');
        lockScroll();
    });
});

closeImpressum.addEventListener('click', () => {
    impressumModal.classList.add('hidden');
    unlockScroll();
});

impressumModal.addEventListener('click', (e) => {
    if (e.target === impressumModal) {
        impressumModal.classList.add('hidden');
        unlockScroll();
    }
});

// Datenschutz Modal
const datenschutzLinks = document.querySelectorAll('a[href="#datenschutz"]');
const datenschutzModal = document.getElementById('datenschutz-modal');
const closeDatenschutz = document.getElementById('close-datenschutz');

datenschutzLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        datenschutzModal.classList.remove('hidden');
        lockScroll();
    });
});

closeDatenschutz.addEventListener('click', () => {
    datenschutzModal.classList.add('hidden');
    unlockScroll();
});

datenschutzModal.addEventListener('click', (e) => {
    if (e.target === datenschutzModal) {
        datenschutzModal.classList.add('hidden');
        unlockScroll();
    }
});


// ============================================
// STACKED SCROLL-REVEAL REFERENCES
// ============================================

const projectsStack = document.getElementById('projects-stack');

function buildProjectsStack() {
    if (!projectsStack || typeof projects === 'undefined' || !Array.isArray(projects)) return;
    // Clear any existing content to avoid duplicates
    projectsStack.innerHTML = '';

    // Create stacked cards - ONLY FIRST 5 PROJECTS
    const stackProjects = projects.slice(0, 5);
    stackProjects.forEach((project, index) => {
        const stackCard = document.createElement('div');
        stackCard.className = 'project-stack-card';
        stackCard.dataset.index = index; // Store index for rotation calculation
        stackCard.innerHTML = `
            <div class="project-stack-inner">
                <img src="${project.image}" alt="${project.title}" width="600" height="600" decoding="async">
                <div class="project-stack-overlay">
                    <h3 class="project-stack-title">${project.title}</h3>
                </div>
            </div>
        `;

        // Click to open modal
        stackCard.addEventListener('click', () => openModal(project));
        projectsStack.appendChild(stackCard);
    });

    // Scroll-based rotation and reveal
    const stackCards = projectsStack.querySelectorAll('.project-stack-card');

    function updateStackOnScroll() {
        stackCards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const cardTop = cardRect.top;

            // Calculate progress (0 = entering viewport, 1 = fully visible)
            const scrollProgress = Math.max(0, Math.min(1, (windowHeight - cardTop) / windowHeight));

            // Determine target angle (odd = -12deg, even = +12deg)
            const isOdd = index % 2 === 0;
            const targetAngle = isOdd ? -12 : 12;
            const startAngle = -targetAngle; // Start from opposite

            // Calculate current angle based on scroll progress
            const currentAngle = startAngle + (targetAngle - startAngle) * scrollProgress;

            // Apply transforms
            const inner = card.querySelector('.project-stack-inner');
            if (inner) inner.style.transform = `rotate(${currentAngle}deg)`;

            // Fade in/out based on visibility
            if (scrollProgress > 0.2) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }

    // Run on scroll and initial load (throttled)
    window.addEventListener('scroll', rafThrottle(updateStackOnScroll), { passive: true });
    updateStackOnScroll();
}

// Scroll-reveal animation for new Kompetenzen section
const kompetenzItems = document.querySelectorAll('.kompetenz-item');

if (kompetenzItems.length > 0) {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const kompetenzObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    kompetenzItems.forEach(item => {
        kompetenzObserver.observe(item);
    });
}

// Crestron Badge - Position in Programmierung section
const crestronBadge = document.getElementById('crestron-badge');
const crestronPopup = document.getElementById('crestron-popup');
const closeCrestronPopup = document.getElementById('close-crestron-popup');
let isPopupOpen = false;

// Ensure element is visible in viewport when opened
function ensureInView(el) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
        const target = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
        window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
    }
}

// Find the Programmierung wrapper and move badge and popup into it
const programmierungWrapper = document.querySelector('.programmierung-wrapper');
if (programmierungWrapper && crestronBadge) {
    // Insert badge at the beginning of the wrapper (before the h3)
    programmierungWrapper.insertBefore(crestronBadge, programmierungWrapper.firstChild);
    // Also append popup to wrapper so it's positioned relative to it
    if (crestronPopup) {
        programmierungWrapper.appendChild(crestronPopup);
    }
}

// Find the Programmierung section (4th kompetenz-item) to monitor scrolling
const programmierungSection = document.querySelectorAll('.kompetenz-item')[3]; // Index 3 = 4th item

if (programmierungSection) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start wiggling animation when section comes into view
                crestronBadge.classList.add('wiggling');
            } else {
                // Stop wiggling when out of view
                crestronBadge.classList.remove('wiggling');
                // Close popup when scrolling away from section
                if (isPopupOpen) {
                    isPopupOpen = false;
                    crestronPopup.classList.remove('open');
                }
            }
        });
    }, {
        threshold: 0.1
    });

    sectionObserver.observe(programmierungSection);
}

// Toggle popup on badge click
crestronBadge.addEventListener('click', () => {
    isPopupOpen = !isPopupOpen;

    if (isPopupOpen) {
        crestronPopup.classList.add('open');
        // Make sure popup is visible in viewport
        ensureInView(crestronPopup);
    } else {
        crestronPopup.classList.remove('open');
    }
});

// Close popup button
closeCrestronPopup.addEventListener('click', (e) => {
    e.stopPropagation();
    isPopupOpen = false;
    crestronPopup.classList.remove('open');
});

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    if (isPopupOpen &&
        !crestronPopup.contains(e.target) &&
        !crestronBadge.contains(e.target)) {
        isPopupOpen = false;
        crestronPopup.classList.remove('open');
    }
});

// Loudspeaker Badge - Position in Inbetriebnahme section
const loudspeakerBadge = document.getElementById('loudspeaker-badge');
const loudspeakerPopup = document.getElementById('loudspeaker-popup');
const closeLoudspeakerPopup = document.getElementById('close-loudspeaker-popup');
let isLoudspeakerPopupOpen = false;

// Find the Inbetriebnahme wrapper and move badge and popup into it
const inbetriebnahmeWrapper = document.querySelector('.inbetriebnahme-wrapper');
if (inbetriebnahmeWrapper && loudspeakerBadge) {
    // Append badge after the h3
    inbetriebnahmeWrapper.appendChild(loudspeakerBadge);
    // Also append popup to wrapper so it's positioned relative to it
    if (loudspeakerPopup) {
        inbetriebnahmeWrapper.appendChild(loudspeakerPopup);
    }
}

// Find the Inbetriebnahme section (3rd kompetenz-item) to monitor scrolling
const inbetriebnahmeSection = document.querySelectorAll('.kompetenz-item')[2]; // Index 2 = 3rd item

if (inbetriebnahmeSection) {
    const loudspeakerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start wiggling animation when section comes into view
                loudspeakerBadge.classList.add('wiggling');
            } else {
                // Stop wiggling when out of view
                loudspeakerBadge.classList.remove('wiggling');
                // Close popup when scrolling away from section
                if (isLoudspeakerPopupOpen) {
                    isLoudspeakerPopupOpen = false;
                    loudspeakerPopup.classList.remove('open');
                }
            }
        });
    }, {
        threshold: 0.1
    });

    loudspeakerObserver.observe(inbetriebnahmeSection);
}

// Toggle popup on badge click
loudspeakerBadge.addEventListener('click', () => {
    isLoudspeakerPopupOpen = !isLoudspeakerPopupOpen;

    if (isLoudspeakerPopupOpen) {
        loudspeakerPopup.classList.add('open');
        // Make sure popup is visible in viewport
        ensureInView(loudspeakerPopup);
    } else {
        loudspeakerPopup.classList.remove('open');
    }
});

// Close popup button
closeLoudspeakerPopup.addEventListener('click', (e) => {
    e.stopPropagation();
    isLoudspeakerPopupOpen = false;
    loudspeakerPopup.classList.remove('open');
});

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    if (isLoudspeakerPopupOpen &&
        !loudspeakerPopup.contains(e.target) &&
        !loudspeakerBadge.contains(e.target)) {
        isLoudspeakerPopupOpen = false;
        loudspeakerPopup.classList.remove('open');
    }
});