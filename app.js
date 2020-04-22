// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyC9lRqLuxR64QkBtxUcjlYT5xX37GPxoHQ',
    authDomain: 'adminusuarios-3ff95.firebaseapp.com',
    projectId: 'adminusuarios-3ff95'
});

var db = firebase.firestore();
// agregar documentos
function guardar() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;
    db.collection("Usuarios").add({
            nombre: nombre,
            apellido: apellido,
            fecha: fecha
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fecha').value = '';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

}
// leer documentos
var tabla = document.getElementById('tabla');
db.collection("Usuarios").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `
        <tr>
        <td>${doc.data().nombre}</td>
        <td> ${doc.data().apellido}</td>
        <td>${doc.data().fecha}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning " onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().fecha}')">Editar</button></td>
      </tr>`

    });
});

// borrar documentos
function eliminar(id) {

    db.collection("Usuarios").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");

    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}

// editar documento

function editar(id, nombre, apellido, fecha) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar'
    boton.onclick = function() {

        var actualizar = db.collection("Usuarios").doc(id);
        // Set the "capital" field of the city 'DC'
        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var fecha = document.getElementById('fecha').value;

        return actualizar.update({
                nombre: nombre,
                apellido: apellido,
                fecha: fecha
            })
            .then(function() {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Guardar'
                boton.onclick = function() {
                    guardar();
                }
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('fecha').value = '';
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }

}