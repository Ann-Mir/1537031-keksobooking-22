const GET_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(GET_URL)
    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        onFail(`Не удалось загрузить данные об объектах: ${response.text}`);
      }
    })
    .then((advertisements) => {
      onSuccess(advertisements);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные об объектах.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };



