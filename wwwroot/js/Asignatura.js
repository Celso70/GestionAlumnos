window.onload = AsignaturasBuscar();

function AsignaturasBuscar() {
    
    let AsignaturaTabla = $("#AsignaturaTabla");
    AsignaturaTabla.empty();
    $.ajax({
        url: '../../Asignatura/AsignaturasBuscar',
        data: {},
        type: 'GET',
        dataType: 'json',
        success: function (AsignaturasListado) {
            AsignaturaTabla.empty();
          $.each(AsignaturasListado, function (index, asignaturas) {
            if (asignaturas.eliminado) {
                console.log("IF DE SI ASIGNATURA ELIMINADO")
                AsignaturaTabla.append(`
                <tr class="bg-danger">
                    <th scope="row">${asignaturas.asignaturaID}</th>
                    <td>${asignaturas.asignaturaNombre}</td>
                    <td>${asignaturas.carreraNombre}</td>
                    <td>
                      
                      <button onclick="AsignaturaEliminar(${asignaturas.asignaturaID})">✔</button>
                      <button  onclick="AsignaturaRemover(${asignaturas.asignaturaID})">🗑</button>
                    </td>
                </tr>
                `);
            }else{
              console.log("ELSE DE SI ASIGNATURA EXISTE")
              AsignaturaTabla.append(`
                <tr>
                <th scope="row">${asignaturas.asignaturaID}</th>
                <td>${asignaturas.asignaturaNombre}</td>
                <td>${asignaturas.carreraNombre}</td>

                <td>
                    <td>
                      <button onclick="AsignaturaBuscar(${asignaturas.asignaturaID})">✍</button>
                      <button onclick="AsignaturaEliminar(${asignaturas.asignaturaID})">❌</button>
                      <button onclick="AsignaturaRemover(${asignaturas.asignaturaID})">🗑</button>
                    </td>
                </tr>
                `);
            }
          })
      }
      })
}

function AsignaturaBuscar(Id) {

    //ESTOY VERIFICANDO SI, EFECTIVAMENTE ESTOY RECIBIENDO UN PARÁMETRO PARA CONTINUAR CON MI AJAX
    if (!Id) {
        console.log("Id es undefined o nulo.");
        return; // Salir de la función si Id no tiene un valor válido.
    }
    $.ajax({
        // la URL para la petición
        url: '../../Asignatura/AsignaturasBuscar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { id: Id },
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (Asignaturas) {
            if (Asignaturas.length == 1) {
                let asignatura = Asignaturas[0];
                $("#AsignaturaH1").text("Editar Asignatura");
                $("#AsignaturaHiddenInputID").val(`${asignatura.asignaturaID}`);
                $("#AsignaturaNombre").val(`${asignatura.asignaturaNombre}`);
                $("#CarreraID").val(`${asignatura.carreraID}`);
      
      
                if (!asignatura.eliminado) {
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
                    $("#btn-crear").text("Editar");
                    
      
                }
      
                $("#AsignaturaModal").modal("show");
                
            }
        },
        error: function (xhr, status) {
            alert('Error al cargar asignaturas');
        },
      
        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
      })
}function AbrirModal() {
    $("#AsignaturaModal").modal("show");
    $("#AsignaturaH1").text("Agregar Asignatura");
    $("#AsignaturaHiddenInputID").val("0");
    $("#CarreraID").val("0");
    $("#AsignaturaNombre").val("");
    $("#btnEliminar").hide();
    $("#btnHabilitar").hide();
    $("#btn-crear").show();
    $("#btn-crear").text("Crear");
  }

  function AsignaturaGuardar() {
    
    let Id = $("#AsignaturaHiddenInputID").val();
    let AsignaturaNombre = $("#AsignaturaNombre").val();
    let CarreraID = $("#CarreraID").val();

    if (AsignaturaNombre === "") {
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
        url: '../../Asignatura/AsignaturaGuardar',
        type: 'POST',
        dataType: 'json',
        data: {Id: Id, 
               asignaturanombre: AsignaturaNombre, 
               carreraid: CarreraID},
               async: false,
               success: function (error) {
        
        if (Id == 0) {
          if (error.nonError) {
           
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Asignatura Creada',
              showConfirmButton: false,
              timer: 1500
                      })
            $("#AsignaturaModal").modal("hide");
            AsignaturasBuscar();
          }
           else{
            
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Ya existe esa Asignatura',
              showConfirmButton: false,
              timer: 1000
                      })
            $("#AsignaturaModal").modal("hide");
            AsignaturasBuscar();
          }
        }
        else{
          if (error.nonError) {
            
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Asignatura Editada',
              showConfirmButton: false,
              timer: 1500
                      })
            $("#AsignaturaModal").modal("hide");
            AsignaturasBuscar();
          }
          else{
            
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Para editar debe ingresar una Asignatura que no exista',
              showConfirmButton: false,
              timer: 1500
                      })
            $("#AsignaturaModal").modal("hide");
            AsignaturasBuscar();
          }
          
        }
          
        },
        error: function (xhr, status) {
          alert('Error al cargar asignaturas');
      },

      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
          //alert('Petición realizada');
        }
      });
  }
  function AsignaturaEliminar(Id) {
    if (Id == 0) {
      console.log("Id es 0");
      return; // Salir de la función si Id no tiene un valor válido.
  }
  $.ajax({
    // la URL para la petición
    url: '../../Asignatura/AsignaturaEliminar',
    // la información a enviar
    // (también es posible utilizar una cadena de datos)
    data: { id: Id },
    // especifica si será una petición POST o GET
    type: 'POST',
    // el tipo de información que se espera de respuesta
    dataType: 'json',
    // código a ejecutar si la petición es satisfactoria;
    // la respuesta es pasada como argumento a la función
    success: function (AsignaturaExiste) {
          if (AsignaturaExiste.eliminado) {
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
              title: 'Asignatura Habilitada'
            })
                  $("#AsignaturaModal").modal("hide");
                  AsignaturasBuscar();
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
              title: 'Asignatura deshabilitada'
            })
            $("#AsignaturaModal").modal("hide");
            AsignaturasBuscar();
          }
    },
    // código a ejecutar si la petición falla;
    // son pasados como argumentos a la función
    // el objeto de la petición en crudo y código de estatus de la petición
    error: function (xhr, status) {
        alert('Disculpe, existió un problema');
        $("#AsignaturaModal").modal("hide");
        AsignaturasBuscar();
    }
});
  }

function AsignaturaRemover(Id) {
  $.ajax({
    // la URL para la petición
    url: '../../Asignatura/AsignaturaRemover',
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
              title: 'Asignatura eliminada'
            })
            AsignaturasBuscar();
        }
    },
    // código a ejecutar si la petición falla;
    // son pasados como argumentos a la función
    // el objeto de la petición en crudo y código de estatus de la petición
    error: function (xhr, status) {
        alert('Disculpe, existió un problema');
        $("#AsignaturaModal").modal("hide");
        AsignaturasBuscar();
    }
}); 
}