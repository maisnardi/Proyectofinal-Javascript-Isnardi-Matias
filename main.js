//variables globales
let pagina="index";
let divisa=1;

//Clases
class Productos{
    constructor(obj)
    {
        this.id=obj.id;
        this.tipo=obj.tipo;
        this.marca=obj.marca;
        this.modelo=obj.modelo;
        this.color=obj.color;
        this.precio=obj.precio;
        this.imagen=obj.imagen;
        this.descripcion=obj.descripcion;
        this.unidades=obj.unidades;
    }
}

//API cotizacion dolar
const cargarDatos = async () => {
    try{
        const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
        const res = await fetch(url);
        if(res.status===200)
        {
            const datos = await res.json();
            pasarPreciosAPesos(datos[0].casa.venta);
        }

        } 
     catch(res) {
         console.log(res)
     }
  };
  
const cotizacion = cargarDatos();

function pasarPreciosAPesos(cotizacion)
{
    console.log(cotizacion);
    let cotizacionDolar=parseFloat(cotizacion.replace(',','.'))
    console.log(cotizacionDolar);
    todosLosProductos.forEach(productos => {
    productos.precio=cotizacionDolar*productos.usd;
    });   
};

//funcion que obtiene la divisa seleccionada en el menu deplegable
function getSelectorDivisa()
{
    divisa = document.getElementById("moneda").value;
}

  

    let select =document.querySelector("select");
    select.addEventListener("change",()=>{
        console.log(divisa);
        let preciodolar=document.getElementsByClassName("priceUSD");
        let preciopesos=document.getElementsByClassName("priceUSD");getSelectorDivisa();
        if(divisa==="1")
    {
        console.log("entro en pesos")
        for (let elemento of preciodolar)
        {
            console.log("oculto")
            elemento.createElement("");
        }
        for (let elemento of preciopesos)
        {
            elemento.style.display="none";
        }
    }
    else{
        console.log("entro en doalres")
        for (let elemento of preciodolar)
        {
            elemento.style.display="";
        }
        for (let elemento of preciopesos)
        {
            elemento.style.display="none";
        }
    } 
    });    

//Función que crea todos los productos en el HTML del index dependiendo de un array de productos
function crearProductos(array)
{
    const titulo= document.getElementById("titulo");
    const app = document.getElementById("app");
    for (const items of array) {
        if(pagina==="index")
        {
            titulo.innerText=`Productos:`;
        }
        else{
            titulo.innerText=`${items.tipo+":"}`;
        }

        app.innerHTML += `
        <div class="col ${items.tipo}">
        <div class="card" >
            <img src="${items.imagen}"  class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${items.marca} ${items.modelo}</h5>
            <h6>Color ${items.color}</h6>
            <p class="card-text">${items.descripcion}</p>
            <h3 class="price">Precio: $${items.precio}</h3>
            <h3 class="priceUSD">Precio: $${items.usd}</h3>
            <a href="pages/producto.html" id="P${items.id}"class="btn btn-primary">Ver producto</a>
            <select name="Unidades" id="cantidad">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <a href="#" id="${items.id}" class="btn btn-primary">Agregar al carrito</a>
            </div>
        </div>
        </div>
    `;
    }
    ocultarValorTotalCarrito()                                      //se llama a la funcion que oculta el valor total del carrito
}
crearProductos(todosLosProductos);                                  //se llama a la funcion que crea todos los elementos HTML y se le pasa como argumento el array de todos los productos

//botones del menú lateral
let botonAuriculares = document.getElementById("menuAuriculares");  //Botón auriculares
botonAuriculares.addEventListener("click",()=>{
    pagina="Auriculares";
    ocultarProductos("col");                                        //oculta todos los prodctos de la página
    mostrarProductos(pagina);                                       //muestra solo los productos que sean igual el valor de página
    document.getElementById("titulo").innerHTML=pagina+":";         //cambia el titulo de los productos
});
let botonAccesorios = document.getElementById("menuAccesorios");   //Botón accesorios
botonAccesorios.addEventListener("click",()=>{
    pagina="Accesorios";
    ocultarProductos("col");                                        //oculta todos los prodctos de la página
    mostrarProductos(pagina);                                       //muestra solo los productos que sean igual el valor de página
    document.getElementById("titulo").innerHTML=pagina+":";         //cambia el titulo de los productos
});

let botonCelulares = document.getElementById("menuCelulares");      //Botón teléfonos
botonCelulares.addEventListener("click",()=>{
    pagina="Celulares";
    ocultarProductos("col");                                        //oculta todos los prodctos de la página
    mostrarProductos(pagina);                                       //muestra solo los productos que sean igual el valor de página
    document.getElementById("titulo").innerHTML=pagina+":";         //cambia el titulo de los productos
});

let botonCarrito = document.getElementById("menuCarrito");          //Botón Carrito
botonCarrito.addEventListener("click", ()=>{
    ocultarProductos("col");                                        //Oculto todos los productos disponibles en la pagina, del inicio
    MostrarCarrito(Carrito);
    crearBotonesEliminar();
})

