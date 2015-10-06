if(Meteor.isServer) {
    Meteor.startup(function () {
        Messages = new Meteor.Collection('messages');
    });
    Router.route('/message',{where: 'server'})
        .get(function(){
            var response = Messages.find().fetch();
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));
        })
        .post(function(){
            var response;
            if(this.request.body.message === undefined || this.request.body.message === null || this.request.body.message === "") {
                response = {
                    "error" : true,
                    "message" : "invalid data"
                };
            } else {
                Messages.insert({
                    message : this.request.body.message
                });
                response = {
                    "error" : false,
                    "message" : "message added."
                }
            }
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));
        });
    Router.route('/message/:id',{where: 'server'})
        .get(function(){
            var response;
            if(this.params.id !== undefined) {
                var data = Messages.find({_id : this.params.id}).fetch();
                if(data.length > 0) {
                    response = data
                } else {
                    response = {
                        "error" : true,
                        "message" : "Record not found."
                    }
                }
            }
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));
        })
        .put(function(){
            var response;
            if(this.params.id !== undefined) {
                var data = Messages.find({_id : this.params.id}).fetch();
                if(data.length > 0) {
                    if(Messages.update({_id : data[0]._id},{$set : {message : this.request.body.message}}) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Message updated."
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Message not updated."
                        }
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "Record not found."
                    }
                }
            }
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));
        })
        .delete(function(){
            var response;
            if(this.params.id !== undefined) {
                var data = Messages.find({_id : this.params.id}).fetch();
                if(data.length > 0) {
                    if(Messages.remove(data[0]._id) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Message deleted."
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Message not deleted."
                        }
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "Record not found."
                    }
                }
            }
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));
        });
}
