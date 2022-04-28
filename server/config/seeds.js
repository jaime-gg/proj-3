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
    { name: "Art & Design" },
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
      description:
        "When a woman's body is discovered at her lover's villa, the police discover a trail of lovers - all of whom have a reason to wish her dead.",
      image: "stray-1962.jpg",
      filter: [filters[3]._id, filters[4]._id],
      price: 35,
      quantity: 2,
    },
    {
      name: "Art and Industry",
      author: "Herbert Read",
      year: "1961",
      description:
        '"It is impossible to exaggerate the importance of this book to industry and to artists because it is in a class by itself. Nothing has appeared in our time on this subject which can compare with it, either in scope or in clarity of thought." - The Listener Sir Herbert Edward Read, DSO, MC was an English anarchist poet, and critic of literature and art.',
      image: "art-1961.jpeg",
      filter: [filters[2]._id, filters[4]._id, filters[6]._id],
      price: 37,
      quantity: 1,
    },
    {
      name: "The Road to Wigan Pier",
      author: "George Orwell",
      year: "1962",
      description: `Before he authored the dystopian 1984 and the allegorical Animal Farm, George Orwell was a journalist, reporting on England's working class — an investigation that led him to examine democratic socialism. In the 1930s, the Left Book Club, a socialist group in England, sent George Orwell to investigate the poverty and mass unemployment in the industrial north of England. Once there, he went beyond the requests of the book club, to investigate the employed as well. Orwell chose to live as the coal miners did — sleeping in foul lodgings, subsisting on a meager diet, struggling to feed a family on a dismal wage, and going down into the hellish, backbreaking mines. What Orwell saw clarified his feelings about socialism, and in The Road to Wigan Pier, he pointedly tells why socialism, the only remedy to the shocking conditions he had witnessed, repelled "so many normal decent people."`,
      image: "road-1962.jpeg",
      filter: [filters[2]._id, filters[6]._id],
      price: 20,
      quantity: 4,
    },
    {
      name: "Maigret has Scruples",
      author: "Georges Simenon",
      year: "1962",
      description:
        "An unusually quiet day for Inspector Maigret at the Quai des Orfèvres is disturbed by a visit from mild-mannered toy salesman Xavier Manton. Maigret is taken aback by Manton's revelation that he suspects his wife of plotting to poison him. And when he receives a visit from Madame Manton expressing her own grave concerns later that day, he finds himself deeply conflicted, unsure of whom to trust. Maigret heeds the advice of his seniors and begins investigating the couple—and with every turn, new complications arise. When the case comes to a boil and a body is discovered, everyone, including Maigret, is shocked.\nMaigret's Doubts is an engrossing mystery of marriage and deceit that forces the reader to question whether our brilliant inspector may be fallible after all. ",
      image: "maigret-1962.jpeg",
      filter: [filters[3]._id, filters[5]._id], 
      price: 47,
      quantity: 1,
    },
    {
      name: "Elements of Acoustic Phonetics",
      author: "Peter Ladefoged",
      year: "1962",
      description:
        "This classic textbook provides a concise introduction to basic concepts of acoustics and digital speech processing that are important to linguists, phoneticians, and speech scientists. Assuming no background in physics or mathematics, Ladefoged explains concepts that must be understood in using modern laboratory techniques for acoustic analysis, including resonances of the vocal tract and the relation of formants to different cavities; digital speech processing and computer storage of sound waves.",
      image: "acoustic-1962.jpeg",
      filter: [filters[0]._id, filters[2]._id, filters[7]._id],
      price: 33,
      quantity: 3,
    },
    ///
    {
      name: "The Soft Talkers",
      author: "Margaret Millar",
      year: "1962",
      description:
        "The reader looks in on the lives of a set of wealthy Toronto businessmen. The wealthiest, Ron Galloway, has invited his friends to his lakeside lodge for the weekend. But Galloway fails to arrive.",
      image: "soft-1962.jpeg",
      filter: [filters[4]._id,filters[6]._id],
      price: 27,
      quantity: 2,
    },
    {
      name: "Killer's Wedge",
      author: "Ed McBain",
      year: "1964",
      description:
        "A classic in Ed McBain’s groundbreaking 87th Precinct series, Killer’s Wedge is a mesmerizing, profoundly relevant thriller where terrorism strikes deep into the heart of the house, putting everyone’s life on the line in a tense standoff with an enemy who cannot be reasoned with.\nAn ordinary day at the 87th Precinct is about to take a turn for the worse when Dodge shows up to put a bullet in Carella’s head. And she doesn’t care if she has to take all the men in the 87th with her to do it.",
      image: "killers-1964.jpg",
      filter: [filters[4]._id,filters[6]._id],
      price: 20,
      quantity: 2,
    },
    {
      name: "Contrary Imagintations: A Psychologocial Study of the English Schoolboy",
      author: "Liam Hudson",
      year: "1967",
      description:
        "Why does one boy become an arts specialist and his neighbor a scientist? Why do some pupils use their brains effectively and others not? Do we pay enough attention to personality in assessing ability? In this controversial study Dr. Liam Hudson, argues that personality counts for as much as ability in the student's choice of subject. He distinguishes between two types of personality, the scientific converger, and the artistic imaginative diverger, and examines examples of each in depth. He then speculates on the nature of original thought and the ways in which intellectual and personal qualities interact.",
      image: "imaginations-1967.jpg",
      filter: [filters[3]._id, filters[7]._id],
      price: 45,
      quantity: 3,
    },
    {
      name: "The Extraordinary Decade",
      author: "P.V. Annenkov",
      year: "1968",
      description: `In his memoirs, Annenkov gives penetrating insights into the nature of the 1840s, and personal portraits of the many famous men who made it he believes made it extraordinary. Annenkov himself was not a radical; he preferred to remain detached. But his recollections convey all the immediacy of a decade of intellectual ferment, and his observations provide not only an intriguing picture of Russia in the 1840s but also opportunity for comparisons with later decades in Russian history.`,
      image: "decade-1968.jpeg",
      filter: [filters[2]._id,filters[3]._id,filters[7]._id],
      price: 32,
      quantity: 3,
    },
    {
      name: "Three Novellas",
      author: "Ivan Turgenev",
      year: "1968",
      description:
        "Ivan Sergeyevich Turgenev (Cyrillic: Иван Тургенев) was a novelist, poet, and dramatist, and now ranks as one of the towering figures of Russian literature.\nThis book features a collection of three of his works: Punin and Baburin, The Inn, and The watch.",
      image: "novellas-1968.jpeg",
      filter: [filters[2]._id,filters[4]._id],
      price: 20,
      quantity: 5,
    },
    {
      name: "Interpersonal Speech-Communication: Elements and Structures",
      author: "John W. Keltner",
      year: "1970",
      description:
        "Via writing, teaching, and facilitating the processes of cooperation, John Keltner devoted his life to furthering peace, understanding, and collaboration through interpersonal communication. \nKeltner's first book on interpersonal communication, Interpersonal Speech Communication, Elements and Structures, appeared in 1969, two years before the wave of interpersonal texts began. His books found use worldwide, some as university texts.",
      image: "speech-1970.jpeg",
      filter: [filters[1]._id,filters[3]._id,filters[7]._id],
      price: 35,
      quantity: 1,
    },
    {
      name: "Social Change in Soviet Russia",
      author: "Alex Inkeles",
      year: "1971",
      description:
        "This collection of essays represents the results of more than twenty years of research by one of this country's foremost experts on Soviet sociology and psychology. Although Alex Inkeles covers a wide range of subjects, he has one primary purpose: to identify the main elements of the process of modernization in the Soviet social system.",
      image: "soviet-.jpeg",
      filter: [filters[2]._id,filters[3]._id,filters[7]._id],
      price: 75,
      quantity: 1,
    },
    {
      name: "Interviewing Skills for Supervisory Personnel",
      author: "Lawrence L. Steinmetz",
      year: "1971",
      description:
        "Lawrence L. Steinmetz, PhD, is an acclaimed author and speaker with degrees in business. Steinmetz developed a keen understanding of what it takes to operate businesses profitably and used this experience to write.",
      image: "interviewing-1971.jpeg",
      filter: filters[3]._id,
      price: 25,
      quantity: 5,
    },
    {
      name: "Chicago 1930-70: Building, Planning, and Urban Technology",
      author: "Carl W. Condit",
      year: "1973",
      description: "No description available at this time.",
      image: "chicago-1972.jpeg",
      filter: [filters[1]._id,filters[3]._id,filters[7]._id,filters[5]._id],
      price: 17,
      quantity: 10,
    },
    {
      name: "Personality: A Scientific Approach",
      author: "Elaine Donelson",
      year: "1973",
      description: `"Personality: A Scientific Approach is intended for undergraduate courses in personality. It is meant to aquaint the student with what is known about personality, and what has been attempted in the scientific study of personality." - An excerpt from the text.`,
      image: "personality-1973.jpeg",
      filter: [filters[1]._id,filters[3]._id,filters[7]._id],
      price: 45,
      quantity: 1,
    },
    {
      name: "Chronic Illness and the Quality of Life",
      author: "Anselm L. Strauss & Barney G. Glaser",
      year: "1975",
      description:
        "This book has been written to acquaint readers with some of the enormous range of experiences associated with chronic illness.",
      image: "illness-1975.jpeg",
      filter: [filters[3]._id,filters[7]._id],
      price: 38,
      quantity: 2,
    },
    {
      name: "Anglo-Saxon Poetry",
      author: "R.K. Gordon",
      year: "1975",
      description:
        "This is a revision of the translation which R.K. Gordon, formerly Professor of English in the University of Alberta, made of his own selection of Old English poetry of all kinds extending over the whole period from the seventh to the eleventh century. It includes heroic poems in the old tradition composed in the seventh century, but dealing with persons and events much further back in time, such as Beowulf, Waldhere and Deor. The later epics include The Battle of Maldon, a panegyric on the warriors of Essex and their commander, Byrhtnoth, who were killed in action over nine and a half centuries ago.",
      image: "poetry-1975.jpg",
      filter: [filters[2]._id,filters[4]._id],
      price: 15,
      quantity: 10,
    },
    {
      name: "Basic Physiology for the Health Science",
      author: "Ewald E. Selkurt, Ph.D.",
      year: "1975",
      description:
        "The human body, though an enormously complex system in its total function, can be seen to be made up of more elementary subsystems.",
      image: "phys-1975.jpg",
      filter: [filters[1]._id,filters[3]._id,filters[7]._id],
      price: 135,
      quantity: 1,
    },
    {
      name: "Geometry, Relativity, and the Fourth Dimension",
      author: "Rudy von Bitter Rucker",
      year: "1977",
      description:
        "This is a highly readable, popular exposition of the fourth dimension and the structure of the universe. A remarkable pictorial discussion of the curved space-time we call home, it achieves even greater impact through the use of 141 excellent illustrations. This is the first sustained visual account of many important topics in relativity theory that up till now have only been treated separately.",
      image: "fourth-dimension-1977.jpeg",
      filter: [filters[3]._id,filters[7]._id,],
      price: 800,
      quantity: 1,
    },
    {
      name: "Evaluating Research in Speech Pathology and Audiology: A Guide for Clinicians and Students",
      author: "Ira M. Ventry & Teri A. Denson & Nicholas Schiavetti",
      year: "1980",
      description: `"(This) is a book about how to read, understand, and evaluate research that someone else has done." - An excerpt from the text.`,
      image: "research-1980.jpeg",
      filter: [filters[1]._id,filters[3]._id,filters[7]._id],
      price: 25,
      quantity: 3,
    },
  ]);
  console.log("books have been seeded");

  // ================================================================================================

  await User.deleteMany();
  await User.create({
    firstName: "John",
    lastName: "Smith",
    email: "vendor@mail.com",
    password: "password123"
  });
  console.log("users seeded");

  process.exit();
});
