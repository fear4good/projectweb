$(document).ready(function() 
{
    // Handle the change event of the chart select dropdown
    $('#chart-select').change(function() 
    {
        var chart = $(this).val();
        if (chart === '3a') 
        {
            $('#date-inputs').show();
            $('#discount-inputs').hide(); 
        } 
        else if (chart === '3b') 
        {
            $('#date-inputs').hide();
            $('#discount-inputs').show(); 
        }
    });

    //OFFERS
    // Handle the click event of the show button
    $('#show-button').click(function() 
    {
        var year = $('#year').val();
        var month = $('#month').val();
        if (year && month) 
        {
        // If the year and month inputs are not empty, fetch the data
        $.ajax({
            url: 'fetch_offers_admin.php',
            method: 'GET',
            data: {year: year, month: month},
            success: function(data) {
                // Parse the returned data as JSON
                var offers = JSON.parse(data);
        
                // Log the data to the console for debugging
                console.log(offers);
        
                // Prepare the data for the chart
                var daysInMonth = new Date(year, month, 0).getDate();
                var labels = Array.from({length: daysInMonth}, (_, i) => i + 1);
                var dataset = Array.from({length: daysInMonth}, () => 0);
                offers.forEach(function(offer) {
                    dataset[offer.day - 1] = offer.count;
                });
        
                // Create the chart
                const ctx = document.getElementById('chart');

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Offers',
                            data: dataset,
                            backgroundColor: '#3CC5F8',
                            borderColor: '4668F0',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            title: {
                                display: true,
                                text: 'Offers'
                                
                            }
                        },
                        scales: {
                            x: {
                                border:{
                                    color:'black'
                                },
                                title: {
                                    color:'black',
                                    display: true,
                                    text: 'Days'   
                                },
                                ticks: {
                                    color:'black',
                                },
                            },
                            y: {
                                border:{
                                    color:'black'
                                },
                                title: {
                                    color:'black',
                                    display: true,
                                    text: 'Quantity'
                                },
                                ticks: {
                                    color:'black',
                                    stepSize: 1,
                                    beginAtZero: true
                                }
                            }
                        }
                    }
                });
            }
        });
        
        }
    });

    $('#clear-button').click(function() {
        const c = Chart.getChart("chart")
        if (c) c.destroy()
    });

    
       
    //DISCOUNT
    let data; // Declare the data variable in a higher scope to make it accessible to other functions

    // Function to populate categories and subcategories
    $.ajax({
        url: "fetch_products.php",
        method: "GET",
        dataType: "json",
        success: function(response) {
            data = response; // Assign the retrieved data to the variable in the higher scope
            const categoryDropdown = $("#category-dropdown");
            const subcategoryDropdown = $("#subcategory-dropdown");
            console.log(data);
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
      
    // Enable the subcategory dropdown when a category is selected
    $("#category-dropdown").change(function () {
        const selectedCategory = $(this).val();
      
        // Populate subcategories based on the selected category
        populateSubcategories(selectedCategory);
        enableSubmitButton(); 
    });
          
        
    function enableSubmitButton() {
        const selectedCategory = $("#category-dropdown").val();
        const selectedSubcategory = $("#subcategory-dropdown").val();
        const isCategorySelected = selectedCategory !== "";
        const isSubcategorySelected = selectedSubcategory !== "";
    
        // Enable the submit button only when both category, subcategory, 
            $("#show-button2").prop("disabled", !(isCategorySelected || isSubcategorySelected));
    }
          
    // Event handler for the Clear button
    $("#clear-button").click(function () {
        // Clear both category, subcategory, and product dropdown selections
        $("#category-dropdown").val("");
        $("#subcategory-dropdown").val("").prop("disabled", true);
        $("#product-dropdown").val("").prop("disabled", true);
      
        // Disable the Submit button after clearing
        $("#show-button2").prop("disabled", true);
    });
    
});
      
