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
    imagenes[1].setAttribute('src',`../${objeto.imagen2}`); 
    imagenes[2].setAttribute('src',`../${objeto.imagen3}`);
    const modeloProducto =document.getElementById("modeloProducto");
    modeloProducto.innerHTML=`${objeto.marca}`+" "+`${objeto.modelo}`;
    const titulo=document.getElementById("tituloProducto");
    titulo.innerHTML=`${objeto.titulo}`;
    const descripcion= document.getElementById("descripcion");
    descripcion.innerHTML=`${objeto.descripcion}`;
    const precio= document.getElementById("precio");
    precio.innerHTML=`Precio: $${objeto.precio}`;
}
mostrarInfoProducto();

