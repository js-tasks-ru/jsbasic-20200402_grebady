export default class StepSlider {
  constructor({ steps, value = 0 }) {
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

    slider.addEventListener("click", chooseSpice);

    function chooseSpice(event) {



      // Если попали прямо в узкое деление
      if (event.target.parentElement === sliderSteps){
        let previousChoice = slider.querySelector(".slider__step-active");
        previousChoice.classList.remove("slider__step-active");
        event.target.classList.add("slider__step-active");

        let leftFromScreenTarget = event.target.getBoundingClientRect().left;
        let leftFromScreenParentTarget = event.target.parentElement.getBoundingClientRect().left;
        let fullWidthProgress = event.target.parentElement.offsetWidth;
        let widthOfSegment = leftFromScreenTarget - leftFromScreenParentTarget;
        let fractionToFullWidthProgress = widthOfSegment/fullWidthProgress;

        let leftPercents = Math.ceil(fractionToFullWidthProgress * 100);
        sliderThumb.style.left = `${leftPercents}%`;
        sliderProgress.style.width = `${leftPercents}%`;

        let numberOfSegments = (steps - 1);
        let newValue = Math.ceil(fractionToFullWidthProgress * numberOfSegments);
        sliderValue.innerText = `${newValue}`;

        //Событие изменения слайдера
        let exactlySpanClick = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
          detail: newValue, // значение 0, 1, 2, 3, 4
          bubbles: true // событие всплывает - это понадобится в дальнейшем
        });

        slider.dispatchEvent(exactlySpanClick);
      }else{
        // Если попали между узкими делениями
        if (event.target.closest(".slider")){
          let rectElemProgress = sliderProgress.getBoundingClientRect();
          let fullWidthProgress = slider.clientWidth;
          let chosenProgressSegment = event.clientX - rectElemProgress.left;
          let numberOfSegments = (steps - 1);
          let fractionToFullWidthProgress = (chosenProgressSegment/fullWidthProgress);

          let readyToMakeIntegerSegment = fractionToFullWidthProgress * numberOfSegments;

          let integerSegment = Math.round(readyToMakeIntegerSegment);
          let leftPercents = Math.round(integerSegment/numberOfSegments * 100);
          sliderThumb.style.left = `${leftPercents}%`;
          sliderProgress.style.width = `${leftPercents}%`;

          sliderValue.innerText = `${integerSegment}`;

          //Событие изменения слайдера
          let betweenSpanClick = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
            detail: integerSegment, // значение 0, 1, 2, 3, 4
            bubbles: true // событие всплывает - это понадобится в дальнейшем
          });

          slider.dispatchEvent(betweenSpanClick);
        }
      }


    }

    this.elem = slider;
  }
}
