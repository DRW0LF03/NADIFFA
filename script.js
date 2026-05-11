// بيانات المواعيد
const data = [
    { neighborhood: "وسط المدينة", days: "الأحد - الخميس", time: "07:00" },
    { neighborhood: "حي السلام", days: "يومياً", time: "22:00" }
];

// تهيئة الخريطة (باستخدام Leaflet المجانية)
let map = L.map('map').setView([36.75, 3.05], 13); // إحداثيات افتراضية للجزائر
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// تحميل الجدول
function loadTable() {
    const body = document.getElementById('scheduleTable');
    body.innerHTML = data.map(item => `
        <tr><td>${item.neighborhood}</td><td>${item.days}</td><td>${item.time}</td></tr>
    `).join('');
}

// وظائف النافذة المنبثقة
function openReportModal(type) {
    document.getElementById('modalTitle').innerText = "تبليغ عن نفايات " + type;
    document.getElementById('reportModal').style.display = "block";
}

function closeModal() {
    document.getElementById('reportModal').style.display = "none";
}

// GPS تلقائي
function getGPS() {
    const gpsText = document.getElementById('gpsText');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(p => {
            gpsText.innerText = `تم تحديد الموقع: ${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`;
        });
    }
}

// إرسال البلاغ
function submitReport() {
    alert("تم إرسال البلاغ مع الصورة والموقع بنجاح إلى شركة النظافة!");
    closeModal();
}

window.onload = function() {
    loadTable(); // Your existing function

    // Set a timeout (e.g., 2500 milliseconds = 2.5 seconds)
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.classList.add('fade-out');
        
        // Completely remove from DOM after fade finishes so it doesn't block clicks
        setTimeout(() => {
            splash.style.display = 'none';
        }, 500); 
    }, 2500);
};