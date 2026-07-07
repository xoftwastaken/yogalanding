import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const A = "./assets/";

const assets = {
  aboutGroup: `${A}about-group.png`,
  aboutCommunity: `${A}about-community.png`,
  aboutIndividual: `${A}about-individual.png`,
  aboutTeachers: `${A}about-teachers.png`,
  teacherAnna: `${A}teacher-anna.png`,
  teacherIlya: `${A}teacher-ilya.png`,
  teacherMarina: `${A}teacher-marina.png`,
  reviewMaria: `${A}review-maria.png`,
  reviewAlexey: `${A}review-alexey.png`,
  reviewEkaterina: `${A}review-ekaterina.png`,
  reviewOlga: `${A}review-olga.png`,
  reviewDmitry: `${A}review-dmitry.png`,
  reviewNatalya: `${A}review-natalya.png`,
  map: `${A}map.png`,
  logoDark: `${A}logo-dark.png`,
  logoLight: `${A}logo-light.png`,
  yandexLogo: `${A}yandex-logo.png`,
  yandexStars: `${A}yandex-stars.png`,
  telegram: `${A}telegram.png`,
  vk: `${A}vk.png`,
};

const navLinks = [
  { label: "О нас", target: "about" },
  { label: "Направления", target: "directions" },
  { label: "Преподаватели", target: "teachers" },
  { label: "Отзывы", target: "reviews" },
];

const aboutCards = [
  {
    title: "ГРУППОВЫЕ ЗАНЯТИЯ В СТУДИИ",
    text: "Опытные наставники помогают расслабиться, выстроить практику и почувствовать уверенность в теле.",
    action: "Подробнее о занятиях",
    image: assets.aboutGroup,
    className: "about-card--tall",
  },
  {
    title: "СООБЩЕСТВО И АТМОСФЕРА",
    text: "После занятия можно остаться на чай, познакомиться с людьми и выбрать события по интересам.",
    action: "Записаться",
    image: assets.aboutCommunity,
    className: "about-card--wide",
  },
  {
    title: "ИНДИВИДУАЛЬНЫЙ ПОДХОД",
    text: "Подберем уровень, темп и направление под ваш запрос: спина, стресс, энергия или мягкий старт.",
    action: "Подобрать практику",
    image: assets.aboutIndividual,
    className: "",
  },
  {
    title: "ЛУЧШИЕ ПРЕПОДАВАТЕЛИ",
    text: "Каждый преподаватель ведет из личной практики, регулярно учится и бережно сопровождает учеников.",
    action: "Познакомиться",
    image: assets.aboutTeachers,
    className: "",
  },
];

const directions = [
  {
    chip: "мягкий старт",
    title: "Хатха йога",
    text: "Классическая практика для мягкого входа в ритм и работу с дыханием.",
    meta: "60 мин / базовый уровень",
  },
  {
    chip: "динамика",
    title: "Дживамукти йога",
    text: "Плавные связки асан, больше движения и внимательности к телу.",
    meta: "75 мин / средняя нагрузка",
  },
  {
    chip: "осознанность",
    title: "Кундалини йога",
    text: "Практика внимания, дыхания и устойчивости без лишней спешки.",
    meta: "60 мин / для всех уровней",
  },
  {
    chip: "сила",
    title: "Виньяса йога",
    text: "Структурная практика для силы, дисциплины и ясного прогресса.",
    meta: "90 мин / регулярная практика",
  },
  {
    chip: "фокус",
    title: "Аштанга йога",
    text: "Последовательность асан для выносливости, баланса и концентрации.",
    meta: "90 мин / уверенный уровень",
  },
  {
    chip: "забота",
    title: "Йога для беременных",
    text: "Мягкие занятия с вниманием к дыханию, опоре и спокойному состоянию.",
    meta: "60 мин / бережная нагрузка",
  },
];

