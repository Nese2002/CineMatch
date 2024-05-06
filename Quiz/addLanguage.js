const fs = require("fs");

// Read and parse the JSON files
let countryData = JSON.parse(fs.readFileSync("countryAndLanguages.json", "utf8"));
let isoData = JSON.parse(fs.readFileSync("iso.json", "utf8"));

// Iterate over the geometries array
for (let geometry of countryData.objects.countries1.geometries) {
  // Check if the geometry has a properties object
  if (geometry.properties) {
    // Find the matching object in isoData
    let matchingIsoData = isoData.find(
      (iso) => iso.iso_3166_1 === geometry.properties.id
    );
    console.log(matchingIsoData);
    // If a matching object is found, add the language field to the geometry
    if (matchingIsoData) {
      matchingIsoData.language = geometry.properties.language;
    }
  }
}

// Write the modified isoData back to the file
fs.writeFileSync("iso.json", JSON.stringify(isoData, null, 2));
