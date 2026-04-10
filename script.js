let isLogin = true;
const users = {}; // Lưu tạm trong bộ nhớ trình duyệt

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("login-form").style.display = isLogin ? "block" : "none";
  document.getElementById("register-form").style.display = isLogin ? "none" : "block";
  document.getElementById("form-title").innerText = isLogin ? "Đăng nhập" : "Đăng ký";
  document.querySelector(".toggle").innerText = isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập";
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  if (users[username] && users[username] === password) {
    window.location.href = "book.html";
    return false;
    alert("Đăng nhập thành công!");
  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu!");
  }
}

function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-confirm").value;

  if (!username || !password) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  if (password !== confirm) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }
  if (users[username]) {
    alert("Tên đăng nhập đã tồn tại!");
    return;
  }
  users[username] = password;
  alert("Đăng ký thành công! Bạn có thể đăng nhập.");
  toggleForm();
}
