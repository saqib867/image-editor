import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/st'


const firebaseConfig = {
  apiKey: "AIzaSyDPaTM9d7D68mme0NW0T_Qb_JidKYHenYs",
  authDomain: "image-editor-e32dc.firebaseapp.com",
  projectId: "image-editor-e32dc",
  storageBucket: "image-editor-e32dc.appspot.com",
  messagingSenderId: "293183360752",
  appId: "1:293183360752:web:80e3df82ee5dd8cc107c35",
  measurementId: "G-2PDW2264B7"
};

const firebaseApp=initializeApp(firebaseConfig)
const db=getFirestore(firebaseApp)
const auth=getAuth(firebaseApp)
const storage=getStorage(firebaseApp)

export {db,auth,storage}
