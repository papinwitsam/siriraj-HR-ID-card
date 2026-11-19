// ใน layout.js
const footerHTML = `
  <footer class="si-footer">
    <div class="si-footer-container">
      <!-- คอลัมน์ 1: หน่วยงาน & ที่ตั้ง -->
      <div class="si-footer-col si-footer-brand">
        <div class="si-footer-logo">
          <img src="favicon.png" alt="Si_HR ID card">
          <div>
            <strong>Si_HR ID card</strong>
            <span>ฝ่ายทรัพยากรบุคคล คณะแพทยศาสตร์ศิริราชพยาบาล</span>
          </div>
        </div>
        <p class="si-footer-address">
          <i class="fa-solid fa-location-dot"></i> ตึกท่านผู้หญิงวิจิตรา โรงพยาบาลศิริราช
        </p>
        <a href="https://forms.gle/JvUvBWacMSyfYq31A" target="_blank" rel="noopener noreferrer" class="si-feedback-btn">
          <i class="fa-regular fa-comment-dots"></i> แบบฟอร์มคำแนะนำ / ติชม
        </a>
      </div>

      <!-- คอลัมน์ 2: ช่องทางการติดต่อ & เวลาทำการ -->
      <div class="si-footer-col">
        <h4>ช่องทางการติดต่อ</h4>
        <ul class="si-contact-list">
          <li>
            <span class="label">วันให้บริการ</span>
            <span class="value">จันทร์ | พุธ | ศุกร์</span>
          </li>
          <li>
            <span class="label">เวลาทำการ</span>
            <span class="value">08:30 – 16:30 น. (พักเที่ยง)</span>
          </li>
          <li>
            <span class="label">โทรศัพท์</span>
            <a href="tel:024197180" class="value link">0-2419-7180</a>
          </li>
          <li>
            <span class="label">อีเมล</span>
            <a href="mailto:papinwit.sam@mahidol.ac.th" class="value link">papinwit.sam@mahidol.ac.th</a>
          </li>
        </ul>
      </div>

      <!-- คอลัมน์ 3: เมนูด่วน & LINE QR -->
      <div class="si-footer-col si-footer-links-wrap">
        <div>
          <h4>เมนูด่วน</h4>
          <ul class="si-quick-links">
            <li><a href="damaged-card.html">บัตรพนักงานชำรุด</a></li>
            <li><a href="lost-card.html">บัตรพนักงานหาย</a></li>
            <li><a href="new-employee-card.html">ทำบัตรพนักงานบรรจุใหม่</a></li>
            <li><a href="time-recording-guide.html">ขั้นตอนการบันทึกเวลา</a></li>
            <li><a href="half-day-leave.html">การลงเวลา ลาครึ่งวัน</a></li>
            <li><a href="internet-guide.html">สมัครใช้งาน Internet</a></li>
            <li><a href="Card-Map.html">แผนที่จุดทาบบัตร</a></li>
          </ul>
        </div>

        <div class="si-qr-card">
          <img src="https://lh3.googleusercontent.com/d/1Mvo_v_kDtL4wOh22Q36dZmUaND2Kub74" alt="QR Code LINE Si_HR ID Card" loading="lazy">
          <span>LINE: Si_HR ID Card</span>
        </div>
      </div>
    </div>

    <div class="si-footer-bottom">
      <p>© ${new Date().getFullYear()} Si_HR ID card — ฝ่ายทรัพยากรบุคคล คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล</p>
    </div>
  </footer>
`;
