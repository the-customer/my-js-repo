const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const shwowMillionnairesBtn = document.getElementById('show-millionnaires');
const sortBnt = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
//
getRandomUser();
getRandomUser();
getRandomUser();

//Récupérer l'utilisateur randow et ajouter de l'argent
/*function getRandomUser() {
    fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(data => console.log(data))
}*/

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
    
}

function addData(obj){
    data.push(obj);

    updateDOM();
}
//
function updateDOM(provideData = data) {
    //Effacer le contenu de la div
    main.innerHTML = '<h2><strong>Personne</strong> Richesse</h2>';

    provideData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element)
    });
}

//Formater le numéro en argent
function formatMoney(number) {
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}
//Doubler le montant
function doubleMoney(){
    data = data.map(user => {
        return {...user, money: user.money * 2}
    });
    updateDOM();
}
//
function sortByRichest() {
    data.sort((a,b) => b.money - a.money);

    updateDOM();
}
//
function showMillionnaires() {
    const millionnaires = data.filter(function(user){
        return user.money >= 1000000;
    });

    console.log(millionnaires)

    updateDOM(millionnaires)
}
//
function calculateWealth(){
    console.log('sfds');
    
    const total = data.reduce((acc, user) => (acc += user.money),0);
    
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong> </h3>`;
    main.appendChild(wealthEl);
}



//Event listeners
addUserBtn.addEventListener('click',getRandomUser);
//
doubleBtn.addEventListener('click', doubleMoney);
//
sortBnt.addEventListener('click', sortByRichest);
//
shwowMillionnairesBtn.addEventListener('click', showMillionnaires);
//
calculateWealthBtn.addEventListener('click', calculateWealth);