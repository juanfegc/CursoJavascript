// ----------------------------------------------------------------
// Descargamos un archivo xml con datos meteorologicos de Granada,
// lo analizamos para obtener las temperatura max. y min. a fecha
// de hoy y lo guardamos en un fichero json.
//
// ejecutar con:
// > rhino ejercicio1.js
// ----------------------------------------------------------------
load('util_manager.js');

var url = "http://www.aemet.es/xml/municipios/localidad_18087.xml";
var fileXML = "datos.xml"
var fileJSON = "datos.json"

//descargamos xml con datos meteorologicos de Granada
var descarga_completada = downloadXML(url, fileXML);

if(descarga_completada){
    print("Analizar XML --> JSON");
    var texto = analizarXml2Json(fileXML);
    saveJson(texto, fileJSON);
}else{
    print("Error al descargar xml");
}



