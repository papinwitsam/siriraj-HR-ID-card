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
          <a href="contact.html" class="nav-btn nav-btn-outline">ติดต่อเรา</a>
        </nav>
      </div>
    </header>
  `;

  // 2. กำหนดโครงสร้าง Footer (พร้อมตัวนับจำนวนผู้เข้าชม)
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

  // 5. เรียกใช้ตัวนับจำนวนผู้เข้าชมเว็บไซต์
  updateVisitorCounter();
});

function updateVisitorCounter() {
  const countEl = document.getElementById('visitorCount');
  if (!countEl) return;

  const namespace = 'siriraj-hr-id-card-papinwit';
  const key = 'total-visits';

  // นับ 1 ครั้งต่อ 1 รอบการเปิดเบราว์เซอร์ (กันเลขเบิ้ลเวลาเปลี่ยนหน้าหรือกด F5)
  const hasCounted = sessionStorage.getItem('si_hr_counted');
  const endpoint = hasCounted
    ? `https://api.counterapi.dev/v1/${namespace}/${key}/`
    : `https://api.counterapi.dev/v1/${namespace}/${key}/up`;

  fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      if (data && typeof data.count === 'number') {
        countEl.textContent = data.count.toLocaleString('th-TH');
        sessionStorage.setItem('si_hr_counted', 'true');
      } else {
        countEl.textContent = '-';
      }
    })
    .catch(() => {
      const wrap = document.querySelector('.visitor-counter-wrap');
      if (wrap) wrap.style.display = 'none';
    });
}
