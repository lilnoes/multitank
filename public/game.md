I want to develop a game of the following description:
***
Oyundaki Tankların tamamı ağ üzerinden oyuna bağlanan kullanıcılar tarafından yönetilecektir. Tankların yönü 360
derece değişebilir. Namlu yönü sabit veya yine 360 derece değişebilir tasarlanabilir. Burada seçim öğrenciye
bırakılmıştır. Oyun esnasında bir sunucu uygulama tüm oyuncuların bağlantı kuracağı bir merkez olacaktır. Oyuncular
oyun ile ilgili bilgileri sunucudan alacak ve arayüz çizimleri buna istinaden yapılacaktır. Oyuncu hareketi klavyeden
alınacak ve yapılan işlem sunucuya gönderilecektir. Sunucuda hesaplama yapılıp oyunun yeni durumu ile ilgili bilgiler
tüm oyunculara yayımlanır. Eğer Oyuncu bilgisayarındaki değerlerle sunucudan gelen değerler arasında uyuşmazlık
varsa (Örneğin tankım konumu gibi) sunucudan gelen değerle yola devam edilir.
***
The games has the following rules:
Oyuncuların bağlanacağı merkezi bir sunucu uygulaması olacaktır. Oyuncuların bağlanmasını belli bir port
üzerinden dinleyecektir. Sunucu uygulamasının bir arayüzü olmak zorunda değildir. Ama hata ayıklama
işlemleri için arayüze sahip olması tercih edilebilir.
**************
Sunucu üzerinde eş zamanlı olarak birbirinden bağımsız birden fazla oyun başlatılabilmelidir.
**************
Oyuncular oyuna başlamadan önce bir oda içerisinde mesajlaşma yapabilir.
**************
Oyunculardan bir tanesi bir oyun başlatmak için sunucuya komut gönderir. (Arayüzde OyunKur gibi.) Bu
işlemden sonra Sunucu tüm bağlı kullanıcıların görebileceği bir oyunu aktif oyunlar listesi “Yeni Oyun”
durumunda ve kullanıcının belirleyeceği bir başlıkla ekler.
**************
Oyun kuran oyuncu oyunun kuralları ile ilgili ayarları girer ve diğer oyuncuların katılımını bekler. En az iki
oyuncu olan bir oyun başlatılabilir.
**************
Oyun kurulumunda oyunun kaç tur olacağı, harita tipi(varsa), Oyunda hediye güçlendirme paketlerinin olup
olmayacağı (varsa), top mermisi yüklenme süresi (Arka arkaya atışların kaç milisaniye arayla yapılabileceği) ve
oyun içerisinde düşünülecek ekstra özellikler varsa bunları içerecektir.
**************
Oyun kuran istemci beklediği katılımcı sayısı sağlandığında Oyuna Başla butonunun aktif olması neticesinde
oyunu başlatabilir. Oyun başladıktan sonra tüm kullanıcıların harita yüklemesi tamamlandı bilgisini alan sunucu
5sn geri sayım yaparak tüm kullanıcılar için oyun başlatma mesajını ve harita bilgisini yayımlar ve oyun
başlatılır.
**************
Oyun başladıktan sonra ilgili oyuna yeni kullanıcı girişi yapılamaz ama sunucuya bağlanan kullanıcılar başka bir
oyun kurarak başka katılımcıların bağlanmasını bekleyebilir.
**************
Başlayan oyun Sunucunun yayınlamakta olduğu oyunlar listesinde “Oynanıyor” durumunda katılımcı sayısı ile
birlikte gösterilir.
**************
Oyun kurulumda belirtilen kriterler sağlandığında sonlanır ve oyuncuların aldıkları puanlar tüm oyuncuların
ekranlarına yansıtılır.
**************
Oyun esnasında bir oyuncu oyundan düşerse tankı haritadan çıkarılır ve tekrar oyuna alınmaz. Ancak bir başka
oyun oturumuna katılabilir.
**************
İstemciler aşağıdaki ekranlara sahip olacaktır:
a. Oyun Giriş/Kayıt: (Kullanıcı adı şifre tanımlama ve oluşturma ile sunucuya bağlanma işlemi)
b. Lobi: Sunucuda bağlı oyuncu listesi, oyun listesinin görüldüğü ve serbest mesajlaşma yapılan ekran
c. Oyun Kurma Ekranı: Oyun kuran kullanıcının oyun parametrelerini tanımladığı ekran
d. Oyun Bekleme Ekranı: Oyun kuran ve kurulan oyuna bağlanan kullanıcıların oyunu kuran kişinin Oyunu
Başlat komutu verene kadar beklediği ekran.
e. Oyun Ekranı: Başlayan oyunun Harita, Radar ve Tankların yerleşiminin yapılacağı ana ekranımız
olacaktır.
f. Oyun Sonu: Oyun bitiminde oyuncu istatistiklerinin verildiği ekran.
g. Lider Tablosu: Sunucuda Aktif oyunlar içerisinde oyuncuların aldığı en iyi skorları gösteren tablo
h. Hakkında: Oyunun nasıl oynanacağı geliştirici ekip ve ders bilgisinin yar alacağı ekran.
*****************
Sunucu-İstemci haberleşmesi için öğrenciler kendi protokollerini tasarlayacaktır. Bu protokol listesi
FTP protokolü gibi mesaj başlığı ve içeriğini birbirinden ayırt etmek için geliştirilecek uygulamada
kullanılacaktır. Tasarlanan protokol, sonlu durum makinası (FSM) veya benzer bir sembolize anlatım
yöntemi ile proje tesliminde sunulacaktır. Protokoldeki tüm mesaj tipleri ve mesajların ilgili taraf
tarafından alındığında yapılacak işlem listesi tablo şeklinde verilecektir. Tam bir protokol dokümanı ağ
üzerinde haberleşecek iki uç sistemin birbirinin kodlamasını bilmeden karşı tarafla düzgün
mesajlaşmayı nasıl yapabileceğinin anlatıldığı dokümanlardır. Protokol dokümanınız dilden bağımsız
bir doküman olmalıdır. Bu nedenle Protokol dokümanı içerisinde kod örneği bulunmamalıdır.
********************
I want you to design in form of a finite state machine, all necessary messages that this game needs. Messages should include all necessary and required communications from the client to the server. and this specifications will be something close to FTP protocol or any other official protocol.