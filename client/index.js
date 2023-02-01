let form = document.getElementsByClassName('note-form');
let input = document.getElementsByClassName('input')[0];
let submit = document.getElementsByClassName('submit')[0];
let NotesList = document.getElementsByClassName('notes-list')[0];


submit.addEventListener('click' , async(event)=>{
    event.preventDefault();

    // sending note text server 

    if(input.value === ""){
        alert("Enter something")
        return;
    }
    
    // add emit
    socket.emit("add" , input.value)

    // 

    // fetch notes from server

    let res = await fetch('http://localhost:8080/fetchAllTasks');
    let data = await res.json();
    console.log(data);

    for(let i = 0 ; i < data.result.length ; i++){
        
    }
    
})







