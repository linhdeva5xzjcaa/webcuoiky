let currentPriceRaw = 0;
let currentRoomName = "";

function toggleGuest() {
  const box = document.querySelector('.guest-box');
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function changeCount(type, val) {
  const el = document.getElementById(type);
  let num = parseInt(el.textContent) + val;
  if (type === 'adult' && num < 1) num = 1;
  if (type === 'child' && num < 0) num = 0;
  el.textContent = num;
  updateGuestText();
  filterRooms();
}

function updateGuestText() {
  const a = document.getElementById('adult').textContent;
  const c = document.getElementById('child').textContent;
  document.getElementById('guestText').textContent = `${a} người lớn • ${c} trẻ em`;
}


document.addEventListener('click', e => {
  if (!document.querySelector('.guest-field').contains(e.target)) {
    document.querySelector('.guest-box').style.display = 'none';
  }
});



function filterRooms() {
  const totalGuests =
    parseInt(document.getElementById('adult').textContent) +
    parseInt(document.getElementById('child').textContent);

  const types      = [...document.querySelectorAll('.type:checked')].map(e => e.value);
  const beds       = [...document.querySelectorAll('.bed:checked')].map(e => e.value);
  const breakfasts = [...document.querySelectorAll('.breakfast:checked')].map(e => e.value);

  document.querySelectorAll('.room-card').forEach(card => {
    const ok =
      totalGuests <= parseInt(card.dataset.capacity) &&
      (types.length      === 0 || types.includes(card.dataset.type)) &&
      (beds.length       === 0 || beds.includes(card.dataset.bed)) &&
      (breakfasts.length === 0 || breakfasts.includes(card.dataset.breakfast));

    card.classList.toggle('hidden', !ok);
  });
}



let currentAvailable = 0;

function openPopup(btn) {
  const card = btn.closest('.room-card');

  currentAvailable = parseInt(card.dataset.available);


  currentRoomName = card.querySelector('h3').innerText;


  const priceText = card.querySelector('p b').innerText;
  currentPriceRaw = parseInt(priceText.replace(/\D/g, ''));


  const checkin  = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const adult    = document.getElementById('adult').textContent;
  const child    = document.getElementById('child').textContent;

  document.getElementById('pCheckin').textContent  = checkin  || 'Chưa chọn';
  document.getElementById('pCheckout').textContent = checkout || 'Chưa chọn';
  document.getElementById('pGuest').textContent    = `${adult} người lớn • ${child} trẻ em`;
  document.getElementById('popupAvailable').textContent = `${currentAvailable} phòng`;

  document.getElementById('roomQty').value = 1;
  clearErrors();
}

function checkRoom() {
  const qty = parseInt(document.getElementById('roomQty').value) || 0;
  const err = document.getElementById('errQty');
  if (qty < 1) {
    showError(err, '❌ Số phòng tối thiểu là 1');
  } else if (qty > currentAvailable) {
    showError(err, `❌ Chỉ còn ${currentAvailable} phòng`);
  } else {
    hideError(err);
  }
}

function saveInfo() {
  clearErrors();
  let valid = true;
  const qty     = parseInt(document.getElementById('roomQty').value) || 0;
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const checkin  = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const adult   = document.getElementById('adult').textContent;
  const child   = document.getElementById('child').textContent;
  const notes = document.getElementById('notes').value.trim();
  if (qty < 1) { showError(document.getElementById('errQty'), '❌ Vui lòng chọn ít nhất 1 phòng'); valid = false; }
  else if (qty > currentAvailable) { showError(document.getElementById('errQty'), `❌ Chỉ còn ${currentAvailable} phòng`); valid = false; }
  if (!name) { showError(document.getElementById('errName'), '❌ Vui lòng nhập họ tên'); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError(document.getElementById('errEmail'), '❌ Email không hợp lệ'); valid = false; }
  if (!phone || !/^(0|\+84)[0-9]{8,10}$/.test(phone.replace(/\s/g,''))) { showError(document.getElementById('errPhone'), '❌ Số điện thoại không hợp lệ'); valid = false; }
  if (!checkin) {
  alert("Vui lòng chọn ngày nhận phòng");
  return;
}
if (!checkout) {
  alert("Vui lòng chọn ngày trả phòng");
  return;
}
  if (!valid) return;
  let nights = 1;
  if (checkin && checkout) nights = Math.max(1, Math.round((new Date(checkout) - new Date(checkin)) / 86400000));
  const totalPrice = currentPriceRaw * qty * nights;
  const bookingData = {
  type: 'hotel',
  hotelName: 'Khách sạn Wyndham Garden GrandWorld Phú Quốc',
  roomName: currentRoomName,


  checkin,
  checkout,

  nights,
  qty,
  pricePerNight: currentPriceRaw,
  totalPrice,


  adults: adult,
  children: child,


  guests: `${adult} người lớn • ${child} trẻ em`,

  name,
  email,
  phone,

  notes,
};
  sessionStorage.setItem('hotelBooking', JSON.stringify(bookingData));
  window.location.href = 'booking.html';
}
 
function formatDate(s) { const [y,m,d] = s.split('-'); return `${d}/${m}/${y}`; }
function formatPrice(n) { return Number(n).toLocaleString('vi-VN'); }
function showError(el, msg) { el.textContent = msg; el.style.display = 'block'; }
function hideError(el) { el.textContent = ''; el.style.display = 'none'; }
function clearErrors() { ['errQty','errName','errEmail','errPhone','errorMsg'].forEach(id => hideError(document.getElementById(id))); }


window.addEventListener('load', () => {
  if (window.location.hash === '#popup-book') {
    document.getElementById('popup-book').style.display = 'block';
  }
});
