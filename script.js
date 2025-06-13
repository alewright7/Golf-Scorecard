let holeNumber = 1;
let maxHoles = 9;

const modeSelect = document.getElementById('mode');
const scoreInput = document.getElementById('score');
const scoreTable = document.getElementById('scoreTable').querySelector('tbody');
const addBtn = document.getElementById('addBtn');
const toggle = document.getElementById('darkModeToggle');

// Handle hole mode
modeSelect.addEventListener('change', () => {
    maxHoles = parseInt(modeSelect.value);
    resetScorecard();
});

// Add score to table
function enterScore() {
    const scoreValue = parseInt(scoreInput.value);

    if (!isNaN(scoreValue) && scoreValue > 0) {
        const row = document.createElement('tr');

        const holeCell = document.createElement('td');
        holeCell.textContent = holeNumber;

        const scoreCell = document.createElement('td');
        scoreCell.textContent = scoreValue;

        row.appendChild(holeCell);
        row.appendChild(scoreCell);
        scoreTable.appendChild(row);

        holeNumber++;
        scoreInput.value = '';

        if (holeNumber > maxHoles) {
            addBtn.disabled = true;
            addBtn.textContent = "Finished!";
        }
    } else {
        alert("Please enter a valid positive number.");
    }
}

// Reset the scorecard
function resetScorecard() {
    holeNumber = 1;
    scoreTable.innerHTML = '';
    addBtn.disabled = false;
    addBtn.textContent = "Add Score";
    scoreInput.value = '';
}

// Theme logic
function applyTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    toggle.checked = isDark;
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
}

toggle.addEventListener('change', () => {
    applyTheme(toggle.checked);
});

// On load
document.addEventListener('DOMContentLoaded', () => {
    resetScorecard();

    // Check local storage or system preference
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved === 'true' || (saved === null && prefersDark));
});