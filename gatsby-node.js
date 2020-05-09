/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreateWebpackConfig = require('./src/gatsby/node/onCreateWebpackConfig');
exports.onCreatePage = require('./src/gatsby/node/onCreatePage')