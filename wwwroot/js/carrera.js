window.onload = CarrerasBuscar();

function AbrirModal() {
    $("#CarreraHiddenInputID").val(`0`);
    $("#CarreraModal").modal("show");
    $("#CarreraH1").text("Agregar Carrera");
    $("#CarreraForm input[name='CarreraNombre']").val("")
    $("#CarreraForm input[name='CarreraDuracion']").val("")
    $("#lbl-error").text("");
    $("#btnEliminar").hide();
    $("#btnHabilitar").hide();
    $("#btnDesHabilitar").hide();
    $("#btn-crear").show();
    $("#btn-crear").text("Crear");
}

function CarrerasBuscar() {
    let TablaCarrera = $("#CarrerasTabla");
    TablaCarrera.empty();
    $.ajax({
        // la URL para la petición
        url: '../../Carrera/CarrerasBuscar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {},
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (CarrerasListado) {
            TablaCarrera.empty();
            $.each(CarrerasListado, function (index, carrera) {

                if (carrera.eliminado) {
                    TablaCarrera.append(`
                            <tr class="bg-danger">
                                <th scope="row">${carrera.carreraID}</th>
                                <td>${carrera.carreraNombre}</td>
                                <td>${carrera.carreraDuracion}</td>
                                <td>
                                    <td><button onclick="CarrerasRemover(${carrera.carreraID})">🗑Eliminar</button></td>
                                    <td><button onclick="CarreraEliminar(${carrera.carreraID})">✔</button></td>
                                </td>S
                                </tr>`);
                } else {
                    TablaCarrera.append(`
                            <tr>
                                <th scope="row">${carrera.carreraID}</th>
                                <td>${carrera.carreraNombre}</td>
                                <td>${carrera.carreraDuracion}</td
                                <td>
                                    <td><button onclick="CarreraBuscar(${carrera.carreraID})">✍</button></td>
                                    <td><button onclick="CarrerasRemover(${carrera.carreraID})">🗑Eliminar</button></td>
                                    <td><button onclick="CarreraEliminar(${carrera.carreraID})">❌</button></td>
                                </td>
                                
                            </tr>`);
                }
            })

        },
    })
}


function CarreraBuscar(Id) {
    console.log("entré a la función editar")
    $("#lbl-error").text("");
    
    //ESTOY VERIFICANDO SI, EFECTIVAMENTE ESTOY RECIBIENDO UN PARÁMETRO PARA CONTINUAR CON MI AJAX
    if (!Id) {
        console.log("Id es undefined o nulo.");
        return; // Salir de la función si Id no tiene un valor válido.
    }

    $.ajax({
        // la URL para la petición
        url: '../../Carrera/CarrerasBuscar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { Id: Id },
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (Carrera) {
            if (Carrera.length == 1) {
                let carrera = Carrera[0];
                $("#lbl-error").text("");
                $("#CarreraH1").text("Editar Carrera");
                $("#CarreraHiddenInputID").val(`${Carrera[0].carreraID}`);
                $("#CarreraForm input[name='CarreraNombre']").val(`${carrera.carreraNombre}`)
                $("#CarreraForm input[name='CarreraDuracion']").val(`${carrera.carreraDuracion}`)
                if (!carrera.eliminado) {
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

                $("#CarreraModal").modal("show");
            }
            
        },
        error: function (xhr, status) {
            alert('Error al cargar carreras');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    })
}


function CarreraGuardar() {
    let Id = $("#CarreraHiddenInputID").val();
    let Nombre = $("#CarreraForm input[name='CarreraNombre']").val();
    let duracion = $("#CarreraForm input[name='CarreraDuracion']").val();
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

    $.ajax({
        // la URL para la petición
        url: '../../Carrera/CarreraGuardar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { id: Id, nombre: Nombre, Duracion: duracion},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (error) {

            if(Id == 0){
                    if (error.nonError) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Carrera Creada',
                            showConfirmButton: false,
                            timer: 1500
                                    })
                        $("#CarreraModal").modal("hide");
                        CarrerasBuscar();
                    }
                    else{
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Ya existe una carrera con ese nombre',
                            showConfirmButton: false,
                            timer: 1500
                                    })
                    }
            }
            else
            {
                if(error.nonError){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Carrera Editada',
                        showConfirmButton: false,
                        timer: 1500
                                })
                    $("#CarreraModal").modal("hide");
                    CarrerasBuscar();
                }
                else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Ha sido imposible editar, ya que ya existe una carrera con ese nombre',
                        showConfirmButton: false,
                        timer: 1500
                                })
                }
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

