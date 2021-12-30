$(document).ready(function () {
    var negro;
    obtenerColor();
    $("#elemTema").click(function (e) { 
        e.preventDefault();
        console.log("Se ha presionado el boton!!!");
        cambiarTema();
    });

    // PARA EL TIPO DE USUARIO 
    $("#btnUsuario_1").click(function (e) { 
        e.preventDefault();
        console.log(this.id);
        let usuario = {idEstudiante:1, nombreEstudiante:'Oscar Copa Wilde'};
        localStorage.setItem('usuarioActual',JSON.stringify(usuario));
        // let usuario = {idEstudiante:2, nombreEstudiante:'Carlos Vidal Calle'};
        // localStorage.setItem('usuarioActual',JSON.stringify(usuario));
    });

    $("#btnUsuario_2").click(function (e) { 
        e.preventDefault();
        console.log(this.id);
        let usuario = {idEstudiante:2, nombreEstudiante:'Carlos Vidal Calle'};
        localStorage.setItem('usuarioActual',JSON.stringify(usuario));
    });

    $("#btnUsuario_3").click(function (e) { 
        e.preventDefault();
        console.log(this.id);
        let usuario = null;
        localStorage.setItem('usuarioActual',JSON.stringify(usuario));
    });

    $("#btnUsuario_4").click(function (e) { 
        e.preventDefault();
        console.log(this.id);
        let usuario = null;
        localStorage.setItem('usuarioActual',JSON.stringify(usuario));
    });
    

    $("#miBotonIngreso").click(function (e) { 
        e.preventDefault();
        console.log("Se presiono el boton para ingresar");
        $("#miBotonIngreso").html("");
        $("#miBotonIngreso").append('<span class="spinner-border spinner-border-sm"></span> Espere..');
        cargarMaterias();
        // cargarUsuario();
        let usuario = localStorage.getItem('usuarioActual');
        console.log(usuario);
        setTimeout(function () {
            if(usuario == 'null'){
                $('#myModal').modal('hide');
                $("#miBotonIngreso").html("Si");
                Swal.fire('Problema',"Se ha generado un problema de autentificacion por favol selecione otra plataforma",'error');
            }else{
                window.location.href = "./home.html";
            }
            // console.log(JSON.parse(localStorage.getItem('usuarioActual')));
        }, 2000);
    });

    function cambiarTema(){
        if(negro){
            negro = !negro;
            $('nav').removeClass('bg-info');
            $('nav').removeClass('navbar-light');

            $('main div button ').addClass("btn-outline-secondary");
            $('main div button ').removeClass("btn-outline-dark");

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

            $('main div button ').removeClass("btn-outline-secondary");
            $('main div button ').addClass("btn-outline-dark");

            //agregar
            $('nav').addClass('bg-info');
            $('nav').addClass('navbar-light');
            localStorage.setItem('negro',negro);
        }
        

    }
});
function obtenerColor(){
    negro = localStorage.getItem('negro');
    // console.log(negro);
    if(negro === null){
        negro = true;
        localStorage.setItem('negro',true);
    }
}
function cargarMaterias(){
    // let fecha = new Date();
    // let fechaActual = fecha.getFullYear()+"-"+(fecha.getMonth() + 1 )+"-"+fecha.getDate();
    let anuncio1 = {titulo: "Primer anuncio", descripcion: "Descripcion de mi primer anuncio en esta materia",fechaAnuncio: '2021-11-10 21:53:09', recurso: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Festaticos.muyinteresante.es%2Fmedia%2Fcache%2F1140x_thumb%2Fuploads%2Fimages%2Fgallery%2F594a1ced5bafe85dfd3c9869%2Fgato-romano_0.jpg&imgrefurl=https%3A%2F%2Fwww.muyinteresante.es%2Fmascotas%2Ffotos%2Fgatos-curiosidades-sobre-mininos&tbnid=9v2kW2zHeAhHaM&vet=12ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ..i&docid=7Rs26QrkaXW5YM&w=1140&h=855&q=gatos&ved=2ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ'};
    let anuncio2 = {titulo: "Segundo anuncio", descripcion: "Descripcion de mi segundo anuncio en esta materia",fechaAnuncio: '2021-11-11 21:43:10', recurso: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Festaticos.muyinteresante.es%2Fmedia%2Fcache%2F1140x_thumb%2Fuploads%2Fimages%2Fgallery%2F594a1ced5bafe85dfd3c9869%2Fgato-romano_0.jpg&imgrefurl=https%3A%2F%2Fwww.muyinteresante.es%2Fmascotas%2Ffotos%2Fgatos-curiosidades-sobre-mininos&tbnid=9v2kW2zHeAhHaM&vet=12ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ..i&docid=7Rs26QrkaXW5YM&w=1140&h=855&q=gatos&ved=2ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ'};
    let anuncio3 = {titulo: "Tercer anuncio", descripcion: "Descripcion de mi anuncio en esta materia",fechaAnuncio: '2021-11-21 12:53:10', recurso: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Festaticos.muyinteresante.es%2Fmedia%2Fcache%2F1140x_thumb%2Fuploads%2Fimages%2Fgallery%2F594a1ced5bafe85dfd3c9869%2Fgato-romano_0.jpg&imgrefurl=https%3A%2F%2Fwww.muyinteresante.es%2Fmascotas%2Ffotos%2Fgatos-curiosidades-sobre-mininos&tbnid=9v2kW2zHeAhHaM&vet=12ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ..i&docid=7Rs26QrkaXW5YM&w=1140&h=855&q=gatos&ved=2ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ'};
    let anuncio4 = {titulo: "Cuarto anuncio", descripcion: "Descripcion de mi anuncio en esta materia",fechaAnuncio: '2021-11-22 14:53:15', recurso: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Festaticos.muyinteresante.es%2Fmedia%2Fcache%2F1140x_thumb%2Fuploads%2Fimages%2Fgallery%2F594a1ced5bafe85dfd3c9869%2Fgato-romano_0.jpg&imgrefurl=https%3A%2F%2Fwww.muyinteresante.es%2Fmascotas%2Ffotos%2Fgatos-curiosidades-sobre-mininos&tbnid=9v2kW2zHeAhHaM&vet=12ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ..i&docid=7Rs26QrkaXW5YM&w=1140&h=855&q=gatos&ved=2ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ'};
    let anuncio5 = {titulo: "Quinto anuncio", descripcion: "Descripcion de mi anuncio en esta materia",fechaAnuncio: '2021-11-30 09:53:34', recurso: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Festaticos.muyinteresante.es%2Fmedia%2Fcache%2F1140x_thumb%2Fuploads%2Fimages%2Fgallery%2F594a1ced5bafe85dfd3c9869%2Fgato-romano_0.jpg&imgrefurl=https%3A%2F%2Fwww.muyinteresante.es%2Fmascotas%2Ffotos%2Fgatos-curiosidades-sobre-mininos&tbnid=9v2kW2zHeAhHaM&vet=12ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ..i&docid=7Rs26QrkaXW5YM&w=1140&h=855&q=gatos&ved=2ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ'};
    let anuncio6 = {titulo: "Sexto anuncio", descripcion: "Descripcion de mi anuncio en esta materia",fechaAnuncio: '2021-11-31 15:53:10', recurso: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Festaticos.muyinteresante.es%2Fmedia%2Fcache%2F1140x_thumb%2Fuploads%2Fimages%2Fgallery%2F594a1ced5bafe85dfd3c9869%2Fgato-romano_0.jpg&imgrefurl=https%3A%2F%2Fwww.muyinteresante.es%2Fmascotas%2Ffotos%2Fgatos-curiosidades-sobre-mininos&tbnid=9v2kW2zHeAhHaM&vet=12ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ..i&docid=7Rs26QrkaXW5YM&w=1140&h=855&q=gatos&ved=2ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ'};
    let anuncio7 = {titulo: "Setimo anuncio", descripcion: "Descripcion de mi anuncio en esta materia",fechaAnuncio: '2021-12-11 21:21:10', recurso: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Festaticos.muyinteresante.es%2Fmedia%2Fcache%2F1140x_thumb%2Fuploads%2Fimages%2Fgallery%2F594a1ced5bafe85dfd3c9869%2Fgato-romano_0.jpg&imgrefurl=https%3A%2F%2Fwww.muyinteresante.es%2Fmascotas%2Ffotos%2Fgatos-curiosidades-sobre-mininos&tbnid=9v2kW2zHeAhHaM&vet=12ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ..i&docid=7Rs26QrkaXW5YM&w=1140&h=855&q=gatos&ved=2ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ'};
    let anuncio8 = {titulo: "Octavo anuncio", descripcion: "Descripcion de mi anuncio en esta materia",fechaAnuncio: '2021-12-23 21:01:01', recurso: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Festaticos.muyinteresante.es%2Fmedia%2Fcache%2F1140x_thumb%2Fuploads%2Fimages%2Fgallery%2F594a1ced5bafe85dfd3c9869%2Fgato-romano_0.jpg&imgrefurl=https%3A%2F%2Fwww.muyinteresante.es%2Fmascotas%2Ffotos%2Fgatos-curiosidades-sobre-mininos&tbnid=9v2kW2zHeAhHaM&vet=12ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ..i&docid=7Rs26QrkaXW5YM&w=1140&h=855&q=gatos&ved=2ahUKEwisgOuxk4P1AhVmuJUCHfRIAjoQMygDegUIARDOAQ'};
    let anuncios = new Array();
    anuncios.push(anuncio8);
    anuncios.push(anuncio7);
    anuncios.push(anuncio6);
    anuncios.push(anuncio5);
    anuncios.push(anuncio4);
    anuncios.push(anuncio3);
    anuncios.push(anuncio2);
    anuncios.push(anuncio1);
    // CREACION DE TAREAS
    let tarea1 = {idTarea: 8, tituloTarea: 'Primera tarea', descrpcionTarea: 'Primera descripcion de la tarea', fechaTarea: '2021-11-31 15:53:10',enlaceTarea: './src/ihc_tarea.pdf',puntos: 10 ,fechaExpTarea: '2021-12-30 18:00:00'};
    let tarea2 = {idTarea: 7, tituloTarea: 'Primera tarea', descrpcionTarea: 'Primera descripcion de la tarea', fechaTarea: '2021-11-31 15:53:10',enlaceTarea: './src/ihc_tarea.pdf',puntos: 10 ,fechaExpTarea: '2021-12-30 18:00:00'};
    let tarea3 = {idTarea: 6, tituloTarea: 'Primera tarea', descrpcionTarea: 'Primera descripcion de la tarea', fechaTarea: '2021-11-31 15:53:10',enlaceTarea: './src/ihc_tarea.pdf',puntos: 10 ,fechaExpTarea: '2021-12-30 18:00:00'};
    let tarea4 = {idTarea: 5, tituloTarea: 'Primera tarea', descrpcionTarea: 'Primera descripcion de la tarea', fechaTarea: '2021-11-31 15:53:10',enlaceTarea: './src/ihc_tarea.pdf',puntos: 10 ,fechaExpTarea: '2021-12-30 18:00:00'};
    let tarea5 = {idTarea: 4, tituloTarea: 'Primera tarea', descrpcionTarea: 'Primera descripcion de la tarea', fechaTarea: '2021-11-31 15:53:10',enlaceTarea: './src/ihc_tarea.pdf',puntos: 10 ,fechaExpTarea: '2021-12-30 18:00:00'};
    let tarea6 = {idTarea: 3, tituloTarea: 'Primera tarea', descrpcionTarea: 'Primera descripcion de la tarea', fechaTarea: '2021-11-31 15:53:10',enlaceTarea: './src/ihc_tarea.pdf',puntos: 10 ,fechaExpTarea: '2021-12-30 18:00:00'};
    let tarea7 = {idTarea: 2, tituloTarea: 'Primera tarea', descrpcionTarea: 'Primera descripcion de la tarea', fechaTarea: '2021-11-31 15:53:10',enlaceTarea: './src/ihc_tarea.pdf',puntos: 10 ,fechaExpTarea: '2021-12-30 18:00:00'};
    let tarea8 = {idTarea: 1, tituloTarea: 'Primera tarea', descrpcionTarea: 'Primera descripcion de la tarea', fechaTarea: '2021-11-31 15:53:10',enlaceTarea: './src/ihc_tarea.pdf',puntos: 10 ,fechaExpTarea: '2021-12-30 18:00:00'};
    let arrayTareas = new Array();
    arrayTareas.push(tarea1);
    arrayTareas.push(tarea2);
    arrayTareas.push(tarea3);
    arrayTareas.push(tarea4);
    arrayTareas.push(tarea5);
    arrayTareas.push(tarea6);
    arrayTareas.push(tarea7);
    arrayTareas.push(tarea8);

    let materia1 = {idMateria: 1, idDocente: 11,  nombreMateria:'Calculo I',docente:'Juan Miguel lopez',fecha: '2021-12-26', inscritos: [1], anuncios, arrayTareas};
    let materia2 = {idMateria: 2, idDocente: 12,  nombreMateria:'Algrebra I',docente:'Carlos Montaño Mendez',fecha: '2021-12-25', inscritos: [1], anuncios, arrayTareas};
    let materia3 = {idMateria: 3, idDocente: 3,  nombreMateria:'Ingles I',docente:'Liliana Antezana Perez',fecha: '2021-12-21', inscritos: [1], anuncios, arrayTareas};
    let materia4 = {idMateria: 4, idDocente: 4,  nombreMateria:'Introduccion a la programacion',docente:'Luis Vargas Rodriguez',fecha: '2021-12-22', inscritos: [1], anuncios, arrayTareas};
    let materia5 = {idMateria: 5, idDocente: 5,  nombreMateria:'Fisica',docente:'Victor Castro Sucre',fecha: '2021-12-21', inscritos: [1], anuncios, arrayTareas};
    let materia6 = {idMateria: 6, idDocente: 6,  nombreMateria:'Calculo II',docente:'Miguel Nina Mamani',fecha: '2021-12-26', inscritos: [], anuncios, arrayTareas};
    let materia7 = {idMateria: 7, idDocente: 7,  nombreMateria:'Algrebra II',docente:'Ruben Sejas Teran',fecha: '2021-12-24', inscritos: [], anuncios, arrayTareas};
    let materia8 = {idMateria: 8, idDocente: 8,  nombreMateria:'Ingles II',docente:'Gabriela Espinoza Choque',fecha: '2021-12-21', inscritos: [], anuncios, arrayTareas};
    let materia9 = {idMateria: 9, idDocente: 9,  nombreMateria:'Arquitectura de computadoras I',docente:'Isabel Cortez Espejo',fecha: '2021-12-23', inscritos: [], anuncios, arrayTareas};
    let materia10 = {idMateria: 10, idDocente: 10,  nombreMateria:'Programacion',docente:'Carla Navarro Calle',fecha: '2021-12-19', inscritos: [], anuncios, arrayTareas};
    let arregloMaterias = new Array();
    arregloMaterias.push(materia1);
    arregloMaterias.push(materia2);
    arregloMaterias.push(materia3);
    arregloMaterias.push(materia4);
    arregloMaterias.push(materia5);
    arregloMaterias.push(materia6);
    arregloMaterias.push(materia7);
    arregloMaterias.push(materia8);
    arregloMaterias.push(materia9);
    arregloMaterias.push(materia10);
    localStorage.setItem('arregloMateria',JSON.stringify(arregloMaterias));
    localStorage.setItem('numMax',10);
}
function cargarUsuario(){
    let tareasUsuario = new Array();
    let usuario1 = {idEstudiante: 1, nombreEstudiante:'Oscar Copa Wilde', tareasUsuario};
    let usuario2 = {idEstudiante:2, nombreEstudiante:'Carlos Vidal Calle', tareasUsuario};
    let usuario3 = {idEstudiante:3, nombreEstudiante:'Liliana Antezana Perez', tareasUsuario};

    // console.log(usuario);
    localStorage.setItem('usuarioActual',JSON.stringify(usuario1));
    arrayUsuarios = new Array();
    arrayUsuarios.push(usuario1);
    arrayUsuarios.push(usuario2);
    arrayUsuarios.push(usuario3);
    localStorage.setItem('listaUsuarios',JSON.stringify(arrayUsuarios));
}