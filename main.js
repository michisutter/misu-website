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

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Don't hide on hero section
        if (scrollTop < 100) {
            header.style.transform = 'translateY(0)';
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

let currentPage = 0;
const itemsPerPage = 3;
const totalPages = Math.ceil(projects.length / itemsPerPage);

// Load projects into carousel
projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3';
    projectCard.innerHTML = `
        <div class="cursor-pointer group">
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div class="aspect-video overflow-hidden">
                    <img src="${project.image}" alt="${project.title}" 
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-misu-purple mb-2">${project.title}</h3>
                    <p class="text-gray-600 text-sm line-clamp-2">${project.description}</p>
                </div>
            </div>
        </div>
    `;

    projectCard.addEventListener('click', () => openModal(project));
    carousel.appendChild(projectCard);
});

// Create dots
for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('button');
    dot.className = 'w-3 h-3 rounded-full transition-colors';
    dot.addEventListener('click', () => goToPage(i));
    dotsContainer.appendChild(dot);
}

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
                ${project.tags.map(tag => `
                    <span class="px-4 py-2 bg-misu-mint/20 text-misu-purple rounded-full text-sm font-medium">
                        ${tag}
                    </span>
                `).join('')}
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
