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
    /* ggogle -------------------------  */
    var user = null;
    var $loginBtn = $('#start-login');
    $loginBtn.on('click', googleLogin);

    function googleLogin() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase //  esta en la doc de firebase
            .auth()
            .sigInWithPoup(provider)
            .then(function(result) {
                user = result.user; // guardamos el usuario que nos trae result
                console.log(user); // mostramos su contenido
                $('#login').fadeOut(); // ocultamos el div de login

            });
    }
});