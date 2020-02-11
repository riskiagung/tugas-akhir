import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCkqCE0qYbOk3gs4HlIYFCRbNDIeU5Kb70",
    authDomain: "tugas-akhir-bf285.firebaseapp.com",
    databaseURL: "https://tugas-akhir-bf285.firebaseio.com",
    projectId: "tugas-akhir-bf285",
    storageBucket: "tugas-akhir-bf285.appspot.com",
    messagingSenderId: "248503754444",
    appId: "1:248503754444:web:49e544d84cd45246b26c69",
    measurementId: "G-QJW93T22LF",
}

const Firebase = firebase.initializeApp(config);

export default Firebase;