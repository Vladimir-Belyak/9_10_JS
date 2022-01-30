// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13, "class": "fruit_violet"},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35, "class": "fruit_green"},
  {"kind": "Личи", "color": "розово-красный", "weight": 17, "class": "fruit_carmazin"},
  {"kind": "Карамбола", "color": "желтый", "weight": 28, "class": "fruit_yellow"},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22, "class": "fruit_lightbrown"}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = (displayArray) => {
  console.log(displayArray);
  let parent = document.querySelector('.fruits__list');
  parent.innerHTML = '';

  for (let i = 0; i < displayArray.length; i++) {
    addLi = document.createElement('li');
    addLi.className = 'fruit__item '+displayArray[i].class;
    parent.appendChild(addLi);
    addDivMain = document.createElement('div');
    addDivMain.className = 'fruit__info';
    addLi.appendChild(addDivMain);

    addDivIndex = document.createElement('div')
    addDivIndex.innerHTML = 'Index: '+i;
    addDivMain.appendChild(addDivIndex);

    for (let key in displayArray[i]){
      if (key === 'class') continue;
      addDivIndex = document.createElement('div')
      addDivIndex.innerHTML = `${key}: ${displayArray[i][key]}`;
      addDivMain.appendChild(addDivIndex);
    }
  }
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let tempArray = fruits;
  let result = [];
  let randomIndex;

  while (fruits.length > 0) {
    randomIndex = getRandomInt(0, fruits.length-1);
    result.push(fruits[randomIndex]);
    fruits.splice(randomIndex, 1);
  }
  if (tempArray === result) alert('Перемешать не получилось! =(');
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let filterArray = [];
  let minWeight=parseInt(document.querySelector('.minweight__input').value);
  let maxWeight=parseInt(document.querySelector('.maxweight__input').value);
  if (minWeight > maxWeight) [minWeight, maxWeight] = [maxWeight, minWeight];
  if (minWeight < 0 || maxWeight < 0 || isNaN(minWeight) || isNaN(maxWeight)) {
    alert('Введены некорректные данные для сортировки!');
  } else {
    filterArray = fruits.filter(item => (item.weight >= minWeight && item.weight <= maxWeight));
    display(filterArray);
  }
};

filterButton.addEventListener('click', () => {
  filterFruits();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display(fruits);
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display(fruits);
});