/**
 * Created by Walter on 6/2/2016.
 */

var commentForm = function () {
    // grab the form information, save it to data var
    var data = {
        author: $('#name').val.trim(),
        comment: $('#showNote').val().trim,
        show_id: $('#id span').val(),
        date: Date.now()
    };
    var url = '/submit/' + show_id;

    // if data.title or data.body is empty, stop the function
    if (data.author == "" || data.comment == "") {
        return false
    }


    $('#submitNote').bind("click", function () {
        console.log(url);
        commentForm();

        // make the api call
        $.post(url, data, function () {
            console.log('post call made');
            alert($this.text());
            // on success, reload the article, along with new comment
            //TODO create dispComment function
          //  dispComment();
        })
    });

};


//TODO create route for viewing notes
// on view comments button
$(document).on('click', '#viewComments', function () {
    var notesUrl = '/notes/' + $('#id span').val();
    viewComments();
    // prevent refresh
    return false;
});



// on pressing a delete button
$(document).on('click', '.delete', function () {
    //TODO create deleteComment function
    deleteComment($(this));
    // prevent refresh
    return false;
});