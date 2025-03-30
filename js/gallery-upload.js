// gallery-upload.js - Xử lý chức năng thêm ảnh vào gallery
document.addEventListener("DOMContentLoaded", function () {
  console.log("Gallery upload script loaded");

  // Lấy các phần tử DOM
  const addImageBtn = document.getElementById("addImageBtn");
  const imageModal = document.getElementById("imageModal");
  const closeImageModal = document.getElementById("closeImageModal");
  const imageUpload = document.getElementById("imageUpload");
  const imagePreview = document.getElementById("imagePreview");
  const imageCaption = document.getElementById("imageCaption");
  const saveImageBtn = document.getElementById("saveImageBtn");
  const cancelImageBtn = document.getElementById("cancelImageBtn");
  const galleryContainer = document.querySelector(".gallery-container");

  // Kiểm tra các phần tử DOM
  console.log("Add Image Button:", addImageBtn);
  console.log("Image Modal:", imageModal);
  console.log("Gallery Container:", galleryContainer);

  // Tải gallery từ localStorage
  loadGalleryFromLocalStorage();

  // Hàm mở modal thêm ảnh
  function openImageModal() {
    console.log("Opening image modal");
    imageModal.style.display = "flex";
    imageCaption.value = "";
    imagePreview.innerHTML = "<p>Chưa có ảnh được chọn</p>";
  }

  // Hàm đóng modal thêm ảnh
  function closeImageModal() {
    console.log("Closing image modal");
    imageModal.style.display = "none";
    imageUpload.value = "";
  }

  // Xử lý khi chọn ảnh
  if (imageUpload) {
    imageUpload.addEventListener("change", function () {
      console.log("Image selected");
      const file = this.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.innerHTML = `<img src="${e.target.result}" alt="Ảnh xem trước">`;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Xử lý khi lưu ảnh mới
  function saveImage() {
    console.log("Saving image");
    const file = imageUpload.files[0];
    if (!file) {
      alert("Vui lòng chọn một ảnh!");
      return;
    }

    const caption = imageCaption.value.trim() || "Kỷ niệm đẹp";
    const reader = new FileReader();

    reader.onload = function (e) {
      // Tạo phần tử gallery mới
      const newItem = document.createElement("div");
      newItem.classList.add("gallery-item");

      newItem.innerHTML = `
                <img src="${e.target.result}" alt="${caption}">
                <div class="gallery-overlay">
                    <span>${caption}</span>
                </div>
            `;

      // Thêm vào đầu gallery
      galleryContainer.insertBefore(newItem, galleryContainer.firstChild);

      // Thêm sự kiện click cho ảnh mới
      setupGalleryItemEvents([newItem]);

      // Lưu vào localStorage
      saveGalleryToLocalStorage();

      // Đóng modal
      closeImageModal();
    };

    reader.readAsDataURL(file);
  }

  // Lưu gallery vào localStorage
  function saveGalleryToLocalStorage() {
    console.log("Saving gallery to localStorage");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const gallery = [];

    galleryItems.forEach((item) => {
      gallery.push({
        src: item.querySelector("img").src,
        caption: item.querySelector(".gallery-overlay span").textContent,
      });
    });

    localStorage.setItem("gallery", JSON.stringify(gallery));
  }

  // Tải gallery từ localStorage
  function loadGalleryFromLocalStorage() {
    console.log("Loading gallery from localStorage");
    const savedGallery = localStorage.getItem("gallery");
    if (savedGallery) {
      try {
        const gallery = JSON.parse(savedGallery);

        // Xóa các ảnh mẫu nếu có ảnh đã lưu
        if (gallery.length > 0) {
          galleryContainer.innerHTML = "";
        }

        gallery.forEach((item) => {
          const newItem = document.createElement("div");
          newItem.classList.add("gallery-item");
          newItem.innerHTML = `
                        <img src="${item.src}" alt="${item.caption}">
                        <div class="gallery-overlay">
                            <span>${item.caption}</span>
                        </div>
                    `;
          galleryContainer.appendChild(newItem);
        });

        // Thêm sự kiện click cho các ảnh đã tải
        setupGalleryItemEvents(document.querySelectorAll(".gallery-item"));
      } catch (e) {
        console.error("Error loading gallery from localStorage:", e);
      }
    }
  }

  // Thêm sự kiện click cho các ảnh trong gallery
  function setupGalleryItemEvents(items) {
    const modal = document.getElementById("galleryModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    items.forEach((item) => {
      item.addEventListener("click", function () {
        modal.style.display = "block";
        modalImg.src = this.querySelector("img").src;
        captionText.innerHTML = this.querySelector(
          ".gallery-overlay span"
        ).textContent;
        document.body.style.overflow = "hidden";
      });
    });
  }

  // Thêm sự kiện click cho các nút
  if (addImageBtn) {
    addImageBtn.addEventListener("click", function () {
      console.log("Add image button clicked");
      openImageModal();
    });
  }

  if (closeImageModal) {
    closeImageModal.addEventListener("click", closeImageModal);
  }

  if (cancelImageBtn) {
    cancelImageBtn.addEventListener("click", closeImageModal);
  }

  if (saveImageBtn) {
    saveImageBtn.addEventListener("click", saveImage);
  }

  // Thiết lập sự kiện cho các ảnh có sẵn
  setupGalleryItemEvents(document.querySelectorAll(".gallery-item"));
});
