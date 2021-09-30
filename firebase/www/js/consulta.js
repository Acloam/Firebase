var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        app.listar();
        document.getElementById("btnSearch").addEventListener("click",app.reload);
    },

    listar: function() {
        var db = firebase.firestore();
        var collection = document.title.slice(10);
        var ag = db.collection(collection);
        var filter = document.getElementById("filter").value;
        var counter = 1;
        
        ag.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().nome.includes(filter)){
                    console.log(doc.id)
                    $("#tableData").append("<tr>");
                    $("#tableData").append("<td scope='col'>" + counter + "</td>");
                    $("#tableData").append("<td scope='col'>" + doc.data().nome + "</td>");
                    $("#tableData").append("<td scope='col'>" + doc.data().telefone + "</td>");
                    $("#tableData").append("<td scope='col'>" + doc.data().origem + "</td>");
                    $("#tableData").append("<td scope='col'>" + doc.data().data_contato + "</td>");
                    $("#tableData").append("<td scope='col'>" + doc.data().observacao + "</td>");
                    $("#tableData").append(`<td scope='col'> <button id=${doc.id} name=${counter} onclick='app.saveInfo(${counter})' type='button' class='btn btn-outline-primary'>Editar</button> </td>`);
                    $("#tableData").append("<td scope='col'> <button type='button' class='btn btn-outline-primary'>Excluir</button> </td>");
                    $("#tableData").append("</tr>");
                    counter++;
                }
            })
        })  
    },

    saveInfo: function(data) {
        var id = document.getElementsByName(data)[0].id;
        localStorage.setItem('id', id);
        document.location = '../edicao/editar'+document.title.slice(10)+'.html';
    },

    reload: function() {
        var table = document.getElementById('tableData')
        while(table.firstChild){
            table.lastChild.remove();
        }
        app.listar();
    }

}

app.initialize();