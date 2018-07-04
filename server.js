   //dependencies
   const express       = require('express');
   const bodyparser    = require('body-parser');
   const exhbs         = require('express-handlebars');
   const logger        = require('morgan');
   const mongoose      = require("mongoose");

   const db            = require('./models');
//=====================================================