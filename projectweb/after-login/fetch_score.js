var userType = document.getElementById('usertype').getAttribute('data-usertype');
if(userType === 'user') {
    $(document).ready(function() {
        $.ajax({
        url: "fetch_score.php",
        method: "GET",
        dataType: "json",
        success: function(data) {
            // Update the score on the page
            $('.user-score').text('Your Score: ' + data.score);
        }
    });
    
    });
}
