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
  let parent = document.querySelector('.fruits__list');
  parent.innerHTML = '';


//Про индексы не указано что выводить "родного массива" или текущего,
//сделал текущего что-то вроде "нумерации". Нужно ТЗ точнее;)
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
  return a > b ? true : false;
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
   const n = arr.length;
   for (let i = 0; i < n-1; i++) { 
       for (let j = 0; j < n-1-i; j++) { 
           if (comparation(arr[j].color, arr[j+1].color)) { 
               [arr[j], arr[j+1]] = [arr[j+1], arr[j]]; 
           }
       }
   }                 
  },

  quickSort(arr, comparation) {
    quickSortFunc(arr, 0, arr.length-1);
    function swap(items, firstIndex, secondIndex){
      [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]]
    }

    function partition(items, left, right) {
      var pivot = items[Math.floor((right + left) / 2)].color,
          i = left,
          j = right;
      while (i <= j) {
          while (items[i].color < pivot) {
              i++;
          }
          while (items[j].color > pivot) {
              j--;
          }
          if (i <= j) {
              swap(items, i, j);
              i++;
              j--;
          }
      }
      return i;
    }

    function quickSortFunc(items, left, right) {
      var index;
      if (items.length > 1) {
          left = typeof left != "number" ? 0 : left;
          right = typeof right != "number" ? items.length - 1 : right;
          index = partition(items, left, right);
          if (left < index - 1) {
              quickSortFunc(items, left, index - 1);
          }
          if (index < right) {
              quickSortFunc(items, index, right);
          }
      }
      return items;
    }
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
  if (sortKind === 'bubbleSort'){
    sortKind = 'quickSort';
  } else sortKind = 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'Сортировка...';
  const sort = sortAPI[sortKind];
  console.log(sort);
  sortAPI.startSort(sort, fruits, comparationColor);
  display(fruits);
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display(fruits);
});