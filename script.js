let formData = {};
const form = document.querySelector('form');
const LS = localStorage;

form.addEventListener('input', function(event) {
    formData[event.target.name] = event.target.value;
    LS.setItem('formData', JSON.stringify(formData));
});

if(LS.getItem('formData')) {
    formData = JSON.parse(LS.getItem('formData'));
    for(let key in formData) {
        form.elements[key].value = formData[key];
    }
}

$('input[name="checkbox"]').on("change", function (e) {
  if ($(this).is(":checked")) $(".button").attr("disabled", false);
  else $(".button").attr("disabled", true);
});

$(document).ready(function () {
  $(".formcarryForm").submit(function (event) {
    event.preventDefault();
    var href = $(this).attr("action");
    const data = new FormData(this);
    for (let value of data.values()) {
      console.log(value);
      if (value === "") {
        alert("Не все данные заполнены");
        return;
      }

    }

    fetch(href, {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      },
    })
    
    .then(response => {
      if (response.ok) {
        return response.json(); 
      }
      throw new Error('Network response was not ok.');
    })
    .then(json => {
      console.log("Успех:", json);
      alert('Форма успешно отправлена');
    })
    .catch(error => {
      console.error("Ошибка:", error);
      alert('Произошла ошибка при отправке формы');
    });
  });
});

document.querySelector("button").onclick = insertPlans;

function insertPlans() {
  document.getElementById("plans").classList.remove("d-none");
}