/* ============================================================
   لوحة تحكم الطالب — ملف JavaScript
   dashboard.js
   Stack: Vanilla JS (ES6+)
   البنية: بيانات وهمية ← طبقة الخدمات ← دوال العرض
============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════════
   1. بيانات النظام (مؤقتة)
   ══════════════════════════════════════════════════════════════
   ملاحظة: هذه البيانات مؤقتة لأغراض التطوير.
   TODO: استبدل كل ثابت ببيانات حقيقية قادمة من الخادم (API).
══════════════════════════════════════════════════════════════ */

/**
 * قائمة الاختبارات المتاحة
 * TODO: استبدل بـ GET /api/exams
 * يمكن للمعلم إضافة اختبارات جديدة أو تعديلها عبر لوحة الإدارة (POST/PUT)
 */
const EXAM_CATALOGUE = [
  { id: 'MID-MATH-25',   name: 'منتصف الفصل –',                 },

  { id: 'QUIZ-MATH-1',   name: 'اختبار الأول',                           },
  { id: 'QUIZ-SCI-1',    name: 'اختبار  الأول',                       },
  { id: 'FINAL-MATH-25', name: 'الاختبار النهائي ',  },
];

/**
 * قاعدة بيانات الدرجات
 * المفتاح: رقم الطالب → رمز الاختبار → بيانات الدرجة
 * TODO: استبدل بـ GET /api/grades?studentId=X&examId=Y
 */
const GRADES_DB = {
  '202407': {
    'MID-MATH-25': { score: 92, total: 100, rank: 3,  grade: 'A',  feedback: 'أداء ممتاز في جميع المحاور، واصل التفوق!' },
    'MID-SCI-25':  { score: 78, total: 100, rank: 11, grade: 'B',  feedback: 'جهد جيد، راجع الفصل الخامس بعناية.' },
    'MID-ARA-25':  { score: 85, total: 100, rank: 6,  grade: 'A',  feedback: 'مفردات قوية واستخدام سليم للقواعد.' },
    'QUIZ-MATH-1': { score: 18, total: 20,  rank: 2,  grade: 'A+', feedback: 'شبه كامل، عمل رائع جداً!' },
  },
  '202408': {
    'MID-ENG-25':  { score: 71, total: 100, rank: 18, grade: 'C',  feedback: 'ركز على قسم القواعد والاستيعاب.' },
  },
};

/**
 * بيانات الحضور الشهري
 * TODO: استبدل بـ GET /api/attendance?studentId=X&month=YYYY-MM
 */
const ATTENDANCE_DATA = {
  studentId: '202407',
  month:     'مارس 2025',
  totalDays: 22,
  present:   19,
  absent:    3,
  late:      1,
  excused:   1,
  subjects: [
    { name: 'الرياضيات',       present: 21, total: 22, barClass: 'bar-sage' },
    { name: 'العلوم',           present: 19, total: 22, barClass: 'bar-teal' },
    { name: 'اللغة العربية',    present: 22, total: 22, barClass: 'bar-gold' },
    { name: 'اللغة الإنجليزية', present: 18, total: 22, barClass: 'bar-rose' },
  ],
};

/**
 * قائمة الإعلانات والمسابقات
 * TODO: استبدل بـ GET /api/announcements
 */
