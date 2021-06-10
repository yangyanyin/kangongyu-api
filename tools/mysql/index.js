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
		connection.query(sql, function (err, result) {
			if (err) {
				console.log('[SELECT ERROR] - ', err.message);
				return;
			}
			Callback(result)
			connection.release();
		});
	})
}

module.exports = SQL