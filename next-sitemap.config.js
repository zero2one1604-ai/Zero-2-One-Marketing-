/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://saaviskincare.com",
  generateRobotsTxt: true,

  sitemapSize: 7000,

  changefreq: "weekly",
  priority: 0.7,

  exclude: [
    "/admin",
    "/admin/*",
    "/account",
    "/account/*",
    "/order",
    "/order/*",
    "/orders",
    "/orders/*",
    "/checkout",
    "/checkout/*",
    "/auth",
    "/auth/*",
    "/api/*",
    "/_not-found",
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/admin",
          "/account",
          "/order",
          "/orders",
          "/checkout",
          "/auth",
          "/api",
        ],
      },
    ],
  },
};
