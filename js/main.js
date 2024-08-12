//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getArt);

function getArt() {
  const term = document.querySelector('input').value;
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${term}`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      let arr = data.objectIDs;
      let random = Math.floor(Math.random() * arr.length);
      fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${arr[random]}`
      )
        .then((res) => res.json())
        .then((data) => {
          document.querySelector('h2').innerText = data.title;
          document.querySelector('h3').innerText = data.artistDisplayName;
          if (data.primaryImage === '') {
            document.querySelector('h3').innerText =
              "Image not Found. Here's some famous sunflowers instead!";
            document.querySelector('img').src =
              'img/Vincent_Willem_van_Gogh_127.jpg';
          } else {
            document.querySelector('img').src = data.primaryImage;
          }
        });
      document.querySelector('input').value = '';
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
