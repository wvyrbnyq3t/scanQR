$(() => {
  $(".btn-openModal").click((e) => {
    const $this = $(e.currentTarget);
    const field = $this.data("field");
    const disabled = $this.attr("aria-disabled");
    const $modal = $("#modal");
    const $modalContent = $modal.find(`.modalContent[data-field="${field}"]`);

    if (disabled !== "true" && $modalContent.length !== 0) {
      $modal.addClass("is-open");
      $modalContent.addClass("is-active");
    }
  });

  $("#modal .overlay, .btn-closeModal").click(() => {
    $("#modal .modalContent").removeClass("is-active");
    $("#modal").removeClass("is-open");
  })
});
