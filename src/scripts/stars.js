const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");



function ajustarCanvas() {
    canvas.width = window.innerWidth; // Ajusta el ancho al tamaño de la ventana
    canvas.height = window.innerHeight; // Ajusta el alto al tamaño de la ventana
}

// Llama la función al cargar la página y al redimensionar
ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

let estrellas = [];
const cantidadEstrellas = 300; // Ajusta el número de estrellas según sea necesario

export function generarEstrellas() {
    estrellas = [];
    for (let i = 0; i < cantidadEstrellas; i++) {
        estrellas.push({
            x: Math.random() * canvas.width, // Posición horizontal aleatoria
            y: Math.random() * canvas.height, // Posición vertical aleatoria
            radio: Math.random() * 2, // Tamaño de la estrella
            velocidad: Math.random() * 0.5 + 0.2, // Velocidad de caída
        });
    }
}

function dibujarEstrellas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el lienzo

    estrellas.forEach((estrella) => {
        ctx.beginPath();
        ctx.arc(estrella.x, estrella.y, estrella.radio, 0, Math.PI * 2);
        ctx.fillStyle = "white"; // Color de las estrellas
        ctx.fill();
    });
}

function actualizarEstrellas() {
    estrellas.forEach((estrella) => {
        estrella.y += estrella.velocidad; // Movimiento hacia abajo
        if (estrella.y > canvas.height) {
            estrella.y = 0; // Reinicia la posición vertical
            estrella.x = Math.random() * canvas.width; // Nueva posición horizontal
        }
    });
}

export function animar() {
    actualizarEstrellas();
    dibujarEstrellas();
    requestAnimationFrame(animar);
}

// Inicializa las estrellas y comienza la animación
