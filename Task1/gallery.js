const previewImages = document.getElementsByClassName("preview");
const bigImageWrapper = document.querySelector(".central-slide");
const previewImagesWrapper = document.querySelector(".preview-slides");

const setUpNewBigImages = (smallImageSrc) => {
  const bigImageSrc = smallImageSrc.replace("_small.jpg", "_big.jpg");

  const newBigImage = document.createElement("img");
  newBigImage.src = bigImageSrc;

  bigImageWrapper.innerHTML = "";
  bigImageWrapper.appendChild(newBigImage);
};

const setUpNewActivePreviewImage = (event) => {
  const activePreviewImage = document.querySelector(".preview-slides .active");
  activePreviewImage.classList.remove("active");

  event.target.parentElement.classList.add("active");
};

const galleryHandler = (event) => {
  if (event.target === event.currentTarget) return;

  const image = new Image();
  image.src = event.target.src.replace("_small.jpg", "_big.jpg");

  image.onload = function () {
    setUpNewBigImages(event.target.src);
    setUpNewActivePreviewImage(event);
  };

  image.onerror = function () {
    alert("картинка не существует");
  };
};

previewImagesWrapper.addEventListener("click", galleryHandler);
