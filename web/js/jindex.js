/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.ajax({
    url: "CheckSession",
    async: false
}).done(function(json){
    if(json.code!==200){
      console.log("No tiene acceso");
      $('#menu').append('<ul class="nav navbar-nav navbar-right"><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown <spanclass="caret"></span></a><ul class="dropdown-menu"><li><a href="#">Mi cuenta</a></li><li><a href="#">Mis pedidos</a></li><li><a href="#">Centro de Mensajes</a></li><li class="divider"></li><li><a href="#">Cerrar Sessión</a></li></ul></li></ul>');
      
    }else{
        $('#menu').append('<ul class="nav navbar-nav navbar-right"><li><a href="#">Registrar</a></li><li><a href="#">Ingresar</a></li></ul>');
        console.log("Si tiene acceso");
    }
}).fail(function(){
    
});
