/* 1.Я тут не очень поняла идею. Получилось, что fetch обернули в функцию, которая делает то же самое, что fetch
* 2. Сейчас без перезагрузки страницы форму успешно можно отправить
* только один раз. После закрытия попапа, если снова запролнить форму и нажать Опубликовать,
* ничего не происходит. Не могу найти причину*/

const getData = (url) => {
  return fetch(url);
}

const processData = (url, onSuccess, onFail) => {
  getData(url)
    .then ((response => {
      if (response.ok) {
        return response.json();
      }
      onFail(`Не удалось загрузить данные об объектах: ${response.text}`);
    }))
    .then(onSuccess)
    .catch(onFail);
}

/*Здесь тоже не поняла. По сути дублируем функционал fetch*/
const sendData = (url, body) => {
  return fetch(
    url,
    {
      method: 'POST',
      body,
    },
  )
}

const postData = (url, onSuccess, onFail, body) => {
  sendData(url, body)
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      onFail();
    })
    .catch(onFail);
};

export { processData, postData };



