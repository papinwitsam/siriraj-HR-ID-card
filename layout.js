document.addEventListener('DOMContentLoaded', function () {
  // 1. กำหนดโครงสร้าง Navbar
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

  // 2. กำหนดโครงสร้าง Footer
  const footerHTML = `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <div class="footer-info">
          <strong>Website : Si_HR ID card (ห้องทำบัตรพนักงาน)</strong>
          <p>ตึกท่านผู้หญิงวิจิตรา | จันทร์ , พุธ , ศุกร์ | เวลา 08:30 - 16:30 น. | โทร. 02-419-7180</p>
        </div>
        <div class="footer-copy">
          &copy; ${new Date().getFullYear()} ฝ่ายทรัพยากรบุคคล คณะแพทยศาสตร์ศิริราชพยาบาล
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
});
