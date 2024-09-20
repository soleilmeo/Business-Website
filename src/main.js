console.log("start");
getPager();
getArticles(0,9);
let articleDiv = document.querySelector("div.articles");
let pager = document.querySelector("ul.pagination");

pager.addEventListener("click", function (event) { 
    let targ = event.target;
    event.preventDefault();
    if (targ.classList.contains("page-number")) {
        console.log(targ.getAttribute("data-link"));
        let offset = targ.getAttribute("data-offset") * 9;
        console.log(offset);
        getArticle(offset, 9);

        let curentActive = pager.querySelector("li.active");
        curentActive.classList.remove("active");

        let parentli = event.target.parentElement;
        parentli.classList.add("active");
    } else if (targ.classList.contains("next")) {
        let curentActive = pager.querySelector("next");
        curentActive.classList.remove("active");
        curentActive.nextElementSibling.classList.add("active");
    }
});


articleDiv.addEventListener("click", function(event) {
    console.log("article clicked");
    console.log(event); 
    console.log(event.target);
    if (event.target.classList.contains("title-link")) {
        getArticle(event.target.getAttribute("data-id"));
    } else {
        console.log("not the link");
    }
});

function getArticle(id) { 
    console.log("get articles number: " + id); 
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    let xhr = new XMLHttpRequest();
    
    xhr.open("get", url, true);
    xhr.send();
    xhr.onload= function() { 
        if (this.status === 200) { 
            console.log(this.response);
            let result = JSON.parse(this.response); 
            outputArticle(result);
        }
    }
};

function outputArticle(data) { 
    let title = document.querySelector(".jumbotron h1");
    let body = document.querySelector(".jumbotron p.body");
    title.innerText = data.title;
    body.innerText = data.body;
}

function getArticles(start = 1, limit = 10) {
    let xhr = new XMLHttpRequest();
    let url = `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`;

    xhr.open("get", url, true);
    xhr.send();
    xhr.onload = function() {
        if(this.status == 200) {
          let results = JSON.parse(this.response);
          outputArticles(results);
        }
    }
}

function outputArticles(results) {
    let output = "";
    let articleDiv = document.querySelector("div.articles");
    results.forEach(function(item) {
        output+= `<div class="col-md-4">
        <div class="card m-1">
        <div class="card-body">
            <a href="#"> 
            <h5 class="title-link" data-id="${item.id}">${item.title}</h5>
            </a>
            <p class="card-text">${item.body}</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
        </div>
      </div>
      </div>`;
    });
    articleDiv.innerHTML = output;
}


function getPager() {
    let xhr = new XMLHttpRequest();
    let url = `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=1000`;
    xhr.open("get", url, true);
    xhr.send();
    xhr.onload = function() {
        if(this.status == 200) {
            let result = JSON.parse(this.response);
            outputPager(result);
        }
    }
}

function outputPager(result) {
    console.log(result.length);
    let numPages = Math.ceil(result.length / 9);
    let previous = document.querySelector(".pagination li.previous");
    console.log(numPages);
    let output = "";
    for (let i = 1; i < numPages; i++) {
        let pageNum = i;
        let active = "";
        if (i == 1) {
            active = "active";
        }
        output += `<li class="page-item ${active}"><a class="page-link page-number" data-offset="${i}" href="#">${pageNum}</a></li>`;
    }
    previous.insertAdjacentHTML("afterend", output);
    console.log(output);
}