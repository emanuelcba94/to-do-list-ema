// CONTACTO EMA
const contenido = document.getElementById('contenido-ema');
const contenidoImg = document.querySelector('.contenido-ema img');
const mensaje = document.getElementById('mensaje-contacto');
const btnCerrar = document.getElementById('btn-cerrar');

contenido.addEventListener('click', () => {
    mensaje.classList.toggle('active-mensaje');
})

btnCerrar.addEventListener('click', () => {
    message.classList.toggle('active-mensaje');
})

window.addEventListener('click', e =>{
    if(mensaje.classList.contains('active-mensaje') && e.target != mensaje && e.target != contenido && e.target !=contenidoImg){
        mensaje.classList.toggle('active-mensaje');
    }
})




