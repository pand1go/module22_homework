const btnSend = document.querySelector('.send');
const btnGeo = document.querySelector('.geo');
const chat = document.querySelector('.chat');
const input = document.querySelector('.form-control');
let websocket = new WebSocket("wss://echo-ws-service.herokuapp.com/");

function addMessage(typeMessage, text){
	let message = document.createElement('div');
		message.classList.add('message');
		message.classList.add(typeMessage);
		message.innerHTML = text;
		chat.appendChild(message);
}

function onMessage (event) {
	addMessage('receiveMs', event.data);
};

function onError(event) {
	addMessage('receiveMs', `Ошибка: ${event.data}`);
};

function onClose(event) {
	addMessage('receiveMs', 'Соединение разорвано');
};

btnSend.addEventListener('click', () => {
	let sendText = input.value;
	websocket.addEventListener('message', onMessage);
	websocket.addEventListener('error', onError);
	websocket.addEventListener('close', onClose);
	if (sendText) {
		addMessage('sendMs', sendText);
		websocket.send(sendText);
	}
	
});

const success = (position) => {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	websocket.send(`Долгота: ${longitude}, Широта: ${latitude}`);
	addMessage('sendMs', `<a href='https://www.openstreetmap.org/#map=16/${latitude}/${longitude}' target="_blank">Геолокация</a>`);
}

const error = () => {
	websocket.send('Информация о местоположении недоступна');
	addMessage('sendMs', 'Информация о местоположении недоступна');
}

btnGeo.addEventListener('click', () => {
	websocket.removeEventListener('message', onMessage);
	websocket.removeEventListener('error', onError);
	websocket.removeEventListener('close', onClose);
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(success, error);
	} else {
		error();
	}
})