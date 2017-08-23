$('#registration-form').submit(event => {
	event.preventDefault();
	const formObj = {};
	for (let input of event.target) {
		if (input.name !== '' && input.value !== '') {
			formObj[input.name] = input.value;
		}
	}

	axios.post('/signin', formObj).then(res => {
		location.href = '/login';
	});
});
