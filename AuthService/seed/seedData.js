const users = [
  {
    _id: "64926e90621ba47f3652e634",
    username: "ahmad_sulaiman",
    password: "$2b$10$iF8UTn.FUoKhKOA/M5IpCuf5mIwTWCAK1I4ZGbjFlnum2GJovtvbe",
    name: "Ahmad Sulaiman",
    email: "ahmad.sulaiman@example.com",
    biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    neighborhood: "64926e90621ba47f3652e620",
    role: "Resident",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e90621ba47f3652e636",
    username: "lim_bee_hong",
    password: "$2b$10$iF8UTn.FUoKhKOA/M5IpCuf5mIwTWCAK1I4ZGbjFlnum2GJovtvbe",
    name: "Lim Bee Hong",
    email: "lim.bee.hong@example.com",
    biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    neighborhood: "64926e90621ba47f3652e622",
    role: "Resident",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e90621ba47f3652e638",
    username: "raj_kumar",
    password: "$2b$10$iF8UTn.FUoKhKOA/M5IpCuf5mIwTWCAK1I4ZGbjFlnum2GJovtvbe",
    name: "Raj Kumar",
    email: "raj.kumar@example.com",
    biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    neighborhood: "64926e90621ba47f3652e624",
    role: "Authority",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
];

const families = [
  {
    _id: "64926e91621ba47f3652e635",
    userID: "64926e90621ba47f3652e634",
    relativeID: "64926e90621ba47f3652e638",
    relationType: "Sibling",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e91621ba47f3652e637",
    userID: "64926e90621ba47f3652e636",
    relativeID: "64926e90621ba47f3652e634",
    relationType: "Sibling",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e91621ba47f3652e639",
    userID: "64926e90621ba47f3652e638",
    relativeID: "64926e90621ba47f3652e634",
    relationType: "Spouse",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
];

const neighborhoods = [
  {
    _id: "64926e90621ba47f3652e620",
    name: "Kampung Kuchai",
    description: "A traditional village located in the heart of Ipoh.",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e90621ba47f3652e622",
    name: "Taman Cempaka",
    description: "A vibrant and modern residential area.",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e90621ba47f3652e624",
    name: "Meru Raya",
    description: "A rapidly growing township with a variety of amenities.",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e90621ba47f3652e626",
    name: "Bandar Baru Medan",
    description:
      "A bustling area known for its lively markets and food stalls.",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e90621ba47f3652e628",
    name: "Taman Ipoh Jaya",
    description:
      "A peaceful neighborhood with easy access to Ipoh's city center.",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e90621ba47f3652e62a",
    name: "Bercham",
    description: "A large suburb known for its hot springs and delicious food.",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e90621ba47f3652e62c",
    name: "Taman Perpaduan",
    description:
      "A harmonious residential area located at the outskirts of Ipoh.",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e90621ba47f3652e62e",
    name: "Sunway City Ipoh",
    description:
      "A township known for its recreational and residential development.",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
  {
    _id: "64926e90621ba47f3652e630",
    name: "Gunung Rapat",
    description:
      "A residential area with stunning limestone hills as its backdrop.",
    createdAt: 1687318161417,
    updatedAt: 1687318161417,
    __v: 0,
  },
];

module.exports = { users, families, neighborhoods };
