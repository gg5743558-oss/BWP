/* ===== ملف الجافاسكريبت الرئيسي ===== */

// بيانات الفعاليات (بدل قاعدة بيانات، نخزنها هنا في مصفوفة)
const events = [
  { id: 1, title: "مهرجان الثقافة الافتراضي", cat: "ثقافة", date: "2026-11-02", place: "المسرح الافتراضي", img: "event1.svg", featured: true,
    short: "أمسية ثقافية فيها شعر وحوارات ومعرض فني.",
    desc: "مهرجان ثقافي كبير يجمع الطلاب والأساتذة لمدة يوم كامل. يتضمن أمسيات شعرية وحوارات مع كتّاب وفنانين ومعرض فني افتراضي يعرض أعمال الطلاب." },
  { id: 2, title: "بطولة الألعاب الإلكترونية", cat: "رياضة", date: "2026-11-05", place: "القاعة الرئيسية", img: "event2.svg", featured: true,
    short: "منافسات بين الكليات في أشهر الألعاب.",
    desc: "بطولة بين كليات الجامعة في عدة ألعاب إلكترونية. التسجيل مفتوح لكل الطلاب وهناك جوائز للفرق الفائزة وشهادات مشاركة." },
  { id: 3, title: "أمسية موسيقية على العود", cat: "موسيقى", date: "2026-11-08", place: "المسرح الافتراضي", img: "event3.svg", featured: true,
    short: "عزف مباشر لمجموعة من طلاب الجامعة.",
    desc: "أمسية هادئة يعزف فيها طلاب موهوبون مقطوعات تراثية وحديثة على العود. الدخول مجاني ومفتوح للجميع." },
  { id: 4, title: "يوم العائلة المفتوح", cat: "عائلي", date: "2026-11-12", place: "ساحة الجامعة", img: "event4.svg", featured: false,
    short: "يوم ترفيهي للطلاب وعائلاتهم.",
    desc: "يوم مفتوح يدعو فيه الطلاب عائلاتهم للتعرف على الجامعة، مع ألعاب للأطفال ومسابقات ومفاجآت." },
  { id: 5, title: "ورشة البرمجة للمبتدئين", cat: "ثقافة", date: "2026-11-15", place: "المكتبة الرقمية", img: "event5.svg", featured: false,
    short: "ورشة عملية لتعلم أساسيات HTML و CSS.",
    desc: "ورشة تدريبية عملية يتعلم فيها المشاركون أساسيات بناء صفحات الويب خطوة بخطوة مع تمارين تطبيقية." },
  { id: 6, title: "معرض الكتاب الجامعي", cat: "ثقافة", date: "2026-11-20", place: "المكتبة الرقمية", img: "event6.svg", featured: false,
    short: "كتب وإصدارات جديدة بخصومات للطلاب.",
    desc: "معرض يعرض كتبًا من دور نشر مختلفة، مع لقاءات مع مؤلفين وتوقيع كتب وخصومات خاصة للطلاب." },
  { id: 7, title: "ماراثون الجامعة", cat: "رياضة", date: "2026-11-25", place: "ساحة الجامعة", img: "event7.svg", featured: false,
    short: "سباق جري لكل الأعمار.",
    desc: "ماراثون سنوي للجري بمسافات مختلفة تناسب الجميع. سيحصل كل مشارك على ميدالية تذكارية." },
  { id: 8, title: "حفل التخرج السنوي", cat: "عائلي", date: "2026-12-01", place: "القاعة الرئيسية", img: "event8.svg", featured: false,
    short: "حفل تكريم الخريجين.",
    desc: "حفل كبير لتكريم الخريجين بحضور الأهل والأساتذة، يتضمن كلمات وتسليم شهادات وفقرات فنية." }
];

// ألوان التصنيفات
const catColor = { "ثقافة": "bg-primary", "رياضة": "bg-success", "موسيقى": "bg-danger", "عائلي": "bg-warning text-dark" };

// تحويل التاريخ لشكل مقروء
function fmt(d) {
  return new Date(d).toLocaleDateString("ar", { year: "numeric", month: "long", day: "numeric" });
}

// هل الفعالية اليوم؟ (بطاقة الحدث اليوم)
function isToday(d) {
  return d === new Date().toISOString().slice(0, 10);
}

