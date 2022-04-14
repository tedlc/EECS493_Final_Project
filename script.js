// getting all required elements
const taskName = document.querySelector(".inputField #task_name");
const taskTime = document.querySelector(".inputField #task_time");
const taskNote = document.querySelector(".inputField #task_summary");
const addBtn = document.querySelector(".inputField .addBtn");
const clearBtn = document.querySelector(".inputField .clearBtn");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

const settingBtn = document.querySelector(".topnav button")
const settingPan = document.querySelector(".setting")
const settingClose = document.querySelector(".setting .closeBtn")
const themeSwitch = document.querySelector(".setting .themeSwitch")

const body = document.querySelector("body");
const wrapper = document.querySelectorAll(".wrapper");
const wrapper2 = document.querySelector(".wrapper2");
console.log(wrapper.classList);


// onkeyup event
taskName.onkeyup = ()=>{
  if(taskName.value.trim() != 0){ 
    addBtn.classList.add("active");
    clearBtn.classList.add("active"); 
  }else{
    addBtn.classList.remove("active"); 
    clearBtn.classList.remove("active");
  }
}

// onkeyup event
taskNote.onkeyup = ()=>{
    if(taskNote.value.trim() != 0){ 
      clearBtn.classList.add("active"); 
    }else{
      clearBtn.classList.remove("active");
    }
}
taskTime.onkeyup = ()=>{
    if(taskTime.value.trim() != 0){ 
      clearBtn.classList.add("active"); 
    }else{
      clearBtn.classList.remove("active"); 
    }
}

showTasks(); //calling showTask function

addBtn.onclick = ()=>{ //when user click on plus icon button
    //getting input field value
    var timeData = taskTime.value;
    if(timeData.trim() == 0){
        window.alert("Plead indicate the Due date");
        return;
    }

    var timeStamp = parseInt(timeData.replace(/\D/g, ""));
    var userEnteredValue =  {
        'taskName': taskName.value,
        'taskTime': taskTime.value,
        'taskNote': taskNote,
        'timeStamp': timeStamp
    };

  // getting localstorage
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  if(getLocalStorageData == null){
    listArray = []; 
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  // Add
  listArray.push(userEnteredValue); 

  // Sort, keep ddl 
  listArray.sort(function(first, second) {
    return first.timeStamp - second.timeStamp;
  });

  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  
  //calling showTask function
  showTasks(); 
  //unactive
  taskName.value = ""; 
  taskTime.value = null;
  taskNote.value = "Enter Task Summary...";
  clearBtn.classList.remove("active");
  addBtn.classList.remove("active"); 
}

clearBtn.onclick = ()=>{ 
    taskName.value = ""; 
    taskTime.value = null;
    taskNote.value = "Enter Task Summary...";
    clearBtn.classList.remove("active");
    addBtn.classList.remove("active"); 
}


settingBtn.onclick = ()=>{
  if (settingPan.classList.contains("hidden")) {
    settingPan.classList.remove("hidden");
  } else {
    settingPan.classList.add("hidden");
  }
}

settingClose.onclick = ()=>{ 
  settingPan.classList.add("hidden");
}

themeSwitch.onclick  = ()=>{
  if (localStorage.getItem('theme') === 'Dark'){
      setTheme("Light");
  } else {
      setTheme("Dark");
  }
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }

  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  // Delete Button
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active");
  }else{
    deleteAllBtn.classList.remove("active");
  }
  //adding new li tag inside ul tag
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element["taskName"]}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; 
  taskName.value = ""; 
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}

// Pop the add
function openForm() {
    document.getElementById("newtask").style.display = "block";
  }

// Close the add
function closeForm() {
    document.getElementById("newtask").style.display = "none";
}

// Water
var number = 0;
function addOne() {
  console.log("xxxx");
	if (number < 13) {
		number++;
		document.getElementById('textbox1').innerHTML = number;
		document.getElementById("imge" + number).style.display = "inline";

	} else if (number == 13) {
		document.getElementById('complete').innerHTML = "daily achivement complete";
	} else {

		document.getElementById('complete').innerHTML = "sorry some technical problem";
	}
}



// Initial load
if (localStorage.getItem('theme') === 'Dark') {
  setTheme("Dark");
} else {
  setTheme("Light");
}


function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  if (themeName === 'Dark'){
    themeSwitch.innerHTML = "Change to Light Mode";
    body.classList.add("bodyDark");
    body.classList.remove("bodyLight");
    wrapper2.classList.remove("wapperLight");
    wrapper2.classList.add("wapperDark");
    wrapper.forEach((x) => {
      x.classList.remove("wapperLight");
      x.classList.add("wapperDark");
    })

  } else {
    themeSwitch.innerHTML = "Change to Dark Mode";
    body.classList.remove("bodyDark");
    body.classList.add("bodyLight");
    wrapper.forEach((x) => {
      x.classList.remove("wapperDark");
      x.classList.add("wapperLight");
    })
    wrapper2.classList.remove("wapperDark");
    wrapper2.classList.add("wapperLight");
  }
}