const almacenados = JSON.parse(localStorage.getItem("ProductosCarrito")) || [];          //Recupero los datos del localStorage
console.log(almacenados);

function productosCheckout(almacenados)
{
     console.log("entra");
     const lista = document.getElementById("listaProductos");
     for (const items of almacenados) {
         lista.innerHTML += `
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 class="my-0">${items.marca}</h6>
                                <small class="text-muted">${items.unidades} x </small>
                                <small class="text-muted">${items.modelo}</small>
                                
                            </div>
                            <span class="text-muted">$${new Intl.NumberFormat('de-DE').format(items.precio)}</span>
                            </li>
                            `
    };
    const preciosDolares=document.getElementById("preciosDolar")
    preciosDolares.style.display="none";
    mostraElementosCarritos();
}
productosCheckout(almacenados);


selectorPago();
//Funcion que obtiene el valor de la opcion de pago selecionada, si es diferente a tarjeta de credito oculta los campos para la tarjeta de credito
function selectorPago(){
    const datosTarjeta=document.getElementById("pagoTarjeta");
    datosTarjeta.style.display="none";
    const precioPesos=document.getElementById("preciosPesos");
    const preciosDolares=document.getElementById("preciosDolar");


    if (document.querySelector('input[name="formaDePago"]')) {
        document.querySelectorAll('input[name="formaDePago"]').forEach((elem) => {
        elem.addEventListener("change", function(event) {
            var item = event.target.value;
            if(item==="tarjeta")
            {
                datosTarjeta.style.display="";
                preciosDolares.style.display="none";
                precioPesos.style.display="";
            }
            else if(item==="efectivo")
            {
                datosTarjeta.style.display="none";
                preciosDolares.style.display="none";
                precioPesos.style.display="";
            }
            else{
                datosTarjeta.style.display="none";
                preciosDolares.style.display="";
                precioPesos.style.display="none";
            }
        });
    });
    }
};

//Funcion que obtiene el valor total del carrito en pesos
function precioTotalPesos()
{
    const sumaReduce = almacenados.reduce((acc,elemento)=>acc+((elemento.unidades)*elemento.precio),0,0);
    return sumaReduce.toFixed(2);
    
}
//Funcion que obtiene el valor total del carrito en dolares
function precioTotalDolares()
{
    const sumaReduce = almacenados.reduce((acc,elemento)=>acc+((elemento.unidades)*elemento.usd),0,0);
    return sumaReduce.toFixed(2);
    
}

let preTotalDolares=precioTotalDolares();
let preTotalPesos=precioTotalPesos();

function actualizarPrecios(){
    const dolar=document.getElementById("valorDolar");
    dolar.innerHTML=`$${new Intl.NumberFormat('de-DE').format(preTotalDolares)}`;
    const pesos=document.getElementById("valorPesos");
    pesos.innerHTML=`$${new Intl.NumberFormat('de-DE').format(preTotalPesos)}`;
}
actualizarPrecios();

//funcion que muestra en pantalla las unidades productos totales del carrito
function mostraElementosCarritos()
{
    let unidades=getUnidadesLocalStorage();
    const numero=document.getElementsByClassName("badge");
    numero[0].innerHTML=unidades;
}
//funcion de confirmacion de compra, muestra el mensaje de sweetalert
function confirmarCompra()
{
    console.log("entra sweetalert");
    const sweetalert= document.getElementById("botonFinalizarCompra");
    sweetalert.addEventListener("click",()=>{
        swal({
        title: "Gracias por su compra",
        text: "Presione continuar para volver al inicio!",
        icon: "success",
        button: "Continuar",
      }).then(function() {
        limpiarLocalStorage();
        window.location = "../index.html";
    });
    });

}
confirmarCompra();
//funcion que elimina los elementos del carrito del localStorage
function limpiarLocalStorage()
{
    localStorage.removeItem("ProductosCarrito");
}


//funcion q redirecciona al carrito cuando se hace click carrito desde el menu lateral desde la pagina de productos
function botonMenuCarritoProdcuto()
{
    const boton=document.getElementById("menuCarritoCheckout");
    boton.addEventListener("click", ()=>{
        localStorage.setItem("flagPagina",JSON.stringify(1));
        window.location = "../index.html"
    });
}
botonMenuCarritoProdcuto();

//funcion q redirecciona al los auriculares cuando se hace click carrito desde el menu lateral desde la pagina de productos
function botonAuricularesProducto()
{
    const boton=document.getElementById("menuAuricularesCheckout");
    boton.addEventListener("click", ()=>{
        localStorage.setItem("flagPagina",JSON.stringify(2));
        window.location = "../index.html"
    });
}
botonAuricularesProducto();

//funcion q redirecciona al los accesorios cuando se hace click carrito desde el menu lateral desde la pagina de productos
function botonAccesoriosProducto()
{
    const boton=document.getElementById("menuAccesoriosCheckout");
    boton.addEventListener("click", ()=>{
        localStorage.setItem("flagPagina",JSON.stringify(3));
        window.location = "../index.html"
    });
}
botonAccesoriosProducto();

//funcion q redirecciona al los celulares cuando se hace click carrito desde el menu lateral desde la pagina de productos
function botonCelularesProducto()
{
    const boton=document.getElementById("menuCelularesCheckout");
    boton.addEventListener("click", ()=>{
        localStorage.setItem("flagPagina",JSON.stringify(4));
        window.location = "../index.html"
    });
}
botonCelularesProducto();


document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById("formulario").addEventListener('submit', validarFormulario); 
  });
  
  function validarFormulario(evento) {
    evento.preventDefault();
    let usuario = document.getElementById('apellido').value;
    if(usuario.length == 0) {
      alert('No has escrito nada en el usuario');
      return;
    }
    this.submit();
  }
