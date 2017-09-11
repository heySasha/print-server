$( "#login-form" ).submit(event => {
    event.preventDefault();

    console.log(event.target.email.value);
    console.log(event.target.password.value);

    axios.post('/login', {
        email: event.target.email.value,
        password: event.target.password.value
    }).then(res => {
        location.href = '/profile';
    });
});