const COMPETITIONS_DATA = [
  {
    id: 1,
    title:    'أولمبياد الرياضيات الوطني 2025',
    desc:     'يُفتح باب التسجيل في أولمبياد الرياضيات على المستوى الوطني. المتفوقون يمثلون المدرسة في الأدوار الإقليمية.',
    date:     '2025-03-20',
    category: 'مسابقة',
    tagClass: 'tag-gold',
  },
  {
    id: 2,
    title:    'معرض العلوم السنوي – تسليم المشاريع',
    desc:     'قدِّم مقترح مشروعك العلمي قبل انتهاء المهلة. يقيّم المشاريع لجنة من الخبراء. القبول فردي وجماعي.',
    date:     '2025-03-28',
    category: 'فعالية',
    tagClass: 'tag-teal',
  },
  {
    id: 3,
    title:    'مسابقة تلاوة القرآن الكريم',
    desc:     'تنافس مع زملائك في التجويد والحفظ. الفئات: الصفوف 7–9 والصفوف 10–12. جوائز لأفضل ثلاثة في كل فئة.',
    date:     '2025-04-05',
    category: 'مسابقة',
    tagClass: 'tag-sage',
  },
  {
    id: 4,
    title:    'جدول اختبارات منتصف الفصل',
    desc:     'تم نشر جدول اختبارات منتصف الفصل. اطلع على مواعيد كل مادة وأرقام القاعات عبر بوابتك الطلابية.',
    date:     '2025-03-10',
    category: 'إشعار',
    tagClass: 'tag-rose',
  },
];

/**
 * بيانات متابعة حفظ القرآن الكريم
 * TODO: استبدل بـ GET /api/quran-progress?studentId=X
 */
const QURAN_DATA = {
  studentId:       '202407',
  currentSurah:    'سورة الكهف',
  surahNumber:     18,
  lastAyah:        75,
  totalAyahs:      110,
  overallProgress: 42,
  totalSurahs:     114,
  surahsDone:      17,
  reviewStatus:    'pending',   /* القيم الممكنة: 'done' | 'pending' | 'overdue' */
  reviewMessage:   'جلسة المراجعة القادمة: غداً الساعة 8:00 صباحاً',
  recentHistory: [
    { date: '2025-03-04', surah: 'الكهف',   ayahFrom: 60,  ayahTo: 75,  rating: 'ممتاز' },
    { date: '2025-03-02', surah: 'الكهف',   ayahFrom: 45,  ayahTo: 59,  rating: 'جيد'   },
    { date: '2025-02-28', surah: 'الكهف',   ayahFrom: 30,  ayahTo: 44,  rating: 'ممتاز' },
    { date: '2025-02-26', surah: 'الإسراء', ayahFrom: 100, ayahTo: 111, rating: 'جيد'   },
  ],
};

/* ══════════════════════════════════════════════════════════════
   2. طبقة الخدمات / API Service Layer
   ══════════════════════════════════════════════════════════════
   هذه الدوال تعزل منطق جلب البيانات عن منطق العرض.
   عند الاتصال بالخادم: استبدل جسم كل دالة بـ fetch() حقيقي.
══════════════════════════════════════════════════════════════ */

/**
 * جلب قائمة الاختبارات
 * TODO: const res = await fetch('/api/exams'); return res.json();
 */
async function fetchExams() {
  return new Promise(resolve => setTimeout(() => resolve(EXAM_CATALOGUE), 300));
}

/**
 * جلب درجة طالب في اختبار معين
 * @param {string} studentId - رقم الطالب
 * @param {string} examId    - رمز الاختبار
 * TODO: const res = await fetch(`/api/grades?studentId=${studentId}&examId=${examId}`); return res.json();
 */
async function fetchGrades(studentId, examId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const studentGrades = GRADES_DB[studentId];
      if (!studentGrades) return reject({ code: 404, message: 'لم يتم العثور على الطالب.' });
      const result = studentGrades[examId];
      if (!result) return reject({ code: 404, message: 'لا توجد نتيجة لهذا الاختبار.' });
      resolve(result);
    }, 500);
  });
}

/**
 * جلب بيانات الحضور
 * TODO: const res = await fetch(`/api/attendance?studentId=${studentId}`); return res.json();
 */
async function fetchAttendance() {
  return new Promise(resolve => setTimeout(() => resolve(ATTENDANCE_DATA), 300));
}

/**
 * جلب قائمة الإعلانات والمسابقات
 * TODO: const res = await fetch('/api/announcements'); return res.json();
 */
