let personas_registradas;
let vehiculos_registrados;
const modificar = localStorage.getItem('modificar');

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
        async: false
    });
});

$(document).ready(() => {
  $.ajax({
      url: 'https://andresegil.pythonanywhere.com/api/consultar/vehiculos/',
      type: 'GET',
      success: function ({res}, textStatus, xhr) {
          vehiculos_registrados = res;
          console.log(modificar);
      },
      error: function (xhr, textStatus, errorThrown) {
          console.log(xhr);
      },
      async: false
  });

  console.log("???????????????????????????????");

  for(let i = 0; i < vehiculos_registrados.length; i++){
    if(vehiculos_registrados[i].id == modificar){
      let actual = vehiculos_registrados[i];
      for(let j = 0; j < personas_registradas.length; j++){
        if(personas_registradas[j].id == actual.dueno_id){
          let persona_actual = personas_registradas[j];
          console.log(persona_actual);
          console.log(actual);
          $('#tipo').val(persona_actual.tipo);
          $('#cedula').val(persona_actual.cedula);
          $('#placa').val(actual.placa);
          $('#modelo').val(actual.modelo);
          $('#marca').val(actual.marca);
          $('#color').val(actual.color);
          return;
        }
      }      
    }
  }
});


const consigue_persona = (tipo, cedula) => {
  return personas_registradas.some((p) => p.tipo === tipo && p.cedula === cedula);
};

$('form').submit((e) => {
  e.preventDefault();

  if(!consigue_persona($('#tipo').val(), $('#cedula').val())){
    alert("No existe una persona registrada con esa cédula.");
    return false;
  }

  $.ajax({
      url: `https://andresegil.pythonanywhere.com/api/modificar/vehiculo/${modificar}/`,
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

  alert("Modificado exitosamente.")
  window.location.replace("/");
});