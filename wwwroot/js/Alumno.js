window.onload = function() {
  $.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '&#x3C;Ant',
    nextText: 'Sig&#x3E;',
    currentText: 'Hoy',
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };
  $("#AlumnoNacimiento").datepicker({
    changeMonth: true,
    changeYear: true,
    showAnim: "fold",
    minDate: "-70Y",
    maxDate: "-12Y",
    beforeShow: function(input, inst) {
      inst.settings = $.extend(inst.settings, $.datepicker.regional['es']);
    }
  });
  AlumnosBuscar();
}



  function AlumnosBuscar() {
    console.log("Entré")
    let AlumnosTabla = $("#AlumnosTabla");
    AlumnosTabla.empty();
    $.ajax({
        url: '../../Alumno/AlumnosBuscar',
        data: {},
        type: 'GET',
        dataType: 'json',
        success: function (AlumnosListado) {
            AlumnosTabla.empty();
          $.each(AlumnosListado, function (index, alumnos) {
            var FormatoAplicado = FechaFormato(alumnos.alumnoNacimiento)
            if (alumnos.eliminado) {
                console.log("IF DE SI ALUMNO ELIMINADO")
                AlumnosTabla.append(`
                <tr class="bg-danger">
                    <th scope="row">${alumnos.alumnoID}</th>
                    <td>${alumnos.alumnoNombre}</td>
                    <td>${FormatoAplicado}</td>
                    <td>${alumnos.carreraNombre}</td>
                    <td>
                      
                      <button onclick="AlumnoEliminar(${alumnos.alumnoID})">✔</button>
                      <button  onclick="AlumnoRemover(${alumnos.alumnoID})">🗑</button>
                    </td>
                </tr>
                `);
            }else{
              console.log("ELSE DE SI ALUMNO EXISTE")
              AlumnosTabla.append(`
                <tr>
                    <th scope="row">${alumnos.alumnoID}</th>
                    <td>${alumnos.alumnoNombre}</td>
                    <td>${FormatoAplicado}</td>
                    <td>${alumnos.carreraNombre}</td>
                    <td>
                      <button onclick="AlumnoBuscar(${alumnos.alumnoID})">✍</button>
                      <button onclick="AlumnoEliminar(${alumnos.alumnoID})">❌</button>
                      <button onclick="AlumnoRemover(${alumnos.alumnoID})">🗑</button>
                    </td>
                </tr>
                `);
            }
          })
      }
      })
  }

function AlumnoBuscar(Id) {
  console.log("función alumno editar")
  $("#lbl-error").text("");

//ESTOY VERIFICANDO SI, EFECTIVAMENTE ESTOY RECIBIENDO UN PARÁMETRO PARA CONTINUAR CON MI AJAX
  if (!Id) {
    console.log("Id es undefined o nulo.");
    return; // Salir de la función si Id no tiene un valor válido.
}
$.ajax({
  // la URL para la petición
  url: '../../Alumno/AlumnosBuscar',
  // la información a enviar
  // (también es posible utilizar una cadena de datos)
  data: { Id: Id },
  // especifica si será una petición POST o GET
  type: 'GET',
  // el tipo de información que se espera de respuesta
  dataType: 'json',
  success: function (Alumno) {
    var FechaFormateada = FechaFormato(Alumno[0].alumnoNacimiento);
      if (Alumno.length == 1) {
          let alumno = Alumno[0];
          $("#lbl-error").text("");
          $("#AlumnoH1").text("Editar Alumno");
          $("#AlumnoHiddenInputID").val(`${Alumno[0].alumnoID}`);
          $("#AlumnoForm input[name='NombreAlumno']").val(`${alumno.alumnoNombre}`);
          $("#AlumnoForm input[name='NacimientoAlumno']").val(`${FechaFormateada}`);
          $("#CarreraID").val(`${Alumno[0].alumnocarreraID}`);
          if (!alumno.eliminado) {
              $("#btnEliminar").hide();
              $("#btnHabilitar").hide();
              $("#btnDesHabilitar").hide();
              $("#btn-crear").show();
              $("#btn-crear").text("Editar");
          }
          else {
              $("#btnDesHabilitar").hide();
              $("#btnEliminar").hide();
              $("#btnHabilitar").hide();
              $("#btn-crear").show(); 
              $("#btn-crear").text("Editar");;
          }

          $("#AlumnoModal").modal("show");
      }
  },
  error: function (xhr, status) {
      alert('Error al cargar alumnos');
  },

  // código a ejecutar sin importar si la petición falló o no
  complete: function (xhr, status) {
      //alert('Petición realizada');
  }
})
}


