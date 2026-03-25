let movieNameRef = document.getElementById
("movie-name") as HTMLInputElement;
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result") as HTMLElement;

const Key = "977b1add";

const dot=document.getElementById("status-dot");
const text=document.getElementById("status-text");

function updateStatus(){
    if(navigator.onLine){
        dot.classList.remove("offline");
        text.textContent="Live";
    }else{
        dot.classList.add("offline");
        text.textContent="Offline";
    }
}

updateStatus();

window.addEventListener("online",updateStatus);
window.addEventListener("offline",updateStatus);



const words = ["movie","series","K-drama","anime","show","documentary"];
let index = 0;

const cyclingText = document.getElementById("cycling-text");

setInterval(()=>{
    cyclingText.classList.add("fade-out");

    setTimeout(()=>{
        index = (index+1) % words.length;
        cyclingText.textContent = words[index];
        cyclingText.classList.remove("fade-out");
        cyclingText.classList.add("fade-in");

        setTimeout(()=>cyclingText.classList.remove("fade-in"),400);

    },500);
},2500);










let getMovie = () =>{
    let MovieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${MovieName}&apikey=${Key}`;

    if(MovieName.length <= 0){
        result.innerHTML = `<h3 class="msg">Enter the movie name</h3>`;
    }else{
        fetch(url)
            .then((resp)=>resp.json())
            .then((data:any)=>{
            if(data.Response==="True"){
                result.innerHTML=`<div class="info">
                <img src="${data.Poster}" class="poster">
                <div>
                <h2>${data.Title}</h2>
                <div class="rating">
                <span>⭐</span>
                <h4>${data.imdbRating}</h4>
                </div>
                <div class="details">
                    <span>${data.Rated}</span>
                    <span>${data.Runtime}</span>
                    <span>${data.Year}</span>
                </div>
                <div class="genre">
                    <div>${data.Genre.split(",").map((g: string) => `<div>${g.trim()}</div>`).join("")}
                    </div>
                </div>
                </div>
            </div>  
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
                `;
            }
            else{
                result.innerHTML=`<h3 class="msg">${data.Error}⭐</h3>`;
            }

        })
        .catch(()=>{
            result.innerHTML=`<h3 class="msg">Error Occured</h3>`;
        })
    }
}

// Changed: trigger search only on explicit user action (click/Enter), not on page load.
searchBtn?.addEventListener("click", getMovie);

// Changed: keypress is deprecated; keydown is the modern keyboard event.
window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getMovie();
    }
});