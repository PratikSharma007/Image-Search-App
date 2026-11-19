/* sabse pahele jo input ayega uska value mujhe bhejna hoga url mai taki api request bhej sake,,, jo request ayega usko dom manipulation se screen mai show karna hai ,,,, uske baad showmore button ka scean handle karna hai,,, uske baad page mai loading wagera chota mota kaam handle karna hai */

let searchInput = document.querySelector("#search-input");
let searchForm = document.querySelector("#search-form");
let searchResults = document.querySelector("#search-results");
let showMoreButton = document.querySelector("#show-more-button");
let showError = document.querySelector("#show-error");
let showLoading = document.querySelector("#show-loading");

page = 1;
if (page === 1) {
  showMoreButton.style.display = "none";
}

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  showImage();
  showLoading.style.display = "block";
  showError.textContent = "";
  searchResults.innerHTML = "";
});

async function showImage() {
  let InputValue = searchInput.value;
  try {
    const URL = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${InputValue}&client_id=${accessKey}`,
    );

//----------handling error-------------

    if (!URL.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    let redableDATA = await URL.json();
    const realDATA = redableDATA.results; // now it an array so we can get data from here

//----------- creating element by dynamically ---------------
    realDATA.map((para) => {
      let searchResultPARENT = document.createElement("div");
      searchResultPARENT.classList.add("search-result");

      let img = document.createElement("img");
      img.src = para.urls.small;
      img.alt = "image";

      let a = document.createElement("a");
      a.href = para.links.html;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = para.alt_description;

      searchResultPARENT.appendChild(img);
      searchResultPARENT.appendChild(a);

      searchResults.append(searchResultPARENT);
    });

    showLoading.style.display = "none"


    page++;
    if (page > 1) {
      showMoreButton.style.display = "block";
    }
  } catch (error) {
    showError.textContent = error.message
    showLoading.style.display = "none"
  }
}

showMoreButton.addEventListener("click", () => {
  showImage();
});