async function fetchCompetitions() {
  return new Promise(resolve => setTimeout(() => resolve(COMPETITIONS_DATA), 300));
}

/**
 * جلب بيانات تقدم الحفظ
 * TODO: const res = await fetch(`/api/quran-progress?studentId=${studentId}`); return res.json();
 */
async function fetchMemorizationProgress() {
  return new Promise(resolve => setTimeout(() => resolve(QURAN_DATA), 300));
}

/* ══════════════════════════════════════════════════════════════
   3. الدوال المساعدة — Utility Functions
══════════════════════════════════════════════════════════════ */

/**
 * تحليل التاريخ وإرجاع يوم وشهر باللغة العربية
 * @param {string} dateStr - تاريخ بصيغة YYYY-MM-DD
 * @returns {{ day: number, month: string, full: string }}
 */
function parseDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const arabicMonths = [
    'يناير','فبراير','مارس','أبريل','مايو','يونيو',
    'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر',
  ];
  return {
    day:   d.getDate(),
    month: arabicMonths[d.getMonth()],
    full:  `${d.getDate()} ${arabicMonths[d.getMonth()]} ${d.getFullYear()}`,
  };
}

/**
 * إظهار أو إخفاء رسالة خطأ التحقق تحت حقل الإدخال
 * @param {HTMLElement} inputEl - عنصر الإدخال
 * @param {HTMLElement} errorEl - عنصر رسالة الخطأ
 * @param {boolean}     show    - true لإظهار، false لإخفاء
 */
function setError(inputEl, errorEl, show) {
  inputEl.classList.toggle('is-invalid', show);
  errorEl.classList.toggle('visible', show);
}

/**
 * تحريك شريط تقدم من 0% إلى النسبة المستهدفة
 * @param {HTMLElement} barEl     - عنصر شريط التقدم
 * @param {number}      targetPct - النسبة المستهدفة (0–100)
 */
function animateBar(barEl, targetPct) {
  if (!barEl) return;
  barEl.style.width = '0%';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      barEl.style.width = targetPct + '%';
    });
  });
}

/**
 * إرجاع لون التمييز للدرجة
 * @param {string} grade - التقدير (A+, A, B, C, D)
 * @returns {string} - كود لون CSS
 */
function gradeAccentColor(grade) {
  const colorMap = {
    'A+': '#6dbf82',
    'A':  '#8dd4a0',
    'B':  '#f0d98c',
    'C':  '#eaa7a5',
    'D':  '#e07a76',
  };
  return colorMap[grade] || 'rgba(255,255,255,.8)';
}

/* ══════════════════════════════════════════════════════════════
   4. وحدة البحث عن الدرجات — Grade Search Module
══════════════════════════════════════════════════════════════ */

/**
 * تحميل قائمة الاختبارات في عنصر <select>
 * يُستدعى عند تحميل الصفحة
 */
async function loadExams() {
  const select = document.getElementById('select-exam');
  try {
    const exams = await fetchExams();
    exams.forEach(exam => {
      const opt = document.createElement('option');
      opt.value            = exam.id;
      opt.textContent      = exam.name;
      opt.dataset.subject  = exam.subject;
      select.appendChild(opt);
    });
  } catch (err) {
    console.error('[loadExams] فشل تحميل الاختبارات:', err);
  }
}

/**
 * التحقق من مدخلات البحث وتنفيذ عملية جلب الدرجة
 * مرتبطة بحدث onclick للزر وضغط Enter في حقل رقم الطالب
 */
