/**
 * =============================================================================
 * DIAMOND HOSPITAL DENTAL & SURGICAL AESTHETICS - OFFICIAL CLIENT SCRIPT
 * Location: Khammam, Telangana, India
 * 
 * Features:
 * 1. Mobile Menu Toggle & Keyboard Accessibility
 * 2. Sticky Header & Active Nav Link Highlighting (Scroll Spy)
 * 3. Smooth Scroll Navigation with Fixed Header Offset
 * 4. Pre-fill Department when clicking from Services or Doctors
 * 5. Appointment Form Front-End Validation & Interactive Modal Feedback
 * 6. Contact Form Validation & Confirmation Notice
 * 7. Dynamic Date Bounds (Appointment Date >= Today) & Footer Year
 * 8. Back-To-Top Button Functionality
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION TOGGLE
  // ---------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .btn-nav');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when a link inside the nav is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.classList.remove('open');
          navMenu.classList.remove('open');
        }
      });
    });

    // Close menu if user clicks outside of header
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target) && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 2. STICKY HEADER & BACK-TO-TOP BUTTON VISIBILITY
  // ---------------------------------------------------------------------------
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY || window.pageYOffset;

    // Header elevation shadow
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button display
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 3. SCROLL SPY - ACTIVE NAVIGATION LINK HIGHLIGHTING
  // ---------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const mainNavLinks = document.querySelectorAll('.nav-menu .nav-link');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset + 120; // Offset for header

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        mainNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ---------------------------------------------------------------------------
  // 4. PRE-FILL DEPARTMENT FROM SERVICE OR DOCTOR CARDS
  // ---------------------------------------------------------------------------
  const serviceLinks = document.querySelectorAll('.service-link[data-department]');
  const doctorBookBtns = document.querySelectorAll('.doctor-book-btn[data-doctor]');
  const departmentSelect = document.getElementById('department');

  // When clicking "Request Appointment" on a specific service card
  serviceLinks.forEach(link => {
    link.addEventListener('click', () => {
      const dept = link.getAttribute('data-department');
      if (departmentSelect && dept) {
        for (let option of departmentSelect.options) {
          if (option.value === dept) {
            departmentSelect.value = dept;
            break;
          }
        }
      }
    });
  });

  // When clicking "Book Appointment" on a specific doctor card
  doctorBookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const doctorTitle = btn.getAttribute('data-doctor');
      const appointmentMessage = document.getElementById('appointmentMessage');
      if (appointmentMessage && doctorTitle) {
        appointmentMessage.value = `Consultation request for: ${doctorTitle}`;
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 5. APPOINTMENT DATE LIMIT (Set min date to today)
  // ---------------------------------------------------------------------------
  const appointmentDateInput = document.getElementById('appointmentDate');
  if (appointmentDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDateStr = `${yyyy}-${mm}-${dd}`;
    appointmentDateInput.setAttribute('min', minDateStr);
  }

  // ---------------------------------------------------------------------------
  // 6. APPOINTMENT FORM VALIDATION & MODAL CONFIRMATION
  // ---------------------------------------------------------------------------
  const appointmentForm = document.getElementById('appointmentForm');
  const appointmentModal = document.getElementById('appointmentModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const modalPatientName = document.getElementById('modalPatientName');
  const modalDetails = document.getElementById('modalDetails');

  // Input Field References
  const patientName = document.getElementById('patientName');
  const phoneNumber = document.getElementById('phoneNumber');
  const emailAddress = document.getElementById('emailAddress');
  const department = document.getElementById('department');
  const appointmentDate = document.getElementById('appointmentDate');
  const appointmentTime = document.getElementById('appointmentTime');
  const appointmentMessage = document.getElementById('appointmentMessage');

  // Error Message References
  const patientNameError = document.getElementById('patientNameError');
  const phoneNumberError = document.getElementById('phoneNumberError');
  const emailAddressError = document.getElementById('emailAddressError');
  const departmentError = document.getElementById('departmentError');
  const appointmentDateError = document.getElementById('appointmentDateError');
  const appointmentTimeError = document.getElementById('appointmentTimeError');

  // Helper validation functions
  const validateName = (name) => name.trim().length >= 3;
  const validatePhone = (phone) => {
    // Validates standard 10-digit phone number (Indian format)
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    return /^[6-9]\d{9}$/.test(cleaned) || /^\d{10}$/.test(cleaned);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Helper to toggle error display
  const setFieldError = (inputEl, errorEl, hasError) => {
    if (hasError) {
      inputEl.classList.add('is-invalid');
      errorEl.classList.add('show');
    } else {
      inputEl.classList.remove('is-invalid');
      errorEl.classList.remove('show');
    }
  };

  // Real-time input listeners to clear errors on correction
  if (patientName) {
    patientName.addEventListener('input', () => {
      if (validateName(patientName.value)) setFieldError(patientName, patientNameError, false);
    });
  }
  if (phoneNumber) {
    phoneNumber.addEventListener('input', () => {
      if (validatePhone(phoneNumber.value)) setFieldError(phoneNumber, phoneNumberError, false);
    });
  }
  if (emailAddress) {
    emailAddress.addEventListener('input', () => {
      if (validateEmail(emailAddress.value)) setFieldError(emailAddress, emailAddressError, false);
    });
  }
  if (department) {
    department.addEventListener('change', () => {
      if (department.value !== '') setFieldError(department, departmentError, false);
    });
  }
  if (appointmentDate) {
    appointmentDate.addEventListener('change', () => {
      if (appointmentDate.value !== '') setFieldError(appointmentDate, appointmentDateError, false);
    });
  }
  if (appointmentTime) {
    appointmentTime.addEventListener('change', () => {
      if (appointmentTime.value !== '') setFieldError(appointmentTime, appointmentTimeError, false);
    });
  }

  // Appointment Form Submission Handler
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // 1. Patient Name Validation
      if (!validateName(patientName.value)) {
        setFieldError(patientName, patientNameError, true);
        isValid = false;
      } else {
        setFieldError(patientName, patientNameError, false);
      }

      // 2. Phone Validation
      if (!validatePhone(phoneNumber.value)) {
        setFieldError(phoneNumber, phoneNumberError, true);
        isValid = false;
      } else {
        setFieldError(phoneNumber, phoneNumberError, false);
      }

      // 3. Email Validation
      if (!validateEmail(emailAddress.value)) {
        setFieldError(emailAddress, emailAddressError, true);
        isValid = false;
      } else {
        setFieldError(emailAddress, emailAddressError, false);
      }

      // 4. Department Validation
      if (!department.value) {
        setFieldError(department, departmentError, true);
        isValid = false;
      } else {
        setFieldError(department, departmentError, false);
      }

      // 5. Date Validation
      if (!appointmentDate.value) {
        setFieldError(appointmentDate, appointmentDateError, true);
        isValid = false;
      } else {
        setFieldError(appointmentDate, appointmentDateError, false);
      }

      // 6. Time Validation
      if (!appointmentTime.value) {
        setFieldError(appointmentTime, appointmentTimeError, true);
        isValid = false;
      } else {
        setFieldError(appointmentTime, appointmentTimeError, false);
      }

      // If all inputs pass validation, display confirmation modal
      if (isValid) {
        // Generate pseudo reference ID for demo
        const demoRefNumber = 'DMND-' + Math.floor(100000 + Math.random() * 900000);

        // Update modal contents
        if (modalPatientName) {
          modalPatientName.textContent = patientName.value.trim();
        }

        if (modalDetails) {
          modalDetails.innerHTML = `
            <div class="modal-detail-row">
              <span class="modal-detail-label">Hospital:</span>
              <span class="modal-detail-val">Diamond Hospital Dental &amp; Surgical Aesthetics</span>
            </div>
            <div class="modal-detail-row">
              <span class="modal-detail-label">Demo Reference ID:</span>
              <span class="modal-detail-val">${demoRefNumber}</span>
            </div>
            <div class="modal-detail-row">
              <span class="modal-detail-label">Department:</span>
              <span class="modal-detail-val">${department.value}</span>
            </div>
            <div class="modal-detail-row">
              <span class="modal-detail-label">Requested Date:</span>
              <span class="modal-detail-val">${appointmentDate.value}</span>
            </div>
            <div class="modal-detail-row">
              <span class="modal-detail-label">Preferred Slot:</span>
              <span class="modal-detail-val">${appointmentTime.value}</span>
            </div>
            <div class="modal-detail-row">
              <span class="modal-detail-label">Contact Phone:</span>
              <span class="modal-detail-val">${phoneNumber.value.trim()}</span>
            </div>
          `;
        }

        // Show Modal
        if (appointmentModal) {
          appointmentModal.classList.add('active');
          appointmentModal.focus();
        }

        // Reset form
        appointmentForm.reset();
      } else {
        // Focus on first invalid input
        const firstInvalid = appointmentForm.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }

  // Modal Close Functions
  const closeModal = () => {
    if (appointmentModal) {
      appointmentModal.classList.remove('active');
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);

  // Close modal when clicking on backdrop
  if (appointmentModal) {
    appointmentModal.addEventListener('click', (e) => {
      if (e.target === appointmentModal) {
        closeModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appointmentModal && appointmentModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ---------------------------------------------------------------------------
  // 7. CONTACT US FORM VALIDATION
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactPhone = document.getElementById('contactPhone');
  const contactMessage = document.getElementById('contactMessage');
  const contactSuccessAlert = document.getElementById('contactSuccessAlert');

  const contactNameError = document.getElementById('contactNameError');
  const contactEmailError = document.getElementById('contactEmailError');
  const contactPhoneError = document.getElementById('contactPhoneError');
  const contactMessageError = document.getElementById('contactMessageError');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isContactValid = true;

      // Contact Name
      if (!validateName(contactName.value)) {
        setFieldError(contactName, contactNameError, true);
        isContactValid = false;
      } else {
        setFieldError(contactName, contactNameError, false);
      }

      // Contact Email
      if (!validateEmail(contactEmail.value)) {
        setFieldError(contactEmail, contactEmailError, true);
        isContactValid = false;
      } else {
        setFieldError(contactEmail, contactEmailError, false);
      }

      // Contact Phone
      if (!validatePhone(contactPhone.value)) {
        setFieldError(contactPhone, contactPhoneError, true);
        isContactValid = false;
      } else {
        setFieldError(contactPhone, contactPhoneError, false);
      }

      // Contact Message (min 10 characters)
      if (contactMessage.value.trim().length < 10) {
        setFieldError(contactMessage, contactMessageError, true);
        isContactValid = false;
      } else {
        setFieldError(contactMessage, contactMessageError, false);
      }

      if (isContactValid) {
        if (contactSuccessAlert) {
          contactSuccessAlert.classList.remove('d-none');
          // Hide alert after 8 seconds
          setTimeout(() => {
            contactSuccessAlert.classList.add('d-none');
          }, 8000);
        }
        contactForm.reset();
      }
    });

    // Clear contact errors on typing
    if (contactName) {
      contactName.addEventListener('input', () => {
        if (validateName(contactName.value)) setFieldError(contactName, contactNameError, false);
      });
    }
    if (contactEmail) {
      contactEmail.addEventListener('input', () => {
        if (validateEmail(contactEmail.value)) setFieldError(contactEmail, contactEmailError, false);
      });
    }
    if (contactPhone) {
      contactPhone.addEventListener('input', () => {
        if (validatePhone(contactPhone.value)) setFieldError(contactPhone, contactPhoneError, false);
      });
    }
    if (contactMessage) {
      contactMessage.addEventListener('input', () => {
        if (contactMessage.value.trim().length >= 10) setFieldError(contactMessage, contactMessageError, false);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 8. DYNAMIC COPYRIGHT YEAR
  // ---------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
