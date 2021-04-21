const express    = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const app        = express();


//Koneksi ke mysql database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'perpus'
});

//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Koneksi berhasil');
});

app.use(bodyParser.json());
app.listen(3000, () => console.log('Server berjalan di port 3000'));
app.use(express.static('public'));

//Baca Semua Data
app.get('/read',(req, res) => {

  let sql = "SELECT * FROM tbl_buku";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});

//Baca Data Berdasarkan NIS
app.get('/readbyid_buku/:id_buku', async (req, res) =>{
	const id_buku = req.params.id_buku;
	console.log(id_buku);

	let sql = "SELECT * FROM tbl_buku Where id_buku = "+ id_buku +"";
  	let query = conn.query(sql, (err, results) => {
    	if(err) throw err;
    	res.json(results);
  	});
});

//route untuk insert data
app.post('/api', (req, res) => {
	let action = req.body.action;
	let data = {id_buku: req.body.id_buku, judul: req.body.judul, penerbit: req.body.penerbit, pengarang: req.body.pengarang};
	let sql;

	if(action === 'Simpan'){
		sql = "INSERT INTO tbl_buku SET ?";	
	}else{
		sql = `UPDATE tbl_buku SET judul='`+req.body.judul+`', 
		        penerbit='`+req.body.penerbit+`', pengarang='`+ req.body.pengarang +`' 
		        WHERE id_buku='`+req.body.id_buku+`';`
	}
	
	console.log(sql);
	let query = conn.query(sql, data,(err, results) => {
	   if(err) throw err;
	   res.json(results);
	   console.log(results);
	});
});

//Baca Data Berdasarkan NIS
app.get('/hapus/:id_buku', async (req, res) =>{
	const id_buku = req.params.id_buku;
	console.log(id_buku);

	let sql = `DELETE FROM tbl_buku Where id_buku = '`+ id_buku +`';`
  	let query = conn.query(sql, (err, results) => {
    	if(err) throw err;
    	res.json(results);
  	});
});
