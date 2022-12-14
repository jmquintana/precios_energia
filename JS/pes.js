console.log("script pes.js");
const PRECIOS_EN_SURTIDOR =
	"/api/3/action/datastore_search?resource_id=80ac25de-a44a-4445-9215-090cf55cfda5";
const LOCAL_FILE_NAME = "pes.json";

//filters by default
let filters = {
	provincia: "CAPITAL FEDERAL",
	producto: "Nafta (súper) entre 92 y 95 Ron",
	idtipohorario: 2,
};

//all available columns in the dataset (choose cols of interest)
const columns = [
	{ title: "Año-Mes", data: "indice_tiempo" },
	// { title: "idempresa", data: "idempresa" },
	{ title: "Cuit", data: "cuit" },
	// { title: "Empresa", data: "empresa" },
	{ title: "Dirección", data: "direccion" },
	{ title: "Localidad", data: "localidad" },
	{ title: "Provincia", data: "provincia" },
	// { title: "region", data: "region" },
	// { title: "idproducto", data: "idproducto" },
	// { title: "Producto", data: "producto" },
	// { title: "idtipohorario", data: "idtipohorario" },
	// { title: "tipohorario", data: "tipohorario" },
	{ title: "Precio", data: "precio" },
	{ title: "Publicado", data: "fecha_vigencia" },
	// { title: "idempresabandera", data: "idempresabandera" },
	{ title: "Bandera", data: "empresabandera" },
	// { title: "latitud", data: "latitud" },
	// { title: "longitud", data: "longitud" },
	// { title: "geojson", data: "geojson" },
];

//chosen cols for mobile platform (not yet implemented)
const columnsMobile = [
	{ title: "Año-Mes", data: "indice_tiempo" },
	// { title: "idempresa", data: "idempresa" },
	// { title: "Cuit", data: "cuit" },
	// { title: "Empresa", data: "empresa" },
	// { title: "Dirección", data: "direccion" },
	{ title: "Localidad", data: "localidad" },
	// { title: "Provincia", data: "provincia" },
	// { title: "region", data: "region" },
	// { title: "idproducto", data: "idproducto" },
	// { title: "Producto", data: "producto" },
	// { title: "idtipohorario", data: "idtipohorario" },
	// { title: "tipohorario", data: "tipohorario" },
	{ title: "Precio", data: "precio" },
	// { title: "Publicado", data: "fecha_vigencia" },
	// { title: "idempresabandera", data: "idempresabandera" },
	{ title: "Bandera", data: "empresabandera" },
	// { title: "latitud", data: "latitud" },
	// { title: "longitud", data: "longitud" },
	// { title: "geojson", data: "geojson" },
];

//some format for chosen cols
const columnDefs = [
	{
		width: "10%",
		className: "dt-center",
		render: $.fn.dataTable.render.number(",", ".", 2, "").display,
		targets: [5], //[precio]
	},
	{
		width: "10%",
		className: "dt-center",
		render: $.fn.dataTable.render.moment(
			"YYYY-MM-DDTHH:mm:ss",
			"DD/MM/YYYY HH:mm"
		),
		targets: [6], //[fecha_vigencia]
	},
	{
		width: "3%",
		className: "dt-body-center",
		orderData: [0, 1, 2], //[indice_tiempo, cuit, direccion]
		targets: [0, 1], //[indice_tiempo, cuit]
	},
];

//format for cols for mobile platform (not yet implemented)
const columnDefsMobile = [
	{
		width: "5%",
		className: "dt-right",
		render: $.fn.dataTable.render.number(",", ".", 2, "").display,
		targets: [2], //[precio]
	},
	{
		width: "3%",
		className: "dt-body-center",
		orderData: [0, 1, 2], //[indice_tiempo, cuit, direccion]
		targets: [0], //[indice_tiempo, cuit]
	},
];

//cols format for downloadable excel
const excelStyles = [
	{
		cells: ["E", "F", "G", "H", "I", "J", "K"],
		style: {
			numFmt: "#,##0.00;-#,##0.00;-",
		},
	},
];
const colReorder = { order: [5, 3, 2, 1, 0] };

let endpoint = PRECIOS_EN_SURTIDOR;

const buttons = [
	{ extend: "copy", className: "copyButton" },
	{
		extend: "excel",
		className: "excelButton",
		excelStyles: excelStyles,
	},
	{ text: "Map", className: "mapButton" },
];

const PRODUCT_DICT = {
	"Nafta (súper) entre 92 y 95 Ron": "Nafta Súper",
	"Nafta (premium) de más de 95 Ron": "Nafta Premium",
	GNC: "GNC",
	"Gas Oil Grado 2": "Gas Oil Grado 2",
	"Gas Oil Grado 3": "Gas Oil Grado 3",
};
