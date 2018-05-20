$('#login_form').on('submit', (event) => {
  event.preventDefault();
  const user = {
    email: $('#email').val(),
    pwd: $('#password').val()
  }

  $.ajax({
    type: 'POST',
    url: '/auth/login',
    data: JSON.stringify(user),
    contentType: 'application/json'
  })
  .done((data, textStatus, jqXHR) => {
    alert(`1. ${data._id}\n2. ${textStatus}\n3. ${jqXHR.responseText}`);
    window.location.href = '/reviews';
  })
  .fail((jqXHR, textStatus, errorThrown) => {
    alert(`1. ${jqXHR.responseText}\n2. ${textStatus}\n3. ${errorThrown}`);
  });
})
