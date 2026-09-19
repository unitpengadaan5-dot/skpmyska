let defaultData = {
    instansi: "RUMKIT TK.II 05.05.01 dr. SOEPRAOEN",
    periode: "1 Juni s/d 31 Desember 2025",
    pegawai: {
        nama: "Farid Suwarseno, A.Md.Kep.",
        nip: "199512162025061001",
        pangkat: "Pengatur II/c",
        jabatan: "Perawat Terampil",
        unitKerja: "Instalwatnap Rumkit Tk.II 05.05.01 dr. Soepraoen Kesdam V/Brawijaya"
    },
    pejabat: {
        nama: "Tutik Sulastin, S.Si, Apt. Sp. Frs",
        nip: "11950013810969",
        pangkat: "Letkol Ckm (K)",
        jabatan: "Kepala Instalasi Rawat Inap",
        unitKerja: "Rumkit Tk.II 05.05.01 dr. Soepraoen Kesdam V/Brawijaya"
    },
    atasan: {
        nama: "dr. Handy Hernandy Yuliawan, Sp.M.",
        nip: "11930098810770",
        pangkat: "Kolonel Ckm",
        jabatan: "Kepala",
        unitKerja: "Rumkit Tk.II 05.05.01 dr. Soepraoen Kesdam V/Brawijaya"
    },
    signaturePegawai: null,
    signaturePejabat: null
};

let savedData = JSON.parse(localStorage.getItem('skp_data'));
let data = savedData || defaultData;
if(savedData && !savedData.atasan) { data.atasan = defaultData.atasan; }
if(!data.signaturePegawai) data.signaturePegawai = null;
if(!data.signaturePejabat) data.signaturePejabat = null;


function renderHeader(data) {
    return `
    <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 5px;">
        <div>NAMA INSTANSI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${data.instansi}</div>
        <div>Periode Penilaian : ${data.periode}</div>
    </div>
    <table class="header-table">
        <tr>
            <th colspan="3" class="text-center" style="background-color: #f2f2f2;">PEGAWAI YANG DINILAI</th>
            <th colspan="3" class="text-center" style="background-color: #f2f2f2;">PEJABAT PENILAI KINERJA</th>
        </tr>
        <tr>
            <td style="width: 15%;">Nama</td><td style="width: 2%;">:</td><td style="width: 33%;">${data.pegawai.nama}</td>
            <td style="width: 15%;">Nama</td><td style="width: 2%;">:</td><td style="width: 33%;">${data.pejabat.nama}</td>
        </tr>
        <tr>
            <td>NIP</td><td>:</td><td>${data.pegawai.nip}</td>
            <td>NRP</td><td>:</td><td>${data.pejabat.nip}</td>
        </tr>
        <tr>
            <td>Golongan</td><td>:</td><td>${data.pegawai.pangkat}</td>
            <td>Pangkat, Korps,Gol Ruang</td><td>:</td><td>${data.pejabat.pangkat}</td>
        </tr>
        <tr>
            <td>Jabatan</td><td>:</td><td>${data.pegawai.jabatan}</td>
            <td>Jabatan</td><td>:</td><td>${data.pejabat.jabatan}</td>
        </tr>
        <tr>
            <td>Unit Kerja</td><td>:</td><td>${data.pegawai.unitKerja}</td>
            <td>Unit Kerja</td><td>:</td><td>${data.pejabat.unitKerja}</td>
        </tr>
    </table>
    `;
}

let hasilKerjaUtama = JSON.parse(localStorage.getItem('skp_hasilKerjaUtama')) || [
    {
        rhkPimpinan: "Mengatur dan mengkoordinasi seluruh kegiatan pelayanan di ruang rawat inap, melalui kerja sama dengan petugas lain yang bertugas di ruang rawatnya",
        rhk: "Terobservasinya kondisi pasien, selanjutnya melakukan tindakan yang tepat berdasarkan hasil observasi tersebut, sesuai batas kemampuannya",
        aspek: [
            { jenis: "Kuantitas", indikator: "Jumlah pengobservasian kondisi pasien", target: "120" },
            { jenis: "Kualitas", indikator: "Prosentase pengobservasian kondisi pasien", target: "90%" },
            { jenis: "Waktu", indikator: "Rentan waktu yang diperlukan utk pengobservasian dalam rangka Penilaian", target: "6 Bulan" }
        ]
    },
    {
        rhkPimpinan: "Memberi orientasi kepada pasien/keluarganya meliputi penjelasan tentang peraturan rumah sakit, tata tertib ruang rawat Inap, fasilitas yang ada dan cara penggunaannya serta kegiatan rutin sehari-hari.",
        rhk: "Tersusunnya rencana keperawatan kepada pasien sesuai kebutuhan batas kemampuannya antara lain Melaksanakan tindakan pengobatan sesuai program pengobatan, Memberi penyuluhan kesehatan kepada pasien dan keluarganya mengenai penyakitnya",
        aspek: [
            { jenis: "Kuantitas", indikator: "Jumlah penyusunan rencana keperawatan kepada pasien", target: "120" },
            { jenis: "Kualitas", indikator: "prosentase penyusunan rencana keperawatan kepada pasien", target: "90%" },
            { jenis: "Waktu", indikator: "Waktu penyusunan rencana keperawatan kepada pasien", target: "6 Bulan" }
        ]
    },
    {
        rhkPimpinan: "Memberikan bimbingan kepada tenaga keperawatan untuk pelaksanaan pelayanan/asuhan keperawatan sesuai standar.",
        rhk: "Terlaksananya sistem pencatatan dan pelaporan asuhan keperawatan yang tepat dan benar sesuai standar asuhan keperawatan.",
        aspek: [
            { jenis: "Kuantitas", indikator: "Jumlah penyusunan sistem pencatatan dan pelaporan asuhan keperawatan", target: "120" },
            { jenis: "Kualitas", indikator: "Prosentase penyusunan sistem pencatatan dan pelaporan asuhan keperawatan", target: "90%" },
            { jenis: "Waktu", indikator: "Waktu penyusunan sistem pencatatan dan pelaporan asuhan keperawatan", target: "6 Bulan" }
        ]
    },
    {
        rhkPimpinan: "Memberikan asuhan keperawatan kepada pasien /keluarga pasien sesuai kemampuan dan batas kewenangannya.",
        rhk: "Terdokumentasikannya Kebenaran dan ketepatan pelaksanaan asuhan keperawatan/kegiatan lain yang dilakukan",
        aspek: [
            { jenis: "Kuantitas", indikator: "Jumlah pendokumentasian kebenaran dan ketepatan pelaksanaan asuhan keperawatan", target: "120" },
            { jenis: "Kualitas", indikator: "Prosentase pendokumentasian kebenaran dan ketepatan pelaksanaan asuhan keperawatan", target: "90%" },
            { jenis: "Waktu", indikator: "Waktu pendokumentasian kebenaran dan ketepatan pelaksanaan asuhan keperawatan", target: "6 Bulan" }
        ]
    },
    {
        rhkPimpinan: "Menyusun jadwal/daftar dinas tenaga keperawatan dan lain sesuai kebutuhan pelayanan dan peraturan yang berlaku di rumah sakit",
        rhk: "Terpeliharanya peralatan keperawatan dan medis agar selalu dalam keadaan siap pakai",
        aspek: [
            { jenis: "Kuantitas", indikator: "Jumlah pelaksanaan pemeliharaan peralatan keperawatan sesuai SOP", target: "120" },
            { jenis: "Kualitas", indikator: "Prosentase pelaksanaan pemeliharaan peralatan keperawatan sesuai SOP", target: "90%" },
            { jenis: "Waktu", indikator: "Waktu pelaksanaan pemeliharaan peralatan keperawatan sesuai SOP", target: "6 Bulan" }
        ]
    },
    {
        rhkPimpinan: "Mengatur dan mengkoordinasikan pemeliharaan alat kesehatan dan sarana serta prasarana agar selalu dalam keadaan siap pakai",
        rhk: "Terlaksananya pertemuan berkala yang diadakan oleh kepala ruang rawat",
        aspek: [
            { jenis: "Kuantitas", indikator: "Jumlah pelaksanaan pertemuan/evaluasi bidang tugas", target: "120" },
            { jenis: "Kualitas", indikator: "Prosentase pelaksanaan pertemuan/evaluasi bidang tugas", target: "90%" },
            { jenis: "Waktu", indikator: "Waktu pelaksanaan pertemuan/evaluasi bidang tugas", target: "6 Bulan" }
        ]
    },
    {
        rhkPimpinan: "Mengawasi, mengendalikan dan menilai pendayagunaan tenaga keperawatan dan melaksanakan Rapat staf/Evaluasi kegiatan",
        rhk: "Terlaksananya jadwal dinas secara bergiliran sesuai SOP",
        aspek: [
            { jenis: "Kuantitas", indikator: "Jumlah pelaksanaan dinas sesuai SOP", target: "120" },
            { jenis: "Kualitas", indikator: "Prosentase pelaksanaan dinas sesuai SOP", target: "90%" },
            { jenis: "Waktu", indikator: "Waktu pelaksanaan dinas sesuai SOP", target: "6 Bulan" }
        ]
    }
];

