"use client";

import rawData from "../data.json";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "ru" | "lv";

const STORAGE_KEY = "amds.language";

export const LANGUAGE_OPTIONS: Array<{ value: Language; label: string }> = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" },
  { value: "lv", label: "LV" },
];

type Locale = {
  ui: {
    header: {
      nav: Array<{ id: string; label: string }>;
      cta: string;
      openMenu: string;
      closeMenu: string;
    };
    hero: {
      lineTop: string;
      highlightOne: string;
      connector: string;
      highlightTwo: string;
      subtitle: string;
      location: string;
    };
    stack: {
      title: string;
      footerLineOne: string;
      footerLineTwo: string;
    };
    howItWorks: {
      category: string;
      title: string;
      description: string;
      cta: string;
      turnaroundTitle: string;
      turnaroundRows: Array<{ label: string; value: string }>;
      toolsTitle: string;
      toolsRows: Array<{ label: string; value: string }>;
    };
    beautifulWorks: {
      title: string;
      description: string;
    };
    capabilities: {
      category: string;
      revealText: string;
      experienceLabel: string;
      experienceTitle: string;
      description: string;
      cta: string;
    };
    testimonial: {
      category: string;
      title: string;
      description: string;
      reviews: Array<{
        name: string;
        meta: string;
        body: string;
        img: string;
      }>;
    };
    pricing: {
      category: string;
      title: string;
      description: string;
      cardCta: string;
      customTitle: string;
      customDescriptionTop: string;
      customDescriptionBottom: string;
      customCta: string;
    };
    cases: {
      category: string;
      title: string;
      description: string;
    };
    blog: {
      category: string;
      title: string;
      description: string;
    };
    faq: {
      title: string;
      description: string;
      leftTitle: string;
      rightTitle: string;
      inquiriesLabel: string;
      quickChatLabel: string;
      followLabel: string;
      replyTime: string;
      form: {
        name: string;
        email: string;
        message: string;
        attachment: string;
        optional: string;
        namePlaceholder: string;
        emailPlaceholder: string;
        messagePlaceholder: string;
        dropzonePrefix: string;
        dropzoneAction: string;
        dropzoneHint: string;
        send: string;
        sent: string;
        success: string;
        removeFile: string;
      };
      validation: {
        nameRequired: string;
        nameShort: string;
        emailRequired: string;
        emailInvalid: string;
        messageRequired: string;
        messageShort: string;
        fileType: string;
        fileSize: string;
        submitFallback: string;
      };
    };
    footer: {
      heroTop: string;
      heroBottom: string;
      heroDescription: string;
      heroDescriptionSecondLine: string;
      cta: string;
      description: string;
      nav: Array<{ href: string; text: string }>;
      privacy: string;
      copyright: string;
    };
    common: {
      contactEmail: string;
    };
  };
  data: {
    techStackNames: string[];
    worksImageAlts: string[];
    designData: Array<{ title: string; name: string; caption: string }>;
    capabilitiesButtons: string[];
    capabilitiesCards: Array<{ title: string; description: string }>;
    pricingCards: Array<{
      title: string;
      badge?: string;
      description: string;
      price: string;
      note: string;
      featured?: boolean;
      features: string[];
    }>;
    caseStudies: Array<{
      category: string;
      title: string;
      description: string;
      tags: string[];
    }>;
    blogPosts: Array<{
      category: string;
      title: string;
      description: string;
    }>;
    faqData: Array<{ question: string; answer: string }>;
  };
};

