const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("#Functional Tests", function () {
  suite("#Requests to /api/issues/{project}", function () {
    suite("#POST request", function () {
      test("Create an issue with every field: POST request", function (done) {
        const info = {
          issue_title: "Testing post request",
          issue_text: "lorem ipsum",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "Chai and Mocha",
          status_text: "In QA",
        };
        chai
          .request(server)
          .post("/api/issues/test")
          .send(info)
          .end(function (err, res) {
            if (err) return done(err);
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, info.issue_title);
            assert.equal(res.body.issue_text, info.issue_text);
            assert.equal(res.body.created_by, info.created_by);
            assert.equal(res.body.assigned_to, info.assigned_to);
            assert.equal(res.body.status_text, info.status_text);
            assert.equal(res.body.open, true);
            done();
          });
      });
      test("Create an issue with only required fields: POST request", function (done) {
        const info = {
          issue_title: "Testing post request",
          issue_text: "lorem ipsum",
          created_by: "Functional Test - Every field filled in",
        };
        chai
          .request(server)
          .post("/api/issues/test")
          .send(info)
          .end(function (err, res) {
            if (err) done(err);
            assert.equal(res.status, 200);
            assert.equal(res.body.issue_title, info.issue_title);
            assert.equal(res.body.issue_text, info.issue_text);
            assert.equal(res.body.created_by, info.created_by);
            assert.equal(res.body.assigned_to, "");
            assert.equal(res.body.status_text, "");
            assert.equal(res.body.open, true);
            done();
          });
      });
      test("Create an issue with missing required fields: POST request", function (done) {
        const info = {
          issue_title: "Testing post request",
          issue_text: "lorem ipsum",
        };
        chai
          .request(server)
          .post("/api/issues/test")
          .send(info)
          .end(function (err, res) {
            if (err) done(err);
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "required field(s) missing");
            done();
          });
      });
    });
    suite("#GET request", function () {
      test("View issues on a project: GET request", function (done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .end(function (err, res) {
            if (err) throw err;
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });
      test("View issues on a project with one filter: GET request", function (done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({ open: true })
          .end(function (err, res) {
            if (err) throw err;
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });
      test("View issues on a project with multiple filters: GET request", function (done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({ open: true, issue_title: "Testing post request" })
          .end(function (err, res) {
            if (err) throw err;
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });
      suite("#PUT request", function () {
        test("Update one field on an issue: PUT request", function (done) {
          chai
            .request(server)
            .put("/api/issues/test")
            .send({
              _id: "631a328fb81f9705f2e5c5f9",
              issue_title: "Updated title",
            })
            .end(function (err, res) {
              if (err) throw err;
              assert.equal(res.status, 200);
              assert.equal(res.body.result, "successfully updated");
              assert.equal(res.body._id, "631a328fb81f9705f2e5c5f9");
              done();
            });
        });
        test("Update multiple fields on an issue: PUT request", function (done) {
          chai
            .request(server)
            .put("/api/issues/test")
            .send({
              _id: "631a328fb81f9705f2e5c5f9",
              issue_title: "Updated title",
              issue_text: "Updated text",
            })
            .end(function (err, res) {
              if (err) throw err;
              assert.equal(res.status, 200);
              assert.equal(res.body.result, "successfully updated");
              assert.equal(res.body._id, "631a328fb81f9705f2e5c5f9");
              done();
            });
        });
        test("Update an issue with missing _id: PUT request", function (done) {
          chai
            .request(server)
            .put("/api/issues/test")
            .send({
              issue_title: "Updated title",
            })
            .end(function (err, res) {
              if (err) throw err;
              assert.equal(res.status, 200);
              assert.equal(res.body.error, "missing _id");
              done();
            });
        });
        test("Update an issue with no fields to update: PUT request", function (done) {
          chai
            .request(server)
            .put("/api/issues/test")
            .send({
              _id: "631a328fb81f9705f2e5c5f9",
            })
            .end(function (err, res) {
              if (err) throw err;
              assert.equal(res.status, 200);
              assert.equal(res.body.error, "no update field(s) sent");
              assert.equal(res.body._id, "631a328fb81f9705f2e5c5f9");
              done();
            });
        });
        test("Update an issue with an invalid _id: PUT request", function (done) {
          chai
            .request(server)
            .put("/api/issues/test")
            .send({
              _id: "1",
              issue_title: "Updated title",
            })
            .end(function (err, res) {
              if (err) throw err;
              assert.equal(res.status, 200);
              assert.equal(res.body.error, "could not update");
              assert.equal(res.body._id, "1");
              done();
            });
        });
      });
      suite("#DELETE request", function () {
        test("Delete an issue: DELETE request", function (done) {
          chai
            .request(server)
            .delete("/api/issues/test")
            .send({
              _id: "631a32498a00525e0ab9e3c1",
            })
            .end(function (err, res) {
              if (err) throw err;
              assert.equal(res.status, 200);
              assert.equal(res.body.result, "successfully deleted");
              assert.equal(res.body._id, "631a32498a00525e0ab9e3c1");
              done();
            });
        });
        test("Delete an issue with an invalid _id: DELETE request", function (done) {
          chai
            .request(server)
            .delete("/api/issues/test")
            .send({
              _id: "1",
            })
            .end(function (err, res) {
              if (err) throw err;
              assert.equal(res.status, 200);
              assert.equal(res.body.error, "could not delete");
              assert.equal(res.body._id, "1");
              done();
            });
        });
        test("Delete an issue with missing _id: DELETE request", function (done) {
          chai
            .request(server)
            .delete("/api/issues/test")
            .send({})
            .end(function (err, res) {
              if (err) throw err;
              assert.equal(res.status, 200);
              assert.equal(res.body.error, "missing _id");
              done();
            });
        });
      });
    });
  });
});
