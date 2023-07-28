$(document).ready(function() 
{
    // Handle the change event of the chart select dropdown
    $('#chart-select').change(function() 
    {
        var chart = $(this).val();
        if (chart === '3a') 
        {
            // If the admin selected chart 3a, show the date inputs
            $('#date-inputs').show();
        } 
        else 
        {
            // If the admin selected something else, hide the date inputs
            $('#date-inputs').hide();
        }
    });


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
                new Chart(document.getElementById('chart'), {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Offers',
                            data: dataset,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        });
        
        }
    });
});  