const en: Locale = {
  ui: {
    header: {
      nav: [
        { id: "process", label: "Process" },
        { id: "services", label: "Services" },
        { id: "pricing", label: "Pricing" },
        { id: "work", label: "Work" },
        { id: "faq", label: "FAQ" },
      ],
      cta: "Get a Quote",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      lineTop: "Get a website that is",
      highlightOne: "clear, fast,",
      connector: "and",
      highlightTwo: "brings you leads",
      subtitle:
        "We design and build marketing websites, add analytics, payments, CMS, and automations.",
      location: "Based in Riga, Latvia. Working worldwide.",
    },
    stack: {
      title: "BUILT WITH MODERN TECH",
      footerLineOne:
        "Next.js, React, TypeScript, SCSS, headless CMS, Stripe, Google Analytics, and custom APIs.",
      footerLineTwo:
        "Python for automations. Webflow and WordPress when they fit the job.",
    },
    howItWorks: {
      category: "HOW WE WORK",
      title: "Transparent project pricing, scoped upfront.",
      description:
        "Brand, website, CMS, analytics, payments, integrations, automations. One team, one pipeline, ready to launch. Monthly support is optional.",
      cta: "See Pricing",
      turnaroundTitle: "Turnaround Time",
      turnaroundRows: [
        { label: "Response time", value: "1-2 business days" },
        { label: "Landing page", value: "1-3 weeks" },
        { label: "Multi-page site", value: "3-6 weeks" },
        { label: "Web app / complex product", value: "6-10+ weeks" },
      ],
      toolsTitle: "Tools & Communication",
      toolsRows: [
        { label: "Communication", value: "Your preferred messenger" },
        { label: "Calls", value: "Google Meet / FaceTime" },
        { label: "Project tracking", value: "Notion / Trello" },
        { label: "Design & files", value: "Figma" },
      ],
    },
    beautifulWorks: {
      title: "Selected Work",
      description:
        "We help businesses grow with clear, conversion-focused, and professional websites that convert.",
    },
    capabilities: {
      category: "our services",
      revealText: "What we can build for you...",
      experienceLabel: "8+ YEARS EXPERIENCE",
      experienceTitle: "Designing and shipping conversion-focused marketing websites and web products",
      description:
        "From first draft to launch, we build conversion-focused websites with analytics, integrations, and payments. Clean custom code when performance, speed, and flexibility matter.",
      cta: "See Pricing",
    },
    testimonial: {
      category: "TESTIMONIALS",
      title: "What Clients Say",
      description: "A few short notes from recent projects.",
      reviews: [
        {
          name: "TinyTunes Space",
          meta: "Launch",
          body: "Clean, precise, and exactly on point. The site feels premium, loads instantly, and the whole flow is easy to understand.",
          img: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "voyagesetmoi",
          meta: "Website",
          body: "Full rebuild with better structure and visuals. Media is optimized, updates are painless, and everything feels more modern.",
          img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "Georgiy Gudovskiy",
          meta: "Full Site",
          body: "Built from scratch: design, development, photo and video handling, optimization, and a smooth final delivery.",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Automation",
          body: "Internal reporting automations saved hundreds of hours. Reliable Python scripts, clean outputs, and stable maintenance.",
          img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Analytics",
          body: "Tracking finally makes sense. Events are structured, dashboards are clear, and decisions are based on real behavior.",
          img: "https://plus.unsplash.com/premium_photo-1661778906556-82ec2021c533?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Payments",
          body: "Payments flow is smooth and stable. Stripe integration works reliably, with clean back office logic and clear scope.",
          img: "https://images.unsplash.com/photo-1614890107637-fe96d74acf4b?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Performance",
          body: "Noticeably better performance and stronger Lighthouse results. Practical improvements that actually move the needle.",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Support",
          body: "Quick fixes, clear communication, and updates that do not break things. Easy to work with long term.",
          img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=160&auto=format&fit=crop",
        },
      ],
    },
    pricing: {
      category: "Transparent Pricing",
      title: "Project based pricing, scoped upfront.",
      description:
        "No surprises. Final quote depends on scope, content readiness, integrations, and timeline.",
      cardCta: "Get a Quote",
      customTitle: "Need something custom?",
      customDescriptionTop: "Complex product sites and internal tools: 6+ weeks, custom quote.",
      customDescriptionBottom:
        "Automation and reporting workflows with Python are available when it fits the scope.",
      customCta: "Talk About Your Project",
    },
    cases: {
      category: "our work",
      title: "Case Studies",
      description: "Real projects, real results",
    },
    blog: {
      category: "insights",
      title: "Blog",
      description: "Tips, guides, and thoughts on web development",
    },
    faq: {
      title: "FAQ & Contact",
      description: "Common questions and a direct line to us",
      leftTitle: "Frequently Asked",
      rightTitle: "Get in Touch",
      inquiriesLabel: "For project inquiries",
      quickChatLabel: "Quick chat",
      followLabel: "Follow us",
      replyTime: "Usually reply within 24 hours",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        attachment: "Attachment",
        optional: "(optional)",
        namePlaceholder: "Your name",
        emailPlaceholder: "your@email.com",
        messagePlaceholder: "Tell us about your project...",
        dropzonePrefix: "Drag & drop or",
        dropzoneAction: "browse",
        dropzoneHint: "JPG, PNG, GIF, WebP, PDF, DOC up to 10MB",
        send: "Send Message",
        sent: "Message Sent!",
        success: "Thanks! We'll get back to you within 1-2 business days.",
        removeFile: "Remove file",
      },
      validation: {
        nameRequired: "Name is required",
        nameShort: "Name must be at least 2 characters",
        emailRequired: "Email is required",
        emailInvalid: "Please enter a valid email",
        messageRequired: "Message is required",
        messageShort: "Message must be at least 10 characters",
        fileType: "File type not supported. Use JPG, PNG, GIF, WebP, PDF, or DOC",
        fileSize: "File is too large. Maximum size is 10MB",
        submitFallback: "Failed to send message. Please try again.",
      },
    },
    footer: {
      heroTop: "Ready to build",
      heroBottom: "something great?",
      heroDescription: "Let's talk about your project.",
      heroDescriptionSecondLine: "Get a quote within 1-2 business days.",
      cta: "Get a Quote",
      description:
        "AM Digital Studio - building clear, conversion-focused websites from Riga, Latvia. Working worldwide.",
      nav: [
        { href: "#process", text: "Process" },
        { href: "#services", text: "Services" },
        { href: "#pricing", text: "Pricing" },
        { href: "#work", text: "Work" },
        { href: "#faq", text: "FAQ" },
      ],
      privacy: "Privacy Policy",
      copyright: "© 2025 AM Digital Studio",
    },
    common: {
      contactEmail: "andreymanuilovweb@gmail.com",
    },
  },
  data: {
    techStackNames: rawData.techStack.map((item) => item.name),
    worksImageAlts: rawData.worksImages.map((item) => item.alt),
    designData: rawData.designData.map((item) => ({
      title: item.title,
      name: item.name,
      caption: item.caption,
    })),
    capabilitiesButtons: rawData.capabilitiesButtons.map((item) => item.name),
    capabilitiesCards: rawData.capabilitiesCards.map((item) => ({
      title: item.title,
      description: item.description,
    })),
    pricingCards: rawData.pricingCards.map((item) => ({
      title: item.title,
      badge: item.badge,
      description: item.description,
      price: item.price,
      note: item.note,
      featured: item.featured,
      features: item.features,
    })),
    caseStudies: rawData.caseStudies.map((item) => ({
      category: item.category,
      title: item.title,
      description: item.description,
      tags: item.tags,
    })),
    blogPosts: rawData.blogPosts.map((item) => ({
      category: item.category,
      title: item.title,
      description: item.description,
    })),
    faqData: rawData.faqData.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  },
};

