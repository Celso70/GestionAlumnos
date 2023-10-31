window.onload = BuscarTareas();

function AbrirModal() {
    $("#TareaHiddenInputID").val(`0`);
    $("#TareaModal").modal("show");
    $("#TareaModalLabel").text("Agregar Tarea");
    $("#TareaTitulo").val("")
    $("#TareaFechaCarga").val("")
    $("#TareaFechaVencimiento").val("")
    $("#TareaDescripcion").val("")
    $("#InputDireccion").val("")
}

function TareasBuscar(id) {
    let TareaTabla = $("#TareaTabla");
    TareaTabla.empty();
    $.ajax({
        // la URL para la petición
        url: '../../Tarea/TareasBuscar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { Id: id },
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        success: function (TareasListado) {
            TareaTabla.empty();
            $.each(TareasListado, function (index, tarea) {
                    if (tarea.eliminado) {
                        TareaTabla.append(`
                                <tr class="bg-danger">
                                    <th scope="row">${tarea.tareaID}</th>
                                    <td>${tarea.tareaFechacarga}</td>
                                    <td>${tarea.tareaFechavencimiento}</td>
                                    <td>${tarea.tareaDescripcion}</td>
                                    <td>${tarea.asignaturaID}</td>
                                    <td>                      
                                        <td><button onclick="TareaRemover(${tarea.tareaID})">🗑Eliminar</button></td>
                                        <td><button onclick="TareaEliminar(${tarea.tareaID})">✔</button></td>
                                    </td>
                                    </tr>`);
                    } else {
                        TareaTabla.append(`
                                <tr>
                                <th scope="row">${tarea.tareaID}</th>
                                    <td>${tarea.tareaFechacarga}</td>
                                    <td>${tarea.tareaFechavencimiento}</td>
                                    <td>${tarea.tareaDescripcion}</td>
                                    <td>${tarea.asignaturaID}</td>
                                    <td>
                                    <td><button onclick="TareaBuscar(${tarea.tareaID})">✍Editar</button></td>                   
                                        <td><button onclick="TareaRemover(${tarea.tareaID})">🗑Eliminar</button></td>
                                        <td><button onclick="TareaEliminar(${tarea.tareaID})">✔</button></td>
                                    </td>
                                    
                                </tr>`);
                    }
                })
            
            
        },
        error: function (xhr, status) {
            alert('Error al cargar asignaturas del profe');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    })
}