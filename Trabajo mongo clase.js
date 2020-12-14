db.drones.insertMany([
   {_id: "1", Cliente: {nombre:"Jose",ciudad:"Barcelona", empresa: false, contacto: 665932102}, Venta: {unidades: 3, fecha: new Date("2019-12-27"), precio: 155, CodPromocional:"Navidad"}, Producto: {status: "A", modelo: "XP Ultra", CostoUnidad: 57}},
   {_id: "2", Cliente: {nombre:"Luis",ciudad:"Valencia", empresa: true, contacto: 643422246}, Venta: {unidades: 15, fecha: new Date("2019-12-29"), precio: 750, CodPromocional:"Navidad"}, Producto: {status: "B", modelo: "Makina", CostoUnidad: 45}},
   {_id: "3", Cliente: {nombre:"Paco",ciudad:"Lerida", empresa: false, contacto: 684868242}, Venta: {unidades: 2, fecha: new Date("2020-6-24"), precio: 220, CodPromocional: null}, Producto: {status: "A", modelo: "Deux", CostoUnidad: 35}},
   {_id: "4", Cliente: {nombre:"Josefa",ciudad:"Madrid", empresa: false, contacto: 409202584}, Venta: {unidades: 3, fecha: new Date("2020-06-21"), precio: 340, CodPromocional:"Verano"}, Producto: {status: "B", modelo: "Makina", CostoUnidad: 45}},
   {_id: "5", Cliente: {nombre:"Maria",ciudad:"Mayorca", empresa: false, contacto: 232534235}, Venta: {unidades: 4, fecha: new Date("2020-1-15"), precio: 360, CodPromocional:"AñoNuevo"}, Producto: {status: "C", modelo: "DualViral", CostoUnidad: 85}},
   {_id: "6", Cliente: {nombre:"Luis",ciudad:"Madrid", empresa: false, contacto: 258482384}, Venta: {unidades: 1, fecha: new Date("2020-12-24"), precio: 115, CodPromocional:"Navidad"}, Producto: {status: "C", modelo: "Deux", CostoUnidad: 35}},
   {_id: "7", Cliente: {nombre:"Cristiam",ciudad:"Madrid", empresa: false, contacto: 654545423}, Venta: {unidades: 2, fecha: new Date("2020-6-04"), precio: 140, CodPromocional:"Verano"}, Producto: {status: "D", modelo: "XP Ultra", CostoUnidad: 57}},
   {_id: "8", Cliente: {nombre:"Alejandro",ciudad:"Sevilla", empresa: false, contacto: 64365436}, Venta: {unidades: 1, fecha: new Date("2020-10-23"), precio: 85, CodPromocional:"Halloween"}, Producto: {status: "D", modelo: "Deux", CostoUnidad: 35}},
   {_id: "9", Cliente: {nombre:"Manuel",ciudad:"Barcelona", empresa: false, contacto: 465681234}, Venta: {unidades: 3, fecha: new Date("2020-56-04"), precio: 230, CodPromocional:"Verano"}, Producto: {status: "A", modelo: "Makina", CostoUnidad: 45}},
   {_id: "10", Cliente: {nombre:"Jose",ciudad:"Almeria", empresa: true, contacto: 786328935}, Venta: {unidades: 30, fecha: new Date("2020-12-21"), precio: 1060, CodPromocional:"Navidad"}, Producto: {status: "B", modelo: "DualViral", CostoUnidad: 87}},
   {_id: "11", Cliente: {nombre:"Alfonso",ciudad:"Girona", empresa: false, contacto: 35676582}, Venta: {unidades: 2, fecha: new Date("2020-01-04"), precio: 195, CodPromocional:"AñoNuevo"}, Producto: {status: "C", modelo: "Makina", CostoUnidad: 45}},
   {_id: "12", Cliente: {nombre:"Andres",ciudad:"Madrid", empresa: false, contacto: 46367547}, Venta: {unidades: 6, fecha: new Date("2020-01-24"), precio: 460, CodPromocional: null}, Producto: {status: "A", modelo: "XP Ultra", CostoUnidad: 56}},
   {_id: "13", Cliente: {nombre:"Jose",ciudad:"Toledo", empresa: true, contacto: 3576356347}, Venta: {unidades: 14, fecha: new Date("2020-12-23"), precio: 1250, CodPromocional:"Navidad"}, Producto: {status: "B", modelo: "DualViral", CostoUnidad: 37}},
   {_id: "14", Cliente: {nombre:"Pablo",ciudad:"Madrid", empresa: false, contacto: 465765854}, Venta: {unidades: 4, fecha: new Date("2020-09-23"), precio: 240, CodPromocional: null}, Producto: {status: "C", modelo: "DualViral", CostoUnidad: 45}},
   {_id: "15", Cliente: {nombre:"Manuel",ciudad:"Lugo", empresa: false, contacto: 547653428}, Venta: {unidades: 3, fecha: new Date("2020-12-23"), precio: 210, CodPromocional:"Navidad"}, Producto: {status: "A", modelo: "Deux", CostoUnidad: 25}},
   {_id: "16", Cliente: {nombre:"Sara",ciudad:"Barcelona", empresa: false, contacto: 412352545}, Venta: {unidades: 2, fecha: new Date("2020-08-22"), precio: 195, CodPromocional:"Verano"}, Producto: {status: "D", modelo: "XP Ultra", CostoUnidad: 56}},
   {_id: "17", Cliente: {nombre:"Miguel",ciudad:"Sevilla", empresa: true, contacto: 241233456}, Venta: {unidades: 8, fecha: new Date("2020-12-26"), precio: 640, CodPromocional:"Navidad"}, Producto: {status: "D", modelo: "Makina", CostoUnidad: 40}},
   {_id: "18", Cliente: {nombre:"Miguel",ciudad:"Palencia", empresa: false, contacto: 35367646}, Venta: {unidades: 2, fecha: new Date("2020-01-12"), precio: 175, CodPromocional:"AñoNuevo"}, Producto: {status: "A", modelo: "XP Ultra", CostoUnidad: 53}},

]);
// Selecciona todos los encargos en los cuales el producto tenga un status A
db.drones.aggregate ( [
    {$match: {"Producto.status": "A"} },
])

