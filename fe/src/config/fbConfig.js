import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyBX20Fb46oiimCL7df9UN1Vt_A2DcI7o5I',
  authDomain: 'gaze-8975.firebaseapp.com',
  projectId: 'gaze-8975'
};
firebase.initializeApp(config);

export default firebase;