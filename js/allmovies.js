

const option = {
    method : "GET",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzQ1NDA2MDg1MGM5MGM5ZjU5NGNkM2JhYjcyYjA5YSIsInN1YiI6IjY1NGFhNTNlMzkxYjljMDExZDMwMWI1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RpT9YRkKEN1Jtcb9KXDhxELii_hY-ExXqaPB5Fft7ds'
      }
}

async function showAllMovies(num) {

    const response = await fetch("https://api.themoviedb.org/3/discover/movie?page=" + num, option);
    
    if(response.ok) {
        const list = await response.json();
        // console.log("top rated list", list);
        const divContainer = document.getElementById("allMovies");

        for(let i = 0; i < list.results.length; i++) {
            const divList = document.createElement("div");
            const link = document.createElement("a");
            const img = document.createElement("img");
            const title = document.createElement("p");
            const rating = document.createElement("p");
            
            img.className = "image";
            img.id = list.results[i].id;
            img.src = "https://www.themoviedb.org/t/p/original/" + list.results[i].poster_path;
            img.onerror = () => {
                img.src = "./pngtree-cinemas-clapper-in-flat-style-on-white-background-png-image_4933608.png"
            }
            divList.id = list.results[i].id;
            divList.className = "slide";
            link.href = "/getLinkPage";
            link.id = list.results[i].id;
            link.className = "linkImage";

            title.innerText = list.results[i].original_title;
            rating.innerText = list.results[i].vote_average;

            link.appendChild(img);
            divList.appendChild(title);
            divList.appendChild(link);
            divContainer.appendChild(divList);
        }

    } else {
        console.log(response.status);
    }
}

let pageNumber = 1;

window.addEventListener("DOMContentLoaded", ()=>{
    showAllMovies(pageNumber);
})

document.body.addEventListener("click", (e) => {
    // console.log(e.target.className);
    if(e.target.classList == "linkImage" || e.target.classList == "image") {
        // console.log(e.target.id);
        localStorage.setItem("movie_id", e.target.id);
        localStorage.setItem("class", e.target.className);
    } else if (e.target.classList == "buttonInput") {
        localStorage.setItem("movie_name", document.getElementById("searchValue").value);
        console.log(localStorage.getItem("movie_name"));
    }
})

document.getElementById("moreButton").addEventListener("click", ()=>{
    pageNumber += 1;
    showAllMovies(pageNumber);
})
