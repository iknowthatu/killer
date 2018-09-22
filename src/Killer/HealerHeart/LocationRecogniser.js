class LocationRecognizer {
  constructor() {
    this.init();
  }

  init() {

  }

  createDB() {
    //this.database = ;
  }
}

let db = [
  {
    id: 465,
    name: "Пастбище",
    ways: [468, 470]
  },
  {
    id: 468,
    name: "Маршрут 8",
    ways: [465, ]
  },
  {
    id: 470,
    name: "Кристалльное озеро"
  }
];

export default LocationRecognizer;