// يبني كرت فعالية (HTML)
function card(e) {
  const todayBadge = isToday(e.date) ? '<span class="badge bg-danger today-badge">اليوم!</span>' : "";
  return `
  <div class="col-12 col-sm-6 col-lg-3 mb-4">
    <div class="card event-card h-100 shadow-sm card-wrap">
      ${todayBadge}
      <img src="assets/img/${e.img}" class="card-img-top" alt="${e.title}">
      <div class="card-body d-flex flex-column">
        <span class="badge ${catColor[e.cat]} mb-2 align-self-start">${e.cat}</span>
        <h5 class="card-title">${e.title}</h5>
        <p class="small text-muted mb-1">📅 ${fmt(e.date)}</p>
        <p class="small text-muted">📍 ${e.place}</p>
        <p class="card-text">${e.short}</p>
        <a href="event.html?id=${e.id}" class="btn btn-main mt-auto">التفاصيل</a>
      </div>
    </div>
  </div>`;
}

// ===== الصفحة الرئيسية =====
const carouselBox = document.getElementById("carouselItems");
if (carouselBox) {
  // السلايدر: نعرض الفعاليات البارزة فقط (Bootstrap Carousel)
  const feat = events.filter(e => e.featured);
  carouselBox.innerHTML = feat.map((e, i) => `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <img src="assets/img/${e.img}" class="d-block w-100" alt="${e.title}">
      <div class="carousel-caption">
        <h4>${e.title}</h4>
        <p>${fmt(e.date)} - ${e.place}</p>
        <a href="event.html?id=${e.id}" class="btn btn-second btn-sm">التفاصيل</a>
      </div>
    </div>`).join("");

  // أحدث الفعاليات (أول 4)
  document.getElementById("latestEvents").innerHTML = events.slice(0, 4).map(card).join("");
}

// ===== صفحة كل الفعاليات (الفلترة) =====
const list = document.getElementById("eventsList");
if (list) {
  const search = document.getElementById("search");
  const catSel = document.getElementById("catFilter");
  const placeSel = document.getElementById("placeFilter");
  const dateIn = document.getElementById("dateFilter");

  // نملأ قائمة الأماكن من البيانات
  [...new Set(events.map(e => e.place))].forEach(p => {
    placeSel.innerHTML += `<option>${p}</option>`;
  });

  // لو المستخدم اختار تصنيف من الرئيسية (أو محفوظ بالـ localStorage) نطبقه
  const urlCat = new URLSearchParams(location.search).get("cat");
  const saved = urlCat || localStorage.getItem("favCat") || "";
  catSel.value = saved;

  function showEvents() {
    const text = search.value.trim();
    const res = events.filter(e =>
      (text === "" || e.title.includes(text) || e.short.includes(text)) &&
      (catSel.value === "" || e.cat === catSel.value) &&
      (placeSel.value === "" || e.place === placeSel.value) &&
      (dateIn.value === "" || e.date >= dateIn.value)
    );
    list.innerHTML = res.length ? res.map(card).join("")
      : '<div class="alert alert-warning">لا توجد فعاليات مطابقة للبحث</div>';
    document.getElementById("count").textContent = res.length;
  }

  [search, catSel, placeSel, dateIn].forEach(el => el.addEventListener("input", () => {
    // نحفظ التصنيف المفضل
    localStorage.setItem("favCat", catSel.value);
    showEvents();
  }));
  document.getElementById("resetBtn").addEventListener("click", () => {
    search.value = ""; catSel.value = ""; placeSel.value = ""; dateIn.value = "";
    localStorage.removeItem("favCat");
    showEvents();
  });
  showEvents();
}

