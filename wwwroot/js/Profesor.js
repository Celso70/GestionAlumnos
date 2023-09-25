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
    $("#ProfesorNacimiento").datepicker({
      changeMonth: true,
      changeYear: true,
      showAnim: "fold",
      minDate: "-70Y",
      maxDate: "-12Y",
      beforeShow: function(input, inst) {
        inst.settings = $.extend(inst.settings, $.datepicker.regional['es']);
      }
    });
    ProfesoresBuscar();
  }


  function FechaFormato(fecha) {
    var estructura = fecha.split("T")[0].split("-");
    var FormatoAplicado = estructura[2] + "/" + estructura[1] + "/" + estructura[0];
    return FormatoAplicado;
  }


function AbrirModal() {
    $("#ProfesorHiddenInputID").val(`0`);
    $("#ProfesorModal").modal("show");
    $("#ProfesorH1").text("Agregar Profesor");
    $("#ProfesorForm input[name='ProfesorNombre']").val("")
    $("#ProfesorForm input[name='ProfesorDNI']").val("")
    $("#ProfesorForm input[name='ProfesorNacimiento']").val("")
    $("#ProfesorForm input[name='ProfesorEmail']").val("")
    $("#InputDireccion").val("")
    $("#lbl-error").text("");
    $("#btnEliminar").hide();
    $("#btnHabilitar").hide();
    $("#btnDesHabilitar").hide();
    $("#btn-crear").show();
    $("#btn-crear").text("Crear");
}

function ProfesoresBuscar() {
    let ProfesorTabla = $("#ProfesorTabla");
    ProfesorTabla.empty();
    $.ajax({
        // la URL para la petición
        url: '../../Profesor/ProfesoresBuscar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {},
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (ProfesoresListado) {
            ProfesorTabla.empty();
            $.each(ProfesoresListado, function (index, profesor) {
            var FormatoAplicado = FechaFormato(profesor.profesorNacimiento)
                if (profesor.eliminado) {
                    ProfesorTabla.append(`
                            <tr class="bg-danger">
                                <th scope="row">${profesor.profesorID}</th>
                                <td>${profesor.profesorDNI}</td>
                                <td>${profesor.profesorNombre}</td>
                                <td>${FormatoAplicado}</td>
                                <td>${profesor.profesorDireccion}</td>
                                <td>${profesor.profesorEmail}</td>
                                <td>
                                    <td><button onclick="ProfesorRemover(${profesor.profesorID})">🗑Eliminar</button></td>
                                    <td><button onclick="ProfesorEliminar(${profesor.profesorID})">✔</button></td>
                                </td>
                                </tr>`);
                } else {
                    ProfesorTabla.append(`
                            <tr>
                            <th scope="row">${profesor.profesorID}</th>
                            <td>${profesor.profesorDNI}</td>
                            <td>${profesor.profesorNombre}</td>
                            <td>${FormatoAplicado}</td>
                            <td>${profesor.profesorDireccion}</td>
                            <td>${profesor.profesorEmail}</td>
                                <td>
                                    <td><button onclick="ProfesorBuscar(${profesor.profesorID})">✍</button></td>
                                    <td><button onclick="ProfesorRemover(${profesor.profesorID})">🗑Eliminar</button></td>
                                    <td><button onclick="ProfesorEliminar(${profesor.profesorID})">❌</button></td>
                                </td>
                                
                            </tr>`);
                }
            })

        },
    })
}

