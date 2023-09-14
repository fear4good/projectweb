$(document).ready(function() {
$.ajax({
  url: 'get_profile.php',
  type: 'GET',
  dataType: 'json',
  success: function(userData) {
    var user = userData[0];

    var usernameField = document.getElementById("username");
    var emailField = document.getElementById("email");

    usernameField.value = user.username;
    emailField.value = user.email;
  }
});

$.ajax({
  url: "get_user_offers.php",
  method: "GET",
  dataType: "json",
  success: function(response) {
    const userOffersDiv = $("#user-offers");
    let offersHtml = "<ul>";

    // Loop through the offers
    response.forEach(offer => {
      $.ajax({
        url: "get_product_info.php",
        method: "GET",
        data: { product_id: offer.product_id },
        dataType: "json",
        success: function(productResponse) {
          offersHtml += "<li>";
          offersHtml += "<img src='prod_images/" + productResponse.image_path + "' alt='Product Image'>";
          offersHtml += "Product: " + productResponse.name + " - Discount: " + offer.discount;
          offersHtml += " Date: " + offer.date + " Likes: " + offer.likes + " Dislikes: " + offer.dislikes ;
          offersHtml += "</li>";
          userOffersDiv.html(offersHtml);
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

// Retrieve and display user's likes
$.ajax({
  url: "get_user_likes.php",
  method: "GET",
  dataType: "json",
  success: function(response) {
    const userLikesDiv = $("#user-likes");
    let likesHtml = "<ul>";

    response.forEach(like => {
      $.ajax({
        url: "get_offer_info.php",
        method: "GET",
        data: { offer_id: like.offer_id },
        dataType: "json",
        success: function(offerResponse) {
          $.ajax({
            url: "get_product_info.php",
            method: "GET",
            data: { product_id: offerResponse.product_id },
            dataType: "json",
            success: function(productResponse) {
              likesHtml += "<li>";
              likesHtml += "<img src='prod_images/" + productResponse.image_path + "' alt='Product Image'>";
              likesHtml += "Product: " + productResponse.name + " - Discount: " + offerResponse.discount;
              likesHtml += " Date: " + offerResponse.date + " Likes: " + offerResponse.likes + " Dislikes: " + offerResponse.dislikes ;
              likesHtml += "</li>";
              userLikesDiv.html(likesHtml);

            },
            error: function(textStatus, errorThrown) {
              console.error("Error retrieving product information:", textStatus, errorThrown);
            }
          });      
        },
        error: function(textStatus, errorThrown) {
          console.error("Error retrieving offer information:", textStatus, errorThrown);
        }
      });
    });

    likesHtml += "</ul>";
    userLikesDiv.html(likesHtml);
  },
  error: function(xhr, textStatus, errorThrown) {
    console.error("Error retrieving user likes:", textStatus, errorThrown);
  }
});

// Retrieve and display user's dislikes
$.ajax({
  url: "get_user_dislikes.php",
  method: "GET",
  dataType: "json",
  success: function(response) {
    const userDislikesDiv = $("#user-dislikes");
    let disLikesHtml = "<ul>";

    response.forEach(like => {
      $.ajax({
        url: "get_offer_info.php",
        method: "GET",
        data: { offer_id: like.offer_id },
        dataType: "json",
        success: function(offerResponse) {
          $.ajax({
            url: "get_product_info.php",
            method: "GET",
            data: { product_id: offerResponse.product_id },
            dataType: "json",
            success: function(productResponse) {
              disLikesHtml += "<li>";
              disLikesHtml += "<img src='prod_images/" + productResponse.image_path + "' alt='Product Image'>";
              disLikesHtml += "Product: " + productResponse.name + " - Discount: " + offerResponse.discount;
              disLikesHtml += " Date: " + offerResponse.date + " Likes: " + offerResponse.likes + " Dislikes: " + offerResponse.dislikes ;
              disLikesHtml += "</li>";
              userDislikesDiv.html(disLikesHtml);

            },
            error: function(xhr, textStatus, errorThrown) {
              console.error("Error retrieving product information:", textStatus, errorThrown);
            }
          });


          
        },
        error: function(xhr, textStatus, errorThrown) {
          console.error("Error retrieving offer information:", textStatus, errorThrown);
        }
      });
    });

    disLikesHtml += "</ul>";
    userDislikesDiv.html(disLikesHtml);
  },
  error: function(xhr, textStatus, errorThrown) {
    console.error("Error retrieving user likes:", textStatus, errorThrown);
  }
});

 // Retrieve and display user's score
 $.ajax({
  url: "get_user_score.php",
  method: "GET",
  dataType: "json",
  success: function(response) {
    const userScoreDiv = $("#user-score");
    userScoreDiv.text(response.score);
    const userMScoreDiv = $("#user-Mscore");
    userMScoreDiv.text(response.monthly_score);
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
      userTokensDiv.text(response.total_tokens);
      const userMTokensDiv = $("#user-Mtokens");
      userMTokensDiv.text(response.monthly_tokens);
    },
    error: function(textStatus, errorThrown) {
      console.error("Error retrieving user tokens:", textStatus, errorThrown);
    }
  });
});
