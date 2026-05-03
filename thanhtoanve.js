// ===== LẤY THAM SỐ TỪ URL =====
const params     = new URLSearchParams(location.search);
const ticketName = params.get('name')  || 'Vé SunWorld Hòn Thơm';
const unitPrice  = parseInt(params.get('price')) || 889000;
const visitDate  = params.get('date')  || '';
const qty        = Math.max(1, parseInt(params.get('qty')) || 1);
const total      = unitPrice * qty;

// ===== FORMAT NGÀY =====
function formatDate(d) {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

// ===== HIỂN THỊ THÔNG TIN VÉ =====
document.getElementById('s-ticket').textContent = ticketName;
document.getElementById('s-date').textContent   = visitDate ? formatDate(visitDate) : '—';
document.getElementById('s-total').textContent  = total.toLocaleString('vi-VN') + ' VND';
document.getElementById('s-qty').textContent    = qty + ' vé × ' + unitPrice.toLocaleString('vi-VN');

// ===== CHỌN PHƯƠNG THỨC THANH TOÁN =====
document.querySelectorAll('.payment-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.payment-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
  });
});

// ===== VALIDATE FORM =====
function validateForm() {
  let valid = true;
  const fields = [
    { id: 'lastName',  errId: 'err-lastName',  check: v => v.trim().length > 0 },
    { id: 'firstName', errId: 'err-firstName', check: v => v.trim().length > 0 },
    { id: 'email',     errId: 'err-email',     check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'phone',     errId: 'err-phone',     check: v => v.trim().length >= 9 },
  ];
  fields.forEach(f => {
    const val = document.getElementById(f.id).value;
    const err = document.getElementById(f.errId);
    if (!f.check(val)) {
      err.style.display = 'block';
      document.getElementById(f.id).style.borderColor = '#e11d48';
      valid = false;
    } else {
      err.style.display = 'none';
      document.getElementById(f.id).style.borderColor = '#ddd';
    }
  });
  return valid;
}

// ===== XỬ LÝ ĐẶT VÉ =====
function submitBooking() {
  if (!validateForm()) return;

  const firstName = document.getElementById('firstName').value;
  const lastName  = document.getElementById('lastName').value;
  const email     = document.getElementById('email').value;
  const phone     = document.getElementById('phone').value;
  const payment   = document.querySelector('input[name="payment"]:checked').value;

  const payLabels = {
    cash:    'Tiền mặt tại quầy',
    card:    'Thẻ tín dụng/Ghi nợ',
    momo:    'Ví MoMo',
    zalopay: 'ZaloPay'
  };

  const code = 'SW-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  document.getElementById('booking-wrap').style.display   = 'none';
  document.getElementById('success-screen').style.display = 'block';
  document.getElementById('confirm-code').textContent     = code;

  document.getElementById('confirm-details').innerHTML = `
    <div class="confirm-row"><span class="lbl">Tên khách</span><span class="val">${lastName} ${firstName}</span></div>
    <div class="confirm-row"><span class="lbl">Email</span><span class="val">${email}</span></div>
    <div class="confirm-row"><span class="lbl">Điện thoại</span><span class="val">${phone}</span></div>
    <div class="confirm-row"><span class="lbl">Loại vé</span><span class="val">${ticketName}</span></div>
    <div class="confirm-row"><span class="lbl">Ngày tham quan</span><span class="val">${visitDate ? formatDate(visitDate) : '—'}</span></div>
    <div class="confirm-row"><span class="lbl">Số lượng</span><span class="val">${qty} vé</span></div>
    <div class="confirm-row"><span class="lbl">Thanh toán</span><span class="val">${payLabels[payment]}</span></div>
    <div class="confirm-row"><span class="lbl">Tổng tiền</span><span class="val" style="color:#0d74b1">${total.toLocaleString('vi-VN')} VND</span></div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}