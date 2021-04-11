/* Show only the contents of the selected page */
const showHome = () => {
    document.getElementById("Home").style.display = "block";
    document.getElementById("Product").style.display = "none";
    document.getElementById("Location").style.display = "none";
    document.getElementById("News").style.display = "none";
    document.getElementById("Guestbook").style.display = "none";

    document.getElementById("homeTab").style.backgroundColor = "lightgrey";
    document.getElementById("productTab").style.backgroundColor = "transparent";
    document.getElementById("locationTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("guestBookTab").style.backgroundColor = "transparent";

}

const showProduct = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Product").style.display = "block";
    document.getElementById("Location").style.display = "none";
    document.getElementById("News").style.display = "none";
    document.getElementById("Guestbook").style.display = "none";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("productTab").style.backgroundColor = "lightgrey";
    document.getElementById("locationTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("guestBookTab").style.backgroundColor = "transparent";

    const item = " ";
    getProduct(item); //call to make items show up

}

const showtheProduct = (product) => {
    //alert(product);
    const pTab = document.getElementById("pTab"); //pTab is where the content is going to go (defined in html)
    let paraContent = "<p> </p>"

    //adding contents to the paragrah body by getting fields from the server
    const addContent = (content) => {
        paraContent += "<p><b>" + content.Title + "</b></p>";
        paraContent += "<p> <img style='width:300px' src = 'http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + content.ItemId + "' alt ='Image of article'></img> </p>"
        paraContent += "<p id = 'originItem'>" + content.Origin + "</p>";
        paraContent += "<p id = 'priceItem'> $" + content.Price + "</p>";
        paraContent += "<p> <button id ='buttonBuy' style = 'width: 150px; height: 40px;' type='button' onclick='buyNow()'> Buy Now </button> </p>";
        paraContent += "<p> <hr width='120%' /></p>";
    }
    product.forEach(addContent); //loop through all product items 
    pTab.innerHTML = paraContent; //display contentn
}



const getProduct = (item) => { //item is returned from function and then added on to find the item
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term=' + item,
        {
            headers: {
                "Accept": "application/json",
            },
        });
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then((j) => showtheProduct(j));

}

//as soon as user types in the search bar this function is called
function inputFunction() {
    let ans = document.getElementById("myInput").value //get the value from the search bar and return this
    getProduct(ans);
}


const showLocation = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Product").style.display = "none";
    document.getElementById("Location").style.display = "block";
    document.getElementById("News").style.display = "none";
    document.getElementById("Guestbook").style.display = "none";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("productTab").style.backgroundColor = "transparent";
    document.getElementById("locationTab").style.backgroundColor = "lightgrey";
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("guestBookTab").style.backgroundColor = "transparent";

    //response get text
    const showVCard = (card) => {
        const vcard = document.getElementById("vcard"); //where we are going to put the data 

        const newLine = card.split('\n'); //split by /n
        //console.log(newLine); //testing 

        const semi = []; //new array 
        for (i = 0; i < newLine.length; i++) { //split again by : to get key and value and assign to new array
            semi.push(newLine[i].split(':'));
        }
        //console.log(semi);//testing

        let address = "";
        let tel = "";
        let email = "";
        //cannot hard code values so have to search for the address, phone email from the server
        for (i = 0; i < semi.length; i++) {
            if (semi[i][0] == "TEL;WORK;VOICE") {
                tel = semi[i][1];
            } else if (semi[i][0] == "ADR;WORK;PREF") {
                address = semi[i][1];
            } else if (semi[i][0] == "EMAIL") {
                email = semi[i][1];
            }
        }


        //get the key values and assign them, phone, address, email
        let paraContent = "<p>" + address.split(";").join("") + "</p>"; //address
        paraContent += "<p> <a href = tel:'" + tel + "'> " + tel + "</a></p>"; //phone
        paraContent += "<p> <a href = mailto:'" + email + "'> " + email + "</a></p>"; //email
        paraContent += "<p> <a href = 'http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard' download> Add us to your address Book</p>"

        vcard.innerHTML = paraContent; //display content
    }

    //after fetching, parse it as a text not json 
    const getVCard = () => {
        const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard')
        const streamPromise = fetchPromise.then((response) => response.text());
        streamPromise.then((j) => showVCard(j)); //calling showVCard to to string manipulation to get right values
    }
    getVCard();

}

const showNews = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Product").style.display = "none";
    document.getElementById("Location").style.display = "none";
    document.getElementById("News").style.display = "block";
    document.getElementById("Guestbook").style.display = "none";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("productTab").style.backgroundColor = "transparent";
    document.getElementById("locationTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").style.backgroundColor = "lightgrey";
    document.getElementById("guestBookTab").style.backgroundColor = "transparent";

    const showtheNews = (news) => {
        //alert(news);
        const nTab = document.getElementById("nTab");
        let paraContent = "<p> </p>"

        const addContent = (content) => { //using the fields from the server
            paraContent += "<p><b>" + content.titleField + "</b></p>";
            paraContent += "<p> <a href = '" + content.linkField + "'> <img style='width:300px' src ='" + content.enclosureField.urlField + "' alt ='Image of article'></img> </a></p>"
            paraContent += "<p>" + content.pubDateField + "</p><p>" + content.descriptionField + "</p>";
            paraContent += "<p> <hr width='120%' /></p>";
        }
        news.forEach(addContent);
        nTab.innerHTML = paraContent; //display news on page
    }

    const getNews = () => {
        const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news',
            {
                headers: {
                    "Accept": "application/json",
                },
            });
        const streamPromise = fetchPromise.then((response) => response.json());
        streamPromise.then((j) => showtheNews(j));

    }
    getNews();
}

const showGuestBook = () => {
    document.getElementById("Home").style.display = "none";
    document.getElementById("Product").style.display = "none";
    document.getElementById("Location").style.display = "none";
    document.getElementById("News").style.display = "none";
    document.getElementById("Guestbook").style.display = "block";

    document.getElementById("homeTab").style.backgroundColor = "transparent";
    document.getElementById("productTab").style.backgroundColor = "transparent";
    document.getElementById("locationTab").style.backgroundColor = "transparent";
    document.getElementById("newsTab").style.backgroundColor = "transparent";
    document.getElementById("guestBookTab").style.backgroundColor = "lightgrey";

}

//posting comments here 
function postButton() {
    let userName = document.getElementById("nameBox").value;
    const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/comment?name=" + userName,
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST", //POST method to send to the server (Not get)
            body: JSON.stringify(document.getElementById("commentBox").value),
        });

    const streamPromise = fetchPromise.then((response) => response.json());//stream of data
    //streamPromise.then((j) => alert(j)); //testing first with alert
    streamPromise.then((j) => {
        document.getElementById("serverComment").innerHTML = j;

    });
}

//refresh function so server keeps updated
function refresh() {
    (document.getElementsByName("refreshTheFrame")[0]).src = (document.getElementsByName("refreshTheFrame")[0]).src
}
window.setInterval("refresh();", 1200);

window.onload = showHome; //default page when loaded starts on this page first






