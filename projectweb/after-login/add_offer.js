$(document).ready(function() {

    let data;
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
        data = response;
        const categoryDropdown = $("#category-dropdown");
        data.sort((a, b) => a.category_name.localeCompare(b.category_name));
  
        data.forEach(function(category) {
          const option = $("<option>").text(category.category_name).val(category.category_id);
          categoryDropdown.append(option);
        });
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
      
        subcategoryDropdown.append($("<option>").text("Select Subcategory").val(""));
      
        const selectedCategoryData = data.find(category => category.category_id === selectedCategory);
        if (selectedCategoryData && selectedCategoryData.subcategories.length > 0) {
          selectedCategoryData.subcategories.sort((a, b) => a.subcategory_name.localeCompare(b.subcategory_name));
      
          selectedCategoryData.subcategories.forEach(function(subcategory) {
            const subOption = $("<option>").text(subcategory.subcategory_name).val(subcategory.subcategory_id);
            subcategoryDropdown.append(subOption);
          });
    
          subcategoryDropdown.prop("disabled", false);
        }
      }
  
    // Function to populate products based on the selected subcategory
    function populateProducts(selectedSubcategory) {
        const productDropdown = $("#product-dropdown");
        productDropdown.empty().prop("disabled", true);
    
        productDropdown.append($("<option>").text("Select Product").val("").data("product-id", ""));
    
        const selectedCategoryData = data.find(category => category.category_id === $("#category-dropdown").val());
        if (selectedCategoryData) {
            const selectedSubcategoryData = selectedCategoryData.subcategories.find(subcategory => subcategory.subcategory_id === selectedSubcategory);
            if (selectedSubcategoryData && selectedSubcategoryData.products.length > 0) {
                selectedSubcategoryData.products.sort((a, b) => a.product_name.localeCompare(b.product_name));
    
                selectedSubcategoryData.products.forEach(function(product) {
                    const productOption = $("<option>")
                        .text(product.product_name)
                        .val(product.product_name)
                        .data("product-id", product.product_id)
                        .data("min-price", product.min_price);
                    productDropdown.append(productOption);
                });
    
                productDropdown.prop("disabled", false);
            }
        }
    }
  
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

      displayProductSuggestions(filteredProducts);
    } else {
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
          const productId = $(this).data("product-id");
          const minPrice = $(this).data("min-price");

          productSearchInput.val(product.product_name);

          $("#product-dropdown")
            .val(product.product_name)
            .data("product-id", productId)
            .data("min-price", minPrice);

          $(".initial-price").val(minPrice);
          selectedProductId = productId;
          $("#submit-button").prop("disabled", false);
          productSuggestions.empty();
        });

        productSuggestions.append(suggestionItem);
      });
    } else {
      const noResultsMessage = $("<div>").addClass("no-results-message").text("No matching products found.");
      productSuggestions.append(noResultsMessage);
    }
  }
  
  
    $("#category-dropdown").change(function () {
      const selectedCategory = $(this).val();
      populateSubcategories(selectedCategory);
      const productDropdown = $("#product-dropdown");
      productDropdown.empty().prop("disabled", true);
    });
  
 
    $("#subcategory-dropdown").change(function () {
      const selectedSubcategory = $(this).val();
      populateProducts(selectedSubcategory);
    });

    $("#product-dropdown").change(function () {
        const selectedProductOption = $(this).find("option:selected");
        selectedProductId = selectedProductOption.data("product-id");
        const minPrice = selectedProductOption.data("min-price");
  
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
      
        $("#submit-button").prop("disabled", !(isCategorySelected && isSubcategorySelected && isProductSelected));
      }
      

    $("#submit-button").click(function () {
        const offerPrice = $(".offer-price").val();
        const stock = 1;
    
        const responseContainer = $("#response-container");
        responseContainer.removeClass("success-message error-message");
        const offerData = {
          supermarket_id: supermarketId,
          product_id: selectedProductId,
          discount: offerPrice,
          stock: stock
        };
        $.ajax({
          url: "add_offer.php", 
          method: "POST",
          dataType: "json",
          data: offerData,
          success: function(response) {
            const serverMessage = response.message;
            responseContainer.text(serverMessage);
    
            if (response.success) {
                responseContainer.addClass("success-message");
            } else {
              responseContainer.addClass("error-message");
            }
          },
          error: function(error) {
            console.error("Error adding offer:", error);
          }
        });
      });
    
      
  
    // Event handler for the Clear button
    $("#clear-button").click(function () {
      $("#category-dropdown").val("");
      $("#subcategory-dropdown").val("").prop("disabled", true);
      $("#product-dropdown").val("").prop("disabled", true);

      $("#submit-button").prop("disabled", true);
    });
  
});
  