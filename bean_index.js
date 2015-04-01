var noble    = require('noble');

var uuids = ["4c000215a4950fffc5b14b44b5121370f02d74de30390001c5"];

noble.startScanning(uuids);

noble.on('discover', function(peripheral) {

  var uuid = peripheral.uuid;
  var rssi = peripheral.rssi;
  var localName = peripheral.advertisement.localName;
  console.log('found device: ', uuid, ' ', localName, ' ', rssi);
});

/*
found device:  a4d856038b04   Gimbal    -72
found device:  b4994c64b96a   SensorTag   -59
found device:  b4994c1eb8e0   Bean   -59
---
found device:  b4994c64b96a   SensorTag   -59
found device:  b4994c1eb8e0   Bean   -59
found device:  0c17334002fc   undefined   -68
*/
