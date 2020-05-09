/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import App from '@/App';

export const wrapPageElement = ({ element,props }) => {
  return <App {...props} element={element} />;
};
