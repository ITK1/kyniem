// js/names.js
document.addEventListener("DOMContentLoaded", function () {
  // Lấy các phần tử DOM
  const editName1Btn = document.getElementById("editName1Btn");
  const editName2Btn = document.getElementById("editName2Btn");
  const nameModal = document.getElementById("nameModal");
  const closeNameModal = document.getElementById("closeNameModal");
  const nameInput = document.getElementById("nameInput");
  const saveNameBtn = document.getElementById("saveNameBtn");
  const cancelNameBtn = document.getElementById("cancelNameBtn");
  const name1Element = document.getElementById("name1");
  const name2Element = document.getElementById("name2");

  let currentNameElement = null;

  // Tải tên từ localStorage khi trang được tải
  if (localStorage.getItem("name1")) {
    name1Element.textContent = localStorage.getItem("name1");
  }
  if (localStorage.getItem("name2")) {
    name2Element.textContent = localStorage.getItem("name2");
  }

  // Hàm mở modal chỉnh sửa tên
  function openNameModal(nameElement) {
    currentNameElement = nameElement;
    nameInput.value = nameElement.textContent;
    nameModal.style.display = "flex";
    nameInput.focus();
    document.body.style.overflow = "hidden";
  }

  // Hàm đóng modal
  function closeNameModal() {
    nameModal.style.display = "none";
    document.body.style.overflow = "auto";
    currentNameElement = null;
  }

  // Hàm lưu tên mới
  function saveName() {
    const newName = nameInput.value.trim();
    if (newName === "") {
      alert("Tên không được để trống!");
      return;
    }

    if (currentNameElement) {
      currentNameElement.textContent = newName;

      // Lưu vào localStorage
      if (currentNameElement.id === "name1") {
        localStorage.setItem("name1", newName);
      } else if (currentNameElement.id === "name2") {
        localStorage.setItem("name2", newName);
      }

      closeNameModal();
    }
  }

  // Thêm sự kiện click cho nút sửa tên
  editName1Btn.addEventListener("click", () => openNameModal(name1Element));
  editName2Btn.addEventListener("click", () => openNameModal(name2Element));

  // Thêm sự kiện cho các nút trong modal
  closeNameModal.addEventListener("click", closeNameModal);
  cancelNameBtn.addEventListener("click", closeNameModal);
  saveNameBtn.addEventListener("click", saveName);

  // Đóng modal khi click bên ngoài
  nameModal.addEventListener("click", (e) => {
    if (e.target === nameModal) {
      closeNameModal();
    }
  });

  // Xử lý khi nhấn Enter trong input
  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveName();
    }
  });

  // Xử lý khi nhấn Escape để đóng modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nameModal.style.display === "flex") {
      closeNameModal();
    }
  });
});
