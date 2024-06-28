/**
 * Automation testing
 * @author Irshaduddin Chowdhury
 * 
 */

require("dotenv").config()
var should = require("should");
var request = require("request");
var urlBase = process.env.APP_URL;
// const User = request("../models/userModel");

const CREATE_USER  = urlBase + "/worko/user"
const GET_ALL_USERS = urlBase + "/worko/users"
const GET_UPDATE_DELETE_USER_BY_ID = urlBase + "/worko/user/:userId"
const SUPER_LOGIN = urlBase + "/worko/super-login"

const testUserId= "21ac51c1-516c-4100-b920-cd38ce3e15ba"

var token;

describe("API_Unit_Tests", function () {
    it("Should_Super_Login", function (done) {
        request.post({
            url: SUPER_LOGIN
        }, function (error, response, body) {
            // console.log(response, 24)
            var _body = {}
            try {
                _body = JSON.parse(body)
            } catch (error) {
                _body = {}
            }
            // console.log(response, 30)
            should(response.statusCode).equal(200)
            token = body?.data?.accessToken
            done();
        })
    })
    it("Should_Create_User", function (done) {
        const userData = {
            name: "Unit Test User 1",
            email: "unitTestUser1@testing.com",
            age: 24,
            city: "Nagpur",
            zipCode: 440013
        }

        // console.log(token, 46)

        request.post({
            url: CREATE_USER+"?isTesting=true",
            json: userData,
        }, function (error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            // console.log(response)
            should(response.statusCode).equal(201)
            done()
        })
    })
    it("Should_Get_All_Users", function(done) {
        request.get({
            url: GET_ALL_USERS+"?isTesting=true"
        }, function (error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(_body?.data?.users.length).equal(2)
            // console.log(response)
            should(response.statusCode).equal(200)
            done()
        })
    })
    it("Should_Get_User_By_Id", function(done) {
        request.get({
            url: GET_UPDATE_DELETE_USER_BY_ID.replace(":userId", testUserId)+"?isTesting=true"
        }, function (error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(_body?.data?.user.id).equal(testUserId)
            // console.log(response)
            should(response.statusCode).equal(200)
            done()
        })
    })
    it("Should_Put_Update_User_By_Id", function(done) {
        const newData = {
            name: "Unit Test User 00",
            email: "unitTestUser1@testing.com",
            age: 27,
            city: "Nagpur",
            zipCode: 440001
        }
        request.put({
            url: GET_UPDATE_DELETE_USER_BY_ID.replace(":userId", testUserId)+"?isTesting=true",
            json: newData
        }, function (error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(202)
            done()
        })
    })
    it("Should_Patch_Update_User_By_Id", function(done) {
        const newData = {
            age: 37,
        }
        request.patch({
            url: GET_UPDATE_DELETE_USER_BY_ID.replace(":userId", testUserId)+"?isTesting=true",
            json: newData
        }, function (error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(202)
            done()
        })
    })
    it("Should_Soft_Delete_User_By_Id", function(done) {
        const newData = {
            age: 37,
        }
        request.delete({
            url: GET_UPDATE_DELETE_USER_BY_ID.replace(":userId", testUserId)+"?isTesting=true",
            json: newData
        }, function (error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(204)
            done()
        })
    })
})