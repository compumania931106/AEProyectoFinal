$.ajax({
    url: "CheckSession",
    async: false
}).done(function (json) {
    if (json.code === 200) {
        var url = "index.html";
        $(location).attr('href', url);
    }
}).fail(function () {

});

$(function () {
    //$('#tbRoles').dataTable().api().ajax.reload();
    $('#frmLogin').validate({
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
            }
        },
        messages: {
            username: {
                minlength: "Introduzca al menos tres caracteres",
                maxlength: "Introdusca menos de 20 caracteres",
                required: "Capture su nombre de usuario"
            },
            password: {
                minlength: "Introduzca al menos tres caracteres",
                maxlength: "Introdusca menos de 20 caracteres",
                required: "Capture su contraseña"
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
            login();
            return false;
        }
    });

    function login() {
        $.ajax({
            url: "GetUser",
            type: "get",
            data: {username: $('#username').val(),
                password: $('#password').val()}
        }).done(
                function (data) {
                    if (data.code === 200) {
                        var datos = data.detail;
                        var res = datos.split(":");

                        var username = res.shift();
                        var apikey = res.shift();
                        var roleid = res.shift();

                        $.ajax({
                            url: "NewSession",
                            type: "get",
                            data: {username: username,
                                apikey: apikey,
                                roleid: roleid}
                        }).done(function (json) {
                            if (json.code === 200) {
                                if (roleid === "3") {
                                    var url = "index.html";
                                    $(location).attr('href', url);
                                }else{
                                    var url = "cpanel.html";
                                    $(location).attr('href', url);
                                }


                            } else {

                            }
                        }).fail(function () {

                        });


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

});
