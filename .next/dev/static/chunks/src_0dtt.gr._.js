(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/providers/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const STORAGE_KEY = "dpx-theme";
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function ThemeProvider({ children }) {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("dark");
    const apply = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ThemeProvider.useCallback[apply]": (next)=>{
            setTheme(next);
            document.documentElement.classList.toggle("dark", next === "dark");
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch  {
            /* storage unavailable */ }
        }
    }["ThemeProvider.useCallback[apply]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved === "light" || saved === "dark") apply(saved);
            } catch  {
            /* storage unavailable */ }
        }
    }["ThemeProvider.useEffect"], [
        apply
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ThemeProvider.useMemo[value]": ()=>({
                theme,
                toggleTheme: ({
                    "ThemeProvider.useMemo[value]": ()=>apply(theme === "dark" ? "light" : "dark")
                })["ThemeProvider.useMemo[value]"]
            })
    }["ThemeProvider.useMemo[value]"], [
        theme,
        apply
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/providers/theme-provider.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "gLxHQrh4TdHL2s9Erxf5jMdJUVw=");
_c = ThemeProvider;
function useTheme() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
    return ctx;
}
_s1(useTheme, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/en.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "nav": {
        "about": "About",
        "skills": "Skills",
        "projects": "Projects",
        "experience": "Experience",
        "contact": "Contact",
        "menu": "Open menu",
        "close": "Close menu",
        "resume": "Resume"
    },
    "hero": {
        "badge": "Open to new opportunities",
        "greeting": "hello, world — I'm",
        "name": "DevPortfolioX",
        "role": "Full Stack Engineer",
        "headlineA": "Scalable",
        "headlineB": "Spring Boot systems.",
        "headlineC": "Modern",
        "headlineD": "Angular interfaces.",
        "subtitle": "I build secure, scalable, and user-friendly applications using Angular, TypeScript, Java, Spring Boot, and PostgreSQL.",
        "ctaProjects": "View Projects",
        "ctaResume": "Download Resume",
        "ctaContact": "Contact Me",
        "scroll": "scroll to explore",
        "stats": [
            {
                "value": "4+",
                "label": "Production-grade case studies"
            },
            {
                "value": "20+",
                "label": "Technologies in the stack"
            },
            {
                "value": "360°",
                "label": "Frontend to database ownership"
            }
        ]
    },
    "about": {
        "kicker": "// about-me",
        "title": "Engineering the full stack, end to end",
        "lead": "I bridge the gap between complex backend architectures and intuitive user interfaces. Whether I am designing a normalized PostgreSQL schema, building secure APIs with Spring Boot, or creating a type-safe frontend with Angular and TypeScript, I focus on performance, maintainability, and real-world business value.",
        "body": "My approach is simple: clean architecture on the server, thoughtful state management on the client, and a database design that will still make sense two years from now. Every project I ship is documented, tested, and built to be handed over without a manual.",
        "pillars": [
            {
                "title": "Frontend Architecture",
                "desc": "Type-safe, component-driven SPAs with Angular, TypeScript, RxJS and reactive forms — plus React and Vue when the project calls for it."
            },
            {
                "title": "Backend Engineering",
                "desc": "Layered Spring Boot services — controller, service, repository, DTO — with clean separation of concerns and horizontal scalability in mind."
            },
            {
                "title": "Database Design",
                "desc": "Normalized PostgreSQL and MySQL schemas, deliberate indexing, query optimization and migrations that keep data consistent under load."
            },
            {
                "title": "API & Security",
                "desc": "Documented REST APIs with OpenAPI, JWT authentication, role-based authorization and validation at every boundary."
            }
        ],
        "currentlyTitle": "Currently",
        "currently": "Deepening distributed-systems design and shipping full-stack projects with enterprise-grade tooling."
    },
    "skills": {
        "kicker": "// skills",
        "title": "A stack that covers the whole request lifecycle",
        "subtitle": "From the browser pixel to the database row — these are the tools I use to design, build, secure, and ship software.",
        "proficiency": "proficiency",
        "categories": {
            "frontend": "Frontend",
            "backend": "Backend",
            "database": "Databases",
            "tools": "Tools & DevOps"
        }
    },
    "projects": {
        "kicker": "// projects",
        "title": "Featured case studies",
        "subtitle": "Real full-stack systems — each one is an engineering story: a problem, an architecture, and a measurable result.",
        "featured": "Featured",
        "problem": "The problem",
        "solution": "The solution",
        "architecture": "Backend architecture",
        "features": "Key features",
        "achievement": "Key achievement",
        "stack": "Tech stack",
        "caseStudy": "Case study",
        "liveDemo": "Live demo",
        "source": "Source",
        "close": "Close",
        "overview": "Overview"
    },
    "experience": {
        "kicker": "// experience",
        "title": "Experience timeline",
        "subtitle": "The milestones that shaped how I design, build, and ship software."
    },
    "contact": {
        "kicker": "// contact",
        "title": "Let's build something together",
        "subtitle": "Have a project, a role, or just a technical question? My inbox is open — I reply within 24 hours.",
        "emailLabel": "Email",
        "emailValue": "hello@devportfoliox.com",
        "locationLabel": "Location",
        "locationValue": "Remote / Worldwide",
        "availabilityLabel": "Availability",
        "availabilityValue": "Full-time & freelance",
        "formTitle": "Send a message",
        "name": "Full name",
        "email": "Email address",
        "subject": "Subject",
        "message": "Message",
        "namePlaceholder": "John Doe",
        "emailPlaceholder": "john@example.com",
        "subjectPlaceholder": "Job opportunity",
        "messagePlaceholder": "Tell me about your project, timeline, and goals…",
        "submit": "Send message",
        "sending": "Sending…",
        "successTitle": "Message sent",
        "success": "Thanks for reaching out. Your message was saved — I'll get back to you within 24 hours.",
        "sendAnother": "Send another message",
        "error": "Something went wrong. Please try again or email me directly.",
        "responseTime": "Typical response time: under 24 hours",
        "validation": {
            "nameMin": "Name must be at least 2 characters",
            "emailInvalid": "Please enter a valid email address",
            "subjectMin": "Subject must be at least 3 characters",
            "messageMin": "Message must be at least 10 characters"
        }
    },
    "footer": {
        "tagline": "Full Stack Engineer — building secure, scalable systems and clean interfaces.",
        "navTitle": "Navigate",
        "socialTitle": "Connect",
        "builtWith": "Designed & engineered with Next.js, TypeScript, and PostgreSQL",
        "rights": "All rights reserved.",
        "backToTop": "Back to top",
        "apiNote": "Content served from a live REST API"
    },
    "language": {
        "label": "Language"
    },
    "theme": {
        "toLight": "Switch to light mode",
        "toDark": "Switch to dark mode"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/ar.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "nav": {
        "about": "نبذة عني",
        "skills": "المهارات",
        "projects": "المشاريع",
        "experience": "الخبرة",
        "contact": "تواصل",
        "menu": "فتح القائمة",
        "close": "إغلاق القائمة",
        "resume": "السيرة الذاتية"
    },
    "hero": {
        "badge": "متاح لفرص جديدة",
        "greeting": "مرحباً، أنا",
        "name": "DevPortfolioX",
        "role": "مهندس برمجيات متكامل",
        "headlineA": "أنظمة",
        "headlineB": "Spring Boot قابلة للتوسع.",
        "headlineC": "واجهات",
        "headlineD": "Angular حديثة.",
        "subtitle": "أبني تطبيقات آمنة وقابلة للتوسع وسهلة الاستخدام باستخدام Angular وTypeScript وJava وSpring Boot وPostgreSQL.",
        "ctaProjects": "استعرض المشاريع",
        "ctaResume": "تحميل السيرة الذاتية",
        "ctaContact": "تواصل معي",
        "scroll": "مرّر للاستكشاف",
        "stats": [
            {
                "value": "+4",
                "label": "دراسات حالة بمعايير إنتاجية"
            },
            {
                "value": "+20",
                "label": "تقنية ضمن المنظومة"
            },
            {
                "value": "360°",
                "label": "إتقان كامل من الواجهة إلى قاعدة البيانات"
            }
        ]
    },
    "about": {
        "kicker": "// نبذة-عني",
        "title": "هندسة برمجيات متكاملة من البداية إلى النهاية",
        "lead": "أجسّر الفجوة بين البنى الخلفية المعقدة وواجهات المستخدم البديهية. سواء كنت أصمم مخطط PostgreSQL مُطبَّعًا، أو أبني واجهات برمجية آمنة باستخدام Spring Boot، أو أطوّر واجهة أمامية محكمة الأنواع بـ Angular وTypeScript، فإن تركيزي دائمًا على الأداء وقابلية الصيانة والقيمة الحقيقية للأعمال.",
        "body": "منهجيتي بسيطة: معمارية نظيفة في الخادم، وإدارة حالة مدروسة في العميل، وتصميم قاعدة بيانات يبقى مفهومًا بعد سنتين من الآن. كل مشروع أسلّمه موثّق ومختبَر ومبني ليُسلَّم دون دليل تشغيل.",
        "pillars": [
            {
                "title": "هندسة الواجهات الأمامية",
                "desc": "تطبيقات أحادية الصفحة محكمة الأنواع قائمة على المكوّنات باستخدام Angular وTypeScript وRxJS وReactive Forms، مع React وVue عندما يتطلب المشروع ذلك."
            },
            {
                "title": "هندسة الأنظمة الخلفية",
                "desc": "خدمات Spring Boot متعددة الطبقات — Controller وService وRepository وDTO — مع فصل واضح للمسؤوليات وقابلية توسع أفقية."
            },
            {
                "title": "تصميم قواعد البيانات",
                "desc": "مخططات PostgreSQL وMySQL مُطبَّعة، وفهارس مدروسة، وتحسين للاستعلامات، وترحيلات تحفظ اتساق البيانات تحت الضغط."
            },
            {
                "title": "واجهات برمجية وأمان",
                "desc": "واجهات REST موثّقة بمعيار OpenAPI، مع مصادقة JWT وصلاحيات قائمة على الأدوار وتحقق من المدخلات عند كل حدود النظام."
            }
        ],
        "currentlyTitle": "حاليًا",
        "currently": "أعمّق خبرتي في تصميم الأنظمة الموزعة وأطوّر مشاريع متكاملة بأدوات بمعايير المؤسسات."
    },
    "skills": {
        "kicker": "// المهارات",
        "title": "منظومة تقنية تغطي دورة الطلب كاملة",
        "subtitle": "من بكسل المتصفح إلى صفّ قاعدة البيانات — هذه هي الأدوات التي أستخدمها لتصميم البرمجيات وبنائها وتأمينها وإطلاقها.",
        "proficiency": "مستوى الإتقان",
        "categories": {
            "frontend": "الواجهات الأمامية",
            "backend": "الأنظمة الخلفية",
            "database": "قواعد البيانات",
            "tools": "الأدوات وDevOps"
        }
    },
    "projects": {
        "kicker": "// المشاريع",
        "title": "دراسات حالة مميزة",
        "subtitle": "أنظمة متكاملة حقيقية — كل مشروع منها قصة هندسية: مشكلة، ومعمارية، ونتيجة قابلة للقياس.",
        "featured": "مميز",
        "problem": "المشكلة",
        "solution": "الحل",
        "architecture": "معمارية النظام الخلفي",
        "features": "أبرز المزايا",
        "achievement": "أهم إنجاز",
        "stack": "التقنيات المستخدمة",
        "caseStudy": "دراسة الحالة",
        "liveDemo": "العرض المباشر",
        "source": "الكود",
        "close": "إغلاق",
        "overview": "نظرة عامة"
    },
    "experience": {
        "kicker": "// الخبرة",
        "title": "المسيرة المهنية",
        "subtitle": "المحطات التي شكّلت طريقتي في تصميم البرمجيات وبنائها وتسليمها."
    },
    "contact": {
        "kicker": "// تواصل",
        "title": "لنبنِ شيئًا مميزًا معًا",
        "subtitle": "لديك مشروع أو وظيفة أو سؤال تقني؟ بريدي مفتوح — أرد خلال 24 ساعة.",
        "emailLabel": "البريد الإلكتروني",
        "emailValue": "hello@devportfoliox.com",
        "locationLabel": "الموقع",
        "locationValue": "عن بُعد / حول العالم",
        "availabilityLabel": "التوفر",
        "availabilityValue": "دوام كامل ومشاريع حرة",
        "formTitle": "أرسل رسالة",
        "name": "الاسم الكامل",
        "email": "البريد الإلكتروني",
        "subject": "الموضوع",
        "message": "الرسالة",
        "namePlaceholder": "محمد أحمد",
        "emailPlaceholder": "name@example.com",
        "subjectPlaceholder": "فرصة عمل",
        "messagePlaceholder": "حدّثني عن مشروعك وجدولك الزمني وأهدافك…",
        "submit": "إرسال الرسالة",
        "sending": "جارٍ الإرسال…",
        "successTitle": "تم إرسال الرسالة",
        "success": "شكرًا لتواصلك. تم حفظ رسالتك — سأعود إليك خلال 24 ساعة.",
        "sendAnother": "إرسال رسالة أخرى",
        "error": "حدث خطأ ما. حاول مجددًا أو راسلني مباشرة عبر البريد.",
        "responseTime": "متوسط زمن الرد: أقل من 24 ساعة",
        "validation": {
            "nameMin": "يجب ألا يقل الاسم عن حرفين",
            "emailInvalid": "يرجى إدخال بريد إلكتروني صحيح",
            "subjectMin": "يجب ألا يقل الموضوع عن 3 أحرف",
            "messageMin": "يجب ألا تقل الرسالة عن 10 أحرف"
        }
    },
    "footer": {
        "tagline": "مهندس برمجيات متكامل — أبني أنظمة آمنة وقابلة للتوسع وواجهات نظيفة.",
        "navTitle": "التنقل",
        "socialTitle": "تواصل",
        "builtWith": "صُمم وطُوّر باستخدام Next.js وTypeScript وPostgreSQL",
        "rights": "جميع الحقوق محفوظة.",
        "backToTop": "العودة للأعلى",
        "apiNote": "المحتوى يُقدَّم من واجهة REST برمجية حية"
    },
    "language": {
        "label": "اللغة"
    },
    "theme": {
        "toLight": "التبديل إلى الوضع الفاتح",
        "toDark": "التبديل إلى الوضع الداكن"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/ru.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "nav": {
        "about": "Обо мне",
        "skills": "Навыки",
        "projects": "Проекты",
        "experience": "Опыт",
        "contact": "Контакты",
        "menu": "Открыть меню",
        "close": "Закрыть меню",
        "resume": "Резюме"
    },
    "hero": {
        "badge": "Открыт к новым возможностям",
        "greeting": "привет, мир — я",
        "name": "DevPortfolioX",
        "role": "Full Stack-инженер",
        "headlineA": "Масштабируемые системы",
        "headlineB": "на Spring Boot.",
        "headlineC": "Современные интерфейсы",
        "headlineD": "на Angular.",
        "subtitle": "Я создаю безопасные, масштабируемые и удобные приложения с использованием Angular, TypeScript, Java, Spring Boot и PostgreSQL.",
        "ctaProjects": "Смотреть проекты",
        "ctaResume": "Скачать резюме",
        "ctaContact": "Связаться",
        "scroll": "листайте вниз",
        "stats": [
            {
                "value": "4+",
                "label": "Кейса продакшн-уровня"
            },
            {
                "value": "20+",
                "label": "Технологий в стеке"
            },
            {
                "value": "360°",
                "label": "От интерфейса до базы данных"
            }
        ]
    },
    "about": {
        "kicker": "// обо-мне",
        "title": "Инжиниринг полного цикла — от UI до базы данных",
        "lead": "Я устраняю разрыв между сложной серверной архитектурой и интуитивными пользовательскими интерфейсами. Проектирую ли я нормализованную схему PostgreSQL, создаю ли защищённые API на Spring Boot или разрабатываю типобезопасный фронтенд на Angular и TypeScript — мой фокус всегда на производительности, поддерживаемости и реальной ценности для бизнеса.",
        "body": "Мой подход прост: чистая архитектура на сервере, продуманное управление состоянием на клиенте и дизайн базы данных, который останется понятным и через два года. Каждый проект я сдаю документированным, протестированным и готовым к передаче без инструкций.",
        "pillars": [
            {
                "title": "Архитектура фронтенда",
                "desc": "Типобезопасные компонентные SPA на Angular, TypeScript, RxJS и реактивных формах — а также React и Vue, когда этого требует проект."
            },
            {
                "title": "Серверная разработка",
                "desc": "Многослойные сервисы на Spring Boot — контроллер, сервис, репозиторий, DTO — с чётким разделением ответственности и горизонтальным масштабированием."
            },
            {
                "title": "Проектирование БД",
                "desc": "Нормализованные схемы PostgreSQL и MySQL, продуманные индексы, оптимизация запросов и миграции, сохраняющие целостность данных под нагрузкой."
            },
            {
                "title": "API и безопасность",
                "desc": "Документированные REST API на OpenAPI, JWT-аутентификация, ролевая авторизация и валидация на каждой границе системы."
            }
        ],
        "currentlyTitle": "Сейчас",
        "currently": "Углубляюсь в проектирование распределённых систем и выпускаю full-stack проекты с инструментами корпоративного уровня."
    },
    "skills": {
        "kicker": "// навыки",
        "title": "Стек, закрывающий весь жизненный цикл запроса",
        "subtitle": "От пикселя в браузере до строки в базе данных — инструменты, с которыми я проектирую, создаю, защищаю и выпускаю ПО.",
        "proficiency": "уровень владения",
        "categories": {
            "frontend": "Фронтенд",
            "backend": "Бэкенд",
            "database": "Базы данных",
            "tools": "Инструменты и DevOps"
        }
    },
    "projects": {
        "kicker": "// проекты",
        "title": "Избранные кейсы",
        "subtitle": "Реальные full-stack системы — каждая это инженерная история: задача, архитектура и измеримый результат.",
        "featured": "Избранное",
        "problem": "Задача",
        "solution": "Решение",
        "architecture": "Архитектура бэкенда",
        "features": "Ключевые возможности",
        "achievement": "Главное достижение",
        "stack": "Стек технологий",
        "caseStudy": "Кейс",
        "liveDemo": "Демо",
        "source": "Код",
        "close": "Закрыть",
        "overview": "Обзор"
    },
    "experience": {
        "kicker": "// опыт",
        "title": "Опыт работы",
        "subtitle": "Вехи, сформировавшие мой подход к проектированию, разработке и выпуску программного обеспечения."
    },
    "contact": {
        "kicker": "// контакты",
        "title": "Давайте создадим что-то вместе",
        "subtitle": "Есть проект, вакансия или технический вопрос? Пишите — отвечаю в течение 24 часов.",
        "emailLabel": "Email",
        "emailValue": "hello@devportfoliox.com",
        "locationLabel": "Локация",
        "locationValue": "Удалённо / весь мир",
        "availabilityLabel": "Доступность",
        "availabilityValue": "Полная занятость и фриланс",
        "formTitle": "Отправить сообщение",
        "name": "Полное имя",
        "email": "Email",
        "subject": "Тема",
        "message": "Сообщение",
        "namePlaceholder": "Иван Иванов",
        "emailPlaceholder": "ivan@example.com",
        "subjectPlaceholder": "Предложение о работе",
        "messagePlaceholder": "Расскажите о проекте, сроках и целях…",
        "submit": "Отправить сообщение",
        "sending": "Отправка…",
        "successTitle": "Сообщение отправлено",
        "success": "Спасибо за обращение. Сообщение сохранено — я отвечу в течение 24 часов.",
        "sendAnother": "Отправить ещё одно",
        "error": "Что-то пошло не так. Попробуйте ещё раз или напишите мне напрямую.",
        "responseTime": "Среднее время ответа: менее 24 часов",
        "validation": {
            "nameMin": "Имя должно содержать минимум 2 символа",
            "emailInvalid": "Введите корректный адрес электронной почты",
            "subjectMin": "Тема должна содержать минимум 3 символа",
            "messageMin": "Сообщение должно содержать минимум 10 символов"
        }
    },
    "footer": {
        "tagline": "Full Stack-инженер — создаю безопасные масштабируемые системы и чистые интерфейсы.",
        "navTitle": "Навигация",
        "socialTitle": "Связь",
        "builtWith": "Спроектировано и разработано на Next.js, TypeScript и PostgreSQL",
        "rights": "Все права защищены.",
        "backToTop": "Наверх",
        "apiNote": "Контент отдаётся из живого REST API"
    },
    "language": {
        "label": "Язык"
    },
    "theme": {
        "toLight": "Включить светлую тему",
        "toDark": "Включить тёмную тему"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/fr.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "nav": {
        "about": "À propos",
        "skills": "Compétences",
        "projects": "Projets",
        "experience": "Expérience",
        "contact": "Contact",
        "menu": "Ouvrir le menu",
        "close": "Fermer le menu",
        "resume": "CV"
    },
    "hero": {
        "badge": "Disponible pour de nouvelles opportunités",
        "greeting": "bonjour, monde — je suis",
        "name": "DevPortfolioX",
        "role": "Ingénieur Full Stack",
        "headlineA": "Des systèmes Spring Boot",
        "headlineB": "évolutifs.",
        "headlineC": "Des interfaces Angular",
        "headlineD": "modernes.",
        "subtitle": "Je conçois des applications sécurisées, évolutives et conviviales avec Angular, TypeScript, Java, Spring Boot et PostgreSQL.",
        "ctaProjects": "Voir les projets",
        "ctaResume": "Télécharger le CV",
        "ctaContact": "Me contacter",
        "scroll": "faites défiler",
        "stats": [
            {
                "value": "4+",
                "label": "Études de cas niveau production"
            },
            {
                "value": "20+",
                "label": "Technologies maîtrisées"
            },
            {
                "value": "360°",
                "label": "De l'interface à la base de données"
            }
        ]
    },
    "about": {
        "kicker": "// à-propos",
        "title": "Ingénierie full stack, de bout en bout",
        "lead": "Je fais le pont entre les architectures backend complexes et les interfaces utilisateur intuitives. Que je conçoive un schéma PostgreSQL normalisé, que je construise des API sécurisées avec Spring Boot ou que je développe un frontend fortement typé avec Angular et TypeScript, je me concentre sur la performance, la maintenabilité et la valeur métier réelle.",
        "body": "Mon approche est simple : une architecture propre côté serveur, une gestion d'état réfléchie côté client et un schéma de base de données qui restera limpide dans deux ans. Chaque projet livré est documenté, testé et conçu pour être transmis sans mode d'emploi.",
        "pillars": [
            {
                "title": "Architecture frontend",
                "desc": "SPA typées et orientées composants avec Angular, TypeScript, RxJS et les formulaires réactifs — ainsi que React et Vue lorsque le projet l'exige."
            },
            {
                "title": "Ingénierie backend",
                "desc": "Services Spring Boot en couches — contrôleur, service, repository, DTO — avec une séparation claire des responsabilités et le passage à l'échelle en tête."
            },
            {
                "title": "Conception de bases de données",
                "desc": "Schémas PostgreSQL et MySQL normalisés, indexation réfléchie, optimisation des requêtes et migrations qui préservent la cohérence des données."
            },
            {
                "title": "API & Sécurité",
                "desc": "API REST documentées avec OpenAPI, authentification JWT, autorisation basée sur les rôles et validation à chaque frontière du système."
            }
        ],
        "currentlyTitle": "En ce moment",
        "currently": "J'approfondis la conception de systèmes distribués et je livre des projets full stack avec des outils de niveau entreprise."
    },
    "skills": {
        "kicker": "// compétences",
        "title": "Un stack qui couvre tout le cycle de vie d'une requête",
        "subtitle": "Du pixel du navigateur à la ligne en base de données — les outils avec lesquels je conçois, développe, sécurise et livre des logiciels.",
        "proficiency": "niveau de maîtrise",
        "categories": {
            "frontend": "Frontend",
            "backend": "Backend",
            "database": "Bases de données",
            "tools": "Outils & DevOps"
        }
    },
    "projects": {
        "kicker": "// projets",
        "title": "Études de cas à la une",
        "subtitle": "De vrais systèmes full stack — chacun est une histoire d'ingénierie : un problème, une architecture et un résultat mesurable.",
        "featured": "À la une",
        "problem": "Le problème",
        "solution": "La solution",
        "architecture": "Architecture backend",
        "features": "Fonctionnalités clés",
        "achievement": "Réalisation clé",
        "stack": "Stack technique",
        "caseStudy": "Étude de cas",
        "liveDemo": "Démo live",
        "source": "Code",
        "close": "Fermer",
        "overview": "Vue d'ensemble"
    },
    "experience": {
        "kicker": "// expérience",
        "title": "Parcours professionnel",
        "subtitle": "Les étapes qui ont façonné ma manière de concevoir, développer et livrer des logiciels."
    },
    "contact": {
        "kicker": "// contact",
        "title": "Construisons quelque chose ensemble",
        "subtitle": "Un projet, un poste ou une question technique ? Ma boîte mail est ouverte — je réponds sous 24 heures.",
        "emailLabel": "E-mail",
        "emailValue": "hello@devportfoliox.com",
        "locationLabel": "Localisation",
        "locationValue": "À distance / International",
        "availabilityLabel": "Disponibilité",
        "availabilityValue": "CDI & freelance",
        "formTitle": "Envoyer un message",
        "name": "Nom complet",
        "email": "Adresse e-mail",
        "subject": "Sujet",
        "message": "Message",
        "namePlaceholder": "Jean Dupont",
        "emailPlaceholder": "jean@example.com",
        "subjectPlaceholder": "Opportunité professionnelle",
        "messagePlaceholder": "Parlez-moi de votre projet, vos délais et vos objectifs…",
        "submit": "Envoyer le message",
        "sending": "Envoi en cours…",
        "successTitle": "Message envoyé",
        "success": "Merci pour votre message. Il a bien été enregistré — je vous répondrai sous 24 heures.",
        "sendAnother": "Envoyer un autre message",
        "error": "Une erreur est survenue. Réessayez ou contactez-moi directement par e-mail.",
        "responseTime": "Temps de réponse habituel : moins de 24 h",
        "validation": {
            "nameMin": "Le nom doit contenir au moins 2 caractères",
            "emailInvalid": "Veuillez saisir une adresse e-mail valide",
            "subjectMin": "Le sujet doit contenir au moins 3 caractères",
            "messageMin": "Le message doit contenir au moins 10 caractères"
        }
    },
    "footer": {
        "tagline": "Ingénieur Full Stack — je conçois des systèmes sécurisés et évolutifs, et des interfaces soignées.",
        "navTitle": "Naviguer",
        "socialTitle": "Réseaux",
        "builtWith": "Conçu et développé avec Next.js, TypeScript et PostgreSQL",
        "rights": "Tous droits réservés.",
        "backToTop": "Haut de page",
        "apiNote": "Contenu servi par une API REST en production"
    },
    "language": {
        "label": "Langue"
    },
    "theme": {
        "toLight": "Passer en mode clair",
        "toDark": "Passer en mode sombre"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/providers/i18n-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nProvider",
    ()=>I18nProvider,
    "LANGUAGES",
    ()=>LANGUAGES,
    "useI18n",
    ()=>useI18n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$en$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/en.json.[json].cjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$ar$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/ar.json.[json].cjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$ru$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/ru.json.[json].cjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$fr$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/fr.json.[json].cjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const LANGUAGES = [
    {
        code: "en",
        label: "English",
        dir: "ltr"
    },
    {
        code: "ar",
        label: "العربية",
        dir: "rtl"
    },
    {
        code: "ru",
        label: "Русский",
        dir: "ltr"
    },
    {
        code: "fr",
        label: "Français",
        dir: "ltr"
    }
];
const DICTIONARIES = {
    en: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$en$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    ar: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$ar$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    ru: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$ru$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    fr: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$fr$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
};
const STORAGE_KEY = "dpx-locale";
function lookup(dict, path) {
    return path.split(".").reduce((acc, key)=>acc && typeof acc === "object" ? acc[key] : undefined, dict);
}
const I18nContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function I18nProvider({ children }) {
    _s();
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("en");
    const applyLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "I18nProvider.useCallback[applyLocale]": (next)=>{
            const lang = LANGUAGES.find({
                "I18nProvider.useCallback[applyLocale]": (l)=>l.code === next
            }["I18nProvider.useCallback[applyLocale]"]) ?? LANGUAGES[0];
            setLocaleState(next);
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch  {
            /* storage unavailable */ }
            document.documentElement.lang = next;
            document.documentElement.dir = lang.dir;
        }
    }["I18nProvider.useCallback[applyLocale]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "I18nProvider.useEffect": ()=>{
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved && saved in DICTIONARIES) applyLocale(saved);
            } catch  {
            /* storage unavailable */ }
        }
    }["I18nProvider.useEffect"], [
        applyLocale
    ]);
    const resolve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "I18nProvider.useCallback[resolve]": (path)=>lookup(DICTIONARIES[locale], path) ?? lookup(DICTIONARIES.en, path)
    }["I18nProvider.useCallback[resolve]"], [
        locale
    ]);
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "I18nProvider.useCallback[t]": (path)=>{
            const value = resolve(path);
            return typeof value === "string" ? value : path;
        }
    }["I18nProvider.useCallback[t]"], [
        resolve
    ]);
    const tr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "I18nProvider.useCallback[tr]": (path)=>resolve(path) ?? path
    }["I18nProvider.useCallback[tr]"], [
        resolve
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "I18nProvider.useMemo[value]": ()=>({
                locale,
                dir: LANGUAGES.find({
                    "I18nProvider.useMemo[value]": (l)=>l.code === locale
                }["I18nProvider.useMemo[value]"])?.dir ?? "ltr",
                setLocale: applyLocale,
                t,
                tr
            })
    }["I18nProvider.useMemo[value]"], [
        locale,
        applyLocale,
        t,
        tr
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(I18nContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/providers/i18n-provider.tsx",
        lineNumber: 109,
        columnNumber: 10
    }, this);
}
_s(I18nProvider, "OBV7VhCq4bwu7P3wcBfPWu+glb4=");
_c = I18nProvider;
function useI18n() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(I18nContext);
    if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
    return ctx;
}
_s1(useI18n, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_context__.k.register(_c, "I18nProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0dtt.gr._.js.map