const ru: Locale = {
  ui: {
    header: {
      nav: [
        { id: "process", label: "Процесс" },
        { id: "services", label: "Услуги" },
        { id: "pricing", label: "Цены" },
        { id: "work", label: "Работы" },
        { id: "faq", label: "FAQ" },
      ],
      cta: "Обсудить проект",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
    },
    hero: {
      lineTop: "Создаем быстрые и понятные сайты,",
      highlightOne: "которые",
      connector: "",
      highlightTwo: "привлекают клиентов",
      subtitle:
        "Проектируем и запускаем маркетинговые сайты и лендинги, подключаем GA4, платежи, CMS и автоматизации.",
      location: "Базируемся в Риге, Латвия. Работаем по всему миру.",
    },
    stack: {
      title: "СОВРЕМЕННЫЙ ТЕХСТЕК",
      footerLineOne:
        "Next.js, React, TypeScript, SCSS, headless CMS, Stripe, Google Analytics и кастомные API.",
      footerLineTwo:
        "Python для автоматизаций. Webflow и WordPress — когда это уместно для задачи.",
    },
    howItWorks: {
      category: "КАК МЫ РАБОТАЕМ",
      title: "Прозрачная стоимость: объем и бюджет согласуем заранее.",
      description:
        "Бренд, лендинг или сайт, CMS, аналитика, платежи, интеграции и автоматизации. Одна команда и понятный процесс до релиза. Поддержка — по запросу.",
      cta: "Смотреть цены",
      turnaroundTitle: "Сроки",
      turnaroundRows: [
        { label: "Ответ на запрос", value: "1-2 рабочих дня" },
        { label: "Лендинг", value: "1-3 недели" },
        { label: "Многостраничный сайт", value: "3-6 недель" },
        { label: "Веб-приложение / сложный продукт", value: "6-10+ недель" },
      ],
      toolsTitle: "Инструменты и коммуникация",
      toolsRows: [
        { label: "Коммуникация", value: "Удобный вам мессенджер" },
        { label: "Созвоны", value: "Google Meet / FaceTime" },
        { label: "Ведение проекта", value: "Notion / Trello" },
        { label: "Дизайн и файлы", value: "Figma" },
      ],
    },
    beautifulWorks: {
      title: "Избранные проекты",
      description:
        "Помогаем бизнесу расти за счет понятных, аккуратных и профессиональных сайтов, которые конвертируют.",
    },
    capabilities: {
      category: "наши услуги",
      revealText: "Что мы можем сделать для вас...",
      experienceLabel: "8+ ЛЕТ ОПЫТА",
      experienceTitle: "Проектируем и запускаем маркетинговые сайты и веб-продукты",
      description:
        "От идеи до релиза создаем сайты с фокусом на конверсию: аналитика, интеграции и платежи. Чистый кастомный код для скорости, SEO и гибкости.",
      cta: "Смотреть цены",
    },
    testimonial: {
      category: "ОТЗЫВЫ",
      title: "Что говорят клиенты",
      description: "Несколько коротких отзывов по недавним проектам.",
      reviews: [
        {
          name: "TinyTunes Space",
          meta: "Запуск",
          body: "Четко, чисто и точно в цель. Сайт ощущается премиально, загружается мгновенно, а весь путь пользователя понятен.",
          img: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "voyagesetmoi",
          meta: "Сайт",
          body: "Полный редизайн и переработка структуры. Медиа оптимизированы, обновления вносятся легко, все выглядит современно.",
          img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "Georgiy Gudovskiy",
          meta: "Полный цикл",
          body: "Сделано с нуля: дизайн, разработка, обработка фото и видео, оптимизация и аккуратная финальная сдача.",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Автоматизация",
          body: "Автоматизация внутренней отчетности сэкономила сотни часов. Надежные Python-скрипты, понятные результаты и стабильная поддержка.",
          img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Аналитика",
          body: "Трекинг наконец стал понятным. События структурированы, дашборды прозрачные, решения принимаются на основе реального поведения пользователей.",
          img: "https://plus.unsplash.com/premium_photo-1661778906556-82ec2021c533?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Платежи",
          body: "Платежный поток работает стабильно и предсказуемо. Интеграция Stripe надежна, логика бэк-офиса чистая, объем работ прозрачен.",
          img: "https://images.unsplash.com/photo-1614890107637-fe96d74acf4b?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Производительность",
          body: "Производительность сайта заметно выросла, показатели Lighthouse стали выше. Практические улучшения, которые реально дают результат.",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Поддержка",
          body: "Оперативные правки, четкая коммуникация и обновления без поломок. Удобно работать в долгую.",
          img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=160&auto=format&fit=crop",
        },
      ],
    },
    pricing: {
      category: "Прозрачные цены",
      title: "Цена проекта по согласованному объему",
      description:
        "Итоговая стоимость зависит от объема, готовности контента, интеграций и сроков.",
      cardCta: "Обсудить проект",
      customTitle: "Нужен индивидуальный формат?",
      customDescriptionTop: "Сложные продуктовые сайты и внутренние инструменты: от 6 недель, индивидуальная оценка.",
      customDescriptionBottom:
        "Автоматизация и процессы отчетности на Python доступны, когда это соответствует задаче.",
      customCta: "Обсудить проект",
    },
    cases: {
      category: "наши работы",
      title: "Кейсы",
      description: "Реальные проекты, реальные результаты",
    },
    blog: {
      category: "инсайты",
      title: "Блог",
      description: "Практика и гайды по разработке сайтов",
    },
    faq: {
      title: "FAQ и Контакты",
      description: "Частые вопросы и прямой канал связи",
      leftTitle: "Частые вопросы",
      rightTitle: "Связаться с нами",
      inquiriesLabel: "Для запросов по проекту",
      quickChatLabel: "Быстрый контакт",
      followLabel: "Мы в соцсетях",
      replyTime: "Обычно отвечаем в течение 24 часов",
      form: {
        name: "Имя",
        email: "Email",
        message: "Сообщение",
        attachment: "Файл",
        optional: "(необязательно)",
        namePlaceholder: "Ваше имя",
        emailPlaceholder: "your@email.com",
        messagePlaceholder: "Расскажите о вашем проекте...",
        dropzonePrefix: "Перетащите файл или",
        dropzoneAction: "выберите",
        dropzoneHint: "JPG, PNG, GIF, WebP, PDF, DOC до 10MB",
        send: "Отправить",
        sent: "Отправлено!",
        success: "Спасибо! Мы свяжемся с вами в течение 1-2 рабочих дней.",
        removeFile: "Удалить файл",
      },
      validation: {
        nameRequired: "Введите имя",
        nameShort: "Имя должно содержать минимум 2 символа",
        emailRequired: "Введите email",
        emailInvalid: "Введите корректный email",
        messageRequired: "Введите сообщение",
        messageShort: "Сообщение должно содержать минимум 10 символов",
        fileType: "Неподдерживаемый тип файла. Используйте JPG, PNG, GIF, WebP, PDF или DOC",
        fileSize: "Файл слишком большой. Максимальный размер — 10MB",
        submitFallback: "Не удалось отправить сообщение. Попробуйте еще раз.",
      },
    },
    footer: {
      heroTop: "Готовы создать",
      heroBottom: "что-то действительно сильное?",
      heroDescription: "Давайте обсудим ваш проект.",
      heroDescriptionSecondLine: "Оценка в течение 1-2 рабочих дней.",
      cta: "Обсудить проект",
      description:
        "AM Digital Studio — разрабатываем понятные и продуманные сайты в Риге, Латвия. Работаем по всему миру.",
      nav: [
        { href: "#process", text: "Процесс" },
        { href: "#services", text: "Услуги" },
        { href: "#pricing", text: "Цены" },
        { href: "#work", text: "Работы" },
        { href: "#faq", text: "FAQ" },
      ],
      privacy: "Политика конфиденциальности",
      copyright: "© 2025 AM Digital Studio",
    },
    common: {
      contactEmail: "andreymanuilovweb@gmail.com",
    },
  },
  data: {
    techStackNames: [
      "Next.js",
      "React",
      "TypeScript",
      "SCSS",
      "Stripe",
      "Google Analytics",
      "Figma",
      "Vercel",
      "GitHub",
      "Webflow",
    ],
    worksImageAlts: [
      "Проект 1",
      "Проект 2",
      "Проект 3",
      "Проект 4",
      "Проект 5",
      "Проект 6",
      "Проект 7",
      "Проект 8",
      "Проект 9",
      "Проект 10",
      "Проект 11",
      "Проект 12",
    ],
    designData: [
      {
        title: "Определяем цели",
        name: "Цели",
        caption: "Обсуждаем проект, аудиторию и задачи. Вместе фиксируем объем работ.",
      },
      {
        title: "Дизайн и разработка",
        name: "Дизайн и разработка",
        caption: "Проектируем в Figma, разрабатываем на Next.js и двигаемся по этапам с понятным процессом.",
      },
      {
        title: "Запуск и поддержка",
        name: "Запуск и поддержка",
        caption: "Запускаем сайт с готовой аналитикой, CMS и интеграциями. Поддержка после релиза — по запросу.",
      },
    ],
    capabilitiesButtons: [
      "Дизайн сайта",
      "UI и UX",
      "Разработка на Next.js",
      "Лендинги",
      "Производительность",
      "Базовое SEO",
      "GA4-аналитика",
      "Headless CMS",
      "Платежи Stripe",
      "API-интеграции",
      "Анимации",
      "Интерактивный веб",
      "Автоматизация на Python",
      "Поддержка и обновления",
    ],
    capabilitiesCards: [
      {
        title: "1. Дизайн сайта",
        description: "Современный, чистый и ориентированный на конверсию дизайн. Интерфейсы, которые выглядят сильно и ведут к действию.",
      },
      {
        title: "2. UI и UX",
        description: "Понятная структура, уверенная визуальная иерархия и пользовательские сценарии, которым легко доверять.",
      },
      {
        title: "3. Разработка на Next.js",
        description: "React, TypeScript, SCSS. Надежная и поддерживаемая фронтенд-разработка с production-подходом.",
      },
      {
        title: "4. Лендинги",
        description: "Четкая структура, понятный текст и рабочие CTA. Страницы, которые помогают получать обращения.",
      },
      {
        title: "5. Производительность + базовое SEO",
        description: "Скорость, Core Web Vitals и техническая SEO-гигиена для высокой скорости загрузки и корректной индексации.",
      },
      {
        title: "6. GA4-аналитика",
        description: "События, воронки и конверсии. Понимайте, что делают пользователи до нажатия «Обсудить проект».",
      },
      {
        title: "7. Headless CMS",
        description: "Структурированный контент и удобный процесс публикации. Обновляйте сайт без правки кода.",
      },
      {
        title: "8. Платежи Stripe",
        description: "Checkout, webhooks и базовые back-office сценарии. Принимайте платежи надежно и прозрачно.",
      },
      {
        title: "9. Python автоматизации",
        description: "Автоматизация, внутренние инструменты и процессы данных, которые убирают ручную работу и снижают риски.",
      },
    ],
    pricingCards: [
      {
        title: "Сайт \"под ключ\"",
        badge: "Старт за 5-7 дней",
        description: "Компактный сайт для уверенного старта: структура, дизайн по референсам и аккуратный запуск.",
        price: "от €890",
        note: "Срок: 5-7 рабочих дней",
        featured: false,
        features: [
          "Одностраничный сайт (до 6-8 блоков)",
          "Дизайн-направление на основе ваших референсов",
          "Адаптивная реализация на Next.js + TypeScript",
          "Базовое SEO и базовая настройка GA4",
          "Форма обратной связи",
          "1 итерация правок в рамках согласованного объема",
        ],
      },
      {
        title: "Лендинг",
        description: "Для запусков и кампаний. Четкая структура, высокая скорость и трекинг, который реально полезен.",
        price: "от €1,200",
        note: "Срок: 1-3 недели",
        featured: false,
        features: [
          "Структура и гайд по текстам с фокусом на конверсию",
          "Индивидуальное дизайн-направление и ключевые компоненты",
          "Реализация на Next.js + TypeScript + SCSS",
          "GA4 события + базовая настройка GTM",
          "Базовая оптимизация скорости и Core Web Vitals",
          "Формы и интеграция доставки лидов",
          "2 итерации правок в рамках согласованного объема",
        ],
      },
      {
        title: "Многостраничный сайт",
        badge: "Самый популярный",
        description: "Многостраничный сайт с запасом для роста. Дизайн, контент-процесс, аналитика и надежный релиз.",
        price: "от €2,500",
        note: "Срок: 3-6 недель",
        featured: true,
        features: [
          "UX многостраничной структуры и компонентная система",
          "Индивидуальная разработка на Next.js с чистой архитектурой",
          "Контент-процесс через headless CMS (в согласованном объеме)",
          "План аналитики + настройка GA4 событий",
          "Performance budget и оптимизационный проход",
          "Техническое SEO и корректная индексация",
          "3 итерации правок в рамках согласованного объема",
        ],
      },
      {
        title: "Ежемесячная поддержка",
        description: "Постоянные улучшения и сопровождение. Спокойный формат, чтобы сайт оставался стабильным и актуальным.",
        price: "от €100",
        note: "Входной план поддержки",
        featured: false,
        features: [
          "До 1 часа небольших задач в месяц",
          "Обновления контента и мелкие правки",
          "Базовые исправления и техподдержка",
          "Квартальная проверка производительности и аналитики",
          "Ответ в порядке очереди",
          "Можно перейти на расширенный план",
        ],
      },
    ],
    caseStudies: [
      {
        category: "Сайт мероприятия",
        title: "Tiny Tune Space",
        description: "Мультиязычный сайт мероприятия с платежами через Stripe и контент-процессом в стиле headless CMS.",
        tags: ["Мультиязычность", "Stripe", "Google Analytics", "Headless CMS", "API"],
      },
      {
        category: "Enterprise",
        title: "Python-автоматизация и потоки данных (NDA)",
        description: "Enterprise-проект на Python под NDA: внутренние инструменты, процессы данных и автоматизированная отчетность.",
        tags: ["Python", "Автоматизация", "API", "Данные", "Отчетность", "NDA"],
      },
    ],
    blogPosts: [
      {
        category: "Разработка",
        title: "От Figma к Next.js: рабочий процесс, который действительно выпускает",
        description: "Как превращать дизайн в production-код без хаоса, задержек и бесконечных доработок.",
      },
      {
        category: "Аналитика",
        title: "GA4 события: что отслеживать на маркетинговом сайте",
        description: "Простая карта событий: просмотры, клики, воронки и покупки — чтобы измерять реально важное.",
      },
      {
        category: "Автоматизация",
        title: "Python-автоматизации, которые экономят часы каждую неделю",
        description: "Отчетность, очистка данных и внутренние инструменты: что работает, что ломается и как удержать стабильность.",
      },
    ],
    faqData: [
      {
        question: "Вы делаете проект полностью или только разработку?",
        answer: "При необходимости — полный цикл: структура, UI по референсам, разработка, интеграции и запуск. Если дизайн уже есть, аккуратно и без лишних задержек реализуем его на Next.js.",
      },
      {
        question: "Можно начать с референсов или черновика без полного дизайна?",
        answer: "Да. Часто стартуем с мудборда, нескольких референсов и базового наброска. Далее формируем структуру, делаем современный UI и доводим до production-уровня.",
      },
      {
        question: "Можете работать с нашим текущим брендом и контентом?",
        answer: "Да. Если контент неструктурирован, поможем собрать понятную карту сайта и разделов. Если бренд минимальный — зададим чистую базу и удержим консистентность.",
      },
      {
        question: "Сайт будет производительным и SEO-оптимизированным?",
        answer: "Да. Производительность и техническое SEO — обязательная часть каждого проекта: Core Web Vitals, корректная разметка, метаданные и чистая индексация.",
      },
      {
        question: "Можно подключить платежи, формы, аналитику или CMS?",
        answer: "Да. Типовые связки: Stripe, трекинг в Google Analytics, формы в email/CRM и headless CMS для обновления контента без кода. Возможны и кастомные API-интеграции.",
      },
      {
        question: "Что нужно от нас для старта?",
        answer: "Цели, объем, примеры, которые вам нравятся, и доступы к домену/инструментам (если уже есть). Если контент не готов — начинаем со структуры и дорабатываем по ходу.",
      },
      {
        question: "Есть ли поддержка после запуска?",
        answer: "Да. После релиза доступна поддержка: обновления, улучшения, мониторинг и новые задачи. Можно работать точечно или по ежемесячному плану.",
      },
    ],
  },
};