function renderHasilKerjaRows(dataUtama) {
    let rows = '';
    dataUtama.forEach((item, index) => {
        const rowspan = item.aspek.length;
        rows += `
            <tr>
                <td rowspan="${rowspan}" class="text-center">${index + 1}</td>
                <td rowspan="${rowspan}">${item.rhkPimpinan}</td>
                <td rowspan="${rowspan}">${item.rhk}</td>
                <td class="text-center">${item.aspek[0].jenis}</td>
                <td>${item.aspek[0].indikator}</td>
                <td class="text-center">${item.aspek[0].target}</td>
            </tr>
        `;
        for (let i = 1; i < rowspan; i++) {
            rows += `
                <tr>
                    <td class="text-center">${item.aspek[i].jenis}</td>
                    <td>${item.aspek[i].indikator}</td>
                    <td class="text-center">${item.aspek[i].target}</td>
                </tr>
            `;
        }
    });
    return rows;
}

let perilakuKerja = JSON.parse(localStorage.getItem('skp_perilakuKerja')) || [
    {
        nama: "Berorientasi pelayanan",
        indikator: [
            "Memahami dan memenuhi kebutuhan masyarakat",
            "Ramah, Cekatan, Solutif, dan dapat diandalkan",
            "Melakukan perbaikan tiada henti"
        ],
        ekspektasi: "- Menjadi Role Model/ panutan dalam mengimplentasikan pelayanan prima kepada penerima layanan"
    },
    {
        nama: "Akuntabel",
        indikator: [
            "Melaksanakan tugas dengan jujur bertanggung jawab cermat disiplin dan berintegritas tinggi",
            "Menggunakan kekayaan dan BMN secara bertanggung jawab efektif dan efisien",
            "Tidak menyalahgunakan kewenangan jabatan"
        ],
        ekspektasi: "- Menjadi role model/ panutan dalam mengimplementasikan integritas dan disiplin di unit kerjanya"
    },
    {
        nama: "Kompeten",
        indikator: [
            "Meningkatkan kompetensi diri untuk menjawab tantangan yang selalu berubah",
            "Membantu orang lain belajar",
            "Melaksanakan tugas dengan kualitas terbaik"
        ],
        ekspektasi: "- Bersedia untuk mengajarkan pengetahuan atau keterampilan yang dimiliki kepada orang lain"
    },
    {
        nama: "Harmonis",
        indikator: [
            "Menghargai setiap orang apapun latar belakangnya",
            "Suka menolong orang lain",
            "Membangun lingkungan kerja yang kondusif"
        ],
        ekspektasi: "- Membangun komunikasi yang lebih terbuka dan menjaga hubungan baik dengan stakeholder"
    },
    {
        nama: "Loyal",
        indikator: [
            "Memegang teguh ideologi Pancasila, Undang-Undang Dasar Negara Republik Indonesia Tahun 1945, setia pada NKRI serta pemerintahan yang sah",
            "Menjaga nama baik sesama ASN, Pimpinan, Instansi, dan Negara",
            "Menjaga rahasia jabatan dan negara"
        ],
        ekspektasi: "- Berani menyampaikan adanya indikasi/ hal-hal yang dapat merugikan dan membahayakan negara"
    },
    {
        nama: "Adaptif",
        indikator: [
            "Cepat menyesuaikan diri menghadapi perubahan",
            "Terus berinovasi dan mengembangkan kreativitas",
            "Bertindak proaktif"
        ],
        ekspektasi: ""
    },
    {
        nama: "Kolaboratif",
        indikator: [
            "Memberi kesempatan kepada berbagai pihak untuk berkontribusi",
            "Terbuka dalam bekerja sama untuk menghasilkan nilai tambah",
            "Menggerakkan pemanfaatan berbagai sumberdaya untuk tujuan bersama"
        ],
        ekspektasi: "- Mampu mengelola dan melibatkan seluruh pihak sesuai dengan peran dan fungsinya untuk mencapai tujuan bersama"
    }
];

function renderPerilakuKerja() {
    let rows = `
        <table class="perilaku-kerja-table" style="page-break-before: always; margin-top: 20px;">
            <tr style="background-color: #f2f2f2;">
                <th colspan="3" class="text-left">PERILAKU KERJA</th>
            </tr>
    `;
    
    perilakuKerja.forEach((item, index) => {
        rows += `
            <tr>
                <td rowspan="4" class="text-center" style="width: 3%;">${index + 1}</td>
                <td colspan="2" class="font-bold">${item.nama}</td>
            </tr>
            <tr>
                <td style="width: 47%;">${item.indikator[0]}</td>
                <td rowspan="3" style="width: 50%;">Ekspektasi Khusus Pimpinan:<br><br>${item.ekspektasi}</td>
            </tr>
            <tr>
                <td>${item.indikator[1]}</td>
            </tr>
            <tr>
                <td>${item.indikator[2]}</td>
            </tr>
        `;
    });
    
    rows += `</table>`;
    return rows;
}

