async function fetchStats(){
    const response = await fetch('/api'); 
    const data = await response.json();

      document.getElementById('userCount').textContent = data.st[0].count.toLocaleString();
      document.getElementById('collegeCount').textContent = data.st[1].count.toLocaleString();
}

fetchStats();

// Optional: auto-refresh every 10 seconds
setInterval(fetchStats, 2000);
