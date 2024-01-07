$('input[name="checkbox"]').on("change", function (e) {
  if ($(this).is(":checked")) $(".button").attr("disabled", false);
  else $(".button").attr("disabled", true);
});


$(document).ready(function() {
  $('.formcarryForm').submit(function(event) {
    event.preventDefault();
    var href = $(this).attr("action");
    const data = new FormData(this);

    try {
      for (value of data.values()) {
        if (value == "") throw new Error("field validtaion error");
      }
    } catch (error) {
      alert("Не все данные заполнены");
      console.log(error);
      return;
    }

    $.ajax({
      type: "POST", 
      url: href, 
      data: data, 
      contentType: false, 
      processData: false, 
      headers: {
        'Accept': 'text/html'
      },
      success: function(response) {
        alert('Форма успешно отправлена');
      },
      error: function(error) {
        alert('Произошла ошибка при отправке формы\nно мы разберемся!');
      }
    });
  });
});
