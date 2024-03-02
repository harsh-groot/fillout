const express = require('express');
const axios = require('axios');
const applyFilters = require('../filters');
function routes() {
  const formsRouter = express.Router();

  formsRouter.route('/forms')
    .get(async (req, res) => {
      const token = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912';
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await axios.get('https://api.fillout.com/v1/api/forms/' + req.query.formId, { headers });

      // Extract the data from the response
      let responseData = response.data;
      console.log("dasdad", req.query.formId)
      // req.filters = [
      //   {
      //     id: "id",
      //     condition: "equals",
      //     value: "4KC356y4M6W8jHPKx9QfEy",
      //   }
      // ];

      var filteredObjects = applyFilters(responseData, JSON.parse(req.query.filters) || []);

      return res.json(filteredObjects);
    });

  return formsRouter;
}

module.exports = routes;