const axios = require('axios');
 
const API_BASE = 'http://localhost:8080/api';
 
const hospitals = [
  { name: 'City General Hospital', address: 'Banjara Hills, Hyderabad', rating: 4.8 },
  { name: 'Red Cross Medical Center', address: 'Madhapur, Hyderabad', rating: 4.5 },
  { name: 'Apollo Health City', address: 'Jubilee Hills, Hyderabad', rating: 4.9 },
  { name: 'Global Hospital', address: 'Lakdikapul, Hyderabad', rating: 4.2 },
  { name: 'Care Hospital', address: 'Nampally, Hyderabad', rating: 4.6 }
];
 
const requests = [
  { patientName: 'Rahul Sharma', bloodType: 'O+', urgency: 'URGENT', location: 'Hyderabad', requiredUnits: 2, hospitalName: 'City General' },
  { patientName: 'Priya Singh', bloodType: 'AB-', urgency: 'NORMAL', location: 'Secunderabad', requiredUnits: 1, hospitalName: 'Red Cross' }
];
 
async function seed() {
  console.log('Seeding hospitals...');
  for (const h of hospitals) {
    try {
      await axios.post(`${API_BASE}/hospitals`, h);
      console.log(`Added: ${h.name}`);
    } catch (e) {
      console.error(`Failed to add ${h.name}: ${e.message}`);
    }
  }
 
  console.log('Seeding blood requests...');
  for (const r of requests) {
    try {
      await axios.post(`${API_BASE}/requests`, r);
      console.log(`Added: ${r.patientName}`);
    } catch (e) {
      console.error(`Failed to add ${r.patientName}: ${e.message}`);
    }
  }
  console.log('Seeding complete!');
}
 
seed();