const lv: Locale = {
  ui: {
    header: {
      nav: [
        { id: "process", label: "Process" },
        { id: "services", label: "Pakalpojumi" },
        { id: "pricing", label: "Cenas" },
        { id: "work", label: "Darbi" },
        { id: "faq", label: "BUJ" },
      ],
      cta: "Apspriest projektu",
      openMenu: "Atvērt izvēlni",
      closeMenu: "Aizvērt izvēlni",
    },
    hero: {
      lineTop: "Iegūstiet mājaslapu, kas ir",
      highlightOne: "skaidra, ātra,",
      connector: "un",
      highlightTwo: "piesaista klientus",
      subtitle:
        "Mēs veidojam mārketinga mājaslapas, pieslēdzam analītiku, maksājumus, CMS un automatizāciju.",
      location: "Bāzēti Rīgā, Latvijā. Strādājam visā pasaulē.",
    },
    stack: {
      title: "MODERNS TEHNOLOĢIJU STEKS",
      footerLineOne:
        "Next.js, React, TypeScript, SCSS, headless CMS, Stripe, Google Analytics un pielāgotas API integrācijas.",
      footerLineTwo:
        "Python automatizācijām. Webflow un WordPress, ja tas labāk atbilst uzdevumam.",
    },
    howItWorks: {
      category: "KĀ MĒS STRĀDĀJAM",
      title: "Caurspīdīga projekta cena, apjomu saskaņojam iepriekš.",
      description:
        "Zīmols, piesaistes lapa vai mārketinga mājaslapa, CMS, analītika, maksājumi, integrācijas un automatizācija. Viena komanda un skaidrs process līdz publicēšanai. Atbalsts pēc vajadzības.",
      cta: "Skatīt cenas",
      turnaroundTitle: "Termiņi",
      turnaroundRows: [
        { label: "Atbildes laiks", value: "1-2 darba dienas" },
        { label: "Piesaistes lapa", value: "1-3 nedēļas" },
        { label: "Daudzlapu mājaslapa", value: "3-6 nedēļas" },
        { label: "Web lietotne / sarežģīts produkts", value: "6-10+ nedēļas" },
      ],
      toolsTitle: "Rīki un komunikācija",
      toolsRows: [
        { label: "Komunikācija", value: "Jūsu izvēlētais saziņas kanāls" },
        { label: "Zvani", value: "Google Meet / FaceTime" },
        { label: "Projekta uzskaite", value: "Notion / Trello" },
        { label: "Dizains un faili", value: "Figma" },
      ],
    },
    beautifulWorks: {
      title: "Atlasītie darbi",
      description: "Mēs palīdzam biznesam augt ar skaidrām, pārdomātām un profesionālām mājaslapām, kas konvertē.",
    },
    capabilities: {
      category: "mūsu pakalpojumi",
      revealText: "Ko varam izveidot tieši jums...",
      experienceLabel: "8+ GADU PIEREDZE",
      experienceTitle: "Projektējam un piegādājam mārketinga mājaslapas un tīmekļa produktus",
      description:
        "No pirmās idejas līdz palaišanai veidojam konversijām orientētas mājaslapas ar analītiku, SEO pamatiem, integrācijām un maksājumiem. Tīrs pielāgots kods, kad svarīga ir veiktspēja, uzticamība un elastība.",
      cta: "Skatīt cenas",
    },
    testimonial: {
      category: "ATSAUKSMES",
      title: "Ko saka klienti",
      description: "Dažas īsas piezīmes no neseniem projektiem.",
      reviews: [
        {
          name: "TinyTunes Space",
          meta: "Palaišana",
          body: "Precīzi, tīri un pārdomāti. Mājaslapa izskatās premium līmenī, ielādējas momentāni, un visa lietotāja plūsma ir skaidra.",
          img: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "voyagesetmoi",
          meta: "Mājaslapa",
          body: "Pilnīga pārbūve ar labāku struktūru un vizuālo valodu. Mediji optimizēti, atjauninājumi ir vienkārši, viss izskatās daudz modernāk.",
          img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "Georgiy Gudovskiy",
          meta: "Pilns cikls",
          body: "Izveidots no nulles: dizains, izstrāde, foto un video optimizācija, un kvalitatīva gala piegāde.",
          img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Automatizācija",
          body: "Iekšējo atskaišu automatizācija ietaupīja simtiem stundu. Uzticami Python skripti, tīri rezultāti un stabila uzturēšana.",
          img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Analītika",
          body: "Izsekošana beidzot ir skaidra. Notikumi strukturēti, paneļi pārskatāmi, un lēmumi balstīti uz reālu lietotāju uzvedību.",
          img: "https://plus.unsplash.com/premium_photo-1661778906556-82ec2021c533?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Maksājumi",
          body: "Maksājumu plūsma darbojas stabili un paredzami. Stripe integrācija ir uzticama, back-office loģika sakārtota.",
          img: "https://images.unsplash.com/photo-1614890107637-fe96d74acf4b?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Veiktspēja",
          body: "Mājaslapas veiktspēja ievērojami uzlabojās, un Lighthouse rādītāji kļuva labāki. Praktiski uzlabojumi ar reālu ietekmi.",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop",
        },
        {
          name: "NDA Client",
          meta: "Atbalsts",
          body: "Operatīvi labojumi, skaidra komunikācija un atjauninājumi bez regresijām. Ērta sadarbība ilgtermiņā.",
          img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=160&auto=format&fit=crop",
        },
      ],
    },
    pricing: {
      category: "Caurspīdīgas cenas",
      title: "Projekta cena pēc saskaņota apjoma",
      description:
        "Gala piedāvājums ir atkarīgs no apjoma, satura gatavības, integrācijām un termiņa.",
      cardCta: "Apspriest projektu",
      customTitle: "Nepieciešams individuāls risinājums?",
      customDescriptionTop: "Sarežģītākas produktu mājaslapas un iekšējie rīki: no 6+ nedēļām, individuāls piedāvājums.",
      customDescriptionBottom:
        "Python automatizācijas un atskaišu plūsmas pieejamas, ja tas atbilst projekta mērķim.",
      customCta: "Apspriest projektu",
    },
    cases: {
      category: "mūsu darbi",
      title: "Projektu piemēri",
      description: "Reāli projekti, reāli rezultāti",
    },
    blog: {
      category: "ieskati",
      title: "Blogs",
      description: "Padomi, ceļveži un domas par tīmekļa izstrādi",
    },
    faq: {
      title: "BUJ un Kontakti",
      description: "Biežākie jautājumi un tiešs saziņas kanāls",
      leftTitle: "Biežāk uzdotie",
      rightTitle: "Sazinieties ar mums",
      inquiriesLabel: "Projektu jautājumiem",
      quickChatLabel: "Ātra saziņa",
      followLabel: "Sekot",
      replyTime: "Parasti atbildam 24 stundu laikā",
      form: {
        name: "Vārds",
        email: "E-pasts",
        message: "Ziņa",
        attachment: "Pielikums",
        optional: "(nav obligāts)",
        namePlaceholder: "Jūsu vārds",
        emailPlaceholder: "your@email.com",
        messagePlaceholder: "Pastāstiet par savu projektu...",
        dropzonePrefix: "Ievilciet failu vai",
        dropzoneAction: "izvēlieties",
        dropzoneHint: "JPG, PNG, GIF, WebP, PDF, DOC līdz 10MB",
        send: "Nosūtīt ziņu",
        sent: "Ziņa nosūtīta!",
        success: "Paldies! Mēs atbildēsim 1-2 darba dienu laikā.",
        removeFile: "Noņemt failu",
      },
      validation: {
        nameRequired: "Lūdzu, ievadiet vārdu",
        nameShort: "Vārdam jābūt vismaz 2 rakstzīmēm",
        emailRequired: "Lūdzu, ievadiet e-pastu",
        emailInvalid: "Lūdzu, ievadiet korektu e-pastu",
        messageRequired: "Lūdzu, ievadiet ziņu",
        messageShort: "Ziņai jābūt vismaz 10 rakstzīmēm",
        fileType: "Fails nav atbalstīts. Izmantojiet JPG, PNG, GIF, WebP, PDF vai DOC",
        fileSize: "Fails ir pārāk liels. Maksimālais izmērs ir 10MB",
        submitFallback: "Ziņu neizdevās nosūtīt. Lūdzu, mēģiniet vēlreiz.",
      },
    },
    footer: {
      heroTop: "Gatavi izveidot",
      heroBottom: "kaut ko patiešām labu?",
      heroDescription: "Parunāsim par jūsu projektu.",
      heroDescriptionSecondLine: "Piedāvājums 1-2 darba dienu laikā.",
      cta: "Apspriest projektu",
      description:
        "AM Digital Studio — izstrādājam skaidras un konversijām orientētas mājaslapas no Rīgas, Latvijas. Strādājam visā pasaulē.",
      nav: [
        { href: "#process", text: "Process" },
        { href: "#services", text: "Pakalpojumi" },
        { href: "#pricing", text: "Cenas" },
        { href: "#work", text: "Darbi" },
        { href: "#faq", text: "BUJ" },
      ],
      privacy: "Privātuma politika",
      copyright: "© 2025 AM Digital Studio",
    },
    common: {
      contactEmail: "andreymanuilovweb@gmail.com",
    },
  },
  data: {
    techStackNames: [
      "Next.js",
      "React",
      "TypeScript",
      "SCSS",
      "Stripe",
      "Google Analytics",
      "Figma",
      "Vercel",
      "GitHub",
      "Webflow",
    ],
    worksImageAlts: [
      "Projekts 1",
      "Projekts 2",
      "Projekts 3",
      "Projekts 4",
      "Projekts 5",
      "Projekts 6",
      "Projekts 7",
      "Projekts 8",
      "Projekts 9",
      "Projekts 10",
      "Projekts 11",
      "Projekts 12",
    ],
    designData: [
      {
        title: "Definējam mērķus",
        name: "Mērķi",
        caption: "Pastāstiet par projektu, auditoriju un rezultātu. Mēs kopā precizēsim darbu apjomu.",
      },
      {
        title: "Dizains un izstrāde",
        name: "Dizains un izstrāde",
        caption: "Projektējam Figma, izstrādājam ar Next.js un strādājam skaidros posmos.",
      },
      {
        title: "Publicēšana un atbalsts",
        name: "Publicēšana un atbalsts",
        caption: "Droša palaišana ar gatavu analītiku, CMS un integrācijām. Pēcpalaišanas atbalsts — pēc vajadzības.",
      },
    ],
    capabilitiesButtons: [
      "Mājaslapu dizains",
      "UI un UX",
      "Next.js izstrāde",
      "Piesaistes lapas",
      "Veiktspēja",
      "SEO pamati",
      "GA4 analītika",
      "Headless CMS",
      "Stripe maksājumi",
      "API integrācijas",
      "Animācijas",
      "Interaktīvs tīmeklis",
      "Python automatizācija",
      "Atbalsts un atjauninājumi",
    ],
    capabilitiesCards: [
      {
        title: "1. Mājaslapu dizains",
        description: "Mūsdienīgs, tīrs un konversijām orientēts dizains. Interfeisi, kas izskatās pārliecinoši un virza uz darbību.",
      },
      {
        title: "2. UI un UX",
        description: "Skaidra struktūra, pamatota hierarhija un lietotāju plūsmas, kurām ir viegli uzticēties.",
      },
      {
        title: "3. Next.js izstrāde",
        description: "React, TypeScript, SCSS. Stabils un uzturams front-end ar production līmeņa pieeju.",
      },
      {
        title: "4. Piesaistes lapas",
        description: "Precīza struktūra, skaidrs vēstījums un spēcīgi CTA. Lapas, kas pārvērš apmeklētājus pieprasījumos.",
      },
      {
        title: "5. Veiktspēja + SEO pamati",
        description: "Veiktspēja, Core Web Vitals un tehniskā SEO higiēna, lai lapa ielādētos vienmērīgi un korekti indeksētos.",
      },
      {
        title: "6. GA4 analītika",
        description: "Notikumi, piltuves un konversijas. Saprotiet, ko lietotāji dara pirms nospiež “Apspriest projektu”.",
      },
      {
        title: "7. Headless CMS",
        description: "Strukturēts saturs un sakārtota rediģēšanas plūsma. Atjauniniet lapu bez koda izmaiņām.",
      },
      {
        title: "8. Stripe maksājumi",
        description: "Checkout, webhooks un pamatota back-office loģika. Pieņemiet maksājumus droši un stabili.",
      },
      {
        title: "9. Python automatizācija",
        description: "Automatizācijas, iekšējie rīki un datu plūsmas, kas samazina manuālu darbu un kļūdu risku.",
      },
    ],
    pricingCards: [
      {
        title: "Sākuma pakete",
        badge: "Starts 5-7 dienās",
        description: "Kompakta mājaslapa skaidram startam: struktūra, dizaina virziens un korekta palaišana.",
        price: "no €890",
        note: "Termiņš: 5-7 darba dienas",
        featured: false,
        features: [
          "Vienas lapas struktūra (līdz 6-8 blokiem)",
          "Dizaina virziens pēc jūsu atsaucēm",
          "Adaptīva izstrāde ar Next.js + TypeScript",
          "Pamata SEO un GA4 pamata uzstādīšana",
          "Kontakta formas iestatīšana",
          "1 labojumu iterācija saskaņotā apjoma ietvaros",
        ],
      },
      {
        title: "Lendings",
        description: "Piemērots kampaņām un palaišanai. Skaidra struktūra, stabila ielāde un analītika, kas dod skaidrību.",
        price: "no €1,200",
        note: "Termiņš: 1-3 nedēļas",
        featured: false,
        features: [
          "Konversijām orientēta struktūra un tekstu vadlīnijas",
          "Pielāgota dizaina virziens un galvenie komponenti",
          "Izstrāde ar Next.js + TypeScript + SCSS",
          "GA4 notikumi + pamata GTM konfigurācija",
          "Veiktspējas bāzes optimizācija un Core Web Vitals fokuss",
          "Formu un pieteikumu piegādes integrācija",
          "2 labojumu iterācijas saskaņotā apjoma ietvaros",
        ],
      },
      {
        title: "Daudzlapu vietne",
        badge: "Populārākais",
        description: "Daudzlapu risinājums izaugsmei. Dizains, satura process, analītika, integrācijas un stabila palaišana.",
        price: "no €2,500",
        note: "Termiņš: 3-6 nedēļas",
        featured: true,
        features: [
          "Daudzlapu UX struktūra un komponentu sistēma",
          "Pielāgota Next.js izstrāde ar tīru arhitektūru",
          "Satura process ar headless CMS (saskaņotā apjomā)",
          "Analītikas plāns + GA4 notikumu konfigurācija",
          "Performance budget un optimizācijas iterācija",
          "Tehniskā SEO bāze un korekta indeksācija",
          "3 labojumu iterācijas saskaņotā apjoma ietvaros",
        ],
      },
      {
        title: "Ikmēneša atbalsts",
        description: "Nepārtraukti uzlabojumi un uzturēšana. Mierīgs formāts, lai lapa saglabātu stabilitāti un attīstītos.",
        price: "no €100",
        note: "Ieejas atbalsta plāns",
        featured: false,
        features: [
          "Līdz 1 stundai nelielu uzdevumu mēnesī",
          "Satura atjauninājumi un nelielas korekcijas",
          "Pamata kļūdu labošana un uzturēšana",
          "Ceturkšņa veiktspējas un analītikas pārbaude",
          "Atbildes logs rindas kārtībā",
          "Iespēja pāriet uz paplašinātu plānu",
        ],
      },
    ],
    caseStudies: [
      {
        category: "Pasākuma mājaslapa",
        title: "Tiny Tune Space",
        description: "Daudzvalodu pasākuma mājaslapa ar Stripe maksājumiem un satura plūsmu headless CMS stilā.",
        tags: ["Daudzvalodu", "Stripe", "Google Analytics", "Headless CMS", "API"],
      },
      {
        category: "Enterprise",
        title: "Python automatizācija un datu plūsmas (NDA)",
        description: "Enterprise Python projekts zem NDA: iekšējie rīki, datu plūsmas un automatizēta atskaišu sagatavošana.",
        tags: ["Python", "Automatizācija", "API", "Dati", "Atskaites", "NDA"],
      },
    ],
    blogPosts: [
      {
        category: "Izstrāde",
        title: "No Figma līdz Next.js: process, kas tiešām piegādā",
        description: "Kā pārvērst dizainu production kodā bez haosa, kavējumiem un bezgalīgām pārstrādēm.",
      },
      {
        category: "Analītika",
        title: "GA4 notikumi: ko mērīt mārketinga mājaslapā",
        description: "Vienkārša notikumu karte: skatījumi, klikšķi, piltuves un pirkumi, lai mērītu būtisko.",
      },
      {
        category: "Automatizācija",
        title: "Python automatizācijas, kas ietaupa stundas katru nedēļu",
        description: "Atskaites, datu sakārtošana un iekšējie rīki: kas strādā, kas lūzt un kā uzturēt stabilitāti.",
      },
    ],
    faqData: [
      {
        question: "Vai jūs nodrošināt pilnu izstrādes ciklu vai tikai programmēšanu?",
        answer: "Ja nepieciešams, nodrošinām pilnu ciklu: struktūra, UI pēc atsaucēm, izstrāde, integrācijas un palaišana. Ja dizains jau ir gatavs, to kvalitatīvi ieviešam ar Next.js.",
      },
      {
        question: "Vai varam sākt ar atsaucēm vai skici, nevis pilnu dizainu?",
        answer: "Jā. Daudzi projekti sākas ar moodboard, dažām atsaucēm un vienkāršu skici. Mēs pārvēršam to skaidrā struktūrā un mūsdienīgā UI ar production līmeņa piegādi.",
      },
      {
        question: "Vai varat strādāt ar mūsu esošo zīmolu un saturu?",
        answer: "Jā. Ja saturs ir nesakārtots, palīdzam izveidot saprotamu lapas struktūru. Ja zīmols ir minimāls, uzliekam tīru bāzi un nodrošinām konsekvenci.",
      },
      {
        question: "Vai mājaslapa būs veiktspējīga un SEO draudzīga?",
        answer: "Jā. Veiktspēja un tehniskā SEO bāze ir katra projekta daļa: Core Web Vitals, semantiska struktūra, metadati un korekta indeksācija.",
      },
      {
        question: "Vai varat integrēt maksājumus, formas, analītiku vai CMS?",
        answer: "Jā. Biežākie risinājumi: Stripe, Google Analytics notikumi, formas uz e-pastu/CRM un headless CMS vieglai satura pārvaldībai. Pieejamas arī pielāgotas API integrācijas.",
      },
      {
        question: "Kas jums no mums nepieciešams, lai sāktu?",
        answer: "Mērķi, apjoms, jums patīkami piemēri un piekļuve domēnam/rīkiem (ja tie jau ir). Ja saturs nav gatavs, sākam ar struktūru un precizējam tālāk.",
      },
      {
        question: "Vai piedāvājat atbalstu pēc palaišanas?",
        answer: "Jā. Pēc palaišanas pieejams atbalsts: atjauninājumi, uzlabojumi, monitorings un jauni darbi. Var strādāt pēc vajadzības vai ikmēneša režīmā.",
      },
    ],
  },
};