function getSignatureDate() {
    // Parse start date from periode e.g. "1 Juni s/d 31 Desember 2025" or "2 Januari s/d 31 Desember 2025"
    const periode = data.periode || '';
    const bulanIndo = {
        'januari': 0, 'februari': 1, 'maret': 2, 'april': 3,
        'mei': 4, 'juni': 5, 'juli': 6, 'agustus': 7,
        'september': 8, 'oktober': 9, 'november': 10, 'desember': 11
    };
    const bulanNama = ['Januari','Februari','Maret','April','Mei','Juni',
                       'Juli','Agustus','September','Oktober','November','Desember'];
    // Match pattern: "<tanggal> <bulan> s/d ...  <tahun>"
    const match = periode.match(/(\d+)\s+(\w+)\s+s\/d/i);
    const yearMatch = periode.match(/(\d{4})/);
    if (match && yearMatch) {
        const tgl = match[1];
        const bln = match[2].toLowerCase();
        const tahun = parseInt(yearMatch[1]);
        const blnIndex = bulanIndo[bln];
        if (blnIndex !== undefined) {
            return `Malang, ${tgl} ${bulanNama[blnIndex]} ${tahun + 1}`;
        }
    }
    return 'Malang, ............. ';
}

function renderSignatures() {
    const sigPegawai = data.signaturePegawai
        ? `<img src="${data.signaturePegawai}" style="height:60px; max-width:180px; display:block; margin:0 auto;">` 
        : `<br><br><br><br>`;
    const sigPejabat = data.signaturePejabat
        ? `<img src="${data.signaturePejabat}" style="height:60px; max-width:180px; display:block; margin:0 auto;">` 
        : `<br><br><br><br>`;
    return `
        <div style="display: flex; justify-content: space-between; margin-top: 50px; text-align: center;">
            <div style="width: 40%;">
                <br>
                PEGAWAI YANG DINILAI<br>
                ${sigPegawai}
                ${data.pegawai.nama}<br>
                ${data.pegawai.pangkat} NIP ${data.pegawai.nip}
            </div>
            <div style="width: 40%;">
                ${getSignatureDate()}<br>
                PEJABAT PENILAI KINERJA<br>
                ${sigPejabat}
                ${data.pejabat.nama}<br>
                ${data.pejabat.pangkat} NRP ${data.pejabat.nip}
            </div>
        </div>
    `;
}

function renderSasaranPage() {
    let html = `
    <div class="page">
        <div class="text-center font-bold" style="margin-bottom: 20px;">
            SASARAN KINERJA PEGAWAI<br>
            JABATAN PELAKSANA<br>
            PENDEKATAN HASIL KERJA KUANTITATIF
        </div>
        ${renderHeader(data)}
        
        <table class="hasil-kerja-table">
            <tr style="background-color: #f2f2f2;">
                <th colspan="6" class="text-left">HASIL KERJA</th>
            </tr>
            <tr class="text-center" style="background-color: #f2f2f2;">
                <th style="width: 3%;">No.</th>
                <th style="width: 25%;">RENCANA HASIL KERJA PIMPINAN<br>YANG DIINTERVENSI</th>
                <th style="width: 25%;">RENCANA HASIL KERJA</th>
                <th style="width: 10%;">ASPEK</th>
                <th style="width: 27%;">INDIKATOR KINERJA INDIVIDU</th>
                <th style="width: 10%;">TARGET</th>
            </tr>
            <tr class="text-center" style="background-color: #f2f2f2;">
                <td>(1)</td><td>(2)</td><td>(3)</td><td>(4)</td><td>(5)</td><td>(6)</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
                <td colspan="6" class="font-bold">A. KINERJA UTAMA</td>
            </tr>
            ${renderHasilKerjaRows(hasilKerjaUtama)}
        </table>
        
        ${renderPerilakuKerja()}
        ${renderSignatures()}
    </div>
    `;
    return html;
}

let lampiranData = JSON.parse(localStorage.getItem('skp_lampiranData')) || {
    dukungan: [
        "Membutuhkan Komputer/Laptop",
        "Membutuhkan Koneksi Internet/WiFi",
        "Membutuhkan Alkes"
    ],
    skema: [
        "Hasil Kerja Dilaporkan Setiap hari",
        "Hasil Kerja Dilaporkan Setiap bulan",
        "Hasil Kerja Dilaporkan Setiap Tri Wulan"
    ],
    konsekuensi: [
        "Apabila Memenuhi Ekspekstasi Akan Diberikan Reward",
        "Apabila Tidak Memenuhi Ekspektasi Akan Diberikan Punishment",
        ""
    ]
};

function renderLampiranPage() {
    let rowsDukungan = '';
    lampiranData.dukungan.forEach((item, index) => {
        rowsDukungan += `<tr><td class="text-center" style="width:3%;">${index + 1}</td><td>${item}</td></tr>`;
    });

    let rowsSkema = '';
    lampiranData.skema.forEach((item, index) => {
        rowsSkema += `<tr><td class="text-center">${index + 1}</td><td>${item}</td></tr>`;
    });

    let rowsKonsekuensi = '';
    lampiranData.konsekuensi.forEach((item, index) => {
        rowsKonsekuensi += `<tr><td class="text-center">${index + 1}</td><td>${item}</td></tr>`;
    });

    return `
    <div class="page" style="page-break-before: always;">
        <div class="text-center font-bold" style="margin-bottom: 20px;">
            LAMPIRAN SASARAN KINERJA PEGAWAI<br>
            JABATAN PELAKSANA<br>
            PENDEKATAN HASIL KERJA KUANTITATIF
        </div>
        
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 5px;">
            <div>NAMA INSTANSI &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${data.instansi}</div>
            <div>Periode Penilaian : ${data.periode}</div>
        </div>

        <table class="lampiran-table">
            <tr style="background-color: #f2f2f2;"><th colspan="2" class="text-left">DUKUNGAN SUMBER DAYA</th></tr>
            ${rowsDukungan}
            <tr style="background-color: #f2f2f2;"><th colspan="2" class="text-left">SKEMA PERTANGGUNGJAWABAN</th></tr>
            ${rowsSkema}
            <tr style="background-color: #f2f2f2;"><th colspan="2" class="text-left">KONSEKUENSI</th></tr>
            ${rowsKonsekuensi}
        </table>

        ${renderSignatures()}
    </div>
    `;
}

