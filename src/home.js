var estudiante, listaMateriaDisponibles,negro;
var numMax = 40;
$(document).ready(function () {
    // PARA AJUSTAR LA CONFIGURACION DE LA PANTALLA
    $( window ).bind("resize", function(){
        let tam = $( window ).width();
        if(tam <= 890){
            $("#collapsibleNavbar").removeClass("d-flex");
            $("#collapsibleNavbar").removeClass("justify-content-between");
        }else{
            $("#collapsibleNavbar").addClass("d-flex");
            $("#collapsibleNavbar").addClass("justify-content-between");
        }
    });
    
    recargarUsuario();
    obtenerColor();

    // PARA CONFIRMAR MATERIA DE INGRESO
    $(".confirmarMateria").click(function (e) { 
        e.preventDefault();
        console.log(this.id);
        let cad = this.id.split("_");
        let idMateriaActual = cad[1];
        console.log(cad[1]);
        for (let index = 0; index < listaMateriaDisponibles.length; index++) {
            let element = listaMateriaDisponibles[index];
            if(element.idMateria == idMateriaActual){
                console.log(element);
                localStorage.setItem('materiaActual',JSON.stringify(element));
                // localStorage.setItem('arregloMateria',JSON.stringify(arregloMaterias));
                window.location.href = "./avisos.html";
                break;
            }
        }
    });

    // MODAL PARA ASIGNAR DATOS A LA VENTANA
    $("#modalCrearMateria").click(function (e) { 
        e.preventDefault();
        $("#responsableMateria").val(estudiante.nombreEstudiante);
        let fecha = new Date();
        let fechaActual = fecha.getFullYear()+"-"+(fecha.getMonth() + 1 )+"-"+fecha.getDate();
        $("#fechaMateria").val(fechaActual);
    });

    // PARA CREAR UNA MATERIA 
    $("#formCrearMateria").submit(function (e) { 
        e.preventDefault();
        $('#myModal').modal('hide');
        let fecha = new Date();
        let fechaActual = fecha.getFullYear()+"-"+(fecha.getMonth() + 1 )+"-"+fecha.getDate();
        let tareaPrueba = {idTarea: 9, tituloTarea: 'Primera tarea', descrpcionTarea: 'Primera descripcion de la tarea', fechaTarea: '2021-11-31 15:53:10',enlaceTarea: './src/ihc_tarea.pdf'};
        let arrayTareas = new Array();
        arrayTareas.push(tareaPrueba);
        listaMateriaDisponibles.push({idMateria: numMax++, idDocente: estudiante.idEstudiante , nombreMateria:$("#nombreMateria").val(),docente:estudiante.nombreEstudiante,fecha: fechaActual, inscritos: [],arrayTareas});
        localStorage.setItem('arregloMateria',JSON.stringify(listaMateriaDisponibles));
        console.log(listaMateriaDisponibles);
        mostrarMateriasDocente(estudiante.idEstudiante);
        numMax++;
    });


    $("#elemTema").click(function (e) { 
        e.preventDefault();
        console.log("Se ha presionado el boton!!!");
        cambiarTema();
    });

    $("#nombreUsuario").html(estudiante.nombreEstudiante);

    $("#formUnirmeMateria").submit(function (e) { 
        e.preventDefault();
        $("#cabezeraUnirse").empty();
        let idMateriaUnirse = $("#unirmeMateriaID").val();
        let resp = buscarMateria(idMateriaUnirse);
        console.log(resp);
        if(resp){
            cargarListaMaterias(estudiante.idEstudiante);
            $("#formUnirmeMateria")[0].reset();
            $('#myModal2').modal('hide');
            // agregarTareaEstudiante(idMateriaUnirse);
            Swal.fire('Felicidades!!',"Se incorporado a una nueva materia",'success');
        }else{
            $("#cabezeraUnirse").append('<div class="alert alert-danger alert-dismissible">'+
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
            '<strong>Problema!</strong> No Existe esa clase.'+
          '</div>');
        }
    });

    $("#btnSalir").click(function (e) { 
        e.preventDefault();
        console.log("Se presiono el boton para salir");
        setTimeout(function () {
            window.location.href = "./index.html";
        }, 500);
    });


});

function obtenerColor(){
    negro = localStorage.getItem('negro');
    // console.log(negro);
    if(negro === null){
        negro = true;
        localStorage.setItem('negro',true);
    }else{
        cambiarTema();
    }
}
function cambiarTema(){
    if(negro){
        negro = !negro;
        $('nav').removeClass('bg-info');
        $('nav').removeClass('navbar-light');

        // $('main div button ').addClass("btn-outline-secondary");
        // $('main div button ').removeClass("btn-outline-dark");

        $('body').addClass("bg-secondary");
        $('nav').addClass("bg-dark");
        $('nav').addClass("navbar-dark");
        $('main').addClass("bg-dark");
        $('main').addClass("text-white");
        $("#lineaDecorado").css("background-color","pink");
        localStorage.setItem('negro',negro);
    }else{
        negro = !negro;
        $("#lineaDecorado").css("background-color","blue");
        $('body').removeClass("bg-secondary");
        $('nav').removeClass("bg-dark");
        $('nav').removeClass("navbar-dark");
        $('main').removeClass("bg-dark");
        $('main').removeClass("text-white");

        // $('main div button ').removeClass("btn-outline-secondary");
        // $('main div button ').addClass("btn-outline-dark");

        //agregar
        $('nav').addClass('bg-info');
        $('nav').addClass('navbar-light');
        localStorage.setItem('negro',negro);
    }
}