async function searchGrade() {
  const idInput   = document.getElementById('input-student-id');
  const examSel   = document.getElementById('select-exam');
  const idError   = document.getElementById('student-id-error');
  const examError = document.getElementById('exam-error');
  const wrapper   = document.getElementById('grade-result-wrapper');
  const btn       = document.getElementById('btn-search-grade');

  /* ── التحقق من المدخلات ── */
  let valid       = true;
  const studentId = idInput.value.trim();
  const examId    = examSel.value;

  if (!studentId || !/^\d{4,10}$/.test(studentId)) {
    setError(idInput, idError, true);
    valid = false;
  } else {
    setError(idInput, idError, false);
  }

  if (!examId) {
    setError(examSel, examError, true);
    valid = false;
  } else {
    setError(examSel, examError, false);
  }

  if (!valid) return;

  /* ── حالة التحميل ── */
  btn.disabled      = true;
  btn.innerHTML     = '<span class="sd-spinner"></span> جارٍ البحث…';
  wrapper.innerHTML = '<div class="sd-loading"><span class="sd-spinner"></span> جارٍ جلب النتيجة…</div>';

  const examName    = examSel.options[examSel.selectedIndex].textContent;
  const examSubject = examSel.options[examSel.selectedIndex].dataset.subject;

  try {
    const data = await fetchGrades(studentId, examId);
    renderGradeResult(studentId, examName, examSubject, data, wrapper);
  } catch (err) {
    wrapper.innerHTML = `
      <div class="sd-empty-state">
        <i class="bi bi-exclamation-circle"></i>
        <p>
          <strong>لم يتم العثور على نتيجة.</strong><br>
          ${err.message || 'يرجى التحقق من رقم الطالب والاختبار المحدد.'}
        </p>
      </div>`;
  } finally {
    btn.disabled  = false;
    btn.innerHTML = '<i class="bi bi-search"></i> بحث عن النتيجة';
  }
}

/**
 * عرض بطاقة نتيجة الدرجة داخل عنصر wrapper
 * @param {string}      studentId - رقم الطالب
 * @param {string}      examName  - اسم الاختبار
 * @param {string}      subject   - اسم المادة
 * @param {object}      data      - بيانات الدرجة { score, total, rank, grade, feedback }
 * @param {HTMLElement} wrapper   - الحاوية التي ستُحقن فيها البطاقة
 */
function renderGradeResult(studentId, examName, subject, data, wrapper) {
  const pct    = Math.round((data.score / data.total) * 100);
  const accent = gradeAccentColor(data.grade);

  wrapper.innerHTML = `
    <div class="grade-result-card">
      <div class="grade-result-header">
        <div>
          <div class="student-name">الطالب رقم ${studentId}</div>
          <div style="font-size:.8rem;opacity:.6;margin-top:.15rem">${examName}</div>
        </div>
        <div style="text-align:left">
          <div class="grade-badge" style="color:${accent}">${data.grade}</div>
          <div style="font-size:.75rem;opacity:.6;margin-top:.1rem">التقدير</div>
        </div>
      </div>
      <div class="grade-result-body">
        <div class="row g-2 mb-3">
          <div class="col-6">
            <div class="grade-meta-item">
              <i class="bi bi-123"></i> الدرجة: <strong>${data.score}/${data.total}</strong>
            </div>
            <div class="grade-meta-item">
              <i class="bi bi-percent"></i> النسبة المئوية: <strong>${pct}%</strong>
            </div>
          </div>
          <div class="col-6">
            <div class="grade-meta-item">
              <i class="bi bi-bar-chart"></i> الترتيب: <strong>#${data.rank}</strong>
            </div>
            <div class="grade-meta-item">
              <i class="bi bi-journal-bookmark"></i> المادة: <strong>${subject}</strong>
            </div>
          </div>
        </div>
        <div class="grade-meta-item">
          <i class="bi bi-chat-left-quote"></i> <em>${data.feedback}</em>
        </div>
        <div class="grade-score-bar mt-2">
          <div class="grade-score-bar-fill" id="grade-bar-fill" style="width:0%"></div>
        </div>
        <div class="d-flex justify-content-between mt-1" style="font-size:.72rem;color:var(--ink-muted)">
          <span>الدرجة الكاملة: ${data.total}</span>
          <span>0</span>
        </div>
      </div>
    </div>`;

  /* تحريك شريط الدرجة بعد الحقن في DOM */
  setTimeout(() => animateBar(document.getElementById('grade-bar-fill'), pct), 50);
}

