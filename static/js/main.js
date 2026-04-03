/* ──────────────────────────────────────────
   PARASH ACHARYA — PORTFOLIO JS
   ──────────────────────────────────────────*/

// ──────────────── NAV SCROLL ────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ──────────────── SMOOTH ACTIVE NAV ────────────────
const sections = document.querySelectorAll('section[id]');

const observerNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observerNav.observe(s));

// ──────────────── SKILL BAR ANIMATION ────────────────
const skillFills = document.querySelectorAll('.skill-fill');

const observerSkills = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      observerSkills.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => observerSkills.observe(fill));

// ──────────────── FLOATING SKILLS CLOUD ────────────────
const skillsData = [
  'Python', 'Django', 'MySQL', 'C++', 'Machine Learning',
  'Computer Vision', 'OpenCV', 'REST APIs', 'OOP', 'Git',
  'Linux', 'Deep Learning', 'Web Dev', 'NumPy', 'Pandas'
];

// Floating tags are handled by CSS; JS adds dynamic movement
const floatingTags = document.querySelectorAll('.floating-tag');
floatingTags.forEach((tag, i) => {
  tag.style.animationDuration = `${5 + i * 0.7}s`;
});

// ──────────────── FADE IN ON SCROLL ────────────────
const fadeElements = document.querySelectorAll(
  '.project-card, .cert-card, .skill-card, .stat, .edu-item, .contact-item'
);

const observerFade = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      observerFade.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
  observerFade.observe(el);
});

// ──────────────── STAT COUNTER ────────────────
const statNums = document.querySelectorAll('.stat-num');

const countUp = (el, target, suffix = '') => {
  const isDecimal = target % 1 !== 0;
  const duration = 1600;
  const start = performance.now();
  const from = 0;

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = from + (target - from) * eased;
    el.textContent = isDecimal ? current.toFixed(2) : Math.round(current);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const observerStats = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const val = parseFloat(entry.target.textContent);
      countUp(entry.target, val);
      observerStats.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => observerStats.observe(el));

// ──────────────── PROJECT MODALS ────────────────
const projects = [
  {
    title: 'ANPR — Automatic Number Plate Recognition',
    tags: ['Python', 'OpenCV', 'Machine Learning', 'Image Processing'],
    description: 'An intelligent system designed specifically for Nepali license plates that uses machine learning and image processing to automate vehicle identification.',
    features: [
      'Detects and localizes number plates from static images and video frames',
      'Extracts plate characters using OCR optimized for Nepali vehicle plates',
      'Trained on Nepali license plate dataset with custom preprocessing pipeline',
      'Built with OpenCV for image processing and ML models for character recognition',
      'Handles varying lighting conditions and plate angles',
    ],
    github: 'https://github.com/parashac/ANPR',
    year: '2025',
  },
  {
    title: 'NutriLog — Nutrition & Fitness Tracker',
    tags: ['Django', 'Python', 'MySQL', 'Data Visualization'],
    description: 'A comprehensive Django-based backend system for tracking daily nutrition, calorie intake, exercise activity, and personal health routines with rule-based calculations.',
    features: [
      'Food logging with nutritional data and calorie intake tracking',
      'Exercise tracking with calorie burn calculation engine',
      'Personal health routine management and daily summaries',
      'Data visualization with charts for nutrition and fitness trends',
      'Django ORM with structured MySQL database design',
      'REST API endpoints for frontend integration',
    ],
    github: 'https://github.com/parashac/NutriLog',
    year: '2026',
  },
  {
    title: 'VIOLENS — Real-Time Violence Detection',
    tags: ['Python', 'Deep Learning', 'CCTV', 'Computer Vision', 'OpenCV'],
    description: 'A project which is a real-time violence detection system that processes live CCTV camera feeds using deep learning to identify and flag violent activity automatically.',
    features: [
      'Real-time processing of live CCTV camera video streams',
      'Deep learning model trained on violence/non-violence dataset',
      'Frame-by-frame classification with temporal context awareness',
      'Alert system for flagging violent incidents',
      'Optimized for near real-time inference on standard hardware',
    ],
    github: 'https://github.com/parashac/VioLens',
    year: '2026',
  },
  {
    title: 'News Portal — Django CMS',
    tags: ['Django', 'Python', 'MySQL', 'CMS'],
    description: 'A full-featured news portal content management system built with Django, providing a complete platform for managing and publishing news articles.',
    features: [
      'Article creation, editing, and publishing workflow',
      'Category and tag-based content organization',
      'User authentication and role-based access control',
      'Clean reading interface with responsive design',
      'Django admin panel for content management',
    ],
    github: 'https://github.com/parashac/NEWS_PORTAL-Django',
    year: '2024',
  },
  {
    title: 'Personal Portfolio — Django',
    tags: ['Django', 'Python', 'MySQL', 'Web Dev'],
    description: 'A dynamic personal portfolio website built with Django that lets you manage and display your projects and contact information through a web interface.',
    features: [
      'Dynamic project showcase with add/edit/delete functionality',
      'Contact information management via Django admin',
      'Clean frontend with Django templates',
      'SQLite/MySQL backend for storing portfolio data',
      'Demonstrates full Django MVC architecture',
    ],
    github: 'https://github.com/parashac/Personal-portfolio',
    year: '2024',
  },
  {
    title: 'Django Image Gallery',
    tags: ['Django', 'Python', 'File Upload', 'Media'],
    description: 'A clean, user-friendly image gallery application where users can upload, view, and delete images from organized albums, showcasing Django file handling capabilities.',
    features: [
      'Image upload with Django file handling and media storage',
      'Album-based organization of image collections',
      'User-friendly image viewing interface',
      'Delete functionality with confirmation',
      'Demonstrates Django ORM and file management',
    ],
    github: 'https://github.com/parashac/Django-based-Image_Gallery',
    year: '2024',
  },
];

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

window.openModal = function(index) {
  const p = projects[index];
  modalBody.innerHTML = `
    <div class="tag-row">${p.tags.map(t => `<span class="ptag">${t}</span>`).join('')}</div>
    <h2>${p.title}</h2>
    <p>${p.description}</p>
    <p><strong style="color:#e2e8f0">Key Features:</strong></p>
    <ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
    <div style="font-size:0.8rem;color:var(--text3);margin-bottom:8px">📅 ${p.year}</div>
    <div class="modal-actions">
      <a href="${p.github}" target="_blank" class="btn btn-code btn-sm">
        <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        View Source Code
      </a>
      <button class="btn btn-ghost btn-sm" onclick="closeModal()">Close</button>
    </div>
  `;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ──────────────── CONTACT FORM ────────────────
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.textContent = 'Send Message ✉️';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ──────────────── PARALLAX ORBS ────────────────
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ──────────────── TYPING CURSOR EFFECT ────────────────
// The code window already has static content; add a blinking cursor
const codeBody = document.querySelector('.code-body');
if (codeBody) {
  const cursor = document.createElement('span');
  cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:var(--teal);vertical-align:text-bottom;animation:blink 1s step-end infinite;margin-left:2px;';
  codeBody.appendChild(cursor);
  const style = document.createElement('style');
  style.textContent = '@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}';
  document.head.appendChild(style);
}

// ──────────────── PROFILE IMAGE FALLBACK ────────────────
// Already handled via onerror in HTML