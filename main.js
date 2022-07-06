//variables globales
let pagina="index";
let divisa=localStorage.getItem("moneda");
let btnCompra=false;

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
        this.usd=obj.usd;
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

ocultarValorTotalCarrito();                                      //se llama a la funcion que oculta el valor total del carrito 
const cotizacion = cargarDatos();

function pasarPreciosAPesos(cotizacion)
{
    console.log(cotizacion);
    let cotizacionDolar=parseFloat(cotizacion.replace(',','.'))
    console.log(cotizacionDolar);
    todosLosProductos.forEach(productos => {
    productos.precio=(cotizacionDolar*productos.usd).toFixed(2);
    });
    crearProductos(todosLosProductos);                                  //se llama a la funcion que crea todos los elementos HTML y se le pasa como argumento el array de todos los productos
    mostrarBarraBusqueda();                                                         //muestro la barra de busqueda

};

//funcion que obtiene la divisa seleccionada en el menu deplegable
function getSelectorDivisa()
{
    divisa = document.getElementById("moneda").value;               //selecciono el elemento select
    console.log("valor de la divisa");
    console.log(divisa);
    localStorage.setItem("moneda",divisa);                          //almaceno el valor tipo de moneda seleccionada en el localstorage. 1 para pesos 2 para dolares
}
getSelectorDivisa();
// funcion que muestra los precios en dolares o en pesos
function muestraPrecios()
{
    let select =document.querySelector("select");           //selecciono el elemento selector
    select.value=divisa;
    select.addEventListener("change",()=>{                  //cuando hay un cambio ejecuto las siguientes funciones
        
        let preciodolar=document.getElementsByClassName("priceUSD");    //obtego el array de elementos de precios en dolares
        let preciopesos=document.getElementsByClassName("price");       //obtego el array de elementos de precios en pesos
        if(select.value==="1")                                                //si divisa es 1 (valores en pesos) oculto los precios en dolares y muestro solo los valores en pesos
        {
            for (let elemento of preciopesos)
            {
                elemento.style.display="";
            }
            for (let elemento of preciodolar)
            {
                elemento.style.display="none";
            }
        }
        else{                                                           //si el valor de divisa es distinto de 1 muestro solo los valores en dolares
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
}


//funcion que oculta los valores en dolares
function ocultarValoresDolares()
{
    let preciodolar=document.getElementsByClassName("priceUSD");    //obtego el array de elementos de precios en dolares
    for (let elemento of preciodolar)
    {
        elemento.style.display="none";
    }   
}
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
        <div id="b${items.id}" class="col ${items.tipo}">
        <div class="card d-flex justify-content-around h-100" >
            <img src="${items.imagen}"  class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${items.marca} ${items.modelo}</h5>
            <h6>Color ${items.color}</h6>
            <p class="card-text">${items.descripcion}</p>
            <h3 class="price">Precio: $${new Intl.NumberFormat('de-DE').format(items.precio)}</h3>
            <h3 class="priceUSD">Precio: USD $${new Intl.NumberFormat('de-DE').format(items.usd)}</h3>
            <a href="pages/producto.html" id="P${items.id}"class="btn btn-primary">Ver producto</a>
            </select>
            <a id="${items.id}" class="btn btn-primary">Agregar al carrito</a>
            </div>
        </div>
        </div>
    `;
    }
    ocultarValoresDolares();                                         //llamo a la funcion que oculta los valores en dolares   
    ejecutarFunciones();                                             //llamo a la funcion que ejecuta varias funciones
}

//botones del menú lateral
let botonAuriculares = document.getElementById("menuAuriculares");  //Botón auriculares
botonAuriculares.addEventListener("click",()=>{
    pagina="Auriculares";
    ocultarProductos("col");                                        //oculta todos los prodctos de la página
    mostrarProductos(pagina);                                       //muestra solo los productos que sean igual el valor de página
    document.getElementById("titulo").innerHTML=pagina+":";         //cambia el titulo de los productos
    mostrarBarraBusqueda()                                          //muestro la barra de busqueda
    ocultarValorTotalCarrito()                                      //oculto el mensaje de valor total carrito
});
let botonAccesorios = document.getElementById("menuAccesorios");   //Botón accesorios
botonAccesorios.addEventListener("click",()=>{
    pagina="Accesorios";
    ocultarProductos("col");                                        //oculta todos los prodctos de la página
    mostrarProductos(pagina);                                       //muestra solo los productos que sean igual el valor de página
    document.getElementById("titulo").innerHTML=pagina+":";         //cambia el titulo de los productos
    mostrarBarraBusqueda()                                          //muestro la barra de busqueda
    ocultarValorTotalCarrito()                                      //oculto el mensaje de valor total carrito

});

let botonCelulares = document.getElementById("menuCelulares");      //Botón teléfonos
botonCelulares.addEventListener("click",()=>{
    pagina="Celulares";
    ocultarProductos("col");                                        //oculta todos los prodctos de la página
    mostrarProductos(pagina);                                       //muestra solo los productos que sean igual el valor de página
    document.getElementById("titulo").innerHTML=pagina+":";         //cambia el titulo de los productos
    mostrarBarraBusqueda()                                          //muestro la barra de busqueda
    ocultarValorTotalCarrito()                                      //oculto el mensaje de valor total carrito
});

let botonCarrito = document.getElementById("menuCarrito");          //Botón Carrito
botonCarrito.addEventListener("click", ()=>{
    ocultarProductos("col");                                        //Oculto todos los productos disponibles en la pagina, del inicio
    MostrarCarrito(Carrito);                                        //muestro los elementos del carrito
    crearBotonesEliminar();                                         //creo los botones para eliminar el producto del carrito
    setValorTotalCarrito();                                         //funcion que crea el elemento que muestra el valor total del carrito
    ocultarBarraBusqueda();                                         //oculto la barra de busqueda
})

let botonCarritoUnidades = document.getElementById("linkCarritoUnidades");  //Botón Carrito
botonCarritoUnidades.addEventListener("click", ()=>{
    ocultarProductos("col");                                                //Oculto todos los productos disponibles en la pagina, del inicio
    MostrarCarrito(Carrito);                                                //muestro los elementos del carrito
    crearBotonesEliminar();                                                 //creo los botones para eliminar el producto del carrito
    setValorTotalCarrito();                                                 //funcion que crea el elemento que muestra el valor total del carrito
    ocultarBarraBusqueda();                                                 //oculto la barra de busqueda
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


//Funcion que muestra el carrito de compras
function MostrarCarrito(array)
{
    
    const titulo= document.getElementById("titulo");            //Selecciono el titulo H2 de la página
    titulo.innerHTML="Carrito:"                                 //modifico su mensaje
    if (Carrito.length===0)                                     //Verifico si el carrito esta vacío, si lo esta
    {
        let mensaje=document.createElement("h3");               //creo un elemento nuevo H3
        mensaje.id=("mCarritoVacio")                            //creo una id para el elemento
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
        <div class="card d-flex justify-content-around h-100" >
            <img src="${items.imagen}"  class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${items.marca} ${items.modelo}</h5>
            <h6>Color ${items.color}</h6>
            <h3 class="units">Unidades: ${items.unidades}</h3>
            <h3 class="price">Precio: $${new Intl.NumberFormat('de-DE').format(items.precio)}</h3>
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
                setUnidadesCarrito();                                                       //actualizo las unidades de la imagen del carrito
                verificarCarrito();                                                         //llamo a la funcion que verifica si el carrito esta vacio, si lo esta muestar el mensaje que el carrito esta vacio.
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
    ocultarValorTotalCarrito();
    ocultarBotonContinuarCompra();
    }
}

//funcion que pasa todos los elementos del carrito al localStorage
function carritoToJson(array)
{
    localStorage.clear();                                                               //funcion que resetea el valor guardado en el localStorage
    const guardarLocal= (clave, valor)=>{localStorage.setItem(clave,valor)};
    guardarLocal("ProductosCarrito",JSON.stringify(array));
}


//funcion que pasa los elementos del localStorage al carrito
function JsonToCarrito(array)
{
    const almacenados = JSON.parse(localStorage.getItem("ProductosCarrito"));          //Recupero los datos del localStorage
    for(objeto of almacenados)
    {
        array.push(new Productos(objeto));
    }
    console.log("carrito despues de obtener los datos del local storage");
    console.log(array);
}

//funcion que recorre el carrito de compras y devuelve las unidades totales de elementos
function getUnidadesCarrito(){
    const prodctosReduce= Carrito.reduce((acc,elemento)=>acc+elemento.unidades,0,0);
    return prodctosReduce;
}
//funcion que guarda en el localStorage las unidades del carrito
function setUnidadesLocalStorage(unidades)
{
    localStorage.setItem("unidades",unidades); 
}
//funcion que obtiene las unidades del carrito del localStorage
function getUnidadesLocalStorage()
{
    let unidades=localStorage.getItem("unidades");
    return Number(unidades);
}

//funcion que modifica las unidades que se muestran en el carrito de compras del index
function setUnidadesCarrito()
{
    let unidesCarrito = getUnidadesCarrito();
    setUnidadesLocalStorage(unidesCarrito);
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

//Funcion que obtiene el valor total del carrito
function getValorTotalCarrito()
{
    const sumaReduce = Carrito.reduce((acc,elemento)=>acc+((elemento.unidades)*elemento.precio),0,0);
    return sumaReduce.toFixed(2);
}

//Funcion que mustra en pantalla el valor total del carrito
function setValorTotalCarrito()
{
    const costoCarrito = document.getElementById("precio");
    costoCarrito.innerHTML="Valor de la compra: $"+new Intl.NumberFormat('de-DE').format(getValorTotalCarrito());
    costoCarrito.style.display="";
}

//funcion que oculta el valor total del carrito
function ocultarValorTotalCarrito()
{
    const costoCarrito = document.getElementById("precio");
    costoCarrito.style.display="none";
}

//funcion que crea el boton de continuar compra
function botonContinuarCompra()
{
    if(btnCompra==false)                                                                    //verifico si el boton de compra se encuentra creado
    {
        const contenedor = document.getElementsByClassName("containerProductos");           //selecciono al elemento contenedor
        const botonContinuarCompra = document.createElement("a");                           //creo un elemento a
        botonContinuarCompra.href="pages/checkout.html";                                    //le asigno un link
        botonContinuarCompra.role="button";                                                 //le asigno un rol button
        botonContinuarCompra.className="btn btn-primary btn-lg";                            //le asigno las clases de bootstrap
        botonContinuarCompra.id="btnContinuar";                                             //le asigno un id
        botonContinuarCompra.innerHTML=`Continuar con la compra`;                           //le asigno un texto al boton
        contenedor[0].append(botonContinuarCompra);                                         //lo pego al final del elemento contenedor
        btnCompra=true;                                                                     //btnCompra para q no lo cree mas de una vez
    }
}
//funcion que elimina el boton en caso de que el carrito este vacio
function ocultarBotonContinuarCompra()
{
    const contenedor = document.getElementById("btnContinuar");         //Selecciono el elemento
    contenedor.style.display="none";                                    //lo oculto
}

//funcion que pasa el producto el cual se quiere ver al sessionStorage
function productoToSessionStorage(objeto)
{   
    const enJSON = JSON.stringify(objeto);          //transformo en el objeto en un string JSON
    sessionStorage.setItem("producto",enJSON);      //guardo ese string en el sessionStorage
}

//funcion que agrupa varias funciones para facilitar el llamado
function ejecutarFunciones()
{
    muestraPrecios();
    crearBotonesDeCompra();
    crearBotonesVerProducto();
    JsonToCarrito(Carrito);
    setUnidadesCarrito();
    animacionToastifyCarrito();
}

//funcion que inicializa la key del local storage de productos carrito, si no existe crea el array vacio si no no hace nada
function inicializarLocalStorage()
{
    if(localStorage.getItem("ProductosCarrito")===null)         //verifico si existe el carrito de compras en el localStorage si no existe lo inicializo vacio
    {
        localStorage.setItem("ProductosCarrito",JSON.stringify([]));
    }
    if(localStorage.getItem("moneda")===null)         //verifico si existe el carrito de compras en el localStorage si no existe lo inicializo vacio
    {
        localStorage.setItem("moneda",JSON.stringify(1));
        const moneda=document.getElementById("moneda");
        moneda.value=Number(localStorage.getItem("moneda"));
    }
}

inicializarLocalStorage();



//funcion para buscar productos en la pagina, puede ser por marca o modelo
function buscar()
{
    const palabraABuscar=document.getElementById("buscador");                       //selecciono el elemento input del buscador
    palabraABuscar.addEventListener("input", (e)=>{                                 //analizo cada cambio sobre el input
        todosLosProductos.forEach(elementos =>{
            document.getElementById(`b${elementos.id}`).style.display="none";
        });
        const valor=e.target.value.toLowerCase();                                   //el string ingresado lo transformo a lowercase y lo guardo en valor
        console.log(valor);
        productos.forEach(producto =>{                                             //analizo todos los elememtos del array
            const visible = producto.marca.toLowerCase().includes(valor)|| producto.modelo.toLowerCase().includes(valor);       //filtro por marca y modelo 
            if(visible){                                                            //si hay algun resultado
                if(document.getElementById(`b${producto.id}`))                      //verifico si el producto esta creado
                {   
                    document.getElementById(`b${producto.id}`).style.display="";    //muestro el producto que concide con la busqueda           
                }
            }
        }) 
    })
    let productos = todosLosProductos.map(producto=>{                               //con la funcion map creo un nuevo array solo con alguna info de los objetos del array original
    return {id: producto.id, tipo: producto.tipo, marca: producto.marca, modelo: producto.modelo}
    })
}

buscar();
ocultarBarraBusqueda();
//funcion que oculta la barra de busqueda
function ocultarBarraBusqueda()
{
    const containerBuscador=document.getElementById("contenedorBuscador");                       //selecciono el container del buscador
    containerBuscador.style.display="none";
}
//funcion que muestra la barra de busqueda
function mostrarBarraBusqueda()
{
    const containerBuscador=document.getElementById("contenedorBuscador");                       //selecciono el container del buscador
    containerBuscador.style.display="";
}

