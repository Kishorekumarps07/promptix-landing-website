export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json({
        mongodbConfigured: !!process.env.MONGODB_URI,
        jwtConfigured: !!process.env.JWT_SECRET,
        mongodbPrefix: process.env.MONGODB_URI?.substring(0, 20) || 'not set',
        nodeVersion: process.version,
        platform: process.platform
    });
}
