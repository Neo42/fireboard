import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA1uscG-MwhyMaxE1JByjKJ9NwxalxJErk',
  authDomain: 'fireboard-80213.firebaseapp.com',
  projectId: 'fireboard-80213',
  storageBucket: 'fireboard-80213.appspot.com',
  messagingSenderId: '709163373511',
  appId: '1:709163373511:web:6102dac473542f0170ffe2',
  measurementId: 'G-NMKYBQLWTB',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
