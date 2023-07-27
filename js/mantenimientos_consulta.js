$(document).ready(() => {
    let mantenimientos = undefined; 
    let vehiculos = undefined;

    $.ajax({
        url: 'https://andresegil.pythonanywhere.com/api/consultar/mantenimientos/',
        type: 'GET',
        success: function ({res}, textStatus, xhr) {
            mantenimientos = res;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: false
    });

    $.ajax({
      url: 'https://andresegil.pythonanywhere.com/api/consultar/vehiculos/',
      type: 'GET',
      success: function ({res}, textStatus, xhr) {
          vehiculos = res;
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log(xhr);
      },
      async: false
    });

    const conseguir = (id) => {
      for(let i = 0; i < vehiculos.length; i++){
        if(vehiculos[i].id == id)
          return {'placa': vehiculos[i].placa};
      }
    };

    for(let i = 0; i < mantenimientos.length; i++){
      let actual = mantenimientos[i];
      let vehiculo = conseguir(mantenimientos[i].vehiculo_id);

      $('#body').append(`
        <tr>
          <td>${vehiculo.placa}</td>
          <td>${actual.fecha}</td>
          <td>${actual.tipo == 'P' ? 'Preventivo' : 'Correctivo'}</td>
          <td>${actual.estado == 'P' ? 'Pendiente' : actual.estado == 'F' ? 'Finalizado' : 'Cancelado'}</td>
          <td><a id="modificar_${actual.id}" class="btn btn-success">Editar</a></td>
          <td><a id="eliminar_${actual.id}" class="btn btn-danger">Eliminar</a></td>
        </tr>   

        <script>
          $('#modificar_${actual.id}').click((e) => {
            e.preventDefault();
            localStorage.setItem('modificar', ${actual.id});
            window.location.replace("/editar/modificar_mantenimiento.html");
          });

          $('#eliminar_${actual.id}').click((e) => {
            e.preventDefault();
            
            $.ajax({
              url: 'https://andresegil.pythonanywhere.com/api/eliminar/mantenimiento/${actual.id}/',
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
});