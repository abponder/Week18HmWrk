module.exports = function(sequelize, DataTypes) {
    const Artist = sequelize.define("Artist", {
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          }, contactName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },contactEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
          },contactPhone: {
            type: DataTypes.STRING,
            allowNull: true
          },personalWebsite: {
            type: DataTypes.STRING,
            allowNull: true
          },instagramLink: {
            type: DataTypes.STRING,
            allowNull: true
          },facebookLink: {
            type: DataTypes.STRING,
            allowNull: true
          },
          spotifyLink: {
            type: DataTypes.STRING,
            allowNull: true
          },
          twitterLink: {
            type: DataTypes.STRING,
            allowNull: true
          },
          twitterLink: {
            type: DataTypes.STRING,
            allowNull: true
          },
          soundcloudLink: {
            type: DataTypes.STRING,
            allowNull: true
          },
          youtubeLink: {
            type: DataTypes.STRING,
            allowNull: true
          },
          appleMusicLink: {
            type: DataTypes.STRING,
            allowNull: true
          },
          otherLink1: {
            type: DataTypes.STRING,
            allowNull: true
          },
          otherLink2: {
            type: DataTypes.STRING,
            allowNull: true
          },
          comments: {
            type: DataTypes.STRING,
            allowNull: true
          },
          upcomingProjects: {
            type: DataTypes.STRING,
            allowNull: true
          } 
         });
          return Artist;
        };