function renderUmpanBalikPage() {
    let rows = '';
    hasilKerjaUtama.forEach((item, index) => {
        const rowspan = item.aspek.length;
        rows += `
            <tr>
                <td rowspan="${rowspan}" class="text-center">${index + 1}</td>
                <td rowspan="${rowspan}">${item.rhkPimpinan}</td>
                <td rowspan="${rowspan}">${item.rhk}</td>
                <td class="text-center">${item.aspek[0].jenis}</td>
                <td>${item.aspek[0].indikator}</td>
                <td class="text-center">${item.aspek[0].target}</td>
                <td class="text-center">${item.aspek[0].target}</td>
                <td rowspan="${rowspan}" style="color: gray; font-style: italic;">--SDA--<br>Boleh dikasih emot jempol, senyum, sedih dll atau kata positif/negatif</td>
            </tr>
        `;
        for (let i = 1; i < rowspan; i++) {
            rows += `
                <tr>
                    <td class="text-center">${item.aspek[i].jenis}</td>
                    <td>${item.aspek[i].indikator}</td>
                    <td class="text-center">${item.aspek[i].target}</td>
                    <td class="text-center">${item.aspek[i].target}</td>
                </tr>
            `;
        }
    });

    let perilakuRows = '';
    perilakuKerja.forEach((item, index) => {
        perilakuRows += `
            <tr>
                <td rowspan="4" class="text-center" style="width: 3%;">${index + 1}</td>
                <td colspan="2" class="font-bold">${item.nama}</td>
                <td rowspan="4" style="color: gray; font-style: italic;">--SDA--<br>Boleh dikasih emot jempol, senyum, sedih dll atau kata positif/negatif</td>
            </tr>
            <tr>
                <td style="width: 47%;">${item.indikator[0]}</td>
                <td rowspan="3" style="width: 30%;">Ekspektasi Khusus Pimpinan:<br><br>${item.ekspektasi}</td>
            </tr>
            <tr><td>${item.indikator[1]}</td></tr>
            <tr><td>${item.indikator[2]}</td></tr>
        `;
    });

    return `
    <div class="page" style="page-break-before: always;">
        <div class="text-center font-bold" style="margin-bottom: 20px;">
            UMPAN BALIK<br>
            JABATAN PELAKSANA<br>
            PENDEKATAN HASIL KERJA KUANTITATIF
        </div>
        ${renderHeader(data)}
        
        <table class="hasil-kerja-table">
            <tr style="background-color: #f2f2f2;">
                <th colspan="8" class="text-left">HASIL KERJA</th>
            </tr>
            <tr class="text-center" style="background-color: #f2f2f2;">
                <th style="width: 3%;">No.</th>
                <th style="width: 20%;">RENCANA HASIL KERJA PIMPINAN YANG DIINTERVENSI</th>
                <th style="width: 20%;">RENCANA HASIL KERJA</th>
                <th style="width: 8%;">ASPEK</th>
                <th style="width: 20%;">INDIKATOR KINERJA INDIVIDU</th>
                <th style="width: 8%;">TARGET</th>
                <th style="width: 8%;">REALISASI BERDASAR BUKTI DUKUNG</th>
                <th style="width: 13%;">UMPAN BALIK BERKELANJUTAN BERDASAR BUKTI DUKUNG</th>
            </tr>
            <tr class="text-center" style="background-color: #f2f2f2;">
                <td>(1)</td><td>(2)</td><td>(3)</td><td>(4)</td><td>(5)</td><td>(6)</td><td>(7)</td><td>(8)</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
                <td colspan="8" class="font-bold">A. KINERJA UTAMA</td>
            </tr>
            ${rows}
        </table>

        <table class="perilaku-kerja-table" style="page-break-before: always; margin-top: 20px;">
            <tr style="background-color: #f2f2f2;">
                <th colspan="3" class="text-left">PERILAKU KERJA</th>
                <th style="width: 20%;">UMPAN BALIK BERKELANJUTAN BERDASAR BUKTI DUKUNG</th>
            </tr>
            ${perilakuRows}
        </table>
        ${renderSignatures()}
    </div>
    `;
}

