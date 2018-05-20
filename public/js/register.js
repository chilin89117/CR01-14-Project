$("#register_form").validate({
  rules: {
    username: {required: true, minlength: 6, maxlength: 20},
    firstname: {required: true, minlength: 2, maxlength: 40},
    lastname: {required: true, minlength: 2, maxlength: 40},
    email: {required: true, email: true},
    password: {required: true, minlength: 6, maxlength: 20},
    password_confirm: {required: true, minlength: 6, maxlength: 20, equalTo: "#password"}
  },
  messages: {
    username: "Please add a username",
    firstname: "Please enter your first name",
    lastname: "Please enter your last name",
    email: "Please enter a valid email",
    password: {required: "The password is required", minlength: "The min is 6 characters"},
    password_confirm: "Password is not the same :S"
  },
  submitHandler: (form, event) => {
    event.preventDefault();
    submitForm();
  }
});

const submitForm = () => {
  const user = {
    uname: $('#username').val(),
    fname: $('#firstname').val(),
    lname: $('#lastname').val(),
    email: $('#email').val(),
    pwd: $('#password').val(),
  };

  $.ajax({
    type: 'POST',
    url: '/auth/register',
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
};
