
// console.log(localStorage.getItem("movie_id"));

async function deleteItemFromList(deleteNum) {
    console.log(deleteNum);
    const imageID = document.getElementById("movieImage");
    // console.log(imageID);
    const response = await fetch("/deleteItem", {
        method:"DELETE",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({delete : deleteNum})

    });

    if(response.ok) {
        console.log(response.status);
        const deleteDiv = document.getElementById("movieList")
        for(let i in deleteDiv.children) {
            console.log(deleteDiv.children[0].children[2].id);
            if(deleteDiv.children[i].children[2].id == deleteNum) {
                deleteDiv.removeChild(deleteDiv.children[i]);
            }
        }
        
    } else {
        console.log(response.status);
    }
}


async function getMyList() {

    const response = await fetch("/myListData", {method:"GET"});

    if(response.ok) {
        console.log(response.status);
        const json = await response.json();
        console.log(json.movies);

        const divParentContainer = document.getElementById("movieList");

        for(let key in json.movies) {
            const listDiv = document.createElement("div");
            listDiv.id = "divContainer";
            listDiv.className = "divContainer";

            const imgDiv = document.createElement("div");
            imgDiv.id = "movieImage";
            imgDiv.className = "movieImage";

            const infoDiv = document.createElement("div");
            infoDiv.id = "info";
            infoDiv.className = "info";

            const img = document.createElement("img");
            const info1 = document.createElement("p");
            const info2 = document.createElement("h2");
            const info3 = document.createElement("p");
            const link = document.createElement("a");


            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '&#9747;';
            deleteButton.id = json.movies[key].movie_id;
            deleteButton.className = "dButton";
            deleteButton.type = "button";
            deleteButton.onclick = () => {deleteItemFromList(deleteButton.id)};

            // console.log(json.movies.src)
            img.src = String(json.movies[key].src);
            img.className = "image";
            img.id = json.movies[key].movie_id;

            link.href = "/getLinkPage";
            link.id = json.movies[key].movie_id;
            link.className = "linkImage";

            info1.innerText = json.movies[key].duration;
            info2.innerText = json.movies[key].title;
            info3.innerText = json.movies[key].release_date;
            
            link.appendChild(img);
            imgDiv.appendChild(link);

            infoDiv.appendChild(info2);
            infoDiv.appendChild(info3);
            infoDiv.appendChild(info1);

            listDiv.appendChild(imgDiv);
            listDiv.appendChild(infoDiv);
            listDiv.appendChild(deleteButton);

            divParentContainer.appendChild(listDiv);
        }
    } else {
        console.log(response.status);
    }
}

window.addEventListener("load", getMyList);
// setInterval(getMyList, 1000);

