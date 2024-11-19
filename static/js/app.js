// Seleccionar los elementos necesarios
const nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list');

// Definir los tiempos para las transiciones
const timeRunning = 3000; // Tiempo para completar una animación
const timeAutoNext = 7000; // Tiempo entre cada cambio automático

// Agregar eventos a los botones de navegación
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
    // Obtener los elementos actuales del carrusel
    const sliderItemsDom = list.querySelectorAll('.carousel .list .item');
    
    if (type === 'next') {
        // Mover el primer elemento al final
        list.appendChild(sliderItemsDom[0]);
        carousel.classList.add('next');
    } else {
        // Mover el último elemento al principio
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.classList.add('prev');
    }

    // Eliminar las clases después de la animación
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    // Reiniciar el temporizador automático
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);
}