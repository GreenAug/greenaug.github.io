window.HELP_IMPROVE_VIDEOJS = false;


async function loadVideoData() {
  try {
    const response = await fetch('static/videos.json');
    const videoData = await response.json();
    return videoData;
  } catch (error) {
    console.error('Error fetching JSON:', error);
    return {};
  }
}

function appendQueryParams(url) {
  // Extract the video ID from the URL
  const urlParts = url.split('?');
  const baseUrl = urlParts[0];
  const queryString = urlParts[1];
  const videoId = baseUrl.split('/').pop();

  // Create new query parameters
  const newParams = `autoplay=1&loop=1&playlist=${videoId}&mute=1&rel=0`;

  // Return the new URL with the appended query parameters
  return `${baseUrl}?${queryString}&${newParams}`;
}


function setResultVideo(task, method, videoData) {
  const videoUrls = videoData[`${task}/${method}`];

  ids = ["#train-scene", "#test-scene-1", "#test-scene-2", "#test-scene-3"];
  for (i = 0; i < ids.length; i++) {
    if (!videoUrls[i]) {
      $(ids[i]).attr('src', 'about:blank');
    } else {
      $(ids[i]).attr("src", appendQueryParams(videoUrls[i]));
    }
  }
}

async function handleMenuChange() {
  const videoData = await loadVideoData();
  const taskValue = $('#single-menu-task').val();
  const methodValue = $('#single-menu-method').val();
  setResultVideo(taskValue, methodValue, videoData);
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
  const videoData = await loadVideoData();
  const initialTaskValue = $('#single-menu-task').val();
  const initialMethodValue = $('#single-menu-method').val();
  setResultVideo(initialTaskValue, initialMethodValue, videoData);
})
