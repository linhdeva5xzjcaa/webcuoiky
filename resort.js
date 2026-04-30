function openForm(name, location, price) {
    document.getElementById("resortName").innerText = name;
    document.getElementById("resortInfo").innerText = location + " - " + price;
    document.getElementById("bookingForm").style.display = "block";
}

function closeForm() {
    document.getElementById("bookingForm").style.display = "none";
}

document.getElementById("formDatPhong").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Đặt phòng thành công!");

    document.getElementById("bookingForm").style.display = "none";
    this.reset();
});
