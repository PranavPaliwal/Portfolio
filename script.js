function viewResume() {
  // Open resume from Google Drive
  window.open('https://drive.google.com/file/d/18NM3fBENNeBJgHc5hBy6RIJpiIJH5y9z/view?usp=drive_link', '_blank');
}

window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 10) {
    header.classList.add('transparent');
  } else {
    header.classList.remove('transparent');
  }
});

// Banner animation logic
const banner = document.getElementById('banner-animation');
const texts = [
  { text: 'DATA ANALYST', className: '' },
  { text: '</DEVELOPER>', className: 'dev' },
  { text: 'AI TRAILBLAZER', className: '' },
  { text: 'IT GRADUATE', className: '' }
];
let current = 0;
let typingInterval = null;

function typeText(text, className, cb) {
  banner.innerHTML = '';
  const span = document.createElement('span');
  if (className) span.className = className;
  banner.appendChild(span);
  let i = 0;
  const isMobile = window.innerWidth <= 700;
  const typingSpeed = isMobile ? 50 : 70; // Faster typing on mobile
  typingInterval = setInterval(() => {
    span.textContent = text.slice(0, i + 1);
    i++;
    if (i === text.length) {
      clearInterval(typingInterval);
      setTimeout(cb, isMobile ? 1500 : 2000); // Shorter delay on mobile
    }
  }, typingSpeed);
}

function showBanner() {
  banner.classList.add('show');
  banner.classList.remove('hide');
}

function hideBanner() {
  banner.classList.remove('show');
  banner.classList.add('hide');
}

function animateBanner() {
  showBanner();
  const { text, className } = texts[current];
  typeText(text, className, () => {
    hideBanner();
    setTimeout(() => {
      current = (current + 1) % texts.length;
      animateBanner();
    }, window.innerWidth <= 700 ? 600 : 900); // Shorter delay on mobile
  });
}

