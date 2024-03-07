#OPREC RISTEK UI 2024

Annonate hal - hal seru dan ter**** yang saya temukan sepanjang proses _developing_ API Ristek 2024, dimana merupakan projeck API dan juga NoSQL untuk _open recruiment web development_ RISTEK UI 2024

Sebagai orang yang saat SMA tidak punya latar belakang pengembangan perangkat lunak, Saya sebetulnya cukup meremehkan mengenai kuantitas dan _mental pressure_ yang hadir dari kegiatan ini. Karena tidak seperti asumsi saya yang mengira bahwa proses _developing_ adalah suatu proses yang relatif mudah namun sangat repetitif sehingga membutuhkan waktu yang lama. Namun, sebagai orang yang awam dan juga mengikuti _trend_ di kalangan anak muda menggunakan suatu _framework_ dan mekanik kekinian ditambah lagi oprec ristek yang hadir pada saat yang tidak "diduga - duga" (baca: bekingan kurang sakti 'dikit'), saya pun mengikuti tutorial video youtube pertama yang muncul ketika saya mengetik "how to create an API", dimana pada 3 minggu kedepannya saya terjebak dengan paradigma dari js yang kadang diluar akal. Saya pun mulai memahami mengapa banyak lulusan studi komputer yang lebib memilih untuk "berkarya" di luar jurusan S1 mereka. Tapi memang sebagai orang yang mengambil matkul "MPKT" di FIA saya melihat _vibes_ FIA dan FISIP nampak lebih humanis. Entah, mengapa ketika saya baru pertama kali masuk mereka dapat dengan mudah mengidentifikasi mahasiswa non-FIA seperti saya. 

Kembali ke kasus awal ada beberapa hal concern yang saya secara pribadi ingin tanamkan dalam dirinya saya.

> Use Version Control System
> 
Hal ini mungkin akan menjadi lelucon untuk saya 1 bulan yang lalu, namun setelah mereasakan kodingan yang saya koding ngebut 12 jam nonstop dari jam 6an malam hingga 6an pagi tiba - tiba secara "ajaib" menghilang. Rasa ingin menjadi bapak - bapak pengangguran entah mengapa sangat menguat (?) Tentu saya paham kemungkinan besar ada "perilaku" saya yang menyebabkan anomali, namun tetap menulis 3 kode sebagai bahan dokumentasi + terlihat sebagai mas - mas wibu jago lebih _worth it_ dibanding resiko hilangnya 12 jam waktu pengembangan yang sangat melelahkan secara psikis dan mental

> Realibility
>
Sebagai seseorang yang selama SMA didorong oleh sekolah untuk mempelajari teka teki aneh di TLX dan Codeforce, saya pun terbiasa untuk mengasumsikan panjangnya waktu tunggu atau beberapa error sebagai suatu hal yang signifikan. Namun, dalam kasus pengembangan lapangan saya baru menyadari bahwa dalam implementasi dunia nyata perubahan dari error dan valid memerlukan suatu waktu. Selain itu, saya juga lebih terdolong untuk dapat memikirkan kasus - kasus random dimana seorang user secara ajaib mampu menemukan proses terbaik membuat suatu program menjadi _crash._ 

> Indeksisasi pada mongoose
>
Jujur ini adalah topik yang sampai saat ini membuat saya _amaze_, yakni secara sadar mongoose umumnya menyimpan datanya dalam bentuk suatu map atau dictionary, sehingga proses kueri akan lebih cepat apabila kita menggunakan method dasar dari mongoose yang umumnya dilakukan secara asynchronous, namun hal ini sebenarnya lebih efisien dibandingkan kita melakukan iterasi pada semua array hingga menemukan data yang kita miliki. Namun, jujur saya masih _amaze_ terkait tata cara pengimplemtasian tipa data seperti itu, karena pada sepemahaman saya basis dari set adalah pointer dan address dari data - data yang ada. Namun, masalahnya kita bukan bermain dengan hal - hal kecil, namun hingga proses kompleks yang memerlukan data yang sangat banyak dan juga memerlukan waktu produksi secepat mungkin. Sehingga saya masih takjub dengan cara mongoose mampu mengimplementasikan teknologi seperti itu.

