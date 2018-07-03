module.exports = function(sequelize, DataTypes) {
  const Event = sequelize.define("Event", {
        eventName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        venueName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        },
        eventDate: {
          type: DataTypes.DATE,
          allowNull:false,
          defaultValue: "2018-01-01",
          validate: {
            len: [1]
          }
        },
       startTime: {
          type: DataTypes.STRING,
          allowNull:false,
          defaultValue: "8:00 pm",
          validate: {
            len: [1]
          }
        },
        showLength: {
          type: DataTypes.STRING,
          allowNull:false,
          //showLength in milliseconds
        },
        eventAddress: {
          type: DataTypes.STRING,
          allowNull:true,
        },
        eventCity: {
          type: DataTypes.STRING,
          allowNull:true,
        },
        eventState: {
          type: DataTypes.STRING,
          allowNull:true,
        },
        eventZip: {
          type: DataTypes.STRING,
          allowNull:true,
        },
        eventCountry: {
          type: DataTypes.STRING,
          allowNull:true,
        },
        coordinates: {
          type: DataTypes.STRING,
          allowNull:true,
        },
        ageRestrictions: {
          type: DataTypes.STRING,
          allowNull:true,
        },
        showDetails: {
         type: DataTypes.STRING,
          allowNull:true,
        },
        eventLink: {
          type: DataTypes.STRING,
          allowNull:true,
        },
        artist_01: {
          type: DataTypes.STRING,
          allowNull:true,
        },
        artist_02: {
          type: DataTypes.STRING,
          allowNull:true,
        },
        artist_03: {
          type: DataTypes.STRING,
          allowNull:true,
        }  
      });
      return Event;
    };
    
  