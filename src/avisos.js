var usuario, listaMateriaDisponibles, elementoAnuncio, negro, idMateria, materiaActual;
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
    iniciarUsuario();
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

function iniciarUsuario(){
    listaMateriaDisponibles = JSON.parse(localStorage.getItem('arregloMateria'));
    usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    listarAnuncios(usuario.idEstudiante);
    verificarPermisoDocente();
}


function listarAnuncios(idMat){
    // listaMateriaDisponibles = JSON.parse(localStorage.getItem('arregloMateria'));
    for(let i = 0 ; i<listaMateriaDisponibles.length ; i++){
        let elemento = listaMateriaDisponibles[i];
        if(elemento.idMateria = idMat){
            elementoAnuncio = elemento;
            myAnuncios =  elemento.anuncios;
            $("#cuerpoAnuncio").empty();
            // let arrayInvertido = elemento.anuncios.reverse();
            // arrayInvertido.forEach(anuncio => {
            elemento.anuncios.forEach(anuncio => {
                $("#cuerpoAnuncio").append("<div class='p-2 bg-white text-dark border rounded my-2 subCuerpoAnuncio'>"+
                    // "<h5>"+anuncio.titulo+"</h5>"+
                    "<div class='d-flex justify-content-between'><div><h5>"+anuncio.titulo+"</h5></div> <div class='editarAnunciosDocentes'><a href='#' class='text-info' data-toggle='modal' data-target='#myModalEditar' ><i class='fas fa-tools'></i></a> <a href='#' class='text-danger' data-toggle='modal' data-target='#myModalEliminar'><i class='far fa-trash-alt'></i></a></div></div>"+
                    "<p>"+anuncio.descripcion+"</p>"+
                    "<div class='d-flex justify-content-between'><div><strong>"+anuncio.fechaAnuncio+"</strong></div><div><a href='"+anuncio.recurso+"'><i class='fas fa-link'></i> Enlace</a></div></div>"+
                    // <strong>"+anuncio.fechaAnuncio+"</strong>
                    // "<a href='"+anuncio.recurso+"'><i class='fas fa-link'></i> Enlace</a>"+
                "</div>");
            });
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

function verificarPermisoDocente(){
    let params = new URLSearchParams(location.search);
    idMateria = params.get('id');
    let idDocente = buscarMateria(idMateria);
    if(idDocente != usuario.idEstudiante){
        $("#modalCrearAviso").addClass('d-none');
        $(".editarAnunciosDocentes").addClass('d-none');
    }else{
        $("#modalCrearAviso").removeClass('d-none');
        $(".editarAnunciosDocentes").removeClass('d-none');
    }
    obtenerMateriaLocalStrage();
}

// OBTENER MATERIA ACTuAL
function obtenerMateriaLocalStrage(){
    materiaActual = JSON.parse(localStorage.getItem('materiaActual'));
    console.log(materiaActual);
    $("#nomMateriaAct").html("("+materiaActual.nombreMateria+")");
}

// RECARGAR DATOS DE USUARIO 
// function recargarUsuario(){
//     estudiante = JSON.parse(localStorage.getItem('usuarioActual'));
//     console.log(estudiante);
// }