> Relationship Pada Database
>
Hal ini ternyata merupakan suatu hal yang kompleks karena selain sebagai tugasnya untuk membuat proses penyimpanan lebih efktif dan cepat, namun pada disaat yang sama kita perlu memikirkan bagaimana struktur data - data dasar kita dapat menghasilkan suatu struktur unik yang kita mau. 

> DNS
>
Dikarenakan sering bermain dengan database saya pun mulai memahami seberapa penting data profil internet kita di muka publik. Karena berkat itu, saya telah menghabiskan beberapa hari sepi saya untuk duduk di kursi asrama dari pagi hingga malam, dikarenakan entah mengapa ketika saya menggunakan _mobile hostpot_ meskipun saya telah membuat database mampu diakses publik tanpa IP tertentu saja, namun secara ajaib ketika saya menggunakan internet dari gawai saya secara tiba-tiba program menolak untuk tersambung ke database. Namun, ketika saya menyambung dengan jaringan publik seperti _hotspot UI_ dan lain - lain. Sehingga pada akhirnya setelah menulusuri berbagai forum dan video youtube, saya pun mulai paham bbahwa ada suatu hal bernama DNS dimana merupakan wujud profil asli perangkat kita di Intenet. Sehingga ketika saya menggunakan internet dari gawai saya, ada perubahan yang saya juga masih kurang pahami dalam DNS saya sehingga membuat bahkan profil database saya yang public tidak dapat diakses. Namun, setelah saya menggunakan beberapa proxy dan perangkat yang dapat mengelola DNS saya "baca: cuma buat baca reddit doang", saya pun langsung mampu tersambung dengan database yang seharusnya. Jujur saya sebenarnya masih bingung kenapa hal tersebut dapat terjadi, tapi jelas ini suatu hal yang keren aja kalau diomongin

> Bahasa Archaic
>
Saya baru tahu bahwa sebenarnya dalam method sendiri ada beberapa yang bisa disebut kapabel dan bagus namun ada juga yang mmebuat kehidupan kita menjadi 100% lebih susah. seperti dalam tahap awal pengembangan saya menggunakan methode fecth yang nana sejauh saya cari termasuk dalam methode yang sangat tua dan banyak masalah. Dimana saya setidaknya menghabiskan satu malam untuk paham sebenarnya apa yang salah.

> PORT dan aristektur interakasi dalam komputer
>
Setelah berkali - kalai error karena lupa menaruh "use client" atau secra ***** menggunkana "use-client" dan pusing seharian mempertanyakan hal apa  yang bisa bikikn salah. saya pun mulai memahami tentang _nature_ dari berbagai pentuk protokeler yang berbeda - beda. Setidaknya saya mengeri mengapa menggunakan https terkdaang hal yang buruk

> CORS
>
Benda aneh yang sangat random, sepengetahuan saya hal ini hanyalah suatu bentuk protokol sehingga PORT dan konsekusensinya data kita sulit dimasukin orang hanya saja kadang 3 detik setelah aman bisa kenak cors lagi itu gimana terus nyobak input yang sama tiba - tiba bisa,

> Bukan karena dia murah dan terkenal itu bagus
>
Karena pusing kenak coors entah dimana padahal headernya udah di config macem macem saya pun tergerak untuk mendeploy backend saya agar datanya bisa saya ambil online. Tapi sebagai mahasiswa tentu cari yang gratisan kan, dan karena _confidence_ pernah _deploy_ ditempat yang sama jadinya ngeremehin. Tapi ternyata hampir impossible. Tolong siapapun ajarkan tutorial mendeploy express di vercell. Bayangin examples yang dikasih dari vercell aja ngga bsia jalan, ini itu maksdunya mau gimana coba?

Mungkin itu notulensi beberapa minggu (baca: hari) ini  









