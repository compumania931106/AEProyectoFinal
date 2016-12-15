$(function (){
	

$.ajax({
        url: "http://localhost/TPAProyectoIntegrador/model/usuario/getRoleIdUser.php",
        type: "get",
        dataType: 'json'
    }).done(
        function(data){
            if(data.msg === "1"){

              //$('#nav').load("http://localhost/TPAProyectoIntegrador/views/menuAdmin.txt");

                $('#nav').append('<ul class="nav navbar-nav side-nav"><li class="active"><a href="views/cInicio.php"><i class="fa fa-fw fa-home""></i> Inicio</a></li><li><a href="javascript:;" data-toggle="collapse" data-target="#demo"><i class="fa fa-fw fa-th-list"></i> Catalogos <i class="fa fa-fw fa-caret-down"></i></a><ul id="demo" class="collapse"><li><a href="views/cUsuario.php">Usuarios</a></li><li><a href="#">Alumnos</a></li><li><a href="views/cMaestros.php">Maestros</a></li><li><a href="views/cMateria.php">Materias</a></li><li><a href="views/cEdificio.php">Edificios</a></li><li><a href="#">Aulas</a></li><li><a href="views/cHorarios.php">Horarios</a></li><li><a href="#">Clases</a></li><li><a href="#">Departamentos</a></li><li><a href="views/cCarrera.php">Carreras</a></li><li><a href="views/cPreguntas.php">Encuestas</a></li><li><a href="views/cDosificacion.php">Docificación</a></li></ul></li><li><a href="javascript:;" data-toggle="collapse" data-target="#demo1"><i class="fa fa-fw fa-calendar-o"></i> Reportes <i class="fa fa-fw fa-caret-down"></i></a><ul id="demo1" class="collapse"><li><a href="#">Materias c/ Alumnos</a>/li><li><a href="views/cEncuestaAlumnoMateria.php">Encuesta de Alumno / materia</a></li><li><a href="#">Resultado por maestro/materias</a></li><li><a href="#">Maestros evaluados/materia</a></li></ul></li><li><a href="javascript:;" data-toggle="collapse" data-target="#demo2"><i class="fa fa-fw fa-wrench"></i> Utilerias <i class="fa fa-fw fa-caret-down"></i></a><ul id="demo2" class="collapse"><li><a href="#">Importación de datos</a></li><li><a href="#">Exportación de alumnos</a></li><li><a href="#">Exportación de maestros</a></li></ul></li><li><a href="javascript:;" data-toggle="collapse" data-target="#demo3"><i class="fa fa-fw fa-refresh"></i> Procesos <i class="fa fa-fw fa-caret-down"></i></a><ul id="demo3" class="collapse"><li><a href="#">Aplicación de la encuesta</a></li></ul></li></ul>');
                cargarpagina();
            }else if(data.msg === "2"){
                $('#nav').append('<ul class="nav navbar-nav side-nav"><li class="active"><a href="views/cInicio.php"><i class="fa fa-fw fa-home""></i> Inicio</a></li><li><a href="javascript:;"data-toggle="collapse" data-target="#demo3"><i class="fa fa-fw fa-refresh"></i> Procesos <i class="fa fa-fw fa-caret-down"></i></a><ul id="demo3" class="collapse"><li><a href="#">Aplicación de la encuesta</a></li></ul></li></ul>');
                cargarpagina();
            }else{

              $('#nav').append('<ul class="nav navbar-nav side-nav"><li class="active"><a href="views/cInicio.php"><i class="fa fa-fw fa-home""></i> Inicio</a></li><li><a href="javascript:;" data-toggle="collapse" data-target="#demo"><i class="fa fa-fw fa-th-list"></i> Catalogos <i class="fa fa-fw fa-caret-down"></i></a><ul id="demo" class="collapse"><li><a href="views/cDosificacion.php">Docificación</a></li></ul></li><li><a href="javascript:;" data-toggle="collapse" data-target="#demo1"><i class="fa fa-fw fa-calendar-o"></i> Reportes <i class="fa fa-fw fa-caret-down"></i></a><ul id="demo1" class="collapse"><li><a href="#">Materias c/ Alumnos</a>/li><li><a href="views/cEncuestaAlumnoMateria.php">Encuesta de Alumno / materia</a></li><li><a href="#">Evaluación por Materia</a></li></ul>');
                cargarpagina();
            }
            
        }
    );




   
});

function cargarpagina() {
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
}
