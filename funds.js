// Initialize fund counter
const FUND_STORAGE_KEY = 'cleanupCrewFunds';
const GOAL_STORAGE_KEY = 'cleanupCrewGoal';
const DEFAULT_GOAL = 5000;

// Load funds from localStorage
function loadFunds() {
    const stored = localStorage.getItem(FUND_STORAGE_KEY);
    return stored ? parseFloat(stored) : 0;
}

// Load goal from localStorage
function loadGoal() {
    const stored = localStorage.getItem(GOAL_STORAGE_KEY);
    return stored ? parseFloat(stored) : DEFAULT_GOAL;
}

// Display funds on page
function displayFunds() {
    const currentFunds = loadFunds();
    const goal = loadGoal();
   
    const fundAmount = document.getElementById('fundAmount');
    const fundGoal = document.getElementById('fundGoal');
    const progressFill = document.getElementById('progressFill');
   
    if (fundAmount) {
        fundAmount.textContent = '$' + currentFunds.toFixed(2);
    }
   
    if (fundGoal) {
        fundGoal.textContent = '$' + goal.toFixed(2);
    }
   
    if (progressFill) {
        const percentage = (currentFunds / goal) * 100;
        progressFill.style.width = Math.min(percentage, 100) + '%';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayFunds();
   
    // Refresh display every 5 seconds to sync across tabs
    setInterval(displayFunds, 5000);
});

// Helper functions for manual code updates
// Usage: updateFunds(500) to set funds to $500
function updateFunds(amount) {
    localStorage.setItem(FUND_STORAGE_KEY, parseFloat(amount).toFixed(2));
    displayFunds();
    console.log(`Funds updated to: $${parseFloat(amount).toFixed(2)}`);
}

// Usage: addToFunds(50) to add $50 to current total
function addToFunds(amount) {
    const current = loadFunds();
    const newTotal = current + parseFloat(amount);
    localStorage.setItem(FUND_STORAGE_KEY, newTotal.toFixed(2));
    displayFunds();
    console.log(`Added: $${parseFloat(amount).toFixed(2)}. New total: $${newTotal.toFixed(2)}`);
}

// Usage: setGoal(10000) to set goal to $10000
function setGoal(amount) {
    localStorage.setItem(GOAL_STORAGE_KEY, parseFloat(amount).toFixed(2));
    displayFunds();
    console.log(`Goal set to: $${parseFloat(amount).toFixed(2)}`);
}

// Expose functions globally
window.updateFunds = updateFunds;
window.addToFunds = addToFunds;
window.setGoal = setGoal;