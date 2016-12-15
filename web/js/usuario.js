
var companiid;
var rolid;

$(function () {



    $.ajax({
        url: 'GetRoles',
        type: 'GET',
        dataType: 'json'
    }).done(function (json) {
        if (json.code === 200)
            $.each($.parseJSON(json.msg), function (i, row) {
                $('<option></option>', {text: row.rolename}).attr('value', row.roleid).appendTo('#cbRoles');
                $('<option></option>', {text: row.rolename}).attr('value', row.roleid).appendTo('#cbEditRoles');
            });
    });

    $.ajax({
        url: 'GetCompanys',
        type: 'GET',
        dataType: 'json'
    }).done(function (json) {
        if (json.code === 200)
            $.each($.parseJSON(json.msg), function (i, row) {
                $('<option></option>', {text: row.companyname}).attr('value', row.companyid).appendTo('#cbCompany');
                $('<option></option>', {text: row.companyname}).attr('value', row.companyid).appendTo('#cbEditCompany');
            });
    });

    $('#frmUser').validate({
        rules: {
            username: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            password: {
                minlength: 3,
                maxlength: 16,
                required: true
            },
            phone: {
                minlength: 10,
                maxlength: 10,
                required: true,
                number: true
            },
            neigborhood: {
                required: true
            },
            zipcode: {
                minlength: 5,
                maxlength: 20,
                required: true
            },
            city: {
                required: true
            },
            country: {
                required: true
            },
            state: {
                required: true
            },
            region: {
                required: true
            },
            street: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            streetnumber: {
                required: true,
                number: true
            },
            photo: {
                required: true
            },
            cellphone: {
                minlength: 10,
                maxlength: 10,
                required: true,
                number: true
            }



        },
        messages: {
            username: {
                minlength: "Minimo tres caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "Capture nombre de usuario"
            },
            password: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 16 caracteres",
                required: "Capture una contraseña"
            },
            phone: {
                minlength: "Minimo 10 caracteres",
                maxlength: "Maximo 10 caracteres",
                required: "Capture numero telefonico",
                number: "Solo numeros"
            },
            neigborhood: {
                required: "Capture una colonia"
            },
            zipcode: {
                minlength: "Minimo 5 caracteres",
                maxlength: "Maximo 10 caracteres",
                required: "Ingrese un CP"
            },
            city: {
                required: "Ingrese una  Ciudad"
            },
            country: {
                required: "Ingrese un pais"
            },
            state: {
                required: "Ingrese un estado"
            },
            region: {
                required: "Ingrese una region"
            },
            street: {
                required: "Ingrese una calle"
            },
            email: {
                required: "Ingrese un email",
                email: "Ingrese un email valido"
            },
            streetnumber: {
                required: "Ingrese un numero de casa",
                number: "Solo numeros"
            },
            photo: {
                required: "Ingrese una fotografia"
            },
            cellphone: {
                minlength: "Minimo 10 digitos",
                maxlength: "Maximo 10 digitos",
                required: "Ingrese un numero de celular",
                number: "Solo numeros"
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

    $('#frmEditUSer').validate({
        rules: {
            username2: {
                minlength: 3,
                maxlength: 20,
                required: true
            },
            password2: {
                minlength: 3,
                maxlength: 16,
                required: false
            },
            phone2: {
                minlength: 10,
                maxlength: 10,
                required: true,
                number: true
            },
            neigborhood2: {
                required: true
            },
            zipcode2: {
                minlength: 5,
                maxlength: 20,
                required: true
            },
            city2: {
                required: true
            },
            coutry2: {
                required: true
            },
            state2: {
                required: true
            },
            region2: {
                required: true
            },
            street2: {
                required: true
            },
            email2: {
                required: true,
                email: true
            },
            streetnumber2: {
                required: true,
                number: true
            },
            photo2: {
                required: true
            },
            cellphone2: {
                minlength: 10,
                maxlength: 10,
                required: true,
                number: true
            }



        },
        messages: {
            username2: {
                minlength: "Minimo tres caracteres",
                maxlength: "Maximo 20 caracteres",
                required: "Capture nombre de usuario"
            },
            password2: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 16 caracteres"
            },
            phone2: {
                minlength: "Minimo 10 caracteres",
                maxlength: "Maximo 10 caracteres",
                required: "Capture numero telefonico",
                number: "Solo numeros"
            },
            neigborhood2: {
                required: "Capture una colonia"
            },
            zipcode2: {
                minlength: "Minimo 5 caracteres",
                maxlength: "Maximo 10 caracteres",
                required: "Ingrese un CP"
            },
            city2: {
                required: "Ingrese una  Ciudad"
            },
            coutry2: {
                required: "Ingrese un pais"
            },
            state2: {
                required: "Ingrese un estado"
            },
            region2: {
                required: "Ingrese una region"
            },
            street2: {
                required: "Ingrese una calle"
            },
            email2: {
                required: "Ingrese un email",
                email: "Ingrese un email valido"
            },
            streetnumber2: {
                required: "Ingrese un numero de casa",
                number: "Solo numeros"
            },
            photo2: {
                required: "Ingrese una fotografia"
            },
            cellphone2: {
                minlength: "Minimo 10 digitos",
                maxlength: "Maximo 10 digitos",
                required: "Ingrese un numero de celular",
                number: "Solo numeros"
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
            updateUser();
            return false;
        }
    });



    $('#tbUsuarios').DataTable({
        language: {
            url: "http://cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json"
        },
        responsive: true,
        ajax: {
            url: "GetUsers",
            dataSrc: function (json) {

                return $.parseJSON(json['msg']);
            }
        },
        columns: [
            {
                data: "userid"
            },
            {
                data: "username"
            },
            {
                data: "password"
            },
            {
                data: "phone"
            },
            {
                data: "neigborhood"
            },
            {
                data: "zipcode"
            },
            {
                data: "city"
            },
            {
                data: "country"
            },
            {
                data: "state"
            },
            {
                data: "region"
            },
            {
                data: "street"
            },
            {
                data: "email"
            },
            {
                data: "streetnumber"
            },
            {
                data: "photo"
            },
            {
                data: "cellphone"
            },
            {
                data: "gender"
            },
            {
                data: function (row) {
                    companiid = row['companyid'];
                    return row['companyid']['companyname'];
                }
            },
            {
                data: function (row) {
                    rolid = row['roleid'];
                    return row['roleid']['rolename'];
                }
            },
            {
                data: function (row) {
                    str = "<div align='center'>";
                    str += "<button id='btnBorrar' class='btn btn-danger btn-xs' onclick='deleteUser(" + row["userid"] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
                    str += "&nbsp;<button id='btnEditar' class = 'btn btn-success btn-xs' onClick = 'showUser(" + row['userid'] + ")'><i class='glyphicon glyphicon-edit'></i></button>";
                    str += "<div>";
                    return str;
                }
            }

        ]


    });

    $("#btnModificar").on('click', function () {
        console.log("Si hicistes click");
        $("#frmEditUSer").submit();
    });

});

function deleteUser(id){
    swal({title: "¿Estás seguro que deseas eliminar?",
        text: "No podrás recuperar la información después de borrarla.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sí, eliminar",
        closeOnConfirm: false},
            function () {
                $.ajax(
                        {
                            url: "DeleteUser",
                            type: "post",
                            data: {userid: id}
                        }
                ).done(
                        function (data) {
                            if (data.code === 200) {
                                //$.growl.notice({title: "Successful", message: data.msg });
                                swal("Eliminado", data.msg, "success");
                                $('#tbUsuarios').dataTable().api().ajax.reload();
                                //$('#rolename').val('');
                            } else {
                                $.growl.error({message: data.msg});
                            }
                        }
                ).fail(
                        function (data) {
                            //$.growl.notice({message: "Algo va mal"});
                            swal({title: "Error", text: "Algo va mal, no se pudo eliminar", type: "error", confirmButtonText: "Cerrar"});
                        }
                );

            }
    );
}

function showUser(userid) {
    $("#modalUser").modal("show");
    $.ajax({
        url: 'GetUserByID',
        type: 'GET',
        data: {userid: userid},
        dataType: 'json'
    }).done(function (json) {
        if (json.code === 200) {
            var code = $.parseJSON(json.msg);
            $('#userid').val(code.userid);
            $('#username2').val(code.username);
            $('#phone2').val(code.phone);
            $('#neigborhood2').val(code.neigborhood);
            $('#zipcode2').val(code.zipcode);
            $('#city2').val(code.city);
            $('#country2').val(code.country);
            $('#state2').val(code.state);
            $('#region2').val(code.region);
            $('#street2').val(code.street);
            $('#email2').val(code.email);
            $('#streetnumber2').val(code.streetnumber);
            $('#photo2').val(code.photo);
            $('#cellphone2').val(code.cellphone);

            if (code.gender == "M") {
                $('#cbEditGender > option[value="M"]').attr('selected', 'selected');
            } else {
                $('#cbEditGender > option[value="F"]').attr('selected', 'selected');
            }




            $('#cbEditRoles > option[value="' + rolid.roleid + '"]').attr('selected', 'selected');
            $('#cbEditCompany > option[value="' + companiid.companyid + '"]').attr('selected', 'selected');



        }
    });
}

function newUser() {
    $.ajax({
        url: "NewUserAdmin",
        type: "POST",
        data: {
            username: $('#username').val(),
            password: $('#password').val(),
            phone: $('#phone').val(),
            neigborhood: $('#neigborhood').val(),
            zipcode: $('#zipcode').val(),
            city: $('#city').val(),
            country: $('#country').val(),
            state: $('#state').val(),
            region: $('#region').val(),
            street: $('#street').val(),
            email: $('#email').val(),
            streetnumber: $('#streetnumber').val(),
            photo: $('#photo').val(),
            cellphone: $('#cellphone').val(),
            com: $('#cbCompany').val(),
            rol: $('#cbRoles').val(),
            gender: $('#cbGender').val()
        }
    }).done(
            function (data) {
                if (data.code === 200) {
                    $.growl.notice({message: data.msg});
                    $('#tbUsuarios').dataTable().api().ajax.reload();
                    $('#password').val('');
                    $('#phone').val('');
                    $('#neigborhood').val('');
                    $('#zipcode').val('');
                    $('#city').val('');
                    $('#coutry').val('');
                    $('#state').val('');
                    $('#region').val('');
                    $('#street').val('');
                    $('#email').val('');
                    $('#streetnumber').val('');
                    $('#cellphone').val('');
                    
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

function updateUser() {
    if ($('#password2').val() === "") {
        console.log("No tiene nada en campo password");

        $.ajax({
            url: 'UpdateWithoutPassword',
            type: 'POST',
            data: {userid: $('#userid').val(),
                username: $('#username2').val(),
                phone: $('#phone2').val(),
                neigborhood: $('#neigborhood2').val(),
                zipcode: $('#zipcode2').val(),
                city: $('#city2').val(),
                coutry: $('#country2').val(),
                state: $('#state2').val(),
                region: $('#region2').val(),
                street: $('#street2').val(),
                email: $('#email2').val(),
                streetnumber: $('#streetnumber2').val(),
                photo: $('#photo2').val(),
                cellphone: $('#cellphone2').val(),
                com: $('#cbEditCompany').val(),
                rol: $('#cbEditRoles').val(),
                gender: $('#cbEditGender').val()


            }

        }).done(
                function (data) {
                    if (data.code === 200) {
                        $("#modalUser").modal("hide");
                        $.growl.notice({message: data.msg});
                        $('#tbUsuarios').dataTable().api().ajax.reload();
                    } else {
                        $.growl.error({message: data.msg});
                    }
                }
        ).fail(
                function () {
                    $.growl.error({message: "No hay mensaje que mostrar"});
                }
        );

    } else {
        console.log("Si tiene informacion en el campo");
        $.ajax({
            url: 'UpdateWithPassword',
            type: 'POST',
            data: {userid: $('#userid').val(),
                username: $('#username2').val(),
                password: $('#password2').val(),
                phone: $('#phone2').val(),
                neigborhood: $('#neigborhood2').val(),
                zipcode: $('#zipcode2').val(),
                city: $('#city2').val(),
                coutry: $('#country2').val(),
                state: $('#state2').val(),
                region: $('#region2').val(),
                street: $('#street2').val(),
                email: $('#email2').val(),
                streetnumber: $('#streetnumber2').val(),
                photo: $('#photo2').val(),
                cellphone: $('#cellphone2').val(),
                com: $('#cbEditCompany').val(),
                rol: $('#cbEditRoles').val(),
                gender: $('#cbEditGender').val()


            }

        }).done(
                function (data) {
                    if (data.code === 200) {
                        $("#modalUser").modal("hide");
                        $.growl.notice({message: data.msg});
                        $('#tbUsuarios').dataTable().api().ajax.reload();
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

    //$("#modalUser").modal("hide");
}