/* ══════════════════════════════════════════════════════════════
   5. وحدة الحضور والغياب — Attendance Module
══════════════════════════════════════════════════════════════ */

/**
 * تحميل وعرض بيانات الحضور
 * TODO: أضف studentId كمعامل عند الاتصال بـ API
 */
async function loadAttendance() {
  try {
    const data = await fetchAttendance();
    document.getElementById('attendance-month-label').textContent = data.month;
    renderAttendanceStats(data);
    renderAttendanceBars(data);
  } catch (err) {
    console.error('[loadAttendance] خطأ في تحميل بيانات الحضور:', err);
  }
}

/**
 * عرض بطاقات إحصاءات الحضور الأربع
 * @param {object} data - بيانات الحضور
 */
function renderAttendanceStats(data) {
  const pct   = Math.round((data.present / data.totalDays) * 100);
  const stats = [
    { icon: 'bi-calendar-check', value: data.present, label: 'أيام الحضور',  iconClass: 'icon-sage', color: 'var(--sage)' },
    { icon: 'bi-calendar-x',     value: data.absent,  label: 'أيام الغياب',  iconClass: 'icon-rose', color: 'var(--rose)' },
    { icon: 'bi-clock-history',  value: data.late,    label: 'مرات التأخر',  iconClass: 'icon-gold', color: 'var(--gold)' },
    { icon: 'bi-patch-check',    value: pct + '%',    label: 'نسبة الحضور',  iconClass: 'icon-teal', color: 'var(--teal)' },
  ];

  document.getElementById('attendance-stats-container').innerHTML = stats.map(s => `
    <div class="col-6 col-md-3">
      <div class="attendance-stat-card">
        <div class="attendance-stat-icon ${s.iconClass}">
          <i class="bi ${s.icon}"></i>
        </div>
        <div>
          <div class="attendance-stat-value" style="color:${s.color}">${s.value}</div>
          <div class="attendance-stat-label">${s.label}</div>
        </div>
      </div>
    </div>`).join('');
}

/**
 * عرض أشرطة تقدم الحضور لكل مادة والنسبة الإجمالية
 * @param {object} data - بيانات الحضور
 */
function renderAttendanceBars(data) {
  const overallPct = Math.round((data.present / data.totalDays) * 100);
  const container  = document.getElementById('attendance-progress-container');

  let html = `
    <div class="attendance-progress-section">
      <p style="font-size:.84rem;font-weight:700;color:var(--ink-soft);margin-bottom:1rem;">
        الحضور حسب المادة
      </p>`;

  data.subjects.forEach(s => {
    const pct = Math.round((s.present / s.total) * 100);
    html += `
      <div class="mb-2">
        <div class="attendance-progress-label">
          <span>${s.name}</span>
          <span>${s.present}/${s.total} يوم &nbsp;·&nbsp; <strong>${pct}%</strong></span>
        </div>
        <div class="sd-progress">
          <div class="sd-progress-bar ${s.barClass}" data-target="${pct}" style="width:0%"></div>
        </div>
      </div>`;
  });

  html += `
      <div class="mt-3 pt-3" style="border-top:1px solid var(--border)">
        <div class="attendance-progress-label">
          <span style="font-weight:700">نسبة الحضور الإجمالية</span>
          <strong>${overallPct}%</strong>
        </div>
        <div class="sd-progress" style="height:14px">
          <div class="sd-progress-bar bar-sage" data-target="${overallPct}" style="width:0%"></div>
        </div>
      </div>
    </div>`;

  container.innerHTML = html;

  /* تحريك جميع الأشرطة بعد الحقن */
  setTimeout(() => {
    container.querySelectorAll('.sd-progress-bar').forEach(bar => {
      animateBar(bar, bar.dataset.target);
    });
  }, 100);
}