function renderEvaluasiPage() {
    let rows = '';
    hasilKerjaUtama.forEach((item, index) => {
        const rowspan = item.aspek.length;
        rows += `
            <tr>
                <td rowspan="${rowspan}" class="text-center">${index + 1}</td>
                <td rowspan="${rowspan}">${item.rhkPimpinan}</td>
                <td rowspan="${rowspan}">${item.rhk}</td>
                <td class="text-center">${item.aspek[0].jenis}</td>
                <td>${item.aspek[0].indikator}</td>
                <td class="text-center">${item.aspek[0].target}</td>
                <td class="text-center">${item.aspek[0].target}</td>
                <td rowspan="${rowspan}">Pejabat Penilai Kinerja: Sesuai Ekspektasi</td>
            </tr>
        `;
        for (let i = 1; i < rowspan; i++) {
            rows += `
                <tr>
                    <td class="text-center">${item.aspek[i].jenis}</td>
                    <td>${item.aspek[i].indikator}</td>
                    <td class="text-center">${item.aspek[i].target}</td>
                    <td class="text-center">${item.aspek[i].target}</td>
                </tr>
            `;
        }
    });

    let perilakuRows = '';
    perilakuKerja.forEach((item, index) => {
        perilakuRows += `
            <tr>
                <td rowspan="4" class="text-center" style="width: 3%;">${index + 1}</td>
                <td colspan="2" class="font-bold">${item.nama}</td>
                <td rowspan="4">Pejabat Penilai Kerja: Sesuai Ekspektasi</td>
            </tr>
            <tr>
                <td style="width: 47%;">${item.indikator[0]}</td>
                <td rowspan="3" style="width: 30%;">Ekspektasi Khusus Pimpinan:<br><br>${item.ekspektasi}</td>
            </tr>
            <tr><td>${item.indikator[1]}</td></tr>
            <tr><td>${item.indikator[2]}</td></tr>
        `;
    });

    return `
    <div class="page" style="page-break-before: always;">
        <div class="text-center font-bold" style="margin-bottom: 20px;">
            EVALUASI KINERJA PEGAWAI<br>
            JABATAN PELAKSANA<br>
            PENDEKATAN HASIL KERJA KUANTITATIF
        </div>
        ${renderHeader(data)}
        
        <table style="margin-bottom: 5px;">
            <tr><th class="text-left font-bold" style="background-color: #f2f2f2;">CAPAIAN KINERJA ORGANISASI</th></tr>
            <tr><td class="font-bold">ISTIMEWA/ BAIK/ BUTUH PERBAIKAN/ KURANG/ SANGAT KURANG</td></tr>
            <tr><td class="font-bold">POLA DISTRIBUSI</td></tr>
            <tr>
                <td class="text-center" style="padding: 4px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="140" viewBox="0 0 520 230" style="font-family: Arial, sans-serif;">
                      <!-- Title -->
                      <text x="260" y="18" text-anchor="middle" font-weight="bold" font-size="14">KURVA DISTRIBUSI PREDIKAT KINERJA PEGAWAI DENGAN</text>
                      <text x="260" y="34" text-anchor="middle" font-weight="bold" font-size="14">CAPAIAN KINERJA ORGANISASI BAIK</text>
                      <!-- Chart area border -->
                      <rect x="60" y="40" width="430" height="140" fill="white" stroke="#999" stroke-width="1"/>
                      <!-- Grid lines horizontal -->
                      <line x1="60" y1="75"  x2="490" y2="75"  stroke="#ddd" stroke-width="0.5"/>
                      <line x1="60" y1="110" x2="490" y2="110" stroke="#ddd" stroke-width="0.5"/>
                      <line x1="60" y1="145" x2="490" y2="145" stroke="#ddd" stroke-width="0.5"/>
                      <!-- Grid lines vertical -->
                      <line x1="146" y1="40" x2="146" y2="180" stroke="#ddd" stroke-width="0.5"/>
                      <line x1="232" y1="40" x2="232" y2="180" stroke="#ddd" stroke-width="0.5"/>
                      <line x1="318" y1="40" x2="318" y2="180" stroke="#ddd" stroke-width="0.5"/>
                      <line x1="404" y1="40" x2="404" y2="180" stroke="#ddd" stroke-width="0.5"/>
                      <!-- Distribution Curve -->
                      <path d="M 60,172 C 80,170 110,168 146,162 C 175,157 200,150 232,142 C 265,133 280,120 318,108 C 345,100 360,70 404,52 C 430,42 455,60 490,115"
                            fill="none" stroke="black" stroke-width="2.5" stroke-linejoin="round"/>
                      <!-- Y-axis label -->
                      <text x="12" y="100" text-anchor="middle" font-size="12" transform="rotate(-90, 12, 110)">Frekuensi</text>
                      <text x="12" y="120" text-anchor="middle" font-size="12" transform="rotate(-90, 12, 120)">Pegawai</text>
                      <!-- X-axis labels -->
                      <text x="60"  y="198" text-anchor="middle" font-size="12">Sangat</text>
                      <text x="60"  y="213" text-anchor="middle" font-size="12">Kurang</text>
                      <text x="146" y="198" text-anchor="middle" font-size="12">Kurang/</text>
                      <text x="146" y="213" text-anchor="middle" font-size="12">Misconduct</text>
                      <text x="232" y="198" text-anchor="middle" font-size="12">Butuh</text>
                      <text x="232" y="213" text-anchor="middle" font-size="12">Perbaikan</text>
                      <text x="380" y="198" text-anchor="middle" font-size="12">Baik</text>
                      <text x="490" y="198" text-anchor="middle" font-size="12">Sangat Baik</text>
                      <!-- X-axis title -->
                      <text x="260" y="228" text-anchor="middle" font-size="13">Predikat Kinerja Pegawai</text>
                    </svg>
                </td>
            </tr>
        </table>

        <table class="hasil-kerja-table">
            <tr style="background-color: #f2f2f2;">
                <th colspan="8" class="text-left">HASIL KERJA</th>
            </tr>
            <tr class="text-center" style="background-color: #f2f2f2;">
                <th style="width: 3%;">No.</th>
                <th style="width: 20%;">RENCANA HASIL KERJA PIMPINAN YANG DIINTERVENSI</th>
                <th style="width: 20%;">RENCANA HASIL KERJA</th>
                <th style="width: 8%;">ASPEK</th>
                <th style="width: 20%;">INDIKATOR KINERJA INDIVIDU</th>
                <th style="width: 8%;">TARGET</th>
                <th style="width: 8%;">REALISASI BERDASAR BUKTI DUKUNG</th>
                <th style="width: 13%;">UMPAN BALIK BERKELANJUTAN BERDASAR BUKTI DUKUNG</th>
            </tr>
            <tr class="text-center" style="background-color: #f2f2f2;">
                <td>(1)</td><td>(2)</td><td>(3)</td><td>(4)</td><td>(5)</td><td>(6)</td><td>(7)</td><td>(8)</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
                <td colspan="8" class="font-bold">A. KINERJA UTAMA</td>
            </tr>
            ${rows}
        </table>

        <table style="page-break-before: always;">
            <tr style="background-color: #f2f2f2;"><th class="text-left">RATING HASIL KERJA</th></tr>
            <tr><td>DIATAS EKSPEKTASI / SESUAI EKSPEKTASI / DIBAWAH EKSPEKTASI</td></tr>
        </table>

        <table class="perilaku-kerja-table" style="margin-top: 20px;">
            <tr style="background-color: #f2f2f2;">
                <th colspan="3" class="text-left">PERILAKU KERJA</th>
                <th style="width: 20%;">UMPAN BALIK BERKELANJUTAN BERDASAR BUKTI DUKUNG</th>
            </tr>
            ${perilakuRows}
        </table>

        <table style="margin-top: 20px;">
            <tr style="background-color: #f2f2f2;"><th class="text-left">RATING PERILAKU KERJA</th></tr>
            <tr><td>DIATAS EKSPEKTASI / SESUAI EKSPEKTASI / DIBAWAH EKSPEKTASI</td></tr>
            <tr style="background-color: #f2f2f2;"><th class="text-left">PREDIKAT KINERJA PEGAWAI</th></tr>
            <tr><td class="font-bold">SANGAT BAIK/ BAIK/ BUTUH PERBAIKAN/ KURANG/ SANGAT KURANG</td></tr>
        </table>

        ${renderSignatures()}
    </div>
    `;
}

function renderDokumenFinal() {
    return `
    <div class="page" style="page-break-before: always;">
        <div class="text-center font-bold" style="margin-bottom: 20px;">
            DOKUMEN EVALUASI KINERJA PEGAWAI<br>
            PERIODE : TRIWULAN I/II/III/IV-AKHIR
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 5px;">
            <div>NAMA INSTANSI : ${data.instansi}</div>
            <div>PERIODE PENILAIAN: ${data.periode.toUpperCase()}</div>
        </div>
        
        <table>
            <tr><th colspan="3" class="text-left" style="background-color: #f2f2f2;">1. PEGAWAI YANG DINILAI</th></tr>
            <tr><td style="width: 25%;">NAMA</td><td style="width: 2%;">:</td><td>${data.pegawai.nama}</td></tr>
            <tr><td>NIP</td><td>:</td><td>${data.pegawai.nip}</td></tr>
            <tr><td>PANGKAT/GOL RUANG</td><td>:</td><td>${data.pegawai.pangkat}</td></tr>
            <tr><td>JABATAN</td><td>:</td><td>${data.pegawai.jabatan}</td></tr>
            <tr><td>UNIT KERJA</td><td>:</td><td>${data.pegawai.unitKerja}</td></tr>

            <tr><th colspan="3" class="text-left" style="background-color: #f2f2f2;">2. PEJABAT PENILAI KINERJA</th></tr>
            <tr><td>NAMA</td><td>:</td><td>${data.pejabat.nama}</td></tr>
            <tr><td>NIP</td><td>:</td><td>${data.pejabat.nip}</td></tr>
            <tr><td>PANGKAT/GOL RUANG</td><td>:</td><td>${data.pejabat.pangkat}</td></tr>
            <tr><td>JABATAN</td><td>:</td><td>${data.pejabat.jabatan}</td></tr>
            <tr><td>UNIT KERJA</td><td>:</td><td>${data.pejabat.unitKerja}</td></tr>
            
            <tr><th colspan="3" class="text-left" style="background-color: #f2f2f2;">3. ATASAN PEJABAT PENILAI KINERJA</th></tr>
            <tr><td>NAMA</td><td>:</td><td>${data.atasan.nama}</td></tr>
            <tr><td>NRP</td><td>:</td><td>${data.atasan.nip}</td></tr>
            <tr><td>PANGKAT/KORPS</td><td>:</td><td>${data.atasan.pangkat}</td></tr>
            <tr><td>JABATAN</td><td>:</td><td>${data.atasan.jabatan}</td></tr>
            <tr><td>UNIT KERJA</td><td>:</td><td>${data.atasan.unitKerja}</td></tr>

            <tr><th colspan="3" class="text-left" style="background-color: #f2f2f2;">4. EVALUASI KINERJA</th></tr>
            <tr><td>CAPAIAN KINERJA ORGANISASI</td><td>:</td><td>BAIK</td></tr>
            <tr><td>PREDIKAT KINERJA PEGAWAI</td><td>:</td><td>BAIK</td></tr>

            <tr><th colspan="3" class="text-left" style="background-color: #f2f2f2;">5. CATATAN/REKOMENDASI</th></tr>
            <tr><td colspan="3" style="height: 30px;"></td></tr>
            
            <tr><th colspan="3" class="text-left" style="background-color: #f2f2f2;">6. KEBERATAN</th></tr>
            <tr><td colspan="3" style="height: 30px;"></td></tr>

            <tr><th colspan="3" class="text-left" style="background-color: #f2f2f2;">7. PENJELASAN PEJABAT PENILAI ATAS KEBERATAN</th></tr>
            <tr><td colspan="3" style="height: 30px;"></td></tr>

            <tr><th colspan="3" class="text-left" style="background-color: #f2f2f2;">8. KEPUTUSAN ATASAN PEJABAT PENILAI KINERJA</th></tr>
            <tr><td colspan="3" style="height: 30px;"></td></tr>
        </table>

        <div style="display: flex; justify-content: space-between; margin-top: 50px; text-align: center;">
            <div style="width: 40%;">
                <br>
                10. ${getSignatureDate()}<br>
                PEGAWAI YANG DINILAI<br>
                ${data.signaturePegawai ? `<img src="${data.signaturePegawai}" style="height:60px; max-width:180px; display:block; margin:0 auto;">` : `<br><br><br><br>`}
                ${data.pegawai.nama}<br>
                ${data.pegawai.pangkat} NIP ${data.pegawai.nip}
            </div>
            <div style="width: 40%;">
                11. ${getSignatureDate()}<br>
                PEJABAT PENILAI KINERJA<br>
                ${data.signaturePejabat ? `<img src="${data.signaturePejabat}" style="height:60px; max-width:180px; display:block; margin:0 auto;">` : `<br><br><br><br>`}
                ${data.pejabat.nama}<br>
                ${data.pejabat.pangkat} NRP ${data.pejabat.nip}
            </div>
        </div>
    </div>
    `;
}

