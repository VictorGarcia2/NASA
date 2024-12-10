
import { generarEstrellas, animar } from "./stars.js";
const date = document.querySelector('#date-picker')
const card = document.querySelector('.card')
const peticion = document.querySelector('#peticion')
peticion.addEventListener('click', () => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=ANxSr2MF24pdqvlnrfVWfs0xsGxiibQBUqZ3uR0S&date=${date.value}`)
        .then((response) => response.json())
        .then((data) => create(data))
})
function create(valor) {
    console.log(valor);
    let divImg = document.createElement('div')
    divImg.classList.add('pb-5')
    divImg.classList.add('px-4')
    let img = document.createElement('img')
    img.classList.add('w-96', 'h-96', 'rounded-lg', 'object-cover')
    img.src = valor.hdurl
    divImg.appendChild(img)
    card.appendChild(divImg)
    let divBtn = document.createElement('div')
    divBtn.classList.add('p-8', 'flex', 'justify-center')
    let a = document.createElement('a')
    a.href = valor.hdurl
    a.download = "imagen_nasa.jpg"
    let btn = document.createElement('button')
    btn.classList.add('bg-white', 'p-2', 'rounded-md', 'text-black')
    btn.textContent = "Ver imagen completa"
    divBtn.appendChild(a)
    a.appendChild(btn)
    card.appendChild(divBtn)
    let divCopy = document.createElement('div')
    divCopy.classList.add('p-8', 'flex', 'justify-center', 'flex-col')
    let titulo  = document.createElement('h2')
    titulo.classList.add('text-white', 'text-3xl', 'pb-8', 'text-start')
    titulo.textContent = valor.title
    let explicacion = document.createElement('h3')
    explicacion.classList.add('text-white', 'text-2xl', 'font-mono')
    explicacion.textContent = 'Explanation:'
    let copy = document.createElement('p')
    copy.classList.add('text-white', 'text-sm', 'h-52', 'overflow-scroll', 'font-mono')
    copy.textContent = valor.explanation
    divCopy.appendChild(titulo)
    divCopy.appendChild(explicacion)
    divCopy.appendChild(copy)
    card.appendChild(divCopy)
}
generarEstrellas();
animar();
