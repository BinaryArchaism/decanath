$(document).ready(function(){
    var list_group = $('#groups')
    view_list();

    function view_list(){
        $.getJSON("http://localhost:8080/internal/api/get_groups", function(data) {
            var students = data
            students.forEach(student => {
                append_to_list(student)
            });
        })
            .fail(function() {
                alert( "error" );
            })
    }

    function append_to_list(student){
        let cath_id = student['cath_id']
        let number = student['number']
        list_group.append(`<li class="list-group-item">
                                <div class="row row-cols-2">
                                    <div class="col">${number}</div>
                                    <div class="col">${cath_id}</div>
                                </div>
                            </li>`)
    }
});