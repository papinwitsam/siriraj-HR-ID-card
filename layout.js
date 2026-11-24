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

  // 2. กำหนดโครงสร้าง Footer
  const footerHTML = `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <div class="footer-info">
          <strong>Website : Si_HR ID card (ห้องทำบัตรพนักงาน)</strong>
          <p>ตึกท่านผู้หญิงวิจิตรา | จันทร์ , พุธ , ศุกร์ | เวลา 08:30 - 16:30 น. | โทร. 02-419-7180</p>
        </div>
        <div class="footer-copy">
          ฝ่ายทรัพยากรบุคคล คณะแพทยศาสตร์ศิริราชพยาบาล
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

  // 5. เรียกใช้แถบสถานะเปิด-ปิดห้องทำบัตร
  renderOfficeStatus();
});

function renderOfficeStatus() {
  const placeholder = document.getElementById('office-status-placeholder');
  if (!placeholder) return;

  // =========================================================
  // ช่องใส่ประกาศด่วน (ถ้าไม่มีประกาศพิเศษ ให้ปล่อยเป็นข้อความว่าง '')
  // ตัวอย่าง: const SPECIAL_NOTICE = 'ประกาศ: วันที่ 5 ธ.ค. ห้องทำบัตรปิดทำการเนื่องในวันหยุดนักขัตฤกษ์';
  // =========================================================
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

  // ดึงวันและเวลาปัจจุบันตามเขตเวลาประเทศไทย (Asia/Bangkok)
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  const day = now.getDay(); // 0=อาทิตย์, 1=จันทร์, 2=อังคาร, 3=พุธ, 4=พฤหัส, 5=ศุกร์, 6=เสาร์
  const totalMinutes = now.getHours() * 60 + now.getMinutes();

  const isServiceDay = (day === 1 || day === 3 || day === 5); // จันทร์, พุธ, ศุกร์
  const openMorning = 8 * 60 + 30;   // 08:30 น.
  const lunchStart  = 12 * 60;       // 12:00 น.
  const lunchEnd    = 13 * 60;       // 13:00 น.
  const closeTime   = 16 * 60 + 30;  // 16:30 น.

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
