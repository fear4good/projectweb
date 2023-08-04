$(document).ready(function() {
  // Function to populate categories and subcategories
  function populateCategoriesAndSubcategories() {
      $.ajax({
          url: "fetch_products.php",
          method: "GET",
          dataType: "json",
          success: function(response) {
              const categoryDropdown = $("#category-dropdown");
              const subcategoryDropdown = $("#subcategory-dropdown");
              const productDropdown = $("#product-dropdown");

              // Populate categories dropdown
              categoryDropdown.empty();
              categoryDropdown.append('<option value="">Select Category</option>');
              response.forEach(function(category) {
                  const option = $("<option>").text(category.category_name).val(category.category_id);
                  categoryDropdown.append(option);
              });

              // Event handler for category dropdown change
              categoryDropdown.on("change", function() {
                  const selectedCategory = $(this).val();
                  const selectedSubcategory = subcategoryDropdown.val();

                  // Populate subcategories dropdown based on the selected category
                  subcategoryDropdown.empty();
                  subcategoryDropdown.append('<option value="">Select Subcategory</option>');
                  const selectedCategoryData = response.find(category => category.category_id === selectedCategory);
                  if (selectedCategoryData) {
                      selectedCategoryData.subcategories.forEach(function(subcategory) {
                          const subOption = $("<option>").text(subcategory.subcategory_name).val(subcategory.subcategory_id);
                          subcategoryDropdown.append(subOption);
                      });
                  }

                  // Populate products dropdown based on the selected subcategory
                  productDropdown.empty().prop("disabled", true);
              });

              // Event handler for subcategory dropdown change
              subcategoryDropdown.on("change", function() {
                  const selectedSubcategory = $(this).val();
                  const selectedCategoryData = response.find(category => category.category_id === categoryDropdown.val());
                  if (selectedCategoryData) {
                      const selectedSubcategoryData = selectedCategoryData.subcategories.find(subcategory => subcategory.subcategory_id === selectedSubcategory);
                      if (selectedSubcategoryData) {
                          productDropdown.empty();
                          productDropdown.append('<option value="">Select Product</option>');
                          selectedSubcategoryData.products.forEach(function(product) {
                              const productOption = $("<option>").text(product.product_name).val(product.product_id);
                              productDropdown.append(productOption);
                          });
                          productDropdown.prop("disabled", false);
                      }
                  }
              });
          },
          error: function(error) {
              console.error("Error retrieving categories and subcategories:", error);
          }
      });
  }

  // Call the function to populate categories and subcategories on page load
  populateCategoriesAndSubcategories();
});






