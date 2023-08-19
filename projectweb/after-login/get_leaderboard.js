const recordsPerPage = 10;
let currentPage = 1;

function displayLeaderboard(data) {
    const leaderboardBody = $('#leaderboardBody');
    leaderboardBody.empty();

    $.each(data, function (i, item) {
        const row = $('<tr>');
        row.append($('<td>').text(i + 1));
        row.append($('<td>').text(item.username));
        row.append($('<td>').text(item.score));
        leaderboardBody.append(row);
    });
}

function updatePagination(totalPages) {
    const pagination = $('#pagination');
    pagination.empty();

    for (let i = 1; i <= totalPages; i++) {
        const button = $('<button>').text(i);
        button.on('click', function () {
            currentPage = i;
            fetchLeaderboardData();
        });

        if (i === currentPage) {
            button.prop('disabled', true);
        }

        pagination.append(button);
    }
}


function fetchLeaderboardData() {
    $.ajax({
        url: 'get_leaderboard.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const startIdx = (currentPage - 1) * recordsPerPage;
            const endIdx = startIdx + recordsPerPage;
            const displayedData = data.slice(startIdx, endIdx);
            displayLeaderboard(displayedData);

            const totalPages = Math.ceil(data.length / recordsPerPage);
            updatePagination(totalPages);
            
        },
        error: function (error) {
            console.error('Error fetching leaderboard data:', error);
        }
    });
}

fetchLeaderboardData();