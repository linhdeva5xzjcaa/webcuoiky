let bookingData = null;

(function loadData() {
  const raw = sessionStorage.getItem('hotelBooking');
  if (!raw) {
    document.getElementById('ticket-summary').innerHTML =
      '<p style="color:#e11d48;font-weight:600;padding:8px"> Không có thông tin đặt phòng. <a href="ks1-phuquoc.html">← Quay lại chọn phòng.</a></p>';
    document.querySelector('.btn-submit').disabled = true;
    return;
  }

  bookingData = JSON.parse(raw);

  const fmt     = n => parseInt(n).toLocaleString('vi-VN');
  const fmtDate = d => {
  if (!d) return '—';
  const [y,m,dd] = d.split('-');
  return `${dd}/${m}/${y}`;
};

  document.getElementById('s-hotel').textContent = bookingData.hotelName || '';
  document.getElementById('s-room').textContent  = bookingData.roomName  || '';
  document.getElementById('s-date').textContent  =
    `📅 ${fmtDate(bookingData.checkin)} → ${fmtDate(bookingData.checkout)} · 👥 ${bookingData.guests}`;
  document.getElementById('s-total').textContent = fmt(bookingData.totalPrice) + ' VNĐ';
  document.getElementById('s-qty').textContent   =
    `${bookingData.qty} phòng × ${bookingData.nights} đêm · ${fmt(bookingData.pricePerNight)} VNĐ/đêm`;


  const infoRows = [
  ['Họ và tên', bookingData.name || '—'],
  ['Email', bookingData.email || '—'],
  ['Điện thoại', bookingData.phone || '—'],
  ['Ghi chú', bookingData.notes || '(Không có)']
];

document.getElementById('customer-info-display').innerHTML =
  infoRows.map(([l, v]) =>
    `<div class="info-display-row">
      <span class="info-display-label">${l}:</span>
      <span class="info-display-val">${v}</span>
    </div>`
  ).join('');
})();


function selectPayment(radio) {
  document.querySelectorAll('.payment-item').forEach(el => el.classList.remove('selected'));
  radio.closest('.payment-item').classList.add('selected');
}


function submitBooking() {
  if (!bookingData) return;

  const payment = document.querySelector('input[name="payment"]:checked').value;
  const paymentLabel = { cash:'Thanh toán tại quầy', card:'Thẻ tín dụng/Ghi nợ', momo:'Ví MoMo', zalopay:'ZaloPay' }[payment];
  const code    = 'KS-' + Math.floor(100000 + Math.random() * 900000);
  const fmt     = n => parseInt(n).toLocaleString('vi-VN');
  const fmtDate = d => {
  if (!d) return '—';
  const [y,m,dd] = d.split('-');
  return `${dd}/${m}/${y}`;
};

  document.getElementById('confirm-code').textContent = code;

  const rows = [
    ['Khách sạn',        bookingData.hotelName],
    ['Loại phòng',       bookingData.roomName],
    ['Ngày nhận phòng',  fmtDate(bookingData.checkin)],
    ['Ngày trả phòng',   fmtDate(bookingData.checkout)],
    ['Số đêm',           bookingData.nights + ' đêm'],
    ['Số phòng',         bookingData.qty + ' phòng'],
    ['Số khách', bookingData.guests],
    ['Họ và tên', bookingData.name],
    ['Email',            bookingData.email],
    ['SĐT',              bookingData.phone],
    ['Ghi chú',          bookingData.notes || '—'],
    ['Thanh toán',       paymentLabel],
    ['Tổng tiền',        fmt(bookingData.totalPrice) + ' VNĐ'],
  ];

  document.getElementById('confirm-details').innerHTML = rows.map(([l, v]) =>
    `<div class="confirm-row"><span class="lbl">${l}</span><span class="val">${v}</span></div>`
  ).join('');

  sessionStorage.setItem('lastBookingCode', code);
  sessionStorage.removeItem('hotelBooking');

  document.getElementById('booking-wrap').style.display   = 'none';
  document.getElementById('success-screen').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
