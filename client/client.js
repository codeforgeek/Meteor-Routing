if(Meteor.isClient) {
    Router.route('/',function(){
        this.render('Home', {data: {title: 'Home'}});
    });
    Router.route('/message');
    Template.message.helpers({
        welcome : "Hello World"
    });
}