function FechaFormato(fecha) {
  var estructura = fecha.split("T")[0].split("-");
  var FormatoAplicado = estructura[2] + "/" + estructura[1] + "/" + estructura[0];
  return FormatoAplicado;
}

  function AbrirModal() {
    $("#AlumnoModal").modal("show");
    $("#AlumnoH1").text("Agregar Alumno");
    $("#AlumnoHiddenInputID").val("0");
    $("#CarreraID").val("0");
    $("#AlumnoNombre").val("");
    $("#AlumnoNacimiento").val("");
    $("#lbl-error").text("");
    $("#btnEliminar").hide();
    $("#btnHabilitar").hide();
    $("#btn-crear").show();
    $("#btn-crear").text("Crear");
  }

  function AlumnoGuardar() {
    $("#lbl-error").text("");
    let AlumnoNombre = $("#AlumnoNombre").val();
    let Id = $("#AlumnoHiddenInputID").val();
    let AlumnoNacimiento = $("#AlumnoNacimiento").val();
    let CarreraID = $("#CarreraID").val();
    if (AlumnoNombre === "") {
      Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'El campo de nombre está vacío. Por favor, ingrese un nombre válido.',
          showConfirmButton: false,
          timer: 1500
                  })
      return;
  }
    $.ajax({
        url: '../../Alumno/AlumnoGuardar',
        type: 'POST',
        dataType: 'json',
        data: {Id: Id, alumnonombre: AlumnoNombre, alumnonacimiento: AlumnoNacimiento, carreraid: CarreraID},
        async: false,
        success: function (error) {
        
        if (Id == 0) {
          console.log(error);
          if (error.NonError) {
            $("#AlumnoModal").modal("hide");
            AlumnosBuscar();
          }
          else {
            $("#lbl-error").text(error.MsjError);
            $("#AlumnoModal").modal("hide");
            AlumnosBuscar();
          }
        }
        else{
          $("#AlumnoModal").modal("hide");
          AlumnosBuscar();
        }
          
        },
        error: function (xhr, status) {
          alert('Error al cargar alumnos');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
          //alert('Petición realizada');
        }
      });
  }

  function AlumnoEliminar(Id) {
    if (Id == 0) {
      console.log("Id es 0");
      return; // Salir de la función si Id no tiene un valor válido.
  }
  $.ajax({
    // la URL para la petición
    url: '../../Alumno/AlumnoEliminar',
    // la información a enviar
    // (también es posible utilizar una cadena de datos)
    data: { id: Id },
    // especifica si será una petición POST o GET
    type: 'POST',
    // el tipo de información que se espera de respuesta
    dataType: 'json',
    // código a ejecutar si la petición es satisfactoria;
    // la respuesta es pasada como argumento a la función
    success: function (AlumnoExiste) {
          if (AlumnoExiste.eliminado) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Alumno Habilitado'
            })
                  $("#AlumnoModal").modal("hide");
                  AlumnosBuscar();
          }
          else{
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Alumno deshabilitado'
            })
            $("#AlumnoModal").modal("hide");
            AlumnosBuscar();
          }
    },
    // código a ejecutar si la petición falla;
    // son pasados como argumentos a la función
    // el objeto de la petición en crudo y código de estatus de la petición
    error: function (xhr, status) {
        alert('Disculpe, existió un problema');
        $("#AlumnoModal").modal("hide");
        AlumnosBuscar();
    }
});
  }

function AlumnoRemover(Id) {
  $.ajax({
    // la URL para la petición
    url: '../../Alumno/AlumnoRemover',
    // la información a enviar
    // (también es posible utilizar una cadena de datos)
    data: { id: Id },
    // especifica si será una petición POST o GET
    type: 'POST',
    // el tipo de información que se espera de respuesta
    dataType: 'json',
    // código a ejecutar si la petición es satisfactoria;
    // la respuesta es pasada como argumento a la función
    success: function (error) {
        if (error.nonError) {
            // alert(resultado.msjError)
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Alumno eliminado'
            })
            AlumnosBuscar();
        }
    },
    // código a ejecutar si la petición falla;
    // son pasados como argumentos a la función
    // el objeto de la petición en crudo y código de estatus de la petición
    error: function (xhr, status) {
        alert('Disculpe, existió un problema');
        $("#AlumnoModal").modal("hide");
        AlumnosBuscar();
    }
});
}