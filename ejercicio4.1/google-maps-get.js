var https = require('https');

console.log('------------ DISTANCIAS CIUDADES --------------');
console.log('node google-maps-get <origen> <destino> <modo> ');
console.log('-----------------------------------------------');
var origen = process.argv[2]?process.argv[2]:'Granada';
var destino = process.argv[3]?process.argv[3]:'Almeria';
var modo = process.argv[4]?process.argv[4]:'driving';//driving / walking / bicycling

var options = {
    host: 'maps.googleapis.com',
    path: '/maps/api/distancematrix/json?origins='+origen+'&destinations='+destino+'&mode='+modo,
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
};

var req = https.get(options, function(res) {
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (datos_JSON) {
        data+=datos_JSON;
    });
    res.on('end', function(){
      var datos = JSON.parse(data);
      console.log('La distancia entre '+origen+"-"+destino+" es de "+ datos.rows[0].elements[0].distance.text);
    });
});

req.end();
