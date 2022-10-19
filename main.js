let period = 'weekly';

const category = [
  'work', 'play', 'study', 'exercise', 'social', 'self_care'
];

const person = {
  name: 'Jeremy Robson',
  img: './images/image-jeremy.png',
  work: {
    name: 'Work',
    daily: {
      value: 3,
      previous: 7,
    },
    weekly: {
      value: 32,
      previous: 36,
    },
    monthly: {
      value: 103,
      previous: 128,
    },
  },
  play: {
    name: 'Play',
    daily: {
      value: 1,
      previous: 2,
    },
    weekly: {
      value: 10,
      previous: 8,
    },
    monthly: {
      value: 23,
      previous: 29,
    },
  },
  study: {
    name: 'Study',
    daily: {
      value: 0,
      previous: 1,
    },
    weekly: {
      value: 4,
      previous: 7,
    },
    monthly: {
      value: 13,
      previous: 19,
    },
  },
  exercise: {
    name: 'Exercise',
    daily: {
      value: 1,
      previous: 1,
    },
    weekly: {
      value: 4,
      previous: 5,
    },
    monthly: {
      value: 11,
      previous: 18,
    },
  },
  social: {
    name: 'Social',
    daily: {
      value: 1,
      previous: 3,
    },
    weekly: {
      value: 5,
      previous: 10,
    },
    monthly: {
      value: 21,
      previous: 23,
    },
  },
  self_care: {
    name: 'Self Care',
    daily: {
      value: 0,
      previous: 1,
    },
    weekly: {
      value: 2,
      previous: 2,
    },
    monthly: {
      value: 7,
      previous: 11,
    },
  },
}

const report = document.querySelector('.report');

const getPeriodData = (period) => {
  const result = {};
  category.forEach((category) => {
    result[category] = person[category][period];
  })
  return result
}

const showPeriodData = (periodData) => {

  category.forEach((category) => {
    const title = person[category].name;
    const { value, previous } = periodData[category];
    let template_category = `
        <section>
          <div class="category-row">
            <h2>${title}</h2>
            <div class="category-row-dots">
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                  fill="#BBC0FF" fill-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="category-row row-2">
            <div class="category-row-value">${value}hrs</div>
            <div class="category-row-datail">Last Week - ${previous}hrs</div>
          </div>
        </section>
      `
    let categoryElement = document.createElement('div');
    categoryElement.classList.add('category');
    categoryElement.classList.add(category);
    categoryElement.innerHTML = template_category;

    report.append(categoryElement);
  })

}

const showReportHeader = (period) => {
  const { name, img } = person;
  const template_reportHeader = `
      <div class="report__title">
        <div class="report__img">
          <img src="${img}" alt="person img">
        </div>
        <h1> Report for <br><span>${name}</span></h1>
      </div>
      <div class="report__period">
        <div class="report__period-daily period">Daily</div>
        <div class="report__period-weekly period">Weekly</div>
        <div class="report__period-monthly period">Monthly</div>
      </div>
  `;

  let reportHeaderElement = document.createElement('div');
  reportHeaderElement.classList.add('report__header');
  reportHeaderElement.innerHTML = template_reportHeader;

  const reportPeriod = reportHeaderElement.querySelector(`.report__period-${period}`);
  reportPeriod.classList.add('active');

  const report__period = reportHeaderElement.querySelector(`.report__period`);
  report__period.onclick = handleChangePeriod;

  report.append(reportHeaderElement);

}

const getPeriodFromClassList = (classList) => {
  let period = undefined;
  classList.forEach((item) => {
    let templateStr = 'report__period-';
    if (item.includes(templateStr)) {
      period = item.replace(templateStr, '');
    }
  })
  return period;
}

const removeElementsByClassName = (className) => {
  const elementsByClassName = document.querySelectorAll(className);
  elementsByClassName.forEach((element) => {
    element.remove();
  })
}

const removeClassByClassName = (className, elementName) => {
  const elementsByClassName = document.querySelectorAll(elementName);
  elementsByClassName.forEach((element) => {
    element.classList.remove(className);
  })
}

const handleChangePeriod = (e) => {
  let newPeriod = getPeriodFromClassList(e.target.classList);
  if (!newPeriod) return;
  if (period === newPeriod) return;
  period = newPeriod;
  removeElementsByClassName('.category');
  periodData = getPeriodData(period);
  showPeriodData(periodData);
  removeClassByClassName('active', '.period');
  const reportPeriod = document.querySelector(`.report__period-${period}`);
  reportPeriod.classList.add('active');
}

showReportHeader(period);
let periodData = getPeriodData(period);
showPeriodData(periodData);
