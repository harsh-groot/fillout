const express = require('express');
const axios = require('axios');
const applyFilters = require('../filters');
function routes() {
  const formsRouter = express.Router();

  formsRouter.route('/:formId/filteredResponses')
    .get(async (req, res) => {

      const authHeader = req.headers['authorization'];

      // Check if the authorization header exists
      if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
      }

      // Extract the bearer token
      const token = authHeader.split(' ')[1];

      // Check if token exists
      if (!token) {
        return res.status(401).json({ error: 'Bearer token is missing' });
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await axios.get('https://api.fillout.com/v1/api/forms/' + req.params.formId + '/submissions', { headers });

      // Extract the data from the response
      let responseData = response.data;

      //console.log(responseData);

      const result = responseData.responses.map(o => {
        var filteredObjects = applyFilters(o.questions, (req.query.filters && JSON.parse(req.query.filters)) || []);
        o.questions = filteredObjects;
        return o;
      });

      responseData.responses = result;
      return res.json(responseData);

    });

  return formsRouter;
}

module.exports = routes;