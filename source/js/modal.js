var list = document.querySelectorAll(".good__order, .modal, .modal-overlay, .catalog-item__add-to-cart");
var modal = list.item(list.length-2);
var overlay = list.item(list.length-1);
var href = document.location.pathname;

for (var i = 0; i < list.length - 2; i++) {
  list.item(i).addEventListener("click", function(evt) {
    evt.preventDefault();
    modal.classList.add("modal-show");
    overlay.classList.add("overlay-show");
  });
};

overlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  modal.classList.remove("modal-show");
  overlay.classList.remove("overlay-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal.classList.contains("modal-show")) {
      modal.classList.remove("modal-show");
    }
    if (overlay.classList.contains("overlay-show")) {
      overlay.classList.remove("overlay-show");
    }
  }
});
