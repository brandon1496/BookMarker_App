// Listen for form submit

document.getElementById("myform").addEventListener('submit', SaveBookMark);

var frm = document.getElementById("myform");

function SaveBookMark(e) {
    var SiteName = document.getElementById("SiteName").value;
    var SiteUrl = document.getElementById("SiteUrl").value;
    if (!SiteUrl || !SiteName) {
        alert("Please fill in the Form");
        // Returns False so that it doesn't keep alerting 
        return false;
    }
    // When User submits data reset function clears the data from the form
    frm.reset();
    var bookmark = {
        name: SiteName,
        url: SiteUrl
    }
    /*
    console.log(bookmark);
    localStorage.setItem("test", "Hello World");
    localStorage.getItem("")
    */

    if (localStorage.getItem("bookmarks") == null) {
        // Init Array
        var bookmarks = [];
        // adds the bookmark object to the array
        bookmarks.push(bookmark);
        // Stringify will turn the json into a string
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        FetchBookMarks();


    }
    else {
        // get bookmarks from local storage 
        // turn the string into JSON
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        FetchBookMarks();
    }


    // Prevent Form from submiting
    e.preventDefault();
}
//Delete Function to delete BookMark

function deletebookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks.length; i++){
        if (bookmarks[i].url == url) {
            // Remove from Array
            bookmarks.splice(i, 1);
        }
    }
    // Reseting the local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // Updating the page with the current bookmarks
    FetchBookMarks();

}

function FetchBookMarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var results = document.getElementById('Results');
    results.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        results.innerHTML += '<div style="margin-top:10px" class="card card-body bg-light">' +
            '<h4>' + name +
            '<a class = "btn btn-default" target = "_blank" href = "' + url + '">Visit</a>' +
            '<a onclick="deletebookmark(\'' + url +'\')" class = "btn btn-danger"  href = "#">Delete</a>' +
        '</h4>' +
            '</div';
    }
}