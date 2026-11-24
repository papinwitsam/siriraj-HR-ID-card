document.addEventListener('DOMContentLoaded', function () {
  // 1. กำหนดโครงสร้าง Navbar
  const navbarHTML = `
    <header class="site-navbar">
      <div class="site-navbar-inner">
        <a href="index.html" class="site-brand">
          <div class="site-brand-text">
            <strong>Si_HR ID card</strong>
            <span>ฝ่ายทรัพยากรบุคคล คณะแพทยศาสตร์ศิริราชพยาบาล</span>
          </div>
        </a>

        <nav class="site-nav-actions" aria-label="เมนูหลัก">
          <a href="index.html" class="nav-btn">หน้าแรก</a>
          <a href="new-employee-card.html" class="nav-btn">พนักงานบรรจุใหม่</a>
          <a href="half-day-leave.html" class="nav-btn">การลงเวลา ลาครึ่งวัน</a>
          <a href="faq.html" class="nav-btn">คำถามที่พบบ่อย</a>
          <a href="contact.html" class="nav-btn nav-btn-outline">ติดต่อเรา</a>
        </nav>
      </div>
    </header>
  `;

  // 2. กำหนดโครงสร้าง Footer (พร้อมกล่องตัวนับผู้เข้าชม)
  const footerHTML = `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <div class="footer-info">
          <strong>Website : Si_HR ID card (ห้องทำบัตรพนักงาน)</strong>
          <p>ตึกท่านผู้หญิงวิจิตรา | จันทร์ , พุธ , ศุกร์ | เวลา 08:30 - 16:30 น. | โทร. 02-419-7180</p>
        </div>
        <div class="footer-copy">
          <div>ฝ่ายทรัพยากรบุคคล คณะแพทยศาสตร์ศิริราชพยาบาล</div>
          <div class="visitor-counter-wrap">
            <span class="visitor-counter-box">
              ผู้เข้าชมเว็บไซต์: <strong id="visitorCount" class="visitor-number">...</strong> ครั้ง
            </span>
          </div>
        </div>
      </div>
    </footer>
  `;

  // 3. นำ Navbar และ Footer ไปวางในตำแหน่งที่กำหนดไว้ในแต่ละหน้า
  const headerPlaceholder = document.getElementById('navbar-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = navbarHTML;
  }

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
  }

  // 4. ไฮไลต์ปุ่มเมนูของหน้าที่กำลังเปิดอยู่ให้อัตโนมัติ (Active State)
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav-actions a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('is-active');
    }
  });

  // 5. เรียกใช้แถบสถานะเปิด-ปิดห้องทำบัตร และตัวนับผู้เข้าชม
  renderOfficeStatus();
  updateVisitorCounter();
});

// ฟังก์ชันนับจำนวนผู้เข้าชม (Google Apps Script)
function updateVisitorCounter() {
  const countEl = document.getElementById('visitorCount');
  if (!countEl) return;

  // นำ URL ของ Web App จาก Google Apps Script มาวางแทนที่ข้อความในเครื่องหมายคำพูดด้านล่าง
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJF4kp8xqZWqCV-BgRxUREoFspCSusBGp680QLFaKNlHfLWWkKZOBGiksrlgBdSMGu/exec';

  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('วาง_URL')) {
    const wrap = document.querySelector('.visitor-counter-wrap');
    if (wrap) wrap.style.display = 'none';
    return;
  }

  window.handleVisitorCount = function (data) {
    if (data && typeof data.count === 'number') {
      countEl.textContent = data.count.toLocaleString('th-TH');
      sessionStorage.setItem('si_hr_counted', 'true');
    } else {
      countEl.textContent = '1';
    }
  };

  const hasCounted = sessionStorage.getItem('si_hr_counted');
  const script = document.createElement('script');
  script.src = `${APPS_SCRIPT_URL}?callback=handleVisitorCount${hasCounted ? '&view=1' : ''}&_=${Date.now()}`;
  script.onerror = function () {
    const wrap = document.querySelector('.visitor-counter-wrap');
    if (wrap) wrap.style.display = 'none';
  };
  document.body.appendChild(script);
}

// ฟังก์ชันแสดงสถานะเปิด-ปิดห้องทำบัตรแบบเรียลไทม์
function renderOfficeStatus() {
  const placeholder = document.getElementById('office-status-placeholder');
  if (!placeholder) return;

  const SPECIAL_NOTICE = '';

  if (SPECIAL_NOTICE.trim() !== '') {
    placeholder.innerHTML = `
      <div class="office-status-bar">
        <div class="office-status-card is-closed">
          <div class="office-status-left">
            <span class="status-dot"></span>
            <span>${SPECIAL_NOTICE}</span>
          </div>
          <span class="office-status-schedule">ตึกท่านผู้หญิงวิจิตรา | โทร. 02-419-7180</span>
        </div>
      </div>
    `;
    return;
  }

  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  const day = now.getDay();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();

  const isServiceDay = (day === 1 || day === 3 || day === 5);
  const openMorning = 8 * 60 + 30;
  const lunchStart  = 12 * 60;
  const lunchEnd    = 13 * 60;
  const closeTime   = 16 * 60 + 30;

  let statusClass = 'is-closed';
  let statusText = 'ขณะนี้ห้องทำบัตรปิดทำการ (เปิดให้บริการวันจันทร์, พุธ, ศุกร์)';

  if (isServiceDay) {
    if ((totalMinutes >= openMorning && totalMinutes < lunchStart) ||
        (totalMinutes >= lunchEnd && totalMinutes < closeTime)) {
      statusClass = 'is-open';
      statusText = 'ขณะนี้ห้องทำบัตรเปิดให้บริการ';
    } else if (totalMinutes >= lunchStart && totalMinutes < lunchEnd) {
      statusClass = 'is-break';
      statusText = 'ขณะนี้ช่วงพักเที่ยง (เปิดให้บริการอีกครั้งเวลา 13:00 น.)';
    } else if (totalMinutes < openMorning) {
      statusClass = 'is-closed';
      statusText = 'วันนี้ห้องทำบัตรเปิดให้บริการเวลา 08:30 น.';
    } else {
      statusClass = 'is-closed';
      statusText = 'วันนี้หมดเวลาให้บริการแล้ว (เปิดให้บริการ 08:30–16:30 น.)';
    }
  }

  placeholder.innerHTML = `
    <div class="office-status-bar">
      <div class="office-status-card ${statusClass}">
        <div class="office-status-left">
          <span class="status-dot"></span>
          <span>${statusText}</span>
        </div>
        <span class="office-status-schedule">เปิด จันทร์ · พุธ · ศุกร์ (08:30–16:30 น. พักเที่ยง) | ตึกท่านผู้หญิงวิจิตรา</span>
      </div>
    </div>
  `;
}
