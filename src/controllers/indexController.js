const path = require('path');

const controller = {
    index: (req, res) => {
        res.render('info/index.ejs', {});
    },
    about: (req, res) => {
        res.render('info/about.ejs', {});
    }
}

module.exports = controller