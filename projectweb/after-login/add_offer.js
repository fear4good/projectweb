$(document).ready(function() {

    let data; // Declare the data variable in a higher scope to make it accessible to other functions
    let selectedProductId;
    var urlParams = new URLSearchParams(window.location.search);
    var marketidParam = urlParams.get('marketid');
    var supermarketId = JSON.parse(marketidParam);

    // Function to populate categories and subcategories
    $.ajax({
      url: "fetch_products.php",
      method: "GET",
      dataType: "json",
      success: function(response) {
        data = response; // Assign the retrieved data to the variable in the higher scope
        const categoryDropdown = $("#category-dropdown");
        // Sort the data array alphabetically based on category_name
        data.sort((a, b) => a.category_name.localeCompare(b.category_name));
  
        data.forEach(function(category) {
          const option = $("<option>").text(category.category_name).val(category.category_id);
          categoryDropdown.append(option);
        });
  
        // Trigger the change event on category dropdown to populate subcategories initially if a category is pre-selected
        categoryDropdown.trigger("change");
      },
      error: function(error) {
        console.error("Error retrieving categories and subcategories:", error);
      }
    });
  
    // Function to populate subcategories based on the selected category
    function populateSubcategories(selectedCategory) {
        const subcategoryDropdown = $("#subcategory-dropdown");
        const productDropdown = $("#product-dropdown");
        subcategoryDropdown.empty().prop("disabled", true);
        productDropdown.empty().prop("disabled", true);
      
        // Add the "Select" option for subcategories
        subcategoryDropdown.append($("<option>").text("Select Subcategory").val(""));
      
        // Find the selected category and populate its subcategories
        const selectedCategoryData = data.find(category => category.category_id === selectedCategory);
        if (selectedCategoryData && selectedCategoryData.subcategories.length > 0) {
          // Sort the subcategories array alphabetically based on subcategory_name
          selectedCategoryData.subcategories.sort((a, b) => a.subcategory_name.localeCompare(b.subcategory_name));
      
          selectedCategoryData.subcategories.forEach(function(subcategory) {
            const subOption = $("<option>").text(subcategory.subcategory_name).val(subcategory.subcategory_id);
            subcategoryDropdown.append(subOption);
          });
      
          // Enable the subcategory dropdown since there are available subcategories
          subcategoryDropdown.prop("disabled", false);
        }
      }
  
    // Function to populate products based on the selected subcategory
    function populateProducts(selectedSubcategory) {
        const productDropdown = $("#product-dropdown");
        productDropdown.empty().prop("disabled", true);
    
        // Add the "Select" option for products
        productDropdown.append($("<option>").text("Select Product").val("").data("product-id", ""));
    
        // Find the selected category and populate its subcategories
        const selectedCategoryData = data.find(category => category.category_id === $("#category-dropdown").val());
        if (selectedCategoryData) {
            const selectedSubcategoryData = selectedCategoryData.subcategories.find(subcategory => subcategory.subcategory_id === selectedSubcategory);
            if (selectedSubcategoryData && selectedSubcategoryData.products.length > 0) {
                // Sort the products array alphabetically based on product_name
                selectedSubcategoryData.products.sort((a, b) => a.product_name.localeCompare(b.product_name));
    
                selectedSubcategoryData.products.forEach(function(product) {
                    const productOption = $("<option>")
                        .text(product.product_name)
                        .val(product.product_name)
                        .data("product-id", product.product_id)
                        .data("min-price", product.min_price);
                    productDropdown.append(productOption);
                });
    
                // Enable the product dropdown since there are available products
                productDropdown.prop("disabled", false);
            }
        }
    }
  
    // Initialize the product search input and suggestions
  const productSearchInput = $("#product-search");
  const productSuggestions = $("#product-suggestions");

  productSearchInput.on("input", function() {
    const searchTerm = $(this).val().toLowerCase();
    const filteredProducts = [];

    if (searchTerm.length >= 3) {
      // Filter products based on the search term
      data.forEach(function(category) {
        category.subcategories.forEach(function(subcategory) {
          subcategory.products.forEach(function(product) {
            if (product.product_name.toLowerCase().includes(searchTerm)) {
              filteredProducts.push(product);
            }
          });
        });
      });

      // Display suggestions
      displayProductSuggestions(filteredProducts);
    } else {
      // Clear suggestions when the search term is too short
      productSuggestions.empty();
    }
  });

  function displayProductSuggestions(products) {
    productSuggestions.empty();

    if (products.length > 0) {
      products.forEach(function(product) {
        const suggestionItem = $("<div>")
          .addClass("product-suggestion")
          .text(product.product_name)
          .data("product-id", product.product_id)
          .data("min-price", product.min_price);

        suggestionItem.click(function() {
          // Populate the selected product when a suggestion is clicked
          const productId = $(this).data("product-id");
          const minPrice = $(this).data("min-price");

          productSearchInput.val(product.product_name);

          // Populate the product dropdown
          $("#product-dropdown")
            .val(product.product_name)
            .data("product-id", productId)
            .data("min-price", minPrice);

          $(".initial-price").val(minPrice);
          selectedProductId = productId;
          $("#submit-button").prop("disabled", false);
          productSuggestions.empty(); // Clear suggestions
        });

        productSuggestions.append(suggestionItem);
      });
    } else {
      const noResultsMessage = $("<div>").addClass("no-results-message").text("No matching products found.");
      productSuggestions.append(noResultsMessage);
    }
  }
  
  
    // Enable the subcategory dropdown when a category is selected
    $("#category-dropdown").change(function () {
      const selectedCategory = $(this).val();
  
      // Populate subcategories based on the selected category
      populateSubcategories(selectedCategory);
  
      // Clear the product dropdown when changing the category
      const productDropdown = $("#product-dropdown");
      productDropdown.empty().prop("disabled", true);
    });
  
    // Enable the product dropdown when a subcategory is selected
    $("#subcategory-dropdown").change(function () {
      const selectedSubcategory = $(this).val();
  
      // Populate products based on the selected subcategory
      populateProducts(selectedSubcategory);
    });

    $("#product-dropdown").change(function () {
        const selectedProductOption = $(this).find("option:selected");
        selectedProductId = selectedProductOption.data("product-id");
        const minPrice = selectedProductOption.data("min-price");
    
        // Set the "Αρχική Τιμή" input to the minimum price of the selected product
        $(".initial-price").val(minPrice);
    
        enableSubmitButton();
    });
    
  
    function enableSubmitButton() {
        const selectedCategory = $("#category-dropdown").val();
        const selectedSubcategory = $("#subcategory-dropdown").val();
        const selectedProduct = $("#product-dropdown").val();
        selectedProductId = $("#product-dropdown").find("option:selected").data("product-id");
        const isCategorySelected = selectedCategory !== "";
        const isSubcategorySelected = selectedSubcategory !== "";
        const isProductSelected = selectedProduct !== "";
      
        // Enable the submit button only when both category, subcategory, and product are selected
        $("#submit-button").prop("disabled", !(isCategorySelected && isSubcategorySelected && isProductSelected));
      }
      
  
    // Implement the click event for the submit button to perform the database search
    $("#submit-button").click(function () {
        const offerPrice = $(".offer-price").val();
        const stock = 1;
    
        // Clear the previous message and classes
        const responseContainer = $("#response-container");
        responseContainer.removeClass("success-message error-message");
    
        // Create the data object to send in the AJAX request
        const offerData = {
          supermarket_id: supermarketId,
          product_id: selectedProductId,
          discount: offerPrice,
          stock: stock
        };
    
        // Send the offer data to the server to insert into the database
        $.ajax({
          url: "add_offer.php", 
          method: "POST",
          dataType: "json",
          data: offerData,
          success: function(response) {
            const serverMessage = response.message;
            responseContainer.text(serverMessage);
    
            // Check if the new offer discount is smaller than 20% of the previous offer discount
            if (response.success) {
                responseContainer.addClass("success-message");
            } else {
              responseContainer.addClass("error-message");
            }
          },
          error: function(error) {
            console.error("Error adding offer:", error);
            // Handle errors if needed
          }
        });
      });
    
      
  
    // Event handler for the Clear button
    $("#clear-button").click(function () {
      // Clear both category, subcategory, and product dropdown selections
      $("#category-dropdown").val("");
      $("#subcategory-dropdown").val("").prop("disabled", true);
      $("#product-dropdown").val("").prop("disabled", true);
  
      // Disable the Submit button after clearing
      $("#submit-button").prop("disabled", true);
    });
  
});
  