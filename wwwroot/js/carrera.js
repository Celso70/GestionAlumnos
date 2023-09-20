window.onload = BuscarCarreras();
function CrearNueva() {
    $("#Id").val(`0`)
    $("#ModalCarrera").modal("show");
    $("#h1Carrera").text("Agregar Carrera");
    $("#form-carrera input[name='Nombre']").val("")
    $("#form-carrera input[name='Duracion']").val("")
    $("#lbl-error").text("");
    // $("#btnEliminar").hide();
    // $("#btnHabilitar").hide();
    $("#btn-crear").show();
    $("#btn-crear").text("Crear");
}

function BuscarCarreras() {
    $("#btnEliminar").hide();
    let TablaCarrera = $("#tbody-carreras");
    TablaCarrera.empty();
    $.ajax({
        // la URL para la petición
        url: '../../Carrera/BuscarCarreras',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {},
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (carreras) {
            TablaCarrera.empty();
            $.each(carreras, function (index, carrera) {

                if (carrera.eliminado) {
                    TablaCarrera.append(`
                            <tr class="bg-danger">
                                <td> <a class=" btn btn-producto-cart" onClick="BuscarCarrera(${carrera.id})" role="button">${carrera.nombre}</a></td>
                                <td class="tdbasura"> 
                                <button class="delete-button btn btn-producto-cart" onClick="RemoveCarrera(${carrera.id})"> 
                                <i class="fa-solid fa-trash"></i>
                                </button>
                                </td>
                            </tr>`);
                } else {
                    TablaCarrera.append(`
                            <tr class="fondo-tabla">
                                <td> <a class="btn btn-producto-cart" onClick="BuscarCarrera(${carrera.id})" role="button">${carrera.nombre}</a></td>
                                <td class="tdbasura"> 
                                <button class="delete-button btn btn-producto-cart" onClick="RemoveCarrera(${carrera.id})"> 
                                <i class="fa-solid fa-trash"></i>
                                </button>
                                </td>
                            </tr>`);
                }
            })

        },
    })
}
function GuardarCarrera() {
    let Id = $("#Id").val();
    let Nombre = $("#form-carrera input[name='Nombre']").val().toUpperCase();
    $.ajax({
        // la URL para la petición
        url: '../../Carrera/GuardarCarrera',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { id: Id, nombre: Nombre },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {
            if (resultado.nonError) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Carrera Creada',
                    showConfirmButton: false,
                    timer: 1500
                            })
                $("#ModalCarrera").modal("hide");
                BuscarCarreras();
            }
            else {
                // $("#lbl-error").text(resultado.msjError);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Es necesario rellenar todos los campos!',
                    showConfirmButton: false,
                    timer: 1500
                            })
            }
        },
        error: function (xhr, status) {
            alert('Error al cargar carreras');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}
$("#textoInput").on("input", function () {
    var input = $(this);
    var startPosition = input[0].selectionStart;  // Guardar la posición del cursor

    input.val(input.val().toUpperCase());  // Convertir texto a mayúsculas

    input[0].setSelectionRange(startPosition, startPosition);  // Restaurar la posición del cursor
});