const router = require('express').Router();
const apiRoutes = require('./api');
// this adds "/api" to the end of the pasth
router.use('/api', apiRoutes);
// error handler if their is a wrong rout.
router.use((req, res) => {
    return res.send('Wrong route!');
});
// exports the module
module.exports = router;
