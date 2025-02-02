$(document).ready(function () {
    // Particles.js configuration
    particlesJS.load('particles-js', 'assets/scripts/particles.json', function () {
        console.log('Particles.js loaded.');
    });


    // Custom Cursor
    const $customCursor = $("#custom-cursor");

    // Playlist
    const songs = [
        {
            title: "DM",
            artist: "41",
            cover: "https://files.catbox.moe/ysrvmr.jpg",
            video: "https://files.catbox.moe/6rvjed.mp4"
        },
        {
            title: "Yes Freestyle",
            artist: "Sleepy Hallow - ft. Sheff G",
            cover: "https://files.catbox.moe/j0vbgh.jpg",
            video: "https://files.catbox.moe/5ipzx0.mp4"
        },
        {
            title: "TGIF",
            artist: "GloRilla",
            cover: "https://files.catbox.moe/tobqkg.png",
            video: "https://files.catbox.moe/2afmpw.mp4"
        },
        {
            title: "Opp Huntin",
            artist: "Kenzo Balla",
            cover: "https://files.catbox.moe/rc7et2.jpg",
            video: "https://files.catbox.moe/gx8gir.mp4"
        }
    ];

    let currentSongIndex = Math.floor(Math.random() * songs.length);
    
    const $videoElement = $("#bg-video");
    const $songTitle = $(".song-title");
    const $songArtist = $(".song-artist");
    const $songCover = $(".song-cover");
    const $playPauseButton = $("#play-pause");
    const $volumeSlider = $("#volume-slider");
    const $progressBar = $("#progress-bar");
    const $currentTime = $("#current-time");
    const $duration = $("#duration");

    let isInitialized = false; // Track if video initialized

    // Initialize video playback only after interaction
    $(document).on("click", function () {
        if (!isInitialized) {
            isInitialized = true;
            $videoElement[0].play();
        }
    });

    // Update player UI and media
    function updatePlayer() {
        const song = songs[currentSongIndex]; 
        $songTitle.text(song.title);
        $songArtist.text(song.artist);
        $songCover.attr("src", song.cover);
        $videoElement.attr("src", song.video);
        $videoElement[0].load();
        $videoElement[0].play();
        $playPauseButton.text("⏸");
    }
    
    $playPauseButton.on("click", function () {
        if ($videoElement[0].paused) {
            $videoElement[0].play();
            $(this).text("❚❚");
        } else { 
            $videoElement[0].pause();
            $(this).text("▶");
        }
    });
    
    $("#prev-song").on("click", function () {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updatePlayer();
    });
    
    $("#next-song").on("click", function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayer();
    });
    
    $volumeSlider.on("input", function () {
        $videoElement[0].volume = $(this).val() / 100;
    });
    
    $videoElement.on("timeupdate", function () {
        const currentTime = $videoElement[0].currentTime;
        const duration = $videoElement[0].duration;
        $progressBar.val((currentTime / duration) * 100);
        $currentTime.text(formatTime(currentTime));
        $duration.text(formatTime(duration));
    });
    
    $videoElement.on("ended", function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length; // Move to the next song in the playlist
        updatePlayer(); // Update the player to the next song
    });
    
    $progressBar.on("input", function () {
        const duration = $videoElement[0].duration;
        $videoElement[0].currentTime = ($(this).val() / 100) * duration;
    });
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }
    
    // Initialize player with the first song
    updatePlayer();

    // Custom Cursor Behavior
    $(document).on("mousemove", function (e) {
        $customCursor.css({
            display: "block",
            top: e.pageY + "px",
            left: e.pageX + "px",
            opacity: 1,
            transition: "opacity 0.3s ease, transform 0.3s ease",
        });
    }).on("mouseleave", function () {
        $customCursor.css({
            opacity: 0,
            transition: "opacity 0.3s ease",
        });
    });

    // Keyboard Navigation
    $(document).on("keydown", function (e) {
        if (e.key === " ") { // Spacebar for play/pause
            e.preventDefault();
            $playPauseButton.trigger("click");
        } else if (e.key === "ArrowRight") { // Right arrow for next song
            $("#next-song").trigger("click");
        } else if (e.key === "ArrowLeft") { // Left arrow for previous song
            $("#prev-song").trigger("click");
        }
    });

    // Tic-Tac-Toe Game (User vs AI)
    let gameActive = false;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let difficulty = 'easy'; // Default difficulty
    let isPlayerTurn = true;
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Get the existing Tic-Tac-Toe container from index.html
    const gameContainer = $("#tictactoe-container");
    const resetButton = $("#reset-game");

    // Hide the game on page load
    gameContainer.hide();

    // Show difficulty selection before game starts
    function showDifficultySelection() {
        gameContainer.html(`
            <h2 style="color: #FFD700;">Tic-Tac-Toe</h2>
            <div id="difficulty-select">
                <p style="color: #FFD700;">Select Difficulty:</p>
                <button class="difficulty-btn" data-difficulty="easy">Easy</button>
                <button class="difficulty-btn" data-difficulty="medium">Medium</button>
                <button class="difficulty-btn" data-difficulty="hard">Hard</button>
            </div>
            <div class="status-message"></div>
            <div class="tictactoe-grid" style="display: none;">
                ${Array(9).fill('').map((_, i) => `<div class="game-cell" data-cell-index="${i}"></div>`).join('')}
            </div>
            <button id="reset-game" style="display: none;">Reset Game</button>
        `);

        // Add event listeners after updating the HTML
        $(".difficulty-btn").on("click", function () {
            setDifficulty($(this).data("difficulty"));
        });

        $(".game-cell").on("click", handleCellClick);
        $("#reset-game").on("click", resetGame);
    }

    // Show/Hide the game when the game icon is clicked
    $("#game-toggle").on("click", function () {
        if (gameContainer.is(":visible")) {
            gameContainer.fadeOut();
        } else {
            showDifficultySelection();
            gameContainer.fadeIn();
        }
    });

    function setDifficulty(level) {
        difficulty = level;
        $("#difficulty-select").hide();
        $(".tictactoe-grid").show();
        $("#reset-game").show();
        $(".status-message").text("Your turn! (X)");
        gameActive = true;
        isPlayerTurn = true;
    }

    function handleCellClick(event) {
        const clickedCell = $(event.target);
        const cellIndex = parseInt(clickedCell.attr('data-cell-index'));
    
        // Prevent multiple clicks or clicking when it's not the player's turn
        if (!isPlayerTurn || !gameActive || gameState[cellIndex] !== '') return;
    
        gameState[cellIndex] = currentPlayer;
        clickedCell.text(currentPlayer);
        clickedCell.css("pointer-events", "none"); // Disable further clicks on this cell
    
        if (checkWinner(currentPlayer)) {
            gameActive = false;
            $(".status-message").text(`${currentPlayer} wins!`);
            return;
        }
    
        if (checkDraw()) {
            gameActive = false;
            $(".status-message").text("It's a draw!");
            return;
        }
    
        currentPlayer = 'O';
        isPlayerTurn = false;
        $(".status-message").text("Computer's turn...");
    
        setTimeout(makeComputerMove, 500);
    }

    function makeComputerMove() {
        if (!gameActive) return;
    
        let move;
        switch (difficulty) {
            case 'easy':
                move = getRandomMove();
                break;
            case 'medium':
                move = Math.random() < 0.5 ? getBestMove() : getRandomMove();
                break;
            case 'hard':
                move = getBestMove();
                break;
        }
    
        gameState[move] = 'O';
        $(`.game-cell[data-cell-index="${move}"]`).text('O');
        $(`.game-cell[data-cell-index="${move}"]`).css("pointer-events", "none"); // Disable further clicks
    
        if (checkWinner('O')) {
            gameActive = false;
            $(".status-message").text("Computer wins!");
            return;
        }
    
        if (checkDraw()) {
            gameActive = false;
            $(".status-message").text("It's a draw!");
            return;
        }
    
        currentPlayer = 'X';
        isPlayerTurn = true;
        $(".status-message").text("Your turn! (X)");
    }

    function getRandomMove() {
        const emptyCells = gameState.reduce((acc, cell, index) => {
            if (cell === '') acc.push(index);
            return acc;
        }, []);
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    function getBestMove() {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === '') {
                gameState[i] = 'O';
                let score = minimax(gameState, 0, false);
                gameState[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    function minimax(board, depth, isMaximizing) {
        if (checkWinnerForMinimax('O')) return 10 - depth;
        if (checkWinnerForMinimax('X')) return depth - 10;
        if (checkDraw()) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function checkWinnerForMinimax(player) {
        return winningConditions.some(condition => {
            return condition.every(index => gameState[index] === player);
        });
    }

    function checkWinner(player) {
        return winningConditions.some(condition => {
            return condition.every(index => gameState[index] === player);
        });
    }

    function checkDraw() {
        return gameState.every(cell => cell !== '');
    }

    function resetGame() {
        gameActive = false;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        isPlayerTurn = true;
        $(".game-cell").text('');
        $(".game-cell").css("pointer-events", "auto"); // Re-enable clicks
        $(".status-message").text('');
        $("#difficulty-select").show();
        $(".tictactoe-grid").hide();
        $("#reset-game").hide();
    }

    // Initialize the game
    showDifficultySelection();

    // Hide Tic-Tac-Toe game on startup
    $("#tictactoe-container").hide();


// UI Toggle - Hide everything except the eye icon
$(".ui-toggle").on("click", function () {
    $(".content-container, .social-links, .music-player, #game-toggle, .controller-icon").fadeToggle();
    $(".eye-icon").toggleClass("hidden");

    // Ensure Tic-Tac-Toe is always hidden when UI is toggled off
    if ($(".eye-icon").hasClass("hidden")) {
        $("#tictactoe-container").hide();
    }
});
 
    // Reset Game Button
    $("#reset-game").on("click", function () {
        board = [["", "", ""], ["", "", ""], ["", "", ""]];
        $(".game-cell").text("");
    });
});



