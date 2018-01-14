$(document).ready(function() {

    var config = { // Initialize Firebase
        apiKey: "AIzaSyAnbd175fkrj6F2YMtqd3-qZRWZn9BusUc",
        authDomain: "atom-3f5c1.firebaseapp.com",
        databaseURL: "https://atom-3f5c1.firebaseio.com",
        projectId: "atom-3f5c1",
        storageBucket: "atom-3f5c1.appspot.com",
        messagingSenderId: "359491018489"
    };
    firebase.initializeApp(config);
    /* correo -------------------------  */
    $('#registrar').click(function() {

        var email = $('#inputEmail').val();
        var contrasena = $('#inputContrasena').val();

        firebase.auth().createUserWithEmailAndPassword(email, contrasena)
            .then(function() {
                verificar();
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log('-----------------------------------');
                console.log(errorCode, errorMessage);

            });
        console.log(email, contrasena);

    })

    $('#ingreso').click(function() {

        var email2 = $('#inputEmail2').val();
        var contrasena2 = $('#inputContrasena2').val();


        firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function(error) {
            // Handle Errors here.
            event.preventDefault();
            var errorCode = error.code;
            var errorMessage = error.message;
            $('#contenido').remove();

        });

    });

    function observador() {
        firebase.auth().onAuthStateChanged(function(user) {

            if (user) {
                console.log('existe usuario activo');

                aparecer(user)

                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                console.log('*********************');

                console.log(user.emailVerified);

                console.log('*********************');
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
            } else {
                // User is signed out.
                console.log('no existe usuario activo');
                // ...
            }
        });

    }
    observador();

    function aparecer(user) {
        var user = user;
        var contenido = document.getElementById('contenido');
        if (user.emailVerified) {
            $('#contenido').append('<p>' +
                "solo lo ve usuario activo" + '</p>' + '<button onclick="cerrar()" >' +
                "Cerrar Sesión" + '</button> ');
        }

    }

    function cerrar() {
        firebase.auth().signOut()
            .then(function() {
                console.log('Saliendo...');
            })
            .catch(function(error) {
                console.log(error);

            })
    }
    cerrar();

    function verificar() {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function() {
            // Email sent.
            console.log('enviando correo');

        }).catch(function(error) {
            // An error happened.
            console.log('error');

        });
    }
});