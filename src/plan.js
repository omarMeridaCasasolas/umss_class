var limitMayorParte = 100;
var cantParte = 1;
$(document).ready(function () {
    // $('[data-toggle="popover"]').popover();   
    $('[data-toggle="popover"]').popover({
        html: true,
        trigger: 'hover',
        content: function () {
        //   return '<img src="./src/PrimerSMS.jpg"/>';
            return "<div class='row'><div class='col-9'>Parte 1</div><div class='col-3'>50</div>  <div class='col-9'>->Examen 1</div><div class='col-3'>20</div><div class='col-9'>->Exposicion 2</div><div class='col-3'>30</div></div>"+
            "<div class='row'><div class='col-9'>Parte 2</div><div class='col-3'>50</div> <div class='col-9'>->Examen 2</div><div class='col-3'>20</div><div class='col-9'>->Exposicion 2</div><div class='col-3'>10</div><div class='col-9'>->Inverticacion</div><div class='col-3'>20</div></div>"+
            "<div class='row'><div class='col-9'><strong>Total</strong></div><div class='col-3'><strong>100</strong></div></div>";
        }
    });

    $("#addParte").click(function (e) { 
        e.preventDefault();
        // $("#cuerpoPlan").append("<h5></h5>");
    });

    $("main").on("click", "a.btnActividad", function () {
        console.log(this.id);
        let idFormat = this.id;
        let myArray = idFormat.split('_');
        $("#idCuerpoActividad").html(myArray[1]);
        // $("#cuerpoParte_"+myArray[1]).append(content);
    });

    $("#btnCrearParte").click(function (e) { 
        e.preventDefault();
        $('#myModal').modal('hide');
        $("#cuerpoPlan").append("<div class='row' id='cuerpoParte_"+cantParte+"'><div class='col-8'><h4>"+$("#tituloParte").val()+"</h4></div>"+
        "<div class='col-4'><h4>"+$("#notaParte").val()+" <button type='button' class='btn btn-info btn-sm'><i class='fas fa-edit'></i></button> <button type='button' class='btn btn-danger btn-sm'><i class='far fa-trash-alt'></i></button></h4></div></div>"+
        "<h5><a href='#' data-toggle='modal' class='btnActividad' data-target='#myModal2' id='idParte_"+cantParte+"'>+ Agregar Actividad</a></h5><hr>");
        // "<button type='button' class='btnActividad'>Agregar Actividad</button><hr>");
        cantParte++;
    });


    $("#btnCrearActividad").click(function (e) { 
        e.preventDefault();
        $('#myModal2').modal('hide');
        $("#cuerpoParte_"+$("#idCuerpoActividad").html()).append("<div class='col-8 my-1'>-->"+$("#tituloActividad").val()+"</div><div class='col-4 my-1'>"+$("#notaActividad").val()+" <button type='button' class='btn btn-info btn-sm'><i class='fas fa-edit'></i></button> <button type='button' class='btn btn-danger btn-sm'><i class='far fa-trash-alt'></i></button></div>");
    });

    $("main .btnActividad").click(function (e) { 
        e.preventDefault();
        console.log(this.id);
    });
});