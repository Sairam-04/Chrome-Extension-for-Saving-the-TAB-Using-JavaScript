myLeads = []
oldLeads = []

const inputEL = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEL = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("save-btn")
// check whether the data is in local storage or not if data is there assign
// it to myleads array to keep track of the data saved earlier

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click",()=>{
    //Grab the URL of current tab
    //Chrome.tabs api
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)  
    })
})

function render(leads)
{
    let listItems = ""
    for(let i=0;i<leads.length;i++){
        listItems += `
                        <li>
                            <a target = '_blank' href = "${leads[i]}" > ${leads[i]}
                            </a>   
                        </li>
                    `
    }

    ulEL.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", () =>{

    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click",() =>{
    myLeads.push(inputEL.value) 
    inputEL.value = ""
    // save myleads array to local storage
    localStorage.setItem("myLeads",JSON.stringify(myLeads))

    render(myLeads)
})
