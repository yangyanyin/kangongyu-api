const SQL = require('../tools/mysql/index')

// 获取筛选向
module.exports.getFilterArea = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, area as name FROM filter_area`
    SQL(sql, function (data) {
      resolve(data)
    })
  })
}
module.exports.getFilterHouse = (value) => {
  return new Promise((resolve, reject) => {
    const type = value.type || 'other'
    const sql = `SELECT id, house as name FROM filter_house WHERE type = '${type}'`
    SQL(sql, function (data) {
      resolve(data)
    })
  })
}
module.exports.getFilterPrice = (value) => {
  return new Promise((resolve, reject) => {
    const type = value.type || 'other'
    const sql = `SELECT id, price as name FROM filter_price WHERE type = '${type}'`
    SQL(sql, function (data) {
      resolve(data)
    })
  })
}
module.exports.getFilterRegion = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, region as name FROM filter_region`
    SQL(sql, function (data) {
      resolve(data)
    })
  })
}
// End