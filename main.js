//variables globales
let pagina="index";

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

//Arrays
const todosLosProductos=auriculares.concat(accesorios,telefonos);
const Carrito =[];


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
            indexProductos= todosLosProductos.findIndex(elemento=>elemento.id == producto.id);
            const indexCarrito= Carrito.findIndex(elemento=>elemento.id == producto.id);

            if(indexCarrito==-1)
            {

                console.log("el pproducto no se encuentra en el carrito");
                todosLosProductos[indexProductos].unidades+=1;
                Carrito.push(todosLosProductos[indexProductos]);
                carritoToJson(Carrito);
            }
            else
            {
                console.log("ya hay unidades de ese producto en el carrito");
                Carrito[indexCarrito].unidades+=1;
                carritoToJson(Carrito);
            }




            // if(todosLosProductos[indexProductos].unidades === 0){
            //     todosLosProductos[indexProductos].unidades+=1;
            //     Carrito.push(todosLosProductos[indexProductos]);
            //     carritoToJson(Carrito);                             //funcion que vuelve a cargar los valores en el localStorage con los valores del carrito

            // }
            // else{
            //     todosLosProductos[indexProductos].unidades+=1;
            //     carritoToJson(Carrito);                             //funcion que vuelve a cargar los valores en el localStorage con los valores del carrito
            // }

            // console.log(Carrito);
             setUnidadesCarrito();
        });
    });
};

crearBotonesDeCompra();

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
            <a href="#" id="borra${items.id}" class="btn btn-primary">Eliminar</a>
            </div>
        </div>
        </div>
        `;
        }
   }
}
//Funcion que crea los eventos de los botones eliminar
function crearBotonesEliminar(){
    Carrito.forEach((producto)=>{                                                           //Se crean los eventos de todos los botones eliminar de los productos del Carrito
        const botonEliminar =document.getElementById(`borra${producto.id}`);
        botonEliminar.addEventListener("click",()=>{
            indexCarrito= Carrito.findIndex(elemento=>elemento.id == producto.id);          //Busco el index del producto del cual se presionó el botón
            if(indexCarrito!=-1)
            {
                quitarUnidad(indexCarrito,producto);
                verificarCarrito();
                console.log(Carrito);
                setUnidadesCarrito();
            }
        });
    });
}

//Funcion que elimina elementos del carrito
function quitarUnidad(index,producto)
{
    if(Carrito[index].unidades>1)                                               //si las unidades de ese producto son mayores a 1
    {
        Carrito[index].unidades-=1;
        actualizarElementos();                                                  //actualizo las unidades en la pantalla
        carritoToJson(Carrito);                                                 //funcion que vuelve a cargar los valores en el localStorage con los valores del carrito
    }
    else
    {
        let eliminoItem=document.getElementById(`borra${producto.modelo}`);
        eliminoItem.remove(eliminoItem);                                        //lo elimino del DOM
        Carrito.splice(index);                                                  //si se sacan todas las unidades de ese producto lo saco del carrito
        carritoToJson(Carrito);                                                 //funcion que vuelve a cargar los valores en el localStorage con los valores del carrito
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
    let acumulador=0;
    Carrito.forEach((elemento)=>{
        acumulador+=elemento.unidades;
    })
    return acumulador;
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

// //Carrito de compras
// function AgregarAlCarrito(Productos){       //funcion que verifica si el producto se encuentra en el carrito, y si no lo esta lo agreguega
//     if(!(Carrito.includes(Productos)))
//     {
//         alert("compra");
//         Carrito.push(Productos);
//         console.log("los items de carrito son")
//         console.log(Carrito);
//     }
// }





// //Simulador
// //variables
// let CantidadUnidades=0;
// let ValorCompra=0;
// let ModoPago=0;
// let Compra=false;
// let SeguirComprando=0;

// //Clases
// class Productos{
//     constructor(id,producto,marca,precio,cantidad)
//     {
//         this.id=id;
//         this.producto=producto;
//         this.marca=marca;
//         this.precio=precio;
//         this.cantidad=cantidad;
//     }

// }
// //Obetos
// const Auriculares = new Productos(001,"auriculares","sony",10000,0);
// const Cargador = new Productos (002,"cargador","samsung",2000,0);
// const Batería = new Productos(003,"batería", "xiaomi",5000,0);

// //Arrays
// //const Carrito =[];
// const ArrayProductos=[Auriculares,Cargador,Batería];
// console.log(ArrayProductos);

// //Programa

// // MenuCompra();
// // VolverAComprar();
// // ValorCompra=CostoDelCarrito();
// // MenuPago();


// // FUNCIONES
// function MenuCompra(){          //Menú de compra
//     let menu=Number(prompt(`Lista de productos:
//     1. Auriculares,
//     2. Cargador,
//     3. Batería,
//     4. Ver carrito,
//     5. Quitar producto del carrito,
//     6. Buscar por marca,
//     7. Cancelar`));

