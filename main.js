// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Hide/Show header on scroll
let lastScrollTop = 0;
const header = document.querySelector('header');
let scrollTimeout;
let navClickActive = false; // Flag to prevent scroll listener from showing header after nav click

// Auto-hide header when clicking navigation links (both desktop and mobile)
const allNavLinks = document.querySelectorAll('a[href^="#"]:not([href="#impressum"]):not([href="#datenschutz"]):not([href="#agb"]):not([href="#home"])');
allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        navClickActive = true;
        // Hide header after scroll animation starts
        setTimeout(() => {
            header.style.transform = 'translateY(-100%)';
        }, 300);
        // Re-enable scroll listener after smooth scroll completes
        setTimeout(() => {
            navClickActive = false;
        }, 1500);
    });
});

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Don't hide on hero section
        if (scrollTop < 100) {
            header.style.transform = 'translateY(0)';
            return;
        }

        // Don't show header if navigation click is still active
        if (navClickActive) {
            return;
        }

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    }, 10);
});


// Referenzen - Carousel with navigation
const carousel = document.getElementById('carousel');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const dotsContainer = document.getElementById('carousel-dots');

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
                <img src="${project.image}" alt="${project.title}" loading="lazy"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <h3 class="text-xl md:text-2xl font-bold text-white">${project.title}</h3>
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

// Open modal with project details
function openModal(project) {
    modalContent.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="w-full h-64 md:h-96 object-cover">
        <div class="p-8">
            <h2 class="text-3xl md:text-4xl font-bold text-misu-purple mb-4">${project.title}</h2>
            <p class="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">${project.description}</p>
            <div class="flex flex-wrap gap-3">
                ${project.tags.map(tag => {
                    // Check if tag is an object with text and link
                    if (typeof tag === 'object' && tag.text && tag.link) {
                        return `
                            <a href="${tag.link}" target="_blank" class="px-4 py-2 bg-misu-mint/20 text-misu-purple text-sm font-medium hover:bg-misu-mint/40 transition-colors">
                                ${tag.text}
                            </a>
                        `;
                    } else {
                        // Plain text tag
                        return `
                            <span class="px-4 py-2 bg-misu-mint/20 text-misu-purple text-sm font-medium">
                                ${tag}
                            </span>
                        `;
                    }
                }).join('')}
            </div>
        </div>
    `;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
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
        document.body.style.overflow = 'hidden';
    });
});

closeImpressum.addEventListener('click', () => {
    impressumModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

impressumModal.addEventListener('click', (e) => {
    if (e.target === impressumModal) {
        impressumModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
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
        document.body.style.overflow = 'hidden';
    });
});

closeDatenschutz.addEventListener('click', () => {
    datenschutzModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

datenschutzModal.addEventListener('click', (e) => {
    if (e.target === datenschutzModal) {
        datenschutzModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});


// ============================================
// STACKED SCROLL-REVEAL REFERENCES
// ============================================

const projectsStack = document.getElementById('projects-stack');

if (projectsStack) {
    // Create stacked cards - ONLY FIRST 5 PROJECTS
    const stackProjects = projects.slice(0, 5);
    stackProjects.forEach((project, index) => {
        const stackCard = document.createElement('div');
        stackCard.className = 'project-stack-card';
        stackCard.dataset.index = index; // Store index for rotation calculation
        stackCard.innerHTML = `
            <div class="project-stack-inner">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
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
            inner.style.transform = `rotate(${currentAngle}deg)`;
            
            // Fade in/out based on visibility
            if (scrollProgress > 0.2) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }
    
    // Run on scroll and initial load
    window.addEventListener('scroll', updateStackOnScroll);
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
