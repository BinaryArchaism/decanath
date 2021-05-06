$(document).ready(function(){
    console.log("hdflsjhfskjdfh")
    var list_group = $('#group')
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
        let id = student['id']
        let group_id = student['groupid']
        let fio = student['FIO']
        list_group.append(`<li class="list-group-item">
                                <div class="row row-cols-3">
                                    <div class="col">${id}</div>
                                    <div class="col">${group_id}</div>
                                    <div class="col">${fio}</div>
                                </div>
                            </li>`)
    }
});