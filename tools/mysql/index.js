const mysql = require('mysql')
var pool = mysql.createPool({
	host: '47.56.189.57',
	user: 'root',
	password: 'yang1187756010',
	port: '3306',
	database: 'kangongyu'
});
// 数据查询
const SQL = (sql, Callback) => {
	pool.getConnection((err, connection) => {
		if (err) {
			console.log("建立连接失败");
		} else {
			connection.query(sql, function (queryErr, result) {
				if (queryErr) {
					console.log('查询失败: [SELECT ERROR] - ', queryErr.message);
					return;
				}
				Callback(result)
				connection.release()
			})
		}
	})
}

module.exports = SQL