
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
});  
