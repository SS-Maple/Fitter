import { firebase, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAJsr1hc8-9AbDlCPLwkNMBmI9L_UD7IDY",
  authDomain: "fitter-c7958.firebaseapp.com",
  projectId: "fitter-c7958",
  storageBucket: "fitter-c7958.appspot.com",
  messagingSenderId: "653537610517",
  appId: "1:653537610517:web:c095b2d87972f89a18b71c",
  measurementId: "G-2SR3TCX1SV"
};

const app = initializeApp(firebaseConfig);

export const auth = app.auth();