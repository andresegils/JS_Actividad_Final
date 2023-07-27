$(document).ready(() => {
    $.ajax({
        url: 'https://andresegil.pythonanywhere.com/api/consultar/personas/',
        type: 'GET',
        success: function ({res}, textStatus, xhr) {
            const datos = res;
            for(let i = 0; i < datos.length; i++){
              let actual = datos[i];
              console.log(actual);
              $('#body').append(`
                <tr>
                  <td>${actual.tipo}${actual.cedula}</td>
                  <td>${actual.nombre.toUpperCase()}</td>
                  <td>${actual.apellido.toUpperCase()}</td>
                  <td>${actual.genero === 'H' ? 'Hombre' : 'Mujer'}</td>
                  <td><a id="modificar_${actual.id}" class="btn btn-success">Editar</a> </td>   
                  <td><a id="eliminar_${actual.id}" class="btn btn-danger">Eliminar</a></td>
                </tr>   

                <script>
                  $('#modificar_${actual.id}').click((e) => {
                    e.preventDefault();
                    localStorage.setItem('modificar', ${actual.id});
                    window.location.replace("/editar/modificar_persona.html");
                  });

                  $('#eliminar_${actual.id}').click((e) => {
                    e.preventDefault();
                    $.ajax({
                      url: 'https://andresegil.pythonanywhere.com/api/eliminar/persona/${actual.id}/',
                      type: 'POST',
                      success: function ({res}, textStatus, xhr) {
                          alert("Eliminado Exitosamente");
                          location.reload();
                      },
                      error: function (xhr, textStatus, errorThrown) {
                          console.log(xhr);
                      },
                      async: true
                  });
                });
                </script>
              `);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: true
    })
});