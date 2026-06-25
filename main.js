/* ============================================
   VIBE THRIFT — MAIN JS
   Features: WhatsApp ordering, category filter, mobile menu
   ============================================ */

// ---- CONFIG: Replace with real WhatsApp number ----
const WHATSAPP_NUMBER = '254720871721'; // Format: country code + number, no +

// ---- WHATSAPP ORDER TRIGGER ----
function triggerOrder(productName, price, size) {
  const message = 
    `Hi Vibe Thrift! 👋\n\n` +
    `I'd like to claim this item:\n` +
    `*${productName}*\n` +
    `Size: ${size}\n` +
    `Price: Ksh ${price}\n\n` +
    `Please confirm it's still available. 🙏`;
  
  const encodedMsg = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
  window.open(url, '_blank');
}

// ---- CATEGORY FILTER ----
const catBtns = document.querySelectorAll('.cat-btn');
const productCards = document.querySelectorAll('.product-card');
const emptyState = document.getElementById('emptyState');

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    productCards.forEach(card => {
      const category = card.dataset.category;
      const matches = filter === 'all' || category === filter;

      if (matches) {
        card.style.display = 'flex';
        // Animate in
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        requestAnimationFrame(() => {
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        });
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Show empty state if no items match
    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
});

// ---- MOBILE MENU TOGGLE ----
function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  if (nav) {
    nav.classList.toggle('open');
  }
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  const header = document.querySelector('.main-header');
  const nav = document.getElementById('mobileNav');
  if (nav && nav.classList.contains('open') && !header.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ---- HEADER SHADOW ON SCROLL ----
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  } else {
    header.style.boxShadow = '0 1px 12px rgba(0,0,0,0.06)';
  }
});

// ---- FLOATING WHATSAPP: hide on footer reach ----
const floatingBtn = document.querySelector('.floating-whatsapp');
const footer = document.querySelector('.store-footer');

if (floatingBtn && footer) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      floatingBtn.style.opacity = entry.isIntersecting ? '0' : '1';
      floatingBtn.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
    },
    { threshold: 0.1 }
  );
  observer.observe(footer);
}