/* ══════════════════════════════════════════════════════════════
   6. وحدة المسابقات والإعلانات — Competitions Module
══════════════════════════════════════════════════════════════ */

/**
 * تحميل وعرض قائمة الإعلانات والمسابقات
 * TODO: أضف فلتر حسب نوع الإعلان أو الصف الدراسي عند الاتصال بـ API
 */
async function loadCompetitions() {
  const container = document.getElementById('competitions-container');
  const badge     = document.getElementById('competitions-count-badge');

  try {
    const items = await fetchCompetitions();
    badge.textContent = `${items.length} إعلانات`;

    if (!items.length) {
      container.innerHTML = `
        <div class="sd-empty-state">
          <i class="bi bi-megaphone"></i>
          <p>لا توجد إعلانات حالياً.</p>
        </div>`;
      return;
    }

    container.innerHTML = items.map(item => {
      const { day, month, full } = parseDate(item.date);
      return `
        <div class="competition-item">
          <div class="competition-date-badge" title="${full}">
            <div class="day">${day}</div>
            <span class="month">${month}</span>
          </div>
          <div class="competition-divider"></div>
          <div class="competition-content">
            <h6>${item.title}</h6>
            <p>${item.desc}</p>
            <span class="competition-tag ${item.tagClass}">${item.category}</span>
          </div>
        </div>`;
    }).join('');

  } catch (err) {
    console.error('[loadCompetitions] خطأ في تحميل الإعلانات:', err);
    container.innerHTML = `
      <div class="sd-empty-state">
        <i class="bi bi-exclamation-triangle"></i>
        <p>تعذّر تحميل الإعلانات. يرجى المحاولة مجدداً.</p>
      </div>`;
  }
}

/* ══════════════════════════════════════════════════════════════
   7. وحدة متابعة حفظ القرآن — Quran Memorization Module
══════════════════════════════════════════════════════════════ */

/**
 * تحميل وعرض بيانات تقدم الحفظ
 * TODO: أضف studentId كمعامل عند الاتصال بـ API
 */
async function loadMemorizationProgress() {
  try {
    const data = await fetchMemorizationProgress();
    renderQuranMain(data, document.getElementById('quran-main-container'));
    renderQuranHistory(data.recentHistory, document.getElementById('quran-history-container'));
  } catch (err) {
    console.error('[loadMemorizationProgress] خطأ في تحميل بيانات الحفظ:', err);
  }
}

/**
 * عرض القسم الرئيسي لمتابعة الحفظ
 * @param {object}      data      - بيانات الحفظ
 * @param {HTMLElement} container - الحاوية المستهدفة
 */
