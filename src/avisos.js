var usuario, listaMateriaDisponibles, elementoAnuncio, negro, idMateria, materiaActual , esDocente;
var myAnuncios = new Array();
$(document).ready(function () {
    //BUSCADOR
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#cuerpoAnuncio .subCuerpoAnuncio").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    //Inicar principal
    iniciarVariables();
    //CONTRLAR LA VENTANA
    $( window ).bind("resize", function(){
        let tam = $( window ).width();
        console.log(tam);
        if(tam <= 890){
            $("#collapsibleNavbar").removeClass("d-flex");
            $("#collapsibleNavbar").removeClass("justify-content-between");
        }else{
            $("#collapsibleNavbar").addClass("d-flex");
            $("#collapsibleNavbar").addClass("justify-content-between");
        }
    });
    
    $("#changeAnuncio").change(function (e) { 
        e.preventDefault();
        let valor = $("#changeAnuncio").val();
        console.log(valor);
        if(valor =="fechaAsc" ){
            ordenarFechaAsc();
        }else{
            if(valor =="fechaDesc"){
                ordenarFechaDesc();
            }else{
                if(valor =="NombreAsc"){
                    ordenarNombreAsc();
                }else{
                    ordenarNombreDesc();
                }
            }
        }
    });

    $("#formCrearAviso").submit(function (e) { 
        e.preventDefault();
        $('#myModal').modal('hide');
        let titulo = $("#tituloAviso").val();
        let descripcion = $("#descripcionAviso").val();
        let recurso = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ngenespanol.com%2Fnaturaleza%2Fpericos-selectivos%2F&psig=AOvVaw2IsSAUBPwR7mgBB6mmV0Qc&ust=1640741510050000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCODczMqshfUCFQAAAAAdAAAAABAD'
        let fecha = new Date();
        let fechaAnuncio = fecha.getFullYear()+"-"+(fecha.getMonth() + 1 )+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
        myAnuncios.push({titulo,descripcion,recurso,fechaAnuncio});
        localStorage.setItem('arregloMateria',JSON.stringify(listaMateriaDisponibles));
        Swal.fire('Exito!!',"Se agregado nuevo curso",'success');
        listarAnuncios(idMateria);
    });

    //Boton para salir
    $("#btnSalir").click(function (e) { 
        e.preventDefault();
        console.log("Se presiono el boton para salir");
        setTimeout(function () {
            window.location.href = "./index.html";
        }, 500);
    });

    // FUNCIONAS GLOBALES
    $("#nombreUsuario").html(usuario.nombreEstudiante);

});

function iniciarVariables(){
    listaMateriaDisponibles = JSON.parse(localStorage.getItem('arregloMateria'));
    usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    obtenerMateriaLocalStrage();
    listarAnuncios(usuario.idEstudiante);
}


function listarAnuncios(idMat){
    for(let i = 0 ; i<listaMateriaDisponibles.length ; i++){
        let elemento = listaMateriaDisponibles[i];
        if(elemento.idMateria = idMat){
            elementoAnuncio = elemento;
            myAnuncios =  elemento.anuncios;
            $("#cuerpoAnuncio").empty();
            if(esDocente){
                elemento.anuncios.forEach(anuncio => {
                    $("#cuerpoAnuncio").append("<div class='p-2 bg-white text-dark border rounded my-2 subCuerpoAnuncio'>"+
                        // "<h5>"+anuncio.titulo+"</h5>"+
                        "<div class='d-flex justify-content-between'><div><h5>"+anuncio.titulo+"</h5></div> <div class='editarAnunciosDocentes'><a href='#' class='text-info' data-toggle='modal' data-target='#myModalEditar'><i class='fas fa-tools'></i></a> <a href='#' class='text-danger' data-toggle='modal' data-target='#myModalEliminar'><i class='far fa-trash-alt'></i></a></div></div>"+
                        "<p>"+anuncio.descripcion+"</p>"+
                        "<div class='d-flex justify-content-between'><div><strong>"+anuncio.fechaAnuncio+"</strong></div><div><a href='"+anuncio.recurso+"'><i class='fas fa-link'></i> Enlace</a></div></div>"+
                    "</div>");
                });
            }else{
                elemento.anuncios.forEach(anuncio => {
                    $("#cuerpoAnuncio").append("<div class='p-2 bg-white text-dark border rounded my-2 subCuerpoAnuncio'>"+
                        "<h5>"+anuncio.titulo+"</h5>"+
                        // "<div class='d-flex justify-content-between'><div><h5>"+anuncio.titulo+"</h5></div> <div class='editarAnunciosDocentes'><a href='#' class='text-info' data-toggle='modal' data-target='#myModalEditar'><i class='fas fa-tools'></i></a> <a href='#' class='text-danger' data-toggle='modal' data-target='#myModalEliminar'><i class='far fa-trash-alt'></i></a></div></div>"+
                        "<p>"+anuncio.descripcion+"</p>"+
                        "<div class='d-flex justify-content-between'><div><strong>"+anuncio.fechaAnuncio+"</strong></div><div><a href='"+anuncio.recurso+"'><i class='fas fa-link'></i> Enlace</a></div></div>"+
                    "</div>");
                });
            }
            
            break;
        }
    }
}

function buscarMateria(idMateria){
    for(let i = 0 ; i<listaMateriaDisponibles.length ; i++){
        let elemento = listaMateriaDisponibles[i];
        if(elemento.idMateria = idMateria){
            return elemento.idDocente; 
        }
    }
    return 0;
}

function ordenarFechaAsc(){
    myAnuncios.sort(function (a,b){
        return new Date(b.fechaAnuncio) - new Date(a.fechaAnuncio);
    });
    listarAnuncios(idMateria);
}

function ordenarFechaDesc(){
    myAnuncios.sort(function (a,b){
        return new Date(a.fechaAnuncio) - new Date(b.fechaAnuncio);
    });
    listarAnuncios(idMateria);
}

function ordenarNombreAsc(){
    myAnuncios.sort(function (a,b){
        return b.titulo - a.titulo;
    });
    listarAnuncios(idMateria);
}

function ordenarNombreDesc(){
    myAnuncios.sort(function (a,b){
        return a.titulo - b.titulo;
    });
    listarAnuncios(idMateria);
}


// OBTENER MATERIA ACTUAL
function obtenerMateriaLocalStrage(){
    materiaActual = JSON.parse(localStorage.getItem('materiaActual'));
    console.log(materiaActual);
    if(materiaActual == null){
        console.log("Se completa");
        $("main").empty();
        $("main").append("<h1 class='text-center text-danger p-5'>No se ha secionado ninguna materia!!!<h1>");
        $("main").append("<h1 class='text-center text-primary p-5'><a href='home.html'><u>>>Selecionar materia<<</u></a><h1>");
    }else{
        $("#nomMateriaAct").html("("+materiaActual.nombreMateria+")");
        let idDocente = buscarMateria(materiaActual.idMateria);
        if(idDocente != usuario.idEstudiante){
            $("#modalCrearAviso").addClass('d-none');
            esDocente = false;
        }else{
            $("#modalCrearAviso").removeClass('d-none');
            esDocente = false;
        }
    }
}