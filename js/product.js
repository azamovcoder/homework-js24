const API_URL = "https://fakestoreapi.com";
const singleContent = document.querySelector(".single__content");
const loadingCard = document.querySelector(".loading__card");
let limitCount = 1;
async function fetchData(URL) {
  let param = new URLSearchParams(window.location.search);
  let id = param.get("id");

  const data = await fetch(`${URL}/products/${id}`);

  data
    .json()
    .then((res) => createContent(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loadingCard.style.display = "none";
    });
}

fetchData(API_URL);

function createContent(data) {
  singleContent.innerHTML = `
    <div class = ""singleCard__img>
    <img src = ${data.image}>
    </div>
    <div>
        <h2>${data.title}</h2>
        <div class = "card_cont"><b>Category:</b> ${
          data.category
        }<b> Count:</b>  ${data.rating.count}</div>

        <p class= "card__desc card_d">${data.description}</p>

     <div class="card__bottom">
        <p class="card__price"> Sale: ${data.price}$ <span>${
    data.price * 2
  }$</span></p>
            <div class="card__star card_s">
                ${data.rating.rate}
                    <div>
                <img src="../images/star.svg">
            </div>
            </div>
    </div>
    </div>
    `;
}

function createLoadingItem(count) {
  let loadingItems = "";
  for (let i = 0; i < count; i++) {
    loadingItems += `
    <div class="loading__item">
      <div class="loading__img bg__animation"></div>
      
     
    </div>
    <div class="loading__item">
      
      <div class="loading__title bg__animation"></div>
      <div class="loading__title bg__animation"></div>

    </div>

    `;
  }

  loadingCard.innerHTML = loadingItems;
}

createLoadingItem(limitCount);
