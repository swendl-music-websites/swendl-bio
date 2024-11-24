import { redirect } from '@lib/utils'; // Import the utility function to handle redirection

export default async function handler(req, res) {
  // Redirect all requests to the main page
  await redirect('/', res);
}
