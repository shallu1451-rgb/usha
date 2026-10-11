/**
 * Usha Tour and Travels - Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '76px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#ffffff';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
        navLinks.style.borderBottom = '1px solid #e2e8f0';
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Modal Functionality
  const quoteModal = document.getElementById('quoteModal');
  const modalClose = document.querySelector('.modal-close');
  const modalPkgInput = document.getElementById('modalPackageName');

  window.openQuoteModal = function(packageName) {
    if (quoteModal) {
      if (modalPkgInput) {
        modalPkgInput.value = packageName || 'Custom Kerala Package';
      }
      quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeQuoteModal = function() {
    if (quoteModal) {
      quoteModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeQuoteModal);
  }

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeQuoteModal();
    });
  }

  // Interactive Package Filter on Listing Page
  const filterCheckboxes = document.querySelectorAll('input[name="filter-dest"], input[name="filter-days"]');
  const priceRange = document.getElementById('priceRange');
  const priceDisplay = document.getElementById('priceDisplay');
  const packageCards = document.querySelectorAll('.pkg-card');
  const countDisplay = document.getElementById('visiblePkgCount');

  function applyFilters() {
    if (!packageCards.length) return;

    const selectedDests = Array.from(document.querySelectorAll('input[name="filter-dest"]:checked')).map(cb => cb.value.toLowerCase());
    const selectedDays = Array.from(document.querySelectorAll('input[name="filter-days"]:checked')).map(cb => cb.value);
    const maxPrice = priceRange ? parseInt(priceRange.value, 10) : 100000;

    if (priceDisplay && priceRange) {
      priceDisplay.textContent = '₹ ' + maxPrice.toLocaleString('en-IN');
    }

    let visibleCount = 0;

    packageCards.forEach(card => {
      const cardDests = (card.getAttribute('data-destinations') || '').toLowerCase();
      const cardDays = card.getAttribute('data-days') || '';
      const cardPrice = parseInt(card.getAttribute('data-price') || '0', 10);

      // Check dest match
      const destMatch = selectedDests.length === 0 || selectedDests.some(d => cardDests.includes(d));

      // Check days match
      const daysMatch = selectedDays.length === 0 || selectedDays.includes(cardDays);

      // Check price match
      const priceMatch = cardPrice <= maxPrice;

      if (destMatch && daysMatch && priceMatch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (countDisplay) {
      countDisplay.textContent = visibleCount;
    }
  }

  if (filterCheckboxes.length) {
    filterCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
  }

  if (priceRange) {
    priceRange.addEventListener('input', applyFilters);
  }

  window.resetFilters = function() {
    filterCheckboxes.forEach(cb => cb.checked = false);
    if (priceRange) {
      priceRange.value = priceRange.max;
    }
    applyFilters();
  };

  // Generic Enquiry Form Handling
  const forms = document.querySelectorAll('form.enquiry-form, form#modalEnquiryForm');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('input[type="text"]')?.value || 'Guest';
      const phone = form.querySelector('input[type="tel"]')?.value || '';
      
      alert(`Thank you ${name}! Your enquiry for Usha Tour and Travels has been recorded. Our Kerala Destination Specialist will contact you at ${phone} within 15 minutes.`);
      form.reset();
      if (typeof closeQuoteModal === 'function') {
        closeQuoteModal();
      }
    });
  });
});
