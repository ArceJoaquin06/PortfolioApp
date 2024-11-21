// Seleccionar los elementos necesarios
const nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list');

// Función para manejar el carrusel principal
const timeRunning = 3000; // Tiempo para completar una animación
const timeAutoNext = 7000; // Tiempo entre cada cambio automático

// Agregar eventos a los botones de navegación del carrusel principal
nextBtn.onclick = function () {
    console.log("Next button clicked");
    showSlider('next');
};

prevBtn.onclick = function () {
    console.log("Prev button clicked");
    showSlider('prev');
};

// Variable para manejar el tiempo de animación manual
let runTimeOut;

// Configurar el cambio automático de diapositivas
let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

// Función para mostrar el slider en la dirección especificada
function showSlider(type) {
    const sliderItemsDom = list.querySelectorAll('.carousel .list .item');
    
    if (type === 'next') {
        list.appendChild(sliderItemsDom[0]);
        carousel.classList.add('next');
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);
}

// Seleccionar todos los mini carruseles y sus botones de navegación
const miniCarousels = document.querySelectorAll('.carousel.slide.carousel-fade');

// Asegurar que los eventos en los botones de los mini carruseles no afecten al carrusel principal
miniCarousels.forEach((miniCarousel) => {
  // Seleccionar los botones de navegación del mini carrusel
  const nextBtnMini = miniCarousel.querySelector('.mini-carousel-next');
  const prevBtnMini = miniCarousel.querySelector('.mini-carousel-prev');
  
  // Función para manejar el mini carrusel
  nextBtnMini.addEventListener('click', function (e) {
    e.stopPropagation(); // Evita que se propague al carrusel principal
    const activeItem = miniCarousel.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling || miniCarousel.querySelector('.carousel-item:first-child');
    activeItem.classList.remove('active');
    nextItem.classList.add('active');
  });

  prevBtnMini.addEventListener('click', function (e) {
    e.stopPropagation(); // Evita que se propague al carrusel principal
    const activeItem = miniCarousel.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling || miniCarousel.querySelector('.carousel-item:last-child');
    activeItem.classList.remove('active');
    prevItem.classList.add('active');
  });
});
