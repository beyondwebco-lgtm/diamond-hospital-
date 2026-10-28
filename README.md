# Diamond Hospital Dental & Surgical Aesthetics - Website Source Code
**Location:** Khammam, Telangana, India  
**Theme:** Modern Medical Blue, Light Blue & White  
**Tech Stack:** Semantic HTML5, CSS3 (Grid & Flexbox), Vanilla JavaScript (No dependencies/frameworks)

---

## 📁 Project Structure

```text
diamond/
├── index.html        # Semantic HTML5 markup containing all 10 required hospital sections
├── style.css         # Modern, mobile-responsive CSS styling & animations
├── script.js         # Interactive JavaScript (validation, modal, mobile nav, scroll spy)
├── logo.png          # High-resolution transparent circular hospital logo
├── favicon.png       # 64x64 crisp browser favicon
└── README.md         # Documentation & customization guide
```

---

## 🚀 How to Run the Website Locally

You have two easy ways to view and test the website:

### Option 1: Direct File Opening (No Installation Required)
1. Open File Explorer and navigate to `D:\static\diamond\` (or wherever your project folder is placed).
2. Double-click **`index.html`** or right-click and choose **Open with > Google Chrome / Microsoft Edge / Firefox / Safari**.

### Option 2: Local Web Server (Recommended)
Using Python (which is already installed on your system):
1. Open PowerShell or Command Prompt.
2. Navigate to the project directory:
   ```powershell
   cd D:\static\diamond
   ```
3. Start a local server:
   ```powershell
   python -m http.server 8000
   ```
4. Open your browser and go to:
   ```text
   http://localhost:8000
   ```

---

## 🛠️ Customization Guide

### 1. Hospital Address, Phone & Email
In `index.html`:
- **Top Contact Bar (Line ~55):** Replace `[Phone Number Placeholder]` with your verified helpline.
- **Contact Details (Lines ~850–920):** Update:
  - Full verified address in Khammam, Telangana (Pin: 507001).
  - Hospital Helpline & Appointments desk numbers.
  - Official hospital email address (e.g., `info@diamondhospital.com`).
  - Consultation and operating hours (e.g., Monday - Saturday: 09:00 AM - 08:00 PM).
- **Google Maps (Line ~930):** Replace the placeholder `src` in the `<iframe>` with your hospital's verified Google Maps embed URL (obtainable from Google Maps -> Share -> Embed a map).

### 2. Services & Specialties
In `index.html` under `<section id="services">`:
- Edit titles, descriptions, and bullet points within `<article class="service-card">` elements.
- To add a new service, copy any `<article class="service-card">` block and paste it inside `<div class="services-grid">`.
- Also update the `<select id="department">` options inside the Appointment section to match any new departments.

### 3. Doctor Profiles
In `index.html` under `<section id="doctors">`:
- Replace `[Dr. Specialist Name - Placeholder]` with the doctor's actual registered name.
- Update `doctor-specialization`, `meta-value` (Degrees & Registrations), and description.
- Replace doctor photo URLs in `<img class="doctor-img">` with verified practitioner photographs.

### 4. Hospital Facilities
In `index.html` under `<section id="facilities">`:
- Only list facilities actually available at your Khammam center (e.g. ICU, Diagnostic Lab, Patient Rooms, Pharmacy).
- Update titles, descriptions, and feature tags.

### 5. Backend Connection (When Ready)
- Currently, `script.js` handles client-side form validation and launches an interactive confirmation modal showing patient details and a demo reference ID.
- When ready for production, connect `appointmentForm` and `contactForm` to your backend endpoint, PHP script, Node.js server, or email gateway (e.g., Formspree, EmailJS, or hospital API).
