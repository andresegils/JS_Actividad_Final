let vehiculos_registrados;
let mantenimientos_registrados;
const modificar = localStorage.getItem('modificar');

$(document).ready(() => {
    $.ajax({
        url: 'https://andresegil.pythonanywhere.com/api/consultar/vehiculos/',
        type: 'GET',
        success: function ({res}, textStatus, xhr) {
            vehiculos_registrados = res;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: false
    });
});

$(document).ready(() => {
  $.ajax({
      url: 'https://andresegil.pythonanywhere.com/api/consultar/mantenimientos/',
      type: 'GET',
      success: function ({res}, textStatus, xhr) {
          mantenimientos_registrados = res;
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log(xhr);
      },
      async: false
  });

  for(let i = 0; i < mantenimientos_registrados.length; i++)
      if(mantenimientos_registrados[i].id == modificar){
        let actual = mantenimientos_registrados[i];

        for(let i = 0; i < vehiculos_registrados.length; i++)
          if(vehiculos_registrados[i].id == actual.vehiculo_id)
            $('#placa').val(vehiculos_registrados[i].placa);

        $('#tipo').val(actual.tipo);
        $('#fecha').attr('value', actual.fecha.substring(0,actual.fecha.length-1));
        $('#resultados').val(actual.resultados);
        $('#estado').val(actual.estado);
      }
});

const consigue_vehiculo = (placa) => {
  return vehiculos_registrados.some((p) => p.placa.toUpperCase() === placa.toUpperCase());
};

$('form').submit((e) => {
  e.preventDefault();

  if(!consigue_vehiculo($('#placa').val().toUpperCase())){
    alert("No hay ningún vehículo con la placa introducida registrado.");
    return false;
  }

  $(document).ready(() => {
    $.ajax({
        url: `https://andresegil.pythonanywhere.com/api/modificar/mantenimiento/${modificar}/`,
        type: 'POST',
        data: {
          'vehiculo': $('#placa').val(),
          'fecha': $('#fecha').val(),
          'tipo': $('#tipo').val(),
          'estado': $('#estado').val(),
          'resultados': $('#resultados').val(),
        },
        success: function (res, textStatus, xhr) {
            console.log(res);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: true
    });
  });

  alert("Modificado exitosamente.")
  window.location.replace("/");
});