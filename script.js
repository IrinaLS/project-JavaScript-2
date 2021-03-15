	const form = document.querySelector("form");
	const inputName = document.querySelector("#name");
	const inputEmail = document.querySelector("#email");
	const inputPhone = document.querySelector("#phone");
	const regexpName = /[a-zA-Z]+/;
	const regexpEmail = /my\-?\.?mail@mail.ru/;
	const regexpPhone = /\+[7]\(\d{3}\)\d{3}-\d{4}/;
	form.addEventListener('submit', () => {
	    let result = "";
	    if (regexpName.test(inputName.value)) result = "Name данные приняты. "
	    else {
	        result = "Ошибка ввода имени. "
	    };
	    if (regexpEmail.test(inputEmail.value)) result = result + "Email данные приняты. "
	    else result = result + "Ошибка ввода электронного адреса. ";
	    if (regexpPhone.test(inputPhone.value)) result = result + "Phone данные приняты. "
	    else result = result + "Ошибка ввода номера телефона. ";
	    alert(result);
	})