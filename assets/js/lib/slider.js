$(() => {
  $(".btn-openSlider").click((e) => {
    const $this = $(e.currentTarget);
    const field = $this.data("field");
    const disabled = $this.attr("aria-disabled");
    const $slider = $("#slider");
    const $sliderContent = $slider.find(`.sliderContent[data-field="${field}"]`);

    if (disabled !== "true" && $sliderContent.length !== 0) {
      $sliderContent.addClass("is-active");
    }
  });

  $(".btn-closeSlider").click(() => {
    $("#slider .sliderContent").removeClass("is-active");
  });
});
