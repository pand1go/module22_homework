const btn = document.querySelector('.btn');
const infoScreen = document.querySelector('.screen');
const infoGeolocation = document.querySelector('.geolocation');

const success = (position) => {
	console.log('position', position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	infoGeolocation.innerHTML = `Координаты вашего местонахождения:<br>Широта: ${latitude} °;<br>Долгота: ${longitude} °`;
}

const error = () => {
	infoGeolocation.innerHTML = 'Информация о местоположении недоступна';
}

btn.addEventListener('click', () => {
	infoGeolocation.innerHTML = '';
	infoScreen.textContent = '';
	infoScreen.innerHTML = `Размеры экрана вашего устройтва: ${window.screen.width} x ${window.screen.height}`
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(success, error);
	} else {
		error();
	}
})