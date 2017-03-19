const Realm = require('realm');
const Waruns = {
  name: 'Warungs',
  primaryKey: 'warungId',
  properties: {
   'warungId' : 'int',
   'warungNama' : 'string',
   'warungAlamat' : 'string',
   'warungGambar' : 'string',
   'warungLatLong' : 'string',
   'warungDeskripsi' : 'string',
   'warungRating' : 'int',
   'warungOwner' : 'string',
   'warungHalal' : 'int',
   'warungSukla' : 'int',
   'warungTotalRate' : 'int',
   'warungWaktuBuka' : 'string',
   'warungWaktuTutup' : 'string',
   'warungLevelHarga' : 'string',
   'warungDelivery' : 'string',
   'warungPhone' : 'string',
  }
};

export const realm = new Realm({schema: [Warungs]});