// Agrupa todos los drones según su fecha y día creando un nuevo documento el cual tiene por _id el respectivo año y dia de venta.
db.drones.aggregate ( [
    {$group: 
        {
        _id: {fecha: {year: {$year: "$Venta.fecha"}, day: {$dayOfYear: "$Venta.fecha"}}},
    }
}
])

//Selecciona todos los productos cuyo status sea A y su Costo de Unidad mayor o igual a 50 y los agrupa 
// estableciendo la _id del documento que agregue como un documento anidado "Fecha" el cual contendrá el campo
// Year (obtenido mediante la función $year a la fecha de venta) y el campo day ((obtenido mediante la función $dayofYear a la fecha de venta))
db.drones.aggregate ( [
    {$match:
        {$and: [{"Producto.status": "A"}, {"Producto.CostoUnidad": {$gte: 50}}] }
    },
    {$group: 
        {
        _id: {fecha: {year: {$year: "$Venta.fecha"}, day: {$dayOfYear: "$Venta.fecha"}}},
    }
}
])

// Igual que el anterior pero agregando un campo al documento creado por aggregate "Cantidad".
db.drones.aggregate ( [
    {$match:
        {$and: [{"Producto.status": "A"}, {"Producto.CostoUnidad": {$gte: 50}}] }
    },
    {$group: 
        {
        _id: {fecha: {year: {$year: "$Venta.fecha"}, day: {$dayOfYear: "$Venta.fecha"}}},
        cantidad: {$multiply: ["$Venta.unidades,$Producto.CostoUnidad "]},        
    }
}
])