const url = "";

const dbpar = ({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'ameymhadgut_019_juhu',
    port: 3306
});

const mysql = require("mysql2");
const con = mysql.createConnection(dbpar);
console.log("database connected");


const express = require("express");
const app = express();


app.use(express.static('abc'));



//for blur show info
app.get('/showinfo', (req, res) => {
    let bid = req.query.bookingid;

    console.log(bid);

    let output = { status: false, bookname: "", price: "", message: "bookid is found" };

    con.query('select * from book where bookid=?', [bid], (err, rows) => {

        if (err) {
            console.log("error" + err);
        } else {
            if (rows.length > 0) {
                output.status = true;
                output.bookname = rows[0].bookname;
                output.price = rows[0].price;
                output.message = "Book info found"
            } else {
                console.log("no rows affected");
            }
        }
        res.send(output);
    });
});


//for update
app.get('/update', (req, res) => {
    let bid = req.query.bookingid;
    let bname = req.query.bkname;
    let bprice = req.query.bkprice;

    console.log(bid, bname, bprice);

    let output = { status: false, bookname: "", price: "" };

    con.query('update book set price=? where bookid=?', [bprice, bid], (err, rows) => {

        if (err) {
            console.log("error" + err);
        } else {
            if (rows.affectedRows > 0) {
                output.status = true;
                console.log("RA: " + rows.affectedRows);
            } else {
                console.log("no rows affected");
            }
        }
        res.send(output);
    });
});



app.get('/showAllDetails', (req, res) => {
    con.query('select * from book', [], (err, rows) => {
        res.send(rows);
    });
});




app.listen(900, function () {
    console.log("Server listening to port 900....");
});