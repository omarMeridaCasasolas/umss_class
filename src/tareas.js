var usuario, listaMateriaDisponibles, elementoAnuncio, negro, idMateria , materiaActual, arrayTareas;
var myAnuncios = new Array();
var idMaxTarea = 11;
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
    //VALIDAR MATERIA 
    validarMateria();
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
        verificarPermisoDocente();
    });

    $("#formCrearTarea").submit(function (e) { 
        e.preventDefault();
        $('#myModal').modal('hide');
        let tituloTarea = $("#tituloTarea").val();
        let descrpcionTarea = $("#descripcionTarea").val();
        let puntos = $("#valorTarea").val();
        let fechaExpiracion = $("#fechaExpTarea").val();
        let enlaceTarea = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ngenespanol.com%2Fnaturaleza%2Fpericos-selectivos%2F&psig=AOvVaw2IsSAUBPwR7mgBB6mmV0Qc&ust=1640741510050000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCODczMqshfUCFQAAAAAdAAAAABAD'
        let fecha = new Date();
        let fechaTarea = fecha.getFullYear()+"-"+(fecha.getMonth() + 1 )+"-"+fecha.getDate()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
        arrayTareas.push({idTarea: idMaxTarea, tituloTarea, descrpcionTarea, enlaceTarea, fechaTarea, puntos, fechaExpiracion });
        Swal.fire('Exito!!',"Se agregado nuevo tarea",'success');
        listarTareas(arrayTareas);
        agregarTareaEstudiante({idTarea: idMaxTarea, tituloTarea, descrpcionTarea, enlaceTarea, fechaTarea, puntos, fechaExpiracion }, listaMateriaDisponibles.inscritos);
        localStorage.setItem('arregloMateria',JSON.stringify(listaMateriaDisponibles));
        idMaxTarea++;
    });

    // FUNCIONAS GLOBALES
    $("#nombreUsuario").html(usuario.nombreEstudiante);
});

function iniciarVariables(){
    materiaActual = JSON.parse(localStorage.getItem('materiaActual'));
    // console.log(materiaActual);
    arrayTareas = materiaActual.arrayTareas;
    // console.log(arrayTareas);
    usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    listarTareas(arrayTareas);
    verificarPermisoDocente();
    // console.log(usuario);
}


