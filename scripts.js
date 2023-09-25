$(document).ready(function() {
    // Initialize the Slick Slider
    $('#planetSlider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000
    });

    // Hardcoded password (in a real-world scenario, server-side validation would be more secure)
    const correctPassword = "arwa";

    // "Submit Password" button click event
    $("#submitPassword").click(function() {
        let enteredPassword = $("#passwordInput").val();

        if (enteredPassword === correctPassword) {
            $("#introContainer").hide();
            $("#sliderContainer").fadeIn(1000);
        } else {
            alert("Incorrect password! Please try again.");
        }
    });
});
// Existing code...

let hintLevel = 0;

$("#hintBtn").click(function() {
    hintLevel++;
    
    if (hintLevel === 1) {
        $("#hint1").addClass("hint-show");
    } else if (hintLevel === 2) {
        $("#hint2").addClass("hint-show");
    } else if (hintLevel === 3) {
        $("#hint3").addClass("hint-show");
    } else {
        alert("No more hints available!");
    }
});
