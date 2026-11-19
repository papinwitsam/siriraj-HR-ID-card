document.addEventListener('DOMContentLoaded', function () {
  // 1. ส่วน Navbar
  const navbarHTML = `
    <header class="site-navbar">
      <div class="site-navbar-inner">
        <a href="index.html" class="site-brand">
          <img src="favicon.png" alt="โลโก้ศิริราช" class="site-brand-logo">
          <div class="site-brand-text">
            <strong>Si_HR ID card</strong>
            <span>ฝ่ายทรัพยากรบุคคล คณะแพทยศาสตร์ศิริราชพยาบาล</span>
          </div>
        </a>

        <nav class="site-nav-actions" aria-label="เมนูหลัก">
          <a href="index.html" class="nav-btn">หน้าแรก</a>
          <a href="new-employee-card.html" class="nav-btn">พนักงานบรรจุใหม่</a>
          <a href="half-day-leave.html" class="nav-btn">การลงเวลา ลาครึ่งวัน</a>
          <a href="internet-guide.html" class="nav-btn nav-btn-outline">ขั้นตอนการเข้าอินเทอร์เน็ต</a>
        </nav>
      </div>
    </header>
  `;

  // 2. ส่วน Footer (คงคลาสและข้อมูลเดิมของคุณ แต่ตัดส่วน "ติดต่อห้องทำบัตร" ออก)
  const footerHTML = `
    <footer class="footer">
      <div class="footer-container">
        <nav class="footer-links" aria-label="เมนูด่วน">
          <h4>เมนูด่วน</h4>
          <ul>
            <li><a href="damaged-card.html">บัตรพนักงานชำรุด</a></li>
            <li><a href="lost-card.html">บัตรพนักงานหาย</a></li>
            <li><a href="new-employee-card.html">ทำบัตรพนักงานบรรจุใหม่</a></li>
            <li><a href="time-recording-guide.html">ขั้นตอนการบันทึกเวลา</a></li>
            <li><a href="half-day-leave.html">การลงเวลา กรณีลาครึ่งวัน</a></li>
            <li><a href="internet-guide.html">สมัครใช้งาน Internet</a></li>
          </ul>
        </nav>

        <div class="footer-links">
          <h4>LINE: Si_HR ID Card</h4>
          <div class="qr-image-box">
            <img src="https://lh3.googleusercontent.com/d/1Mvo_v_kDtL4wOh22Q36dZmUaND2Kub74" alt="QR Code สำหรับ LINE Si_HR ID Card" loading="lazy">
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>Website: Si_HR ID card<br>ฝ่ายทรัพยากรบุคคล คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล</p>
      </div>
    </footer>
  `;

  // 3. แทรก Navbar และ Footer ลงในหน้าเว็บ
  const headerPlaceholder = document.getElementById('navbar-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = navbarHTML;
  }

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
  }

  // 4. ไฮไลต์ปุ่มเมนูของหน้าที่กำลังเปิดอยู่ให้อัตโนมัติ
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav-actions a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('is-active');
    }
  });
});
