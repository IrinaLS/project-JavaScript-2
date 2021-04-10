const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.listen(3000, () => {
    console.log('server is running on port 3000');
});
app.use(express.static('./public'));
app.get('/data', (req, res) => {
    fs.readFile('./public/goods.json', 'utf-8', (err, data) => {
        if (!err) {
            res.setHeader('Content-Type', 'Application/json');
            res.end(data);
        }
        else {
            console.log(err);
            res.end(JSON.stringify(err));
        }
    })
});
app.get('/cart', (req, res) => {
    fs.readFile('./public/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            res.setHeader('Content-Type', 'Application/json');
            res.end(data);
        }
        else {
            console.log(err);
            res.end(JSON.stringify(err));
        }
    })
});
app.post('/cart', bodyParser.json(), (req, res) => {
    fs.readFile('./public/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            const goods = req.body;
            fs.writeFile('./public/cart.json', JSON.stringify(goods), (err) => {
                if (!err) {
                    res.end();
                }
                else {
                    console.log(err);
                    res.end(JSON.stringify(err));
                }
            });
        }
        else {
            console.log(err);
            res.end(JSON.stringify(err));
        }
    })
});
app.post('/stats', bodyParser.json(), (req, res) => {
    fs.readFile('./public/stats.json', 'utf-8', (err, data) => {
        if (!err) {
            const goods = data + JSON.stringify(req.body);
            fs.writeFile('./public/stats.json', goods, (err) => {
                if (!err) {
                    res.end();
                }
                else {
                    console.log(err);
                    res.end(JSON.stringify(err));
                }
            });
        }
        else {
            console.log(err);
            res.end(JSON.stringify(err));
        }
    })
})