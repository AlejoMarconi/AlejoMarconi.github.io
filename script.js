const images = document.querySelectorAll('.image-gallery img');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal-img');
const closeButton = document.querySelector('.close-button');
const fileInput = document.getElementById('file-input');
const addButton = document.getElementById('add-button');

images.forEach(image => {
  image.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = image.src;

    // Use setTimeout to add the 'open' class after a slight delay
    setTimeout(() => {
      modalImg.classList.add('open');
    }, 10);
  });
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
  modalImg.src = '';
  modalImg.classList.remove('open'); // Remove the 'open' class
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalImg.src = '';
    modalImg.classList.remove('open'); // Remove the 'open' class
  }
});

addButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = function () {
      const newImage = document.createElement('img');
      newImage.src = reader.result;
      newImage.alt = 'New Image';
      newImage.classList.add('image-gallery-img');
      newImage.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = newImage.src;

        // Use setTimeout to add the 'open' class after a slight delay
        setTimeout(() => {
          modalImg.classList.add('open');
        }, 10);
      });
      document.querySelector('.image-gallery').appendChild(newImage);
    };
    reader.readAsDataURL(file);
  }
});
