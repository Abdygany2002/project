document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault();  // Предотвращаем стандартное поведение формы

    let isValid = true;

    // Список всех полей формы
    const fields = [
        'lastName', 'firstName', 'middleName', 'birthDate', 'gender',
        'passportNumber', 'issueDate', 'divisionCode', 'issuedBy',
        'registrationAddress', 'phoneNumber', 'email'
    ];

    // Очистка ошибок
    fields.forEach(field => {
        const input = document.getElementById(field);
        const errorMessage = document.getElementById(`${field}Error`);
        errorMessage.style.display = 'none';
        input.classList.remove('error');

        // Проверка на заполнение
        if (!input.value.trim()) {
            errorMessage.textContent = 'Поле обязательно для заполнения';
            errorMessage.style.display = 'block';
            input.classList.add('error');
            isValid = false;
        }
    });

    // Проверка телефона
    const phoneNumber = document.getElementById('phoneNumber');
    if (!/^\+7\d{10}$/.test(phoneNumber.value)) {
        document.getElementById('phoneNumberError').textContent = 'Введите номер в формате "+7XXXXXXXXXX" (10 цифр после +7)';
        document.getElementById('phoneNumberError').style.display = 'block';
        phoneNumber.classList.add('error');
        isValid = false;
    }

    // Проверка email
    const email = document.getElementById('email');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').textContent = 'Введите корректный адрес электронной почты';
        document.getElementById('emailError').style.display = 'block';
        email.classList.add('error');
        isValid = false;
    }

    // Если форма не прошла валидацию, не отправлять данные
    if (!isValid) return;

    // Сбор данных для отправки
    const data = {};
    fields.forEach(field => {
        data[field] = document.getElementById(field).value.trim();
    });

    // Отправка данных методом POST
    fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                // Показ сообщения об успешной отправке
                document.getElementById('successMessage').textContent = 'Данные успешно отправлены!';
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('errorMessage').style.display = 'none';
            } else {
                // Обработка ошибки от сервера
                return response.json().then(err => {
                    throw new Error(err.message || 'Ошибка при отправке данных');
                });
            }
        })
        .catch(error => {
            // Показ ошибки отправки
            document.getElementById('errorMessage').textContent = `Ошибка: ${error.message}`;
            document.getElementById('errorMessage').style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
        });
});
