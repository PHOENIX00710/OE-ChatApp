import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAxl91vVS6_Vof4Uoaszxpjm5wHmjqh2VM",
  authDomain: "oe-chat-app.firebaseapp.com",
  projectId: "oe-chat-app",
  storageBucket: "oe-chat-app.appspot.com",
  messagingSenderId: "793276203033",
  appId: "1:793276203033:web:9b317e945e5cb3a77c6a88",
  measurementId: "G-TZ5WXRWF0W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app,analytics};