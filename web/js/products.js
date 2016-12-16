var categoriid;

$(function () {
    $.ajax({
        url: 'GetCategorys',
        type: 'GET',
        dataType: 'json'
    }).done(function (json) {
        if (json.code === 200)
            $.each($.parseJSON(json.msg), function (i, row) {
                $('<option></option>', {text: row.categoryname}).attr('value', row.categoryid).appendTo('#cbCategoria');
                $('<option></option>', {text: row.categoryname}).attr('value', row.categoryid).appendTo('#cbCategoria2');
            });
    });

    $('#frmProduct').validate({
        rules: {
            code: {
                minlength: 1,
                maxlength: 20,
                required: true
            },
            productname: {
                minlength: 1,
                maxlength: 40,
                required: true
            },
            brand: {
                minlength: 1,
                maxlength: 20,
                required: true
            },
            purchprice: {
                required: true
            },
            stock: {
                number: true,
                required: true
            },
            salepricemin: {
                required: true
            },
            reorderpoint: {
                number: true,
                required: true
            },
            currency: {
                minlength: 3,
                maxlength: 3,
                required: true
            },
            salepricemay: {
                required: true
            },
            image: {
                required: true
            }
        },
        messages: {
            code: {
                minlength: "Minimo 1 caracter",
                maxlength: "Maximo 20 caracteres",
                required: "Capture nombre de usuario"
            },
            productname: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 16 caracteres",
                required: "Capture una contraseña"
            },
            brand: {
                minlength: "Minimo 10 caracteres",
                maxlength: "Maximo 10 caracteres",
                required: "Capture numero telefonico",
                number: "Solo numeros"
            },
            purchprice: {
                required: "Ingrese el precio de adquisicion"
            },
            stock: {
                number: "Solo numeros",
                required: "El numero de stock es necesario"
            },
            salepricemin: {
                required: "Ingrese el valor minimo de venta"
            },
            reorderpoint: {
                number: "Solo numeros",
                required: "El punto de reorden es necesario"
            },
            currency: {
                minlength: "Minimo 3 caracteres",
                maxlength: "Maximo 3 caracteres",
                required: "El tipo de moneda es requerida"
            },
            salepricemay: {
                required: "Ingrese el valor maximo de venta"
            },
            image: {
                required: "Ingrese una imagen"
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
            newProduct();
            return false;
        }
    });

    $('#tbProducts').DataTable({
        language: {
            url: "http://cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json"
        },
        responsive: true,
        ajax: {
            url: "GetProductsAll",
            dataSrc: function (json) {

                return $.parseJSON(json['msg']);
            }
        },
        columns: [
            {
                data: "productid"
            },
            {
                data: "code"
            },
            {
                data: "productname"
            },
            {
                data: "brand"
            },
            {
                data: "purchprice"
            },
            {
                data: "stock"
            },
            {
                data: "salepricemin"
            },
            {
                data: "salepricemay"
            },
            {
                data: "reorderpoint"
            },
            {
                data: "currency"
            },
            {
                data: function (row) {
                    categoriid = row['categoryid'];
                    return row['categoryid']['categoryname'];
                }
            },
            {
                data: function (row) {
                    str = "<div align='center'>";
                    str += "<button id='btnBorrar' class='btn btn-danger btn-xs' onclick='deleteProduct(" + row["productid"] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
                    str += "&nbsp;<button id='btnEditar' class = 'btn btn-success btn-xs' onClick = 'showProduct(" + row["productid"] + ")'><i class='glyphicon glyphicon-edit'></i></button>";
                    str += "<div>";
                    return str;
                }
            }
        ]


    });

     $("#btnModificar").on('click', function () {
        console.log("Si hicistes click");
        $("#frmEditProduct").submit();
    });

});

function verContenido() {
    console.log("code: " + $('#code').val());
    console.log("productname: " + $('#productname').val());
    console.log("brand: " + $('#brand').val());
    console.log("purchprice: " + $('#purchprice').val());
    console.log("stock: " + $('#stock').val());
    console.log("salepricemin: " + $('#salepricemin').val());
    console.log("reorderpoint: " + $('#reorderpoint').val());
    console.log("currency: " + $('#currency').val());
    console.log("cad: " + $('#cbCategoria').val());
    console.log("salepricemay: " + $('#salepricemay').val());
}

function newProduct() {
    $.ajax({
        url: "NewProduct",
        type: "POST",
        data: {code: $('#code').val(),
            productname: $('#productname').val(),
            brand: $('#brand').val(),
            purchprice: $('#purchprice').val(),
            stock: $('#stock').val(),
            salepricemin: $('#salepricemin').val(),
            reorderpoint: $('#reorderpoint').val(),
            currency: $('#currency').val(),
            cat: $('#cbCategoria').val(),
            salepricemay: $('#salepricemay').val()
        }

    }).done(function (json) {
        if (json.code === 200) {
            $.growl.notice({message: json.msg});
            $('#tbProducts').dataTable().api().ajax.reload();
        } else {
            $.growl.error({message: json.msg});
        }
    }).fail(function () {

    });
}

function subirImagen() {
    console.log("Entro a la funcion");
    $('#image').ajaxfileupload({
        'action': 'UploadFile',
        'onComplete': function (response) {

            var statusVal = JSON.stringify(response.status);

            if (statusVal == "false")
            {
                $("#message").html("<font color='red'>" + JSON.stringify(response.message) + "</font>");
            }
            if (statusVal == "true")
            {
                $("#message").html("<font color='green'>" + JSON.stringify(response.message) + "</font>");
            }
        },
        'onStart': function () {
            console.log("Comenzo");
        }
    });
}


function deleteProduct(id) {
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
                            url: "DeleteProduct",
                            type: "post",
                            data: {productid: id}
                        }
                ).done(
                        function (data) {
                            if (data.code === 200) {
                                //$.growl.notice({title: "Successful", message: data.msg });
                                swal("Eliminado", data.msg, "success");
                                $('#tbProducts').dataTable().api().ajax.reload();
                                $('#code').val('');
                                $('#productname').val('');
                                $('#brand').val('');
                                $('#purchprice').val('');
                                $('#stock').val('');
                                $('#salepricemin').val('');
                                $('#reorderpoint').val('');
                                $('#currency').val('');
                                $('#category').val('');
                                $('#salepricemay').val('');


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

function showProduct(productid) {
    $("#modalProduct").modal("show");
    $.ajax({
        url: 'GetProductByID',
        type: 'GET',
        data: {productid: productid},
        dataType: 'json'
    }).done(function (json) {
        if (json.code === 200) {
            var code = $.parseJSON(json.msg);
            $('#productid').val(code.productid);
            $('#code2').val(code.code);
            $('#productname2').val(code.productname);
            $('#brand2').val(code.brand);
            $('#purchprice2').val(code.purchprice);
            $('#stock2').val(code.stock);
            $('#salepricemin2').val(code.salepricemin);
            $('#reorderpoint2').val(code.reorderpoint);
            $('#currency2').val(code.currency);
            $('#salepricemay2').val(code.salepricemay);
            console.log(categoriid.categoryid);
            $('#cbCategoria2 > option[value="' + categoriid.categoryid + '"]').attr('selected', 'selected');
       
            


        }else{
            console.log("problemas");
        }
    });
}