const teachers = [
  {
    name: "Анна Соколова",
    image: assets.teacherAnna,
    bio: "Преподаватель хатха-йоги и мягких восстановительных практик. Анна помогает ученикам выстроить безопасную технику, наладить дыхание и постепенно вернуть телу подвижность без соревнования с собой. Ее занятия подходят новичкам и тем, кто возвращается к практике после перерыва.",
    quote: "«Практика начинается не с идеальной формы, а с честного внимания к себе».",
    hours: "500+ ЧАСОВ ОБУЧЕНИЯ",
    hoursText: "сертификация Yoga Alliance и ежегодные повышения квалификации",
    years: "8 ЛЕТ ПРАКТИКИ",
    yearsText: "ведет группы, индивидуальные занятия и курсы для начинающих",
  },
  {
    name: "Илья Морозов",
    image: assets.teacherIlya,
    bio: "Преподаватель виньяса-йоги и утренних практик. Илья строит занятие как плавный поток: дыхание задает ритм, а движения мягко включают силу, баланс и концентрацию. Подходит тем, кто любит динамику без жесткой нагрузки.",
    quote: "«Сила в практике появляется там, где движение остается внимательным».",
    hours: "350+ ЧАСОВ ОБУЧЕНИЯ",
    hoursText: "виньяса, дыхательные практики и функциональная мобильность",
    years: "6 ЛЕТ ПРАКТИКИ",
    yearsText: "ведет динамичные группы и персональные программы прогресса",
  },
  {
    name: "Марина Волкова",
    image: assets.teacherMarina,
    bio: "Преподаватель йин-йоги, медитации и восстановления. Марина помогает замедлиться, снять накопленное напряжение и бережно работать с гибкостью. Ее занятия выбирают для спокойного возвращения к телу.",
    quote: "«Иногда самый глубокий прогресс начинается с разрешения замедлиться».",
    hours: "420+ ЧАСОВ ОБУЧЕНИЯ",
    hoursText: "йин-йога, медитация и техники глубокого расслабления",
    years: "7 ЛЕТ ПРАКТИКИ",
    yearsText: "проводит вечерние классы, медитации и мягкие практики",
  },
];

