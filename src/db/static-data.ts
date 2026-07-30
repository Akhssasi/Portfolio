import type { ContactMessage, Experience, Project, Skill } from "./schema";

const now = new Date();

/* ————————————————— PROJECTS ————————————————— */

let nextProjectId = 5;

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Enterprise E-Commerce Platform",
    slug: "enterprise-ecommerce-platform",
    shortDescription:
      "A scalable e-commerce platform with product management, cart, order processing, JWT authentication, and a full admin dashboard.",
    fullDescription:
      "A production-grade e-commerce system built with an Angular SPA frontend and a layered Spring Boot backend. It covers the entire commercial lifecycle: browsing a product catalog, managing a persistent cart, placing orders through transactional endpoints, and administering products, stock, and customers from a protected dashboard. Every write path is validated server-side and runs inside a database transaction so stock and order states can never diverge.",
    problem:
      "Handling secure user authentication, concurrent product data access, and transactional order processing without sacrificing response times or data integrity.",
    solution:
      "Stateless JWT authentication with role-based authorization, optimistic-locking stock management, and transactional order pipelines backed by a normalized PostgreSQL schema.",
    architecture:
      "Controller (REST) -> Service (business rules, @Transactional) -> Repository (Spring Data JPA) -> PostgreSQL. DTOs on every boundary, MapStruct-style mappers, global exception handling, OpenAPI documentation. Angular consumes the API through typed services with an HTTP interceptor attaching JWTs.",
    features: [
      "JWT authentication with refresh tokens",
      "Role-based authorization (customer / admin)",
      "Product catalog with search and pagination",
      "Persistent shopping cart per user",
      "Transactional order processing pipeline",
      "Admin dashboard for products, stock and orders",
      "Normalized PostgreSQL relational schema",
      "OpenAPI (Swagger) documented REST API",
    ],
    techStack: [
      "Angular",
      "TypeScript",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Hibernate",
      "JWT",
      "Swagger",
    ],
    githubUrl: "https://github.com/devportfoliox/enterprise-ecommerce-platform",
    liveUrl: "https://ecommerce.devportfoliox.com",
    imageUrl: "/images/projects/ecommerce.jpg",
    featured: true,
    displayOrder: 1,
    translations: {
      ar: {
        title: "منصة تجارة إلكترونية للمؤسسات",
        shortDescription: "منصة تجارة إلكترونية قابلة للتوسع مع إدارة المنتجات وسلة التسوق ومعالجة الطلبات ومصادقة JWT ولوحة تحكم إدارية كاملة.",
      },
      ru: {
        title: "Корпоративная платформа электронной коммерции",
        shortDescription: "Масштабируемая e-commerce платформа: каталог, корзина, обработка заказов, JWT-аутентификация и админ-панель.",
      },
      fr: {
        title: "Plateforme e-commerce d'entreprise",
        shortDescription: "Plateforme e-commerce évolutive : catalogue, panier, traitement des commandes, authentification JWT et tableau de bord admin complet.",
      },
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    title: "Real-Time Analytics Dashboard",
    slug: "realtime-analytics-dashboard",
    shortDescription:
      "A live business-monitoring dashboard streaming metrics over Server-Sent Events, with interactive charts and optimized aggregation queries.",
    fullDescription:
      "A monitoring platform that turns raw business events into live, explorable metrics. The backend aggregates measurements in PostgreSQL using window functions and materialized summaries, then pushes deltas to the Angular client over Server-Sent Events. The frontend renders interactive charts with incremental updates so the UI stays smooth even under a continuous event stream.",
    problem:
      "Rendering live metrics for business monitoring without hammering the database or freezing the UI when thousands of events arrive per minute.",
    solution:
      "Pre-aggregated summary tables refreshed on schedule, indexed time-range queries, and a push model over SSE with throttled client-side rendering.",
    architecture:
      "Spring Boot exposes /api/metrics/stream (SSE) plus REST history endpoints; a scheduled aggregator writes summary tables; PostgreSQL indexes on (metric, bucket) keep p95 reads under 20 ms. Angular charts subscribe through an RxJS wrapper around EventSource.",
    features: [
      "Real-time updates via Server-Sent Events",
      "Interactive, incrementally-updating charts",
      "Backend data aggregation with scheduled jobs",
      "Optimized PostgreSQL window-function queries",
      "Time-range filtering and drill-down",
      "Responsive dashboard layouts",
    ],
    techStack: ["Angular", "TypeScript", "RxJS", "Spring Boot", "PostgreSQL", "SSE", "Docker"],
    githubUrl: "https://github.com/devportfoliox/realtime-analytics-dashboard",
    liveUrl: "https://analytics.devportfoliox.com",
    imageUrl: "/images/projects/analytics.jpg",
    featured: true,
    displayOrder: 2,
    translations: {
      ar: {
        title: "لوحة تحليلات فورية",
        shortDescription: "لوحة مراقبة أعمال تبث المؤشرات لحظيًا عبر Server-Sent Events مع رسوم بيانية تفاعلية واستعلامات تجميع مُحسَّنة.",
      },
      ru: {
        title: "Дашборд аналитики в реальном времени",
        shortDescription: "Панель мониторинга, стримящая метрики через Server-Sent Events: интерактивные графики и оптимизированные запросы агрегации.",
      },
      fr: {
        title: "Tableau de bord analytique temps réel",
        shortDescription: "Tableau de bord diffusant les métriques en direct via Server-Sent Events, avec graphiques interactifs et requêtes d'agrégation optimisées.",
      },
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    title: "Task Management System",
    slug: "task-management-system",
    shortDescription:
      "A full-stack task manager with teams, project boards, statuses, priorities and deadlines on a layered Spring Boot backend.",
    fullDescription:
      "A collaborative task management application where teams organize work into projects and boards. Tasks carry status, priority, assignees, and deadlines; filters and searches are executed server-side so boards stay fast as they grow. The frontend is a reactive Angular SPA with typed forms and optimistic UI updates, while Spring Security guards every endpoint.",
    problem:
      "Keeping multi-team task data consistent, permission-safe and instantly filterable while the underlying relation graph (teams -> projects -> tasks -> users) grows.",
    solution:
      "A clean relational model with foreign keys and join indexes, specification-based dynamic queries for filtering, and role-aware authorization rules in the service layer.",
    architecture:
      "Spring Boot layers with JPA Specifications for dynamic filters; PostgreSQL relations users / teams / projects / tasks with cascading rules; Angular feature modules per domain with reactive forms and an auth guard.",
    features: [
      "Authentication with role-aware guards",
      "Teams, projects and Kanban boards",
      "Task CRUD with status, priority and deadline",
      "Server-side filtering and full-text search",
      "User roles and assignment workflows",
      "Deep PostgreSQL relationships and constraints",
    ],
    techStack: ["Angular", "TypeScript", "Spring Boot", "Spring Security", "PostgreSQL", "REST API"],
    githubUrl: "https://github.com/devportfoliox/task-management-system",
    liveUrl: "https://tasks.devportfoliox.com",
    imageUrl: "/images/projects/taskflow.jpg",
    featured: false,
    displayOrder: 3,
    translations: {
      ar: {
        title: "نظام إدارة المهام",
        shortDescription: "تطبيق متكامل لإدارة المهام مع فرق العمل ولوحات المشاريع والحالات والأولويات والمواعيد النهائية.",
      },
      ru: {
        title: "Система управления задачами",
        shortDescription: "Full-stack менеджер задач: команды, доски проектов, статусы, приоритеты и дедлайны на слоистом бэкенде Spring Boot.",
      },
      fr: {
        title: "Système de gestion de tâches",
        shortDescription: "Gestionnaire de tâches full stack : équipes, tableaux de projets, statuts, priorités et échéances sur un backend Spring Boot en couches.",
      },
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 4,
    title: "Portfolio CMS Admin Panel",
    slug: "portfolio-cms-admin-panel",
    shortDescription:
      "The admin panel behind this very site — a database-driven portfolio where projects, skills, experience and messages are managed over a REST API.",
    fullDescription:
      "Instead of a hardcoded static website, this portfolio is backed by a content API. Projects, skills, and the experience timeline live in PostgreSQL and are served through versioned REST endpoints with validation; contact messages land in an admin inbox. This very page is the live demo: everything below the hero is rendered from database rows.",
    problem:
      "A static portfolio requires a redeploy for every content change and cannot receive structured contact messages.",
    solution:
      "Content modeled as relational entities with a CRUD REST API, admin-key protected mutations, and database-driven rendering — content updates take effect instantly, no redeploys.",
    architecture:
      "REST controllers -> service layer -> repository over PostgreSQL; Zod-validated DTOs on input, consistent error envelopes, admin API-key guard on mutations. The public site server-renders from the same repository the API writes to.",
    features: [
      "Manage projects, skills and experience via REST API",
      "Contact message inbox with statuses",
      "Admin-key protected mutation endpoints",
      "Zod-validated request DTOs",
      "Database-driven, fully dynamic content",
      "Multilingual content via JSONB translations",
    ],
    techStack: ["Angular", "TypeScript", "Spring Boot", "PostgreSQL", "REST API", "Docker"],
    githubUrl: "https://github.com/devportfoliox/portfolio-cms",
    liveUrl: "https://devportfoliox.com",
    imageUrl: "/images/projects/cms.jpg",
    featured: false,
    displayOrder: 4,
    translations: {
      ar: {
        title: "لوحة إدارة محتوى معرض الأعمال",
        shortDescription: "لوحة الإدارة خلف هذا الموقع — معرض أعمال مدفوع بقاعدة البيانات تُدار فيه المشاريع والمهارات والخبرة والرسائل عبر REST API.",
      },
      ru: {
        title: "CMS-панель управления портфолио",
        shortDescription: "Админ-панель этого самого сайта: проекты, навыки, опыт и сообщения управляются через REST API и хранятся в PostgreSQL.",
      },
      fr: {
        title: "Panneau CMS du portfolio",
        shortDescription: "Le panneau d'administration derrière ce site : projets, compétences, expérience et messages gérés via une API REST.",
      },
    },
    createdAt: now,
    updatedAt: now,
  },
];

/* ————————————————— SKILLS ————————————————— */

let nextSkillId = 21;

const initialSkills: Skill[] = [
  { id: 1, name: "Angular", category: "frontend", iconName: "angular", proficiency: 95, displayOrder: 1, createdAt: now },
  { id: 2, name: "TypeScript", category: "frontend", iconName: "typescript", proficiency: 93, displayOrder: 2, createdAt: now },
  { id: 3, name: "React", category: "frontend", iconName: "react", proficiency: 86, displayOrder: 3, createdAt: now },
  { id: 4, name: "Vue", category: "frontend", iconName: "vuedotjs", proficiency: 78, displayOrder: 4, createdAt: now },
  { id: 5, name: "HTML5", category: "frontend", iconName: "html5", proficiency: 96, displayOrder: 5, createdAt: now },
  { id: 6, name: "CSS3 / SCSS", category: "frontend", iconName: "css3", proficiency: 92, displayOrder: 6, createdAt: now },
  { id: 7, name: "Tailwind CSS", category: "frontend", iconName: "tailwindcss", proficiency: 88, displayOrder: 7, createdAt: now },
  { id: 8, name: "Java", category: "backend", iconName: "openjdk", proficiency: 92, displayOrder: 8, createdAt: now },
  { id: 9, name: "Spring Boot", category: "backend", iconName: "springboot", proficiency: 91, displayOrder: 9, createdAt: now },
  { id: 10, name: "Spring Security", category: "backend", iconName: "springsecurity", proficiency: 85, displayOrder: 10, createdAt: now },
  { id: 11, name: "REST APIs", category: "backend", iconName: "rest", proficiency: 94, displayOrder: 11, createdAt: now },
  { id: 12, name: "Node.js", category: "backend", iconName: "nodedotjs", proficiency: 80, displayOrder: 12, createdAt: now },
  { id: 13, name: "PostgreSQL", category: "database", iconName: "postgresql", proficiency: 90, displayOrder: 13, createdAt: now },
  { id: 14, name: "MySQL", category: "database", iconName: "mysql", proficiency: 85, displayOrder: 14, createdAt: now },
  { id: 15, name: "JPA / Hibernate", category: "database", iconName: "hibernate", proficiency: 88, displayOrder: 15, createdAt: now },
  { id: 16, name: "Git", category: "tools", iconName: "git", proficiency: 93, displayOrder: 16, createdAt: now },
  { id: 17, name: "GitHub", category: "tools", iconName: "github", proficiency: 90, displayOrder: 17, createdAt: now },
  { id: 18, name: "Docker", category: "tools", iconName: "docker", proficiency: 82, displayOrder: 18, createdAt: now },
  { id: 19, name: "Swagger / OpenAPI", category: "tools", iconName: "swagger", proficiency: 88, displayOrder: 19, createdAt: now },
  { id: 20, name: "Postman", category: "tools", iconName: "postman", proficiency: 90, displayOrder: 20, createdAt: now },
];

/* ————————————————— EXPERIENCE ————————————————— */

let nextExperienceId = 5;

const initialExperience: Experience[] = [
  {
    id: 1,
    role: "Full Stack Engineer",
    company: "Freelance / Independent",
    period: "2023 — Present",
    description:
      "Designing and shipping production-grade applications end to end: Angular frontends with typed service layers, Spring Boot backends with clean layered architecture, and PostgreSQL schemas built for integrity and scale. Own everything from REST API contracts and security to deployment and database migrations.",
    technologies: ["Angular", "TypeScript", "Java", "Spring Boot", "Spring Security", "PostgreSQL", "Docker"],
    displayOrder: 1,
    translations: {
      ar: { role: "مهندس برمجيات متكامل", description: "تصميم وتسليم تطبيقات بمعايير إنتاجية من البداية للنهاية." },
      ru: { role: "Full Stack-инженер", description: "Проектирование и выпуск приложений продакшн-уровня от начала до конца." },
      fr: { role: "Ingénieur Full Stack", description: "Conception et livraison d'applications de niveau production de bout en bout." },
    },
    createdAt: now,
  },
  {
    id: 2,
    role: "Backend Developer (Java / Spring Boot)",
    company: "Contract Projects",
    period: "2022 — 2023",
    description:
      "Built secure REST APIs for client systems: JWT authentication and role-based authorization with Spring Security, validated DTO contracts, global exception handling, and integration-tested service layers. Designed normalized PostgreSQL schemas and tuned slow queries with indexing and query-plan analysis.",
    technologies: ["Java", "Spring Boot", "Spring Security", "PostgreSQL", "JPA / Hibernate", "Swagger"],
    displayOrder: 2,
    translations: {
      ar: { role: "مطوّر أنظمة خلفية (Java / Spring Boot)", description: "بناء واجهات REST برمجية آمنة لأنظمة العملاء." },
      ru: { role: "Backend-разработчик (Java / Spring Boot)", description: "Создание защищённых REST API для клиентских систем." },
      fr: { role: "Développeur Backend (Java / Spring Boot)", description: "Construction d'API REST sécurisées pour des systèmes clients." },
    },
    createdAt: now,
  },
  {
    id: 3,
    role: "Frontend Developer (Angular)",
    company: "Project-based Work",
    period: "2021 — 2022",
    description:
      "Delivered type-safe single-page applications with Angular and TypeScript: feature-module architecture, reactive forms with rich validation, RxJS data streams, HTTP interceptors, and reusable component libraries. Focused on accessibility, responsive layouts, and consistent design systems.",
    technologies: ["Angular", "TypeScript", "RxJS", "SCSS", "Tailwind CSS", "HTML5"],
    displayOrder: 3,
    translations: {
      ar: { role: "مطوّر واجهات أمامية (Angular)", description: "تسليم تطبيقات أحادية الصفحة محكمة الأنواع باستخدام Angular وTypeScript." },
      ru: { role: "Frontend-разработчик (Angular)", description: "Разработка типобезопасных SPA на Angular и TypeScript." },
      fr: { role: "Développeur Frontend (Angular)", description: "Livraison de SPA fortement typées avec Angular et TypeScript." },
    },
    createdAt: now,
  },
  {
    id: 4,
    role: "Database Design & SQL",
    company: "Academic & Personal Projects",
    period: "2020 — 2021",
    description:
      "Deep-dived into relational theory and practice: normalization up to 3NF, ER modeling, constraints and referential integrity, transactions and isolation levels, and query optimization with EXPLAIN plans on PostgreSQL and MySQL datasets.",
    technologies: ["PostgreSQL", "MySQL", "SQL", "ER Modeling", "Normalization"],
    displayOrder: 4,
    translations: {
      ar: { role: "تصميم قواعد البيانات وSQL", description: "تعمّقت في نظرية قواعد البيانات العلائقية وتطبيقها." },
      ru: { role: "Проектирование БД и SQL", description: "Глубокое погружение в реляционную теорию и практику." },
      fr: { role: "Conception de bases de données & SQL", description: "Approfondissement de la théorie et de la pratique relationnelles." },
    },
    createdAt: now,
  },
];

/* ————————————————— CONTACT MESSAGES ————————————————— */

let nextMessageId = 1;

const initialContactMessages: ContactMessage[] = [];

/* ————————————————— MUTABLE STORES ————————————————— */

export const projectsStore: Project[] = structuredClone(initialProjects);
export const skillsStore: Skill[] = structuredClone(initialSkills);
export const experienceStore: Experience[] = structuredClone(initialExperience);
export const contactMessagesStore: ContactMessage[] = structuredClone(initialContactMessages);

/* ————————————————— ID COUNTERS ————————————————— */

export function nextProjectIdValue(): number {
  return nextProjectId++;
}

export function nextSkillIdValue(): number {
  return nextSkillId++;
}

export function nextExperienceIdValue(): number {
  return nextExperienceId++;
}

export function nextMessageIdValue(): number {
  return nextMessageId++;
}

export function resetStores(): void {
  projectsStore.length = 0;
  projectsStore.push(...structuredClone(initialProjects));
  skillsStore.length = 0;
  skillsStore.push(...structuredClone(initialSkills));
  experienceStore.length = 0;
  experienceStore.push(...structuredClone(initialExperience));
  contactMessagesStore.length = 0;
  contactMessagesStore.push(...structuredClone(initialContactMessages));
  nextProjectId = initialProjects.length + 1;
  nextSkillId = initialSkills.length + 1;
  nextExperienceId = initialExperience.length + 1;
  nextMessageId = 1;
}
