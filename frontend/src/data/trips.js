import paris1 from '../assets/paris.jpg'
import paris from '../assets/paris1.jpg'
import paris2 from '../assets/paris2.jpg'
import paris3 from '../assets/paris3.jpg'
import tokyoJapan from '../assets/tokyo-japan.jpg'
import tokyoJapan1 from '../assets/tokyo-japan1.jpg'
import tokyoJapan2 from '../assets/tokyo-japan2.jpg'
import tokyoJapan3 from '../assets/tokyo-japan3.jpg'
import safariKenya from '../assets/safari-kenya.jpg'
import safariKenya1 from '../assets/safari-kenya1.jpg'
import safariKenya2 from '../assets/safari-kenya2.jpg'
import safariKenya3 from '../assets/safari-kenya3.jpg'
import lekki from '../assets/lekki.jpg'
import lekki1 from '../assets/lekki1.jpg'
import lekki2 from '../assets/lekki2.jpg'
import lekki3 from '../assets/lekki3.jpg'
import timesSquare from '../assets/times-square.jpg'
import timesSquare1 from '../assets/times-square1.jpg'
import timesSquare2 from '../assets/times-square2.jpg'
import timesSquare3 from '../assets/times-square3.jpg'
import burjk from '../assets/burjk.jpg'
import burjk1 from '../assets/burjk1.jpg'
import burjk2 from '../assets/burjk2.jpg'
import burjk3 from '../assets/burjk3.jpg'
import victoria from '../assets/victoria.jpg'
import victoria1 from '../assets/victoria1.jpg'
import victoria2 from '../assets/victoria2.jpg'
import victoria3 from '../assets/victoria3.jpg'
import tableMountain from '../assets/table-mountain.jpg'
import tableMountain1 from '../assets/table-mountain1.jpg'
import tableMountain2 from '../assets/table-mountain2.jpg'
import tableMountain3 from '../assets/table-mountain3.jpg'
import greatWall from '../assets/greatwall.jpg'
import greatWall1 from '../assets/greatwall1.jpg'
import greatWall2 from '../assets/greatwall2.jpg'
import greatWall3 from '../assets/greatwall3.jpg'
import santorini from '../assets/santorini.jpg'
import santorini1 from '../assets/santorini1.jpg'
import santorini2 from '../assets/santorini2.jpg'
import santorini3 from '../assets/santorini3.jpg'
import machu from '../assets/machu.jpg'
import machu1 from '../assets/machu1.jpg'
import machu2 from '../assets/machu2.jpg'
import machu3 from '../assets/machu3.jpg'
import kyotoTemple from '../assets/kyoto-temple.jpg'
import kyotoTemple1 from '../assets/kyoto-temple1.jpg'
import kyotoTemple2 from '../assets/kyoto-temple2.jpg'
import kyotoTemple3 from '../assets/kyoto-temple3.jpg'
import bigBen from '../assets/big-ben.jpg'
import bigBen1 from '../assets/big-ben1.jpg'
import bigBen2 from '../assets/big-ben2.jpg'
import bigBen3 from '../assets/big-ben3.jpg'
import obudu from '../assets/obudu.jpg'
import obudu1 from '../assets/obudu1.jpg'
import obudu2 from '../assets/obudu2.jpg'
import obudu3 from '../assets/obudu3.jpg'
import yesomiteValley from '../assets/yesomite-valley1.jpg'
import yesomiteValley2 from '../assets/yesomite-valley2.jpg'
import yesomiteValley3 from '../assets/yesomite-valley3.jpg'
import yesomiteValley1 from '../assets/yosemite-valley.jpg'
import Serengeti from '../assets/serengeti.jpg'
import Serengeti1 from '../assets/serengeti1.jpg'
import Serengeti2 from '../assets/serengeti2.jpg'
import Serengeti3 from '../assets/serengeti3.jpg'
import iguazuFalls from '../assets/iguazu-falls.jpg'
import iguazuFalls1 from '../assets/iguazu-falls1.jpg'
import iguazuFalls2 from '../assets/iguazu-falls2.jpg'
import iguazuFalls3 from '../assets/iguazu-falls3.jpg'





