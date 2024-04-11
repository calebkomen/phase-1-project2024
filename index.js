const factText = document.querySelector(".fact");
const factBtn = document.querySelector("button");
const authorName = document.querySelector(".name");
const catImage = document.querySelector("#img");

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
    method: 'GET',
    body: JSON.stringify(cat), // Define and populate the cat object
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(result => {
      factText.innerText = result.facts;
      authorName.innerText = result.author;
      factBtn.classList.remove("loading");
      factBtn.innerText = "New Fact";
    })
    .catch(error => {
      console.error('Error fetching cat fact:', error);
      factText.innerText = "Failed to fetch fact. Please try again later.";
      authorName.innerText = "";
      factBtn.classList.remove("loading");
      factBtn.innerText = "New Fact";
    });
}

factBtn.addEventListener("click", newCatFact);

catImage.addEventListener("mouseover", () => {
  catImage.style.transform = "scale(1.0)"; 
  catImage.style.transition = "transform 0.3s"; 
});

catImage.addEventListener("mouseout", () => {
  catImage.style.transform = "scale(0.9)"; 
  catImage.style.transition = "transform 0.3s"; 
});

factBtn.addEventListener("click", () => {
  newCatFact(); // Call newCatFact() function when the button is clicked
});