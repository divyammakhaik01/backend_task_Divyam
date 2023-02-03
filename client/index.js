let form = document.getElementsByClassName('note-form')[0];
let input = document.getElementsByClassName('input')[0];
let submit = document.getElementsByClassName('submit')[0];
// let socket = io.connect("http://localhost:8080");
// <script src="https://cdn.socket.io/4.5.3/socket.io.min.js" 
// integrity="sha384-WPFUvHkB1aHA5TDSZi6xtDgkF0wXJcIIxXhC6h8OT8EH3fC5PWro5pWJ1THjcfEi" 
// crossorigin="anonymous" />

form.addEventListener('submit' , async(event)=>{
    event.preventDefault();


    if(input.value === ""){
        alert("Enter something")
        return;
    }
    console.log(">>>>>>>>>>>")
    
    // add emit
    socket.emit("add" , input.value)

    // 

    // fetch notes from server

    // let res = await fetch('http://localhost:8080/fetchAllTasks');
    // let data = await res.json();
    // console.log(data);

    // for(let i = 0 ; i < data.result.length ; i++){
        
    // }
    
})







