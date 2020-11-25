const search = document.querySelector('.search');

function fetch(url, value, method, cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, JSON.parse(xhr.responseText));
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(value));
}

function renderData(countries) {
  // render data on dom
  console.log(countries);
}

search.addEventListener('input', (e) => {
  const sValue = e.target.value;
  fetch('/search-countries', sValue, 'POST', (error, data) => {
    if (error) {
      document.getElementById('error').textContent = error;
    } else {
      renderData(data);
    }
  });
});
