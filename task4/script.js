const btn = document.querySelector('.btn');
const infoGeolocation = document.querySelector('.geolocation');

const requestTimezone = (position) => {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	// async function req () {
	// 	let response = await fetch (`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`);
	// 	if (response.ok) {
	// 		let data = await response.json();
	// 		infoGeolocation.innerHTML = `Ваша временная зона: ${data.timezone};<br> 
	// 		Местное дата и время: ${data.date_time_txt}.`
	// 	} else {
	// 		console.log(`Ошибка ${response.status}`);
	// 		infoGeolocation.innerHTML = `Не удалось получить запрашиваемые данные.<br>
	// 		Ошибка ${response.status}`
	// 	}
	// }
	// req();
	
		fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
            .then((response) => {
                if (response.ok) {
					const result = response.json();
					return result;
				}
				throw new Error(`Ошибка: ${response.status}`);
            })
            .then((data) => {
                infoGeolocation.innerHTML = `Ваша временная зона: ${data.timezone};<br> 
				Местное дата и время: ${data.date_time_txt}.`
            })
            .catch((error) => {
				console.log(error);
				infoGeolocation.innerHTML = `Не удалось получить запрашиваемые данные.<br>${error.message}`
			});
		
}

const error = () => {
	infoGeolocation.innerHTML = 'Информация о местоположении недоступна';
}

btn.addEventListener('click', () => {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(requestTimezone, error);
	} else {
		error();
	}
})