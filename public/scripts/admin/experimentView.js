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
            success : 'SUCCESS!',
            update  : 'UPDATE!'
        },

        paramsTemplate : _.template('title=<%= title %>&url=<%= url %>&type=<%= type %>&date=<%= date %>'),
        deleteTemplate : _.template('id=<%= id %>'),
        editTemplate   : new EJS({ url: '../scripts/admin/experimentEditTemplate.ejs' }),
        updateTemplate : new EJS({ url: '../scripts/admin/experimentUpdateTemplate.ejs' }),

        events : {
            'click #create-experiment-btn' : 'onCreateExperiment',
            'click .experiment-delete-btn' : 'onDeleteExperiment',
            'click .experiment-edit-btn'   : 'onEditExperiment',
            'click .experiment-update-btn' : 'onUpdateExperiment'
        },

        initialize : function(){
            _.bindAll(this, 'onSuccess', 'onDeleteSuccess', 'onUpdateSuccess');


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

        onEditExperiment : function(event){
            // change the content
            var targetTable = event.target.parentNode.parentNode;

            var id    = targetTable.getAttribute('id');
            var title = (targetTable.querySelector('.experiment-title').innerHTML).replace(/ /g, '');
            var url   = (targetTable.querySelector('.experiment-url').innerHTML).replace(/ /g, '');
            var type  = (targetTable.querySelector('.experiment-type').innerHTML).replace(/ /g, '');
            var date  = (targetTable.querySelector('.experiment-date').innerHTML).replace(/ /g, '');


           var HTML = this.editTemplate.render({ id: id, title: title, url: url, type: type, date: date });
            targetTable.innerHTML = HTML;

        },

        onUpdateExperiment : function(event){

            var targetTable = event.target.parentNode.parentNode;

            var id           = targetTable.getAttribute('id');
            var title        = targetTable.querySelector('#inputTitle').value;
            var url          = targetTable.querySelector('#inputUrl').value;
            var selectedType = targetTable.querySelector('.active input').value;
            var date         = targetTable.querySelector('#edit-experiment-input-date').value;

            this.selectedID = id;
            this.selectedTable = document.getElementById(id);

            var params = this.paramsTemplate({
                title : title,
                url   : url,
                date  : date,
                type  : selectedType
            });

            var request = new XMLHttpRequest();
            request.onload = this.onUpdateSuccess;
            var directoryToPost = './experiment-update/' + id;
            request.open('PUT', directoryToPost , true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(params);

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
                this.alert.classList.add(this.textDisplayNone);
            }.bind(this), 3000);
        },


        onSuccess : function(response){
            this.alert.innerHTML = this.text.success;
            this.alert.classList.add(this.textAlertSuccess);
            this.alert.classList.remove(this.textDisplayNone)
        },

        onUpdateSuccess : function( response){

            var target = JSON.parse(response.target.response);

            // showing update
            var html = this.updateTemplate.render({
                id    : this.selectedID,
                title : target.title,
                url   : target.url,
                type  : target.type,
                date  : target.date
            });

            this.selectedTable.innerHTML = html;

            this.alert.innerHTML = this.text.update;
            this.alert.classList.add(this.textAlertSuccess);
            this.alert.classList.remove(this.textDisplayNone);

            var self = this;
            setTimeout(function(){
                self.alert.classList.remove(self.textAlertSuccess);
                self.alert.classList.add(self.textDisplayNone);
            }, 3000);

        }

    });

    var adminExperimentView = new AdminExperimentView();
    window.admin = adminExperimentView;

})();