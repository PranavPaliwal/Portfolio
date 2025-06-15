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
    title: "Data Analytics Dashboard",
    description: "An interactive dashboard for visualizing and analyzing complex datasets with real-time updates and custom reporting features.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Real-time data visualization",
      "Custom report generation",
      "Interactive filtering and sorting",
      "Export functionality"
    ],
    tech: ["React", "D3.js", "Node.js", "MongoDB"],
    demo: "#",  // Replace with actual demo link when available
    source: "https://github.com/PranavPaliwal"  // Your GitHub profile as fallback
  },
  {
    id: 2,
    title: "Machine Learning Pipeline",
    description: "An end-to-end machine learning pipeline for predictive analytics with automated model training and deployment capabilities.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Automated data preprocessing",
      "Model training and validation",
      "Real-time predictions",
      "Performance monitoring"
    ],
    tech: ["Python", "TensorFlow", "Scikit-learn", "Docker"],
    demo: "#",  // Replace with actual demo link when available
    source: "https://github.com/PranavPaliwal"  // Your GitHub profile as fallback
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with secure payment processing, inventory management, and customer analytics.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Secure payment processing",
      "Inventory management",
      "Customer analytics",
      "Order tracking system"
    ],
    tech: ["Node.js", "React", "PostgreSQL", "Stripe"],
    demo: "#",  // Replace with actual demo link when available
    source: "https://github.com/PranavPaliwal"  // Your GitHub profile as fallback
  }
];

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Project+Image'">
    <h3>${project.title}</h3>
    <p>${project.description}</p>
  `;
  
  card.addEventListener('click', () => expandProject(card, project));
  return card;
}

function expandProject(card, project) {
  // Get original card position and dimensions
  const rect = card.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // Store original position
  const originalPosition = {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    width: rect.width,
    height: rect.height
  };

  // Create overlay
  const overlay = document.querySelector('.project-overlay');
  overlay.classList.add('active');
  document.body.classList.add('modal-open'); // Prevent background scroll

  // Create expanded content
  const expandedContent = document.createElement('div');
  expandedContent.className = 'expanded-content';
  expandedContent.innerHTML = `
    <button class="close-btn" aria-label="Close project details"></button>
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
  `;

  // Remove any previous expanded content
  const prevExpanded = card.querySelector('.expanded-content');
  if (prevExpanded) prevExpanded.remove();

  // Add expanded content and class
  card.appendChild(expandedContent);
  card.classList.add('expanded');

  // Calculate scale and position for smooth animation
  const scaleX = window.innerWidth / originalPosition.width;
  const scaleY = window.innerHeight / originalPosition.height;
  const scale = Math.min(scaleX, scaleY) * 0.9; // 90% of the maximum possible scale

  // Set initial transform
  card.style.transform = `translate(${originalPosition.left}px, ${originalPosition.top}px) scale(1)`;
  card.style.width = `${originalPosition.width}px`;
  card.style.height = `${originalPosition.height}px`;

  // Force reflow
  card.offsetHeight;

  // Animate to expanded state
  requestAnimationFrame(() => {
    card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    card.style.transform = `translate(-50%, -50%) scale(1)`;
    card.style.width = '1200px'; // Make it wider
    card.style.maxWidth = '95vw';
    card.style.height = 'auto';
    card.style.borderRadius = '24px'; // Less rounded
  });

  // Close on overlay click (only for desktop)
  if (window.innerWidth > 700) {
    overlay.addEventListener('click', () => {
      collapseProject(card, originalPosition);
      document.body.classList.remove('modal-open'); // Restore scroll
    });
  }

  // Close on close button click (mobile)
  const closeBtn = expandedContent.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      collapseProject(card, originalPosition);
      document.body.classList.remove('modal-open'); // Restore scroll
    });
  }

  // Close on escape key
  document.addEventListener('keydown', function closeOnEscape(e) {
    if (e.key === 'Escape') {
      collapseProject(card, originalPosition);
      document.body.classList.remove('modal-open'); // Restore scroll
      document.removeEventListener('keydown', closeOnEscape);
    }
  });
}

function collapseProject(card, originalPosition) {
  // Animate back to original position
  card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  card.style.transform = `translate(${originalPosition.left}px, ${originalPosition.top}px) scale(1)`;
  card.style.width = `${originalPosition.width}px`;
  card.style.height = `${originalPosition.height}px`;

  // Remove expanded content and class after animation
  setTimeout(() => {
    const expandedContent = card.querySelector('.expanded-content');
    if (expandedContent) {
      expandedContent.remove();
    }
    card.classList.remove('expanded');
    card.style.transform = '';
    card.style.width = '';
    card.style.height = '';
    card.style.transition = '';
  }, 300);

  // Remove overlay
  const overlay = document.querySelector('.project-overlay');
  overlay.classList.remove('active');
  document.body.classList.remove('modal-open'); // Restore scroll
}

// Initialize project showcase
function initProjectShowcase() {
  const galleryContainer = document.querySelector('.gallery-container');
  
  // Create and append project cards
  projects.forEach(project => {
    galleryContainer.appendChild(createProjectCard(project));
  });
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
