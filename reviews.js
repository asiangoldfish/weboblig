let btn = document.getElementsByTagName("button");
let container = document.getElementById("reviews-container");

let posts = [];

let base_url = "https://jsonplaceholder.typicode.com/posts/";
let currentPost = 1;

function fetchPost(url) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        
        xhr.open("GET", url);
        xhr.send();

        xhr.onload = function() {
            data = JSON.parse(xhr.responseText);
            const ret = {};
            ret.title = data.title;
            ret.body = data.body
            resolve(ret);
        }
    });
}

function btnClick() {
    // Create a row
    let row = document.createElement("div");
    row.className = "reviews-row";

    document
        .getElementById("reviews-container")
        .appendChild(row);
    
    // Create URLs
    const n = currentPost;
    let urls = [];
    for (let i = currentPost; i < n+3; i++) {
        urls.push(base_url + i.toString());
    }

    // https://stackoverflow.com/a/53111342
    Promise.all(
        urls.map(url => {
            return fetchPost(url);
        })
    ).then(data => {
        for (let i = 0; i < 3; i++) {
            let title = document.createElement("p");
            title.innerHTML = data[i].title;

            let body = document.createElement("p");
            body.innerHTML = data[i].body;

            let article = document.createElement("article");
            article.className = "post";
            article.appendChild(title);
            article.appendChild(body);

            container.lastElementChild.appendChild(article);
        }

        currentPost += 3;
    }).catch(error => {
        console.log(error);
    })
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) == document.body.offsetHeight) {
        alert("Bottom");
    }
};

function onEOF() {
    console.log("End of file. Load some more posts!");
}

