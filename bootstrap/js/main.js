var siteName = document.getElementById("siteNameInp");
var siteUrl = document.getElementById("siteUrlInp");

var regex1 = /^[A-Za-z0-9]{3,15}$/;
var regex2 = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[^\s]*)?$/;

var urlAlert = document.getElementById("urlAlert");

var sitesContainer = [];

if (localStorage.getItem("mySites") != null) {
    sitesContainer = JSON.parse(localStorage.getItem("mySites"));
    displaySites(sitesContainer);
}
else {
    sitesContainer = [];
}

function addSite() {
    if (regex1.test(siteName.value) && regex2.test(siteUrl.value)) {
        var sites = {
            name: siteName.value,
            url: siteUrl.value
        }
        sitesContainer.push(sites);
        localStorage.setItem("mySites", JSON.stringify(sitesContainer));
        displaySites(sitesContainer);
        clearForm();
    }
    else {
        window.alert(`Site Name or Url is not valid, Please follow the rules below :

        1 - Site name must contain at least 3 characters
        2 - Site URL must be a valid one`)
    }
}

function displaySites(data) {
    var cartona = ``;
    for (var i = 0; i < sitesContainer.length; i++) {
        cartona += `<tr>
        <td> ${i + 1} </td>
        <td> ${data[i].name} </td>
        <td> <button class="btn btn-sm btn-warning px-3" onclick="visitSite(${i})"> <i class="fa-solid fa-eye pe-2"></i> Visit </button> </td>
        <td> <button class="btn btn-sm btn-danger px-3" onclick="deleteSite(${i})"> <i class="fa-solid fa-trash-can"></i> Delete </button> </td>
    </tr>`
    }

    document.getElementById("tableList").innerHTML = cartona;
}

function clearForm() {
    siteName.value = "";
    siteUrl.value = "";
}

function deleteSite(index) {
    sitesContainer.splice(index, 1);
    localStorage.setItem("mySites", JSON.stringify(sitesContainer));
    displaySites(sitesContainer);
}

function visitSite(index) {
    window.open(sitesContainer[index].url);
}

function validateSiteName() {
    console.log(regex1.test(siteName.value));

    if (regex1.test(siteName.value)) {
        siteName.classList.remove("is-invalid");
        siteName.classList.add("is-valid")
    }
    else {
        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid");
    }
}

function validateSiteUrl() {
    console.log(regex2.test(siteUrl.value));

    urlAlert.classList.replace("d-none", "d-block")

    if (regex2.test(siteUrl.value)) {
        siteUrl.classList.remove("is-invalid");
        siteUrl.classList.add("is-valid")
    }
    else {
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid");
    }
    
}

