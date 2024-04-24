const API_URL = "https://fakestoreapi.com";
const wrapper = document.querySelector(".wrapper");
const btnSeeMore = document.querySelector(".see__more__btn");
const loading = document.querySelector(".loading");
let limitCount = 6;
let count = 1;

async function fetchData(URL) {
  const data = await fetch(`${URL}/products?limit=${limitCount * count}`, {
    method: "GET",
  });

  data
    .json()
    .then((res) => createCard(res))
    .catch((err) => console.log(err))
    .finally(() => {
      loading.style.display = "none";
      btnSeeMore.innerHTML = "See More";
      btnSeeMore.removeAttribute("disabled");
    });
}

fetchData(API_URL);

function createCard(data) {
  let cards = "";
  data.forEach((element) => {
    cards += `
        <div class="card">
            <img class ="card__image" data-id= "${element.id}" src=${
      element.image
    } alt="">
                    <div class="card__info">
                        <h3>${element.title}</h3>
                        <p class="card__desc">${element.description}</p>
                        <div class="card__bottom">
                            <p class="card__price"> Sale: ${
                              element.price
                            }$ <span>${element.price * 2}$</span></p>
                            <div class="card__star">
                                ${element.rating.rate}
                                <div>
                                    <img src="../images/star.svg">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        `;
  });

  wrapper.innerHTML = cards;
}

wrapper.addEventListener("click", (e) => {
  if (e.target.className === "card__image") {
    // console.log(e.target.dataset.id);
    let id = e.target.dataset.id;
    window.open(`./pages/product.html?id=${id}`, "_self");
  }
});

function createLoadingItem(count) {
  let loadingItems = "";
  for (let i = 0; i < count; i++) {
    loadingItems += `
    <div class="loading__item">
      <div class="loading__img bg__animation"></div>
      <div class="loading__title bg__animation"></div>
      <div class="loading__title bg__animation"></div>
      <div class="loading__title bg__animation"></div>
      <div class="loading__title bg__animation"></div>
    </div>

    `;
  }

  loading.innerHTML = loadingItems;
}

btnSeeMore.addEventListener("click", () => {
  count++;
  btnSeeMore.innerHTML = "Loading ...";
  btnSeeMore.setAttribute("disabled", true);
  fetchData(API_URL);
});

createLoadingItem(limitCount);
