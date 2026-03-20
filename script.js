const gateway = document.getElementById('gateway');
const btnBuka = document.getElementById('btn-buka');
const mainContent = document.getElementById('main-content');
const bgm = document.getElementById('bgm');
const btnNggak = document.getElementById('btn-nggak');
const btnIya = document.getElementById('btn-iya');

// 1. Buka Pesan & Play Music
btnBuka.addEventListener('click', () => {
    bgm.play().catch(err => console.log("Auto-play ditahan browser", err));
    
    gateway.style.opacity = '0';
    setTimeout(() => {
        gateway.style.display = 'none';
        
        // JURUS ANTI MEROSOT: Paksa scroll balik ke paling atas
        window.scrollTo(0, 0);
        
        // Munculin konten utama & buka kunci scroll
        mainContent.style.opacity = '1';
        document.body.style.overflowY = 'auto'; 
        
    }, 800);
});

// 2. Logic Tombol Kabur
const lariDong = () => {
    // Ubah ke fixed biar tombolnya melayang di seluruh layar
    btnNggak.style.position = 'fixed';
    
    // Ngitung area aman biar tombol nggak nabrak pinggir layar
    const amanX = window.innerWidth - btnNggak.offsetWidth - 30;
    const amanY = window.innerHeight - btnNggak.offsetHeight - 30;

    const acakX = Math.max(20, Math.floor(Math.random() * amanX));
    const acakY = Math.max(20, Math.floor(Math.random() * amanY));

    btnNggak.style.left = `${acakX}px`;
    btnNggak.style.top = `${acakY}px`;
    // Tambah rotasi dikit biar lucu pas kabur
    btnNggak.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
};

btnNggak.addEventListener('mouseover', lariDong);
btnNggak.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    lariDong();
});

// 3. Logic Jadian (Confetti)
btnIya.addEventListener('click', () => {
    var duration = 4 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#e11d48', '#ffffff', '#ff4c4c'] // Merah Marun, Putih Bersih, Merah Terang
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#e11d48', '#ffffff', '#ff4c4c'] // Merah Marun, Putih Bersih, Merah Terang
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    setTimeout(() => {
        alert("Yessss! ❤️ Coba cek WhatsApp kamu sekarang ya.");
    }, 2000);
});

// 4. Logic Auto Slider Foto
const slides = document.querySelectorAll('.photo-slide');
let currentSlide = 0;

if(slides.length > 0) {
    setInterval(() => {
        // Ilangin foto sekarang
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0');
        
        // Pindah ke foto berikutnya (kalau udah mentok, balik ke 0)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Munculin foto baru
        slides[currentSlide].classList.remove('opacity-0');
        slides[currentSlide].classList.add('opacity-100');
    }, 3000); // Ganti foto setiap 3 detik (3000 ms)
}

// Variable buat suara rekaman lu
const suaraWahyu = new Audio('MIC.mp4'); 
let sudahMain = false;

window.addEventListener('scroll', () => {
    // Pakai selector section terakhir biar pasti kena
    const sectionNembak = document.querySelector('section:last-of-type'); 
    if(!sectionNembak) return;

    const posisi = sectionNembak.getBoundingClientRect();
    
    // Pas section nembak kelihatan setengah di layar
    if (posisi.top < window.innerHeight * 0.6 && !sudahMain) {
        sudahMain = true;
        
        if(bgm) {
            // LANGSUNG DROP VOLUME KE 5% (Sangat Kecil)
            bgm.volume = 0.05; 
            
            // Jeda 300ms biar kuping nggak kaget, baru suara lu masuk
            setTimeout(() => {
                suaraWahyu.play().catch(e => console.log("Gagal putar MIC:", e));
                console.log("Backsound dikecilkan, suara Wahyu masuk!");
            }, 300);
        }
    }
});