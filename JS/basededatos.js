//Base de datos de productos
const auriculares=[
    {
        id:"A001",
        tipo:"Auriculares",
        marca:"Sony",
        modelo:"WH-1000XM4",
        color:"blanco",
        precio:0,
        usd:350,
        imagen:"img/xm4-blancos.webp",
        imagen1:"img/xm4-blancos2.webp",
        imagen2:"img/xm4-blancos3.webp",
        imagen3:"img/xm4-blancos4.webp",
        titulo:"Auriculares inalámbricos con noise cancelling WH-1000XM4",
        descripcion:"Los intuitivos e inteligentes audífonos WH-1000XM4 te ofrecen nuevas mejoras en la tecnología de noise cancelling líder del sector 1, una calidad de sonido excepcional y funciones de escucha inteligente que se ajustan al entorno y lo que estés haciendo.",
        unidades:0
    },
    {
        id:"A002",
        tipo:"Auriculares",
        marca:"Audio-Technica",
        modelo:"ATH-M50xBT2",
        color:"negro",
        precio:0,
        usd:350,
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
        precio:0,
        usd:350,
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
        precio:0,
        usd:350,
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
        precio:0,
        usd:350,
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
        precio:0,
        usd:350,
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
        precio:0,
        usd:350,
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
        precio:0,
        usd:350,
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
        precio:0,
        usd:350,
        imagen:"img/galaxys22ultra.webp",
        descripcion:"Con un diseño de vanguardia, el celular Samsung Galaxy S22 Ultra es un teléfono único que ofrece una pantalla Dynamic AMOLED 2x con una resolución Quad HD+ sin Notch ni distracciones. Además, tiene 12GB de RAM y 256GB de almacenamiento.",
        unidades:0
    }
]
//Arrays
const todosLosProductos=auriculares.concat(accesorios,telefonos);
const Carrito =[];