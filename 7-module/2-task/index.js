import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    //СОЗДАНИЕ МАКЕТА HTML
    //Корневой эл-т
    let modal = document.createElement("div");
    modal.className = "modal";

    //Главные вложенные эл-ты
    let modalOverlay = document.createElement("div");
    modalOverlay.className = "modal__overlay";
    let modalInner = document.createElement("div");
    modalInner.className = "modal__inner";

    modal.append(modalOverlay);
    modal.append(modalInner);

    //Добавление Заголовка и кнопки закрыть
    let modalHeader = document.createElement("div");
    modalHeader.className = "modal__header";
    let modalTitle = document.createElement("h3");
    modalTitle.className = "modal__title";
    let modalClose = document.createElement("button");
    modalClose.className = "modal__close";
    let imgClose = document.createElement("img");
    imgClose.setAttribute("src", "/assets/images/icons/cross-icon.svg");
    imgClose.setAttribute("alt", "close-icon");

    modalClose.append(imgClose);
    modalHeader.append(modalClose);
    modalHeader.append(modalTitle);
    modalInner.append(modalHeader);

    //Добавление тушки
    let modalBody = document.createElement("div");
    modalBody.className = "modal__body";

    modalInner.append(modalBody);

    this.modalTitle = modalTitle;
    this.modalBody = modalBody;
    this.elem = modal;

    modal.addEventListener("click", (event)=> {
      if (event.target.closest(".modal__close")){
        this.close();
      }
    });

    document.addEventListener("keydown",  (event) => {
      if (event.code === 'Escape'){
        this.close();
      }
    })
  }

  setTitle(str){
    this.modalTitle.innerText = str;
  }

  setBody(node){
    this.modalBody.innerHTML = "";
    this.modalBody.append(node);
  }

  open(){
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
  }
  close(){
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
  }
}
