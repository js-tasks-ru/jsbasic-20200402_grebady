export default class StepSlider {
  constructor({ steps, value = 0 }) {

    //-----------------<Верстка элемента>

    //Корневой элемент
    let slider = document.createElement("div");
    slider.className = "slider";

    //Ползунок слайдера
    let sliderThumb = document.createElement("div");
    sliderThumb.className = "slider__thumb";
    let sliderValue = document.createElement("span");
    sliderValue.className = "slider__value";
    sliderValue.innerText = value;
    sliderThumb.append(sliderValue);

    //Заполненная часть слайдера
    let sliderProgress = document.createElement("div");
    sliderProgress.className = "slider__progress";

    //Шаги слайдера
    let sliderSteps = document.createElement("div");
    sliderSteps.className = "slider__steps";
    for (let i = 0; i < steps; i++) {
      let span = document.createElement("span");
      sliderSteps.append(span);
    }
    sliderSteps.children[value].classList.add("slider__step-active")

    slider.append(sliderProgress);
    slider.append(sliderThumb);
    slider.append(sliderSteps);

    //-----------------</Верстка элемента>

    //-----------------Слушаем клик и click и drag-and-drop
    slider.addEventListener("pointerdown", chooseSpiceDragAndDrop);
    slider.addEventListener("click", chooseSpiceClick);


    //-----------------Общий функционал для отслеживания click'а и drag-and-drop
    function moveAt(xSliderThumb) {
      let fullWidthProgress = slider.clientWidth;
      let leftPercents = Math.round(xSliderThumb/fullWidthProgress * 100);
      let newValue = 0;
      let numberOfSegments = steps - 1;
      if (leftPercents < 0) {
        sliderThumb.style.left = "0";
        sliderProgress.style.width = "0";
        sliderValue.innerText = `${newValue}`;
      }
      else if(leftPercents > 100) {
        sliderThumb.style.left = "100";
        sliderProgress.style.width = "100";
        newValue = numberOfSegments;
        sliderValue.innerText = `${newValue}`;
      }
      else {
        sliderThumb.style.left = `${leftPercents}%`;
        sliderProgress.style.width = `${leftPercents}%`;
        newValue = Math.round(xSliderThumb/fullWidthProgress * numberOfSegments);
        sliderValue.innerText = `${newValue}`;
      }
    }
    function fixLastPos(){
      let previousChoice = slider.querySelector(".slider__step-active");
      previousChoice.classList.remove("slider__step-active");

      let fullWidthProgress = slider.clientWidth;
      let xCenterSliderThumb = event.pageX - slider.offsetLeft;
      let numberOfSegments = (steps - 1);
      let fractionToFullWidthProgress = xCenterSliderThumb / fullWidthProgress;
      let newValue = Math.round(fractionToFullWidthProgress * numberOfSegments);
      sliderValue.innerText = `${newValue}`;
      let readyToMakeIntegerSegment = fractionToFullWidthProgress * numberOfSegments;
      let integerSegment = Math.round(readyToMakeIntegerSegment);
      let leftPercents = Math.round(integerSegment/numberOfSegments * 100);
      if (leftPercents < 0) {
        sliderThumb.style.left = "0";
        sliderProgress.style.width = "0";
        newValue = 0;
      }
      else if(leftPercents > 100) {
        sliderThumb.style.left = "100";
        sliderProgress.style.width = "100";
        newValue = steps - 1;
      }
      else {
        sliderThumb.style.left = `${leftPercents}%`;
        sliderProgress.style.width = `${leftPercents}%`;
      }
      sliderValue.innerText = `${newValue}`;
      sliderSteps.children[newValue].classList.add("slider__step-active");


      //Событие изменения слайдера
      let betweenSpanUp = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: newValue, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      });

      slider.dispatchEvent(betweenSpanUp);
    }
    //-----------------Конец общего функционала для отслеживания click'а и drag-and-drop


    //-----------------Реализация действий для click и drag-and-drop
    function chooseSpiceDragAndDrop(event){

      //-----Набор функций для работы
      function onMouseMove(event) {
        let xCenterSliderThumb = event.pageX - slider.offsetLeft;
        moveAt(xCenterSliderThumb);
      }

      function onMouseUp(event){
        slider.classList.remove("slider_dragging");
        document.removeEventListener('pointermove', onMouseMove);
        document.removeEventListener('pointerup', onMouseUp);
        fixLastPos();
      }
      //-----Конец набора функций


      //-----Логика при drug-and-drop

      slider.classList.add("slider_dragging");
      let xSliderThumbStart = event.pageX - slider.offsetLeft;
      moveAt(xSliderThumbStart);
      document.addEventListener('pointermove', onMouseMove);
      document.addEventListener('pointerup', onMouseUp);
      sliderThumb.ondragstart = function() {
        return false;
      };
    }
    function chooseSpiceClick(event) {
      let xSliderThumbStart = event.pageX - slider.offsetLeft;
      moveAt(xSliderThumbStart);
      fixLastPos();
    }
    //-----------------Конец реализации действий для click и drag-and-drop


    //-----------------HTML элемента
    this.elem = slider;
  }
}
