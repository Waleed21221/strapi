const {createCoreController} = require('@strapi/strapi').factories;
const moduleUid = 'custom.export';

const { Parser } = require('json2csv');

module.exports = {
  async exportData(ctx) {
    // Fetch data from your content types
    const data = await strapi.query('api::customer.customer').findMany({
        populate: {
            answers: true,
          }
    });

    // Convert data to CSV format
    const fields = Object.keys(data[0]); // Assuming all objects have the same structure
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    // Send the CSV file as a response
    ctx.attachment('export.csv');
    ctx.body = csv;
  },
};