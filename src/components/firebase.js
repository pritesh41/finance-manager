import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDNh8ZpOr5fwLpkBDMzyGihnnNNhxx-HpY",
  authDomain: "finance-manager-6f51f.firebaseapp.com",
  databaseURL: "https://finance-manager-6f51f-default-rtdb.firebaseio.com",
  projectId: "finance-manager-6f51f",
  storageBucket: "finance-manager-6f51f.appspot.com",
  messagingSenderId: "762720310263",
  appId: "1:762720310263:web:9f9900a0fe124cf6da54f2",
  measurementId: "G-1H3SG1W01Q"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export { database };