function saveData() {
    localStorage.setItem('skp_data', JSON.stringify(data));
    localStorage.setItem('skp_hasilKerjaUtama', JSON.stringify(hasilKerjaUtama));
    localStorage.setItem('skp_perilakuKerja', JSON.stringify(perilakuKerja));
    localStorage.setItem('skp_lampiranData', JSON.stringify(lampiranData));
    updatePreview();
}

function updatePreview() {
    const app = document.getElementById('app');
    app.innerHTML = renderSasaranPage() + renderLampiranPage() + renderUmpanBalikPage() + renderEvaluasiPage() + renderDokumenFinal();
}

function renderForm() {
    const formContainer = document.getElementById('form-container');
    
    let html = `
        <div class="form-section">
            <h2>Informasi Umum</h2>
            <div class="form-row">
                <div class="form-group">
                    <label>Nama Instansi</label>
                    <input type="text" id="input-instansi" value="${data.instansi}">
                </div>
                <div class="form-group">
                    <label>Periode Penilaian</label>
                    <input type="text" id="input-periode" value="${data.periode}">
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-section" style="flex: 1;">
                <h2>Data Pegawai (Yang Dinilai)</h2>
                <div class="form-group"><label>Nama</label><input type="text" id="pegawai-nama" value="${data.pegawai.nama}"></div>
                <div class="form-group"><label>NIP</label><input type="text" id="pegawai-nip" value="${data.pegawai.nip}"></div>
                <div class="form-group"><label>Pangkat/Golongan</label><input type="text" id="pegawai-pangkat" value="${data.pegawai.pangkat}"></div>
                <div class="form-group"><label>Jabatan</label><input type="text" id="pegawai-jabatan" value="${data.pegawai.jabatan}"></div>
                <div class="form-group"><label>Unit Kerja</label><input type="text" id="pegawai-unit" value="${data.pegawai.unitKerja}"></div>
            </div>
            <div class="form-section" style="flex: 1;">
                <h2>Data Pejabat (Penilai Kinerja)</h2>
                <div class="form-group"><label>Nama</label><input type="text" id="pejabat-nama" value="${data.pejabat.nama}"></div>
                <div class="form-group"><label>NIP/NRP</label><input type="text" id="pejabat-nip" value="${data.pejabat.nip}"></div>
                <div class="form-group"><label>Pangkat/Golongan</label><input type="text" id="pejabat-pangkat" value="${data.pejabat.pangkat}"></div>
                <div class="form-group"><label>Jabatan</label><input type="text" id="pejabat-jabatan" value="${data.pejabat.jabatan}"></div>
                <div class="form-group"><label>Unit Kerja</label><input type="text" id="pejabat-unit" value="${data.pejabat.unitKerja}"></div>
            </div>
        </div>

        <div class="form-row">
            <div class="form-section" style="flex: 1;">
                <h2>Data Atasan Pejabat Penilai Kinerja</h2>
                <div class="form-group"><label>Nama</label><input type="text" id="atasan-nama" value="${data.atasan.nama}"></div>
                <div class="form-group"><label>NIP/NRP</label><input type="text" id="atasan-nip" value="${data.atasan.nip}"></div>
                <div class="form-group"><label>Pangkat/Golongan</label><input type="text" id="atasan-pangkat" value="${data.atasan.pangkat}"></div>
                <div class="form-group"><label>Jabatan</label><input type="text" id="atasan-jabatan" value="${data.atasan.jabatan}"></div>
                <div class="form-group"><label>Unit Kerja</label><input type="text" id="atasan-unit" value="${data.atasan.unitKerja}"></div>
            </div>
        </div>

        <div class="form-section">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-bottom: 15px;">
                <h2 style="margin: 0; border: none; padding: 0;">Hasil Kerja Utama</h2>
                <button class="btn" id="btnAddRhk">+ Tambah Hasil Kerja</button>
            </div>
            <div id="rhk-container"></div>
        </div>
        
        <div class="form-section">
            <h2>Lampiran</h2>
            <div class="form-row">
                <div class="form-group">
                    <label>Dukungan Sumber Daya <button class="btn" style="padding: 2px 8px; margin-left: 10px;" id="btnAddDukungan">+</button></label>
                    <div id="dukungan-list"></div>
                </div>
                <div class="form-group">
                    <label>Skema Pertanggungjawaban <button class="btn" style="padding: 2px 8px; margin-left: 10px;" id="btnAddSkema">+</button></label>
                    <div id="skema-list"></div>
                </div>
                <div class="form-group">
                    <label>Konsekuensi <button class="btn" style="padding: 2px 8px; margin-left: 10px;" id="btnAddKonsekuensi">+</button></label>
                    <div id="konsekuensi-list"></div>
                </div>
            </div>
        </div>

        <div class="sig-section">
            <h2 style="margin-top:0; border-bottom: 2px solid #f0f0f0; padding-bottom:10px; color:#2c3e50;">✍️ Tanda Tangan Digital</h2>
            <p style="color:#666; font-size:13px; margin-bottom:15px;">Gambar tanda tangan langsung menggunakan kursor/touchscreen, atau unggah file gambar tanda tangan.</p>
            <div class="sig-row">
                <div class="sig-box">
                    <label>Tanda Tangan PEGAWAI YANG DINILAI</label>
                    <canvas id="canvas-pegawai" class="sig-canvas" width="400" height="150"></canvas>
                    <div class="sig-controls">
                        <button id="clear-pegawai" class="btn-sig-clear">🗑 Hapus</button>
                        <label class="btn-sig-upload" for="upload-pegawai">📁 Upload Gambar</label>
                        <input type="file" id="upload-pegawai" accept="image/*" style="display:none;">
                    </div>
                </div>
                <div class="sig-box">
                    <label>Tanda Tangan PEJABAT PENILAI KINERJA</label>
                    <canvas id="canvas-pejabat" class="sig-canvas" width="400" height="150"></canvas>
                    <div class="sig-controls">
                        <button id="clear-pejabat" class="btn-sig-clear">🗑 Hapus</button>
                        <label class="btn-sig-upload" for="upload-pejabat">📁 Upload Gambar</label>
                        <input type="file" id="upload-pejabat" accept="image/*" style="display:none;">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    formContainer.innerHTML = html;
    
    renderRhkList();
    renderSimpleList('dukungan', 'dukungan-list');
    renderSimpleList('skema', 'skema-list');
    renderSimpleList('konsekuensi', 'konsekuensi-list');
    
    bindGeneralInputs();
}

function renderRhkList() {
    const container = document.getElementById('rhk-container');
    container.innerHTML = '';
    
    hasilKerjaUtama.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between;">
                <strong>Hasil Kerja #${index + 1}</strong>
                <button class="btn btn-danger" onclick="deleteRhk(${index})">Hapus</button>
            </div>
            <div class="form-group" style="margin-top: 10px;">
                <label>RHK Pimpinan Yang Diintervensi</label>
                <textarea onchange="updateRhk(${index}, 'rhkPimpinan', this.value)">${item.rhkPimpinan}</textarea>
            </div>
            <div class="form-group">
                <label>Rencana Hasil Kerja</label>
                <textarea onchange="updateRhk(${index}, 'rhk', this.value)">${item.rhk}</textarea>
            </div>
            <div style="margin-left: 20px; border-left: 2px solid #ddd; padding-left: 15px;">
                <strong>Aspek (Kuantitas/Kualitas/Waktu)</strong>
                <div id="aspek-container-${index}"></div>
            </div>
        `;
        container.appendChild(card);
        
        const aspekContainer = document.getElementById(`aspek-container-${index}`);
        item.aspek.forEach((aspek, aIndex) => {
            const aRow = document.createElement('div');
            aRow.className = 'form-row';
            aRow.style.marginTop = '10px';
            aRow.innerHTML = `
                <div class="form-group" style="flex: 0.5;"><input type="text" value="${aspek.jenis}" onchange="updateAspek(${index}, ${aIndex}, 'jenis', this.value)" placeholder="Jenis"></div>
                <div class="form-group" style="flex: 2;"><input type="text" value="${aspek.indikator}" onchange="updateAspek(${index}, ${aIndex}, 'indikator', this.value)" placeholder="Indikator"></div>
                <div class="form-group" style="flex: 0.5;"><input type="text" value="${aspek.target}" onchange="updateAspek(${index}, ${aIndex}, 'target', this.value)" placeholder="Target"></div>
            `;
            aspekContainer.appendChild(aRow);
        });
    });
}

