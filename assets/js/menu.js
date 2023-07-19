// Selecting elements


// ***************************************** //
// ******** Fetching data for the pages ***************//
// Determining what posts have to be fetched





const initMenu = function() {
  fetchingData(5)
  fetchingData(6)
  fetchingData(7)
  fetchingData(8)
  fetchingData(9)

}
initMenu()

// Drawing drink cards
function drinksCard(drinks, selector) {
  console.log(drinks);
  for(let i = 0; i < drinks.length; i++) {
    let drinkItems =`
    <ul>
      ${listItems(drinks[i])}
    </ul>
    <div class="circle"><p>${drinks[i].acf.drinks_price || drinks[i].acf.beers_price}</p></div>
    `
    drawHtml(selector, drinkItems)
  }
}



function drawOthers(others) {
  for(let i = 0; i < others.length; i++) {
       let dipsItem= 
          `
          <div  class="prices flex">
            <ul>
            ${listItems(others[i])}
            </ul>
            <div class="circle"><p>${others[i].acf.dips_price}</p></div>
          </div>
            <div id="sides" class="prices flex">
            <h4 class="uppercase">${others[i].acf.structure_for_sides.sides}</h4>
            <div class="circle"><p>${others[i].acf.price_side}</p></div>
         </div>
      `
      drawHtml('#dips', dipsItem)
      }
}


//Drawing messy fries 
function drawMessyFries(fries) {
  // console.log(fries);
  for (let i = 0; i < fries.length; i++){
  const messyFries = `
   <article class="flex">
  <h2 class="uppercase text-align">SIDES</h2>
  <img src="${fries[i].acf.image}" class="teaser-fries" alt="${fries[i].acf.title}" />
  <h4 class="uppercase">${fries[i].acf.title}</h4>
  <h5 class="uppercase">Ingredients</h5>
    
  <div class="prices flex">
    <ul> ${listItems(fries[i])}
    </ul>
    <div class="circle"><p>${fries[i].acf.price}</p></div>
  </div>
</article>
  `

  drawHtml('#messiFries', messyFries)
}}

// Drawing meals card
function drawMealCards(meals) {
  for (let i = 0; i < meals.length; i++) {
      let sandwichCard = `
      <article class="flex">
             <img src="${meals[i].acf.image}" class="teaser-vegan" alt="${meals[i].acf.title}"/>
             <h4 class="uppercase">${meals[i].acf.title}</h4>
             <p>
                ${meals[i].acf.description}
            </p>
            <h5 class="uppercase">Ingredients</h5>
            <ul>
            ${listItems(meals[i])}
            </ul>
          </article>
      `;
      drawHtml('.sandwich-container', sandwichCard)
  }

}


// Filling up the list items
function listItems(list) {
  let listArr= [];
  if(list.acf.ingredients) {
    listArr= Object.values(list.acf.ingredients)
  } else if (list.acf.items) {
    listArr = Object.values(list.acf.items)
  } else if(list.acf.items_drinks){
    listArr = Object.values(list.acf.items_drinks)
   }
   else if (list.acf.items_beers) {
    listArr = Object.values(list.acf.items_beers)
  }


    let listItem = ''
  for(let i = 0; i < listArr.length; i++) {
     listItem += `<li>${listArr[i]}</li>`
    }
    return listItem;
}


// Adding nodes to the HTML
function drawHtml(selector, newContent) {
    document.querySelector(selector).innerHTML += newContent;
 
}