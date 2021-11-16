const siteUrl = "https://motionbox.uz";
module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            { userAgent: "*", disallow: "/admin*" },
            { userAgent: "*", allow: "/" }
        ],
        additionalSitemaps: [
            `${siteUrl}/server-seitemap.xml`
        ]
    },
    exclude: ['/admin*']
}