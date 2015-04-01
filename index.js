var noble    = require('noble');

console.log("looking for BLE devices");

noble.startScanning([],false);

noble.on('discover', function(peripheral) {

  console.log("FOUND");

  if (peripheral.uuid != undefined) {
    console.log('uuid: ', peripheral.uuid);
  }

  if (peripheral.rssi != undefined) {
    console.log('rssi: ', peripheral.rssi);
  }

  if (peripheral.advertisement.localName != undefined) {
    console.log('localName: ', peripheral.advertisement.localName);
  }

  if (peripheral.advertisement.txPowerLevel != undefined) {
    console.log('txPower: ', peripheral.advertisement.txPowerLevel);
  }

  if (peripheral.advertisement.manufacturerData) {
    var manufacturerDataAsString = JSON.stringify(peripheral.advertisement.manufacturerData.toString('hex'));
    var manufacturerDataAsBuffer = peripheral.advertisement.manufacturerData;
    console.log('manufacturerDataString: ', manufacturerDataAsString);
    console.log('manufacturerDataBuffer: ', manufacturerDataAsBuffer);
    // var slice1 = manufacturerDataAsBuffer.slice(0,1);
    // console.log('slice1: ', slice1);
    // var slice2 = manufacturerDataAsBuffer.slice(0,2);
    // console.log('slice2: ', slice2);
    // var slice3 = manufacturerDataAsBuffer.slice(2,3);
    // console.log('slice3: ', slice3);
    var ibeacon_uuid = manufacturerDataAsBuffer.slice(4,20);
    console.log('ibeacon_uuid: ', ibeacon_uuid.toString('hex'));

    var ibeacon_major = manufacturerDataAsBuffer.slice(20,22);
    if (ibeacon_major) {
      var ibeacon_major_string = ibeacon_major.toString('hex');
      var ibeacon_major_decimal = parseInt(ibeacon_major_string, 16);
      console.log('ibeacon_major: ', ibeacon_major_decimal);

    }

    var ibeacon_minor = manufacturerDataAsBuffer.slice(22,24);
    if (ibeacon_minor) {
      var ibeacon_minor_string = ibeacon_minor.toString('hex');
      var ibeacon_minor_decimal = parseInt(ibeacon_minor_string, 16);
      console.log('ibeacon_minor: ', ibeacon_minor_decimal);
    }

  }

  var serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    console.log('serviceData: ');
    for (var i in serviceData) {
      console.log('\t\t' + JSON.stringify(serviceData[i].uuid) + ': ' + JSON.stringify(serviceData[i].data.toString('hex')));
    }
  }

  var serviceUuids = peripheral.advertisement.serviceUuids;
  if (serviceUuids && serviceUuids.length) {
    console.log('serviceUuids: ', serviceUuids);
  }

  console.log('========================================');

});  // noble.on

/*
found device:  a4d856038b04   Gimbal    -72
found device:  b4994c64b96a   SensorTag   -59
found device:  b4994c1eb8e0   Bean   -59
---
found device:  b4994c64b96a   SensorTag   -59
found device:  b4994c1eb8e0   Bean   -59
found device:  0c17334002fc   undefined   -68
*/