let botonCarritoUnidades = document.getElementById("linkCarritoUnidades");  //Botón Carrito
botonCarritoUnidades.addEventListener("click", ()=>{
    ocultarProductos("col");                                        //Oculto todos los productos disponibles en la pagina, del inicio
    MostrarCarrito(Carrito);
    crearBotonesEliminar();
    setValorTotalCarrito();                                         //funcion que crea el elemento que muestra el valor total del carrito
})



//Funcion que oculta todos los elementos que tengan clase igual a opcion
function ocultarProductos(opcion)
{
    ocultar=document.getElementsByClassName(opcion);
    for (let elemento of ocultar)
    {
        elemento.style.display="none";
    }
}

//Funcion que muestra todos los elementos que tengan clase igual a opcion
function mostrarProductos(opcion)
{
    mostrar=document.getElementsByClassName(opcion);
    for (let elemento of mostrar)
    {
        elemento.style.display="";
    }
}

//Funcion que lee todos los botones de compra y carga el carrito
function crearBotonesDeCompra(){
    todosLosProductos.forEach((producto)=>{
        const botonCarrito =document.getElementById(producto.id);
        botonCarrito.addEventListener("click",()=>{
            indexProductos= todosLosProductos.findIndex(elemento=>elemento.id == producto.id);      //obtengo el index del producto dentro del array de todos los productos
            const indexCarrito= Carrito.findIndex(elemento=>elemento.id == producto.id);            //obtengo el index del elemento dentro del carrito
            if(indexCarrito==-1)                                                                    //Si no se encuentra en el carrito lo agrego
            {
                Carrito.push(todosLosProductos[indexProductos]);                                    //hago el push del objeto dentro del array del carrito
                Carrito[Carrito.length-1].unidades+=1;                                              //le sumo una unidad a ese articulo
                carritoToJson(Carrito);                                                             //actualizo el carrito del localstorage
            }
            else                                                                                    //si ya existe le agrego una unidad mas
            {
                Carrito[indexCarrito].unidades+=1;                                                  //le sumo una unidad mas al producto
                carritoToJson(Carrito);                                                             //actualizo el carrito del localstorage
            }
             setUnidadesCarrito();                                                                  //actualizo las unidades de la imagen del carrito
        });
    });
};

crearBotonesDeCompra();

//Funcion que linkea los botones de ver producto con la inforomacion
function crearBotonesVerProducto()
{
    todosLosProductos.forEach( (productos)=>{
        const botonVerProducto=document.getElementById("P"+productos.id);
        botonVerProducto.addEventListener("click",()=>{
            productoToSessionStorage(productos);
        });
    });
}
crearBotonesVerProducto();

//Funcion que muestra el carrito de compras
function MostrarCarrito(array)
{
    const titulo= document.getElementById("titulo");            //Selecciono el titulo H2 de la página
    titulo.innerHTML="Carrito:"                                 //modifico su mensaje
    if (Carrito.length===0)                                     //Verifico si el carrito esta vacío, si lo esta
    {
        let mensaje=document.createElement("h3");               //creo un elemento nuevo H3
        mensaje.innerText="El carrito está vacío";              //le asigno un contenido de ese elemento
        titulo.append(mensaje);                                 //creo ese elemento dentro del HTML
    }
    else
   {
    botonContinuarCompra();                                     //llamo a la funcion que crea el boton de continuar compra
    const app = document.getElementById("app");                 //Selecciono el contenedor de los productos
    for (const items of array) {                                //Recorro el array de productos, y voy creando sus elementos en pantalla utilizando un template
        app.innerHTML += `
        <div class="col" id="borra${items.modelo}">
        <div class="card" >
            <img src="${items.imagen}"  class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${items.marca} ${items.modelo}</h5>
            <h6>Color ${items.color}</h6>
            <h3 class="units">Unidades: ${items.unidades}</h3>
            <h3 class="price">Precio: $${items.precio}</h3>
            <a href="#" id="borra${items.id}" class="btn btn-danger">Eliminar</a>
            </div>
        </div>
        </div>
        `;
        }
   }
}
//Funcion que crea los eventos de los botones eliminar
function crearBotonesEliminar(){
    console.log(Carrito);
    Carrito.forEach((producto)=>{                                                           //Se crean los eventos de todos los botones eliminar de los productos del Carrito
        const botonEliminar =document.getElementById(`borra${producto.id}`);
        botonEliminar.addEventListener("click",()=>{
            indexCarrito= Carrito.findIndex(elemento=>elemento.id == producto.id);          //Busco el index del producto del cual se presionó el botón
            if(indexCarrito!=-1)                                                            //Si el producto existe dentro del carrito
            {   
                quitarUnidad(indexCarrito,producto);                                        //llamo a la funcio que quita unidades del carrito.
                verificarCarrito();                                                         //llamo a la funcion que verifica si el carrito esta vacio, si lo esta muestar el mensaje que el carrito esta vacio.
                setUnidadesCarrito();                                                       //actualizo las unidades de la imagen del carrito
                setValorTotalCarrito()                                                      //muestro el valor total de carrito en pantalla cada vez que elimino un
            }
        });
    });
}

