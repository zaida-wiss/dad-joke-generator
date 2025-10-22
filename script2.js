//Driver: Zaida
//Navigator: Ahm och Sahar

const jokeElement = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');


generateJoke();

function generateJoke() {
    const config = {
        headers: {
            Accept: 'application/json',
        },
    };
    fetch('https://icanhazdadjoke.com/', config)
    .then((res) => res.json())
    .then((data) => {jokeElement.innerHTML=data.joke;})
    .catch((error) => {console.log('error',error);
    jokeElement.innerHTML = 'Something is wrong...';
    });
}
jokeBtn.addEventListener('click', generateJoke);