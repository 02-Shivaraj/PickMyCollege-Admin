async function fetchStats() {
  try {
    const response = await fetch('/api'); // Make sure this matches your backend route
    const data = await response.json();

    if (data && data.userCount != null && data.collegeCount != null) {
      document.getElementById('userCount').textContent = data.userCount.toLocaleString();
      document.getElementById('collegeCount').textContent = data.collegeCount.toLocaleString();
    } else {
      document.getElementById('userCount').textContent = 'N/A';
      document.getElementById('collegeCount').textContent = 'N/A';
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    document.getElementById('userCount').textContent = 'Error';
    document.getElementById('collegeCount').textContent = 'Error';
  }
}


fetchStats();

// Optional: auto-refresh every 10 seconds
setInterval(fetchStats, 10000);
