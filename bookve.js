// Dữ liệu vé đang được chọn
  let currentTicket = { name: '', price: 0, img: '' };

  function getTodayStr() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  function getMaxDateStr() {
    const max = new Date();
    max.setFullYear(max.getFullYear() + 1);
    const yyyy = max.getFullYear();
    const mm = String(max.getMonth() + 1).padStart(2, '0');
    const dd = String(max.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  function openBookPopup(name, price, img) {
    currentTicket = { name, price, img };
    document.getElementById('pb-ticket-name').textContent = name;
    document.getElementById('pb-ticket-price').textContent =
      'Đơn giá: ' + price.toLocaleString('vi-VN') + ' VND / vé';
    document.getElementById('pb-qty').value = 1;

    // Thiết lập ngày: mặc định hôm nay, min hôm nay, max 1 năm tới
    const dateInput = document.getElementById('pb-date');
    const todayStr = getTodayStr();
    dateInput.min   = todayStr;
    dateInput.max   = getMaxDateStr();
    dateInput.value = todayStr;

    updateTotal();
    // Ẩn thông báo lỗi cũ
    document.getElementById('pb-err-date').style.display = 'none';
    document.getElementById('pb-err-qty').style.display  = 'none';
    document.getElementById('popup-book-modal').classList.add('open');
  }

  function closeBookPopup() {
    document.getElementById('popup-book-modal').classList.remove('open');
  }

  // Đóng popup khi click ra ngoài
  document.getElementById('popup-book-modal').addEventListener('click', function(e) {
    if (e.target === this) closeBookPopup();
  });

  function updateTotal() {
    const qty = parseInt(document.getElementById('pb-qty').value) || 1;
    const total = currentTicket.price * qty;
    document.getElementById('pb-total').textContent =
      total.toLocaleString('vi-VN') + ' VND';
  }

  function goToBooking() {
    const date = document.getElementById('pb-date').value;
    const qty  = parseInt(document.getElementById('pb-qty').value);
    let valid  = true;

    if (!date) {
      document.getElementById('pb-err-date').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('pb-err-date').style.display = 'none';
    }

    if (!qty || qty < 1) {
      document.getElementById('pb-err-qty').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('pb-err-qty').style.display = 'none';
    }

    if (!valid) return;

    // Tạo URL với đầy đủ thông tin vé
    const params = new URLSearchParams({
      name:  currentTicket.name,
      price: currentTicket.price,
      img:   currentTicket.img,
      date:  date,
      qty:   qty
    });

    window.location.href = 'booking.html?' + params.toString();
  }