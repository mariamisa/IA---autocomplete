const path = require('path');
const {
  handelHome, handelPublic, handelSearch, handelError,
} = require('./handler');

const router = (request, response) => {
  const endpoint = request.url;
  const requestMethod = request.method;

  if (endpoint === '/') {
    handelHome(response);
  } else if (path.extname(endpoint)) {
    handelPublic(response, endpoint);
  } else if (endpoint === '/search-countries' && requestMethod === 'POST') {
    handelSearch(request, response);
  } else {
    handelError(response);
  }
};

module.exports = router;
