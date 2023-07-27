let personas_registradas;
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

    for(let i = 0; i < personas_registradas.length; i++)
      if(personas_registradas[i].id == modificar){
        let actual = personas_registradas[i];
        $('#tipo').val(actual.tipo);
        $('#cedula').val(actual.cedula);
        $('#nombre').val(actual.nombre);
        $('#apellido').val(actual.apellido);
        $('#genero').val(actual.genero);
      }
});


$('form').submit((e) => {
  e.preventDefault();

  $(document).ready(() => {
    $.ajax({
        url: `https://andresegil.pythonanywhere.com/api/modificar/persona/${modificar}/`,
        type: 'POST',
        data: {
          'genero': $('#genero').val(),
          'nombre': $('#nombre').val(),
          'apellido': $('#apellido').val(),
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