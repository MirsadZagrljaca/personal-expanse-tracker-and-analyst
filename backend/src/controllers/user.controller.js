import User from "../models/user.models";
import _, { join } from "lodash";
import errorHandler from "../helpers/dbErrorHandler";
import crypto from "crypto";
import Transaction from "../models/transaction.model";

const encryptPassword = (password, salt) => {
  try {
    return crypto.createHmac("sha1", salt).update(password).digest("hex");
  } catch (err) {
    return "";
  }
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  });
};

const create = (req, res, next) => {
  const user = new User(req.body);

  user.save((err, result) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    res.status(200).json({ message: "Successfully signed up!" });
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(users);
  }).select("firstName lastName nickname email updated create");
};

const read = (req, res) => {
  res.status(200).json(req.profile);
};

const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  });
};

const update = (req, res, next) => {
  let user = req.profile;
  let data = req.body;

  if (data.password) {
    if (data.password !== "") {
      data.hashed_password = encryptPassword(data.password, user.salt);
      delete data.password;
    }
  }

  user = _.extend(user, data);
  user.updated = Date.now();

  user.save((err) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage() });
    }
    res.status(200).json(user);
  });
};

export default { create, list, userByID, read, update, remove };
