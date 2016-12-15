/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var estado;
var username;

$(function () {
    if (estado === false) {
        $("#navMenu").append('<ul class="nav navbar-nav navbar-right">    <li><a href="#"><i class="glyphicon glyphicon-shopping-cart"></i></a></li>      <li><a href="javascript:showNewUser();">Registrar</a></li>      <li><a href="login.html">Ingresar</a></li></ul>');
    } else {
        $("#navMenu").append('<ul class="nav navbar-nav navbar-right"><li><a href="#"><i class="glyphicon glyphicon-shopping-cart"></i></a></li><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + username + '<spanclass="caret"></span></a><ul class="dropdown-menu"><li><a href="#">Mi cuenta</a></li><li><a href="#">Mis pedidos</a></li><li><a href="#">Centro de Mensajes</a></li><li class="divider"></li><li><a href="javascript:closeSession();">Cerrar Sessión</a></li></ul></li></ul>');
    }

    $.ajax({
        url: "GetProducts",
        type: 'GET',
        dataType: 'json'
    }).done(function (json) {
        if (json.code === 200) {
            $.each($.parseJSON(json.msg), function (i, row) {
                console.log(row.productname);
                $('#divCatalog').append("<div class='col-sm-4 col-lg-4 col-md-4'><div class='thumbnail'><img src='" + row.image + "' alt=''><div class='caption'><h4 class='pull-right'>$ " + row.salepricemay + " " + row.currency + "</h4><p>" + row.productid + "</p><h4><a href='#'>" + row.productname + "</a></h4><button id=btnAdd class='btn btn-primary btn-lg pull-right' onClick = 'addProduct()'><i class='glyphicon glyphicon glyphicon-shopping-cart'></i></button></div><div class='ratings'><p class='pull-right'>15 reviews</p><p><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span></p></div></div></div>");
            });
        } else {
            console.log("Error");
        }
    }).fail(function () {

    });

    $('#frmNewUser').validate({
        rules: {
            username: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            password: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            street: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            streetnumber: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            neigborhood: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            zipcode: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            city: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            region: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            state: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            country: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            phone: {
                minlength: 3,
                maxlength: 20,
                number: true,
                required: true
            },
            cellphone: {
                minlength: 3,
                maxlength: 20,
                number: true,
                required: true
            },
            email: {
                email: true,
                required: true
            }
        },
        messages: {
            username: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "Ingrese un nombre de usuario"
            },
            password: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "Ingrese una contraseña"
            },
            street: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "Ingrese un nombre de calle"
            },
            streetnumber: {
                minlength: "Minimo 1 caracteres",
                maxlength: "Maximo 10 caracteres",
                required: "Ingrese el numero de la casa"
            },
            neigborhood: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "Ingrese la colonia"
            },
            zipcode: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "El CP es requerido"
            },
            city: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "Ingrese la ciudad"
            },
            region: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "Ingrese la region"
            },
            state: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "Ingrese el estado"
            },
            country: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "Ingrese el pais"
            },
            phone: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                number: "Solo numeros",
                required: "Ingrese un numero telefonico"
            },
            cellphone: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 20 caracteres",
                number: "Solo numeros",
                required: "Ingrese un numero de celular"
            },
            email: {
                email: "Ingrese un correo valido",
                required: "Ingrese un correo electronico"
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            newUser();
            return false;
        }
    });

    $("#btnAgregar").on('click', function () {
        $("#frmNewUser").submit();
    });
});

function newUser() {
    $.ajax({
        url: "NewUser",
        type: "post",
        data: {username: $('#username').val(),
            password: $('#password').val(),
            street: $('#street').val(),
            streetnumber: $('#streetnumber').val(),
            neigborhood: $('#neigborhood').val(),
            zipcode: $('#zipcode').val(),
            city: $('#city').val(),
            region: $('#region').val(),
            state: $('#state').val(),
            country: $('#country').val(),
            phone: $('#phone').val(),
            cellphone: $('#cellphone').val(),
            email: $('#email').val(),
            gender: $('#gender').val()
        }
    }).done(
            function (data) {
                if (data.code === 200) {
                    swal({
                        title: "Genial!",
                        text: "Ahora eres parte de nuestro gran proyecto! Ingresa a nuestro sistema",
                        type: "success",
                        confirmButtonColor: "#01DF01",
                        confirmButtonText: "Ingresar",
                        closeOnConfirm: false
                    },
                            function (isConfirm) {
                                if (isConfirm) {
                                    var url = "login.html";
                                    $(location).attr('href', url);
                                }
                            }
                    );
                } else {
                    $.growl.error({message: data.msg});
                }

            }
    ).fail(
            function () {
                $.growl.error({message: "No hay mensaje que mostrar"});
            }
    );
}

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



function showNewUser() {
    $("#modalNewUser").modal("show");
}

function closeSession() {
    $.ajax({
        url: "CloseSession"
    }).done(function (json) {
        if (json.code === 200) {
            $("#navMenu").empty();
            $("#navMenu").append('<ul class="nav navbar-nav navbar-right">    <li><a href="#"><i class="glyphicon glyphicon-shopping-cart"></i></a></li>      <li><a href="javascript:showNewUser();">Registrar</a></li>      <li><a href="login.html">Ingresar</a></li></ul>');
        } else {

        }
    }).fail(function () {

    });
}