const locales: Record<Language, Locale> = {
  en,
  ru,
  lv,
};

type LocalizedSiteData = {
  designData: typeof rawData.designData;
  techStack: typeof rawData.techStack;
  worksImages: typeof rawData.worksImages;
  capabilitiesButtons: typeof rawData.capabilitiesButtons;
  capabilitiesCards: typeof rawData.capabilitiesCards;
  pricingCards: typeof rawData.pricingCards;
  caseStudies: typeof rawData.caseStudies;
  blogPosts: typeof rawData.blogPosts;
  faqData: typeof rawData.faqData;
};

function buildSiteData(locale: Locale): LocalizedSiteData {
  return {
    designData: rawData.designData.map((item, index) => ({
      ...item,
      ...locale.data.designData[index],
    })),
    techStack: rawData.techStack.map((item, index) => ({
      ...item,
      name: locale.data.techStackNames[index] ?? item.name,
    })),
    worksImages: rawData.worksImages.map((item, index) => ({
      ...item,
      alt: locale.data.worksImageAlts[index] ?? item.alt,
    })),
    capabilitiesButtons: rawData.capabilitiesButtons.map((item, index) => ({
      ...item,
      name: locale.data.capabilitiesButtons[index] ?? item.name,
    })),
    capabilitiesCards: rawData.capabilitiesCards.map((item, index) => ({
      ...item,
      title: locale.data.capabilitiesCards[index]?.title ?? item.title,
      description: locale.data.capabilitiesCards[index]?.description ?? item.description,
    })),
    pricingCards: rawData.pricingCards.map((item, index) => ({
      ...item,
      title: locale.data.pricingCards[index]?.title ?? item.title,
      badge: locale.data.pricingCards[index]?.badge ?? item.badge,
      description: locale.data.pricingCards[index]?.description ?? item.description,
      price: locale.data.pricingCards[index]?.price ?? item.price,
      note: locale.data.pricingCards[index]?.note ?? item.note,
      featured: locale.data.pricingCards[index]?.featured ?? item.featured,
      features: locale.data.pricingCards[index]?.features ?? item.features,
    })),
    caseStudies: rawData.caseStudies.map((item, index) => ({
      ...item,
      category: locale.data.caseStudies[index]?.category ?? item.category,
      title: locale.data.caseStudies[index]?.title ?? item.title,
      description: locale.data.caseStudies[index]?.description ?? item.description,
      tags: locale.data.caseStudies[index]?.tags ?? item.tags,
    })),
    blogPosts: rawData.blogPosts.map((item, index) => ({
      ...item,
      category: locale.data.blogPosts[index]?.category ?? item.category,
      title: locale.data.blogPosts[index]?.title ?? item.title,
      description: locale.data.blogPosts[index]?.description ?? item.description,
    })),
    faqData: rawData.faqData.map((item, index) => ({
      ...item,
      question: locale.data.faqData[index]?.question ?? item.question,
      answer: locale.data.faqData[index]?.answer ?? item.answer,
    })),
  };
}

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Locale["ui"];
  data: LocalizedSiteData;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getBrowserPreferredLanguage(): Language {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const candidates = [navigator.language, ...(navigator.languages ?? [])];

  for (const candidate of candidates) {
    const normalized = candidate.toLowerCase();
    if (normalized.startsWith("ru")) return "ru";
    if (normalized.startsWith("lv")) return "lv";
  }

  return "en";
}

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "ru" || value === "lv";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) {
      setLanguage(stored);
      return;
    }

    setLanguage(getBrowserPreferredLanguage());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextValue>(() => {
    const locale = locales[language];
    return {
      language,
      setLanguage,
      t: locale.ui,
      data: buildSiteData(locale),
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return context;
}
