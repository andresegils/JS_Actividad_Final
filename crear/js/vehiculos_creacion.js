let personas_registradas;
let vehiculos_registrados;

$(document).ready(() => {
    $.ajax({
        url: 'https://andresegil.pythonanywhere.com/api/consultar/personas/',
        type: 'GET',
        success: function ({res}, textStatus, xhr) {
            personas_registradas = res;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: true
    });
});

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
      async: true
  });
});


const consigue_persona = (tipo, cedula) => {
  return personas_registradas.some((p) => p.tipo === tipo && p.cedula === cedula);
};

const consigue_vehiculo = (placa) => {
  return vehiculos_registrados.some((p) => p.placa === placa);
};

$('form').submit((e) => {
  e.preventDefault();

  if(!consigue_persona($('#tipo').val(), $('#cedula').val())){
    alert("No existe una persona registrada con esa cédula.");
    return false;
  }

  if(consigue_vehiculo($('#placa').val())){
    alert("Ya existe un vehículo registrado con esa placa.");
    return false;
  }

  $(document).ready(() => {
    $.ajax({
        url: 'https://andresegil.pythonanywhere.com/api/crear/vehiculo/',
        type: 'POST',
        data: {
          'tipo': $('#tipo').val(),
          'cedula': $('#cedula').val(),
          'placa': $('#placa').val(),
          'marca': $('#marca').val(),
          'modelo': $('#modelo').val(),
          'color': $('#color').val(),
        },
        success: function (res, textStatus, xhr) {
            console.log(res);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        },
        async: false
    });
  });

  alert("Creado exitosamente.")
  window.location.replace("/");
});