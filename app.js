
// Hämta HTML-elementet där skämtet ska visas
const jokeElement = document.getElementById('joke');

// Hämta knappen som ska användas för att hämta nytt skämt
const jokeBtn = document.getElementById('jokeBtn');

// Kör funktionen som hämtar ett skämt direkt när sidan laddas
generateJoke();

function generateJoke() {
  // Skapa ett inställningsobjekt (config) för vårt fetch-anrop
  const config = {
    headers: {                        // Vi skickar med vilka typer av svar vi accepterar
      Accept: 'application/json',     // Säger till servern: "skicka data i JSON-format"
    },
  };

  // Gör ett API-anrop till sidan som levererar "dad jokes"
  fetch('https://icanhazdadjoke.com', config)
    .then((res) => res.json())        // När vi får svar: omvandla texten till ett JSON-objekt
    .then((data) => {                 // När vi fått JSON-datan:
      jokeElement.innerHTML = data.joke;  // Visa själva skämtet inne i HTML-elementet på sidan
    });
}

// Lägg till en lyssnare på knappen
// När användaren klickar på knappen körs funktionen igen och hämtar ett nytt skämt
jokeBtn.addEventListener('click', generateJoke);