// Project showcase functionality
const projects = [
  {
    id: 1,
    title: "Spending Tracker",
    description: "An Expense Tracker App Built with Flutter and Dart, designed to help you keep track of your expenses in a fun and simple way.",
    image: "https://is3-ssl.mzstatic.com/image/thumb/Purple127/v4/e4/99/61/e49961f0-fdbd-5e69-9183-a2159415730b/source/512x512bb.jpg",
    features: [
      "📊 Expense Tracking: Monitor your spending habits easily.",
      "🔄 Recurring Expenses: Manage those monthly bills efficiently.",
      "📈 Charts & Graphs: Visualize your financial trends.",
      "🌐 Cross-Platform: Access your expense tracker on iOS, Android, and web."
    ],
    tech: ["Flutter", "Dart", "Node.js", "MongoDB"],
    demo: "#",  // Replace with actual demo link when available
    source: "https://github.com/PranavPaliwal/Spendings"  // Your GitHub profile as fallback
  },
  {
    id: 2,
    title: "Weather Application",
    description: "Weather Application, meticulously crafted with HTML, CSS, and JavaScript.",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20230930/pngtree-collection-of-3d-weather-icons-for-weather-forecast-app-and-web-image_13541310.png",
    features: [
      "🌍 Real-Time Weather Data: Instant access to current weather information.",
      "🖼️ Dynamic Backgrounds: A fresh visual experience with every search.",
      "📡 OpenWeatherMap Integration: Reliable, up-to-date weather information."
    ],
    tech: ["HTML", "CSS", "Javascript", "Fetch API"],
    demo: "https://whatsweathernoww.netlify.app/",  // Replace with actual demo link when available
    source: "https://github.com/PranavPaliwal/Weather_app"  // Your GitHub profile as fallback
  },
  {
    id: 3,
    title: "Power BI Projects ",
    description: "Power BI Projects, featuring various data visualization and analysis dashboards. Each project includes a.pbix file for the dashboard and a corresponding .xlsx/.csv file serving as the sample database.",
    image: "https://i.pinimg.com/736x/22/3d/87/223d8739fcec66208d6fe4d5aece287f.jpg",
    features: [
     "📊 Interactive dashboards for real-time data visualization",
     "🔒 Role-based access for secure data sharing",
     "🛠️ Customizable reports with drill-down capabilities",
     "🔗 Seamless integration with multiple data sources"
    ],
    tech: ["Data Cleaning", "Data Visualization", "Data Analysis", "Power BI"],
    demo: "#",  // Replace with actual demo link when available
    source: "https://github.com/PranavPaliwal/Data-Visualization"  // Your GitHub profile as fallback
  }
];

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card slide-in-on-scroll';
  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Project+Image'">
    <h3 class="slide-in-on-scroll">${project.title}</h3>
    <p class="slide-in-on-scroll">${project.description}</p>
  `;
  card.addEventListener('click', () => expandProject(card, project));
  return card;
}

function expandProject(card, project) {
  // Create overlay
  const overlay = document.querySelector('.project-overlay');
  overlay.classList.add('active');
  document.body.classList.add('modal-open'); // Prevent background scroll

  // Remove any previous modal if exists
  const prevModal = document.querySelector('.project-card.expanded');
  if (prevModal) prevModal.remove();

  // Create modal card
  const modalCard = document.createElement('div');
  modalCard.className = 'project-card expanded';
  modalCard.innerHTML = `
    <button class="close-btn" aria-label="Close">&times;</button>
    <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Project+Image'">
    <h3 class="project-title">${project.title}</h3>
    <div class="expanded-content">
      <p class="project-description">${project.description}</p>
      <div class="project-features">
        <ul class="feature-list">
          ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
      <div class="tech-stack">
        <h4>Technologies Used</h4>
        <div class="tech-tags">
          ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
      <div class="project-links">
        ${project.demo !== '#' ? `<a href="${project.demo}" class="btn-primary demo-link" target="_blank">Live Demo</a>` : ''}
        <a href="${project.source}" class="btn-primary source-link" target="_blank">Source Code</a>
      </div>
    </div>
  `;

  // Add close button event
  modalCard.querySelector('.close-btn').addEventListener('click', () => {
    collapseProject();
  });

  // Add modal to overlay (not to the card's parent)
  overlay.appendChild(modalCard);

  // Close on overlay click (but not when clicking the modal itself)
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      collapseProject();
    }
  };

  // Close on escape key
  function closeOnEscape(e) {
    if (e.key === 'Escape') {
      collapseProject();
      document.removeEventListener('keydown', closeOnEscape);
    }
  }
  document.addEventListener('keydown', closeOnEscape);
}

function collapseProject() {
  // Remove modal card from overlay
  const overlay = document.querySelector('.project-overlay');
  const modalCard = overlay.querySelector('.project-card.expanded');
  if (modalCard) modalCard.remove();
  overlay.classList.remove('active');
  document.body.classList.remove('modal-open');
}

// Initialize project showcase
function initProjectShowcase() {
  const galleryContainer = document.querySelector('.gallery-container');
  // Create and append project cards
  projects.forEach(project => {
    galleryContainer.appendChild(createProjectCard(project));
  });
  animateProjectCardsOnScroll(); // Ensure observer runs after cards are inserted
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateBanner, 600);
  initProjectShowcase();
});

// Wait for DOM and EmailJS to be fully loaded
window.onload = function() {
    console.log('Window loaded, initializing EmailJS...');
    
    // Initialize EmailJS
    (function() {
        // https://dashboard.emailjs.com/admin/account
        emailjs.init("9m5xM4apiZqJmTWcR");
        console.log('EmailJS initialized');
    })();

    // Form validation function
    function validateForm(name, email, message) {
        if (!name || name.trim().length < 2) {
            throw new Error("Please enter a valid name (at least 2 characters)");
        }
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            throw new Error("Please enter a valid email address");
        }
        if (!message || message.trim().length < 10) {
            throw new Error("Please enter a message (at least 10 characters)");
        }
    }

    // Show notification function
    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : 'success'}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    console.log('Attaching form handler...');
    
    const form = document.querySelector('.lets-connect-form');
    if (!form) {
        console.error('Form not found!');
        return;
    }
    
    console.log('Form found, attaching submit handler...');
    
    form.addEventListener('submit', function(e) {
        console.log('Form submitted');
        e.preventDefault(); // Prevent default form submission
        
        // Get form data
        const name = document.getElementById('senderName').value;
        const email = document.querySelector('input[name="email"]').value;
        const message = document.querySelector('textarea[name="message"]').value;
        
        console.log('Form data:', { name, email, message });

        try {
            // Validate form data
            validateForm(name, email, message);

            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <span class="spinner"></span>
                Sending...
            `;
            submitBtn.disabled = true;

            console.log('Sending email...');
            
            // Send email using EmailJS
            emailjs.send("service_hg0w21a", "template_ja0a56r", {
                from_name: name,
                from_email: email,
                message: message,
                to_name: "Pranav",
            })
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showNotification("Message sent successfully! I'll get back to you soon.");
                form.reset();
            })
            .catch(function(error) {
                console.error("EmailJS error:", error);
                showNotification("Failed to send message. Please try again later.", true);
            })
            .finally(function() {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        } catch (error) {
            console.error('Validation error:', error);
            showNotification(error.message, true);
        }
    });
};

