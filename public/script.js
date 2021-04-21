
getData();
async function getData(){
	const response = await fetch('/read');
	const json = await response.json();
	console.log(json);
	showData(json);
}

const btnSave = document.getElementById('btn_save');
btnSave.addEventListener('click', async event => {

	const action = btnSave.textContent;

	const id_buku   = document.getElementById('id_buku').value;
	const judul     = document.getElementById('judul').value;
	const pengarang = document.getElementById('pengarang').value;
	const penerbit  = document.getElementById('penerbit').value;

	let data = {
		id_buku : id_buku,
		judul : judul,
		penerbit : penerbit,
		pengarang : pengarang,
		action : action
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	const response = await fetch('/api', options);
	const json = await response.json();
	console.log(json);
	
	getData();

	$('#exampleModal').modal('hide');

	if(action === 'Simpan'){
		$.alert('Data Berhasil ditambah!');
	}else{
		$.alert('Data Berhasil dirubah!');
	}
});

function showData(json){
	let tr = '';
	$('#databody').html('');
	let no;
	for (let i = 0; i < json.length; i++) {
		no = i + 1;
		tr = $('<tr/>');
		tr.append("<td>" + no + "</td>");
		tr.append("<td>" + json[i].id_buku + "</td>");
		tr.append("<td>" + json[i].judul + "</td>");
		tr.append("<td>" + json[i].penerbit + "</td>");
		tr.append("<td>" + json[i].pengarang + "</td>");
		tr.append(`
			<td>
				<button type="button" class="badge badge-primary badge-pill btnEdit" data-id_buku="`+ json[i].id_buku +`">
					Edit
				</button>
				<button type="button" class="badge badge-danger badge-pill btnHapus" data-id_buku="`+ json[i].id_buku +`">
					Hapus
				</button>
			</td>`
		);
		$('#databody').append(tr);
	}

	//Jquery Selector
	$(function(){
		$('.btnTambahData').on('click', function(){
			document.getElementById('id_buku').readOnly = false;
			document.getElementById('id_buku').value = '';
			document.getElementById('judul').value = '';
			document.getElementById('penerbit').value = '';
			document.getElementById('pengarang').value = '';

	        $('#exampleModalLabel').html('Tambah Data Buku');
	        $('.modal-footer button[id=btn_save]').html('Simpan');
	    });

		$('.btnEdit').on('click', async function(){
		    let id_buku = $(this).data('id_buku');
		    console.log(id_buku);


		    const url = `readbyid_buku/${id_buku}`;
			const response = await fetch(url);
			const json = await response.json();
			console.log(json[0].id_buku);

			document.getElementById('id_buku').readOnly = true;
			document.getElementById('id_buku').value = json[0].id_buku;
			document.getElementById('judul').value = json[0].judul;
			document.getElementById('penerbit').value = json[0].penerbit;
			document.getElementById('pengarang').value = json[0].pengarang;

		    $('#exampleModalLabel').html('Ubah Data Buku');
        	$('.modal-footer button[id=btn_save]').html('Ubah Data');
		    $('#exampleModal').modal('show');
		});

		$('.btnHapus').on('click', async function(){
			let id_buku = $(this).data('id_buku');

			$.confirm({
			    title: 'Hapus Data',
			    content: 'Apakah Anda Yakin?',
			    buttons: {
			        ya: {
			        	text: 'YA',
			            btnClass: 'btn-blue',
			            action: async function(){
			                const url = `hapus/${id_buku}`;
							const response = await fetch(url);
							const json = await response.json();
			            	$.alert('Data Berhasil dihapus!');
			            	getData();
			            }
			        },
			        tidak: function () {
			            
			        }
			    }
			});
		});
	})
}