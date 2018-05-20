$("#review_form").validate({
  rules: {
    title: {required: true},
    body: {required: true},
    rating: {required: true, number: true, min: 1, max:10}
  },
  messages: {
    title: "Please enter a title",
    body: "Please enter a review",
    rating:{required: "Please enter a rating", number: "Please enter a number"}
  },
  submitHandler: (form, event) => {
    event.preventDefault();
    postData();
  }
});

const postData = () => {
  const review = {
    title: $('#title').val(),
    body: $('#body').val(),
    rating: $('#rating').val()
  };

  $.ajax({
    type: 'POST',
    url: '/admin/dashboard/add',
    data: JSON.stringify(review),
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
