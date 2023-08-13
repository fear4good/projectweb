$(document).ready(function() {
  // Change Username Form Submission
  $("#change-username-form").submit(function(event) {
    event.preventDefault();
    const newUsername = $("#new-username").val();

     // Send AJAX request to update the username using update_username.php
    $.ajax({
      url: "update_username.php",
      method: "POST",
      data: { new_username: newUsername },
      dataType: "json",
      success: function(response) {
        // Handle the response (show a success message, update UI, etc.)
        if (response.success) {
          console.log(response.message);
        } else {
          console.error("Error updating username:", response.message);
        }
      },
      error: function(response) {
        console.error("Error updating username:", response);
      }
    });
  });
 // Change Password Form Submission
$("#change-password-form").submit(function(event) {
  event.preventDefault();
  const currentPassword = $("#current-password").val();
  const newPassword = $("#new-password").val();

  // Send AJAX request to update the password using update_password.php
  $.ajax({
    url: "update_password.php",
    method: "POST",
    data: { "current_password": currentPassword, "new_password": newPassword },
    success: function(response) {
      // Handle the response (show a success message, update UI, etc.)
      console.log(response); // Response is a plain text message
    },
    error: function(xhr, textStatus, errorThrown) {
      console.error("Error updating password:", textStatus, errorThrown);
    }
  });
});
  // Change Email Form Submission
  $("#change-email-form").submit(function(event) {
    event.preventDefault();
    const newEmail = $("#new-email").val();

    // Send AJAX request to update the email using update_email.php
    $.ajax({
      url: "update_email.php",
      method: "POST",
      data: { new_email: newEmail },
      dataType: "json",
      success: function(response) {
        console.log(response);
      },
      error: function(error) {
        console.error("Error updating email:", error);
      }
    });
  });
// Retrieve and display user's history of offers
$.ajax({
  url: "get_user_offers.php",
  method: "GET",
  dataType: "json",
  success: function(response) {
    const userOffersDiv = $("#user-offers");
    let offersHtml = "<ul>"; // Start a list

    // Loop through the offers and populate the offersHtml
    response.forEach(offer => {
      // Fetch the product information associated with the offer from the products table
      $.ajax({
        url: "get_product_info.php",
        method: "GET",
        data: { product_id: offer.product_id }, // Send the product_id to the PHP script
        dataType: "json",
        success: function(productResponse) {
          // Update the offersHtml with the product name and image
          offersHtml += "<li>";
          offersHtml += "<img src='prod_images/" + productResponse.image_path + "' alt='Product Image'>";
          offersHtml += "Product: " + productResponse.name + " - Discount: " + offer.discount;
          offersHtml += "</li>";
          userOffersDiv.html(offersHtml); // Set the HTML content
        },
        error: function(xhr, textStatus, errorThrown) {
          console.error("Error retrieving product information:", textStatus, errorThrown);
        }
      });
    });
  },
  error: function(xhr, textStatus, errorThrown) {
    console.error("Error retrieving user offers:", textStatus, errorThrown);
  }
});

  // Retrieve and display user's likes and dislikes
  $.ajax({
    url: "get_user_likes_dislikes.php",
    method: "GET",
    dataType: "json",
    success: function(response) {
      const userLikesDislikesDiv = $("#user-likes-dislikes");
      let likesDislikesHtml = "<ul>"; // Start a list

      // Loop through the likes/dislikes and populate the likesDislikesHtml
      response.forEach(item => {
        likesDislikesHtml += "<li>Likes: " + item.likes + " - Dislikes: " + item.dislikes + "</li>";
      });

      likesDislikesHtml += "</ul>"; // Close the list
      userLikesDislikesDiv.html(likesDislikesHtml); // Set the HTML content
    },
    error: function(xhr, textStatus, errorThrown) {
      console.error("Error retrieving user likes and dislikes:", textStatus, errorThrown);
    }
  });

 // Retrieve and display user's score
 $.ajax({
  url: "get_user_score.php",
  method: "GET",
  dataType: "json",
  success: function(response) {
    const userScoreDiv = $("#user-score");
    userScoreDiv.text("Score: " + response.score + ", Monthly Score: " + response.monthly_score);
  },
  error: function(xhr, textStatus, errorThrown) {
    console.error("Error retrieving user score:", textStatus, errorThrown);
  }
});
   // Retrieve and display user's tokens
   $.ajax({
    url: "get_user_tokens.php",
    method: "GET",
    dataType: "json",
    success: function(response) {
      const userTokensDiv = $("#user-tokens");
      userTokensDiv.text("Tokens: " + response.tokens); // Assuming response contains the user's tokens
    },
    error: function(xhr, textStatus, errorThrown) {
      console.error("Error retrieving user tokens:", textStatus, errorThrown);
    }
  });
});