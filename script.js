
const inputtaken=document.querySelector("#input");
const searchButton=document.querySelector("#submit");
const modebtn=document.querySelector(".mode");
const container=document.querySelector("body");
const searchBar=document.querySelector(".searchbar");
const main=document.querySelector(".main-item");
const profile=document.querySelector(".profile-card");
const currentMode=document.querySelector(".current-mode");
const modeImg=document.querySelector("#mode-img");
const noResult=document.querySelector("#no-result");

const dp=document.querySelector(".profile-img");
const PersonName=document.querySelector(".name");
const userid=document.querySelector("#user");
const date=document.querySelector(".date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const about=document.querySelector(".about");
const repos=document.querySelector(".totalrepos");
const folcount=document.querySelector(".followers-count");
const followingcount=document.querySelector(".following-count");
const location1=document.querySelector(".location");
const page=document.querySelector(".page");
const twitter=document.querySelector(".twitter");
const company=document.querySelector(".company");
const links=document.querySelector(".links");



const url = "https://api.github.com/users/";


//userdata fetch karenge
function renderUserInfo(userInfo){
    if(userInfo.message!=="Not Found"){
        noResult.style.display="none";
        function checkNull(para){
            if(para===null||para==="")
            {
                return true;
            }
            else {
                return false;
            }
        }

        dp.src=`${userInfo.avatar_url}`;
        PersonName.innerText=userInfo.name;
        userid.innerText=userInfo.login;
        userid.href=`${userInfo.html_url}`;

        about.innerText=checkNull(userInfo.bio)?"The user has no bio":userInfo.bio;
        repos.innerText=userInfo.public_repos;
        folcount.innerText=userInfo.followers;
        followingcount.innerText=userInfo.following;
        location1.innerText=checkNull(userInfo.location)?"Not available":userInfo.location;
        page.innerText=checkNull(userInfo.blog)?"Not available":userInfo.blog;
        page.href=checkNull(userInfo.blog)?"#":userInfo.blog;
        twitter.innerText = checkNull(userInfo.twitter_username, twitter) ?"Not Available":userInfo.twitter_username ;
        twitter.href = checkNull(userInfo.twitter_username, twitter) ?  "#":`https://twitter.com/${userInfo.twitter_username}`;
        company.innerText=checkNull(userInfo.company)?"No company":userInfo.company;
      

    }
    else{
        noResult.style.display="block";
    }
}
async function getUserData(url)
{try{
const response= await fetch(url);
const data=await response.json();
renderUserInfo(data);
}
catch(err){
    console.log("error found");
}

}

//searchbutton pe click
searchButton.addEventListener("click",function(){
    if(input.value!="")
    {
        getUserData(url + input.value);
    }
});

//input lene pe
inputtaken.addEventListener("keydown",function(e){
    if(e.key=="Enter"){
        if(input.value!=="")
        {
            getUserData(url + input.value);

        }
    }
});
let dark=false;
function activateDarkMode(){
 container.style.color='white';
 container.style.background= 'linear-gradient(90deg, rgba(48, 48, 43, 1) 2%, rgba(26, 77, 84, 1) 57%, rgba(54, 34, 54, 1) 100%)';

 inputtaken.style.backgroundColor='black';
 inputtaken.style.color='white';
 main.style.backgroundColor='black';
 profile.style.background=' linear-gradient(90deg, rgba(78, 78, 78, 1) 100%, rgba(57, 130, 140, 1) 100%, rgba(84, 54, 84, 1) 100%)';
 userid.style.color="blue";
 links.style.color="rgb(245, 245, 245)";
 twitter.style.color="rgb(245, 245, 245)";
 about.style.color="grey";
 page.style.color="rgb(245, 245, 245)";


currentMode.innerText="Light";
modeImg.src="./assets/images/sun-icon.svg";



 dark=true;

}
function activateLightMode()
{
    container.style.color='black';
    container.style.background=' linear-gradient(90deg, rgba(226, 213, 226, 1) 0%, rgba(192, 225, 229, 1) 83%, rgba(238, 202, 202, 1) 100%)';
    
   
    inputtaken.style.backgroundColor='white';
    inputtaken.style.color='black';
    main.style.backgroundColor='white';
    profile.style.background= 'linear-gradient(90deg, rgba(182, 178, 182, 1) 60%, rgba(173, 176, 176, 1) 83%, rgba(203, 201, 201, 1) 100%)';
    userid.style.color="blue";
    links.style.color="grey";
    twitter.style.color="grey";
    about.style.color="grey";
    page.style.color="grey";
 

   currentMode.innerText="Dark";
   modeImg.src="assets/images/moon-icon.svg";
   
   
    dark=false;
}


//mode div pe click pe theme change
modebtn.addEventListener("click",function(){
    if(dark==false)
    {
     activateDarkMode();
    }
    else{
        activateLightMode();
    }
});

function init(){
    activateLightMode();
    getUserData(url + "thepranaygupta");
}
init();