const trips = [
  {
    id: "1",
    title: "Trip to Paris",
    location: "France",
    date: "2025-08-01",
    description: "Explore the city of lights and love, Guided tour of the most famous landmarks in Paris Skip-the-line access to Eiffel Tower and Louvre Museum Professional local guide with deep knowledge of Parisian history Time for personal photos and coffee breaks Ideal for first-time visitors who want a complete overview",
    reaction: 46,
    image: [
        paris,
        paris1,
        paris2,
        paris3,
    ],
    tripInformation:{
      duration: '5 days, 4 night', 
      groupSize: 'Max 12 people', 
      language: 'English, French',
      difficulty: 'Easy', 
      bestTime: ' Year-round' 
    },
    whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    {head: "", details: "Meet at Trocadéro and admire the Eiffel Tower view."},
    {head: "", details: "Climb or take the lift to the Eiffel Tower viewing deck."},
    {head: "", details: "Walk along the Seine River towards Notre Dame Cathedral."},
    {head: "", details: "Visit the Louvre Museum with a guided highlights tour."},
    {head: "", details: "End at Montmartre for sunset views and an authentic Parisian dinner."}
  ],
  reviews: [
    { name: "Alice B.", rating: 50, comment: "Absolutely breathtaking! Our guide made history come alive." },
    { name: "James P.", rating: 73, comment: "Loved skipping the lines. Totally worth it!" },
    { name: "Caroline W.", rating: 76, comment: "Beautiful experience. Could have spent more time at Montmartre." },
    { name: "Victor L.", rating: 56, comment: "Fantastic tour, covered so much in one day without feeling rushed." },
    { name: "Naomi K.", rating: 49, comment: "Great way to see the highlights of Paris quickly." }
  ]
  },
  {
    id: "2",
    title: "Safari in Kenya",
    location: "Kenya",
    date: "2025-06-15",
    description: "Adventure through the savannahs, Explore the Maasai Mara with experienced safari guides, See the Big Five in their natural habitat Stay at luxury tented camps with all-inclusive meals Witness the famous Great Migration (seasonal) Enjoy cultural visits with local Maasai communities.",
    reaction: 35,
    image: [
        safariKenya,
        safariKenya1,
        safariKenya2,
        safariKenya3
    ],
     tripInformation: {
      duration: '6 days, 5 nights',
      groupSize: 'Max 15 people',
      language: 'English, Swahili',
      difficulty: 'Moderate',
      bestTime: 'June to October (dry season for best wildlife viewing)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Morning Game Drive", details: "Head out early with your guide to see lions, elephants, giraffes, and other wildlife as the sun rises over the Maasai Mara." },
    { head: "Cultural Visit", details: "Visit a Maasai village to experience local culture, traditions, and storytelling." },
    { head: "Bush Picnic", details: "Enjoy a picnic lunch under the shade of an acacia tree while taking in the vast savannah views." },
    { head: "Afternoon Safari", details: "Go on another game drive focusing on spotting leopards, cheetahs, and the Big Five in action." },
    { head: "Sunset & Campfire", details: "Return to your lodge or tented camp for dinner and relax by the campfire under the stars." }
  ],
  reviews: [
    { name: "Lucas M.", rating: 69, comment: "A dream come true! Saw lions, elephants, and giraffes in one day." },
    { name: "Olivia S.", rating: 85, comment: "Incredible experience. Loved the guides and the accommodations." },
    { name: "Mark D.", rating: 59, comment: "The migration was spectacular. Perfectly organized trip." },
    { name: "Sophia R.", rating: 54, comment: "Great safari! Would recommend to any wildlife lover." },
    { name: "Ben T.", rating: 95, comment: "Truly unforgettable – worth every penny." }
  ]
  },
  {
    id: "3",
    title: "Tokyo Food Tour",
    location: "Japan",
    date: "2025-11-10",
    description: "Discover the flavors of Japan Experience an authentic culinary journey through the streets of Tokyo, Taste over 15 different Japanese delicacies, from sushi to wagashi, Guided by local food experts who share cultural insights and history Small group tour with an intimate and personalized experience, Perfect for food lovers who want to explore beyond tourist spots.",
    reaction: 144,
    image: [
        tokyoJapan,
        tokyoJapan1,
        tokyoJapan2,
        tokyoJapan3,
    ],
     tripInformation: {
        duration: '3 days, 2 nights',
        groupSize: 'Max 10 people',
        language: 'English, Japanese',
        difficulty: 'Easy',
        bestTime: 'March to May and September to November (pleasant weather)'
      },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Tsukiji Outer Market", details: "Begin the day at the bustling market with tastings of fresh seafood, grilled snacks, and traditional Japanese street food." },
    { head: "Sushi Workshop", details: "Learn the basics of sushi-making from a local chef and taste your own creations." },
    { head: "Asakusa Food Stroll", details: "Explore the historic streets of Asakusa, sampling tempura, melon bread, and other local specialties." },
    { head: "Matcha & Wagashi", details: "Take a break for Japanese tea and traditional sweets in a serene tea house in Ueno." },
    { head: "Izakaya Dinner", details: "End the evening with a lively izakaya dining experience in Shinjuku, tasting yakitori and local drinks." }
  ],
  reviews: [
    {
      name: "Sophia M.",
      rating: 59,
      comment: "An unforgettable experience! The guide was amazing, and every dish was delicious."
    },
    {
      name: "Liam K.",
      rating: 24,
      comment: "Great food and cultural insights. Would have loved a bit more time at the sushi workshop."
    },
    {
      name: "Hiro T.",
      rating: 25,
      comment: "As a Tokyo local, I was surprised how many hidden gems we visited. Highly recommended!"
    },
    {
      name: "Emily R.",
      rating: 75,
      comment: "The izakaya dinner was the highlight of my trip. Perfect end to a food-filled day."
    },
    {
      name: "Daniel S.",
      rating: 54,
      comment: "Excellent variety of food and well organized. Walking was a bit long but worth it!"
    }
  ]
  },
  {
    id: "4",
    title: "Lekki Conservation Centre ",
    location: "Lagos, Nigeria",
    date: "2025-08-01",
    description: `Nature reserve with Africa’s longest canopy walkway, Walk along the famous 401-meter canopy walkway Spot monkeys, peacocks, and crocodiles in their natural habitat, Picnic spots surrounded by lush greenery Learn about Nigerian wildlife conservation efforts Perfect for outdoor lovers and families.`,
    reaction: 256,
    image: [
       lekki,
       lekki1,
       lekki2,
       lekki3,
    ],
    tripInformation: {
        duration: '2 days, 1 night',
        groupSize: 'Max 20 people',
        language: 'English',
        difficulty: 'Easy',
        bestTime: 'November to March (dry season, best for outdoor activities)'
      },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Arrival & Orientation", details: "Meet at the Lekki Conservation Centre and receive a brief introduction to the park's history and wildlife." },
    { head: "Canopy Walk", details: "Experience the famous canopy walkway, the longest in Africa, with breathtaking aerial views of the forest." },
    { head: "Wildlife Spotting", details: "Explore trails to see monkeys, birds, and other native animals in their natural habitat." },
    { head: "Relaxation", details: "Enjoy a picnic and rest at the open lawn area or visit the treehouse for a view from above." },
    { head: "Local Crafts", details: "Optional visit to Lekki Arts & Crafts Market before departure." }
  ],
  reviews: [
    { name: "Ngozi A.", rating: 65, comment: "Loved the canopy walk! Nature at its best." },
    { name: "David O.", rating: 54, comment: "Peaceful and fun. The monkeys were playful!" },
    { name: "Chiamaka K.", rating: 75, comment: "Perfect weekend getaway in Lagos." },
    { name: "Emmanuel T.", rating: 34, comment: "Beautiful, though a bit crowded during the weekend." },
    { name: "Laura N.", rating: 35, comment: "The canopy view is incredible!" }
  ]
  },
  {
    id: "5",
    title: "Burj Khalifa ",
    location: "Dubai, UAE",
    date: "2025-07-15",
    description: "Tallest building in the world, with observation decks and luxury amenities, Visit the Burj Khalifa, the tallest building in the world and Dubai’s crown jewel. Soaring 828 meters into the sky, this architectural masterpiece offers breathtaking panoramic views from its observation decks, luxury dining experiences, and an unforgettable journey into modern innovation and design.",
    reaction: 1025,
    image: [
        burjk,
        burjk1,
        burjk2,
        burjk3,
    ],
    tripInformation: {
      duration: '2 days, 1 night',
      groupSize: 'Max 15 people',
      language: 'English, Arabic',
      difficulty: 'Easy',
      bestTime: 'November to March (cooler months)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Dubai Mall Visit", details: "Explore Dubai Mall attractions such as the Aquarium and Underwater Zoo." },
    { head: "Observation Deck", details: "Take the world's fastest elevator to Burj Khalifa's 124th & 125th floors." },
    { head: "Skyline Views", details: "Enjoy incredible 360° views of Dubai city and the desert from above." },
    { head: "Fountain Show", details: "Watch the spectacular Dubai Fountain show from the outdoor terrace." },
    { head: "Dinner Experience", details: "Have dinner at a luxurious restaurant in Downtown Dubai." }
  ],
  reviews: [
    { name: "Hassan A.", rating: 25, comment: "Breathtaking! The view from 148 is unreal." },
    { name: "Maria P.", rating: 95, comment: "Smooth entry and excellent guide." },
    { name: "Jacob S.", rating: 44, comment: "Worth it, but the lines can be long even with tickets." },
    { name: "Fiona D.", rating: 65, comment: "Sunset at the top was magical." },
    { name: "Ahmed R.", rating: 15, comment: "An unforgettable bucket list experience." }
  ]
  },
  {
    id: "6",
    title: "Times Square ",
    location: "New York, USA",
    date: "2025-8-10",
    description: "Brightly lit hub of theaters, shopping, and entertainment, Experience the dazzling energy of Times Square – the heart of New York City – where giant digital billboards, Broadway theaters, world-class restaurants, and endless entertainment come together. Known as “The Crossroads of the World,” Times Square is a vibrant hub that never sleeps, perfect for shopping, sightseeing, and capturing iconic photos.",
    reaction: 32,
    image: [
        timesSquare,
        timesSquare1,
        timesSquare2,
        timesSquare3,
    ],
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
    tripInformation: {
      duration: '3 days, 2 nights',
      groupSize: 'Max 20 people',
      language: 'English',
      difficulty: 'Easy',
      bestTime: 'April to June and September to November (pleasant weather)'
    },
  itinerary: [
    { head: "Times Square Exploration", details: "Begin with the vibrant energy of Times Square and take photos with the iconic billboards." },
    { head: "Broadway Walk", details: "Stroll along Broadway and learn about the historic theaters." },
    { head: "Fun Stops", details: "Stop at M&M’s World and Hershey’s Chocolate World for fun souvenirs." },
    { head: "Rooftop Dinner", details: "Dine at a rooftop restaurant with panoramic views of Times Square." },
    { head: "Neon Night", details: "Experience the dazzling lights of Times Square after dark." }
  ],
  reviews: [
    { name: "Lily H.", rating: 65, comment: "So vibrant and lively! A must-see in NYC." },
    { name: "Michael B.", rating: 74, comment: "Crowded but unforgettable energy." },
    { name: "Sarah K.", rating: 95, comment: "Loved the Broadway area and the lights!" },
    { name: "Ethan M.", rating: 15, comment: "Great guided walk, fun stories and stops." },
    { name: "Nora F.", rating: 24, comment: "Busy but that's part of the charm." }
  ]
  },
  {
    id: "7",
    title: "Victoria Island ",
    location: "Lagos, Nigeria",
    date: "2025-09-01",
    description: "Upscale area with beaches, hotels, and vibrant nightlife, Victoria Island is the vibrant commercial and lifestyle hub of Lagos, blending modern city life with coastal charm. Known for its luxury hotels, shopping malls, fine dining, and lively nightlife, it’s the heart of Lagos’ social scene. The nearby beaches and waterfronts offer a relaxing escape from the busy urban atmosphere.",
    reaction: 425,
    image: [
       victoria,
       victoria1,
       victoria2,
       victoria3,
    ],
    tripInformation: {
      duration: '3 days, 2 nights',
      groupSize: 'Max 20 people',
      language: 'English',
      difficulty: 'Easy',
      bestTime: 'November to March (dry season)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
    overview: [
    "Tour the modern streets of Victoria Island.",
    "Explore art galleries and cultural centers.",
    "Taste Lagos cuisine at high-end restaurants.",
    "View Atlantic Ocean beaches.",
    "Great mix of culture, food, and modern city life."
  ],
  itinerary: [
    { head: "Arrival & Welcome", details: "Start your day in Victoria Island, Lagos with a coastal view and orientation." },
    { head: "Beach Walk", details: "Take a stroll along Bar Beach and enjoy the sea breeze." },
    { head: "Cultural Tour", details: "Visit local art galleries and craft markets for a taste of Nigerian art." },
    { head: "Lunch", details: "Dine at a top Nigerian restaurant with dishes like jollof rice and suya." },
    { head: "Evening Relaxation", details: "Wrap up the day with a drink at a rooftop bar overlooking the Atlantic Ocean." }
  ],
  reviews: [
    { name: "Tope O.", rating: 30, comment: "Loved the art galleries and the food stops." },
    { name: "Funke M.", rating: 40, comment: "Nice city experience, very lively." },
    { name: "John D.", rating: 21, comment: "Modern city with a lot of culture!" },
    { name: "Mary A.", rating: 55, comment: "Great tour for newcomers to Lagos." },
    { name: "Chuka E.", rating: 14, comment: "Good mix of activities and sights." }
  ]
  },
  {
    id: "8",
    title: "Table Mountain  ",
    location: "Cape Town, South Africa",
    date: "2025-06-15",
    description: "Table Mountain, with its iconic flat summit, dominates the skyline of Cape Town and offers some of the most breathtaking views in Africa. Visitors can hike or take a cable car to the top, where they are greeted with panoramic views of the city, Robben Island, and the Atlantic Ocean. This natural wonder is also home to unique wildlife and plant species, making it a paradise for nature enthusiasts.",
    reaction: 14,
    image: [
       tableMountain,
       tableMountain1,
       tableMountain2,
       tableMountain3,
    ],
    tripInformation: {
      duration: '4 days, 3 nights',
      groupSize: 'Max 12 people',
      language: 'English, Afrikaans',
      difficulty: 'Moderate',
      bestTime: 'November to March (summer for clear skies)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Cable Car Ride", details: "Take a rotating cable car up Table Mountain, enjoying panoramic views." },
    { head: "Hiking Trails", details: "Walk along scenic trails on the flat-topped summit." },
    { head: "Picnic Spot", details: "Relax and enjoy a picnic with views of the city and ocean." },
    { head: "Botanical Gardens", details: "Visit Kirstenbosch National Botanical Gardens at the base of the mountain." },
    { head: "Sunset View", details: "End the day with a sunset over Cape Town from Signal Hill." }
  ],
  reviews: [
    { name: "Zoe W.", rating: 32, comment: "Table Mountain is absolutely stunning!" },
    { name: "Leo G.", rating: 21, comment: "Perfectly organized. The views are unmatched." },
    { name: "Anna V.", rating: 21, comment: "Cable car was busy but the top was worth it." },
    { name: "Tom S.", rating: 75, comment: "Highlight of our trip to South Africa." },
    { name: "Chris P.", rating: 31, comment: "Loved the city tour after the mountain visit." }
  ]
  },
  {
    id: "9",
    title: "The Great Wall ",
    location: "China",
    date: "2025-11-10",
    description: "The Great Wall of China stretches over 13,000 miles across mountains, valleys, and deserts, offering a glimpse into the grandeur of ancient Chinese engineering. Walking along its preserved sections is like stepping back in time, as you pass through watchtowers and enjoy sweeping views of the rugged landscape. It remains one of the most remarkable historical monuments in the world.",
    reaction: 56,
    image: [
       greatWall,
       greatWall1,
       greatWall2,
       greatWall3,
    ],
    tripInformation: {
      duration: '5 days, 4 nights',
      groupSize: 'Max 18 people',
      language: 'English, Mandarin',
      difficulty: 'Moderate',
      bestTime: 'April to June and September to November (mild weather)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Departure from Beijing", details: "Drive to the Mutianyu section of the Great Wall." },
    { head: "Cable Car Ascent", details: "Take a cable car up and start walking along the historic watchtowers." },
    { head: "Guided Exploration", details: "Learn about the Wall’s construction and history from your guide." },
    { head: "Lunch", details: "Have a traditional countryside meal near the Wall." },
    { head: "Return to Beijing", details: "Head back to Beijing in the late afternoon." }
  ],
  reviews: [
    { name: "Mark H.", rating: 45, comment: "Walking the Great Wall was a bucket-list moment!" },
    { name: "Lucy R.", rating: 25, comment: "Loved the toboggan ride down. Super fun!" },
    { name: "Kevin J.", rating: 97, comment: "A bit crowded but stunning views." },
    { name: "Sophia W.", rating: 19, comment: "Mutianyu is the perfect spot, less busy than Badaling." },
    { name: "Liam Z.", rating: 10, comment: "So much history. Guide was excellent." }
  ]
  },
  {
    id: "10",
    title: "Santorini ",
    location: "Greece",
    date: "2025-04-03",
    description: "Santorini is one of Greece’s most enchanting islands, famous for its whitewashed buildings with blue domes perched on dramatic cliffs above the Aegean Sea. The island offers world-class sunsets, volcanic black-sand beaches, and charming villages like Oia and Fira. Its unique mix of natural beauty and Cycladic culture makes it one of the most romantic places in the world.",
    reaction: 102,
    image: [
       santorini,
       santorini1,
       santorini2,
       santorini3,
    ],
    tripInformation: {
      duration: '5 days, 4 nights',
      groupSize: 'Max 14 people',
      language: 'English, Greek',
      difficulty: 'Easy',
      bestTime: 'April to October (warm and sunny)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Arrival in Fira", details: "Begin with a scenic drive to Fira and enjoy panoramic caldera views." },
    { head: "Oia Exploration", details: "Walk through the charming blue-and-white village of Oia." },
    { head: "Wine Tasting", details: "Visit a local vineyard for Santorini’s famous volcanic wines." },
    { head: "Beach Time", details: "Relax on the unique red sand or black sand beaches." },
    { head: "Sunset in Oia", details: "End the day watching the world-famous Santorini sunset." }
  ],
  reviews: [
    { name: "Rachel M.", rating: 60, comment: "The sunset was magical. I have never seen colors like that!" },
    { name: "Henry L.", rating: 23, comment: "Amazing locations, wish we had more time at the vineyard." },
    { name: "Nina K.", rating: 71, comment: "Perfect pace. Not rushed at all. The guide was fantastic." },
    { name: "Tommy C.", rating: 89, comment: "Best part of our Greece trip. Highly recommend." },
    { name: "Ava J.", rating: 60, comment: "Absolutely stunning views. Pictures don’t do it justice." }
  ]
  },
  {
    id: "11",
    title: "Machu Picchu ",
    location: "Peru",
    date: "2026-01-10",
    description: "Machu Picchu, the Lost City of the Incas, sits high in the Andes and offers an extraordinary look into the ingenuity of an ancient civilization. Surrounded by lush green mountains and misty clouds, this UNESCO World Heritage site captivates visitors with its terraces, temples, and mysterious history. It is considered one of the most iconic archaeological sites in the world.",
    reaction: 65,
    image: [
        machu,
       machu1,
       machu2,
       machu3,
    ],
    tripInformation: {
      duration: '7 days, 6 nights',
      groupSize: 'Max 10 people',
      language: 'English, Spanish',
      difficulty: 'Challenging',
      bestTime: 'May to September (dry season)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Train to Aguas Calientes", details: "Take a scenic train ride through the Sacred Valley." },
    { head: "Bus to Machu Picchu", details: "Arrive at the entrance and ascend by bus to the citadel." },
    { head: "Guided Tour", details: "Explore the ancient ruins with a professional guide explaining its history." },
    { head: "Photography & Free Time", details: "Take breathtaking photos and enjoy some solo exploration." },
    { head: "Return Journey", details: "Head back to Aguas Calientes and return by train to Cusco." }
  ],
  reviews: [
    { name: "Emma L.", rating: 23, comment: "Absolutely magical. Worth every step." },
    { name: "Noah C.", rating: 50, comment: "Breathtaking views and fascinating history." },
    { name: "Lucas R.", rating: 45, comment: "Well organized, the train ride was beautiful." },
    { name: "Isabella D.", rating: 32, comment: "Lots of walking but worth it for the views." },
    { name: "Oliver G.", rating: 51, comment: "A life-changing experience!" }
  ]
  },
  {
    id: "12",
    title: "Kyoto Temples ",
    location: "Japan",
    date: "2025-3-10",
    description: "Kyoto’s temples and shrines are a timeless window into Japan’s spiritual and cultural heritage. From the shimmering golden pavilion of Kinkaku-ji to the endless red torii gates at Fushimi Inari Shrine, these sites embody centuries of history, art, and tradition. Wandering these sacred grounds offers a peaceful retreat from the modern world.",
    reaction: 72,
    image: [
       kyotoTemple,
       kyotoTemple1,
       kyotoTemple2,
       kyotoTemple3,
    ],
    tripInformation: {
      duration: '4 days, 3 nights',
      groupSize: 'Max 12 people',
      language: 'English, Japanese',
      difficulty: 'Easy',
      bestTime: 'March to May (cherry blossom) or October to November (autumn colors)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Kiyomizu-dera Temple", details: "Visit this iconic wooden temple with panoramic city views." },
    { head: "Tea Ceremony", details: "Participate in a traditional Japanese tea ceremony." },
    { head: "Fushimi Inari Shrine", details: "Walk through thousands of vermilion torii gates up the sacred mountain." },
    { head: "Arashiyama Bamboo Grove", details: "Stroll through towering bamboo stalks in Arashiyama." },
    { head: "Evening in Gion", details: "Explore Gion, Kyoto’s geisha district, with traditional streets and lanterns." }
  ],
  reviews: [
    { name: "Sakura M.", rating: 65, comment: "Kyoto is magical, loved every temple!" },
    { name: "Oliver J.", rating: 85, comment: "Peaceful and beautiful experience." },
    { name: "Chloe L.", rating: 74, comment: "Lots of walking but very rewarding." },
    { name: "Mateo R.", rating: 25, comment: "Fushimi Inari gates are unforgettable!" },
    { name: "Mina K.", rating: 45, comment: "Truly a cultural journey." }
  ]
  },
  {
    id: "13",
    title: "Big Ben ",
    location: "London, UK",
    date: "2025-7-20",
    description: "Big Ben, London’s world-famous clock tower, stands proudly beside the Houses of Parliament on the banks of the River Thames. With its majestic Gothic design and unmistakable chimes, it has become one of the city’s most enduring landmarks. Visiting this iconic site is a must for anyone exploring the history and charm of London.",
    reaction: 50,
    image: [
       bigBen,
       bigBen1,
       bigBen2,
       bigBen3,
    ],
    tripInformation: {
      duration: '3 days, 2 nights',
      groupSize: 'Max 18 people',
      language: 'English',
      difficulty: 'Easy',
      bestTime: 'April to September (mild weather)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Westminster Walk", details: "Start at Westminster Abbey and explore the surrounding landmarks." },
    { head: "Big Ben & Houses of Parliament", details: "Admire the iconic clock tower and learn its history." },
    { head: "Thames Cruise", details: "Take a river cruise for great views of London’s skyline." },
    { head: "London Eye", details: "Ride the London Eye for a panoramic view of the city." },
    { head: "Evening Stroll", details: "Finish with a leisurely walk across Westminster Bridge." }
  ],
  reviews: [
    { name: "Claire H.", rating: 25, comment: "Big Ben is even more stunning in person." },
    { name: "Paul A.", rating: 41, comment: "Informative guide, loved the Abbey tour." },
    { name: "Anna B.", rating: 51, comment: "Classic London. Must-do!" },
    { name: "James P.", rating: 75, comment: "Perfect walk for first-timers in London." },
    { name: "Linda R.", rating: 84, comment: "A bit crowded but worth it." }
  ]
  },
  {
    id: "14",
    title: "Obudu Mountain Resort ",
    location: "Nigeria, Calabar",
    date: "2025-12-22",
    description: "Obudu Mountain Resort, nestled in the scenic highlands of Cross River State, is one of Nigeria’s top tourist destinations. Its cool climate, rolling hills, cable car rides, and beautiful waterfalls make it a favorite for those seeking both adventure and relaxation. The resort also offers opportunities for hiking, bird-watching, and enjoying breathtaking views.",
    image: [
        obudu,
        obudu1,
        obudu2,
        obudu3,
    ],
    tripInformation: {
      duration: '4 days, 3 nights',
      groupSize: 'Max 15 people',
      language: 'English',
      difficulty: 'Moderate',
      bestTime: 'October to February (cool and dry)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Arrival & Orientation", details: "Reach the resort and get settled with a short introduction to the facilities." },
    { head: "Cable Car Ride", details: "Take the cable car for scenic views over the mountains." },
    { head: "Nature Trails", details: "Go on guided hikes exploring the lush tropical landscape." },
    { head: "Waterfall Visit", details: "Visit the Grotto or Angel’s Waterfall within the resort." },
    { head: "Evening Bonfire", details: "Relax at a bonfire and enjoy cultural music and local food." }
  ],
  reviews: [
    { name: "Amaka O.", rating: 75, comment: "Very peaceful and scenic." },
    { name: "Chinedu E.", rating: 55, comment: "Loved the cable car ride!" },
    { name: "Joy N.", rating: 44, comment: "Weather was perfect. Beautiful place." },
    { name: "Kelvin I.", rating: 65, comment: "Great for relaxation." },
    { name: "Adaeze C.", rating: 34, comment: "Nice family destination." }
  ]
  },
  {
    id: "15",
    title: "Iguazu Falls ",
    location: "Argentina/Brazil",
    date: "2025-05-10",
    description: "Iguazu Falls is a spectacular network of over 270 waterfalls straddling the border between Argentina and Brazil. Surrounded by lush rainforest, the thundering cascades create a breathtaking natural spectacle that immerses visitors in raw beauty. Walkways and boat tours allow an up-close experience of one of the greatest natural wonders of the world.",
    reaction:24,
    image: [
       iguazuFalls,
       iguazuFalls1,
       iguazuFalls2,
       iguazuFalls3,
    ],
    tripInformation: {
      duration: '4 days, 3 nights',
      groupSize: 'Max 14 people',
      language: 'English, Spanish, Portuguese',
      difficulty: 'Easy',
      bestTime: 'March to May or August to October (moderate flow and pleasant weather)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Jungle Walk", details: "Explore the subtropical rainforest surrounding the falls." },
    { head: "Lower Circuit", details: "Get close to smaller cascades and wildlife along the trails." },
    { head: "Boat Ride", details: "Experience a thrilling boat ride that takes you close to the waterfalls." },
    { head: "Upper Circuit", details: "Walk the upper trails for panoramic views of Iguazu Falls." },
    { head: "Devil’s Throat", details: "End with the most powerful viewpoint of the falls, the Devil’s Throat." }
  ],
  reviews: [
    { name: "Sophia D.", rating: 75, comment: "Most beautiful falls I’ve ever seen!" },
    { name: "Lucas F.", rating: 85, comment: "Boat ride was thrilling!" },
    { name: "Isabella H.", rating: 94, comment: "Very wet but totally worth it." },
    { name: "Noah R.", rating: 85, comment: "Views from both countries are amazing." },
    { name: "Olivia C.", rating: 85, comment: "Nature at its best!" }
  ]
  },
  {
    id: "16",
    title: "Serengeti National Park  ",
    location: "Tanzania",
    date: "2025-09-12",
    description: "Serengeti National Park is one of Africa’s greatest wildlife sanctuaries, renowned for its endless savannahs and the annual Great Migration of over a million wildebeest and zebras. Visitors can experience close encounters with lions, elephants, giraffes, and more in their natural habitat. Its breathtaking landscapes and rich biodiversity make it a top safari destination worldwide.",
    reaction:12,
    image: [
        Serengeti,
        Serengeti1,
        Serengeti2,
        Serengeti3,
    ],
      tripInformation: {
      duration: '6 days, 5 nights',
      groupSize: 'Max 15 people',
      language: 'English, Swahili',
      difficulty: 'Moderate',
      bestTime: 'June to October (dry season, best for wildlife)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Morning Safari", details: "Start with an early morning game drive to spot lions and elephants." },
    { head: "Breakfast in the Bush", details: "Enjoy a picnic breakfast in the wild." },
    { head: "Migration Viewing", details: "Track the wildebeest migration (seasonal)." },
    { head: "Afternoon Safari", details: "Continue exploring the plains with your guide." },
    { head: "Evening Relaxation", details: "Relax at your lodge with sunset views of the savannah." }
  ],
  reviews: [
    { name: "Hanna P.", rating: 35, comment: "The wildlife here is unbelievable." },
    { name: "Mohammed B.", rating: 65, comment: "Saw lions up close!" },
    { name: "Elena S.", rating: 74, comment: "Camp was nice, amazing safari." },
    { name: "David L.", rating: 85, comment: "Bucket list trip. Perfect!" },
    { name: "Nadia T.", rating: 95, comment: "The migration was spectacular." }
  ]
  },
  {
    id: "17",
    title: "Yosemite Valley ",
    location: "USA",
    date: "2025-10-10",
    description: "Yosemite Valley in California’s Sierra Nevada mountains is a natural masterpiece, carved by glaciers and framed by towering granite cliffs. The valley is home to stunning landmarks like El Capitan, Half Dome, and Yosemite Falls, attracting climbers, hikers, and photographers alike. Its meadows, rivers, and waterfalls create an unforgettable outdoor experience.",
    reaction: 28,
    image: [
        yesomiteValley,
        yesomiteValley1,
        yesomiteValley2,
        yesomiteValley3,
    ],
      tripInformation: {
    duration: '4 days, 3 nights',
    groupSize: 'Max 12 people',
    language: 'English',
    difficulty: 'Moderate',
    bestTime: 'April to October (spring waterfalls and summer hiking)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Arrival at Yosemite", details: "Enter Yosemite National Park and stop at the Visitor Center." },
    { head: "El Capitan View", details: "Admire the towering granite cliffs from El Capitan Meadow." },
    { head: "Waterfall Visit", details: "Visit Yosemite Falls or Bridalveil Fall." },
    { head: "Hiking Trail", details: "Take an easy hike in the valley to enjoy meadows and views." },
    { head: "Glacier Point", details: "End the day with panoramic views from Glacier Point." }
  ],
  reviews: [
    { name: "Liam W.", rating: 95, comment: "Breathtaking scenery!" },
    { name: "Sarah Y.", rating: 25, comment: "El Capitan is so majestic." },
    { name: "Aiden G.", rating: 90, comment: "Lots of walking but worth it." },
    { name: "Maya V.", rating: 95, comment: "Loved the waterfalls." },
    { name: "Jacob P.", rating: 83, comment: "Perfect outdoor adventure." }
  ]
  },
  {
    id: "18",
    title: "Awhum Waterfall ",
    location: "Enugu, Nigeria",
    date: "2025-12-26",
    description: "Awhum Waterfall, located in Enugu State, Nigeria, is a hidden gem surrounded by lush tropical forest. The waterfall cascades from a height of 30 meters into a serene pool, creating a peaceful atmosphere that is perfect for meditation and sightseeing. Nearby caves and monasteries add a spiritual and cultural dimension to the visit.",
    reaction: 30,
    image: [
        "https://example.com/tokyo.jpg",
        "https://example.com/tokyo.jpg",
        "https://example.com/tokyo.jpg"
    ],
    tripInformation: {
      duration: '2 days, 1 night',
      groupSize: 'Max 20 people',
      language: 'English, Igbo',
      difficulty: 'Easy',
      bestTime: 'November to March (dry season)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Arrival", details: "Arrive at Awhum Monastery and register for the visit." },
    { head: "Guided Walk", details: "Walk through a peaceful path surrounded by lush greenery." },
    { head: "Visit the Cave", details: "Explore the sacred cave known for its spiritual significance." },
    { head: "Waterfall Experience", details: "Take photos and enjoy the cool refreshing spray of Awhum Waterfall." },
    { head: "Picnic and Relaxation", details: "Relax by the streams before heading back." }
  ],
  reviews: [
    { name: "Chizoba U.", rating: 35, comment: "The waterfall is pure magic!" },
    { name: "Uche E.", rating: 25, comment: "Peaceful and calming environment." },
    { name: "Ngozi I.", rating: 74, comment: "Hike is steep but worth it." },
    { name: "Blessing M.", rating: 55, comment: "Loved the combination of culture and nature." },
    { name: "Okechukwu J.", rating: 44, comment: "Perfect spot for photos." }
  ]
  },
  {
    id: "19",
    title: "Banff National Park ",
    location: "Canada",
    date: "2025-11-10",
    description: "Banff National Park in the Canadian Rockies is a breathtaking expanse of turquoise lakes, snow-capped mountains, and pine forests. Visitors can explore its scenic trails, hot springs, and wildlife while taking in the pristine beauty of nature. Known for Lake Louise and Moraine Lake, Banff offers year-round adventure and relaxation.",
    reaction: 224,
    image: [
        "https://example.com/tokyo.jpg",
        "https://example.com/tokyo.jpg",
        "https://example.com/tokyo.jpg"
    ],
    tripInformation: {
    duration: '5 days, 4 nights',
    groupSize: 'Max 14 people',
    language: 'English, French',
    difficulty: 'Moderate',
    bestTime: 'June to September (hiking, sightseeing) or December to March (skiing)'
  },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Lake Louise", details: "Start the day at the turquoise waters of Lake Louise." },
    { head: "Hiking", details: "Take a hike around the trails with mountain views." },
    { head: "Moraine Lake", details: "Visit the equally stunning Moraine Lake for photos." },
    { head: "Wildlife Spotting", details: "Look for elk, deer, and bears in the wild." },
    { head: "Banff Town", details: "Explore Banff town for local shops and hot springs." }
  ],
  reviews: [
    { name: "Sophie K.", rating: 45, comment: "The lakes are stunning!" },
    { name: "Connor D.", rating: 75, comment: "Beautiful scenery everywhere." },
    { name: "Ella M.", rating: 24, comment: "So many photo opportunities." },
    { name: "James R.", rating: 65, comment: "Canadian Rockies are majestic." },
    { name: "Lily H.", rating: 35, comment: "Lake Louise was a dream come true." }
  ]
  },
  {
    id: "20",
    title: "Plitvice Lakes ",
    location: "Croatia",
    date: "2025-08-21",
    description: "Plitvice Lakes National Park is a UNESCO World Heritage site famous for its cascading lakes and waterfalls connected by wooden boardwalks. The vibrant turquoise waters and surrounding forests create a dreamlike setting. It’s a paradise for nature lovers and photographers, offering scenic hiking trails through its lush landscapes.",
    reaction: 60,
    image: [
        "https://example.com/tokyo.jpg",
        "https://example.com/tokyo.jpg",
        "https://example.com/tokyo.jpg"
    ],
    tripInformation: {
      duration: '3 days, 2 nights',
      groupSize: 'Max 15 people',
      language: 'English, Croatian',
      difficulty: 'Easy',
      bestTime: 'May to October (lush greenery and full waterfalls)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
 itinerary: [
    { head: "Arrival at National Park", details: "Start at the entrance and receive a map of the trails." },
    { head: "Lower Lakes Walk", details: "Walk along wooden paths above turquoise lakes and waterfalls." },
    { head: "Boat Ride", details: "Take an electric boat ride across Kozjak Lake." },
    { head: "Upper Lakes", details: "Continue to the upper lakes for breathtaking cascades." },
    { head: "Scenic Viewpoints", details: "End at the viewpoints for panoramic photos." }
  ],
  reviews: [
    { name: "Marco P.", rating: 58, comment: "The waterfalls are amazing!" },
    { name: "Julia N.", rating: 95, comment: "Crystal clear lakes. So beautiful." },
    { name: "Peter V.", rating: 74, comment: "Lots of walking but peaceful." },
    { name: "Hana S.", rating: 65, comment: "Nature at its best!" },
    { name: "Ivan D.", rating: 45, comment: "Highly recommended park." }
  ]
  },
  {
    id: "21",
    title: "Lake Bled ",
    location: "Slovenia",
    date: "2025-05-10",
    description: "Lake Bled is a picturesque alpine lake with emerald-green waters, surrounded by mountains and crowned by a fairy-tale island church. A short hike or boat ride offers panoramic views of the lake, castle, and surrounding scenery. It’s one of Europe’s most romantic destinations, perfect for peaceful exploration and photography.",
    reaction: 12,
    image: [
        "https://example.com/tokyo.jpg",
        "https://example.com/tokyo.jpg",
        "https://example.com/tokyo.jpg"
    ],
    tripInformation: {
      duration: '3 days, 2 nights',
      groupSize: 'Max 12 people',
      language: 'English, Slovenian',
      difficulty: 'Easy',
      bestTime: 'April to October (ideal weather and scenery)'
    },
     whatIncluded: [
      '4 nights accommodation',
      'Daily breakfast',
      'Transportation',
      'Cultural',
      'Round-trip flights',
      'Professional guide',
      'All entrance fees',
      '24/7 support'
    ],
  itinerary: [
    { head: "Bled Castle", details: "Visit the historic castle perched above the lake." },
    { head: "Pletna Boat Ride", details: "Take a traditional wooden pletna boat to Bled Island." },
    { head: "Church Visit", details: "Ring the wishing bell at the island’s church." },
    { head: "Bled Cream Cake", details: "Taste the famous Bled cream cake at a lakeside café." },
    { head: "Scenic Walk", details: "Walk around the lake for stunning photo spots." }
  ],
  reviews: [
    { name: "Eva K.", rating: 95, comment: "Lake Bled is a fairytale!" },
    { name: "Leo S.", rating: 10, comment: "Loved the boat ride to the island." },
    { name: "Maja D.", rating: 10, comment: "Cream cake is a must-try!" },
    { name: "David H.", rating: 73, comment: "Picturesque everywhere you look." },
    { name: "Nina Z.", rating: 85, comment: "Magical experience." }
  ]
  }
]

export default trips