const reviews = [
  {
    name: "Мария",
    stars: "★★★★★",
    image: assets.reviewMaria,
    text: "Очень теплая студия. После первого занятия стало понятно, что здесь не торопят и не сравнивают, а помогают услышать тело.",
  },
  {
    name: "Алексей",
    stars: "★★★★★",
    image: assets.reviewAlexey,
    text: "Пришел из-за боли в спине, остался из-за атмосферы. Преподаватель аккуратно поправляет технику и объясняет зачем каждое движение.",
  },
  {
    name: "Екатерина",
    stars: "★★★★★",
    image: assets.reviewEkaterina,
    text: "Нравится, что можно выбрать мягкую или более динамичную практику. Все спокойно, чисто и очень по-человечески.",
  },
  {
    name: "Ольга",
    stars: "★★★★☆",
    image: assets.reviewOlga,
    text: "Удобное расписание и приятная команда. Особенно понравилась виньяса - много движения, но без ощущения гонки.",
  },
  {
    name: "Дмитрий",
    stars: "★★★★★",
    image: assets.reviewDmitry,
    text: "Хожу по утрам перед работой. Практика помогает собраться, а студия стала местом, куда правда хочется возвращаться.",
  },
  {
    name: "Наталья",
    stars: "★★★★★",
    image: assets.reviewNatalya,
    text: "Брала пробное занятие и консультацию. Помогли выбрать направление, все объяснили просто и без давления.",
  },
  {
    name: "Ирина",
    stars: "★★★★★",
    image: assets.reviewMaria,
    text: "Очень понравились вечерние классы. После практики уходит напряжение, а сон становится заметно спокойнее.",
  },
  {
    name: "Павел",
    stars: "★★★★★",
    image: assets.reviewAlexey,
    text: "Студия без пафоса и с сильными преподавателями. На занятиях понятно, куда ставить внимание и как не перегружаться.",
  },
  {
    name: "Светлана",
    stars: "★★★★★",
    image: assets.reviewEkaterina,
    text: "Хожу на мягкую йогу после рабочего дня. Пространство красивое, спокойное, и каждый раз ощущение настоящей перезагрузки.",
  },
  {
    name: "Алина",
    stars: "★★★★★",
    image: assets.reviewOlga,
    text: "Отдельно ценю внимательность к новичкам. Все объясняют бережно, поэтому не страшно прийти без опыта.",
  },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function LogoMark() {
  return (
    <svg className="logo-mark" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 7.5C15 11.6421 11.6421 15 7.5 15H0V7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5Z" fill="#6B8E7F" />
      <path d="M15 22.5C15 18.3579 18.3579 15 22.5 15H30V22.5C30 26.6421 26.6421 30 22.5 30C18.3579 30 15 26.6421 15 22.5Z" fill="#6B8E7F" />
      <path d="M0 22.5C0 26.6421 3.35786 30 7.5 30H15V22.5C15 18.3579 11.6421 15 7.5 15C3.35786 15 0 18.3579 0 22.5Z" fill="#6B8E7F" />
      <path d="M30 7.5C30 3.35786 26.6421 0 22.5 0H15V7.5C15 11.6421 18.3579 15 22.5 15C26.6421 15 30 11.6421 30 7.5Z" fill="#6B8E7F" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 240.1 240.1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="telegram-gradient" gradientUnits="userSpaceOnUse" x1="-838.041" y1="660.581" x2="-838.041" y2="660.3427" gradientTransform="matrix(1000 0 0 -1000 838161 660581)">
          <stop offset="0" stopColor="grey" />
          <stop offset="1" stopColor="grey" />
        </linearGradient>
      </defs>
      <circle fillRule="evenodd" clipRule="evenodd" fill="url(#telegram-gradient)" cx="120.1" cy="120.1" r="120.1" />
      <path fillRule="evenodd" clipRule="evenodd" fill="#FFFFFF" d="M54.3,118.8c35-15.2,58.3-25.3,70-30.2 c33.3-13.9,40.3-16.3,44.8-16.4c1,0,3.2,0.2,4.7,1.4c1.2,1,1.5,2.3,1.7,3.3s0.4,3.1,0.2,4.7c-1.8,19-9.6,65.1-13.6,86.3 c-1.7,9-5,12-8.2,12.3c-7,0.6-12.3-4.6-19-9c-10.6-6.9-16.5-11.2-26.8-18c-11.9-7.8-4.2-12.1,2.6-19.1c1.8-1.8,32.5-29.8,33.1-32.3 c0.1-0.3,0.1-1.5-0.6-2.1c-0.7-0.6-1.7-0.4-2.5-0.2c-1.1,0.2-17.9,11.4-50.6,33.5c-4.8,3.3-9.1,4.9-13,4.8 c-4.3-0.1-12.5-2.4-18.7-4.4c-7.5-2.4-13.5-3.7-13-7.9C45.7,123.3,48.7,121.1,54.3,118.8z" />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 23.04C0 12.1788 0 6.74826 3.37413 3.37413C6.74826 0 12.1788 0 23.04 0H24.96C35.8212 0 41.2517 0 44.6259 3.37413C48 6.74826 48 12.1788 48 23.04V24.96C48 35.8212 48 41.2517 44.6259 44.6259C41.2517 48 35.8212 48 24.96 48H23.04C12.1788 48 6.74826 48 3.37413 44.6259C0 41.2517 0 35.8212 0 24.96V23.04Z" fill="grey" />
      <path d="M25.54 34.5801C14.6 34.5801 8.3601 27.0801 8.1001 14.6001H13.5801C13.7601 23.7601 17.8 27.6401 21 28.4401V14.6001H26.1602V22.5001C29.3202 22.1601 32.6398 18.5601 33.7598 14.6001H38.9199C38.0599 19.4801 34.4599 23.0801 31.8999 24.5601C34.4599 25.7601 38.5601 28.9001 40.1201 34.5801H34.4399C33.2199 30.7801 30.1802 27.8401 26.1602 27.4401V34.5801H25.54Z" fill="white" />
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo ${light ? "logo--light" : ""}`} aria-label="YogaFlow">
      <LogoMark />
      <span>YogaFlow</span>
    </span>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (target: string) => {
    setMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <header className={`site-header ${menuOpen ? "is-open" : ""}`}>
      <button className="brand-button" type="button" onClick={() => scrollToSection("hero")} aria-label="К началу страницы">
        <Logo />
      </button>
      <nav className="desktop-nav" aria-label="Основная навигация">
        {navLinks.map((item) => (
          <button key={item.target} type="button" onClick={() => handleNav(item.target)}>
            {item.label}
          </button>
        ))}
      </nav>
      <a className="header-phone" href="tel:+79993145171">
        +7 (999) 314-51-71
      </a>
      <button
        className="burger"
        type="button"
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className="burger-panel" aria-hidden={!menuOpen}>
        {[...navLinks, { label: "Контакты", target: "location" }, { label: "Записаться", target: "lead" }].map((item) => (
          <button key={item.target} type="button" onClick={() => handleNav(item.target)}>
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-shell">
        <div className="hero-bg" />
        <div className="hero-copy" data-reveal>
          <h1>YOGAFLOW</h1>
          <p>
            Студия йоги в Москве, где практика становится привычкой заботы о себе: сильные преподаватели, теплое
            сообщество и занятия для любого уровня.
          </p>
          <button className="btn btn-primary" type="button" onClick={() => scrollToSection("lead")}>
            Начать практику
          </button>
        </div>
        <div className="trust-bar" data-reveal>
          <div>
            <strong>12 направлений</strong>
            <span>от мягкой хатхи до динамичной виньясы</span>
          </div>
          <div>
            <strong>Пробное занятие</strong>
            <span>поможем выбрать практику без давления</span>
          </div>
          <div>
            <strong>Центр Москвы</strong>
            <span>уютная студия у метро Кантемировская</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section-intro" data-reveal>
          <h2>БОЛЬШЕ, ЧЕМ ПРОСТО ЙОГА</h2>
          <p>
            YogaFlow - это камерное пространство для практики, общения и восстановления. Здесь йога не выглядит как
            спорт на результат: мы бережно знакомим с телом, дыханием и людьми, с которыми хочется двигаться в одном
            ритме.
          </p>
        </div>
        <div className="about-grid">
          {aboutCards.map((card) => (
            <article className={`about-card ${card.className}`} key={card.title} data-reveal>
              <img src={card.image} alt={card.title.toLowerCase()} />
              <div className="about-overlay">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <button type="button" onClick={() => scrollToSection(card.action === "Познакомиться" ? "teachers" : "lead")}>
                  {card.action} <span aria-hidden>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Directions() {
  return (
    <section className="section directions" id="directions">
      <div className="container">
        <div className="section-title-row" data-reveal>
          <h2>ПОМОЖЕМ С ВЫБОРОМ НАПРАВЛЕНИЯ</h2>
        </div>
        <div className="directions-grid">
          {directions.map((direction, index) => (
            <article className="direction-card" key={direction.title} data-reveal>
              <div className="direction-body">
                <span className="chip">{direction.chip}</span>
                <p>{direction.text}</p>
                <span className="accent-line" />
                <strong>{direction.meta}</strong>
              </div>
              <h3>{direction.title}</h3>
            </article>
          ))}
        </div>
        <div className="center-cta" data-reveal>
          <button className="btn btn-primary" type="button" onClick={() => scrollToSection("lead")}>
            Получить консультацию
          </button>
        </div>
      </div>
    </section>
  );
}

function Teachers() {
  const [active, setActive] = useState(0);
  const teacher = teachers[active];
  const previous = teachers[(active + teachers.length - 1) % teachers.length];
  const next = teachers[(active + 1) % teachers.length];

  const showPrevious = () => setActive((value) => (value + teachers.length - 1) % teachers.length);
  const showNext = () => setActive((value) => (value + 1) % teachers.length);

  return (
    <section className="section teachers" id="teachers">
      <div className="container">
        <div className="section-title-row" data-reveal>
          <h2>НАШИ ПРЕПОДАВАТЕЛИ</h2>
        </div>
        <div className="teacher-layout">
          <div className="teacher-photos" data-reveal>
            <img className="teacher-photo teacher-photo--prev" key={`prev-${previous.name}`} src={previous.image} alt="" />
            <img className="teacher-photo teacher-photo--next" key={`next-${next.name}`} src={next.image} alt="" />
            <img className="teacher-photo teacher-photo--active" key={`active-${teacher.name}`} src={teacher.image} alt={teacher.name} />
            <button className="round-control round-control--prev" type="button" onClick={showPrevious} aria-label="Предыдущий преподаватель">
              ←
            </button>
            <button className="round-control round-control--next" type="button" onClick={showNext} aria-label="Следующий преподаватель">
              →
            </button>
          </div>
          <div className="teacher-content" key={teacher.name} data-reveal>
            <h3>{teacher.name}</h3>
            <p>{teacher.bio}</p>
            <blockquote>{teacher.quote}</blockquote>
            <div className="credential-grid">
              <article className="credential-card credential-card--primary">
                <span />
                <h4>{teacher.hours}</h4>
                <p>{teacher.hoursText}</p>
              </article>
              <article className="credential-card">
                <span />
                <h4>{teacher.years}</h4>
                <p>{teacher.yearsText}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function YandexReviewsLogo() {
  return (
    <svg className="yandex-reviews-logo" xmlns="http://www.w3.org/2000/svg" width="123" height="32" fill="none" aria-label="Яндекс Отзывы" viewBox="0 0 123 32" role="img">
      <path fill="#FA3E2C" d="M16 32.001c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16c0 8.836 7.163 16 16 16Z" />
      <path fill="#fff" d="M18.277 9.142H16.75c-2.618 0-3.927 1.35-3.927 3.373 0 2.25.873 3.374 2.836 4.723l1.528 1.125-4.364 6.972H9.332l4.145-6.298c-2.4-1.799-3.709-3.373-3.709-6.297 0-3.598 2.4-6.072 6.982-6.072h4.582v18.667h-3.055V9.142Z" />
      <path
        fill="currentColor"
        d="M47.13 25.336c3.967 0 7.156-3.054 7.156-9.4s-3.189-9.27-7.157-9.27c-3.996 0-7.129 3.054-7.129 9.4 0 6.318 3.133 9.27 7.13 9.27Zm0-2.458c-2.272 0-3.917-2.06-3.917-6.863 0-4.83 1.645-6.896 3.916-6.896 2.27 0 3.945 2.065 3.945 6.896 0 4.802-1.674 6.863-3.945 6.863Zm18.878-8.486V11.94H55.592v2.452h3.655v10.683h3.106V14.392h3.655Zm5.04 8.486c-1.594 0-3.16-.573-3.995-1.198v2.532c.601.494 2.117 1.124 4.36 1.124 3.314 0 5.068-1.488 5.068-4.127 0-1.539-.97-2.583-2.69-2.951 1.617-.523 2.298-1.67 2.298-3.134 0-2.22-1.753-3.446-4.57-3.446-2.037 0-3.37.625-4.126 1.096v2.532c.835-.545 1.982-1.175 3.679-1.175 1.152 0 1.884.55 1.884 1.515 0 1.045-.63 1.595-1.907 1.595H69.22v2.299h1.828c1.59 0 2.219.466 2.219 1.641 0 1.045-.76 1.697-2.22 1.697ZM78.57 11.94v13.135h4.724c3.054 0 5.222-1.567 5.222-4.65 0-2.923-1.93-4.466-5.171-4.466h-1.67v-4.02H78.57Zm11.097 0v13.135h3.106V11.94h-3.106Zm-6.555 10.677h-1.436v-4.2h1.515c1.329 0 2.112.6 2.112 2.111 0 1.516-.858 2.09-2.191 2.09Zm17.704 2.457c3.082 0 4.91-1.305 4.91-3.814 0-1.72-1.045-2.713-2.798-3.026 1.413-.391 2.299-1.385 2.299-2.951 0-2.248-1.488-3.343-4.36-3.343h-5.483v13.135h5.432Zm-.312-10.836c1.119 0 1.748.495 1.748 1.516 0 .914-.681 1.46-1.856 1.46h-1.981v-2.976h2.089Zm.051 5.246c1.329 0 2.037.47 2.037 1.567 0 1.23-.783 1.725-2.037 1.725h-2.14v-3.292h2.14Zm7.26-7.544v13.135h4.723c3.054 0 5.222-1.567 5.222-4.65 0-2.923-1.93-4.466-5.171-4.466h-1.669v-4.02h-3.105Zm11.097 0v13.135h3.105V11.94h-3.105Zm-6.556 10.677h-1.436v-4.2h1.515c1.329 0 2.112.6 2.112 2.111 0 1.516-.858 2.09-2.191 2.09Z"
      />
    </svg>
  );
}

function Reviews() {
  const [page, setPage] = useState(0);
  const [isTabletReviews, setIsTabletReviews] = useState(false);
  const pageSize = 2;
  const maxPage = Math.ceil((reviews.length - 4) / pageSize);
  const shift = page * 694;

  const visibleReviews = useMemo(() => reviews.slice(page * pageSize, page * pageSize + 6), [page]);
  const mobileVisibleCount = isTabletReviews ? 4 : 3;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 641px) and (max-width: 1190px)");
    const sync = () => setIsTabletReviews(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <section className="section reviews" id="reviews">
      <div className="container reviews-header" data-reveal>
        <h2>ОТЗЫВЫ КЛИЕНТОВ</h2>
        <div className="reviews-meta-row">
          <div className="rating">
            <YandexReviewsLogo />
            <strong>4.9</strong>
            <span className="rating-stars">
              <b aria-label="5 звезд">★★★★★</b>
              <small>21 отзыв · 36 оценок на Яндекс Картах</small>
            </span>
          </div>
          <a className="btn btn-secondary" href="https://yandex.ru/maps/?text=YogaFlow" target="_blank" rel="noreferrer">
            Читать больше отзывов <span aria-hidden>→</span>
          </a>
        </div>
      </div>
      <div className="reviews-carousel" data-reveal>
        <div className="reviews-track" style={{ transform: `translateX(-${shift}px)` }}>
          {reviews.map((review, index) => (
            <article className={`review-card ${index % 2 ? "review-card--tint" : ""}`} key={`${review.name}-${index}`}>
              <div className="review-header">
                <img src={review.image} alt="" />
                <div>
                  <h3>{review.name}</h3>
                  <p>{review.stars}</p>
                </div>
              </div>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
        <button
          className="round-control reviews-next"
          type="button"
          onClick={() => setPage((value) => (value >= maxPage ? 0 : value + 1))}
          aria-label="Следующие отзывы"
        >
          →
        </button>
      </div>
      <div className="reviews-mobile-list">
        {visibleReviews.slice(0, mobileVisibleCount).map((review, index) => (
          <article className={`review-card ${index % 2 ? "review-card--tint" : ""}`} key={`${review.name}-mobile-${index}`}>
            <div className="review-header">
              <img src={review.image} alt="" />
              <div>
                <h3>{review.name}</h3>
                <p>{review.stars}</p>
              </div>
            </div>
            <p>{review.text}</p>
          </article>
        ))}
        <button
          className="round-control mobile-reviews-next"
          type="button"
          onClick={() => setPage((value) => (value >= maxPage ? 0 : value + 1))}
          aria-label="Следующие отзывы"
        >
          →
        </button>
        <a className="btn btn-secondary mobile-reviews-link" href="https://yandex.ru/maps/?text=YogaFlow" target="_blank" rel="noreferrer">
          Читать больше отзывов <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="section location" id="location">
      <div className="container">
        <h2 data-reveal>КАК НАС НАЙТИ В МОСКВЕ</h2>
        <div className="map-card" data-reveal>
          <iframe
            src="https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=37.657178%2C55.636887&mode=whatshere&whatshere%5Bpoint%5D=37.656553%2C55.636870&whatshere%5Bzoom%5D=17&z=18.39"
            title="Карта: YogaFlow Кантемировская, Москва, Пролетарский проспект, 23"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="location-details" data-reveal>
          <div>
            <strong>YogaFlow Кантемировская</strong>
            <span>Москва, Пролетарский проспект, 23</span>
          </div>
          <strong>Ежедневно с 9:00 до 21:00</strong>
        </div>
      </div>
    </section>
  );
}

function formatRussianPhone(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = digits.slice(1);
  } else if (digits.startsWith("7")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);

  const area = digits.slice(0, 3);
  const first = digits.slice(3, 6);
  const second = digits.slice(6, 8);
  const third = digits.slice(8, 10);

  let formatted = "+7";
  if (area) formatted += ` (${area}`;
  if (area.length === 3) formatted += ")";
  if (first) formatted += ` ${first}`;
  if (second) formatted += `-${second}`;
  if (third) formatted += `-${third}`;

  return formatted;
}

function LeadForm() {
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [errors, setErrors] = useState({ name: "", phone: "" });

  const validateForm = () => {
    const trimmedName = name.trim();
    const phoneDigits = phone.replace(/\D/g, "");
    const nextErrors = {
      name: /^[A-Za-zА-Яа-яЁё -]{2,}$/.test(trimmedName) ? "" : "Введите имя: минимум 2 буквы, без цифр и символов.",
      phone: phoneDigits.length === 11 && phoneDigits.startsWith("7") ? "" : "Введите полный номер в формате +7 (999) 000-00-00.",
    };

    setErrors(nextErrors);
    return !nextErrors.name && !nextErrors.phone;
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (errors.name) {
      setErrors((current) => ({ ...current, name: "" }));
    }
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatRussianPhone(event.target.value));
    if (errors.phone) {
      setErrors((current) => ({ ...current, phone: "" }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    if (!validateForm()) {
      return;
    }

    setStatus("Спасибо! Мы свяжемся с вами в ближайшее время.");
  };

  return (
    <section className="section lead" id="lead">
      <div className="lead-panel" data-reveal>
        <Logo />
        <h2>Первое занятие — бесплатно</h2>
        <p>Оставьте контакты — менеджер уточнит ваш опыт, цель практики и предложит подходящее занятие.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <label>
              <span className="sr-only">Ваше имя</span>
              <input
                name="name"
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={handleNameChange}
                onBlur={validateForm}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                autoComplete="name"
                required
              />
              {errors.name ? (
                <span className="field-error" id="name-error">
                  {errors.name}
                </span>
              ) : null}
            </label>
            <label>
              <span className="sr-only">Ваш телефон</span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="+7 (999) 000-00-00"
                value={phone}
                onChange={handlePhoneChange}
                onFocus={() => {
                  if (!phone) setPhone("+7");
                }}
                onBlur={validateForm}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                autoComplete="tel"
                required
              />
              {errors.phone ? (
                <span className="field-error" id="phone-error">
                  {errors.phone}
                </span>
              ) : null}
            </label>
          </div>
          <label className="consent">
            <input type="checkbox" defaultChecked required />
            <span>Я принимаю условиями политики конфиденциальности и публичной оферты</span>
          </label>
          <button className="btn btn-primary" type="submit">
            Отправить <span aria-hidden>✓</span>
          </button>
          <p className="form-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand-column">
          <button className="footer-brand" type="button" onClick={() => scrollToSection("hero")}>
            <Logo light />
          </button>
        </div>
        <nav aria-label="Навигация в футере">
          {navLinks.slice(0, 3).map((item) => (
            <button key={item.target} type="button" onClick={() => scrollToSection(item.target)}>
              {item.label}
            </button>
          ))}
          <button type="button" onClick={() => scrollToSection("location")}>
            Контакты
          </button>
        </nav>
        <div className="footer-address">
          <strong>YogaFlow Кантемировская</strong>
          <span>Москва, Пролетарский проспект, 23</span>
          <span>Ежедневно с 9:00 до 21:00</span>
        </div>
        <div className="footer-contact">
          <div className="socials">
            <a href="https://t.me/yogaflow" target="_blank" rel="noreferrer" aria-label="YogaFlow в Telegram">
              <TelegramIcon />
            </a>
            <a href="https://vk.com/yogaflow" target="_blank" rel="noreferrer" aria-label="YogaFlow во ВКонтакте">
              <VkIcon />
            </a>
          </div>
          <a href="tel:+79993145171">+7 (999) 314-51-71</a>
          <a href="mailto:example@mail.ru">example@mail.ru</a>
        </div>
        <div className="footer-legal">
          <span className="footer-copy">© 2024-2026 YogaFlow</span>
          <a href="https://example.com/privacy-policy" target="_blank" rel="noreferrer">
            Политика обработки персональных данных
          </a>
          <a href="https://example.com/public-offer" target="_blank" rel="noreferrer">
            Публичная оферта
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".hero-bg", { scale: 1.045 }, { scale: 1, duration: 2.4, ease: "power3.out" });

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Directions />
        <Teachers />
        <Reviews />
        <Location />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