function ProfesorBuscar(Id) {
    console.log("entré a la funcion editar")
    $("#lbl-error").text("");

    //ESTOY VERIFICANDO SI, EFECTIVAMENTE ESTOY RECIBIENDO UN PARÁMETRO PARA CONTINUAR CON MI AJAX
    if (!Id) {
        console.log("Id es undefined o nulo.");
        return; // Salir de la función si Id no tiene un valor válido.
    }

    $.ajax({
        // la URL para la petición
        url: '../../Profesor/ProfesoresBuscar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { Id: Id },
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (Profesor) {
            var FormatoAplicado = FechaFormato(Profesor[0].profesorNacimiento)
            if (Profesor.length == 1) {
                let profesor = Profesor[0];
                $("#lbl-error").text("");
                $("#ProfesorH1").text("Editar Profesor");
                $("#ProfesorHiddenInputID").val(`${Profesor[0].profesorID}`);
                $("#ProfesorForm input[name='ProfesorNombre']").val(`${profesor.profesorNombre}`)
                $("#ProfesorForm input[name='ProfesorDNI']").val(`${profesor.profesorDNI}`)
                $("#InputDireccion").val(`${profesor.profesorDireccion}`)
                $("#ProfesorForm input[name='ProfesorNacimiento']").val(`${FormatoAplicado}`)
                $("#ProfesorForm input[name='ProfesorEmail']").val(`${profesor.profesorEmail}`)
                if (!profesor.eliminado) {
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

                $("#ProfesorModal").modal("show");
            }
            
        },
        error: function (xhr, status) {
            alert('Error al cargar profesores');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    })
}

function ProfesorGuardar(){

    let Id = $("#ProfesorHiddenInputID").val();
    let Nombre = $("#ProfesorForm input[name='ProfesorNombre']").val();
    let DNI = $("#ProfesorForm input[name='ProfesorDNI']").val();
    let Nacimiento = $("#ProfesorForm input[name='ProfesorNacimiento']").val();
    let Email = $("#ProfesorForm input[name='ProfesorEmail']").val();
    let Direccion = $("#InputDireccion").val();

    if (Nombre === "") {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'El campo de nombre está vacío. Por favor, ingrese un nombre válido.',
            showConfirmButton: false,
            timer: 1500
                    })
        return;
    }
    console.log(Direccion)

    $.ajax({
        // la URL para la petición
        url: '../../Profesor/ProfesorGuardar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { id: Id, profesornombre: Nombre, profesordni: DNI, profesornacimiento: Nacimiento, profesordireccion: Direccion, profesoremail: Email},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (error) {

            if (Id == 0) {
                if (error.nonError) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Profesor Creado',
                        showConfirmButton: false,
                        timer: 1500
                                })
                    $("#ProfesorModal").modal("hide");
                    ProfesoresBuscar();
                }
                else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Ya existe un profesor con ese DNI',
                        showConfirmButton: false,
                        timer: 1000
                                })
                        $("#ProfesorModal").modal("hide");
                        ProfesoresBuscar();
                }
                
            }
            else{
                if (error.nonError) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Profesor Editado',
                        showConfirmButton: false,
                        timer: 1500
                                })
                    $("#ProfesorModal").modal("hide");
                        ProfesoresBuscar();
                }
                else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Ha sido imposible editar, ya que ya existe un profesor con ese DNI',
                        showConfirmButton: false,
                        timer: 1500
                                })
                        $("#ProfesorModal").modal("hide");
                        ProfesoresBuscar();
                }
            }
            
        },
        error: function (xhr, status) {
            alert('Error al cargar profesores');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function ProfesorEliminar(Id) {

    if (Id == 0) {
        console.log("Id es 0");
        return; // Salir de la función si Id no tiene un valor válido.
    }
    $.ajax({
        // la URL para la petición
        url: '../../Profesor/ProfesorEliminar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { id: Id },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (ProfesorYaExiste) {
            if (ProfesorYaExiste.eliminado) {
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
                    title: 'Profesor Habilitado'
                  })
                        $("#ProfesorModal").modal("hide");
                        ProfesoresBuscar();
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
                    title: 'Profesor deshabilitado'
                  })
                  $("#ProfesorModal").modal("hide");
                  ProfesoresBuscar();
            }
            
        },
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
            $("#ProfesorModal").modal("hide");
            ProfesoresBuscar();
        }
    });
}

function ProfesorRemover(Id) {
    $.ajax({
        // la URL para la petición
        url: '../../Profesor/ProfesorRemover',
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
                  title: 'Profesor eliminado'
                })
                ProfesoresBuscar();
            }
        },
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
            $("#ProfesorModal").modal("hide");
            ProfesoresBuscar();
        }
    });
}