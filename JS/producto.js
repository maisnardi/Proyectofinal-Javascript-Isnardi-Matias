let mostrarCarrito=false;
let datoUnidadesCarrito;
function sessionStoragetoProducto()
{
    const producto = JSON.parse(sessionStorage.getItem("producto"));        //transformo el string JSON nuevamente a un objeto 
    return producto;                                                        //devuelvo el objeto
}
//funcion que muestra la informacion del producto
function mostrarInfoProducto()
{
    objeto=sessionStoragetoProducto();
    const imagenes = document.getElementsByClassName("d-block");
    imagenes[0].setAttribute('src',`../${objeto.imagen}`);  
    imagenes[1].setAttribute('src',`../${objeto.imagen1}`); 
    imagenes[2].setAttribute('src',`../${objeto.imagen2}`);
    const modeloProducto =document.getElementById("modeloProducto");
    modeloProducto.innerHTML=`${objeto.marca}`+" "+`${objeto.modelo}`;
    const titulo=document.getElementById("tituloProducto");
    titulo.innerHTML=`${objeto.titulo}`;
    const color=document.getElementById("color");
    color.innerHTML=`Color: ${objeto.color}`;
    const descripcion= document.getElementById("descripcion");
    descripcion.innerHTML=`${objeto.descripcion}`;
    const precio= document.getElementById("precio");
    precio.innerHTML=`Precio en pesos: $${new Intl.NumberFormat('de-DE').format(objeto.precio)}`;
    const precioUsd= document.getElementById("precioUSD");
    precioUsd.innerHTML=`Precio en Dolares: $${new Intl.NumberFormat('de-DE').format(objeto.usd)}`;
    selectorMoneda();
    let unidadesCarro=mostrarUnidadesCarrito();
    botonComprar(unidadesCarro);
 }
mostrarInfoProducto();

function selectorMoneda()
{
    let moneda=localStorage.getItem("moneda");
    console.log(typeof(moneda));
    let preciodolar=document.getElementById("precioUSD");           //obtego el elemento de precios en dolares
    let preciopesos=document.getElementById("precio");              //obtego el elemento de precios en pesos
    if(moneda==="1")                                                //si divisa es 1 (valores en pesos) oculto los precios en dolares y muestro solo los valores en pesos
    {
        preciopesos.style.display="";
        preciodolar.style.display="none";
    }
    else{                                                           //si el valor de divisa es distinto de 1 muestro solo los valores en dolares
        preciodolar.style.display="";
        preciopesos.style.display="none";
    }
}
//funcion que obtiene el numero de unidades del local Storage
function mostrarUnidadesCarrito()
{
    let unidades=getUnidadesLocalStorage();
    datoUnidadesCarrito=Number(unidades);
    return datoUnidadesCarrito;
}


//funcion que agrega el producto al carrito del localstorage y actualiza las unidades totales del carrito del localstorage
function botonComprar(dato)
{
    const boton=document.getElementById("botonCompra");
    boton.addEventListener("click",()=>{
        const almacenados = JSON.parse(localStorage.getItem("ProductosCarrito"));           //Recupero los datos del localStorage
        const producto=sessionStoragetoProducto();                                          //Obtengo el item al que se debe agregar al carrito
        const indexCarrito= almacenados.findIndex(elemento=>elemento.id == producto.id);            //obtengo el index del elemento dentro del carrito
        console.log(indexCarrito);
        if(indexCarrito==-1)                                                                    //Si no se encuentra en el carrito lo agrego
            {
                almacenados.push(producto);                                    //hago el push del objeto dentro del array del carrito
                console.log(almacenados);
                almacenados[almacenados.length-1].unidades+=1;                                              //le sumo una unidad a ese articulo
                carritoToJson(almacenados);                                                             //actualizo el carrito del localstorage
            }
        else                                                                                    //si ya existe le agrego una unidad mas
            {
                almacenados[indexCarrito].unidades+=1;                                                  //le sumo una unidad mas al producto
                carritoToJson(almacenados);                                                             //actualizo el carrito del localstorage
            }
        actualizarUnidadesLocalStorage(dato+1);                                                           //actualizo las unidades en el localStorage

    });
};

//funcion que obtiene la cantidad de unidades del localStorage y la actualiza
function actualizarUnidadesLocalStorage(dato){
    localStorage.removeItem("unidades");
    console.log(dato)
    localStorage.setItem('unidades',Number(dato));
 }
 
//funcion q redirecciona al carrito cuando se hace click en la imagen del carrito desde la pagina de productos
function botonCarritoProdcuto()
{
    const boton=document.getElementById("linkCarritoUnidadesProducto");
    boton.addEventListener("click", ()=>{
        localStorage.setItem("flagPagina",JSON.stringify(1));
        window.location = "../index.html"
    });
}
botonCarritoProdcuto();

//funcion q redirecciona al carrito cuando se hace click carrito desde el menu lateral desde la pagina de productos
function botonMenuCarritoProdcuto()
{
    const boton=document.getElementById("menuCarritoProductos");
    boton.addEventListener("click", ()=>{
        localStorage.setItem("flagPagina",JSON.stringify(1));
        window.location = "../index.html"
    });
}
botonMenuCarritoProdcuto();

//funcion q redirecciona al los auriculares cuando se hace click carrito desde el menu lateral desde la pagina de productos
function botonAuricularesProducto()
{
    const boton=document.getElementById("menuAuricularesProductos");
    boton.addEventListener("click", ()=>{
        localStorage.setItem("flagPagina",JSON.stringify(2));
        window.location = "../index.html"
    });
}
botonAuricularesProducto();

//funcion q redirecciona al los accesorios cuando se hace click carrito desde el menu lateral desde la pagina de productos
function botonAccesoriosProducto()
{
    const boton=document.getElementById("menuAccesoriosProductos");
    boton.addEventListener("click", ()=>{
        localStorage.setItem("flagPagina",JSON.stringify(3));
        window.location = "../index.html"
    });
}
botonAccesoriosProducto();

//funcion q redirecciona al los celulares cuando se hace click carrito desde el menu lateral desde la pagina de productos
function botonCelularesProducto()
{
    const boton=document.getElementById("menuCelularesProductos");
    boton.addEventListener("click", ()=>{
        localStorage.setItem("flagPagina",JSON.stringify(4));
        window.location = "../index.html"
    });
}
botonCelularesProducto()

//funcion que muestra en pantalla las unidades productos totales del carrito
function mostraElementosCarritos()
{
    let unidades=getUnidadesLocalStorage();
    const numero=document.getElementsByClassName("unidadesCarrito");
    numero[0].innerHTML=unidades;
}
mostraElementosCarritos();