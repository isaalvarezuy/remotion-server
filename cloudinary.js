const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: "isita",
  api_key: "739813596913426",
  api_secret: "_nBKrqtVT8ZZW5zK_jmT8KrICXc",
})

module.exports = { cloudinary }