function renderQuranMain(data, container) {
  const surahPct = Math.round((data.lastAyah / data.totalAyahs) * 100);

  const statusMap = {
    done:    { cls: 'status-done',    icon: 'bi-patch-check-fill',        label: 'تمت المراجعة'          },
    pending: { cls: 'status-pending', icon: 'bi-clock-fill',              label: 'في انتظار المراجعة'    },
    overdue: { cls: 'status-overdue', icon: 'bi-exclamation-circle-fill', label: 'تجاوزت موعد المراجعة' },
  };
  const st = statusMap[data.reviewStatus] || statusMap.pending;

  container.innerHTML = `
    <div class="quran-hero">
      <div class="surah-label">السورة الحالية</div>
      <div class="surah-name">${data.currentSurah}</div>
      <div class="surah-arabic">السورة رقم ${data.surahNumber}</div>
    </div>

    <div class="quran-detail-row">
      <div class="quran-detail-pill">
        <i class="bi bi-bookmark-fill pill-icon"></i>
        <span class="pill-value">${data.lastAyah}</span>
        <span class="pill-label">آخر آية محفوظة</span>
      </div>
      <div class="quran-detail-pill">
        <i class="bi bi-collection-fill pill-icon"></i>
        <span class="pill-value">${data.totalAyahs}</span>
        <span class="pill-label">إجمالي الآيات</span>
      </div>
      <div class="quran-detail-pill">
        <i class="bi bi-journals pill-icon"></i>
        <span class="pill-value">${data.surahsDone}</span>
        <span class="pill-label">السور المحفوظة</span>
      </div>
    </div>

    <div class="mb-2">
      <div class="attendance-progress-label">
        <span>تقدم السورة (الآية ${data.lastAyah} من ${data.totalAyahs})</span>
        <strong>${surahPct}%</strong>
      </div>
      <div class="sd-progress">
        <div class="sd-progress-bar bar-sage" id="surah-bar" data-target="${surahPct}" style="width:0%"></div>
      </div>
    </div>

    <div class="quran-overall-progress">
      <div class="overall-label">
        <span>التقدم الإجمالي (${data.surahsDone}/${data.totalSurahs} سورة)</span>
        <strong>${data.overallProgress}%</strong>
      </div>
      <div class="sd-progress" style="height:12px">
        <div class="sd-progress-bar bar-teal" id="overall-bar" data-target="${data.overallProgress}" style="width:0%"></div>
      </div>
    </div>

    <div class="quran-review-status ${st.cls}">
      <i class="bi ${st.icon}"></i>
      <div>
        <strong style="font-size:.87rem">${st.label}</strong>
        <div style="font-size:.82rem;margin-top:.1rem;opacity:.75">${data.reviewMessage}</div>
      </div>
    </div>`;

  /* تحريك أشرطة التقدم */
  setTimeout(() => {
    animateBar(document.getElementById('surah-bar'),   surahPct);
    animateBar(document.getElementById('overall-bar'), data.overallProgress);
  }, 100);
}

/**
 * عرض سجل جلسات المراجعة الأخيرة
 * @param {Array}       history   - مصفوفة الجلسات السابقة
 * @param {HTMLElement} container - الحاوية المستهدفة
 */
function renderQuranHistory(history, container) {
  /* تحويل التقييم إلى نجوم */
  const ratingStars = rating => {
    if (rating === 'ممتاز') return '⭐⭐⭐';
    if (rating === 'جيد')   return '⭐⭐';
    return '⭐';
  };

  if (!history.length) {
    container.innerHTML = `
      <div class="sd-empty-state">
        <i class="bi bi-journal-x"></i>
        <p>لا توجد جلسات سابقة.</p>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:.85rem">
      ${history.map(h => {
        const { day, month } = parseDate(h.date);
        return `
          <div style="display:flex;gap:.85rem;align-items:flex-start">
            <div style="flex-shrink:0;text-align:center;min-width:40px">
              <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:var(--ink);line-height:1">
                ${day}
              </div>
              <div style="font-size:.68rem;font-weight:600;color:var(--ink-muted)">${month}</div>
            </div>
            <div class="rtl-border-right" style="flex:1">
              <div style="font-size:.85rem;font-weight:600;color:var(--ink)">سورة ${h.surah}</div>
              <div style="font-size:.78rem;color:var(--ink-muted)">الآيات ${h.ayahFrom}–${h.ayahTo}</div>
              <div style="font-size:.75rem;margin-top:.2rem">
                ${ratingStars(h.rating)}
                <span style="color:var(--ink-soft)">${h.rating}</span>
              </div>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

/* ══════════════════════════════════════════════════════════════
   8. دعم لوحة المفاتيح — Keyboard Support
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* تفعيل البحث بضغط Enter في حقل رقم الطالب */
  document.getElementById('input-student-id').addEventListener('keydown', e => {
    if (e.key === 'Enter') searchGrade();
  });
});

/* ══════════════════════════════════════════════════════════════
   9. تهيئة الصفحة — Page Initialization
   يُشغّل جميع الوحدات بعد اكتمال تحميل DOM
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadExams();
  loadAttendance();
  loadCompetitions();
  loadMemorizationProgress();
});
