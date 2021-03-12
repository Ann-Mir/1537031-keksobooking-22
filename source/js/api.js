const getData = (url, onSuccess, onFail) => {
  fetch(url)
    .then ((response => {
      if (response.ok) {
        return response.json();
      }
      onFail(`Не удалось загрузить данные об объектах: ${response.text}`);
    }))
    .then(onSuccess)
    .catch(onFail);
};

const sendData = (url, onSuccess, onFail, body) => {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      onFail();
    })
    .catch(onFail);
};


export { getData, sendData };
