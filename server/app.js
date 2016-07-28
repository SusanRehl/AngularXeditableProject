var express=require('express');  // sets up express
var app=express();
var path=require('path');  // sets up paths
var bodyParser=require('body-parser');  // sets up body-parser for POST method
var pg=require('pg');  // sets up postgres database
var connectionString='postgres://localhost:5432/angularxeditable';  /// put database name in

app.use(bodyParser.json());
app.use(express.static('public')); // makes public folder available

app.listen(3000, 'localhost', function(req, res) {  // spin up port
  console.log("listening on port 3000");
});

app.get('/', function(req, res) {  // sets up base url
  console.log('hello from base url get' + path.resolve('views/index.html'));
  res.sendFile(path.resolve('views/index.html')); // sends the index.html file to the browser!!!!!!!!!!!
});

var selectedRoom=[];

app.post('/getRoom', function(req, res) { // pulling selected room info from database to display on room picker
    console.log("in app.post  getroom");
    console.log(req.body);
    selectedRoom = [];  // resets array to empty for new room
    pg.connect(connectionString, function(err, client, done) {  // connecting to disinfectants database
      if (err) {     // check for errors
      console.log(err);
    } else { // start selection criteria
        //  roomInfo=client.query("SELECT * FROM roominfo WHERE room_number= ' + req.body.room_number ' ");
         roomInfo=client.query("SELECT * FROM roominfo WHERE room_number= '" + req.body.room_number +"'");
         console.log("roominfoin app: ");
          rows = 0;
          roomInfo.on('row', function(row) {  // pushing to array
            selectedRoom.push(row);
          });  // end query push
          roomInfo.on('end', function() {  // sending to scripts
            console.log("room info from app.post in app", selectedRoom);
            return res.json(selectedRoom);
          }); // end products.on function
          done(); // signals done
      } // end else (for success)
    }); // end pg connect function
}); // end app.post /getRoomInfo function

app.get( '/showRoom', function( req, res ){  // makes returned room info available to room assigner
      console.log("in showRoom function in app: ", selectedRoom);
      return res.json(selectedRoom);
  }); // end app.get /showRoom function

app.put('/saveRoom/:id', function(req, res) {
  var room = req.body;
  var id = req.params.id;
  pg.connect(connectionString, function(err, client, done) {
    if (err){  //connection error
      console.log('error at pg connect.');
      res.sendStatus(500);
    } // end connection error
    console.log("in client.query update");
    client.query('UPDATE roominfo ' +
      'SET room_type = $1, ' +
      'capacity = $2, ' +
      'room_number = $3, ' +
      'notes = $4, ' +
      'price = $5, ' +
      'check_in_date = $6, ' +
      'check_out_date = $7 ' +
      'WHERE id = $8',
       [room.room_type, room.capacity, room.room_number, room.notes, room.price, room.check_in_date, room.check_out_date, id],  // updating room info changes
    function(err, result){
      done();
      if (err) {
        console.log("error in app.js:");
         console.log(err);
          res.sendStatus(500);
          return;
      }
      res.sendStatus(204);  //PUT success
    });
  }); //end connection
}); //end app.put function
