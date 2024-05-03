const fs = require("fs");

// Read both files concurrently using Promise.all
Promise.all([
  fs.promises.readFile("country.json", "utf8"),
  fs.promises.readFile("iso.json", "utf8"),
])
  .then(([countryData, isoData]) => {
    try {
      const countries = JSON.parse(countryData);
      const isoCodes = JSON.parse(isoData);
      
      // Create a map for quick lookup of iso codes
      const isoMap = new Map(
        isoCodes.map((entry) => [entry.english_name, entry.iso_3166_1])
    );
    
    // Replace the id of each country
    for (const country of countries.features) {
        console.log(country.properties.name);
        if (isoMap.has(country.properties.name)) {
          country.id = isoMap.get(country.properties.name);
        }
      }

      // Write the modified data back to country.json
      fs.promises.writeFile(
        "country.json",
        JSON.stringify(countries.features, null, 2)
      );
    } catch (err) {
      console.error("Error parsing JSON:", err);
    }
  })
  .catch((err) => {
    console.error("Error reading file:", err);
  });
