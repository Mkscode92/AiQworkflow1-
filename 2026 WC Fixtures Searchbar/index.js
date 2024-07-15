

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

function country_pick() {
  var select = document.getElementById("select");
  var country = select.options[select.selectedIndex].innerHTML;
  let x = document.getElementsByClassName("grid-container");
  
    for (i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.includes(country)) {
        x[i].classList.add("hidden");
      }
      else {
        x[i].classList.remove("hidden");
      }
    }



  
}
  
