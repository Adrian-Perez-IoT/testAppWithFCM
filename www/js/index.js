var appcordova = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        
        inicializarFirebase();
        initVue();

        // var firebaseThings = window.FirebaseDatabasePlugin.ref('backend-de7e2');
        // console.log("mi base de datos es:", firebaseThings);


        // window.FirebasePlugin.hasPermission(function(data) {
        //     alert("tengo permiso?" + data.isEnabled);
        // });

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function initVue() {
    let app = new Vue({
        el: '#vue-instance',
        data: {
            message: 'Hola desde Vue.js'
        }
    });
}


function sendTokenToServer(token) {
    //guardo el token en una tabla especial en mi base de datos y luego recupero ese registro desde mi servidor backend
    // alert("estoy en la funcion sendTokenToServer");
    writeUserToken("1", "adrian", "Bandy2@gmail.com", token);
}

function inicializarFirebase() {
    //inicializo
    var firebaseConfig = {
        apiKey: "AIzaSyDaPl-WfltavFvF1FdwTNLSHfMry9mVA5I",
        authDomain: "backend-de7e2.firebaseapp.com",
        databaseURL: "https://backend-de7e2.firebaseio.com",
        projectId: "backend-de7e2",
        storageBucket: "backend-de7e2.appspot.com",
        messagingSenderId: "696120565365",
        appId: "1:696120565365:web:c63c9e2a24127d2d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);    
}

function writeUserToken(userId, name, email, token) {
    firebase.database().ref('token/' + userId).set({
        username: name,
        email: email,
        token: token
    });
    alert("Se grabo el token en la RT DB");
}
