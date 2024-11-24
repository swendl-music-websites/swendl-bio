module.exports = {
   async redirects() {
     return [
       {
         source: '/music/:slug*',
         destination: '/:slug*',
         permanent: true,  // Use permanent redirect for SEO
       },
       {
         source: '/contact/:slug*',
         destination: '/music/:slug*',
         permanent: true,  // Use permanent redirect
       },
       {
         source: '/success/:slug*',
         destination: '/success/:slug*',
         permanent: true,  // Keep this page as-is but ensure a permanent redirect for SEO
       },
       {
         source: '/shop/:slug*',
         destination: '/shop/:slug*',
         permanent: true,  // Keep this page as-is, permanent redirects are still useful
       },
       {
         source: '/blog/:slug*',
         destination: '/blog/:slug*',
         permanent: true,  // Use a permanent redirect for blogs as well
       },
     ];
   },
 };
 