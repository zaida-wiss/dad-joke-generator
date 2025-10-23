
fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: `
      {
        user(login: "zaida-wiss") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `
  })
})
  .then(res => res.json())
  .then(data => {
    const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
    console.log(weeks); // här har du alla datum, antal commits och färger
  })
  .catch(err => console.error(err));

  
 const grid = document.getElementById('commit-grid');

// Testdata: slumpa 365 dagar med olika aktivitetsnivåer
for (let i = 0; i < 365; i++) {
  const div = document.createElement('div');
  div.classList.add('commit-day');

  // Slumpa "commit-nivå" 0–4 → olika gröna nyanser
  const level = Math.floor(Math.random() * 5);
  const colors = ['#2d2d2d', '#254d2d', '#2e7d32', '#43a047', '#66bb6a'];
  div.style.backgroundColor = colors[level];

  grid.appendChild(div);
} 