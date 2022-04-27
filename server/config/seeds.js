const db = require("./connection");
// IMPORT AND CREATE SEEDS FOR RESPECTIVE MODALS
const { User, Book, Filter } = require("../models");

db.once("open", async () => {
  await Filter.deleteMany();
  const filters = await Filter.insertMany([
    { name: "Textbook" },
    { name: "Collections" },
    { name: "Non-Fiction" },
    { name: "Fiction" },
    { name: "Art" },
    { name: "Mystery" },
    { name: "History" },
    { name: "Science" },
    
    
  ]);
  console.log("filters have been seeded");

  // ================================================================================================

  await Book.deleteMany();
  const Books = await Book.insertMany([
    {
      name: "Death of a Stray Cat",
      author: "Jean Potts",
      year: "1962",
      description: "When a woman's body is discovered at her lover's villa, the police discover a trail of lovers - all of whom have a reason to wish her dead.",
      image: "stray-1962.jpg",
      filters: filters[(4,6)]._id,
      price: 35,
      quantity: 2,
    },
    {
        name: "Art and Industry",
        author: "Herbert Read",
        year: "1961",
        description: '"It is impossible to exaggerate the importance of this book to industry and to artists because it is in a class by itself. Nothing has appeared in our time on this subject which can compare with it, either in scope or in clarity of thought." - The Listener Sir Herbert Edward Read, DSO, MC was an English anarchist poet, and critic of literature and art.',
        image: "art-1961.jpeg",
        filters: filters[(3,5,7)]._id,
        price: 37,
        quantity: 1,
      },
      {
        name: "The Road to Wigan Pier",
        author: "George Orwell",
        year: "1962",
        description: `Before he authored the dystopian 1984 and the allegorical Animal Farm, George Orwell was a journalist, reporting on England's working class — an investigation that led him to examine democratic socialism. In the 1930s, the Left Book Club, a socialist group in England, sent George Orwell to investigate the poverty and mass unemployment in the industrial north of England. Once there, he went beyond the requests of the book club, to investigate the employed as well. Orwell chose to live as the coal miners did — sleeping in foul lodgings, subsisting on a meager diet, struggling to feed a family on a dismal wage, and going down into the hellish, backbreaking mines. What Orwell saw clarified his feelings about socialism, and in The Road to Wigan Pier, he pointedly tells why socialism, the only remedy to the shocking conditions he had witnessed, repelled "so many normal decent people."`,
        image: "road-1962.jpeg",
        filters: filters[(3,7)]._id,
        price: 20,
        quantity: 4,
      },
      {
        name: "Maigret has Scruples",
        author: "Georges Simenon",
        year: "1962",
        description: "An unusually quiet day for Inspector Maigret at the Quai des Orfèvres is disturbed by a visit from mild-mannered toy salesman Xavier Manton. Maigret is taken aback by Manton's revelation that he suspects his wife of plotting to poison him. And when he receives a visit from Madame Manton expressing her own grave concerns later that day, he finds himself deeply conflicted, unsure of whom to trust. Maigret heeds the advice of his seniors and begins investigating the couple—and with every turn, new complications arise. When the case comes to a boil and a body is discovered, everyone, including Maigret, is shocked.\nMaigret's Doubts is an engrossing mystery of marriage and deceit that forces the reader to question whether our brilliant inspector may be fallible after all. ",
        image: "maigret-1962.jpeg",
        filters: filters[(4, 6)]._id,
        price: 47,
        quantity: 1,
      },
      {
        name: "Elements of Acoustic Phonetics",
        author: "Peter Ladefoged",
        year: "1962",
        description: "This classic textbook provides a concise introduction to basic concepts of acoustics and digital speech processing that are important to linguists, phoneticians, and speech scientists. Assuming no background in physics or mathematics, Ladefoged explains concepts that must be understood in using modern laboratory techniques for acoustic analysis, including resonances of the vocal tract and the relation of formants to different cavities; digital speech processing and computer storage of sound waves.",
        image: "acoustic-1962.jpeg",
        filters: filters[(1,3,8)]._id,
        price: 33,
        quantity: 3,
      },
      {
        name: "The Soft Talkers",
        author: "Margaret Millar",
        year: "1962",
        description: "The reader looks in on the lives of a set of wealthy Toronto businessmen. The wealthiest, Ron Galloway, has invited his friends to his lakeside lodge for the weekend. But Galloway fails to arrive.",
        image: "soft-1962.jpeg",
        filters: filters[(4, 6)]._id,
        price: 27,
        quantity: 2,
      },
      {
        name: "Killer's Wedge",
        author: "Ed McBain",
        year: "1964",
        description: "A classic in Ed McBain’s groundbreaking 87th Precinct series, Killer’s Wedge is a mesmerizing, profoundly relevant thriller where terrorism strikes deep into the heart of the house, putting everyone’s life on the line in a tense standoff with an enemy who cannot be reasoned with.\nAn ordinary day at the 87th Precinct is about to take a turn for the worse when Dodge shows up to put a bullet in Carella’s head. And she doesn’t care if she has to take all the men in the 87th with her to do it.",
        image: "killers-1964.jpg",
        filters: filters[(4,6)]._id,
        price: 20,
        quantity: 2,
      },
      {
        name: "Contrary Imagintations: A Psychologocial Stody of the English Schoolboy",
        author: "Liam Hudson",
        year: "1967",
        description: "Why does one boy become an arts specialist and his neighbor a scientist? Why do some pupils use their brains effectively and others not? Do we pay enough attention to personality in assessing ability? In this controversial study Dr. Liam Hudson, argues that personality counts for as much as ability in the student's choice of subject. He distinguishes between two types of personality, the scientific converger, and the artistic imaginative diverger, and examines examples of each in depth. He then speculates on the nature of original thought and the ways in which intellectual and personal qualities interact.",
        image: "imaginations-1967.jpg",
        filters: filters[(3,8)]._id,
        price: 45,
        quantity: 3,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
      {
        name: "",
        author: "",
        year: "",
        description: " ",
        image: "",
        filters: filters[()]._id,
        price: ,
        quantity: ,
      },
  ]);
  console.log("books have been seeded");

  // ================================================================================================

  await User.deleteMany();
  await User.create({
    firstName: "John",
    lastName: "Smith",
    email: "vendor@mail.com",
    password: "password123",
  });
  console.log("users seeded");

  process.exit();
});
