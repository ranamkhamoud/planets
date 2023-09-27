$(document).ready(function () {
  // Initialize the Slick Slider
  $("#planetSlider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  });
});

$(document).ready(function () {
  const storyTree = {
    text: "Welcome to the Space Adventure Academy! 🌌 Before you can unlock the secrets of the planets, you must make wise choices. Ready to start?",
    image: "space.jpeg",
    choices: [
      {
        text: "Power up your spaceship's engines!",
        next: {
          text: "Your spaceship speeds up! But uh-oh! A field of twinkling asteroids is ahead. Navigate safely to learn about the planets!",
          image: "field-asteroids.jpeg",
          choices: [
            {
              text: "Gently steer around the asteroids.",
              next: {
                text: "Great job! By choosing wisely, you can now learn about the mysterious Mars and shimmering Saturn!",
                image: "path_to_image3.jpg",
                next: "showSlider",
              },
            },
            {
              text: "Close your eyes and hope for the best.",
              next: {
                text: "Oops! You missed the chance to learn about some planets this time. Try again to unlock their secrets!",
                image: "path_to_image4.jpg",
                next: "end",
              },
            },
          ],
        },
      },
      {
        text: "Send a friendly space robot to guide you.",
        next: {
          text: "Your robot buddy spots a spaceship with rainbow lights! Interact wisely to discover more planets!",
          image: "rainbow-spaceship.jpeg",
          choices: [
            {
              text: "Share space stories with the aliens.",
              next: {
                text: "The aliens are thrilled! They want to play a space game before showing you the planets.",
                image: "aliens.jpeg",
                choices: [
                  {
                    text: "Play a game of space chess with them.",
                    next: {
                      text: "The aliens are impressed by your skills! In return, they guide you to the beautiful blue Neptune and the windy Venus! 🪐",
                      image: "path_to_image6.jpg",
                      next: "showSlider",
                    },
                  },
                  {
                    text: "Race the spaceship for fun.",
                    next: {
                      text: "You had fun, but missed the chance to learn about some planets. Choose wisely next time to uncover their tales!",
                      image: "path_to_image7.jpg",
                      next: "end",
                    },
                  },
                ],
              },
            },
            {
              text: "Politely decline and continue on your journey.",
              next: {
                text: "It's okay to be cautious in space. You continue on your journey, but miss out on the secrets the aliens could have shared.",
                image: "path_to_image8.jpg",
                next: "end",
              },
            },
          ],
        },
      },
    ],
  };

  let currentNode = storyTree;

  function loadStoryPart(node) {
    $("#storyText").text(node.text);
    if (node.image) {
      $("#storyImage").attr("src", node.image).show();
    } else {
      $("#storyImage").hide();
    }

    const availableChoices = node.choices || [];
    $("#choiceContainer").empty();

    availableChoices.forEach((choice, idx) => {
      $("#choiceContainer").append(
        `<button class="choice" data-idx="${idx}">${choice.text}</button>`
      );
    });
  }

  $("#choiceContainer").on("click", ".choice", function () {
    const choiceIdx = $(this).data("idx");
    let nextNode = currentNode.choices[choiceIdx].next;

    // This while loop will handle multiple depths.
    while (nextNode && !nextNode.choices) {
      if (nextNode.next === "end") {
        alert(nextNode.text);
        $("#startOver").show();
        return;
      } else if (nextNode.next === "showSlider") {
        alert(nextNode.text);
        $("#stellarStoriesContainer").hide();
        $("#introContainer").hide();
        $("#sliderContainer").fadeIn(1000);
        $("#startOver").show();
        return;
      } else {
        alert(nextNode.text); // Alert the text of the current node
        if (nextNode.image) {
          $("#storyImage").attr("src", nextNode.image).show();
        }
        nextNode = nextNode.next; // Set the nextNode to its own 'next' property
      }
    }

    currentNode = nextNode; // If we're here, it means the next node has choices.
    loadStoryPart(currentNode);
  });

  $("#startOver").on("click", function () {
    currentNode = storyTree;
    loadStoryPart(currentNode);
    $("#stellarStoriesContainer").show();
    $("#sliderContainer").hide();
    $(this).hide();
  });

  loadStoryPart(currentNode);
});
$("#skipToSlider").on("click", function () {
  $("#stellarStoriesContainer").hide();
  $("#introContainer").hide();

  $("#sliderContainer").fadeIn(1000);
  $("#startOver").show();
});