// ===== صفحة تفاصيل الفعالية =====
const detailBox = document.getElementById("eventDetails");
if (detailBox) {
  const id = Number(new URLSearchParams(location.search).get("id")) || 1;
  const e = events.find(x => x.id === id) || events[0];

  document.title = e.title + " - دليل فعاليات الجامعة الافتراضية";
  detailBox.innerHTML = `
    <span class="badge ${catColor[e.cat]} mb-2">${e.cat}</span>
    <h1>${e.title}</h1>
    <p class="lead">📅 ${fmt(e.date)} &nbsp;|&nbsp; 📍 ${e.place}</p>
    <img src="assets/img/${e.img}" class="img-fluid rounded mb-3" alt="${e.title}">
    <p>${e.desc}</p>`;
  document.getElementById("modalTitle").textContent = "حجز مكان في: " + e.title;

  // معرض صغير: نعرض صور فعاليات أخرى
  document.getElementById("gallery").innerHTML = events.filter(x => x.id !== e.id).slice(0, 3)
    .map(x => `<div class="col-4"><img src="assets/img/${x.img}" class="img-fluid rounded" alt="${x.title}"></div>`).join("");

  // فعاليات ذات صلة (نفس التصنيف، وإذا ما في نعرض غيرها)
  let rel = events.filter(x => x.cat === e.cat && x.id !== e.id);
  if (rel.length === 0) rel = events.filter(x => x.id !== e.id).slice(0, 2);
  document.getElementById("related").innerHTML = rel.slice(0, 2).map(x => `
    <div class="card mb-3 shadow-sm"><div class="row g-0 align-items-center">
      <div class="col-4"><img src="assets/img/${x.img}" class="img-fluid rounded-start" alt=""></div>
      <div class="col-8"><div class="card-body p-2">
        <h6 class="mb-1">${x.title}</h6>
        <a href="event.html?id=${x.id}" class="small">عرض</a>
      </div></div></div></div>`).join("");

  // زر أضف للتقويم: ننشئ ملف ics ونحمله
  document.getElementById("calBtn").addEventListener("click", () => {
    const d = e.date.replace(/-/g, "");
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${e.title}\nDTSTART;VALUE=DATE:${d}\nLOCATION:${e.place}\nEND:VEVENT\nEND:VCALENDAR`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "event.ics";
    a.click();
  });

  // زر شارك: ننسخ الرابط
  document.getElementById("shareBtn").addEventListener("click", () => {
    navigator.clipboard.writeText(location.href).then(() => {
      document.getElementById("shareMsg").classList.remove("d-none");
      setTimeout(() => document.getElementById("shareMsg").classList.add("d-none"), 2500);
    });
  });

  // نموذج الحجز الوهمي داخل المودال
  document.getElementById("bookBtn").addEventListener("click", () => {
    const n = document.getElementById("bookName").value.trim();
    const box = document.getElementById("bookMsg");
    if (n === "") {
      box.className = "alert alert-danger mt-3";
      box.textContent = "اكتب اسمك أولاً";
    } else {
      box.className = "alert alert-success mt-3";
      box.textContent = "تم الحجز بنجاح يا " + n + " ✅";
    }
  });
}

// ===== صفحة اتصل بنا (التحقق من النموذج) =====
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", function (ev) {
    ev.preventDefault(); // نمنع إرسال الفورم الحقيقي
    const name = document.getElementById("cName").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const msg = document.getElementById("cMsg").value.trim();
    const alertBox = document.getElementById("formAlert");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // فحص بسيط للبريد

    if (name === "" || email === "" || msg === "") {
      alertBox.className = "alert alert-danger";
      alertBox.textContent = "الرجاء تعبئة كل الحقول المطلوبة.";
    } else if (!emailOk) {
      alertBox.className = "alert alert-danger";
      alertBox.textContent = "صيغة البريد الإلكتروني غير صحيحة.";
    } else if (msg.length < 10) {
      alertBox.className = "alert alert-warning";
      alertBox.textContent = "الرسالة قصيرة، اكتب 10 أحرف على الأقل.";
    } else {
      alertBox.className = "alert alert-success";
      alertBox.textContent = "تم إرسال رسالتك بنجاح، شكراً " + name + "!";
      form.reset();
    }
  });
}

// ===== الوضع الداكن (Bonus) =====
const html = document.documentElement;
html.setAttribute("data-bs-theme", localStorage.getItem("theme") || "light");
document.querySelectorAll(".darkBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const now = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-bs-theme", now);
    localStorage.setItem("theme", now);
  });
});

// ===== زر العودة للأعلى (Bonus) =====
const topBtn = document.getElementById("topBtn");
if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// حفظ التصنيف عند الضغط على شارات التصنيفات في الرئيسية
document.querySelectorAll(".cat-badge").forEach(b => {
  b.addEventListener("click", () => localStorage.setItem("favCat", b.dataset.cat));
});
