$("#user_comment").validate({
  rules: {
    comment: {required: true},
    rating: {required: true, number: true, min: 1, max:10}
  },
  messages: {
    comment: "Please enter a comment",
    rating: {required: "Please enter a rating", number: "Please enter a number"}
  },
  submitHandler: (form, event) => {
    event.preventDefault();
    postData();
  }
});

const postData = () => {
  const reviewId = $('#user_comment').data('id');
  const comment = {
    reviewId,
    reviewTitle: $('#review_title').val(),
    body: $('#body').val(),
    rating: $('#rating').val()
  };

  $.ajax({
    type: 'POST',
    url: `/reviews/${reviewId}/comment`,
    data: JSON.stringify(comment),
    contentType: 'application/json'
  })
  .done((data, textStatus, jqXHR) => {
    alert(`1. ${data._id}\n2. ${textStatus}\n3. ${jqXHR.responseText}`);
    window.location.reload(false);
  })
  .fail((jqXHR, textStatus, errorThrown) => {
    alert(`1. ${jqXHR.responseText}\n2. ${textStatus}\n3. ${errorThrown}`);
  });
};
