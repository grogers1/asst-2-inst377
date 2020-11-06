function findMatches(wordToMatch, restaurantList) {
  // process your restaurants here!
  wordToMatch = wordToMatch.trim();
  if (!wordToMatch || wordToMatch.length == 0) {
    return [];
  }
  const list = restaurantList.filter(restaurant => {
    const regex = new RegExp(wordToMatch, 'gi');
    return restaurant.category.match(regex) || restaurant.zip.match(regex)
      || restaurant.name.match(regex);
  });
  return list;
}

function displayMatches() {
  const matchArray = findMatches(this.value, restaurants);
  const html = matchArray.map(restaurant => {
    return `
      <li>
        <span class="name">${restaurant.name}</span><br/>
        <span class="category">${restaurant.category}</span><br/>
        <span class="address_line_1">${restaurant.address_line_1}</span><br/>
        <span class="city">${restaurant.city}</span><br/>
        <span class="zip">${restaurant.zip}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const restaurants = [];
fetch('/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: ''
})
  .then((fromServer) => fromServer.json())
  .then((jsonFromServer) => restaurants.push(...jsonFromServer))
  .catch((err) => {
    console.log(err);
  });

const searchInput = document.querySelector('.textentry');
const suggestions = document.querySelector('#navContainer');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);