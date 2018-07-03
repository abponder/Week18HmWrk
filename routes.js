console.log('02. The routes.js is loaded!!!');

module.exports = function (app) {

	const path = require('path');

	//site route
	const siteRoute = require('./routes/site_route');
	app.use('/', siteRoute);

	//events
	const eventRoute = require('./routes/event_route');
	app.use('/events', eventRoute);

	//users (in this case admin routes)
	const userRoute = require('./routes/user_route');
	app.use('/user', userRoute);

	//artist (in this case admin routes)
	const artistRoute = require('./routes/artist_route');
	app.use('/artist', artistRoute);
}