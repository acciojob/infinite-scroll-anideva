//your code here!
const infiList = document.getElementById("infi-list");
//a counter so that the items can be numbered nicely
let itemCount = 1;
//function to add number to new list items
function addItems(num) {
    for (let i= 0; i <num; i++) {
        const li = document.createElement("li")
        li.textContent=`Item ${itemCount++}`;
        infiList.appendChild(li);
    } 
    addItems(10);
    infiList.addEventListener("scroll", function (){
        const scrollTop= infiList.scrollTop;
        const clientHeight= infiList.clientHeight;
        const scrollHeight= infiList.scrollHeight;

        if (scrollTop +clientHeight>=scrollHeight) {
            addItems(2);
        }
    })
};

