const sql = require("./db.js");
// constructor
const CardItems = function(cardItems) {
  this.user_id = cardItems.user_id;
  this.product_id = cardItems.product_id;
  this.quantity = cardItems.quantity;
};

CardItems.create = (newCardItems, result) => {
  sql.query("INSERT INTO card_items SET ?", newCardItems, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created card items: ", { id: res.insertId, ...newCardItems });
    result(null, { id: res.insertId, ...newCardItems });
  });
};
CardItems.findById = (id, result) => {
  sql.query(`SELECT * FROM card_items WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found card items: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found card items with the id
    result({ kind: "not_found" }, null);
  });
};
CardItems.getAll = (product_id, result) => {
  let query = "SELECT * FROM card_items";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("card items: ", res);
    result(null, res);
  });
};

CardItems.updateById = (id, cardItems, result) => {
  sql.query(
    "UPDATE card_items SET user_id = ?, product_id = ?, quantity = ? WHERE id = ?",
    [cardItems.user_id, cardItems.product_id, cardItems.quantity, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found card items with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated cardItems: ", { id: id, ...cardItems });
      result(null, { id: id, ...cardItems });
    }
  );
};
CardItems.remove = (id, result) => {
  sql.query("DELETE FROM card_items WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found card items with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted card items with id: ", id);
    result(null, res);
  });
};
CardItems.removeAll = result => {
  sql.query("DELETE FROM card_items", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} card items`);
    result(null, res);
  });
};
module.exports = CardItems;