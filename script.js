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

// недоделанный histotyAPI
// const contentElement = document.getElementById("content");  

// const pages = { 
//     home: { content: "Home Page", url: "#home"},      
//     about: { content: "About Page", url: "#about"  },
//     contacts: { content: "Contact Page", url: "#contacts"}   
// };  

// function handleClick(event){
//     const url = event.target.getAttribute("href");
//     const pageName = url.split("#").pop();
//     const page = pages[pageName];
//     if(history.state.url != url) {
//         contentElement.textContent = page.content;   
//         history.pushState(page,     
//             event.target.textContent,     
//             event.target.href        
//         );
//         document.title = event.target.textContent;
//     }
//     return event.preventDefault();  
// }  

// window.addEventListener("popstate", (event) => { 
//     if(event.state)
//         contentElement.textContent = event.state.content;
// });

// const links = document.getElementsByTagName("a"); 
// for (let i = 0; i < links.length; i++) {
//     links[i].addEventListener("click", handleClick, true);  
// } 

// contentElement.textContent = pages.home.content;  
// history.pushState(pages.home, "Home", pages.home.url);