//     switch(menu){
//         case 1:
//             alert("El valor unitario del producto es de $10,000");
//             CantidadUnidades=SolicitarUnidades();
//             Auriculares.cantidad+=CantidadUnidades;
//             AgregarAlCarrito(Auriculares);
//             CantidadUnidades=0;
//             break;
//         case 2:
//             alert("El valor unitario del producto es de $2000");
//             CantidadUnidades=SolicitarUnidades();
//             Cargador.cantidad+=CantidadUnidades;
//             AgregarAlCarrito(Cargador);
//             CantidadUnidades=0;
//             break;
//         case 3:
//             alert("El valor unitario del producto es de $5000");
//             CantidadUnidades=SolicitarUnidades();
//             Batería.cantidad+=CantidadUnidades;
//             AgregarAlCarrito(Batería);
//             CantidadUnidades=0;
//             break;
//         case 4:
//             if(Carrito.length===0)
//             {
//                 alert("El carrito esta vacío");
//             }
//             else
//             {
//                 MostrarCarrito(Carrito);
//             }
//             break;

//         case 5:
//             QuitarDelCarrito();
//             break;
//         case 6:
//             buscarMarca(ArrayProductos);
//             break;
//         case 7:
//             alert("Opción cancelada");
//             Compra=false;
//             break;
//         default:
//             alert("Opción no valida");
//             Compra=false;
//             break;
//     }
//   }

// function MenuPago() //Función que se encarga del pago en efectivo y con tarjeta
// {
//     const pago = document.createElement("div");     //se crea el div de procesando pago cuando comienza el proceso de pago
//     pago.setAttribute("id","pago")
//     pago.innerHTML=`Procesando pago`;
//     document.getElementById("test").appendChild(pago);
//     if(Compra== true)               //si el usuario seleccionó correctamente un producto desde el menú
//     {
//         ModoPago = FormaDePago();   //la funcion Formadepago() devuelve la forma de pago seleccionada por el usaurio
//         if(ModoPago == 1){          //Si el pago es en efectivo
//             ValidarDinero(SolicitarDinero(ValorCompra), ValorCompra);
//             let mensaje = document.getElementById("pago");
//             mensaje.innerText="GRACIAS POR COMPRAR";        //luego de realizar el pago en efectivo se modifica el div
//         }
//         else if(ModoPago == 2){     //Si el pago es con tarjeta de crédito
//             let ValorCompraConTarjeta= ValorCompra*1.1;             //Se agrega un 10% adicional
//             let ValorCompraEnCuotas= ValorCompraConTarjeta/3;       //Se divide en 3 para obtener el valor de las cuotas
//             let Mensaje = "El precio final es de $"+ValorCompraConTarjeta+" en 3 cuotas de $"+ValorCompraEnCuotas.toFixed(2);   //Con .tofixed(2 se musetran solo dos decimales)
//             alert(Mensaje);
//             let mensaje = document.getElementById("pago");
//             mensaje.innerText="GRACIAS POR COMPRAR";        //luego de realizar el pago en efectivo se modifica el div
//         }
//         else{
//             alert("Metodo de pago inválido");
//             let mensaje = document.getElementById("pago");
//             mensaje.innerText="Metodo de pago inválido";    //si no se puede realizar el pago se modifica el div con el mismo mensaje del alert
//         }
//     }
//     else{
//         alert("Compra cancelada"); //Si el usuario seleccionó una opcion incorrecta del menú se cancela la compra
//         let mensaje = document.getElementById("pago");
//             mensaje.innerText="Compra cancelada";       //si se cancela pago se modifica el div con el mismo mensaje del alert
//     }
// }

// function SolicitarDinero(ValorCompra)   //Función que solicita el importe de dinero en efectivo al usaurio.
// {
//   let Dinero=Number(prompt("Ingrese $"+ValorCompra));
//   return Dinero;
// }

//  function SolicitarUnidades()   //Función que solicita la cantidad de unidades.
// {
//     Compra=true;
//     Unidades=Number(prompt("Ingrese la cantidad de unidades deseadas"));
//     if(isNaN(Unidades) || Unidades<0)         //Si el usuario ingresa un caracater aparece una alerta de Error y se cancela la compra.
//     {
//         alert("ERROR, dato no permitido.");
//         Compra=false;
//         return 0
//     }
//     else if(Unidades == 0)      //Si las unidades seleccionadas por el usuario son 0
//     {
//         let DatoValido=0;
//         let Intentos=2;
//         alert("La cantidad de unidades es muy baja, vuelva ingresar las unidades")
//         while(Intentos>0)       //Le permite al usurio hacer dos intentos más
//         {
//             Unidades=Number(prompt("Ingrese la cantidad de unidades deseadas"));
//             if( Unidades>0){
//                 Intentos=0;
//                 DatoValido=1;
//             }
//             else{
//                 Intentos--;
//             }
//         }
//         if(DatoValido==1)
//         {
//             return Unidades;
//         }
//         else{
//             alert("ERROR, dato no permitido. Compra cancelada");
//             Compra=false;
//             return 0
//         }
//     }
//     else                        //Si no devuelve la cantidad ingresada por el usaurio.
//     {
//         return Unidades

//     }
// }