function renderSimpleList(dataType, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    lampiranData[dataType].forEach((item, index) => {
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.marginBottom = '5px';
        div.innerHTML = `
            <input type="text" value="${item}" onchange="updateLampiran('${dataType}', ${index}, this.value)" style="flex: 1; padding: 5px;">
            <button class="btn btn-danger" style="margin-left: 5px; padding: 5px 10px;" onclick="deleteLampiran('${dataType}', ${index})">X</button>
        `;
        container.appendChild(div);
    });
}

// Global functions for inline onclick/onchange handlers
window.updateRhk = (index, field, value) => { hasilKerjaUtama[index][field] = value; saveData(); };
window.updateAspek = (rhkIndex, aspekIndex, field, value) => { hasilKerjaUtama[rhkIndex].aspek[aspekIndex][field] = value; saveData(); };
window.deleteRhk = (index) => { hasilKerjaUtama.splice(index, 1); saveData(); renderRhkList(); };
window.updateLampiran = (type, index, value) => { lampiranData[type][index] = value; saveData(); };
window.deleteLampiran = (type, index) => { lampiranData[type].splice(index, 1); saveData(); renderSimpleList(type, type + '-list'); };

function bindGeneralInputs() {
    const bindStr = (id, obj, field) => {
        document.getElementById(id).addEventListener('change', (e) => {
            obj[field] = e.target.value;
            saveData();
        });
    };
    
    bindStr('input-instansi', data, 'instansi');
    bindStr('input-periode', data, 'periode');
    bindStr('pegawai-nama', data.pegawai, 'nama');
    bindStr('pegawai-nip', data.pegawai, 'nip');
    bindStr('pegawai-pangkat', data.pegawai, 'pangkat');
    bindStr('pegawai-jabatan', data.pegawai, 'jabatan');
    bindStr('pegawai-unit', data.pegawai, 'unitKerja');
    bindStr('pejabat-nama', data.pejabat, 'nama');
    bindStr('pejabat-nip', data.pejabat, 'nip');
    bindStr('pejabat-pangkat', data.pejabat, 'pangkat');
    bindStr('pejabat-jabatan', data.pejabat, 'jabatan');
    bindStr('pejabat-unit', data.pejabat, 'unitKerja');
    bindStr('atasan-nama', data.atasan, 'nama');
    bindStr('atasan-nip', data.atasan, 'nip');
    bindStr('atasan-pangkat', data.atasan, 'pangkat');
    bindStr('atasan-jabatan', data.atasan, 'jabatan');
    bindStr('atasan-unit', data.atasan, 'unitKerja');

    document.getElementById('btnAddRhk').addEventListener('click', () => {
        hasilKerjaUtama.push({
            rhkPimpinan: "RHK Pimpinan Baru",
            rhk: "RHK Baru",
            aspek: [
                { jenis: "Kuantitas", indikator: "Indikator Baru", target: "100" },
                { jenis: "Kualitas", indikator: "Indikator Baru", target: "100%" },
                { jenis: "Waktu", indikator: "Indikator Baru", target: "1 Bulan" }
            ]
        });
        saveData();
        renderRhkList();
    });

    ['dukungan', 'skema', 'konsekuensi'].forEach(type => {
        document.getElementById('btnAdd' + type.charAt(0).toUpperCase() + type.slice(1)).addEventListener('click', () => {
            lampiranData[type].push("Item Baru");
            saveData();
            renderSimpleList(type, type + '-list');
        });
    });

    // ===== SIGNATURE PAD =====
    initSignaturePad('canvas-pegawai', 'signaturePegawai');
    initSignaturePad('canvas-pejabat', 'signaturePejabat');

    // Pre-fill canvas if signature exists
    ['pegawai', 'pejabat'].forEach(who => {
        const key = who === 'pegawai' ? 'signaturePegawai' : 'signaturePejabat';
        if (data[key]) {
            const canvas = document.getElementById('canvas-' + who);
            const img = new Image();
            img.onload = () => {
                canvas.getContext('2d').drawImage(img, 0, 0);
                canvas.classList.add('has-sig');
            };
            img.src = data[key];
        }
    });
}

