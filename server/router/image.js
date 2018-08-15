const fs = require('fs'); // 读写文件操作
const mkdirp = require('mkdirp'); //递归创建文件夹
const qr = require('qr-image');
const sharp = require('sharp');
const path = require('path');
const Rjson = require('../util/rejson');
const Text2SVG = require("text-to-svg");
const async = require('async');
const request = require('request');

// 所有画图的总结
const utils = {
  saveQrcodePath: path.join(__dirname, '../static/images/qrcode/'), // 生成的二维码图片保存的路劲
  saveWaterPath: path.join(__dirname, '../static/images/water/'), // 生成的海报图片保存的路劲
  backgroundPath: path.join(__dirname, '../static/images/background/'), // 海报背景图片地址
  savePosterPath: path.join(__dirname, '../static/images/poster/') // 最终海报
}

// 背景图
const bgPath = path.join(__dirname, '../static/images/background/test.jpeg');
const convert2Sharp = (inputImg) => {
  return sharp(inputImg);
}


const existsDir = (filePath, CALLBACK) => {
  if (!fs.existsSync(filePath)) {
    mkdirp.sync(filePath, (err) => {
      if (err) {
        console.error(err);
        CALLBACK(err, null);
        return;
      }
    })
  }
}


// 下载图片的函数，用来可以上传图片链接 然后缓存在本地，比如上传头像，上传微信二维码等。。。但是又文件缓存的过程暂时没用
const downLoadBuffer = () => {
  var url = 'http://p5vxzph29.bkt.clouddn.com/test.jpeg';
  // 路劲
  let saveImgPath = path.join(__dirname, '../static/images/saveImg/');
  // 建立路劲
  existsDir(saveImgPath, () => {});
  let pictureImg = path.join(__dirname, '../static/images/saveImg/efged.png');
  request(url).pipe(fs.createWriteStream(pictureImg))
  // 删除图片
  // fs.unlinkSync(pictureImg);
}


// 生成邀请链接二维码
utils.createQr = async (USERINFO, CALLBACK) => {
  const invitationUrl = USERINFO.qrUrl;
  const qrPng = qr.image(invitationUrl, {
    type: 'png', // 图片类型
    size: 5, // 图片尺寸
    margin: 2 // 图片边距
  })
  // 如果没有目录先创建目录
  existsDir(utils.saveQrcodePath, CALLBACK)
  // 保存二维码图片的完整路劲
  const imageName = path.join(__dirname, `../static/images/qrcode/${USERINFO.invitationCode}.png`);
  // 保存二维码图片
  const qrPipe = qrPng.pipe(fs.createWriteStream(imageName));
  qrPipe.on('error', (err) => {
    CALLBACK(err, null);
    return;
  })
  qrPipe.on('finish', () => {
    CALLBACK(null, imageName)
  })
}


// 合成所有图片信息
utils.addWater = async (USERINFO, SOURCEIMG, WATERIMG, CALLBACK) => {
  // 如果没有目录
  existsDir(utils.saveWaterPath, CALLBACK);
  const qrCodeImg = path.join(__dirname, `../static/images/qrcode/${USERINFO.invitationCode}.png`)
  const imageName = path.join(__dirname, `../static/images/water/${USERINFO.invitationCode}.png`);
  const avatartImg = path.join(__dirname, `../static/images/background/avatar.jpeg`);
  const imgList = [qrCodeImg, avatartImg];

  // 微信二维码 和 头像
  const offsetPositions = [{
    left: 550,
    top: 1400
    },{
    left: 50,
    top: 100
  }]

  // 合成并保存海报
  let SOURCEIMGUSE = sharp(SOURCEIMG).png().toBuffer();

  const result = await imgList.reduce(async (input, overlay, index) => {
    const inputUse = await input;
    return await sharp(inputUse).overlayWith(overlay, offsetPositions[index]).png().toBuffer();
  }, SOURCEIMGUSE);
  await sharp(result).toFile(imageName);
  return  CALLBACK(null, imageName);
}



// 贴文字信息
utils.pasteText = async (img, {
  text,
  fontSize,
  color,
  left,
  top
}, USERINFO, CALLBACK) => {
  // 检查路劲是否存在
  existsDir(utils.savePosterPath, CALLBACK);
  // 开始画文案
  const text2SVG = Text2SVG.loadSync()
  const attributes = {
    fill: color
  }
  const options = {
    fontSize,
    anchor: 'top',
    attributes,
  }
  const svg = Buffer.from(text2SVG.getSVG(text, options))
  const imageName = path.join(__dirname, `../static/images/poster/${USERINFO.invitationCode}.png`);
  await sharp(img)
    .overlayWith(svg, {
      left,
      top
    })
    .toFile(imageName);

  CALLBACK(null, imageName);
}






// api 接口
const poster = (req, res) => {
  console.log('---------req', req.query.userName, req.query.qrUrl)
  let nowTime = new Date().getTime();
  let userName = req.query.userName || '我是微信名称ZERO';
  let qrUrl = req.query.qrUrl || 'http://www.zeroyh.cn';
  async.waterfall([
    (callback) => {
      utils.createQr({
        invitationCode: nowTime,
        qrUrl:  qrUrl
      }, (resErr, resData) => {
        console.log('-----qrcode----', resErr, resData);
        if (!resErr) {
          callback(null, resData);
        }
      })
    },
    (qrImg, callback) => {
      utils.addWater({
        invitationCode: nowTime
      }, bgPath, qrImg, (resErr, resData) => {
        console.log('------all img add----', resErr, resData);
        if (!resErr) {
          callback(null, resData);
        }
      })
    },
    (waterImg, callback) => {
      utils.pasteText(waterImg, {
        text:  userName,
        fontSize: 32,
        color: 'black',
        left: 50,
        top: 50
      }, {
        invitationCode: nowTime
      }, (resErr, resData) => {
        console.log('------word add----', resErr, resData);
        if (!resErr) {
          callback(null, resData);
        }
      })
    }
  ], (err, result) => {
    if (err) {
      console.error(err);
      return res.json(Rjson.error());
    }
    console.log('------end result-----', result);
    res.json(Rjson.right({
      code: nowTime
    }, '制作海报成功'))
  })

}





exports = module.exports = {
  poster
}