function CarreraEliminar(Id) {


    if (Id == 0) {
        console.log("Id es 0");
        return; // Salir de la función si Id no tiene un valor válido.
    }
    $.ajax({
        // la URL para la petición
        url: '../../Carrera/CarreraEliminar',
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
                $("#CarreraModal").modal("hide");
                CarrerasBuscar();
            }
            else {
                // $("#lbl-error").text(resultado.msjError);
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Primero deshabilite los alumnos relacionados!',
                    showConfirmButton: false,
                    timer: 1500
                            })
                
            }
        },
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
            $("#CarreraModal").modal("hide");
            CarrerasBuscar();
        }
    });
}

function CarrerasRemover(Id) {
    $.ajax({
        // la URL para la petición
        url: '../../Carrera/CarreraRemover',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { ID: Id },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (error) {
            if (error.nonError) {
                // alert(resultado.msjError)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Carrera eliminada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                            })
                $("#CarreraModal").modal("hide");
                CarrerasBuscar();
            }
            else {
                // alert(resultado.msjError);
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Esta carrera aún posee Alumnos',
                    showConfirmButton: false,
                    timer: 1500
                            })
                            $("#CarreraModal").modal("hide");
                            CarrerasBuscar();
            }
        },
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema');
            $("#CarreraModal").modal("hide");
            CarrerasBuscar();
        }
    });
}
$("#textoInput").on("input", function () {
    var input = $(this);
    var startPosition = input[0].selectionStart;  // Guardar la posición del cursor

    input.val(input.val().toUpperCase());  // Convertir texto a mayúsculas

    input[0].setSelectionRange(startPosition, startPosition);  // Restaurar la posición del cursor
});










































// function CarrerasBuscar() {
//     let CarrerasTabla = $("#CarrerasTabla");
//     CarrerasTabla.empty();
//     $.ajax({
//         // la URL para la petición
//         url: '../../Carrera/CarrerasBuscar',
//         // la información a enviar
//         // (también es posible utilizar una cadena de datos)
//         data: {},
//         // especifica si será una petición POST o GET
//         type: 'GET',
//         // el tipo de información que se espera de respuesta
//         dataType: 'json',
//         // código a ejecutar si la petición es satisfactoria;
//         // la respuesta es pasada como argumento a la función
//         success: function (CarrerasListado) {
//             CarrerasTabla.empty();
//             $.each(CarrerasListado, function (index, CarrerasCampo) {
//                 CarrerasTabla.append(`
//                 <tr>
//                     <th scope="row">${CarrerasCampo.CarreraID}</th>
//                     <td>${CarrerasCampo.carreranombre}</td>
//                     <td>${CarrerasCampo.carreraduracion}</td>
//                     <td><button onclick="DeleteCarrer(${CarrerasCampo.CarreraID})">🗑</button>
//                         <button onclick="SearchCarrer(${CarrerasCampo.CarreraID})">✏</button>
//                     </td>
                    
//                 </tr>
//                 `);
//             })
//         }
//     });
// }

// function CarreraBuscar(CarreraID) {
//     $.ajax({
//         // la URL para la petición
//         url: '../../Carrera/CarrerasBuscar',
//         // la información a enviar
//         // (también es posible utilizar una cadena de datos)
//         data: { CarreraID: CarreraID },
//         // especifica si será una petición POST o GET
//         type: 'POST',
//         // el tipo de información que se espera de respuesta
//         dataType: 'json',
//         // código a ejecutar si la petición es satisfactoria;
//         // la respuesta es pasada como argumento a la función
//         success: function (CarrerasListado) {
//             AbrirModal();
//             $("##CarreraModal").modal("show");
//             $("#CarreraNombre").val(CarrerasListado.carreranombre);
//             $("#CarreraDuracion").val(CarrerasListado.carreraduracion);
//             $("#CarreraHiddenInputID").val(CarrerasListado.CarreraID);
//         }
//     });
// }



