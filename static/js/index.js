window.HELP_IMPROVE_VIDEOJS = false;


async function setResultVideo(task, method) {
  const baseVideoPath = "static/videos/scene_generalisation";

  ids = ["#train-scene", "#test-scene-1", "#test-scene-2", "#test-scene-3"];
  for (i = 0; i < ids.length; i++) {
    if (ids[i] === "#train-scene") {
      fileName = "train-scene.mp4";
    } else {
      fileName = `${method}-${ids[i].substring(1)}.mp4`;
    }
    var filePath = `${baseVideoPath}/${task}/${fileName}`;

    $(ids[i]).attr("src", filePath);
  }
}

async function handleMenuChange() {
  const taskValue = $('#single-menu-task').val();
  const methodValue = $('#single-menu-method').val();
  setResultVideo(taskValue, methodValue);
}


$(document).ready(async function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  }

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);

  // Loop on each carousel initialized
  for (var i = 0; i < carousels.length; i++) {
    // Add listener to  event
    carousels[i].on('before:show', state => {
      console.log(state);
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function (state) {
      console.log(state);
    });
  }

  $('#single-menu-task, #single-menu-method').on("change", handleMenuChange);

  bulmaSlider.attach();

  // Load initial data and set initial iframe src values
  const initialTaskValue = $('#single-menu-task').val();
  const initialMethodValue = $('#single-menu-method').val();
  setResultVideo(initialTaskValue, initialMethodValue)
})