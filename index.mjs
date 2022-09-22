import got from "./data.js";
let list = document.querySelector(".list");
let inputElement=document.querySelector("#in-text");
let toggleButtons=document.querySelectorAll(".togglers a");
let houses = got["houses"];
console.log(houses);
function getPeople(houses,houseName){
let result = houses.filter(house=>{
    let currHouse=house.name.toLowerCase();
    if(currHouse===houseName){
        return true;
    }
})
return result[0].people;
}
// let returnedPeople=getPeople(houses,"Starks");
let peopleArrays = houses.map(house => {
    return house["people"];
})

let peopleList = [];
peopleArrays.forEach(peopleArray => {
    peopleArray.forEach(people => {
        peopleList.push(people);
    })
})


function showAllList(values) {
    let output = "";
    values.forEach(people => {
        output += `<div class="item">
    <div class="item-info">
        <div class="img"><img src="${people.image}" alt=""></div>
        <div class="title">${people.name}</div>
        <div class="desc">${people.description}</div>
        <div class="know-more"><a href="${people.wikiLink}">Know more</a></div>
    </div>
</div>`
    })
    list.innerHTML=output;
}
showAllList(peopleList);
inputElement.addEventListener('focus',()=>{
    showAllList(peopleList);
    removeActives(toggleButtons);
})
inputElement.addEventListener('keyup',(event)=>{
    let text=event.target.value;
    text=text.toLowerCase();
    let items=document.querySelectorAll('.item');
    items.forEach(item=>{
        let itemTitle=item.querySelector(".title").innerText;
        itemTitle=itemTitle.toLowerCase();
        if(itemTitle.indexOf(text)!=-1){
            item.style.display="block";
        }
        else{
            item.style.display="none";
        }
    })
})
function removeActives(toggleButtons){
toggleButtons.forEach(toggleButton=>{
    toggleButton.classList.remove("active");
})
}
toggleButtons.forEach(toggleButton=>{

    toggleButton.addEventListener("click",(event)=>{
        removeActives(toggleButtons);
        toggleButton.classList.add("active");
        let houseName=toggleButton.innerText.toLowerCase();
        let peopleTargeted=getPeople(houses,houseName);
        showAllList(peopleTargeted);
    })
})