/**
 * Created by Walter on 6/2/2016.
 */

// articles array
const Notes = [];

// Note class constructor


// on construction, push object to array specified in last arg
// (e.g., the "articles" array)
arr.push(this);
}
var commentForm = function () {
    // grab the form information, save it to data var
    var data = {
        author: $('#name').val.trim(),
        comment: $('#showNote').val().trim(),
        show_id: $('#id span').val(),
        date: Date.now()
    };
    var url = '/submit/' + show_id;

    // if data.title or data.body is empty, stop the function
    if (data.title == "" || data.body == "") {
        return false
    }


    $('button').bind("click", function () {
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



// on pressing comment submit button
$(document).on('click', '#submit', function () {
    commentForm();
    // prevent refresh
    return false;
});

}

// on pressing a delete button
$(document).on('click', '.delete', function () {
    //TODO create deleteComment function
    deleteComment($(this));
    // prevent refresh
    return false;
});