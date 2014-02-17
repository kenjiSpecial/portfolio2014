(function(){


    var AdminBlogCreateView = Backbone.View.extend({
        el : '#admin-blog-create-container',

        createBlogPost : document.getElementById('create-blog-post'),
        blogThumbnail  : document.getElementById('blog-thumbnail'),
        albumThumbnail : document.getElementById('blog-album-thumbnail'),

        paramsTemplate : _.template('title=<%= title %>&thumbnail=<%= thumbnail %>&content=<%= content %>&date=<%= date %>'),

        events : {
            'click #create-blog-post'  : 'onCreateBlogPost',
            'change #exampleInputFile' : 'onChangeExampleInputFile'
        },

        initialize : function(){
            _.bindAll(this, 'onBlogSuccess');
        },

        onCreateBlogPost : function(event){

            // ======================
            var titleValue    = document.getElementById('blogTitleInput').value;

           var thumbnailSelector     = document.getElementById('blog-thumbnail');
           var selectedThumbnailName = thumbnailSelector.getAttribute('data-thumbnail');

            var contentValue = document.getElementById('blogContentInput').value;



            if(titleValue&&selectedThumbnailName&&contentValue){
                var params = this.paramsTemplate({
                    title     : titleValue,
                    thumbnail : selectedThumbnailName,
                    content   : contentValue,
                    date      : new Date()
                });

                console.log(params);

                var request = new XMLHttpRequest();
                //request.onload = this.onSuccess;
                request.open('POST', './blog-new-create', true);
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(params);
            }

            event.preventDefault();
        },

        onBlogSuccess : function(data){

        },

        onChangeExampleInputFile : function(event){
            //this.files = event.target.files;


            // TODO How to reflect.
            /**
            if(this.files.length > 0){
                this.albumThumbnail.src = window.URL.createObjectURL(this.files[0]);
                this.albumThumbnail.onload = function(e){
                    window.URL.revokeObjectURL(this.src);
                };
            }
             */
        }

    });

    var adminBlogCreativeView = new AdminBlogCreateView();
    window.adminBlogCreativeView = adminBlogCreativeView;
})();