function recargarUsuario(){
    estudiante = JSON.parse(localStorage.getItem('usuarioActual'));
    // console.log(JSON.parse(localStorage.getItem('usuarioActual')));
    listaMateriaDisponibles = JSON.parse(localStorage.getItem('arregloMateria'));
    cargarListaMaterias(estudiante.idEstudiante);
    mostrarMateriasDocente(estudiante.idEstudiante);
}


function cargarListaMaterias(idEstudiante){
    // console.log(listaMateriaDisponibles);
    $("#cuerpoMateria").empty();
    listaMateriaDisponibles.forEach(arreglo => {
        arreglo.inscritos.forEach(element => {
            if(element == idEstudiante){
                $("#cuerpoMateria").append("<div class='col-xl-3 col-lg-4 col-md-6 bg-dark text-dark text-center p-1'>"+
                    "<div class='col-12 bg-white py-1 rounded' style='min-height: 210px;'>"+
                        "<p class='m-1'>Materia: "+arreglo.nombreMateria+" <a href='#' class='text-danger' data-toggle='modal' data-target='#myModalAbandonar'><i class='fas fa-door-open'></i></a></p>"
                        +"<p class='m-1'>Docente: "+arreglo.docente+"</p>"
                        +"<strong class='m-1'>"+arreglo.fecha+"</strong><hr>"
                        // +"<a class='btn btn-primary confirmarMateria' href='avisos.html?id="+arreglo.idMateria+"'>Ingresar</a>"
                        +"<button type='button' class='confirmarMateria btn btn-primary' id='myIDMat_"+arreglo.idMateria+"'>Ingresar</button>"
                    +"</div>"
                +"</div>");
            }
        });
    });
}

function buscarMateria(id){
    let resp = false;
    listaMateriaDisponibles = JSON.parse(localStorage.getItem('arregloMateria'));
    let i = 0;
    // console.log(listaMateriaDisponibles);
    while(i<listaMateriaDisponibles.length){
        let element  = listaMateriaDisponibles[i];
        if(element.idMateria == id){
            element.inscritos.push(estudiante.idEstudiante);
            resp = true;
        }
        i++;
    }
    localStorage.setItem('arregloMateria',JSON.stringify(listaMateriaDisponibles));
    console.log(JSON.parse(localStorage.getItem('arregloMateria')));
    return resp;
}

// MOSTRAR MATERIAS COMO DOCENTE
function mostrarMateriasDocente(id){
    console.log(listaMateriaDisponibles);
    $("#cuerpoMatDocente").empty();
    listaMateriaDisponibles.forEach(element => {
        // console.log(id+" --- "+element.idDocente);
        if(id == element.idDocente){
            $("#cuerpoMatDocente").append("<div class='col-xl-3 col-lg-4 col-md-6 bg-dark text-dark text-center p-1'>"+
                "<div class='col-12 bg-white py-1 rounded' style='min-height: 210px;'>"+
                    "<p class='m-1'>Materia: "+element.nombreMateria+" <a href='#' class='text-info' data-toggle='modal' data-target='#myModalEditar' ><i class='fas fa-tools'></i></a> <a href='#' class='text-danger' data-toggle='modal' data-target='#myModalEliminar'><i class='far fa-trash-alt'></i></a></p>"
                    +"<p class='m-1'>Docente: "+element.docente+"</p>"
                    +"<strong class='m-1'>"+element.fecha+"</strong><hr>"
                    // +"<a class='btn btn-primary confirmarMateria' href='avisos.html?id="+element.idMateria+"'>Ingresar</a>"
                    +"<button type='button' class='confirmarMateria btn btn-primary' id='myIDMat_"+element.idMateria+"'>Ingresar</button>"
                +"</div>"
            +"</div>");
        }
    });
}

function agregarTareaEstudiante(id){
    let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
    for (let index = 0; index < listaMateriaDisponibles.length; index++) {
        let element = listaMateriaDisponibles[index];
        if(element.idMateria == id){
            let arrayEstudiantesTmp = element.inscritos;
            for(let i = 0; i< arrayEstudiantesTmp.length ; i++){
                for(let j = 0; j<listaUsuarios.length; i++){
                    if(arrayEstudiantesTmp.idEstudiante == listaUsuarios.idEstudiante){
                        let arrayTareasTmp = listaUsuarios.tareasUsuario;
                        // arrayTareasTmp.push({idTarea: , });
                    }
                }
            }
        }
    }
}