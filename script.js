const scriptURL = 'https://script.google.com/macros/s/AKfycbwm__2LPEVVI34J6T7i_5j1l8q4AEw7tY_cOjnnUBxQTT4021Kx800cBQRmAq2XaNZFRQ/exec';

const form = document.getElementById('franchiseForm');
const submitBtn = document.getElementById('submitBtn');
const statusMsg = document.getElementById('status-msg');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // تجهيز الواجهة للإرسال ومنع الضغط المتكرر
    submitBtn.disabled = true;
    submitBtn.innerText = "جاري إرسال طلبك...";
    statusMsg.style.display = "none"; 
    
    // استخدام FormData لجمع البيانات
    const formData = new FormData(form);

    fetch(scriptURL, { 
        method: 'POST', 
        body: formData,
        mode: 'no-cors' // تم إضافة هذا الوضع لضمان عبور الطلب دون قيود CORS من المتصفح
    })
    .then(() => {
        // بما أن no-cors لا تعيد استجابة مقروءة، نعتبر وصول الوعد هنا علامة نجاح الإرسال
        statusMsg.style.display = "block";
        statusMsg.style.backgroundColor = "#1b5e20"; /* لون أخضر داكن للنجاح */
        statusMsg.style.color = "#ffffff";
        statusMsg.innerText = "تم إرسال طلب الامتياز بنجاح! سيقوم فريق ديتاليو اوتو بمراجعة طلبكم والتواصل معكم قريباً.";
        
        form.reset(); // تفريغ الحقول
        submitBtn.disabled = false;
        submitBtn.innerText = "رفع الطلب";
    })
    .catch(error => {
        console.error('Error!', error.message);
        statusMsg.style.display = "block";
        statusMsg.style.backgroundColor = "#b71c1c"; /* لون أحمر داكن للخطأ */
        statusMsg.style.color = "#ffffff";
        statusMsg.innerText = "حدث خطأ أثناء الإرسال. يرجى التحقق من الاتصال والمحاولة مرة أخرى.";
        
        submitBtn.disabled = false;
        submitBtn.innerText = "رفع الطلب";
    });
});