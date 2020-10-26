const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

// UNSPLASH API
const count = 5;
const apiKey = 'Rotju_3NvunPDq5ihmPSN0TJlG59gUc3jQRJ5_B21hY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// CHECK IF ALL IMAGES WERE LOADED
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

// HELPER FUNCTION TO SET ATTRIBUTRS ON DOM ELEMENTS
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// CREATE ELEMENTS FOR LINKS & PHOTOS, ADD TO DOM
function displayPhotos() {
  totalImages = photoArray.length;
  // RUN FUNCTION FOR EACH OBJECT IN photoArray
  photoArray.forEach((photo) => {
    // CREATE <a> TO LINK TO UNSPLASH
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // CREATE <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // EVENT LISTENER, CHECK WHEN EACH IS FINISHED LOADING
    img.addEventListener('load', imageLoaded);
    // PUT <img> INSIDE <a>, THEN PUT BOTH INSIDE IMAGE CONTAINER ELEMENT
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// GET PHOTOS FROM UNSPLASH APPI
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {

  }
}

// CHECK TO SEE IF SCROLLNG NEAR BOTTOM OF PAGE, LOAD MORE PHOTOS
window.addEventListener('scroll', (e) => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// ON LOAD
getPhotos();