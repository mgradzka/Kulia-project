
const now = new Date().getTime()

const initIndex = function() {
  fetchingData(3)
  }
  initIndex()


// Call to interact with the page
window.addEventListener('load', function() {
  setTimeout(function() {
    truck.classList.add('truck-animation')
  }, 500)
})
  
function drawEvents(allevents) {
  const events = allevents.map(d => d.acf);

    let futureEvents = []

    // Sorting out the past events
      for(const [i, event] of events.entries()) {
        // Transforming the dates into a miliseconds
        const eventDate = new Date(event.date).getTime()
        if(eventDate >= now) {
          event.milliSeconds = eventDate;
          futureEvents.push(event)
        }
      }
      // Arranging them into an ascending order
      const ascendingEvents = futureEvents.sort((a, b) => a.milliSeconds - b.milliSeconds)

  if(ascendingEvents.length > 1) {
    drawEventsCard(ascendingEvents, 3)
  } else if(ascendingEvents.length = 1) {
    drawEventsCard(ascendingEvents, 1)
   }  else {
      drawEmptyEvents()
  }
};

function drawEventsCard(event, numberOfCard) {
  for(let i = 0; i < numberOfCard; i++) {
    let eventArticle =`
    <article class="event-card flex">
          <img src="${event[i].image}" alt="${event[i].image}" />
          <div class="event-div flex">
            <h3 class="uppercase">${event[i].name}</h3>
            <h5>${event[i].date.replaceAll('-', '/')}</h5>
            <span>
              From: ${event[i].opening_time}
              <br />
              At: ${event[i].where}
              <br>
            </span>
            <p>${event[i].description}
          </div>
     </article>
    `
    drawHtml('.container', eventArticle)

  }

}

function drawEmptyEvents() {
  const emptyEvent =
  `
  <div class="text-align">
    <h4>Unfortunatelly, we don't have any upcoming events,
      but in the meantime try our sandwiches at home!
    </h4>
    <a class="btn" href="#">Check us on wolt</a>
  </div>
  `
  drawHtml('.container', emptyEvent)
}
  