// function CarreraGuardar() {
//     $("#lbl-error").text("");
//     let duracion = $("#CarreraDuracion").val();
//     let nombre = $("#CarreraNombre").val();
//     let id = $("#CarreraHiddenInputID").val();
//     $.ajax({
//         // la URL para la petición
//         url: '../../Carrera/CarreraGuardar',
//         // la información a enviar
//         // (también es posible utilizar una cadena de datos)
//         data: { CarreraID: carreraid, carreranombre: nombre, carreraduracion: duracion },
//         // especifica si será una petición POST o GET
//         type: 'POST',
//         // el tipo de información que se espera de respuesta
//         dataType: 'json',
//         // código a ejecutar si la petición es satisfactoria;
//         // la respuesta es pasada como argumento a la función
//         success: function (resultado) {
//             if (resultado.nonError) {
//                 CarrerasBuscar();
//                 $("#staticBackdrop").modal("hide");
//             } else {
//                 $("#lbl-error").text(resultado.MsjError);
//             }
//         },
//         error: function (xhr, status) {
//             alert('Error al cargar carreras');
//         },

//         // código a ejecutar sin importar si la petición falló o no
//         complete: function (xhr, status) {
//             //alert('Petición realizada');
//         }
//     });
// }











// function CarrerasBuscar() {
//     $("#btnEliminar").hide();
//     let TablaCarrera = $("#tbody-carreras");
//     TablaCarrera.empty();
//     $.ajax({
//         // la URL para la petición
//         url: '../../Carrera/BuscarCarreras',
//         // la información a enviar
//         // (también es posible utilizar una cadena de datos)
//         data: {},
//         // especifica si será una petición POST o GET
//         type: 'GET',
//         // el tipo de información que se espera de respuesta
//         dataType: 'json',
//         // código a ejecutar si la petición es satisfactoria;
//         // la respuesta es pasada como argumento a la función
//         success: function (carreras) {
//             TablaCarrera.empty();
//             $.each(carreras, function (index, carrera) {

//                 if (carrera.eliminado) {
//                     TablaCarrera.append(`
//                             <tr class="bg-danger">
//                                 <td> <a class=" btn btn-producto-cart" onClick="BuscarCarrera(${carrera.id})" role="button">${carrera.nombre}</a></td>
//                                 <td class="tdbasura"> 
//                                 <button class="delete-button btn btn-producto-cart" onClick="RemoveCarrera(${carrera.id})"> 
//                                 <i class="fa-solid fa-trash"></i>
//                                 </button>
//                                 </td>
//                             </tr>`);
//                 } else {
//                     TablaCarrera.append(`
//                             <tr class="fondo-tabla">
//                                 <td> <a class="btn btn-producto-cart" onClick="BuscarCarrera(${carrera.id})" role="button">${carrera.nombre}</a></td>
//                                 <td class="tdbasura"> 
//                                 <button class="delete-button btn btn-producto-cart" onClick="RemoveCarrera(${carrera.id})"> 
//                                 <i class="fa-solid fa-trash"></i>
//                                 </button>
//                                 </td>
//                             </tr>`);
//                 }
//             })

//         },
//     })
// }
// function GuardarCarrera() {
//     let Id = $("#Id").val();
//     let Nombre = $("#form-carrera input[name='Nombre']").val().toUpperCase();
//     $.ajax({
//         // la URL para la petición
//         url: '../../Carrera/GuardarCarrera',
//         // la información a enviar
//         // (también es posible utilizar una cadena de datos)
//         data: { id: Id, nombre: Nombre },
//         // especifica si será una petición POST o GET
//         type: 'POST',
//         // el tipo de información que se espera de respuesta
//         dataType: 'json',
//         // código a ejecutar si la petición es satisfactoria;
//         // la respuesta es pasada como argumento a la función
//         success: function (resultado) {
//             if (resultado.nonError) {
//                 Swal.fire({
//                     position: 'center',
//                     icon: 'success',
//                     title: 'Carrera Creada',
//                     showConfirmButton: false,
//                     timer: 1500
//                             })
//                 $("#ModalCarrera").modal("hide");
//                 BuscarCarreras();
//             }
//             else {
//                 // $("#lbl-error").text(resultado.msjError);
//                 Swal.fire({
//                     position: 'center',
//                     icon: 'error',
//                     title: 'Es necesario rellenar todos los campos!',
//                     showConfirmButton: false,
//                     timer: 1500
//                             })
//             }
//         },
//         error: function (xhr, status) {
//             alert('Error al cargar carreras');
//         },

//         // código a ejecutar sin importar si la petición falló o no
//         complete: function (xhr, status) {
//             //alert('Petición realizada');
//         }
//     });
// }
// $("#textoInput").on("input", function () {
//     var input = $(this);
//     var startPosition = input[0].selectionStart;  // Guardar la posición del cursor

//     input.val(input.val().toUpperCase());  // Convertir texto a mayúsculas

//     input[0].setSelectionRange(startPosition, startPosition);  // Restaurar la posición del cursor
// });