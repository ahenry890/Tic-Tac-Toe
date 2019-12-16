$(document).ready(function() {
  var letOne, letTwo; // Variables for each letter
  var sqaures = ["#5", "#1", "#3", "#7", "#9", "#6", "#8", "#2", "#4"].sort(
    function(a, b) {
      return 0.5 - Math.random();
    }
  ); // not in order on purpose
  $("#table ,.btn-info").hide(); // Hides game before player makes selection
  $(".btn-primary , .btn-danger").on("click", function() {
    $("#table ,.btn-info, h1").fadeIn("slow"); // Shows game after selection is made
    $("h2 , #X, #O").hide();
    if (this.id === "X") {
      // If user chooses X then opponent is O
      letOne = "X";
      letTwo = "O";
    } else {
      // Vise versa
      letOne = "O";
      letTwo = "X";
    }

    function winnerMessage(l, color) {
      // Is called when a winner has become declared
      $("h3")
        .html(l + " has won")
        .css("color", color)
        .css("margin-top", "180px");
      $("table , .btn-info").hide();
      $("h3").show(); // For the second time this function is called
      setTimeout(function() {
        $("h3").hide();
        $("td").empty();
        $("table, .btn-info").show();
      }, 1000);

      sqaures = ["#9", "#4", "#1", "#5", "#3", "#7", "#8", "#6", "#2"].sort(
        function(a, b) {
          return 0.5 - Math.random();
        }
      );
    }

    function check() {
      // Check to see who won;
      if (sqaures.length === 0) {
        // If there are no spots then nobody wins
        winnerMessage("No one", "black");
      }

      if (
        $("#1 i").hasClass("fa-times") &&
        $("#2  i").hasClass("fa-times") &&
        $("#3  i").hasClass("fa-times")
      ) {
        return "X";
      } else if (
        $("#1 i").hasClass("fa-circle-o") &&
        $("#2 i").hasClass("fa-circle-o") &&
        $("#3 i").hasClass("fa-circle-o")
      ) {
        return "O";
      } else if (
        $("#4 i").hasClass("fa-circle-o") &&
        $("#5 i").hasClass("fa-circle-o") &&
        $("#6 i").hasClass("fa-circle-o")
      ) {
        return "O";
      } else if (
        $("#4 i").hasClass("fa-times") &&
        $("#5 i").hasClass("fa-times") &&
        $("#6 i").hasClass("fa-times")
      ) {
        return "X";
      } else if (
        $("#7 i").hasClass("fa-times") &&
        $("#8 i").hasClass("fa-times") &&
        $("#9 i").hasClass("fa-times")
      ) {
        return "X";
      } else if (
        $("#7 i").hasClass("fa-circle-o") &&
        $("#8 i").hasClass("fa-circle-o") &&
        $("#9 i").hasClass("fa-circle-o")
      ) {
        return "O";
      } else if (
        $("#1 i").hasClass("fa-circle-o") &&
        $("#4 i").hasClass("fa-circle-o") &&
        $("#7 i").hasClass("fa-circle-o")
      ) {
        return "O";
      } else if (
        $("#1 i").hasClass("fa-times") &&
        $("#4 i").hasClass("fa-times") &&
        $("#7 i").hasClass("fa-times")
      ) {
        return "X";
      } else if (
        $("#2 i").hasClass("fa-times") &&
        $("#5 i").hasClass("fa-times") &&
        $("#8 i").hasClass("fa-times")
      ) {
        return "X";
      } else if (
        $("#2 i").hasClass("fa-circle-o") &&
        $("#5 i").hasClass("fa-circle-o") &&
        $("#8 i").hasClass("fa-circle-o")
      ) {
        return "O";
      } else if (
        $("#3 i").hasClass("fa-circle-o") &&
        $("#6 i").hasClass("fa-circle-o") &&
        $("#9 i").hasClass("fa-circle-o")
      ) {
        return "O";
      } else if (
        $("#3 i").hasClass("fa-times") &&
        $("#6 i").hasClass("fa-times") &&
        $("#9 i").hasClass("fa-times")
      ) {
        return "X";
      } else if (
        $("#1 i").hasClass("fa-times") &&
        $("#5 i").hasClass("fa-times") &&
        $("#9 i").hasClass("fa-times")
      ) {
        return "X";
      } else if (
        $("#1 i").hasClass("fa-circle-o") &&
        $("#5 i").hasClass("fa-circle-o") &&
        $("#9 i").hasClass("fa-circle-o")
      ) {
        return "O";
      } else if (
        $("#3 i").hasClass("fa-circle-o") &&
        $("#5 i").hasClass("fa-circle-o") &&
        $("#7 i").hasClass("fa-circle-o")
      ) {
        return "O";
      } else if (
        $("#3 i").hasClass("fa-times") &&
        $("#5 i").hasClass("fa-times") &&
        $("#7 i").hasClass("fa-times")
      ) {
        return "X";
      }
    }

    function ai(letter, spot) {
      if (letter === "O") {
        // If letter is X then opponent is O
        $(spot).html("<i class='fa fa-circle-o' aria-hidden='true'></i>"); // Places O icon on table
        if (check() === letter) {
          // Checks to find the winner
          winnerMessage(letter, "blue");
        } else {
          var block = sqaures.indexOf(spot);
          if (block >= 0) {
            sqaures.splice(block, 1); // Gets rid of spot id from array
          }
        }
      } else {
        $(spot).html("<i class='fa fa-times' aria-hidden='true'></i>"); // Places X icon on table
        if (check() === "X") {
          // Checks to find winnder
          winnerMessage("X", "red");
        } else {
          var block = sqaures.indexOf(spot);
          if (block >= 0) {
            sqaures.splice(block, 1);
          }
        }
      }
    }

    $("td").on("click", function click() {
      // When player makes move call function
      if ($("i", this).hasClass("fa")) {
        alert("Please select another square"); // If sqaure already has icon message
      } else if (letOne === "X") {
        // If player is X
        $(this).html("<i class='fa fa-times' aria-hidden='true'></i>"); // Places X icon on table
        if (check() === letOne) {
          // Check to see if player is winner
          winnerMessage(letOne, "red");
        } else {
          var index = sqaures.indexOf("#" + this.id);
          if (index >= 0) {
            sqaures.splice(index, 1);
          }
          var rand = sqaures[Math.floor(Math.random() * sqaures.length)];
          ai(letTwo, rand); // Opponent's turn
        }
      } else if (letOne === "O") {
        $(this).html("<i class='fa fa-circle-o' aria-hidden='true'></i>"); // Gives player the O icon
        if (check() === letOne) {
          winnerMessage(letOne, "blue");
        } else {
          var index = sqaures.indexOf("#" + this.id);
          if (index >= 0) {
            sqaures.splice(index, 1);
          }
          var rand = sqaures[Math.floor(Math.random() * sqaures.length)];
          ai(letTwo, rand);
        }
      }
    });

    $("#reset").on("click", function() {
      $("td").empty();
      sqaures = ["#9", "#4", "#1", "#5", "#3", "#7", "#8", "#6", "#2"].sort(
        function(a, b) {
          return 0.5 - Math.random();
        }
      );
    }); // Resets game
  });
}); // document
