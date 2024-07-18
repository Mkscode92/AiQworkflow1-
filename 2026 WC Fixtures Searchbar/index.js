

function search_fixture() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('grid-container');
  
    for (i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].classList.add("hidden");
      }
      else {
        x[i].classList.remove("hidden");
      }
    }
  }

// function country_pick() {
//   var select = document.getElementById("select");
//   var country = select.options[select.selectedIndex].innerHTML;
//   let x = document.getElementsByClassName("grid-container");
  
//     for (i = 0; i < x.length; i++) {
//       if (!x[i].innerHTML.includes(country)) {
//         x[i].classList.add("hidden");
//       }
//       else {
//         x[i].classList.remove("hidden");
//       }
//     }
// }

document.getElementById('addFixtureButton').addEventListener('click', function() {
  // Create a new div element for the grid container
  const newFixture = document.createElement('div');
  newFixture.classList.add('grid-container');

  // Country div
  const country = prompt("Enter the country:");
  const countryDiv = document.createElement('div');
  countryDiv.classList.add('country');
  countryDiv.textContent = country;
  newFixture.appendChild(countryDiv);

  // Create the 3 sub items
  const messages = ["Enter the Stadium & City:", "Enter the Match Number & Type:", "Enter the Date:"];
  for (let i = 0; i < 3; i++) {
      const itemText = prompt(messages[i]);
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');
      itemDiv.textContent = itemText;
      newFixture.appendChild(itemDiv);
  }

  // Make the new fixture be added before the add button 
  let buttons = document.getElementById("buttonContainer");
  let parent = buttons.parentNode;
  parent.insertBefore(newFixture, buttons)
});

// delete div
document.getElementById('deleteFixtureButton').addEventListener('click', function() {
  alert("Delete Mode ON: Click on a fixture to delete it.");
  const fixtures = document.querySelectorAll('.grid-container');
  console.log(fixtures);
  var counter = 0;
  fixtures.forEach((fixture, index) => {
      fixture.addEventListener('click', function() {
          if (counter == 1){
            return;
          } 
          else {
            fixture.remove();
            console.log("removed");
            counter ++;
          }
      });
  });
});
  
