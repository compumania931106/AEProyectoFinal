/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.ajax({
    url: "CheckSession",
    async: false
}).done(function (json) {
    if (json.code === 200) {
        $.ajax({
            url: "CheckRoleID",
            async: false
        }).done(function (json) {
            if (json.code === 200) {
                if (json.detail !== "1") {
                    var url = "index.html";
                    $(location).attr('href', url);
                }
            } else {
                var url = "index.html";
                $(location).attr('href', url);
            }
        }).fail(function () {

        });
    } else {
        var url = "index.html";
        $(location).attr('href', url);
    }
}).fail(function () {

});

$(function () {
    $('#nav a').on('click',function(e){
      			e.preventDefault(); //CUANDO LE DE CLIC AL LINK HAGA LA ACCION DE IRSE A OTRA PAG.  
      			var page = $(this).attr('href');
            if (page === "#") {

            }else{
              $('#content').load(page);
              $('#nav li').removeClass('active');
              $(this).parent().addClass('active');
            }
      			});
});
