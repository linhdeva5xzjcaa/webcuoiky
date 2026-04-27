// ===== LƯU PHÒNG ĐANG CHỌN =====
let selectedRoomName = "JW Marriott Phú Quốc";
let selectedRoomPrice = 11400000;

// Gọi khi bấm "Đặt ngay" ở mỗi thẻ phòng
function selectRoom(name, price) {
  selectedRoomName = name;
  selectedRoomPrice = price;

  // Hiển thị tên phòng trong modal
  const label = document.getElementById("modal-room-label");
  if (label) {
    label.textContent = "🛏 " + name + " — " + price.toLocaleString("vi-VN") + " VNĐ/đêm";
  }
}

// ===== VALIDATE FORM MODAL =====
function validateModal() {
  let valid = true;

  // Họ tên
  const fullName = document.getElementById("fullName");
  const errName = document.getElementById("err-fullName");
  if (!fullName.value.trim()) {
    errName.style.display = "block";
    fullName.style.borderColor = "#e11d48";
    valid = false;
  } else {
    errName.style.display = "none";
    fullName.style.borderColor = "#ccc";
  }

  // Email
  const email = document.getElementById("email");
  const errEmail = document.getElementById("err-email");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  if (!emailOk) {
    errEmail.style.display = "block";
    email.style.borderColor = "#e11d48";
    valid = false;
  } else {
    errEmail.style.display = "none";
    email.style.borderColor = "#ccc";
  }

  // Số điện thoại
  const phone = document.getElementById("phone");
  const errPhone = document.getElementById("err-phone");
  if (phone.value.trim().length < 9) {
    errPhone.style.display = "block";
    phone.style.borderColor = "#e11d48";
    valid = false;
  } else {
    errPhone.style.display = "none";
    phone.style.borderColor = "#ccc";
  }

  // Ngày check in
  const checkin = document.getElementById("checkin");
  const errCheckin = document.getElementById("err-checkin");
  if (!checkin.value) {
    errCheckin.style.display = "block";
    checkin.style.borderColor = "#e11d48";
    valid = false;
  } else {
    errCheckin.style.display = "none";
    checkin.style.borderColor = "#ccc";
  }

  // Ngày check out
  const checkout = document.getElementById("checkout");
  const errCheckout = document.getElementById("err-checkout");
  if (!checkout.value) {
    errCheckout.style.display = "block";
    checkout.style.borderColor = "#e11d48";
    valid = false;
  } else {
    errCheckout.style.display = "none";
    checkout.style.borderColor = "#ccc";
  }

  // Check out phải sau check in
  if (checkin.value && checkout.value && checkout.value <= checkin.value) {
    errCheckout.textContent = "Ngày trả phòng phải sau ngày nhận";
    errCheckout.style.display = "block";
    checkout.style.borderColor = "#e11d48";
    valid = false;
  }

  return valid;
}

// ===== CHUYỂN SANG TRANG THANH TOÁN =====
function goToCheckout() {
  if (!validateModal()) return;

  const fullName = document.getElementById("fullName").value.trim();
  const email    = document.getElementById("email").value.trim();
  const phone    = document.getElementById("phone").value.trim();
  const qty      = document.getElementById("qty").value || 1;
  const checkin  = document.getElementById("checkin").value || "";
  const notes    = document.getElementById("notes").value || "";

  // Tách họ / tên
  let firstName = "", lastName = "";
  if (fullName !== "") {
    const parts = fullName.split(" ");
    firstName = parts.pop();
    lastName  = parts.join(" ");
  }

  // Dùng giá & tên phòng đang được chọn (không hardcode)
  window.location.href =
    `thanhtoan.html` +
    `?name=${encodeURIComponent(selectedRoomName)}` +
    `&price=${selectedRoomPrice}` +
    `&qty=${qty}` +
    `&date=${checkin}` +
    `&firstName=${encodeURIComponent(firstName)}` +
    `&lastName=${encodeURIComponent(lastName)}` +
    `&email=${encodeURIComponent(email)}` +
    `&phone=${encodeURIComponent(phone)}` +
    `&notes=${encodeURIComponent(notes)}` +
    `&type=resort`;
}
const checkboxes = document.querySelectorAll(".filter-box input");
const cards = document.querySelectorAll(".cards");

checkboxes.forEach(cb => {
  cb.addEventListener("change", filterRooms);
});

function filterRooms() {
  const selected = {
    type: [],
    bed: [],
    amenities: []
  };

  document.querySelectorAll(".filter-group").forEach(group => {
    const title = group.querySelector("p").innerText;

    group.querySelectorAll("input:checked").forEach(cb => {
      if (title.includes("Loại")) selected.type.push(cb.value);
      if (title.includes("Giường")) selected.bed.push(cb.value);
      if (title.includes("Tiện")) selected.amenities.push(cb.value);
    });
  });

  cards.forEach(card => {
    const type = card.dataset.type;
    const bed = card.dataset.bed;
    const amenities = card.dataset.amenities;

    let show = true;

    if (selected.type.length && !selected.type.includes(type)) show = false;
    if (selected.bed.length && !selected.bed.includes(bed)) show = false;

    if (selected.amenities.length) {
      let match = selected.amenities.some(a => amenities.includes(a));
      if (!match) show = false;
    }

    card.style.display = show ? "block" : "none";
  });
}