function listarTareas(arrayTareas){
    $("#cuerpoTareas").empty();
    arrayTareas.forEach(element => {
        $("#cuerpoTareas").prepend("<div class='p-2 bg-white text-dark border rounded my-2 subCuerpoAnuncio'>"+
            "<div class='d-flex justify-content-between'><div><h5>"+element.tituloTarea+"</h5></div> <div class='editarAnunciosDocentes'><a href='#' class='text-info' data-toggle='modal' data-target='#myModalEditar' ><i class='fas fa-tools'></i></a> <a href='#' class='text-danger' data-toggle='modal' data-target='#myModalEliminar'><i class='far fa-trash-alt'></i></a></div></div>"+
            "<p>"+element.descrpcionTarea+"</p>"+
            "<div class='d-flex justify-content-between'><div><strong>"+element.fechaTarea+"</strong></div><div><a href='"+element.enlaceTarea+"'><i class='fas fa-link'></i> Enlace</a></div></div>"+
            "<div class='text-center'><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#modalCalicarTarea'>Calificar</button>  <button type='button' class='btn btn-warning'  data-toggle='modal' data-target='#modalVerTarea'>Detalles</button></div>"+
        "</div>");
    });
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

function verificarPermisoDocente(){
    // let params = new URLSearchParams(location.search);
    // idMateria = params.get('id');
    // let idDocente = buscarMateria(idMateria);
    let idDocente = materiaActual.idDocente;
    console.log(idDocente +"--"+usuario.idEstudiante);
    if(idDocente != usuario.idEstudiante){
        $("#modalCrearAviso").addClass('d-none');
        // $(".editarAnunciosDocentes").addClass('d-none');
        dibujarJhonny();
    }else{
        $("#modalCrearAviso").removeClass('d-none');
        $(".editarAnunciosDocentes").removeClass('d-none');

    }
}

function validarMateria(){
    materiaActual = JSON.parse(localStorage.getItem("materiaAtual"));
    console.log(materiaActual);
    if(materiaActual == null){
        console.log("Se completa");
        $("main").empty();
        $("main").append("<h1 class='text-center text-danger p-5'>No se ha secionado ninguna materia!!!<h1>");
        $("main").append("<h1 class='text-center text-primary p-5'><a href='home.html'><u>>>Selecionar materia<<</u></a><h1>");
    }
}

// OBTENER MATERIA ACTIAL
// function obtenerMateriaLocalStrage(){
//     console.log(materiaActual);
//     $("#nomMateriaAct").html("("+materiaActual.nombreMateria+")");
// }

function agregarTareaEstudiante(obj, inscritos){
    let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
    for (let index = 0; index < inscritos.length; index++) {
        let idUsuario = inscritos[index];
        for(let i = 0; i < listaUsuarios.length ; i++){
            let usuarioTmp = listaUsuarios[i];
            if(idUsuario == usuarioTmp.idEstudiante ){
                let arrayTareasUsuario = usuarioTmp.tareasUsuario;
                arrayTareasUsuario.push(obj);
            }
        }
    }
}

function dibujarJhonny(){
    console.log("Paso por aqui");
    $("#cuerpoTareas").empty();
    $("#cuerpoTareas").append('<div class="card p-2 bg-white text-dark border rounded my-2">'+
    '<div class="card-header">'+
        '2021-12-30, 11:47:46 '+
    '</div>'+
        '<div class="card-body">'+
        '<h5 class="card-title">Investigacion de Lenguajes de Programacion</h5>'+
        '<p class="card-text">Se debe realizar una investigacion sobre todos los lenguajes de Programacion Orientados a Objetos. </p>'+
            '<button class="btn btn-primary" data-toggle="modal" data-target="#myModalEntregar" id="modalCrearMateria">'+
                'Entregar'+
            '</button>'+
            '<button class="btn btn-success" data-toggle="modal" data-target="#myModal3" id="modalCrearMateria">'+
                'Ver Calificacion'+
            '</button>'+

        '</div>'+
    '</div>'+
    '<div class="card p-2 bg-white text-dark border rounded my-2">'+
        '<div class="card-header">'+
            '2021-12-29, 10:37:36'+
        '</div>'+
        '<div class="card-body">'+
        '<h5 class="card-title">Practica 1 </h5>'+
        '<p class="card-text">Realizar los ejercios de la pagina 10 del texto de materia</p>'+
        
            '<button class="btn btn-primary" data-toggle="modal" data-target="#myModalEntregar" id="modalCrearMateria">'+
                'Entregar'+
            '</button>'+
            '<button class="btn btn-success" data-toggle="modal" data-target="#myModal3" id="modalCrearMateria">'+
                'Ver Calificacion'+
            '</button>'+
        '</div>'+
    '</div>'+
    '<div class="card p-2 bg-white text-dark border rounded my-2">'+
        '<div class="card-header">'+
            '2021-12-28, 09:27:26 '+
        '</div>'+
        '<div class="card-body">'+
        '<h5 class="card-title">Practica 2</h5>'+
        '<p class="card-text">Resolver los problemas que estan en la seccion 1.3 del texto de la materia. </p>'+
        
            '<button class="btn btn-primary" data-toggle="modal" data-target="#myModalEntregar" id="modalCrearMateria">'+
                'Entregar'+
            '</button>'+
            '<button class="btn btn-success" data-toggle="modal" data-target="#myModal3" id="modalCrearMateria">'+
                'Ver Calificacion'+
            '</button>'+
        '</div>'+
    '</div>');
}
