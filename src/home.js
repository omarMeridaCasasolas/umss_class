var estudiante, listaMateriaDisponibles,negro;
var numMax = localStorage.getItem('numMax');
$(document).ready(function () {
    // $('[data-toggle="popover"]').popover({
    //     html: true,
    //     trigger: 'hover',
    //     content: function () {
    //       return '<img src="./src/PrimerSMS.jpg"/>';
    //     }
    // });
    // $('[data-toggle="popover"]').popover();


    $( window ).bind("resize", function(){
        let tam = $( window ).width();
        // console.log(tam);
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
    $("#elemTema").click(function (e) { 
        e.preventDefault();
        console.log("Se ha presionado el boton!!!");
        cambiarTema();
    });

    $("#nombreUsuario").html(estudiante.nombreEstudiante);

    $("#modalCrearMateria").click(function (e) { 
        e.preventDefault();
        $("#responsableMateria").val(estudiante.nombreEstudiante);
        let fecha = new Date();
        let fechaActual = fecha.getFullYear()+"-"+(fecha.getMonth() + 1 )+"-"+fecha.getDate();
        // console.log(fechaActual);
        $("#fechaMateria").val(fechaActual);
    });

    $("#formCrearMateria").submit(function (e) { 
        e.preventDefault();
        $('#myModal').modal('hide');
        let fecha = new Date();
        let fechaActual = fecha.getFullYear()+"-"+(fecha.getMonth() + 1 )+"-"+fecha.getDate();
        listaMateriaDisponibles.push({idMateria: numMax++,idDocente: estudiante.idEstudiante , nombreMateria:$("#nombreMateria").val(),docente:estudiante.nombreEstudiante,fecha: fechaActual, inscritos: [estudiante.idEstudiante]});
        localStorage.setItem('arregloMateria',JSON.stringify(listaMateriaDisponibles));
        // console.log(listaMateriaDisponibles);
        cargarListaMaterias(estudiante.idEstudiante);
        // $("#cuerpoMateria").append("<div class='col-xl-3 col-lg-4 col-md-6 bg-dark text-dark text-center p-1'>"+
        //     "<div class='col-12 bg-white py-1 rounded' style='min-height: 175px;'>"+
        //         "<p class='m-1'>Materia: "+arreglo.nombreMateria+"</p>"
        //         +"<p class='m-1'>Docente: "+arreglo.docente+"</p>"
        //         +"<strong class='m-1'>"+arreglo.fecha+"</strong><hr>"
        //         +"<button class='btn btn-primary'>Ingresar</button>"
        //         +"</div>"
        //     +"</div>");
    });

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



    $("#modalCrearMateria").click(function (e) { 
        e.preventDefault();
        $("#cabezeraUnirse").empty();
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
    cargarListaMaterias(estudiante.idEstudiante);
}
function cargarListaMaterias(idEstudiante){
    listaMateriaDisponibles = JSON.parse(localStorage.getItem('arregloMateria'));
    console.log(listaMateriaDisponibles);
    $("#cuerpoMateria").empty();
    listaMateriaDisponibles.forEach(arreglo => {
        arreglo.inscritos.forEach(element => {
            if(element == idEstudiante){
                $("#cuerpoMateria").append("<div class='col-xl-3 col-lg-4 col-md-6 bg-dark text-dark text-center p-1'>"+
                    "<div class='col-12 bg-white py-1 rounded' style='min-height: 210px;'>"+
                        "<p class='m-1'>Materia: "+arreglo.nombreMateria+" <a href='#' class='text-info' ><i class='fas fa-tools'></i></a> <a href='#' class='text-danger'><i class='far fa-trash-alt'></i></a></p>"
                        +"<p class='m-1'>Docente: "+arreglo.docente+"</p>"
                        +"<strong class='m-1'>"+arreglo.fecha+"</strong><hr>"
                        // +"<button class='btn btn-primary'>Ingresar</button>"
                        +"<a class='btn btn-primary' target='_blank' href='avisos.html?id="+arreglo.idMateria+"'>Ingresar</a>"
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