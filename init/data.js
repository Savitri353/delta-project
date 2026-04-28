const sampleListings = [
  {
    title: "Luxury Sea View Villa",
    description: "Enjoy a peaceful stay with stunning sea views.",
    price: 3000,
    location: "Goa",
    country: "India",
    category: "Trending",
    geometry: { type: "Point", coordinates: [73.8278, 15.4989] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/villa1.jpg", filename: "villa1" },
      { url: "https://res.cloudinary.com/demo/image/upload/villa2.jpg", filename: "villa2" }
    ]
  },
  {
    title: "Modern Beach House",
    description: "A stylish house near the beach.",
    price: 2800,
    location: "Goa",
    country: "India",
    category: "Trending",
    geometry: { type: "Point", coordinates: [73.8278, 15.4989] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/beach1.jpg", filename: "beach1" },
      { url: "https://res.cloudinary.com/demo/image/upload/beach2.jpg", filename: "beach2" }
    ]
  },

  {
    title: "Cozy Private Room",
    description: "Comfortable and budget-friendly room.",
    price: 800,
    location: "Ahmedabad",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [72.5714, 23.0225] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/room1.jpg", filename: "room1" },
      { url: "https://res.cloudinary.com/demo/image/upload/room2.jpg", filename: "room2" }
    ]
  },
  {
    title: "Minimalist Bedroom",
    description: "Simple and clean living space.",
    price: 900,
    location: "Surat",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [72.8311, 21.1702] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/room3.jpg", filename: "room3" },
      { url: "https://res.cloudinary.com/demo/image/upload/room4.jpg", filename: "room4" }
    ]
  },

  {
    title: "Royal Palace Stay",
    description: "Experience luxury in a heritage palace.",
    price: 5000,
    location: "Udaipur",
    country: "India",
    category: "Castles",
    geometry: { type: "Point", coordinates: [73.7125, 24.5854] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/castle1.jpg", filename: "castle1" },
      { url: "https://res.cloudinary.com/demo/image/upload/castle2.jpg", filename: "castle2" }
    ]
  },
  {
    title: "Historic Fort Stay",
    description: "Stay in a grand historic fort.",
    price: 4500,
    location: "Jaipur",
    country: "India",
    category: "Castles",
    geometry: { type: "Point", coordinates: [75.7873, 26.9124] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/castle3.jpg", filename: "castle3" },
      { url: "https://res.cloudinary.com/demo/image/upload/castle4.jpg", filename: "castle4" }
    ]
  },

  {
    title: "City Skyline Apartment",
    description: "Modern apartment with skyline view.",
    price: 2500,
    location: "Mumbai",
    country: "India",
    category: "Iconic city",
    geometry: { type: "Point", coordinates: [72.8777, 19.0760] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/city1.jpg", filename: "city1" },
      { url: "https://res.cloudinary.com/demo/image/upload/city2.jpg", filename: "city2" }
    ]
  },
  {
    title: "Luxury City Penthouse",
    description: "Premium penthouse in the city center.",
    price: 6000,
    location: "Bangalore",
    country: "India",
    category: "Iconic city",
    geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/city3.jpg", filename: "city3" },
      { url: "https://res.cloudinary.com/demo/image/upload/city4.jpg", filename: "city4" }
    ]
  },

  {
    title: "Mountain View Cabin",
    description: "Relax in the mountains with scenic views.",
    price: 2000,
    location: "Manali",
    country: "India",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [77.1887, 32.2432] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/mountain1.jpg", filename: "mountain1" },
      { url: "https://res.cloudinary.com/demo/image/upload/mountain2.jpg", filename: "mountain2" }
    ]
  },
  {
    title: "Snow Cottage",
    description: "Cozy cottage surrounded by snow.",
    price: 2200,
    location: "Shimla",
    country: "India",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [77.1734, 31.1048] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/mountain3.jpg", filename: "mountain3" },
      { url: "https://res.cloudinary.com/demo/image/upload/mountain4.jpg", filename: "mountain4" }
    ]
  },

  {
    title: "Infinity Pool Villa",
    description: "Luxury villa with private infinity pool.",
    price: 4000,
    location: "Lonavala",
    country: "India",
    category: "Amazing Pools",
    geometry: { type: "Point", coordinates: [73.4062, 18.7546] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/pool1.jpg", filename: "pool1" },
      { url: "https://res.cloudinary.com/demo/image/upload/pool2.jpg", filename: "pool2" }
    ]
  },
  {
    title: "Rooftop Pool Apartment",
    description: "Enjoy skyline views from the pool.",
    price: 3500,
    location: "Delhi",
    country: "India",
    category: "Amazing Pools",
    geometry: { type: "Point", coordinates: [77.1025, 28.7041] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/pool3.jpg", filename: "pool3" },
      { url: "https://res.cloudinary.com/demo/image/upload/pool4.jpg", filename: "pool4" }
    ]
  },

  {
    title: "Forest Camping Experience",
    description: "Stay in tents with bonfire nights.",
    price: 1200,
    location: "Rishikesh",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [78.2676, 30.0869] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/camp1.jpg", filename: "camp1" },
      { url: "https://res.cloudinary.com/demo/image/upload/camp2.jpg", filename: "camp2" }
    ]
  },
  {
    title: "Luxury Glamping Tent",
    description: "Camping with modern comfort.",
    price: 1800,
    location: "Coorg",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [75.8069, 12.3375] },
    images: [
      { url: "https://res.cloudinary.com/demo/image/upload/camp3.jpg", filename: "camp3" },
      { url: "https://res.cloudinary.com/demo/image/upload/camp4.jpg", filename: "camp4" }
    ]
  }
];


module.exports = { data: sampleListings };