const express = require("express");

const app = express();
const port = 3000;

const generateSafetyPlacesData = () => {
  const safetyPlaces = [
    {
      name: "Şcoala Primară Bucureşti",
      address: "Str. Colţei nr. 27, Bucureşti, Sectorul 3, 101164",
      capacity: 154,
      functionalities: ["Medical Supplies", "Water"],
      latitude: 44.52177554563558,
      longitude: 26.10015990032141,
      type: "civil",
    },
    {
      name: "Grădinița Natura",
      address: "Str. Morii nr. 25, Bucureşti, Sectorul 1, 031314",
      capacity: 129,
      functionalities: ["Food", "Medical Supplies"],
      latitude: 44.44675779906602,
      longitude: 26.03545406336894,
      type: "civil",
    },
    {
      name: "Liceul Constantin Brâncoveanu",
      address: "B-dul Timişoara nr. 48, Bucureşti, Sectorul 6, 064706",
      capacity: 79,
      functionalities: ["Water", "Medical Supplies"],
      latitude: 44.42902947048916,
      longitude: 26.03489282553001,
      type: "civil",
    },
    {
      name: "Casa Căsătoriilor",
      address: "Str. Tineretului nr. 8, Bucureşti, Sectorul 4, 049459",
      capacity: 181,
      functionalities: ["Food", "Water"],
      latitude: 44.41183488391834,
      longitude: 26.091578858953555,
      type: "civil",
    },
  ];

  return { safetyPlaces };
};

app.get("/shelters", (req, res) => {
  console.log("request");
  const safetyPlacesData = generateSafetyPlacesData();
  res.json(safetyPlacesData);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
