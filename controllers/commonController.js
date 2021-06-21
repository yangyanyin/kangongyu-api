const Joi = require('joi');
const formidable = require('formidable')
const fs  = require('fs')
const commonServer = require('../server/commonServer')


// 上传图片
module.exports.uploadImage = (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = './public/images/' // 上传地址
  form.maxFieldsSize = 2 * 1024 * 1024; // 单位为byte
  form.type = true;
  form.keepExtensions = true; //保留后缀
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.send(err)
      return
    }
    var extName = ''  //后缀名
    switch (files.image.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg'
        break
      case 'image/png':
        extName = 'png'
        break
      case 'image/x-png':
        extName = 'png'
        break
    }
    let avatarName = '/' + Date.now() + '.' + extName;  //将文件名变为时间戳的形式
    let newPath = form.uploadDir + avatarName; 
    fs.renameSync(files.image.path, newPath); //重命名
    res.json({
      code: 200,
      data: {
        url: `http://localhost:4000/images${avatarName}`
      },
      status: 'success'
    })
  })
}

// 获取筛选向
module.exports.filter = (req, res) => {
  const schema = Joi.object({
    type: Joi.string()
  })
  const { error, value } = schema.validate(req.query)
  if (error) {
    res.json({
      msg: error
    })
  } else {
    const area = commonServer.getFilterArea(value)
    const house = commonServer.getFilterHouse(value)
    const price = commonServer.getFilterPrice(value)
    const region = commonServer.getFilterRegion(value)
    Promise.all([area, house, price, region]).then(results => {
      res.json({
        code: 200,
        data: {
          area: results[0],
          house: results[1],
          price: results[2],
          region: results[3]
        }
      })
    })
  }
}