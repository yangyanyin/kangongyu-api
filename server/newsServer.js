const SQL = require('../tools/mysql/index')

// 获取新闻分类
module.exports.getNewsCategory = (params) => {
  return new Promise((resolve, reject) => {
    SQL(`SELECT * FROM news_type`, function (data){
      resolve({
        code: 200,
        data: data
      })
    })
  })
}

// 获取新闻列表
module.exports.getNewsList = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT 
    ns.id, ns.title, ns.description, ns.image, ns.recommend 
    FROM news ns WHERE type = '${params.type}'`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        data: {
          total: '',
          content: data,
        }
      })
    })
  })
}

// 添加新闻
module.exports.newsAdd = (params) => {
  return new Promise((resolve, reject) => {
    const data = Date.now()
    const sql = `INSERT INTO 
    news 
    (title, description, image, recommend, content, update_at, type) 
    VALUES 
    ('${params.title}', '${params.description}', '${params.image}', ${params.recommend}, '${params.content}', ${data}, '${params.type}')`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        msg: '添加成功'
      })
    })
  })
}

// 删除新闻
module.exports.newsDelete = (params) => {
  return new Promise((resolve, reject) => {
    const id = params.id
    const sql = `DELETE FROM news WHERE id = ${id}`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        msg: '删除成功'
      })
    })
  })
}

// 新闻详情
module.exports.getNewsDetail = (params) => {
  return new Promise((resolve, reject) => {
    const id = params.id
    const sql = `SELECT * FROM news WHERE id = ${id}`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        data: {
          content: data[0]
        }
      })
    })
  })
}

// 编辑新闻
module.exports.newsEdit = (params) => {
  return new Promise((resolve, reject) => {
    const data = Date.now()
    const sql = `UPDATE news SET 
    title = '${params.title}', description = '${params.description}', image = '${params.image}',
    recommend = ${params.recommend}, content = '${params.content}', update_at = ${data}
    WHERE id = ${params.id}`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        msg: '修改成功'
      })
    })
  })
}

module.exports.updateNewsRecommend = (params) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE news SET recommend = ${params.recommend} WHERE id = ${params.id}`
    SQL(sql, function (data) {
      resolve({
        code: 200,
        msg: '设置成功'
      })
    })
  })
}