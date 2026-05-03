// get elements >>
let Property = document.getElementById('Property');
let Price = document.getElementById('Price');
let Location = document.getElementById('Location');
let badd = document.getElementById('badd');
let bupdate = document.getElementById('bupdate');
let bdelete = document.getElementById('bdelete');
let outPut = document.getElementById('outPut');
// ---------------------------------------------------
// functions >>
let units = [];
let unitIndexP = 0 ;
// add items >>
if (localStorage.getItem('units') != null) {
    units = JSON.parse(localStorage.getItem('units'));
    showData();
}
function addUnit() {
    let unit = {
        Property: Property.value,
        Price: Price.value,
        Location: Location.value,
    };
    units.push(unit);
}
// ---------------------------------------------------
//updateLocalStorageFunction >>
function updateLocalStorage() {
    localStorage.setItem('units', JSON.stringify(units));
}
// ---------------------------------------------------
// showDataFunction >>
function showData() {
    updateLocalStorage(); //update localStorage before show data
    let showContainer = '';
    for (let i = 0; i < units.length; i++) {
        let = showCurrent = `
    <div onmouseover='showEditIcon(${i})' onmouseleave='hideEditIcon(${i})' class='card'>
        <div onclick='selectUnit(${i})'class="edit"><i class="fa-solid fa-pen"></i></div>
        <h6>${units[i].Property}</h6>
        <h5><i class="fa-solid fa-dollar-sign"></i> ${units[i].Price}</h5>
        <p><i class="fa-solid fa-location-pin"></i> ${units[i].Location}</p>
    </div>
    `
        showContainer += showCurrent;
    }
    outPut.innerHTML = showContainer;
}
// ---------------------------------------------------
//showEditIcon >>
function showEditIcon(index){
    let edit = document.getElementsByClassName('edit');
    edit[index].style.opacity='1';
}
// ---------------------------------------------------
//hideEditIcon >>
function hideEditIcon(index){
    let edit = document.getElementsByClassName('edit');
    edit[index].style.opacity='0';
}
// ---------------------------------------------------
// selectUnitFunction >>
function selectUnit(unitIndex) {
    badd.style.display = "none";
    bupdate.style.display = "inline";
    bdelete.style.display = "inline";
    // ------- put card values in the form
    Property.value = units[unitIndex].Property;
    Price.value = units[unitIndex].Price;
    Location.value = units[unitIndex].Location;
    unitIndexP = unitIndex ;
    // ------- change card border color
    let cards = document.getElementsByClassName('card');
    for(let i=0 ; i<cards.length ; i++){
        if( cards[i] != cards[unitIndex]){
            cards[i].style.borderColor='var(--colorsilver)';
        }
    }
    cards[unitIndex].style.borderColor='var(--colorviolet)';
}
// ---------------------------------------------------
//hideUDshowA >>
function hideUDshowA(){
    badd.style.display = "inline";
    bupdate.style.display = "none";
    bdelete.style.display = "none";
}
// ---------------------------------------------------
//updateUnit >>
function updateUnit(){
    units[unitIndexP].Property = Property.value;
    units[unitIndexP].Price = Price.value;
    units[unitIndexP].Location = Location.value;
}
// ---------------------------------------------------
//deleteUnit >>
function deleteUnit(){
    units.splice(unitIndexP,1);
}
// ---------------------------------------------------
//clearForm >>
function clearForm(){
    Property.value = "";
    Price.value = "";
    Location.value = "";
}
// ---------------------------------------------------
// events
badd.onclick = function () {
    addUnit();
    showData();
    clearForm();
};
bupdate.onclick = function(){
    updateUnit();
    hideUDshowA();
    showData();
    clearForm();
};
bdelete.onclick = function(){
    deleteUnit();
    hideUDshowA();
    showData();
    clearForm();
};