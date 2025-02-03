import { generarEstrellas, animar } from "./stars.js";
import { SECRET_PASSWORD, PUBLIC_ANYBODY } from "./config.js";
const date = document.querySelector('#date-picker')
const card = document.querySelector('#card')
const peticion = document.querySelector('#peticion')
const alert = document.querySelector('.alert')
peticion.addEventListener('click', () => {
    card.innerHTML = ""
    if (date.value !== "") {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=ANxSr2MF24pdqvlnrfVWfs0xsGxiibQBUqZ3uR0S&date=${date.value}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => create(data))
            .catch((error) => {
                console.error('Hubo un problema con la solicitud:', error);
                alert.classList.toggle('hidden')
            });
    } else {
        date.classList.add('border-2', 'border-red-700', 'bg-red-700/20', 'text-white');


    }
})



 async function create(valor) {
    console.log(valor)
    alert.classList.add('hidden')
    let divImg = document.createElement('div')
    divImg.classList.add('pb-5')
    divImg.classList.add('px-4', 'flex', 'justify-center')
    let img = document.createElement('img')
    img.classList.add('w-96', 'h-96', 'rounded-lg', 'object-contain')
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
    let titulo = document.createElement('h2')
    titulo.classList.add('text-white', 'text-3xl', 'pb-8', 'text-start')
    titulo.textContent = valor.title
    let explicacion = document.createElement('h3')
    explicacion.classList.add('text-white', 'text-2xl', 'font-mono')
    explicacion.textContent = 'Explanation:'
    let copy = document.createElement('p')
    copy.classList.add('text-white', 'text-sm', 'h-52', 'overflow-auto', 'font-mono')
   
        const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': SECRET_PASSWORD,
                'x-rapidapi-host': PUBLIC_ANYBODY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                from: 'auto',
                to: 'es',
                text: `${valor.explanation}`
            })
        };
    
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result)
            copy.textContent = result.trans
        } catch (error) {
            console.error(error);
        }
        console.log(options)
    
    
    divCopy.appendChild(titulo)
    divCopy.appendChild(explicacion)
    divCopy.appendChild(copy)
    card.appendChild(divCopy)
}
generarEstrellas();
animar();
