const previewImages = document.getElementsByClassName("preview");
const bigImageWrapper = document.querySelector(".central-slide");
const previewImagesWrapper = document.querySelector(".preview-slides");
const nextImage = document.querySelector(".right-button");
const prevImage = document.querySelector(".left-button");

function isCurrent(element, index, array) {
  const currentImage = bigImageWrapper.getElementsByTagName("img")[0].src.replace("_big.jpg", "_small.jpg");

  return element.getElementsByTagName("img")[0].src == currentImage;
}

const setUpNewBigImages = (smallImageSrc) => {
  const bigImageSrc = smallImageSrc.replace("_small.jpg", "_big.jpg");

  const newBigImage = document.createElement("img");
  newBigImage.src = bigImageSrc;

  bigImageWrapper.innerHTML = "";
  bigImageWrapper.appendChild(newBigImage);
};

const setUpNextBigImage = (direction) => {
  
  const previewImagesArray = Array.from(previewImages);


  let i = previewImagesArray.findIndex(isCurrent)

  if (direction == "forward") {
    i = (i == previewImagesArray.length - 1) ? 0 : i + 1;
  }

  if (direction == "backward") {
    i = i == 0 ? (previewImagesArray.length - 1) : i - 1;
  }
  setUpNewBigImages(previewImagesArray[i].getElementsByTagName("img")[0].src)
}

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
nextImage.addEventListener("click", () => { setUpNextBigImage("forward") });
prevImage.addEventListener("click", () => { setUpNextBigImage("backward") });

