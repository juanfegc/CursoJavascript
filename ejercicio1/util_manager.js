importClass(java.net.URL);
importClass(java.io.FileOutputStream);

function downloadXML(url, file) {
    try {
        var url = new URL(url);
        var conexion = url.openConnection();
        conexion.connect();
        // input/output streams
        var input = conexion.inputStream;
        var output = new FileOutputStream(file);
        // Crear un array de 4k bytes como buffer de lectura
        var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
        var num;
        while((num=input.read(buffer)) != -1){//Read and loop until EOF
            output.write(buffer, 0, num);// Escribir bytes en el fichero
        }
        output.close();//Cerrar streams
        input.close();
        print("Download ok!");
        return true;
    }catch(e){
        print("Exception "+e.toString());
        return false;
    }
}


function analizarXml2Json(file){
    //obtenemos la fecha para analizar solo los datos de hoy
    var fecha = fechaHoy();
    //leemos fichero XML descargado
    var FileReader = java.io.FileReader;
    var BufferedReader =java.io.BufferedReader;
    var f = new FileReader(file);
    var br = new BufferedReader(f);
    var cad = new String;//variable donde vamos a ir componiendo el texto con formato JSON
    var line = new String;
    var analizar = false;
    while ((line = br.readLine()) != null) {
        var estaLinea = new String( line ).replace(/^\s+/g,'');//limpio espacios
        switch (estaLinea) {
            case '<dia fecha="'+fecha+'">':
                analizar = true;
                break;
            case '<temperatura>':
                if(analizar){
                    line1 = br.readLine();
                    maxima = new String( line1 ).replace(/^\s+<maxima>|<\/maxima>/g,'');
                    line2 = br.readLine();
                    minima = new String( line2 ).replace(/^\s+<minima>|<\/minima>/g,'');
                    cad=cad+"{hoy:'"+fecha+"',temperatura:{max:"+maxima+",min:"+minima+"}}";
                    analizar = false;
                }
                break;
            default:
                break;
        }
    }
    print("JSON = "+cad);
    return cad;
}

function saveJson(text, file){
    //guardamos JSON en un archivo de texto
    var f = new java.io.File(file);
    var out = new java.io.FileWriter(f);
    out.write(text);
    out.close();
    print("save ok!");
}

function fechaHoy(){
    //componemos cadena con la fecha de hoy
    hoy = new Date();
    mes = new Number(hoy.getMonth()).valueOf()+1;
    if(mes<10) mes="0"+mes;
    dia = new Number(hoy.getDate()).valueOf();
    if(dia<10) dia="0"+dia;
    fecha = hoy.getFullYear()+"-"+mes+"-"+dia;
    //print("fecha:"+fecha);
    return fecha;
}
