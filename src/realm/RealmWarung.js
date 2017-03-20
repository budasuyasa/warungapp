const Realm = require('realm');
const Warungs = {
  name: 'Warungs',
  primaryKey: 'warungId',
  properties: {
   'warungId' : 'string',
   'warungNama' : 'string',
   'warungAlamat' : 'string',
   'warungGambar' : 'string',
   'warungLatLong' : {type: 'string', optional: true},
   'warungDeskripsi' : {type: 'string', optional: true},
   'warungRating' : {type: 'string', optional: true},
   'warungOwner' : {type: 'string', optional: true},
   'warungHalal' : {type: 'string', optional: true},
   'warungSukla' : {type: 'string', optional: true},
   'warungTotalRate' : {type: 'string', optional: true},
   'warungWaktuBuka' : {type: 'string', optional: true},
   'warungWaktuTutup' : {type: 'string', optional: true},
   'warungLevelHarga' : {type: 'string', optional: true},
   'warungDelivery' : {type: 'string', optional: true},
   'warungPhone' : {type: 'string', optional: true},
  }
};

export const realmWarung = new Realm({schema: [Warungs]});
