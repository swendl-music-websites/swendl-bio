// utils/utils.js

import { parse } from 'url';

export async function redirect(destination, res) {
  // Ensure that the response is not cached
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  // Perform the redirection
  res.statusCode = 302;
  res.setHeader('Location', destination);
  res.end();
}