// function ValidarDinero(MontoIngresado, ValorCompra){     //Función que valida el pago en efectivo. Dependiendo del valor ingresado mustra un mensaje.
//     let Saldo=0;
//     if(MontoIngresado>ValorCompra)    //El monto ingresado es suaperior al de los productos
//     {
//         alert("Gracias por su compra su vuelto es: $"+(MontoIngresado-ValorCompra));
//     }
//     else if (MontoIngresado == ValorCompra){  //El monto ingresado es igual al de los productos
//         alert("Gracias por su compra");
//     }
//     else if (isNaN(MontoIngresado))           //Si el usaurio ingresa un caracter en vez de un número
//     {
//         alert("El importe ingresado no es un número");
//     }
//     else
//     {
//         alert("El dinero ingresado es insuficiente");   //El monto ingresado es inferior al de los productos
//     }
// }

// function FormaDePago(){   //Funcion que ofrece las distintas formas de pago y devuelve la opción seleccionada por el usuario.
//   alert("La forma de pago con tarjeta de credito tiene un recargo de 10% y 3 cuotas")
//   let Pago=Number(prompt(`Ingrese la forma de pago:
//   1. Efectivo
//   2. Tarjeta de crédito en 3 cuotas`));
//   return Pago;
// }



// // function AgregarAlCarrito(Productos){       //funcion que verifica si el producto se encuentra en el carrito, y si no lo esta lo agreguega
// //     if(!(Carrito.includes(Productos)))
// //     {
// //         Carrito.push(Productos);
// //     }
// // }


// function MostrarCarrito(carro)                   //funcion que muestra por consola los productos del carrito
// {
//     console.log(`Los productos del carrito son:`)
//     carro.forEach(Productos => {
//         console.log(Productos)
//     });
// }

// function CostoDelCarrito()                  //funcion que recorre el array del carrito, devuelve el valor total de los productos del carrito
// {
//     let ValorTotalCompra=0;
//     for(let i=0;i<Carrito.length;i++)
//     {
//         console.log(Carrito.length);
//         ValorTotalCompra= ValorTotalCompra + ((Carrito[i].cantidad)*(Carrito[i].precio));
//     }
//     return ValorTotalCompra;

// }
// function VolverAComprar(){                  //funcion recurrente que le permite al usuario seguir comprando.
//     SeguirComprando=Number(prompt(`Desea seguir comprando?
//                                     1. SI
//                                     2. NO`))
//     if(SeguirComprando==1)
//     {
//         MenuCompra();
//         VolverAComprar();
//     }
// }

// function QuitarDelCarrito()                 //funcion que permite borra elementos del carrito
// {
//     let index=0;
//     let unidadesAQuitar=0;
//     let quitar= Number(prompt(`Seleccione el producto que desea eliminar del carrito:
//                                 1. Auriculares,
//                                 2. Cargador,
//                                 3. Batería`));
//     switch(quitar){
//         case 1:
//             if(Carrito.includes(Auriculares)){
//                 unidadesAQuitar=Number(prompt("Cuántas unidades desea eliminar?"));
//                 Auriculares.cantidad-=unidadesAQuitar;
//                 if(Auriculares.cantidad<=0){        //Si la cantidad de productos es menor o igual a 0 se pone en 0 las unidades y se quita del array del carrito de compras
//                     Auriculares.cantidad=0;
//                     index=Carrito.indexOf(Auriculares);
//                     Carrito.splice(index);

//                 }
//             }
//             else{
//                 alert("No hay auriculares en el carrito")
//             }
//             break;
//         case 2:
//             if(Carrito.includes(Cargador)){
//                 unidadesAQuitar=Number(prompt("Cuántas unidades desea eliminar?"));
//                 Cargador.cantidad-=unidadesAQuitar;
//                 if(Cargador.cantidad<0){        //Si la cantidad de productos es menor o igual a 0 se pone en 0 las unidades y se quita del array del carrito de compras
//                     Cargador.cantidad=0;
//                     index=Carrito.indexOf(Cargador);
//                     Carrito.splice(index);
//                 }
//                 }
//             else{
//                 alert("No hay cargadores en el carrito")
//             }
//             break;
//         case 3:
//              if(Carrito.includes(Batería)){
//                 unidadesAQuitar=Number(prompt("Cuántas unidades desea eliminar?"));
//                 Batería.cantidad-=unidadesAQuitar;
//                 if(Batería.cantidad<0){     //Si la cantidad de productos es menor o igual a 0 se pone en 0 las unidades y se quita del array del carrito de compras
//                     Batería.cantidad=0;
//                     index=Carrito.indexOf(Batería);
//                     Carrito.splice(index);
//                 }
//             }
//             else{
//                 alert("No hay baterias en el carrito")
//             }
//             break;
//         default:
//             alert("Opción no valida");
//             break;
//     }
// }

// function buscarMarca(array){            //funcion que busca en el array de productos por marca
//     let marca= prompt("ingrese una marca");
//     const productosEncontrados =array.filter((a)=>a.marca.includes(marca.toLocaleLowerCase()));
//     console.log(productosEncontrados);
// }
