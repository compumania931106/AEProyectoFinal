/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var estado;
var username;

$(function () {
    if (estado === false) {
        $("#navMenu").append('<ul class="nav navbar-nav navbar-right">    <li><a href="#"><i class="glyphicon glyphicon-shopping-cart"></i></a></li>      <li><a href="#">Registrar</a></li>      <li><a href="#">Ingresar</a></li></ul>');
    } else {
        $("#navMenu").append('<ul class="nav navbar-nav navbar-right"><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + username + '<spanclass="caret"></span></a><ul class="dropdown-menu"><li><a href="#">Mi cuenta</a></li><li><a href="#">Mis pedidos</a></li><li><a href="#">Centro de Mensajes</a></li><li class="divider"></li><li><a href="#">Cerrar Sessión</a></li></ul></li></ul>');
    }

    $.ajax({
        url: "GetProducts",
        type: 'GET',
        dataType: 'json'
    }).done(function (json) {
        if (json.code === 200) {
            $.each($.parseJSON(json.msg), function (i, row) {
                console.log(row.productname);
                $('#divCatalog').append("<div class='col-sm-4 col-lg-4 col-md-4'><div class='thumbnail'><img src='"+ row.image +"' alt=''><div class='caption'><h4 class='pull-right'>$ " + row.salepricemay + " " + row.currency + "</h4><p>" + row.productid + "</p><h4><a href='#'>" + row.productname + "</a></h4><button id=btnAdd class='btn btn-primary btn-lg pull-right' onClick = 'addProduct()'><i class='glyphicon glyphicon glyphicon-shopping-cart'></i></button></div><div class='ratings'><p class='pull-right'>15 reviews</p><p><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span></p></div></div></div>");
            });
        } else {
            console.log("Error");
        }
    }).fail(function () {

    });


});


$.ajax({
    url: "CheckSession",
    async: false
}).done(function (json) {
    if (json.code !== 200) {
        estado = false;
    } else {
        estado = true;
        username = json.detail;
    }
}).fail(function () {

});
