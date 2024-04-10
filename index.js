const factText = document.querySelector(".fact");
const factBtn = document.querySelector("button");
const authorName = document.querySelector(".name");
const catImage = document.querySelector("#img");
let currentFactIndex = 0;

factBtn.addEventListener("click", newCatFact);

function newCatFact() {
  factBtn.classList.add("loading");
  factBtn.innerText = "Loading Fact...";
  const cat = {
    "id": "1",
    "name": "Woody",
    "image": "https://unsplash.com/photos/tuxedo-cat-in-brown-cardboard-box-BsXeYX3efOI",
    "facts": "Cats have a special reflective layer behind their retinas called the 'tapetum lucidum' which enhances their night vision.",
    "source": "Animal Planet",
    "author": "Emily Williams"
  };
  fetch('http://localhost:3000/cats', {
    method: 'POST',
    body: JSON.stringify(cat),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      currentFactIndex++;
      fetchCatFact(currentFactIndex);
    })
    .catch(error => {
      console.error('Error posting new cat fact:', error);
      handleFetchError();
    });
}

function fetchCatFact(index) {
  fetch('http://localhost:3000/cats?index=`${index}`')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 0) {
        factText.innerText = data[0].facts;
        authorName.innerText = data[0].author;
      } else {
        factText.innerText = "No more facts available.";
        authorName.innerText = "";
      }
      factBtn.classList.remove("loading");
      factBtn.innerText = "New Fact";
    })
    .catch(error => {
      console.error('Error fetching cat facts:', error);
      handleFetchError();
    });
}

function handleFetchError() {
  factText.innerText = "Failed to fetch facts. Please try again later.";
  authorName.innerText = "";
  factBtn.classList.remove("loading");
  factBtn.innerText = "New Fact";
}

catImage.addEventListener("mouseover", () => {
  catImage.style.transform = "scale(1.0)"; // Zoom in effect
  catImage.style.transition = "transform 0.3s"; // Smooth transition
});

catImage.addEventListener("mouseout", () => {
  catImage.style.transform = "scale(0.9)"; // Zoom out effect
  catImage.style.transition = "transform 0.3s"; // Smooth transition
});