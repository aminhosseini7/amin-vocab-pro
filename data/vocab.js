const VOCAB = [
  {
    "id": 1,
    "word": "economic",
    "meaning_fa": "اقتصادی",
    "example_en": "Economic growth slowed last year.",
    "usage_fa": "برای موضوعات اقتصادی.",
    "note": "economy → اقتصاد",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 2,
    "word": "financial",
    "meaning_fa": "مالی",
    "example_en": "The company is facing financial problems.",
    "usage_fa": "برای امور پولی و حسابداری.",
    "note": "finance → امور مالی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 3,
    "word": "welfare",
    "meaning_fa": "رفاه",
    "example_en": "The government increased welfare programs.",
    "usage_fa": "برای رفاه اجتماعی و کمک‌های دولتی.",
    "note": "well + fare",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 4,
    "word": "charity",
    "meaning_fa": "خیریه",
    "example_en": "She donated money to a charity.",
    "usage_fa": "برای کمک به نیازمندان.",
    "note": "care → مراقبت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 5,
    "word": "recession",
    "meaning_fa": "رکود",
    "example_en": "Many businesses failed during the recession.",
    "usage_fa": "در اقتصاد برای کاهش فعالیت اقتصادی.",
    "note": "re + cede → عقب‌رفتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 6,
    "word": "currency",
    "meaning_fa": "ارز",
    "example_en": "The local currency is losing value.",
    "usage_fa": "پول رسمی کشور.",
    "note": "current → جریان",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 7,
    "word": "thrifty",
    "meaning_fa": "صرفه‌جو",
    "example_en": "She is very thrifty with her money.",
    "usage_fa": "برای افراد کم‌خرج.",
    "note": "thrift → صرفه‌جویی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 8,
    "word": "frugal",
    "meaning_fa": "کم‌خرج، ساده‌زیست",
    "example_en": "They live a simple and frugal lifestyle.",
    "usage_fa": "برای سبک زندگی ساده.",
    "note": "fruit → طبیعی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 9,
    "word": "miserly",
    "meaning_fa": "خسیس",
    "example_en": "He is too miserly to buy new clothes.",
    "usage_fa": "برای افراد خسیس.",
    "note": "miser → آدم خسیس",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 10,
    "word": "parsimonious",
    "meaning_fa": "بسیار خسیس",
    "example_en": "The company has a parsimonious budget.",
    "usage_fa": "خسیس افراطی.",
    "note": "parsi + money",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 11,
    "word": "extravagant",
    "meaning_fa": "ولخرج",
    "example_en": "She leads an extravagant lifestyle.",
    "usage_fa": "برای خرج زیاد و غیرمنطقی.",
    "note": "extra → زیاد",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 12,
    "word": "lavishness",
    "meaning_fa": "ولخرجی",
    "example_en": "His lavishness shocked everyone.",
    "usage_fa": "برای تجمل زیاد.",
    "note": "lavish → پرخرج",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 13,
    "word": "revenue",
    "meaning_fa": "درآمد",
    "example_en": "The store’s revenue increased by 20%.",
    "usage_fa": "برای درآمد شرکت یا دولت.",
    "note": "venue → محل ورود پول",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 14,
    "word": "expenditure",
    "meaning_fa": "مخارج",
    "example_en": "Government expenditure is rising.",
    "usage_fa": "برای هزینه‌ها و مخارج رسمی.",
    "note": "spend → خرج",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 15,
    "word": "poverty",
    "meaning_fa": "فقر",
    "example_en": "Many families still live in poverty.",
    "usage_fa": "برای موضوعات اجتماعی/اقتصادی.",
    "note": "poor",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 16,
    "word": "indigent",
    "meaning_fa": "نیازمند",
    "example_en": "The charity helps indigent families.",
    "usage_fa": "برای نیاز مالی شدید.",
    "note": "in + dig",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 17,
    "word": "pauper",
    "meaning_fa": "بی‌چیز",
    "example_en": "He lived like a pauper.",
    "usage_fa": "برای فقر بسیار شدید.",
    "note": "pau → ریشه فقر",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 18,
    "word": "destitute",
    "meaning_fa": "بی‌چیز",
    "example_en": "Many destitute people sought shelter.",
    "usage_fa": "برای افراد بدون نیازهای اولیه.",
    "note": "de + stit",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 19,
    "word": "affluent",
    "meaning_fa": "ثروتمند",
    "example_en": "They live in an affluent neighborhood.",
    "usage_fa": "برای مناطق/افراد ثروتمند.",
    "note": "fluent → جاری‌شدن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 20,
    "word": "luxurious",
    "meaning_fa": "مجلل",
    "example_en": "They stayed at a luxurious hotel.",
    "usage_fa": "برای چیزهای لوکس و تجملاتی.",
    "note": "luxury",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 21,
    "word": "opulence",
    "meaning_fa": "ثروت زیاد",
    "example_en": "The palace was filled with opulence.",
    "usage_fa": "برای تجمل و ثروت فراوان.",
    "note": "opal → قیمتی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 22,
    "word": "inflation",
    "meaning_fa": "تورم",
    "example_en": "Inflation has increased the cost of living.",
    "usage_fa": "برای افزایش عمومی قیمت‌ها.",
    "note": "inflate → بادکردن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 23,
    "word": "tax",
    "meaning_fa": "مالیات",
    "example_en": "Everyone must pay taxes.",
    "usage_fa": "پرداخت به دولت.",
    "note": "tack → میخ (چسبیدن پول)",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 24,
    "word": "subsidy",
    "meaning_fa": "یارانه",
    "example_en": "The government gives subsidies to farmers.",
    "usage_fa": "کمک مالی دولت.",
    "note": "sub",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 25,
    "word": "enterprise",
    "meaning_fa": "شرکت",
    "example_en": "The new enterprise created jobs.",
    "usage_fa": "کسب‌وکار رسمی.",
    "note": "enter + prise",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 26,
    "word": "squander",
    "meaning_fa": "تلف کردن",
    "example_en": "He squandered all his savings.",
    "usage_fa": "برای هدر دادن پول/فرصت.",
    "note": "اسکوآندر",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 27,
    "word": "bankrupt",
    "meaning_fa": "ورشکسته",
    "example_en": "The store went bankrupt last year.",
    "usage_fa": "ناتوان در پرداخت بدهی.",
    "note": "bank + rupt",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 28,
    "word": "sanction",
    "meaning_fa": "تحریم",
    "example_en": "The country faced international sanctions.",
    "usage_fa": "معمولاً معنی تحریم دارد.",
    "note": "دو معنی: تحریم/مجوز",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 29,
    "word": "resolve",
    "meaning_fa": "حل کردن",
    "example_en": "They resolved the issue quickly.",
    "usage_fa": "برای حل مشکل یا اختلاف.",
    "note": "re-solve",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 30,
    "word": "settle",
    "meaning_fa": "حل‌وفصل کردن",
    "example_en": "They settled their disagreement.",
    "usage_fa": "هم آشتی، هم ساکن شدن.",
    "note": "settle down",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 31,
    "word": "mediate",
    "meaning_fa": "میانجی‌گری کردن",
    "example_en": "She mediated between the two sides.",
    "usage_fa": "برای حل اختلاف بین دو نفر/گروه.",
    "note": "media → بین",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 32,
    "word": "mediation",
    "meaning_fa": "میانجی‌گری",
    "example_en": "Mediation helped them reach an agreement.",
    "usage_fa": "فرآیند رسمی حل اختلاف.",
    "note": "medi",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 33,
    "word": "mediator",
    "meaning_fa": "میانجی",
    "example_en": "The mediator suggested a compromise.",
    "usage_fa": "فردی که بین دو طرف می‌ایستد.",
    "note": "mediate",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 34,
    "word": "intermediate",
    "meaning_fa": "میانی",
    "example_en": "He has intermediate English skills.",
    "usage_fa": "برای سطح متوسط.",
    "note": "inter + mediate",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 35,
    "word": "intercede",
    "meaning_fa": "شفاعت کردن",
    "example_en": "He interceded on behalf of his friend.",
    "usage_fa": "برای درخواست کمک از طرف کسی.",
    "note": "inter + cede",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 36,
    "word": "intervene",
    "meaning_fa": "مداخله کردن",
    "example_en": "The teacher intervened to stop the fight.",
    "usage_fa": "ورود برای تغییر وضعیت.",
    "note": "inter → بین",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 37,
    "word": "intervention",
    "meaning_fa": "مداخله",
    "example_en": "Government intervention stabilized prices.",
    "usage_fa": "ورود برای تغییر نتیجه.",
    "note": "intervene",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 38,
    "word": "meddle",
    "meaning_fa": "فضولی کردن",
    "example_en": "Don’t meddle in other people’s affairs.",
    "usage_fa": "دخالت بی‌جا.",
    "note": "meddle",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 39,
    "word": "meddlesome",
    "meaning_fa": "فضول",
    "example_en": "A meddlesome neighbor caused problems.",
    "usage_fa": "فردی که مدام دخالت می‌کند.",
    "note": "meddle + some",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 40,
    "word": "interfere",
    "meaning_fa": "دخالت کردن",
    "example_en": "He interfered with the investigation.",
    "usage_fa": "ورود نامناسب در کار دیگران.",
    "note": "inter + fear",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 41,
    "word": "contract",
    "meaning_fa": "قرارداد",
    "example_en": "They signed a two-year contract.",
    "usage_fa": "برای توافق رسمی بین اشخاص یا شرکت‌ها.",
    "note": "con + tract → کشیدن دو طرف به توافق",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 42,
    "word": "convention",
    "meaning_fa": "مجمع، کنوانسیون",
    "example_en": "The convention was attended by 500 experts.",
    "usage_fa": "برای گردهمایی‌های رسمی یا توافق‌های بین‌المللی.",
    "note": "convene → جمع شدن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 43,
    "word": "compromise",
    "meaning_fa": "سازش، مصالحه",
    "example_en": "They reached a compromise after long talks.",
    "usage_fa": "وقتی دو طرف روی بخشی از خواسته‌ها کوتاه می‌آیند.",
    "note": "com + promise → وعده دوطرفه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 44,
    "word": "treaty",
    "meaning_fa": "معاهده",
    "example_en": "The countries signed a peace treaty.",
    "usage_fa": "برای توافق رسمی بین کشورها.",
    "note": "treat → رفتار → توافق",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 45,
    "word": "conduct",
    "meaning_fa": "انجام‌دادن، هدایت‌کردن",
    "example_en": "He conducted an experiment.",
    "usage_fa": "انجام کارهای رسمی/علمی یا هدایت افراد.",
    "note": "con + duct → هدایت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 46,
    "word": "misconduct",
    "meaning_fa": "سوءرفتار",
    "example_en": "He was fired for misconduct.",
    "usage_fa": "رفتار اشتباه در محیط رسمی/کاری.",
    "note": "mis → غلط + conduct → رفتار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 47,
    "word": "conductive",
    "meaning_fa": "رسانا",
    "example_en": "Copper is highly conductive.",
    "usage_fa": "در فیزیک برای مواد رسانای برق/حرارت.",
    "note": "conduct → هدایت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 48,
    "word": "direct",
    "meaning_fa": "مستقیم، هدایت‌کردن",
    "example_en": "She gave me a direct answer.",
    "usage_fa": "برای مسیر مستقیم یا هدایت.",
    "note": "di + rect → راست",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 49,
    "word": "direction",
    "meaning_fa": "جهت",
    "example_en": "He asked for directions to the station.",
    "usage_fa": "برای مسیر و دستورالعمل.",
    "note": "direct → هدایت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 50,
    "word": "lead",
    "meaning_fa": "رهبری کردن",
    "example_en": "She leads a team of ten people.",
    "usage_fa": "برای هدایت و مدیریت.",
    "note": "leader → رهبر",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 51,
    "word": "leading",
    "meaning_fa": "پیشرو، مهم",
    "example_en": "He works for a leading tech company.",
    "usage_fa": "برای شرکت‌ها یا افراد برتر.",
    "note": "lead → جلو بودن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 52,
    "word": "navigate",
    "meaning_fa": "مسیر‌یابی، هدایت کردن",
    "example_en": "He navigated through the forest easily.",
    "usage_fa": "پیدا کردن مسیر یا کار با سیستم‌ها.",
    "note": "nav → حرکت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 53,
    "word": "consistent",
    "meaning_fa": "سازگار، هماهنگ",
    "example_en": "His results were consistent with expectations.",
    "usage_fa": "برای چیزهای پایدار و منظم.",
    "note": "insist → مداومت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 54,
    "word": "consistency",
    "meaning_fa": "انسجام، ثبات",
    "example_en": "The report lacks consistency.",
    "usage_fa": "هماهنگی و یک‌دست بودن محتوا/رفتار.",
    "note": "consistent → پایدار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 55,
    "word": "constant",
    "meaning_fa": "ثابت، دائمی",
    "example_en": "Prices remained constant.",
    "usage_fa": "وقتی چیزی تغییر نمی‌کند.",
    "note": "con + stand → ایستادن ثابت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 56,
    "word": "perpetual",
    "meaning_fa": "دائمی",
    "example_en": "They lived in perpetual fear.",
    "usage_fa": "برای چیزهای تمام‌نشدنی.",
    "note": "per → همیشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 57,
    "word": "continual",
    "meaning_fa": "پیوسته (با وقفه)",
    "example_en": "The machine makes continual noise.",
    "usage_fa": "تکرار پشت‌سرهم اما نه یک‌سره.",
    "note": "continue → ادامه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 58,
    "word": "eternal",
    "meaning_fa": "ابدی",
    "example_en": "They believed in eternal life.",
    "usage_fa": "برای چیزهای بی‌پایان و همیشگی.",
    "note": "eternity → ابدیت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 59,
    "word": "immutable",
    "meaning_fa": "تغییرناپذیر",
    "example_en": "The rules are immutable.",
    "usage_fa": "برای چیزهای ثابت و بدون تغییر.",
    "note": "mutate → تغییر دادن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 60,
    "word": "permanence",
    "meaning_fa": "ماندگاری",
    "example_en": "The permanence of the structure impressed them.",
    "usage_fa": "پایداری و دوام طولانی‌مدت.",
    "note": "permanent → دائمی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 61,
    "word": "steady",
    "meaning_fa": "پایدار، ثابت",
    "example_en": "The economy showed steady growth.",
    "usage_fa": "برای روندهای بدون نوسان.",
    "note": "stable → ثابت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 62,
    "word": "transient",
    "meaning_fa": "گذرا، موقتی",
    "example_en": "The pain was transient.",
    "usage_fa": "چیزهای زودگذر و کوتاه‌مدت.",
    "note": "transit → عبور",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 63,
    "word": "volatile",
    "meaning_fa": "ناپایدار",
    "example_en": "The stock market is very volatile.",
    "usage_fa": "برای بازار/احساسات/مواد ناپایدار.",
    "note": "explode → تغییر ناگهانی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 64,
    "word": "unstable",
    "meaning_fa": "ناپایدار",
    "example_en": "The shelf is unstable and may fall.",
    "usage_fa": "برای چیزی که احتمال سقوط یا تغییر دارد.",
    "note": "stable (برعکس)",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 65,
    "word": "stabilize",
    "meaning_fa": "پایدار کردن",
    "example_en": "The new policy helped stabilize prices.",
    "usage_fa": "در اقتصاد یا سیستم‌ها برای ایجاد ثبات.",
    "note": "stable → ریشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 66,
    "word": "temporary",
    "meaning_fa": "موقتی",
    "example_en": "They hired temporary workers.",
    "usage_fa": "برای شرایط کوتاه‌مدت.",
    "note": "temp → زمان محدود",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 67,
    "word": "provisional",
    "meaning_fa": "موقت، آزمایشی",
    "example_en": "They gave provisional approval.",
    "usage_fa": "تا زمان تصمیم نهایی.",
    "note": "vision → دید اولیه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 68,
    "word": "erratic",
    "meaning_fa": "بی‌ثبات، غیرقابل‌پیش‌بینی",
    "example_en": "His erratic behavior worried them.",
    "usage_fa": "حرکت‌ها/قیمت‌های نامنظم.",
    "note": "error → اشتباه و بی‌قاعده",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 69,
    "word": "fluctuation",
    "meaning_fa": "نوسان",
    "example_en": "Fluctuation in prices caused uncertainty.",
    "usage_fa": "بالا و پایین رفتن مقدار/قیمت.",
    "note": "flux → جریان تغییر",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 70,
    "word": "fluctuate",
    "meaning_fa": "نوسان داشتن",
    "example_en": "Prices fluctuate daily.",
    "usage_fa": "تغییرات مکرر مقدار.",
    "note": "flux → تغییر",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 71,
    "word": "swing",
    "meaning_fa": "نوسان، تاب خوردن",
    "example_en": "The vote could swing either way.",
    "usage_fa": "تغییر ناگهانی نظر/قیمت.",
    "note": "تاب → رفت‌وبرگشت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 72,
    "word": "eventual",
    "meaning_fa": "نهایی",
    "example_en": "The eventual result surprised everyone.",
    "usage_fa": "نتیجه‌ای که آخر کار رخ می‌دهد.",
    "note": "event → اتفاق نهایی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 73,
    "word": "ultimate",
    "meaning_fa": "نهایی، اصلی",
    "example_en": "Our ultimate goal is success.",
    "usage_fa": "هدف اصلی/پایانی.",
    "note": "ultra → فراتر",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 74,
    "word": "overlap",
    "meaning_fa": "هم‌پوشانی",
    "example_en": "Their interests overlap.",
    "usage_fa": "وقتی دو چیز بخش مشترک دارند.",
    "note": "lap → روی هم افتادن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 75,
    "word": "treatment",
    "meaning_fa": "درمان، برخورد",
    "example_en": "He received proper treatment.",
    "usage_fa": "درمان پزشکی یا شیوه برخورد با موضوع.",
    "note": "treat → رفتار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 76,
    "word": "mistreat",
    "meaning_fa": "بدرفتاری کردن",
    "example_en": "The dog was mistreated.",
    "usage_fa": "رفتار بد با فرد/حیوان.",
    "note": "mis + treat → رفتار اشتباه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 77,
    "word": "adjacent",
    "meaning_fa": "مجاور",
    "example_en": "The two rooms are adjacent.",
    "usage_fa": "برای چیزهای نزدیک و کنار هم.",
    "note": "ad + jacere → کنار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 78,
    "word": "contiguous",
    "meaning_fa": "پیوسته، متصل",
    "example_en": "The contiguous area was affected.",
    "usage_fa": "بخش‌هایی که بدون فاصله کنار هم‌اند.",
    "note": "continue → پیوسته",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 79,
    "word": "vicinity",
    "meaning_fa": "اطراف، نزدیکی",
    "example_en": "There are shops in the vicinity.",
    "usage_fa": "برای محدودهٔ نزدیک به مکان.",
    "note": "vicin → نزدیک",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 80,
    "word": "approach",
    "meaning_fa": "نزدیک‌شدن، روش",
    "example_en": "The plane is approaching the airport.",
    "usage_fa": "هم روش انجام کار هم نزدیک‌شدن.",
    "note": "proach → نزدیک شدن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 81,
    "word": "approximate",
    "meaning_fa": "تقریبی",
    "example_en": "The approximate cost is $500.",
    "usage_fa": "برای مقدار تقریبی یا حدودی.",
    "note": "approx → تقریباً",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 82,
    "word": "proximity",
    "meaning_fa": "نزدیکی",
    "example_en": "The school is in close proximity to our house.",
    "usage_fa": "برای فاصلهٔ کم بین دو چیز.",
    "note": "proxi → نزدیک",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 83,
    "word": "assess",
    "meaning_fa": "ارزیابی کردن",
    "example_en": "The doctor assessed the patient’s condition.",
    "usage_fa": "بررسی کیفیت، مقدار یا وضعیت.",
    "note": "as + sess → نشستن کنار برای بررسی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 84,
    "word": "assay",
    "meaning_fa": "آزمایش کردن",
    "example_en": "The lab assayed the samples.",
    "usage_fa": "در شیمی/پزشکی برای آزمایش دقیق.",
    "note": "assay ≈ test",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 85,
    "word": "estimate",
    "meaning_fa": "تخمین‌زدن",
    "example_en": "They estimated the total cost.",
    "usage_fa": "وقتی مقدار دقیق معلوم نیست.",
    "note": "e + stimate → اندازه‌گیری تقریبی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 86,
    "word": "underestimate",
    "meaning_fa": "دست‌کم گرفتن",
    "example_en": "Don’t underestimate her ability.",
    "usage_fa": "کم‌فرض‌کردن ارزش/توان.",
    "note": "under + estimate",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 87,
    "word": "weigh",
    "meaning_fa": "وزن کردن؛ سنجیدن",
    "example_en": "He weighed the package.",
    "usage_fa": "برای وزن‌کردن یا سبک‌سنگین‌کردن تصمیم.",
    "note": "weight → وزن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 88,
    "word": "exaggerate",
    "meaning_fa": "اغراق کردن",
    "example_en": "He exaggerated the story.",
    "usage_fa": "بزرگ‌نمایی بیش از حد.",
    "note": "extra → زیاد",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 89,
    "word": "distribute",
    "meaning_fa": "توزیع کردن",
    "example_en": "They distributed books to students.",
    "usage_fa": "برای پخش‌کردن بین افراد.",
    "note": "dis + tribute → بخش کردن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 90,
    "word": "disperse",
    "meaning_fa": "پراکنده‌کردن",
    "example_en": "The crowd dispersed after the event.",
    "usage_fa": "برای پخش‌شدن یا پراکندن افراد.",
    "note": "spread → پخش",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 91,
    "word": "propagate",
    "meaning_fa": "گسترش دادن",
    "example_en": "The idea quickly propagated online.",
    "usage_fa": "برای انتشار ایده، نور، صدا یا گیاه.",
    "note": "pro → جلو بردن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 92,
    "word": "spread",
    "meaning_fa": "پخش‌شدن",
    "example_en": "The news spread fast.",
    "usage_fa": "برای انتشار اطلاعات/احساسات/بیماری.",
    "note": "bread spread → پخش",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 93,
    "word": "widespread",
    "meaning_fa": "گسترده",
    "example_en": "The problem is widespread.",
    "usage_fa": "برای فراگیری در سطح منطقه/جامعه.",
    "note": "wide → گسترده",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 94,
    "word": "scatter",
    "meaning_fa": "پراکنده‌کردن",
    "example_en": "The wind scattered the leaves.",
    "usage_fa": "پراکندن نامنظم.",
    "note": "cat → پراکندگی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 95,
    "word": "circulate",
    "meaning_fa": "چرخش داشتن",
    "example_en": "Air circulates through the room.",
    "usage_fa": "چرخش هوا، خون یا اطلاعات.",
    "note": "circle → دایره",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 96,
    "word": "emit",
    "meaning_fa": "منتشرکردن",
    "example_en": "The device emits a loud noise.",
    "usage_fa": "برای خروج نور، صدا یا گاز.",
    "note": "e + mit → بیرون فرستادن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 97,
    "word": "export",
    "meaning_fa": "صادرکردن",
    "example_en": "The country exports oil.",
    "usage_fa": "فروش کالا به کشورهای دیگر.",
    "note": "ex + port → از بندر بیرون",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 98,
    "word": "import",
    "meaning_fa": "واردکردن",
    "example_en": "They import goods from China.",
    "usage_fa": "خرید کالا از کشورهای دیگر.",
    "note": "in + port → به بندر داخل",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 99,
    "word": "diffusion",
    "meaning_fa": "انتشار، پراکندگی",
    "example_en": "The diffusion of ideas is fast online.",
    "usage_fa": "در فیزیک، شیمی یا جامعه‌شناسی.",
    "note": "fuse → مخلوط شدن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 100,
    "word": "sparse",
    "meaning_fa": "کم‌پشت، کم‌تراکم",
    "example_en": "Vegetation is sparse in deserts.",
    "usage_fa": "برای توزیع کم و نازک.",
    "note": "spar → کم",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 101,
    "word": "identify",
    "meaning_fa": "شناسایی کردن",
    "example_en": "She identified the problem quickly.",
    "usage_fa": "تشخیص هویت/چیز.",
    "note": "ID → هویت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 102,
    "word": "identical",
    "meaning_fa": "یکسان",
    "example_en": "The two shirts are identical.",
    "usage_fa": "برای چیزهای کاملاً مشابه.",
    "note": "identity → همان",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 103,
    "word": "determine",
    "meaning_fa": "تعیین کردن",
    "example_en": "We need to determine the cause.",
    "usage_fa": "مشخص‌کردن مقدار، علت، نتیجه.",
    "note": "term → حد",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 104,
    "word": "pinpoint",
    "meaning_fa": "کاملاً مشخص‌کردن",
    "example_en": "They pinpointed the exact location.",
    "usage_fa": "برای دقت بسیار بالا.",
    "note": "pin + point → میخ روی نقطه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 105,
    "word": "perceive",
    "meaning_fa": "درک کردن",
    "example_en": "He perceived a change in her tone.",
    "usage_fa": "دریافت ذهنی از چیزها.",
    "note": "perception → ادراک",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 106,
    "word": "perception",
    "meaning_fa": "ادراک",
    "example_en": "Our perception of reality varies.",
    "usage_fa": "برداشت ذهنی هر فرد.",
    "note": "per + ceive → دریافت کامل",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 107,
    "word": "recognize",
    "meaning_fa": "تشخیص دادن",
    "example_en": "I didn’t recognize him at first.",
    "usage_fa": "وقتی چیزی را دوباره می‌شناسیم.",
    "note": "re + cogn → دوباره شناختن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 108,
    "word": "recognition",
    "meaning_fa": "شناخت، تقدیر",
    "example_en": "She received recognition for her work.",
    "usage_fa": "تشخیص/قدردانی.",
    "note": "recognize → ریشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 109,
    "word": "cognitive",
    "meaning_fa": "شناختی",
    "example_en": "Cognitive skills develop in childhood.",
    "usage_fa": "در روان‌شناسی.",
    "note": "cogn → دانستن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 110,
    "word": "distinguish",
    "meaning_fa": "تشخیص‌دادن تفاوت‌ها",
    "example_en": "It’s hard to distinguish truth from lies.",
    "usage_fa": "جداکردن دو چیز مشابه.",
    "note": "dis + tinguish",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 111,
    "word": "detect",
    "meaning_fa": "تشخیص دادن",
    "example_en": "The sensor detected smoke.",
    "usage_fa": "برای کشف چیز پنهان/مخفی.",
    "note": "detector → ابزار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 112,
    "word": "detection",
    "meaning_fa": "تشخیص",
    "example_en": "Good detection prevents problems.",
    "usage_fa": "در پلیس/پزشکی/امنیت.",
    "note": "detect → فعل",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 113,
    "word": "discern",
    "meaning_fa": "تشخیص عمیق",
    "example_en": "He could discern her true feelings.",
    "usage_fa": "درک دقیق/ذهنی.",
    "note": "concern → توجه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 114,
    "word": "specify",
    "meaning_fa": "مشخص‌کردن",
    "example_en": "Please specify the date.",
    "usage_fa": "برای تعیین دقیق.",
    "note": "specific → دقیق",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 115,
    "word": "specification",
    "meaning_fa": "مشخصات",
    "example_en": "The device meets all specifications.",
    "usage_fa": "بخصوص در محصولات فنی.",
    "note": "specify → تعیین",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 116,
    "word": "apprehend",
    "meaning_fa": "دستگیرکردن؛ درک‌کردن",
    "example_en": "The police apprehended the suspect.",
    "usage_fa": "در پلیس و ذهن.",
    "note": "prehend → گرفتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 117,
    "word": "diagnose",
    "meaning_fa": "تشخیص‌دادن بیماری",
    "example_en": "The doctor diagnosed her with flu.",
    "usage_fa": "در پزشکی.",
    "note": "dia + gno → دانستن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 118,
    "word": "prognastic",
    "meaning_fa": "پیش‌آگهی",
    "example_en": "Prognostic factors were positive.",
    "usage_fa": "پیش‌بینی پزشکی.",
    "note": "pro + gnostic",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 119,
    "word": "delineate",
    "meaning_fa": "مشخص‌کردن، ترسیم",
    "example_en": "The report delineates the main issues.",
    "usage_fa": "برای تعیین خطوط/مرزها.",
    "note": "line → خط",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 120,
    "word": "denote",
    "meaning_fa": "نشان‌دادن",
    "example_en": "A red flag denotes danger.",
    "usage_fa": "برای نشانه‌گذاری/معنا دادن.",
    "note": "note → اشاره",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 121,
    "word": "stripulate",
    "meaning_fa": "شرط کردن، قید کردن",
    "example_en": "The contract stipulates strict rules.",
    "usage_fa": "برای تعیین شروط در قراردادها.",
    "note": "stip → نقطه‌گذاری/شرط",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 122,
    "word": "notify",
    "meaning_fa": "اطلاع دادن",
    "example_en": "Please notify me if anything changes.",
    "usage_fa": "اطلاع‌رسانی رسمی در کار/مدرسه/سازمان.",
    "note": "note → خبر",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 123,
    "word": "notice",
    "meaning_fa": "اطلاع؛ توجه کردن",
    "example_en": "I didn’t notice the sign.",
    "usage_fa": "دیدن/توجه‌کردن یا اطلاع رسمی.",
    "note": "notice → توجه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 124,
    "word": "noticeboard",
    "meaning_fa": "تابلو اعلانات",
    "example_en": "The noticeboard was full of messages.",
    "usage_fa": "محل نصب اطلاعیه‌ها در مدرسه/اداره.",
    "note": "notice + board",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 125,
    "word": "persist",
    "meaning_fa": "پافشاری کردن؛ ادامه یافتن",
    "example_en": "The problem persisted for weeks.",
    "usage_fa": "ادامه داشتن یک وضعیت یا رفتار.",
    "note": "per + sist → ایستادن مداوم",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 126,
    "word": "insist",
    "meaning_fa": "اصرار کردن",
    "example_en": "She insisted on coming early.",
    "usage_fa": "پافشاری روی نظر یا عمل.",
    "note": "in + sist → ایستادن روی چیزی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 127,
    "word": "attribute",
    "meaning_fa": "نسبت دادن",
    "example_en": "They attributed the success to hard work.",
    "usage_fa": "نسبت دادن علت به یک عامل.",
    "note": "at + tribute → دادن علت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 128,
    "word": "ascribe",
    "meaning_fa": "نسبت دادن",
    "example_en": "The poem is ascribed to an unknown author.",
    "usage_fa": "استفاده در ادبیات و تاریخ.",
    "note": "scribe → نوشتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 129,
    "word": "bear on",
    "meaning_fa": "مرتبط بودن",
    "example_en": "His ideas bear on the topic.",
    "usage_fa": "نشان‌دهنده ارتباط مستقیم یا غیرمستقیم.",
    "note": "bear → حمل معنا",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 130,
    "word": "feature",
    "meaning_fa": "ویژگی",
    "example_en": "The phone has many new features.",
    "usage_fa": "برای خصوصیات مهم اشیا/نرم‌افزار.",
    "note": "face → ظاهر/ویژگی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 131,
    "word": "trait",
    "meaning_fa": "خصیصه، ویژگی",
    "example_en": "Honesty is an important trait.",
    "usage_fa": "برای ویژگی‌های شخصیتی و ژنتیکی.",
    "note": "track → دنبال ویژگی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 132,
    "word": "characteristic",
    "meaning_fa": "ویژگی بارز",
    "example_en": "Patience is a characteristic of good teachers.",
    "usage_fa": "برای ویژگی‌های ثابت افراد/اشیا.",
    "note": "character → شخصیت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 133,
    "word": "aspect",
    "meaning_fa": "جنبه",
    "example_en": "We discussed all aspects of the plan.",
    "usage_fa": "ابعاد و بخش‌های مختلف یک موضوع.",
    "note": "a + spect → نگاه از زاویه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 134,
    "word": "facet",
    "meaning_fa": "وجه، جنبه",
    "example_en": "Trust is an important facet of relationships.",
    "usage_fa": "برای جنبه‌های مختلف مفاهیم پیچیده.",
    "note": "face → سطح",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 135,
    "word": "badge",
    "meaning_fa": "نشان، علامت",
    "example_en": "He wore a police badge.",
    "usage_fa": "نشان سازمانی یا علامت هویتی.",
    "note": "badge → نماد",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 136,
    "word": "race",
    "meaning_fa": "نژاد؛ مسابقه",
    "example_en": "People of different races live here.",
    "usage_fa": "هم هویت قومی، هم رقابت.",
    "note": "racetrack → مسیر مسابقه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 137,
    "word": "tribe",
    "meaning_fa": "قبیله",
    "example_en": "The tribe moved to a new area.",
    "usage_fa": "برای گروه‌های قومی سنتی.",
    "note": "rib → ریشه خانوادگی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 138,
    "word": "ethnic",
    "meaning_fa": "قومیتی",
    "example_en": "The country has many ethnic groups.",
    "usage_fa": "برای گروه‌های فرهنگی/نژادی.",
    "note": "ethnos → مردم",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 139,
    "word": "found",
    "meaning_fa": "بنیان گذاشتن",
    "example_en": "They founded the company in 1990.",
    "usage_fa": "برای تأسیس سازمان/شهر.",
    "note": "foundation → بنیان",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 140,
    "word": "foundational",
    "meaning_fa": "بنیادی، اساسی",
    "example_en": "Trust is foundational to relationships.",
    "usage_fa": "برای اصول اولیه‌ی ضروری.",
    "note": "foundation → پایه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 141,
    "word": "fundamental",
    "meaning_fa": "اساسی، بنیادی",
    "example_en": "Freedom is a fundamental human right.",
    "usage_fa": "اصول اولیه که همه‌چیز روی آن بنا می‌شود.",
    "note": "fund → پایه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 142,
    "word": "establish",
    "meaning_fa": "تأسیس کردن",
    "example_en": "They established a new school.",
    "usage_fa": "ایجاد سازمان، سیستم، یا ارتباط رسمی.",
    "note": "stable → ثابت کردن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 143,
    "word": "construct",
    "meaning_fa": "ساختن",
    "example_en": "They constructed a bridge.",
    "usage_fa": "ساخت فیزیکی یا مفهومی.",
    "note": "structure → ساختار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 144,
    "word": "erection",
    "meaning_fa": "ساخت و برپایی",
    "example_en": "The erection of the building took years.",
    "usage_fa": "در ساخت‌وساز.",
    "note": "erect → ساختن ایستاده",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 145,
    "word": "ground",
    "meaning_fa": "پایه؛ زمین",
    "example_en": "The theory is grounded in research.",
    "usage_fa": "پایه‌دار کردن، یا زمین.",
    "note": "ground → پایه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 146,
    "word": "set up",
    "meaning_fa": "راه‌اندازی کردن",
    "example_en": "They set up a new system.",
    "usage_fa": "ایجاد پروژه، سیستم یا سازمان.",
    "note": "set + up → آماده‌سازی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 147,
    "word": "pursue",
    "meaning_fa": "دنبال کردن",
    "example_en": "She is pursuing a degree in law.",
    "usage_fa": "تعقیب هدف یا مسیر حرفه‌ای.",
    "note": "pursuit → دنبال‌کردن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 148,
    "word": "track",
    "meaning_fa": "پیگیری کردن",
    "example_en": "The police tracked the suspect.",
    "usage_fa": "دنبال‌کردن مسیر/پیشرفت.",
    "note": "track → مسیر",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 149,
    "word": "trace",
    "meaning_fa": "ردیابی کردن",
    "example_en": "They traced the call.",
    "usage_fa": "پیدا کردن رد و منبع.",
    "note": "trace → رد",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 150,
    "word": "stalk",
    "meaning_fa": "تعقیب پنهانی",
    "example_en": "The tiger stalked its prey.",
    "usage_fa": "تعقیب مخفیانه حیوان/شخص.",
    "note": "walk → آرام دنبال رفتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 151,
    "word": "chase",
    "meaning_fa": "تعقیب کردن",
    "example_en": "The kids chased the dog.",
    "usage_fa": "دنبال‌کردن سریع.",
    "note": "chase → دنبال‌کردن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 152,
    "word": "proportion",
    "meaning_fa": "نسبت",
    "example_en": "A large proportion of the class passed.",
    "usage_fa": "بخش‌هایی از یک کل.",
    "note": "pro + portion",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 153,
    "word": "portion",
    "meaning_fa": "قسمت، سهم",
    "example_en": "He ate a large portion.",
    "usage_fa": "سهم‌بندی یا قسمت غذا/مقدار.",
    "note": "part → بخش",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 154,
    "word": "quota",
    "meaning_fa": "سهمیه",
    "example_en": "The school set a quota for admissions.",
    "usage_fa": "سهم مشخص‌شده از منابع.",
    "note": "quote → مقدار تعیین‌شده",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 155,
    "word": "component",
    "meaning_fa": "جزء، بخش",
    "example_en": "Each component must be checked.",
    "usage_fa": "برای قطعات فنی/سیستمی.",
    "note": "compose → تشکیل",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 156,
    "word": "sector",
    "meaning_fa": "بخش، حوزه",
    "example_en": "The tech sector is growing fast.",
    "usage_fa": "در اقتصاد، کسب‌وکار، جامعه.",
    "note": "sec → بخش",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 157,
    "word": "segment",
    "meaning_fa": "بخش، قسمت",
    "example_en": "The market is divided into segments.",
    "usage_fa": "برای تقسیم‌بندی بخش‌ها.",
    "note": "seg → بریدن/تقسیم",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 158,
    "word": "ratio",
    "meaning_fa": "نسبت",
    "example_en": "The ratio of students to teachers is high.",
    "usage_fa": "در ریاضی/آمار.",
    "note": "rate → نرخ",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 159,
    "word": "entity",
    "meaning_fa": "موجودیت، واحد مستقل",
    "example_en": "The company became a legal entity.",
    "usage_fa": "برای سازمان‌ها/اشخاص حقوقی.",
    "note": "ent → بودن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 160,
    "word": "assign",
    "meaning_fa": "اختصاص‌دادن",
    "example_en": "The teacher assigned homework.",
    "usage_fa": "دادن مسئولیت/وظیفه.",
    "note": "sign → علامت‌گذاری",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 161,
    "word": "devote",
    "meaning_fa": "اختصاص دادن",
    "example_en": "She devoted her life to science.",
    "usage_fa": "برای اختصاص زمان/انرژی/دارایی به چیزی مهم.",
    "note": "vote → انتخاب/اختصاص",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 162,
    "word": "dedicated",
    "meaning_fa": "وقف‌شده، متعهد",
    "example_en": "She is a dedicated worker.",
    "usage_fa": "برای افراد بسیار متعهد یا یک هدف مشخص وقف‌شده.",
    "note": "dedicate → وقف کردن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 163,
    "word": "allocate",
    "meaning_fa": "تخصیص دادن",
    "example_en": "The budget was allocated to education.",
    "usage_fa": "پخش کردن منابع/بودجه بین بخش‌ها.",
    "note": "locate → جای دادن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 164,
    "word": "allot",
    "meaning_fa": "سهم دادن",
    "example_en": "Each speaker was allotted 10 minutes.",
    "usage_fa": "برای تقسیم سهم یا مقدار مشخص.",
    "note": "a lot → مقدار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 165,
    "word": "budget",
    "meaning_fa": "بودجه",
    "example_en": "We need to plan the annual budget.",
    "usage_fa": "در امور مالی، برنامه هزینه‌ها.",
    "note": "badge → نشانهٔ مقدار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 166,
    "word": "designate",
    "meaning_fa": "تعیین کردن، برگزیدن",
    "example_en": "She was designated as the new manager.",
    "usage_fa": "انتخاب رسمی برای یک نقش یا جایگاه.",
    "note": "sign → علامت‌گذاری",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 167,
    "word": "appoint",
    "meaning_fa": "منصوب کردن",
    "example_en": "He was appointed director.",
    "usage_fa": "برای انتخاب رسمی در سازمان/دولت.",
    "note": "point → اشاره به فرد",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 168,
    "word": "nominate",
    "meaning_fa": "نامزد کردن",
    "example_en": "She was nominated for the award.",
    "usage_fa": "در جوایز، انتخابات و انتخاب‌ها.",
    "note": "name → نام‌گذاری",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 169,
    "word": "candidate",
    "meaning_fa": "نامزد، داوطلب",
    "example_en": "There were five candidates for the job.",
    "usage_fa": "فردی که برای موقعیت/جایزه انتخاب می‌شود.",
    "note": "candid → روشن/آشکار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 170,
    "word": "endow",
    "meaning_fa": "اعطا کردن (معمولاً پول/استعداد)",
    "example_en": "The school was endowed by a wealthy donor.",
    "usage_fa": "برای کمک مالی یا اعطای ویژگی/استعداد.",
    "note": "down → از بالا به پایین دادن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 171,
    "word": "endowment",
    "meaning_fa": "وقف، کمک مالی",
    "example_en": "The university received a large endowment.",
    "usage_fa": "کمک مالی بلندمدت به سازمان‌ها.",
    "note": "endow → ریشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 172,
    "word": "incline",
    "meaning_fa": "تمایل داشتن",
    "example_en": "She is inclined to help others.",
    "usage_fa": "برای تمایل ذهنی یا متمایل‌شدن فیزیکی.",
    "note": "incline ↔ decline",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 173,
    "word": "recline",
    "meaning_fa": "لم دادن، تکیه دادن",
    "example_en": "He reclined on the sofa.",
    "usage_fa": "استراحت کردن و تکیه دادن بدن.",
    "note": "re → عقب",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 174,
    "word": "prefer",
    "meaning_fa": "ترجیح دادن",
    "example_en": "I prefer coffee to tea.",
    "usage_fa": "انتخاب بین دو یا چند گزینه.",
    "note": "pre → پیش از انتخاب",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 175,
    "word": "preference",
    "meaning_fa": "ترجیح",
    "example_en": "She has a preference for quiet places.",
    "usage_fa": "برای علایق و انتخاب‌ها.",
    "note": "prefer → ریشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 176,
    "word": "opt",
    "meaning_fa": "انتخاب کردن",
    "example_en": "Many people opt for healthier food.",
    "usage_fa": "انتخاب داوطلبانه بین گزینه‌ها.",
    "note": "option → انتخاب",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 177,
    "word": "favor",
    "meaning_fa": "ترجیح دادن؛ حمایت کردن",
    "example_en": "She favors modern designs.",
    "usage_fa": "هم انتخاب، هم حمایت.",
    "note": "favor → دوست داشتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 178,
    "word": "favorite",
    "meaning_fa": "موردعلاقه",
    "example_en": "Blue is my favorite color.",
    "usage_fa": "برای چیز/فرد محبوب.",
    "note": "favor → ریشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 179,
    "word": "priority",
    "meaning_fa": "اولویت",
    "example_en": "Safety is our top priority.",
    "usage_fa": "چیزهایی که بیشتر اهمیت دارند.",
    "note": "prior → قبل",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 180,
    "word": "inevitable",
    "meaning_fa": "اجتناب‌ناپذیر",
    "example_en": "Change is inevitable.",
    "usage_fa": "چیزی که قابل جلوگیری نیست.",
    "note": "not + avoidable",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 181,
    "word": "evade",
    "meaning_fa": "طفره رفتن، فرار کردن",
    "example_en": "He evaded paying taxes.",
    "usage_fa": "برای فرار از قانون، مسئولیت یا سؤال.",
    "note": "escape → فرار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 182,
    "word": "evasion",
    "meaning_fa": "طفره‌روی، فرار",
    "example_en": "Tax evasion is a serious crime.",
    "usage_fa": "در حقوق و امور مالی.",
    "note": "evade → ریشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 183,
    "word": "avoid",
    "meaning_fa": "اجتناب کردن",
    "example_en": "You should avoid junk food.",
    "usage_fa": "دوری‌کردن از چیزهای بد/خطرناک.",
    "note": "void → خالی کردن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 184,
    "word": "abstain",
    "meaning_fa": "خودداری کردن",
    "example_en": "He abstained from voting.",
    "usage_fa": "خودداری اخلاقی یا ارادی از یک عمل.",
    "note": "abs → دور + tain → نگه داشتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 185,
    "word": "refrain",
    "meaning_fa": "خودداری کردن",
    "example_en": "Please refrain from smoking here.",
    "usage_fa": "جملهٔ رسمی برای منع مودبانه.",
    "note": "re + frain → نگه داشتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 186,
    "word": "withhold",
    "meaning_fa": "دریغ کردن، نگه داشتن",
    "example_en": "He withheld important information.",
    "usage_fa": "ندادن اطلاعات/پول به‌صورت عمدی.",
    "note": "hold → نگه داشتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 187,
    "word": "elude",
    "meaning_fa": "گریختن، دور ماندن",
    "example_en": "The suspect eluded the police.",
    "usage_fa": "فرار از کنترل یا دسترسی.",
    "note": "elusive → سخت‌گیر",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 188,
    "word": "elusive",
    "meaning_fa": "گریزان؛ سخت قابل‌درک",
    "example_en": "The meaning of the poem is elusive.",
    "usage_fa": "مبهم، سخت دسترس.",
    "note": "elude → ریشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 189,
    "word": "pretext",
    "meaning_fa": "بهانه",
    "example_en": "He left under the pretext of illness.",
    "usage_fa": "دلیل ساختگی برای پنهان کردن علت واقعی.",
    "note": "pre + text → متن قبلی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 190,
    "word": "presume",
    "meaning_fa": "فرض کردن",
    "example_en": "I presumed he was at home.",
    "usage_fa": "فرض با احتمال بالا.",
    "note": "pre + assume → پیش‌فرض",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 191,
    "word": "presumably",
    "meaning_fa": "احتمالاً",
    "example_en": "He is presumably on his way.",
    "usage_fa": "حدس با احتمال بالا.",
    "note": "assume → فرض کردن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 192,
    "word": "assume",
    "meaning_fa": "فرض گرفتن",
    "example_en": "Don’t assume everything will be easy.",
    "usage_fa": "باور بدون مدرک.",
    "note": "sum → جمع ذهنی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 193,
    "word": "assumption",
    "meaning_fa": "فرضیه، باور اولیه",
    "example_en": "Their assumption was wrong.",
    "usage_fa": "فرض بدون مدرک کافی.",
    "note": "assume → فعل",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 194,
    "word": "surmise",
    "meaning_fa": "گمان کردن",
    "example_en": "From his tone, I surmised he was upset.",
    "usage_fa": "حدس بر اساس نشانه‌های محدود.",
    "note": "sur → بالا + mise → قرار دادن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 195,
    "word": "suppose",
    "meaning_fa": "فرض کردن",
    "example_en": "I suppose you're right.",
    "usage_fa": "حدس، انتظار یا قبول.",
    "note": "pose → قرار دادن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 196,
    "word": "postulate",
    "meaning_fa": "فرضیه‌سازی",
    "example_en": "Scientists postulated a new theory.",
    "usage_fa": "در علوم برای فرض پایه.",
    "note": "post → بعد + late → ارائه فرض",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 197,
    "word": "premise",
    "meaning_fa": "پیش‌فرض",
    "example_en": "The argument is based on a false premise.",
    "usage_fa": "در منطق و فلسفه استفاده می‌شود.",
    "note": "pre + mise → پیش‌قرار",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 198,
    "word": "alleged",
    "meaning_fa": "ادعایی",
    "example_en": "He is the alleged thief.",
    "usage_fa": "چیزی که هنوز ثابت نشده.",
    "note": "allele → ادعا",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 199,
    "word": "hypothesis",
    "meaning_fa": "فرضیه",
    "example_en": "The hypothesis was tested in the lab.",
    "usage_fa": "حدس قابل آزمایش در علم.",
    "note": "hypo → زیر + thesis → قرار دادن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 200,
    "word": "proposition",
    "meaning_fa": "پیشنهاد/گزاره",
    "example_en": "He made a business proposition.",
    "usage_fa": "هم پیشنهاد رسمی، هم گزاره منطقی.",
    "note": "propose → ریشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 201,
    "word": "proposal",
    "meaning_fa": "پیشنهاد",
    "example_en": "They accepted his proposal.",
    "usage_fa": "پیشنهاد رسمی در کار/روابط/جلسه‌ها.",
    "note": "propose → پیشنهاد دادن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 202,
    "word": "bidding",
    "meaning_fa": "مزایده، پیشنهاد قیمت",
    "example_en": "The bidding started at $100.",
    "usage_fa": "در مزایده‌ها و رقابت‌های قیمت.",
    "note": "bid → پیشنهاد قیمت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 203,
    "word": "schedule",
    "meaning_fa": "برنامه زمانی",
    "example_en": "The meeting is on the schedule.",
    "usage_fa": "برای زمان‌بندی کارها و جلسات.",
    "note": "school schedule → برنامه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 204,
    "word": "plot",
    "meaning_fa": "طرح، نقشه؛ داستان",
    "example_en": "The plot of the movie was exciting.",
    "usage_fa": "برای طرح داستان یا نقشه پنهانی.",
    "note": "plot twist → تغییر ناگهانی داستان",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 205,
    "word": "scheme",
    "meaning_fa": "طرح، برنامه",
    "example_en": "The scheme aims to help students.",
    "usage_fa": "برنامه رسمی دولت/سازمان؛ گاهی معنای منفی.",
    "note": "scheme → طرح",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 206,
    "word": "agenda",
    "meaning_fa": "دستور جلسه",
    "example_en": "What’s on the agenda today?",
    "usage_fa": "فهرست کارهای جلسه.",
    "note": "agent → چیزهایی که انجام می‌شود",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 207,
    "word": "status",
    "meaning_fa": "وضعیت",
    "example_en": "What is your marital status?",
    "usage_fa": "وضعیت اجتماعی، شغلی، قانونی.",
    "note": "state → حالت",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 208,
    "word": "status quo",
    "meaning_fa": "وضعیت موجود",
    "example_en": "They want to maintain the status quo.",
    "usage_fa": "برای شرایط فعلی که تغییر نمی‌کند.",
    "note": "لاتین",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 209,
    "word": "position",
    "meaning_fa": "موقعیت، جایگاه",
    "example_en": "He applied for a new position.",
    "usage_fa": "هم شغل، هم موقعیت مکانی.",
    "note": "pose → قرار گرفتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 210,
    "word": "posture",
    "meaning_fa": "طرز ایستادن، حالت بدن",
    "example_en": "Good posture prevents back pain.",
    "usage_fa": "در پزشکی و زبان بدن.",
    "note": "post → ایستادن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 211,
    "word": "attitude",
    "meaning_fa": "نگرش، طرز فکر",
    "example_en": "His attitude toward work is positive.",
    "usage_fa": "دیدگاه ذهنی افراد.",
    "note": "apt → مناسب بودن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 212,
    "word": "lay",
    "meaning_fa": "گذاشتن، قرار دادن",
    "example_en": "They laid the books on the table.",
    "usage_fa": "قرار دادن چیزی روی سطح.",
    "note": "lay → گذاشتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 213,
    "word": "derive",
    "meaning_fa": "مشتق گرفتن، به‌دست‌آوردن",
    "example_en": "Many English words are derived from Latin.",
    "usage_fa": "در زبان‌شناسی، ریاضی و معناشناسی.",
    "note": "de + rive → ریشه گرفتن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 214,
    "word": "emanate",
    "meaning_fa": "ساطع شدن، بیرون آمدن",
    "example_en": "Light emanated from the lamp.",
    "usage_fa": "نور/صدا از منبع بیرون بیاید.",
    "note": "eman → بیرون آمدن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 215,
    "word": "originate",
    "meaning_fa": "سرچشمه گرفتن",
    "example_en": "The idea originated in Japan.",
    "usage_fa": "آغاز یک سنت، ایده یا محصول.",
    "note": "origin → ریشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 216,
    "word": "origin",
    "meaning_fa": "منشأ، ریشه",
    "example_en": "The origin of the word is Greek.",
    "usage_fa": "ریشه لغات، سنت‌ها، مشکلات، اشیا.",
    "note": "original → اصلی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 217,
    "word": "haphazard",
    "meaning_fa": "بی‌برنامه، اتفاقی",
    "example_en": "The books were arranged in a haphazard way.",
    "usage_fa": "کارهای بدون نظم و برنامه.",
    "note": "hazard → آشفتگی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 218,
    "word": "randomly",
    "meaning_fa": "به‌طور تصادفی",
    "example_en": "The names were chosen randomly.",
    "usage_fa": "انتخاب بدون الگو یا ترتیب.",
    "note": "random → تصادفی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 219,
    "word": "arbitrary",
    "meaning_fa": "دلبخواهی، بی‌قاعده",
    "example_en": "The decision seemed arbitrary.",
    "usage_fa": "بدون دلیل روشن، گاهی ناعادلانه.",
    "note": "arbiter → قضاوت شخصی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 220,
    "word": "dimension",
    "meaning_fa": "بعد، اندازه",
    "example_en": "The room has large dimensions.",
    "usage_fa": "در ریاضی/فیزیک و فضا.",
    "note": "measure → اندازه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 221,
    "word": "breadth",
    "meaning_fa": "پهنا، گستره",
    "example_en": "The breadth of his knowledge is impressive.",
    "usage_fa": "هم پهنای فیزیکی هم وسعت فکری.",
    "note": "broad → پهن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 222,
    "word": "capacity",
    "meaning_fa": "ظرفیت",
    "example_en": "The stadium has a capacity of 50,000.",
    "usage_fa": "توان نگهداری یا توانایی انجام کار.",
    "note": "cap → ظرف",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 223,
    "word": "scope",
    "meaning_fa": "دامنه، گستره",
    "example_en": "The problem is beyond the scope of this study.",
    "usage_fa": "محدوده کاری/علمی/موضوعی.",
    "note": "telescope → فاصله دید",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 224,
    "word": "gamut",
    "meaning_fa": "طیف کامل",
    "example_en": "The store offers a gamut of products.",
    "usage_fa": "طیف گسترده از چیزها.",
    "note": "game → گستره",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 225,
    "word": "volume",
    "meaning_fa": "حجم",
    "example_en": "The volume of water increased.",
    "usage_fa": "در فیزیک، صدا یا جلد کتاب.",
    "note": "vol → چرخیدن/گسترش",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 226,
    "word": "inherent",
    "meaning_fa": "ذاتی",
    "example_en": "Risks are inherent in any business.",
    "usage_fa": "ویژگی‌های غیرقابل جدا شدن.",
    "note": "inherit → ارث‌بری",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 227,
    "word": "intrinsic",
    "meaning_fa": "درونی، ذاتی",
    "example_en": "Creativity is intrinsic to human nature.",
    "usage_fa": "ویژگی‌های جدایی‌ناپذیر.",
    "note": "internal → درونی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 228,
    "word": "innate",
    "meaning_fa": "ذاتی، مادرزادی",
    "example_en": "He has an innate talent for music.",
    "usage_fa": "توانایی یا ویژگی از بدو تولد.",
    "note": "in-born → مادرزادی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 229,
    "word": "inborn",
    "meaning_fa": "مادرزادی",
    "example_en": "Some reflexes are inborn.",
    "usage_fa": "ویژگی‌های طبیعی از تولد.",
    "note": "born → تولد",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 230,
    "word": "lack",
    "meaning_fa": "کمبود، نداشتن",
    "example_en": "They lack experience.",
    "usage_fa": "نبودن مقدار لازم از چیزی.",
    "note": "black → نبود نور",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 231,
    "word": "insufficient",
    "meaning_fa": "ناکافی",
    "example_en": "The evidence is insufficient.",
    "usage_fa": "کمبود مقدار/کیفیت نسبت به نیاز.",
    "note": "in + sufficient → کافی نبودن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 232,
    "word": "deficient",
    "meaning_fa": "ناقض، ناکافی",
    "example_en": "His diet is deficient in vitamins.",
    "usage_fa": "کمبود ماده لازم.",
    "note": "de → کم + ficient → انجام",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 233,
    "word": "deficiency",
    "meaning_fa": "کمبود",
    "example_en": "Iron deficiency causes fatigue.",
    "usage_fa": "در پزشکی/زیست‌شناسی.",
    "note": "deficient → ریشه",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 234,
    "word": "deficit",
    "meaning_fa": "کسری",
    "example_en": "The team has a goal deficit.",
    "usage_fa": "در اقتصاد یا ورزش.",
    "note": "de → کم",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 235,
    "word": "defect",
    "meaning_fa": "نقص، ایراد",
    "example_en": "The product has a minor defect.",
    "usage_fa": "مشکل فنی یا رفتاری.",
    "note": "de + fect → درست عمل نکردن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 236,
    "word": "shortage",
    "meaning_fa": "کمبود",
    "example_en": "There is a shortage of clean water.",
    "usage_fa": "نبود مقدار کافی از چیزی.",
    "note": "short → کم",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 237,
    "word": "famine",
    "meaning_fa": "قحطی",
    "example_en": "The region suffered a severe famine.",
    "usage_fa": "کمبود شدید غذا.",
    "note": "fam → گرسنگی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 238,
    "word": "dearth",
    "meaning_fa": "کمبود شدید",
    "example_en": "There is a dearth of skilled workers.",
    "usage_fa": "رسمی و ادبی؛ کمبود جدی.",
    "note": "earth → خشکی/بی‌حاصلی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 239,
    "word": "starvation",
    "meaning_fa": "گرسنگی شدید",
    "example_en": "Many refugees died from starvation.",
    "usage_fa": "گرسنگی مرگ‌آور.",
    "note": "starve → گرسنگی کشیدن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 240,
    "word": "adequate",
    "meaning_fa": "کافی",
    "example_en": "The food was adequate for everyone.",
    "usage_fa": "کافی اما نه زیاد/عالی.",
    "note": "equate → برابر",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 241,
    "word": "absence",
    "meaning_fa": "غیبت، نبود",
    "example_en": "His absence caused problems.",
    "usage_fa": "نبودن شخص/شیء.",
    "note": "absent → غایب",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 242,
    "word": "fault",
    "meaning_fa": "تقصیر؛ عیب",
    "example_en": "It was my fault.",
    "usage_fa": "خطای انسانی یا ایراد فنی.",
    "note": "faulty → خراب",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 243,
    "word": "flaw",
    "meaning_fa": "نقص، ایراد",
    "example_en": "The plan has a serious flaw.",
    "usage_fa": "اشتباه یا کمبود در سیستم/طرح.",
    "note": "flow → برگرفته از بریدگی",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 244,
    "word": "drawback",
    "meaning_fa": "نقطه‌ضعف",
    "example_en": "The main drawback is the cost.",
    "usage_fa": "بخش منفی یک انتخاب یا طرح.",
    "note": "draw + back → عقب کشیدن",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 245,
    "word": "exceed",
    "meaning_fa": "فراتر رفتن",
    "example_en": "Sales exceeded expectations.",
    "usage_fa": "افزایش بیش از حد/انتظار.",
    "note": "ex → بیرون",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  },
  {
    "id": 246,
    "word": "exceeding",
    "meaning_fa": "بیش‌ازحد، بسیار زیاد",
    "example_en": "He showed exceeding kindness.",
    "usage_fa": "در متون رسمی برای شدت زیاد.",
    "note": "exceed → ریشه فعل",
    "stats": {
      "seen": 0,
      "correct": 0,
      "wrong": 0
    },
    "srs": {
      "interval": 0,
      "ef": 2.5,
      "reps": 0,
      "nextReview": 0
    },
    "hard": false
  }
];