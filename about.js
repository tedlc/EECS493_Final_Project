// getting all required elements
const settingBtn = document.querySelector(".topnav button")
const settingPan = document.querySelector(".setting")
const settingClose = document.querySelector(".setting .closeBtn")
const themeSwitch = document.querySelector(".setting .themeSwitch")
const body = document.querySelector("body");
const wrapper = document.querySelectorAll(".wrapper");

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
  }
}