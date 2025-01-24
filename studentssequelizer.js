import { Op, Sequelize } from "sequelize";
const { DataTypes } = Sequelize;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/database.sqlite",
});

const Students = sequelize.define("students", {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 20],
    },
  },
  favorite_class: {
    type: DataTypes.STRING(25),
    defaultValue: "Computer Science",
  },
  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  has_language_examination: {
    type: DataTypes.TINYINT,
    defaultValue: true,
  },
});

try {
  await Students.sync({ force: true });
  await Students.bulkCreate([]);
} catch (error) {
  console.log(error);
}
Students.sync({ force: true }).then(() => {
  return Students.bulkCreate([
    {
      name: "John Doe",
      favorite_class: "Mathematics",
      school_year: 10,
      has_language_examination: 1,
    },
    {
      name: "Jane Smith",
      favorite_class: "Computer Science",
      school_year: 11,
      has_language_examination: 0,
    },
    {
      name: "Alice Brown",
      favorite_class: "History",
      school_year: 12,
      has_language_examination: 1,
    },
    {
      name: "Bob White",
      favorite_class: "Biology",
      school_year: 10,
      has_language_examination: 1,
    },
    {
      name: "Charlie Green",
      favorite_class: "Computer Science",
      school_year: 11,
      has_language_examination: 0,
    },
  ]);
});


Students.findAll({
  attributes: ["name"],
  where: {
    [Op.or]: {
      favorite_class: "Computer Science",
      has_language_examination: true,
    },
  },
});


Students.findAll({
  attributes: [
    "school_year",
    [sequelize.fn("COUNT", sequelize.col("school_year")), "num_students"], // Megszámolni a tanulókat
  ],
  group: ["school_year"], // Csoportosítás évfolyamonként
});
