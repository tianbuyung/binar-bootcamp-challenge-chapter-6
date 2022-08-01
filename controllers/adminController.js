const Model = require("../app-db/models");
const { UserGame, UserGameBiodata, UserGameHistory } = Model;
const createError = require("http-errors");
const encrypt = require("bcryptjs");
const saltRounds = 10;

class AdminController {
  // hapus aja kalo gak kepake, karena constructor ini ngebuat objeck dulu, jadinya bikin performance sedikit lebih lama
  constructor() {}
  getDashboardPage(req, res) {
    // .. udah bagus, attributes juga di specify satu persatu jadinya lebih aman. Mungkin untuk challenge buat mas septian sendnri
    // bisa di rubah jadi pagination mas. dari sisi FE juga nanti ada pagenya
    // tapi kalo bisa dikasih attribute juga di UserGame.findAll nya, soalnya nanti UserGame passwordnya ikut ke display juga
    // UserGame.findAll({
    //   attributes: ['disini nanti masukin mau attribute apaan aja yang di show'],
    //   include: [
    //     {
    //       model: UserGameBiodata,
    //       as: "biodata",
    //       attributes: [
    //         "userId",
    //         "firstName",
    //         "lastName",
    //         "address",
    //         "phoneNumber",
    //         "bio",
    //       ],
    //     },
    //   ],
    // })
    // Status update is Done
    const query = req.query;
    let limit = Number(query.limit) || 5;
    let page = Number(query.page) || 1;
    let offset = (page - 1) * limit;
    let users = UserGame.findAndCountAll({
      order: ["id"],
      limit,
      offset,
      attributes: ["id", "username", "isAdmin", "createdAt", "updatedAt"],
      include: [
        {
          model: UserGameBiodata,
          as: "biodata",
          attributes: [
            "userId",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
            "bio",
          ],
        },
      ],
    });
    users
      .then((data) => {
        const itemCount = data.count;
        let pageCount = Math.ceil(data.count / limit);
        // bagus nih jadinya lebih rapi pagenya
        res.render("pages/admin/dashboard", {
          title: "Administrator",
          message: true,
          users: data.rows,
          pages: pageCount,
        });
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
  createUserGame(req, res, next) {
    const {
      username,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      bio,
      isAdmin,
    } = req.body;
    // mungkin logicnya bisa diperbaiki dengan cara cari dulu ada gak usernamenya yang dimasukin. Kalo ada jangan dibuat lagi
    // karena username gak mungkin bisa sama kan
    // bisa juga pake find or create function dari sequelize
    // https://sebhastian.com/sequelize-findorcreate/
    UserGame.create({
      username,
      // pake bcryptjs aja mas, soalnya si bcrypt ini suka ada bug kalo dideploy ke server. Logicnya sama aja dan functionnya juga
      // status update is done
      password: encrypt.hashSync(password, saltRounds),
      isAdmin,
    })
      .then((data) => {
        // sebenenrya chaining gini gak terlalu bagus sih, jadi sama kaya callback hell jatohnya,
        // tapi nanti kita bahas di chapter 7.
        UserGameBiodata.create({
          userId: data.id,
          firstName,
          lastName,
          address,
          phoneNumber,
          bio,
        });
      })
      .then(() => {
        res.redirect("/admin");
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
  viewUserById(req, res) {
    // sama ini jug attribute usernya di tentuin juga mau mana aja yang keluar
    // Status update is Done
    UserGame.findOne({
      attributes: ["id", "username", "isAdmin", "createdAt", "updatedAt"],
      include: [
        {
          model: UserGameBiodata,
          as: "biodata",
          attributes: [
            "userId",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
            "bio",
          ],
        },
      ],
      where: { id: req.params.id },
    })
      .then((data) => {
        res.render("pages/admin/viewProfile", { title: "View Profile", data });
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
  getEditPage(req, res) {
    UserGame.findOne({
      attributes: ["id", "username", "isAdmin", "createdAt", "updatedAt"],
      include: [
        {
          model: UserGameBiodata,
          as: "biodata",
          attributes: [
            "userId",
            "firstName",
            "lastName",
            "address",
            "phoneNumber",
            "bio",
          ],
        },
      ],
      where: { id: req.params.id },
    })
      .then((data) => {
        res.render("pages/admin/editProfile", { title: "Edit Profile", data });
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
  updateUserById(req, res) {
    const {
      username,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      bio,
      isAdmin,
    } = req.body;
    // ini juga pastiin username gak boleh sama
    // kalo dari sisi proteksi buat aplikasi kita, better untuk check dulu apakah usernya ada terlebih dahulu sebelum diupdate
    UserGame.update(
      {
        username,
        password,
        isAdmin,
        updatedAt: new Date().getTime(),
      },
      { where: { id: req.params.id } }
    )
      .then(() =>
        UserGameBiodata.update(
          {
            firstName,
            lastName,
            address,
            phoneNumber,
            bio,
          },
          { where: { userId: req.params.id } }
        )
      )
      .then(() => {
        res.redirect("/admin");
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
  deleteUserById(req, res) {
    // bagus nih udah ada paranoid jadinya aman
    UserGame.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.redirect("/admin");
      })
      .catch((err) => {
        res.render("pages/error", {
          title: "Error",
          message: err.message,
          error: err,
        });
      });
  }
}

module.exports = AdminController;
