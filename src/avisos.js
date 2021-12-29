var estudiante, listaMateriaDisponibles, elementoAnuncio, negro;
var numMax = localStorage.getItem('numMax');
var myAnuncios = new Array();
$(document).ready(function () {
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
    
    listarAnuncios(1);
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
        // console.log(myAnuncios);
        listarAnuncios(1);
    });
});

function listarAnuncios(idMat){
    listaMateriaDisponibles = JSON.parse(localStorage.getItem('arregloMateria'));
    for(let i = 0 ; i<listaMateriaDisponibles.length ; i++){
        let elemento = listaMateriaDisponibles[i];
        if(elemento.idMateria = idMat){
            elementoAnuncio = elemento;
            myAnuncios =  elemento.anuncios;
            let arrayInvertido = elemento.anuncios.reverse();
            // console.log(elemento.anuncios);
            $("#cuerpoAnuncio").empty();
            arrayInvertido.forEach(anuncio => {
                $("#cuerpoAnuncio").append("<div class='p-2 bg-white text-dark border rounded my-2'>"+
                    "<h5>"+anuncio.titulo+"</h5>"+
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