/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(function () {
   



    $('#frmCategory').validate({
        rules: {
            categoryname: {
                minlength: 3,
                maxlength: 20,
                required: true
            }
        },
        messages: {
            categoryname: {
                minlength: "Introduzca al menos tres caracteres",
                maxlength: "Introdusca menos de 20 caracteres",
                required: "Capture el nombre de la categoria"
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
            newCategory();
            return false;
        }
    });

    $('#frmEditCategory').validate({
        rules: {
            categoryname2: {
                minlength: 3,
                maxlength: 20,
                required: true
            }
        },
        messages: {
            categoryname2: {
                minlength: "Introduzca al menos tres caracteres",
                maxlength: "Introdusca menos de 20 caracteres",
                required: "Capture el nombre de la categoria"
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
            updateCategory();
            return false;
        }
    });

    $('#tbCategory').DataTable({
        language: {
            url: "http://cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json"
        },
        ajax: {
            url: "GetCategorys",
            dataSrc: function (json) {

                return $.parseJSON(json['msg']);
            }
        },
        columns: [
            {
                data: "categoryid"
            },
            {
                data: "categoryname"
            },
            {
                data: function (row) {
                    str = "<div align='center'>";
                    str += "<button id='btnBorrar' class='btn btn-danger btn-xs' onclick='deleteCategory(" + row["categoryid"] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
                    str += "&nbsp;<button id='btnEditar' class = 'btn btn-success btn-xs' onClick = 'showCategory(" + row['categoryid'] + ",\"" + row['categoryname'] + "\")'><i class='glyphicon glyphicon-edit'></i></button>";
                    str += "<div>";
                    return str;
                }
            }
        ]


    });

    $("#btnModificar").on('click', function () {
        $("#frmEditCategory").submit();
    });
});

function showCategory(categoryid, categoryname) {
    $('#categoryid').val(categoryid);
    $('#categoryname2').val(categoryname);
    $("#modalCategory").modal("show");
}

function updateCategory() {
    console.log($('#categoryid').val());
    $.ajax({
        url: "UpdateCategory",
        type: "post",
        data: {categoryid: $('#categoryid').val(),
            categoryname: $('#categoryname2').val()}
    }).done(
            function (data) {
                if (data.code === 200) {
                    $("#modalCategory").modal("hide");
                    $.growl.notice({message: data.msg});
                    $('#tbCategory').dataTable().api().ajax.reload();
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

function deleteCategory(id) {
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
                            url: "DeleteCategory",
                            type: "post",
                            data: {categoryid: id}
                        }
                ).done(
                        function (data) {
                            if (data.code === 200) {
                                //$.growl.notice({title: "Successful", message: data.msg });
                                swal("Eliminado", data.msg, "success");
                                $('#tbCategory').dataTable().api().ajax.reload();
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

function newCategory() {
    $.ajax({
        url: "NewCategory",
        type: "post",
        data: $('#frmCategory').serialize()
    }).done(
            function (data) {
                if (data.code === 200) {
                    $.growl.notice({message: data.msg});
                    $('#tbCategory').dataTable().api().ajax.reload();
                    $('#categoryname').val('');
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


