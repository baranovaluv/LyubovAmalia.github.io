// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Subject tabs functionality
const subjectTabs = document.querySelectorAll('.subject-tab:not(.add-subject)');
subjectTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        subjectTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Add subject button
const addSubjectBtn = document.querySelector('.add-subject');
if (addSubjectBtn) {
    addSubjectBtn.addEventListener('click', function() {
        const subjectName = prompt('Введите название предмета:');
        if (subjectName) {
            const newTab = document.createElement('button');
            newTab.className = 'subject-tab';
            newTab.textContent = subjectName;
            this.parentNode.insertBefore(newTab, this);
            
            newTab.addEventListener('click', function() {
                subjectTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        }
    });
}

// Search functionality
const searchInput = document.querySelector('.search-input');
const testCards = document.querySelectorAll('.test-card');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        testCards.forEach(card => {
            const testName = card.querySelector('h3').textContent.toLowerCase();
            const testDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (testName.includes(searchTerm) || testDesc.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Play button animation
const playButtons = document.querySelectorAll('.play-button');
playButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            alert('Запуск теста...');
        }, 100);
    });
});

// Animate progress circle on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fillProgress 1.5s ease-out forwards';
        }
    });
}, observerOptions);

const progressCircle = document.querySelector('.progress-circle');
if (progressCircle) {
    observer.observe(progressCircle);
}

// Mobile menu toggle (for future hamburger menu)
let menuOpen = false;
function toggleMenu() {
    menuOpen = !menuOpen;
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('mobile-open');
    }
}
document.querySelectorAll('.featimg.animated').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08) translateY(-8px) rotate(2deg)';
        this.style.filter = 'brightness(1.05) saturate(1.1)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0) rotate(0deg)';
        this.style.filter = 'brightness(1) saturate(1)';
    });
});

document.querySelectorAll('.feature').forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        const img = this.querySelector('.featimg');
        if (img) {
            img.style.animation = 'wiggle 0.6s ease-in-out';
        }
    });
    
    feature.addEventListener('mouseleave', function() {
        const img = this.querySelector('.featimg');
        if (img) {
            img.style.animation = 'none';
        }
    });
});


// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fillProgress {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

console.log('Octo.app initialized successfully!');

document.addEventListener('DOMContentLoaded', function() {
    const scrollbar = document.querySelector('.scrollbar-decoration');
    
    if (scrollbar) {
        let isDragging = false;
        
        scrollbar.addEventListener('mousedown', function(e) {
            isDragging = true;
            updateScrollbarThumb(e);
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                updateScrollbarThumb(e);
            }
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        function updateScrollbarThumb(e) {
            const scrollbarRect = scrollbar.getBoundingClientRect();
            const thumbHeight = 100;
            const maxTop = scrollbarRect.height - thumbHeight;
            
            let newTop = e.clientY - scrollbarRect.top - (thumbHeight / 2);
            newTop = Math.max(0, Math.min(newTop, maxTop));
            
            scrollbar.style.setProperty('--thumb-position', newTop + 'px');
        }
    }
});

// Assistant chat
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');

  if (!input || !sendBtn || !messages) return;

  function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `msg msg-${type}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    setTimeout(() => {
  const answer =
`Предел — к чему функция стремится в точке.
Непрерывность — функция идет именно туда, куда стремится (разрывов нет).
Частная производная — скорость изменения функции по одной из переменных (остальные фиксируем)`;

  addMessage(answer, 'ai');
}, 600);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });
});

