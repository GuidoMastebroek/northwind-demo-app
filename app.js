// De url van de Northwind API
const url = "https://northwind.vercel.app/api";

async function getCustomerList() {
    // Variabele maken die verwijst naar de (te vullen) tabel
    let tableid = "customerlist";
    let table = document.getElementById(tableid);

    try {
        // Haal de gegevens op van alle klanten van Northwind
        const response = await fetch(url + "/customers");

        // Parse de response naar een JSON object (array met customers)
        const responseJson = await response.json();

        table.deleteRow(0);
        for (let i = 0; i < responseJson.length; i++) {
            // Nieuwe rij aan de tabel toevoegen, met daarin een nieuwe cel
            let row = table.insertRow();
            let cell = row.insertCell();

            // Nieuwe cel vullen met tekst (de companyName van de customer)
            cell.innerHTML = responseJson[i].companyName;

            // Event handler voor het ophalen van de customer details
            cell.addEventListener("click", function() {
                getCustomerDetails(responseJson[i].id)});
            // Event handler voor het highlighten van de geselecteerde cel
            cell.addEventListener("click", function() {
                highlightCell(table, cell)});
        }
    }
    catch (err) {
        table.deleteRow(0);
        let row = table.insertRow();
        let cell = row.insertCell();
        cell.innerText = "Data ophalen mislukt.";
    }

    
}

async function getCustomerDetails(id) {
    // Laadmelding tonen tijdens het ophalen van de data
    document.getElementById("companyname").innerHTML = 
    "<code>Data ophalen...</code>";
    document.getElementById("contactname").innerText = "--";
    document.getElementById("contacttitle").innerText = "--";
    document.getElementById("address").innerText = "--";

    try {
        // Customer data ophalen
        const response = await fetch(url + '/customers/' + id);
        const data = await response.json();

        // Address string maken
        let addressString = data.address.street + ", " +
        data.address.city + ", " + data.address.country;

        // Juiste 'details' velden vullen 
        document.getElementById("companyname").innerText = data.companyName;
        document.getElementById("contactname").innerText = data.contactName;
        document.getElementById("contacttitle").innerText = data.contactTitle;
        document.getElementById("address").innerText = addressString;
    }
    catch (err) {
        document.getElementById("companyname").innerHTML =
        "<code>Data ophalen mislukt.</code>";
    }
}

function highlightCell(table, cell) {
    // Tekst van alle cellen normaal maken
    const allCells = table.getElementsByTagName("td");
    for (eachCell of allCells) {
        eachCell.style.fontWeight = "normal";
    }
    // Tekst van 1 cel highlighten
    cell.style.fontWeight = "bold";
}

function sortTable(tableid) {
  var table, rows, switching, i, x, y;
  table = document.getElementById(tableid);
  switching = true;
  
  // Loop die herhaalt tot er geen rijen gewisseld worden
  while (switching) {
    switching = false;
    rows = table.rows;

    // Door alle rijen loopen behalve de laatste (die heeft geen volgende rij)
    for (i = 0; i < (rows.length - 1); i++) {
      // Van huidige en volgende rij het eerste element pakken
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      
      // Checken of x en y moeten wisselen
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // Wissel de twee rijen van plek en geef aan dat een wissel plaatsvond
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
}

function switchTheme() {
    // Get handles for the root and button objects
    let root = document.querySelector(':root');
    let rootStyle = getComputedStyle(root);
    let button = document.querySelector('#themebutton');
    
    // Read all the color variables from the stylesheet
    const bgColor = rootStyle.getPropertyValue('--bgColor');
    const bgColorDay = rootStyle.getPropertyValue('--bgColorDay');
    const bgColorNight = rootStyle.getPropertyValue('--bgColorNight');
    const textColorDay = rootStyle.getPropertyValue('--textColorDay');
    const textColorNight = rootStyle.getPropertyValue('--textColorNight');
    const topbarColorDay = rootStyle.getPropertyValue('--topbarColorDay');
    const topbarColorNight = rootStyle.getPropertyValue('--topbarColorNight');
    const rowColorDay = rootStyle.getPropertyValue('--rowColorDay');
    const rowColorNight = rootStyle.getPropertyValue('--rowColorNight');
    const rowHoverColorDay = rootStyle.getPropertyValue('--rowHoverColorDay');
    const rowHoverColorNight = rootStyle.getPropertyValue('--rowHoverColorNight');
    const textHoverColorDay = rootStyle.getPropertyValue('--textHoverColorDay');
    const textHoverColorNight = rootStyle.getPropertyValue('--textHoverColorNight');

    // Switch theme by assigning different colors
    if (bgColor == bgColorDay) {
        root.style.setProperty('--bgColor', bgColorNight);
        root.style.setProperty('--textColor', textColorNight);
        root.style.setProperty('--topbarColor', topbarColorNight);
        root.style.setProperty('--rowColor', rowColorNight);
        root.style.setProperty('--rowHoverColor', rowHoverColorNight);
        root.style.setProperty('--textHoverColor', textHoverColorNight);
        button.setAttribute('src', 'sun.svg');
    } else {
        root.style.setProperty('--bgColor', bgColorDay);
        root.style.setProperty('--textColor', textColorDay);
        root.style.setProperty('--topbarColor', topbarColorDay);
        root.style.setProperty('--rowColor', rowColorDay);
        root.style.setProperty('--rowHoverColor', rowHoverColorDay);
        root.style.setProperty('--textHoverColor', textHoverColorDay);
        button.setAttribute('src', 'moon.svg');
    }

    // Save theme to localstorage, if supported by the browser
    if (typeof(Storage) !== "undefined") {
        if (bgColor == bgColorDay) {
            // Theme has been switched to night mode
            localStorage.setItem("theme", "night");
        } else {
            localStorage.setItem("theme", "day");
            document.getElementById('f').get
        }
    }
}

function loadTheme() {
    // Load theme from localstorage, if supported by the browser
    if (typeof(Storage) !== "undefined") {
        const theme = localStorage.getItem("theme");
        if (theme == "night") {
            // Default theme is day, so theme has to be changed
            switchTheme();
        }
    }
}