//Funcion que elimina elementos del carrito
function quitarUnidad(index,producto)
{
    if(Carrito[index].unidades<=1)                                                  //verifico si las unidades de ese producto son menores o iguales a 1
    {
        Carrito[index].unidades=0;                                                  //si ese es el caso se bajan las unidades a 0
        const eliminoItem=document.getElementById(`borra${producto.modelo}`);       //se selcciona el modelo a borrar
        eliminoItem.remove(eliminoItem);                                            //lo elimino del DOM
        Carrito.splice(index,1);                                                    //se elimina el elemento del carrito
        carritoToJson(Carrito);                                                     //llamo a la funcion que vuelve a cargar los valores en el localStorage con los valores del carrito
    }
    else
    {
        Carrito[index].unidades-=1;                                                 //se elimina una unidad del prodcuto seleccionado
        actualizarElementos();                                                      //llamo a la funcion que actualiza las unidades en la pantalla
        carritoToJson(Carrito);                                                     //llamo a la funcion que vuelve a cargar los valores en el localStorage con los valores del carrito
    }
}

//Funcion que actualiza las unidades del carrito en pantalla
function actualizarElementos()
{
    divs=document.getElementsByClassName("units");              //creo un array con todos los elementos HTML q se llaman units.
    for(let a=0; a<Carrito.length;a++ )
    {
        divs[a].innerText= `Unidades: ${Carrito[a].unidades}`;  //Modifico el contenido de cada elemento units.
    }
}

//funcion que verifica si el carrito esta vacio y crea un H3 con el mensaje que el carrito esta vacio.
function verificarCarrito()
{
    if(Carrito.length===0)                          //si el carrito esta vacío
    {
    let mensaje=document.createElement("h3");       //creo un elemento H3
    mensaje.innerText="El carrito está vacío";      //le asigno un contenido de ese elemento
    titulo.append(mensaje);                         //creo ese elemento dentro del HTML
    }
}

//funcion que pasa todos los elementos del carrito al localStorage
function carritoToJson(array)
{
    localStorage.clear();                                                               //funcion que reseteal el valor guardado en el localStorage
    const guardarLocal= (clave, valor)=>{localStorage.setItem(clave,valor)};
    guardarLocal("ProductosCarrito",JSON.stringify(array));
}

//funcion que pasa los elementos del localStorage al carrito
function JsonToCarrito(array)
{
    const almacenados = JSON.parse(localStorage.getItem("ProductosCarrito"));          //Recupero los datos del localStorage
    for(objeto of almacenados)
    {
        Carrito.push(new Productos(objeto));
    }
    console.log("carrito despues de obtener los datos del local storage");
    console.log(Carrito);
}


JsonToCarrito(Carrito);
setUnidadesCarrito();

//funcion que recorre el carrito de compras y devuelve las unidades totales de elementos
function getUnidadesCarrito(){
    const prodctosReduce= Carrito.reduce((acc,elemento)=>acc+elemento.unidades,0,0);
    return prodctosReduce;
}

//funcion que modifica las unidades que se muestran en el carrito de compras del index
function setUnidadesCarrito()
{
    let unidesCarrito = getUnidadesCarrito();
    let mensajeCarrito = document.getElementsByClassName("unidadesCarrito");
    mensajeCarrito[0].innerHTML=unidesCarrito;
}

//Toastify
function animacionToastifyCarrito()
{
    todosLosProductos.forEach((producto)=>{
        const botonCarrito =document.getElementById(producto.id);
        botonCarrito.addEventListener("click",()=>{
            Toastify({
                text:"Producto agregado al carrito",
                duration:3000,
                gravity:"bottom",
                position:"left",
            }).showToast();
        });
    });
}

animacionToastifyCarrito();

//Funcion que obtiene el valor total del carrito
function getValorTotalCarrito()
{
    const sumaReduce = Carrito.reduce((acc,elemento)=>acc+((elemento.unidades)*elemento.precio),0,0);
    return sumaReduce;
}

//Funcion que mustra en pantalla el valor total del carrito
function setValorTotalCarrito()
{
    const costoCarrito = document.getElementById("precio");
    costoCarrito.innerHTML="El valor total de carrito es: $"+getValorTotalCarrito();
    costoCarrito.style.display="";
}

//funcion que oculta el valor total del carrito
function ocultarValorTotalCarrito()
{
    const costoCarrito = document.getElementById("precio");
    costoCarrito.style.display="none";
}

function botonContinuarCompra()
{
    const botonContinuarCompra= document.createElement("button");
    botonContinuarCompra.setAttribute("id","botonContinuarCompra");
    botonContinuarCompra.addEventListener("click",()=>{
    });
}

function productoToSessionStorage(objeto)
{   
    const enJSON = JSON.stringify(objeto);          //transformo en el objeto en un string JSON
    sessionStorage.setItem("producto",enJSON);      //guardo ese string en el sessionStorage
}
