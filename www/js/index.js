var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        alert("entre a la funcion receivedEvent");
        inicializarFirebase();

        // var firebaseThings = window.FirebaseDatabasePlugin.ref('backend-de7e2');
        // console.log("mi base de datos es:", firebaseThings);


        // window.FirebasePlugin.hasPermission(function(data) {
        //     alert("tengo permiso?" + data.isEnabled);
        // });

        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        window.FirebasePlugin.getToken(function (currentToken) {
            // alert(currentToken);
            if (currentToken != null) {
                alert("aqui pongo el token, luego onNotification()" + currentToken);
                sendTokenToServer(currentToken);
                //updateUIForPushEnabled(currentToken);
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
                // Show permission UI.
                updateUIForPushPermissionRequired();
                setTokenSentToServer(false);
            }
        }, function (err) {
            console.log('An error occurred while retrieving token. ', err);
            showToken('Error retrieving Instance ID token. ', err);
            setTokenSentToServer(false);
        });

        //Accion a realizar cuando recibo una notificacion:
        window.FirebasePlugin.onNotificationOpen(function (notification) {            
            alert("entre en onNotificatoinopen" + Object.keys(notification));
        }, function (error) {
            console.error(error);
        });

    }
};

app.initialize();

function sendTokenToServer(token) {
    //guardo el token en una tabla especial en mi base de datos y luego recupero ese registro desde mi servidor backend
    alert("estoy en la funcion sendTokenToServer");
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
    alert("Ya escribi un nuevo Token");
}