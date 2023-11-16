
// const url = "https://api.themoviedb.org/3/find/external_id?external_source=";
const url = "https://api.themoviedb.org/3/movie/";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzQ1NDA2MDg1MGM5MGM5ZjU5NGNkM2JhYjcyYjA5YSIsInN1YiI6IjY1NGFhNTNlMzkxYjljMDExZDMwMWI1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RpT9YRkKEN1Jtcb9KXDhxELii_hY-ExXqaPB5Fft7ds'
  }
};

const id = localStorage.getItem("movie_id");
const id2 = localStorage.getItem("movie_name");
// console.log(id2);
async function displayInfo() {

    const response = await fetch(url + id, options);
    const divParent = document.getElementById("imageBox");
    const divParent2 = document.getElementById("overviewBox");
    const title = document.getElementById("title");

    if(response.ok) {
        const json = await response.json();
        // console.log(json);

        title.innerText = json.title;

        const image = document.createElement("img");
        image.src = "https://www.themoviedb.org/t/p/original/" + json.poster_path;
        image.id = json.id;
        image.className = "image";
        image.onerror = () => {
            image.src = "./pngtree-cinemas-clapper-in-flat-style-on-white-background-png-image_4933608.png"
        }

        divParent.appendChild(image);

        const tagLine = document.createElement("h3");
        tagLine.innerText = json.tagline;
        tagLine.className = "tag";
        tagLine.style.fontSize = "30px";

        const summary = document.createElement("p");
        summary.textContent = json.overview;
        summary.className = "summary";

        divParent2.appendChild(tagLine);
        divParent2.appendChild(summary);

        const miscDiv = document.createElement("div");
        miscDiv.id = "misc";
        miscDiv.className = "miscBox";

        const release = document.createElement("p");
        release.innerText = "Release Date : \n" + "\n" + json.release_date;
        release.id = "date";
        const revenue = document.createElement("p");
        revenue.innerText = "Revenue : \n" + "\n" + "$" + json.revenue;
        revenue.id = "money";
        const runtime = document.createElement("p");
        runtime.innerText = "Duration : \n" + "\n" + json.runtime + " minutes";
        runtime.id = "time";
        
        miscDiv.style.fontSize = "16px";
        miscDiv.appendChild(release);
        miscDiv.appendChild(revenue);
        miscDiv.appendChild(runtime);

        divParent2.appendChild(miscDiv);
        
    } else {
        console.log(response.status);
    }

}

async function getActor() {
    const url1 = "https://api.themoviedb.org/3/movie/"+id+"/credits";
    const response = await fetch(url1, options);

    if(response.ok) {
        const list = await response.json();
        const divParent = document.getElementById("actorList");

        // console.log(list);
        for(let i = 0; i < list.cast.length; i++) {
            const name = list.cast[i].name;
            const movieName = list.cast[i].character;
            // const picture = "https://www.themoviedb.org/t/p/original" + list.cast[i].profile_path;
            const picture = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2" + list.cast[i].profile_path;
            const actorId = list.cast[i].id;

            const divActor = document.createElement("div");
            divActor.id = actorId;
            divActor.className = "actorDiv";

            const Name = document.createElement("p");
            Name.innerText = name;
            divActor.appendChild(Name);
            Name.style.fontSize = "20px";

            const actorPicture = document.createElement("img");
            actorPicture.src = picture;
            actorPicture.onerror = () => {
                actorPicture.src = "./blank-avatar-photo-icon-design-vector-30257190.jpg"
            }
            actorPicture.className = "picture";
            divActor.appendChild(actorPicture);

            const characterName = document.createElement("p")
            characterName.innerText = "( " + movieName + " )";
            characterName.style.fontSize = "16px";
            divActor.appendChild(characterName);

            divParent.appendChild(divActor);

        }


    } else {
        console.log(response);
    }

}

async function sendMovieToList() {
    
    const movie_id = document.getElementsByClassName("image");
    const title = document.getElementById("title").innerText;
    const timeLength = document.getElementById("time").innerText;
    const dura = timeLength.split("\n")[2];
    const release = document.getElementById("date").innerText;
    const date = release.split("\n")[2];

    let data = {
        movie_id : movie_id[0].id,
        src : movie_id[0].src, 
        title : title,
        duration : dura,
        release_date : date
    }


    const response = await fetch("/post", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body : JSON.stringify(data)
    })

    if(response.ok) {
        console.log(response.status);
    } else {
        console.log(response.status);
    }

}

function popUp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}



window.addEventListener("load", ()=> {
    displayInfo();
    getActor();
});


document.getElementById("favoriteButton").addEventListener("click", ()=>{
    sendMovieToList();
    popUp();
})
