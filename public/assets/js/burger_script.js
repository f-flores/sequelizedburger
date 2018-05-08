 // ================================================================================
//
// File name: burger_scripts.js
// Description: Front end logic.
//
// ================================================================================

$(document).ready(function() {
  const MAX_BURGERCHARS = 70;
  var toggleState = localStorage.getItem("toggleState");

  console.log("in burger_script.js");

  if (!toggleState) {
    localStorage.setItem("toggleState", "disabled");
  }
  toggleState = localStorage.getItem("toggleState");
  $("#toggle-another").attr("data-toggle", toggleState);

  if (toggleState === "enabled") {
    $(".devoured-tbl .burger-button").show();
  } else {
    $(".devoured-tbl .burger-button").hide();
  }

  // -------------------------------------------------------------------------
  // helper functions
  //

  // validation routines
  function checkBurgerInput() {
    var isValid = true;

    if ($("#bu").val().length < 2 || $("#bu").val().length > MAX_BURGERCHARS) {
      $("#burger-error").html("<p class=\"error-msg\">Invalid name must be between 2 and " + MAX_BURGERCHARS + " characters long.</p>");
      isValid = false;
    } else {
      $("#burger-error").html("");
    }

    return isValid;
  }


  function checkBurgerMenu() {
    var isValid = true;

    $(".opt-selected").each(function() {
      console.log(".opt-select val: " + $(this).val());
      if ($(this).val() === null) {
        $("#burger-error").html("<p class=\"error-msg\">Please select burger option or type in burger name (at least 2 characters).</p>");
        isValid = false;
      } else {
        $("#burger-error").html("");
      }
    });

    return isValid;
  }

  function setToggleState() {
    if (toggleState === "enabled") {
      localStorage.setItem("toggleState", "disabled");
      $("#toggle-another").attr("data-toggle", "disabled");
      $(".devoured-tbl .burger-button").hide();
    } else {
      localStorage.setItem("toggleState", "enabled");
      $("#toggle-another").attr("data-toggle", "enabled");
      $(".devoured-tbl .burger-button").show();
    }
  }

  $(".opt-selected").each(function() {
    $(this).change(function() {
      var current = $(this).val();

      console.log("in opt-selected: " + current);

      if (current === "") {
        $(this).css("color","gray");
      } else {
        $(this).css("color","black");
        $(this).css("font-weight","bold");
        $(this).css("border","2px solid #3B5998");
      }
    });
  });

  // -------------------------------------------------------------------------------
  // update
  //
  $(".change-devoured").on("click", function(event) {
    var id = parseInt($(this).data("id"),10);
    var newDevour = $(this).data("newdevour");
    var newDevourState = {"devoured": newDevour};

    event.preventDefault();

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      "type": "PUT",
      "data": newDevourState
    }).then(function() {
        console.log("changed devoured to", newDevour);
        // Reload the page to get the updated list
        location.reload();
    });
  });

  // --------------------------------------------------------------------------------
  // post
  //
  $(".create-form").on("submit", function(event) {
    var newBurger,
        burgerName;

    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    $("#burger-error").hide();

    // validate form
    function formValidated() {
      var isValidBurgerName = checkBurgerInput(),
          isBurgerSelected = checkBurgerMenu();

      return isValidBurgerName || isBurgerSelected;
    }


    if (formValidated()) {
      burgerName = $("#bu").val().
      trim();
      if (burgerName === "") {
        burgerName = $(".opt-selected").val();
      }

      newBurger = {"burger_name": burgerName};
      newBurger.devoured = 0;

      // post data to api
      $.post("/api/burgers", newBurger, function(data) {
        console.log("created new burger: " + data);
        // Reload the page to get the updated list
        location.reload();
      });
    } else {
      $("#burger-error").show();
    }

  });

  // ---------------------------------------------------------------------------------------
  // delete
  //
  $(".delete-burger").on("click", function(event) {
    var id = parseInt($(this).data("id"),10);

    console.log("in delete burger, id: " + id);

    event.preventDefault();

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {"type": "DELETE"}).
      then(function() {
        // console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      });
  });

  // --------------------------------------------------------------------------------------
  // toggle another
  //
  $("#toggle-another").on("click", function() {
    toggleState = $(this).attr("data-toggle");
    if (localStorage) {
      // Store data
      localStorage.setItem("toggleState", toggleState);
    }

    setToggleState();
  });

});