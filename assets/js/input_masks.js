// var cleave = new Cleave('.nueral-input', {
//     numeral: true,
//     numeralThousandsGroupStyle: 'thousand'
// });

// // **------ 1 Date Input**
// new Cleave('.cleave-input-date', {
//     date: true,
//     delimter: '/',
//     datePattern: ['d', 'm', 'Y']
// });
// new Cleave('.month-input', {
//     date: true,
//     datePattern: ['d', 'm']
// });
// new Cleave('.formatting-input', {
//     date: true,
//     delimiter: '-',
//     datePattern: ['Y', 'm', 'd']
// });
// new Cleave('.formatting-delimter', {
//     date: true,
//     delimiter: '.',
//     datePattern: ['d', 'm', 'Y']
// });

// // **------ 2 Time Input**

// new Cleave('.time-input', {
//     time: true,
//     timePattern: ['h', 'm', 's']
// });
// new Cleave('.min-sec-input', {
//     time: true,
//     timePattern: ['h', 'm']
// });
// new Cleave('.hours-min-input', {
//     time: true,
//     timePattern: ['h', 'm']
// });

// //  **------ 3 Custom Input**
// new Cleave('.contact-input', {
//     numeral: true,
//     delimiter: '-',
//     blocks: [3, 3, 4],
// });
// new Cleave('.formatting-contact', {
//     delimiters: ['(', ')', '(', ')', '(', ')'],
//     blocks: [0, 3, 0, 3, 0, 4, 0],
//     uppercase: true
// });
// new Cleave('.credit-input', {
//     creditCard: true,
// });

// new Cleave('.price-input', {
//     numeral: true,
//     prefix: '$',
//     signBeforePrefix: true
// });
// new Cleave('.price-formatting', {
//     numeral: true,
//     prefix: '€',
//     tailPrefix: true
// });
// new Cleave('.prefix-input', {
//     blocks: [6, 3, 3, 3],
//     prefix: '253874'
// });
new Cleave(".highSchool-gpa-input", {
  numericOnly: true,
  delimiters: ["."],
  blocks: [1, 1],
});
new Cleave(".IB-input", {
  numeral: true, // 启用数字模式，支持千位分隔（但这里不会触发）
  numeralThousandsGroupStyle: "none", // 不加千位逗号
  numeralDecimalScale: 0, // 不允许小数（强制整数）
  numeralIntegerScale: 2, // 最多允许 2 位整数（即 10–99）
  blocks: [2], // 只允许最多 2 位数字
  numericOnly: true, // 只允许数字
});
document.querySelector(".IB-input").addEventListener("blur", function () {
  let value = this.value.trim();

  // 如果为空，直接返回（允许空值）
  if (value === "") {
    return;
  }

  let num = parseInt(value, 10);

  // 如果不是有效数字（比如只剩非数字字符），重置为空或25
  if (isNaN(num)) {
    this.value = "";
    return;
  }

  // 范围修正：小于25 → 25，大于45 → 45
  if (num < 25) {
    this.value = "25";
  } else if (num > 45) {
    this.value = "45";
  }
  // 否则保持原值（25-45 之间正常）
});

new Cleave(".AP-input", {
  numeral: true, // 启用数字模式
  numeralThousandsGroupStyle: "none", // 不加千位分隔符
  numeralDecimalScale: 0, // 禁止小数（强制整数）
  numeralIntegerScale: 2, // 限制整数部分最多 2 位（即 0-99）
  blocks: [2], // 只允许输入 1 位
  numericOnly: true, // 只允许数字（自动过滤其他字符）
});

// 雅思 Overall：0-9，支持 .5
new Cleave(".IELTS-overall-input", {
   numericOnly: true,
  delimiters: ["."],
  blocks: [1, 1],
});

// 雅思单项
new Cleave(".IELTS-section-input", {
  numericOnly: true,
  delimiters: ["."],
  blocks: [1, 1],
});

// 托福总分：0-120
new Cleave(".TOEFL-total-input", {
  numeral: true,
  numeralIntegerScale: 3,
  numeralDecimalScale: 0,
});

// 托福单项：0-30
new Cleave(".TOEFL-section-input", {
  numeral: true,
  numeralIntegerScale: 2,
  numeralDecimalScale: 0,
});

// 多邻国：10-160
new Cleave(".DUOLINGO-input", {
  numeral: true,
  numeralIntegerScale: 3,
  numeralDecimalScale: 0,
});


// 所有四个输入框统一限制：大于0的整数（至少1），最多合理位数（如999）
new Cleave('.ACTIVITY-input, .RESEARCH-input, .AWARD-input, .INTERNSHIP-input', {
    numeral: true,
    numeralThousandsGroupStyle: 'none',
    numeralDecimalScale: 0,         // 不允许小数
    numeralPositiveOnly: true,      // 不允许负号
    numeralIntegerScale: 3          // 最多3位（1-999），根据需要可调整
});

// 额外：失去焦点时强制 ≥1
document.querySelectorAll('.ACTIVITY-input, .RESEARCH-input, .AWARD-input, .INTERNSHIP-input').forEach(function(input) {
  input.addEventListener('blur', function() {
    let value = this.value.trim();
    if (value === '') return;

    let num = parseInt(value, 10);
    if (isNaN(num) || num < 1) {
      this.value = '1';  // 最小强制为1
    }
  });
});