// Responsive mobile menu
function createMobileMenu() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Create menu button
  const menuBtn = document.createElement('button');
  menuBtn.className = 'mobile-menu-btn';
  menuBtn.setAttribute('aria-label', 'Open navigation menu');
  menuBtn.innerHTML = '<span></span><span></span><span></span>';
  nav.parentNode.insertBefore(menuBtn, nav);

  // Create dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'mobile-nav-dropdown';
  dropdown.innerHTML = nav.innerHTML;
  document.body.appendChild(dropdown);

  // Toggle dropdown
  menuBtn.addEventListener('click', () => {
    dropdown.classList.toggle('open');
    menuBtn.classList.toggle('open');
  });

  // Close dropdown on link click
  dropdown.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      dropdown.classList.remove('open');
      menuBtn.classList.remove('open');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  createMobileMenu();

  const navLinks = document.querySelectorAll('nav a');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return document.getElementById(id);
  });

  function onScroll() {
    let currentSectionIndex = -1;
    const scrollY = window.scrollY;
    // Find the first section whose top is below the scroll position + offset
    for (let i = 1; i < sections.length; i++) {
      const section = sections[i];
      if (section && scrollY + 120 >= section.offsetTop) {
        currentSectionIndex = i;
      }
    }
    // If not in any section, check if we're in Skills
    if (currentSectionIndex === -1 && scrollY + 120 >= sections[0].offsetTop) {
      currentSectionIndex = 0;
    }
    navLinks.forEach((link, i) => {
      if (i === currentSectionIndex && currentSectionIndex !== -1) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    // Also update mobile dropdown links
    const dropdownLinks = document.querySelectorAll('.mobile-nav-dropdown a');
    dropdownLinks.forEach((link, i) => {
      if (i === currentSectionIndex && currentSectionIndex !== -1) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // Set on load
});

// Falling/stacking animation for skill cards on first reveal
function animateSkillsOnReveal() {
  const skillsSection = document.getElementById('skills');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  if (!skillsSection || !skillCards.length) return;

  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillCards.forEach((card, i) => {
          card.style.setProperty('--skill-delay', `${i * 0.08}s`);
          card.classList.remove('animated');
          // Force reflow to restart animation
          void card.offsetWidth;
          card.classList.add('animated');
        });
      }
    });
  }, {
    threshold: 0.2
  });
  observer.observe(skillsSection);
}

window.addEventListener('DOMContentLoaded', () => {
  animateSkillsOnReveal();
});

// --- Scroll Reveal for Sections (except hero) ---
function revealSectionsOnScroll() {
  // Section-level reveal
  const sections = document.querySelectorAll('section:not(.hero), .about-me, .education');
  sections.forEach(section => {
    if (!section.classList.contains('reveal-on-scroll')) return;
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight - 80) {
      section.classList.add('visible');
    }
  });

  // Content-level reveal
  const contentBlocks = document.querySelectorAll('.reveal-on-scroll-content');
  contentBlocks.forEach(content => {
    const rect = content.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight - 60) {
      content.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSectionsOnScroll);
window.addEventListener('DOMContentLoaded', revealSectionsOnScroll);

// --- Project Cards Slide In On Scroll ---
function animateProjectCardsOnScroll() {
  const cards = document.querySelectorAll('.project-card.slide-in-on-scroll');
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate child text content with a stagger
        const children = entry.target.querySelectorAll('.slide-in-on-scroll');
        children.forEach((el, idx) => {
          setTimeout(() => el.classList.add('visible'), 120 * idx);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  cards.forEach((card, i) => {
    observer.observe(card);
  });
}
