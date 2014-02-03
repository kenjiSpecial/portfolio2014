(function(){
    var AdminExperimentView = Backbone.View.extend({
        el : "#admin-exp-main-container",

        textDanger       : 'text-danger',
        textAlertDanger  : 'alert-danger',
        textAlertSuccess : 'alert-success',
        textDisplayNone  : 'display-none',


        createContainer : {
            title : document.getElementById('title-form'),
            url   : document.getElementById('url-form'),
            type  : document.getElementById('create-experiment-container-type').querySelector('.text'),
            date  : document.getElementById('date-form')
        },

        forms : {
            title : document.getElementById('inputTitle'),
            url   : document.getElementById('inputUrl'),
            type  : document.getElementById('type-btns'),
            date  : document.getElementById('input-date')
        },

        alert : document.getElementById("experiment-alert"),

        text : {
            miss    : 'MISSING',
            success : 'SUCCESS!'
        },

        paramsTemplate : _.template('title=<%= title %>&url=<%= url %>&type=<%= type %>&date=<%= date %>'),
        deleteTemplate : _.template('id=<%= id %>'),

        events : {
            'click #create-experiment-btn' : 'onCreateExperiment',
            'click .experiment-delete-btn'     : 'onDeleteExperiment',
        },

        initialize : function(){
            _.bindAll(this, 'onSuccess', 'onDeleteSuccess');


        },

        // =====================
        //  mouse event handler
        // =====================

        onCreateExperiment : function(event){
            var editStatus = true;

            var titleString = this.forms.title.value;
            var urlString   = this.forms.url.value;
            var dateString  = this.forms.date.value;
            var typeString;

            var selectType = this.forms.type.querySelector('.active input');

            // type

            if(selectType) {
                typeString = selectType.value;

                if(this.createContainer.type.classList.contains(this.textDanger))
                    this.createContainer.type.classList.remove(this.textDanger);

            } else {
                if(editStatus) editStatus = false;

                if(this.createContainer.type.classList)
                    this.createContainer.type.classList.add(this.textDanger);
                else
                    this.createContainer.className += ' ' + 'text-danger';
            }

            // title

            if(titleString){
                if(this.createContainer.title.classList.contains(this.textDanger)){
                    this.createContainer.title.classList.remove(this.textDanger);
                }
            }else{
                if(editStatus) editStatus = false;
               this.createContainer.title.classList.add(this.textDanger);
            }

            // url

            if(urlString){
                if(this.createContainer.url.classList.contains(this.textDanger))
                    this.createContainer.url.classList.remove(this.textDanger);
            }else{
                if(editStatus) editStatus = false;
                this.createContainer.url.classList.add(this.textDanger);
            }

            // date

            if(dateString){
                if(this.createContainer.date.classList.contains(this.textDanger))
                    this.createContainer.date.classList.remove(this.textDanger);
            }else{
                if(editStatus) editStatus = false;
                this.createContainer.date.classList.add(this.textDanger);
            }


            if(editStatus){
                if(this.alert.classList.contains(this.textDanger)){
                    this.alert.classList.remove(this.textDanger)
                }

                var params = this.paramsTemplate({
                    title : titleString,
                    url   : urlString,
                    date  : dateString,
                    type  : typeString
                });

                function onSuccess(data){
                    alert('onSuccess');
                }

                // posting the date via httprequeset

                var request = new XMLHttpRequest();
                request.onload = this.onSuccess;
                request.open('POST', './experiment-create', true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(params);


            }else{
                // showing the alert
                this.alert.classList.remove(this.textDisplayNone);
                this.alert.classList.add(this.textAlertDanger);

                this.alert.innerHTML = this.text.miss;
            }

        },


        onDeleteExperiment : function(event){
            var target  = event.target;
            this.parent = target.parentNode.parentNode;


            var objectID = target.dataset.id;



            var deleteRequest = new XMLHttpRequest();
            deleteRequest.onload = this.onDeleteSuccess;
            deleteRequest.open('DELETE', './experiment-delete/' + objectID, true);
            deleteRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            deleteRequest.send();

        },

        // ================
        //  on load method
        // ================

        onDeleteSuccess : function(response){
            this.parent.remove();

            this.alert.innerHTML = this.text.success;
            this.alert.classList.add(this.textAlertSuccess);
            this.alert.classList.remove(this.textDisplayNone)


            setTimeout(function(){
                this.alert.classList.remove(this.textAlertSuccess);
                this.alert.classList.add(this.textDisplayNone)
            }.bind(this), 3000);
        },

        onSuccess : function(response){
            this.alert.innerHTML = this.text.success;
            this.alert.classList.add(this.textAlertSuccess);
            this.alert.classList.remove(this.textDisplayNone)
        }

    });

    var adminExperimentView = new AdminExperimentView();
    window.admin = adminExperimentView;

})();