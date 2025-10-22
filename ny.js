//Hitta HTML-elementet där skämtet skall visas
const jokeElement = document.getElementById('joke');

//Hitta knappen som ska användas för att hämta nytt skämt
const jokeBtn= document.getElementById('jokeBtn');

generateJoke();
function generateJoke() { //skapa och kör en funktion som genererat ett skämt
const config = {          
  headers: {
    'Accept': 'application/json',
  },
};
fetch('https://icanhazdadjoke.com/', config)
  .then((res) => res.json())
  .then((data) => {
    jokeElement.innerHTML = data.joke;
  });
}

jokeBtn.addEventListener('click', generateJoke);