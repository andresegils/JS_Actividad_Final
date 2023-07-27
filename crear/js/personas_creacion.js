let personas;

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

const encontrar = (tipo, cedula) => {
  return personas.some((p) => p.tipo === tipo && p.cedula === cedula);
};

$('form').submit((e) => {
  e.preventDefault();

  if(personas && encontrar($('#tipo').val(), $('#cedula').val())){
    alert("Ya existe una persona registrada con esa cédula.");
    return false;
  } else if(!personas){
    alert("NO HAY PERSONAS REGISTRADAS. REGISTRE AL DUEÑO ANTES DE REGISTRAR SU VEHÍCULO.");
    return false;
  }

  $(document).ready(() => {
    $.ajax({
        url: 'https://andresegil.pythonanywhere.com/api/crear/persona/',
        type: 'POST',
        data: {
          'tipo': $('#tipo').val(),
          'cedula': $('#cedula').val(),
          'genero': $('#genero').val(),
          'nombre': $('#nombre').val(),
          'apellido': $('#apellido').val(),
        },
        success: function (res, textStatus, xhr) {
            console.log(res);
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
    });
  });

  alert("Creado exitosamente.")
  window.location.replace("/");
});