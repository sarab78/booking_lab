use guests;
db.dropDatabase();


 db.bookings.insertMany([

   {
     name: "Shaun",
     email: "shaun@gamil.com",
     checkedIn: true
   },
   {
     name: "Jonny",
     email: "jonny@gmail.com",
     checkedIn: true
   },
   {
     name: "Sarab",
     email: "sarab@gmail.com",
     checkedIn: false
   }
 ])