// ===== SIGNATURE PAD LOGIC =====
function initSignaturePad(canvasId, dataKey) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let lastX = 0, lastY = 0;

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if (e.touches) {
            return [(e.touches[0].clientX - rect.left) * scaleX, (e.touches[0].clientY - rect.top) * scaleY];
        }
        return [(e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY];
    }

    function startDraw(e) { e.preventDefault(); drawing = true; [lastX, lastY] = getPos(e); }
    function stopDraw() {
        if (!drawing) return;
        drawing = false;
        canvas.classList.add('has-sig');
        data[dataKey] = canvas.toDataURL();
        saveData();
    }
    function draw(e) {
        if (!drawing) return;
        e.preventDefault();
        const [x, y] = getPos(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
        [lastX, lastY] = [x, y];
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDraw);

    // Clear button
    const clearBtn = document.getElementById('clear-' + canvasId.split('-')[1]);
    if (clearBtn) clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.classList.remove('has-sig');
        data[dataKey] = null;
        saveData();
    });

    // Upload button
    const uploadInput = document.getElementById('upload-' + canvasId.split('-')[1]);
    if (uploadInput) uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
                const w = img.width * scale, h = img.height * scale;
                ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
                canvas.classList.add('has-sig');
                data[dataKey] = canvas.toDataURL();
                saveData();
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// ===== DATABASE: SIMPAN & CARI =====
function getSkpDatabase() {
    return JSON.parse(localStorage.getItem('skp_database')) || [];
}

function saveSkpToDatabase() {
    const db = getSkpDatabase();
    const id = data.pegawai.nip + '_' + Date.now();
    const record = {
        id,
        savedAt: new Date().toLocaleString('id-ID'),
        nama: data.pegawai.nama,
        nip: data.pegawai.nip,
        jabatan: data.pegawai.jabatan,
        periode: data.periode,
        data: JSON.parse(JSON.stringify(data)),
        hasilKerja: JSON.parse(JSON.stringify(hasilKerjaUtama)),
        perilaku: JSON.parse(JSON.stringify(perilakuKerja)),
        lampiran: JSON.parse(JSON.stringify(lampiranData))
    };
    // Cek apakah NIP sudah ada - update jika ada
    const existingIdx = db.findIndex(r => r.nip === data.pegawai.nip);
    if (existingIdx >= 0) {
        record.id = db[existingIdx].id;
        db[existingIdx] = record;
        alert(`✅ Data SKP atas nama "${data.pegawai.nama}" berhasil diperbarui!`);
    } else {
        db.push(record);
        alert(`✅ Data SKP atas nama "${data.pegawai.nama}" berhasil disimpan!`);
    }
    localStorage.setItem('skp_database', JSON.stringify(db));
}

function loadSkpFromDatabase(record) {
    data = record.data;
    if (!data.signaturePegawai) data.signaturePegawai = null;
    if (!data.signaturePejabat) data.signaturePejabat = null;
    hasilKerjaUtama = record.hasilKerja;
    perilakuKerja = record.perilaku;
    lampiranData = record.lampiran;
    saveData();
    renderForm();
    document.getElementById('db-panel').style.display = 'none';
    alert(`📂 Data SKP "${data.pegawai.nama}" berhasil dimuat!`);
}

function deleteSkpFromDatabase(id) {
    if (!confirm('Yakin ingin menghapus data SKP ini?')) return;
    let db = getSkpDatabase();
    db = db.filter(r => r.id !== id);
    localStorage.setItem('skp_database', JSON.stringify(db));
    renderDbPanel();
}

function renderDbPanel(filter = '') {
    const db = getSkpDatabase();
    const dbList = document.getElementById('db-list');
    const filtered = filter
        ? db.filter(r => r.nama.toLowerCase().includes(filter.toLowerCase()) || r.nip.includes(filter))
        : db;
    if (filtered.length === 0) {
        dbList.innerHTML = `<div class="db-empty">📭 Tidak ada data ditemukan.</div>`;
        return;
    }
    dbList.innerHTML = filtered.map(r => `
        <div class="db-item">
            <div class="db-item-info">
                <strong>${r.nama}</strong>
                <span>NIP: ${r.nip} | ${r.jabatan} | Periode: ${r.periode}</span>
                <span style="color:#aaa;">Disimpan: ${r.savedAt}</span>
            </div>
            <div>
                <button class="btn-load" onclick="loadSkpFromDatabase(${JSON.stringify(r).replace(/"/g, '&quot;')})">📂 Buka</button>
                <button class="btn-danger-sm" onclick="deleteSkpFromDatabase('${r.id}')">🗑️ Hapus</button>
            </div>
        </div>
    `).join('');
}

function resetToNew() {
    if (!confirm('Buat SKP baru? Data identitas pegawai yang dinilai akan dikosongkan. Data Pejabat, Hasil Kerja, dan Lampiran tetap dipertahankan.')) return;
    // Hanya reset identitas PEGAWAI YANG DINILAI dan tanda tangannya
    data.pegawai          = { nama: '', nip: '', pangkat: '', jabatan: '', unitKerja: '' };
    data.signaturePegawai = null;
    // pejabat, atasan, signaturePejabat, hasilKerjaUtama, lampiranData TIDAK direset
    saveData();
    renderForm();
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Preview
    updatePreview();
    // Initialize Form
    renderForm();

    // Tab Switching Logic
    const tabEditor = document.getElementById('tab-editor');
    const tabPreview = document.getElementById('tab-preview');
    const editorView = document.getElementById('editor-view');
    const documentView = document.getElementById('app');
    const printBtn = document.getElementById('printBtn');

    tabEditor.addEventListener('click', () => {
        tabEditor.classList.add('active');
        tabPreview.classList.remove('active');
        editorView.style.display = 'block';
        documentView.style.display = 'none';
        printBtn.style.display = 'none';
    });

    tabPreview.addEventListener('click', () => {
        tabPreview.classList.add('active');
        tabEditor.classList.remove('active');
        editorView.style.display = 'none';
        documentView.style.display = 'block';
        printBtn.style.display = 'block';
    });

    printBtn.addEventListener('click', () => { window.print(); });

    // ===== TOOLBAR BUTTONS =====
    document.getElementById('btnSimpan').addEventListener('click', saveSkpToDatabase);

    document.getElementById('btnBaru').addEventListener('click', resetToNew);

    document.getElementById('btnCari').addEventListener('click', () => {
        const q = document.getElementById('searchInput').value.trim();
        renderDbPanel(q);
        document.getElementById('db-panel').style.display = 'block';
    });

    document.getElementById('searchInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('btnCari').click();
    });

    document.getElementById('btnTutupDb').addEventListener('click', () => {
        document.getElementById('db-panel').style.display = 'none';
    });
});
