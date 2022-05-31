//variables globales
let pagina="index";

//Base de datos de productos
const auriculares=[
    {
        id:"A001",
        tipo:"Auriculares",
        marca:"Sony",
        modelo:"WH-1000XM4",
        color:"blanco",
        precio:48000,
        imagen:"img/xm4-blancos.webp",
        descripcion:"Los intuitivos e inteligentes audífonos WH-1000XM4 te ofrecen nuevas mejoras en la tecnología de noise cancelling líder del sector 1, una calidad de sonido excepcional y funciones de escucha inteligente que se ajustan al entorno y lo que estés haciendo.",
        unidades:0
    },
    {
        id:"A002",
        tipo:"Auriculares",
        marca:"Audio-Technica",
        modelo:"ATH-M50xBT2",
        color:"negro",
        precio:55000,
        imagen:"img/ath-m50xbt2_01_1.png",
        descripcion:"Los ATH-M50xBT2 son la segunda generación de nuestra aclamada serie M de audífonos circumaurales inalámbricos. Cuentan con elementos de 45 mm de apertura grande en un diseño inalámbrico, para que los usuarios disfruten de la misma firma sonora de los legendarios audífonos de estudio ATH-M50x. Con esta actualización, también hemos introducido algunas importantes mejoras, por ejemplo, en la captación vocal, para disfrutar de llamadas de mayor calidad, una conexión USB-C actualizada y un modo de emparejamiento multipunto.",
        unidades:0
    },
    {
        id:"A003",
        tipo:"Auriculares",
        marca:"Audio-Technica",
        modelo:"ATH-M20xBT",
        color:"negro",
        precio:13000,
        imagen:"img/ath-m20xbt_01.png",
        descripcion:"Los auriculares inalámbricos circumaurales ATH-M20xBT incluyen todas las funciones que desea y la calidad de audio que exige. Inspirados en nuestros #1 en ventas los ATH-M20x auriculares de estudio profesionales con cable y con potentes drivers de 40 mm para un rendimiento mejorado de baja frecuencia, los auriculares Bluetooth ATH-M20xBT ofrecen una experiencia auditiva increíble con audio de alta fidelidad de rango completo y graves mejorados.",
        unidades:0
    },
    {
        id:"A004",
        tipo:"Auriculares",
        marca:"Bose",
        modelo:"Noise Cancelling Headphones 700",
        color:"negro",
        precio:50000,
        imagen:"img/BoseNoiceCancelling700.jpeg",
        descripcion:"Aclamados por la crítica debido a su potente reducción de ruido, un sonido asombroso y una recepción de voz inigualable, los audífonos Bose Noise Cancelling Headphones 700 ayudan a convertir cualquier espacio en un lugar perfecto para escuchar música, realizar tareas o sencillamente bloquear el mundo exterior para tener un momento de relajación. Así que si buscas los mejores audífonos Bluetooth inalámbricos para escuchar música y hacer llamadas, acabas de encontrarlos.",
        unidades:0
    }
]

const accesorios=[
    {
        id:"C001",
        tipo:"Accesorios",
        marca:"Xiaomi",
        modelo:"Noise Cancelling Headphones 700",
        color:"negro",
        precio:6300,
        imagen:"img/cargadorinalmbrico.jpg",
        descripcion:"¡La increible potencia de 20W permite que el soporte llene instantáneamente su teléfono inteligente con energía! El funcionamiento silencioso con un sistema de refrigeración eficiente tiene un efecto positivo en la cultura laboral y la seguridad de la carga.",
        unidades:0
    },
    {
        id:"C002",
        tipo:"Accesorios",
        marca:"Xiaomi",
        modelo:"Mi 50W Power Bank 20000",
        color:"negro",
        precio:14900,
        imagen:"img/mi-50w-power-bank-20000.jpg",
        descripcion:"Obtene acceso a energía limpia y ultrarrápida contenida en el Mi 50W Power Bank 20000mAh! La alta capacidad de la batería combinada con una velocidad de carga de hasta 50 W permite una carga casi instantánea.",
        unidades:0
    }

]

const telefonos=[
    {
        id:"T001",
        tipo:"Celulares",
        marca:"Xiaomi",
        modelo:"11T 8GB RAM 256GB ROM",
        color:"Meteorite Gray",
        precio:139000,
        imagen:"img/xiaomi-11t-8gb-ram-256gb-rom-meteorite-gray-.jpg",
        descripcion:"¡El buque insignia Xiaomi 11T le permite cargar la batería al 100% en 36 minutos! Una experiencia excelente en la pantalla AdaptiveSync de 120 Hz es posible gracias al procesador superior MediaTek Dimensity 1200-Ultra.",
        unidades:0
    },
    {
        id:"T002",
        tipo:"Celulares",
        marca:"Apple",
        modelo:"Iphone 13Pro MAX",
        color:"Meteorite Gray",
        precio:200000,
        imagen:"img/iphone 13pro max.jpg",
        descripcion:"La pantalla del iPhone 13 Pro Max tiene esquinas redondeadas que siguen el elegante diseño curvo del teléfono, y las esquinas se encuentran dentro de un rectángulo estándar. Si se mide en forma de rectángulo estándar, la pantalla tiene 6.68 pulgadas en diagonal (el área real de visualización es menor).",
        unidades:0
    },
    {
        id:"T003",
        tipo:"Celulares",
        marca:"Samsung",
        modelo:"Galaxy S22 Ultra",
        color:"Burgundy",
        precio:250000,
        imagen:"img/galaxys22ultra.webp",
        descripcion:"Con un diseño de vanguardia, el celular Samsung Galaxy S22 Ultra es un teléfono único que ofrece una pantalla Dynamic AMOLED 2x con una resolución Quad HD+ sin Notch ni distracciones. Además, tiene 12GB de RAM y 256GB de almacenamiento.",
        unidades:0
    }
]


//Arrays
const todosLosProductos=auriculares.concat(accesorios,telefonos);
const Carrito =[];


//Función que crea todos los productos en el HTML dependiendo de un array de productos
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
            <a href="#" class="btn btn-primary">Ver producto</a>
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

let botonCarrito = document.getElementById("menuCarrito");
botonCarrito.addEventListener("click", ()=>{
    ocultarProductos("col");
    MostrarCarrito(Carrito);
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
            todosLosProductos[indexProductos].unidades=1;
            Carrito.push(todosLosProductos[indexProductos]);
            console.log(Carrito);
        });
    });
};

crearBotonesDeCompra();

//Funcion que muestra el carrito de compras
function MostrarCarrito(array)
{
    const titulo= document.getElementById("titulo");
    titulo.innerHTML="Carrito:"
    if (Carrito.length===0)
    {
        let mensaje=document.createElement("h3");
        mensaje.innerText="El carrito está vacío";
        titulo.append(mensaje);
    }
    else
   {
    const app = document.getElementById("app");
    for (const items of array) {
        app.innerHTML += `
        <div class="col ${items.tipo}">
        <div class="card" >
            <img src="${items.imagen}"  class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${items.marca} ${items.modelo}</h5>
            <h6>Color ${items.color}</h6>
            <h3 class="units">Unidades: ${items.unidades}</h3>
            <h3 class="price">Precio: $${items.precio}</h3>
            <a href="#" id="${items.tipo+items.id}" class="btn btn-primary">Eliminar</a>
            </div>
        </div>
        </div>
        `;
        }
   }

    
}


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
