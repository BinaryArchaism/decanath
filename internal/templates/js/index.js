//функция показа всех студентов, групп, преподов, кафедр
$(document).ready(function(){
    showStudents()

    $('#groups').click(function(e) {
        // Stop form from sending request to server
         e.preventDefault();
        // $.ajax({
        //     method: "POST",
        //     url: "http://localhost:8080/internal/api/get_groups",
        //     dataType: "json",
        // });
        showGroups()
    })

    $('#lecturers').click(function(e) {
         e.preventDefault();
        showLecturers()
    })

    $('#cathedras').click(function (e) {
        e.preventDefault();
        showCathedras()
    })



    function showStudents() {
        var hdr = $('#hdr')
        hdr.append('<li class="list-group-item">\n' +
            '                <div class="row row-cols-3">\n' +
            '                    <div class="col">ФИО Студента</div>\n' +
            '                    <div class="col">Номер группы</div>\n' +
            '                    <div class="col">ID</div>\n' +
            '                </div>\n' +
            '            </li>')
        var list_students = $('#info')
        list_students.html("")
        $.getJSON("http://localhost:8080/internal/api/get_students", function(data) {
            var students = data
            students.forEach(student => {
                list_students.append(`<li class="list-group-item">
                                <div class="row row-cols-3">
                                    <div class="col">${student['FIO']}</div>
                                    <div class="col">${student['groupid']}</div>
                                    <div class="col">${student['id']}</div>
                                </div>
                            </li>`)
            });
        })
            .fail(function() {
                alert( "error" );
            })
    }

    function showGroups() {
        var hdr = $('#hdr')
        hdr.html('<li class="list-group-item">\n' +
            '                <div class="row row-cols-3">\n' +
            '                    <div class="col">ID</div>\n' +
            '                    <div class="col">Номер группы</div>\n' +
            '                    <div class="col">ID Кафедры</div>\n' +
            '                </div>\n' +
            '            </li>')
        var list_groups = $('#info')
        list_groups.html("")
        $.getJSON("http://localhost:8080/internal/api/get_groups", function(data) {
            var students = data
            students.forEach(student => {
                list_groups.append(`<li class="list-group-item">
                                <div class="row row-cols-3">
                                    <div class="col">${student['id']}</div>
                                    <div class="col">${student['number']}</div>
                                    <div class="col">${student['cath_id']}</div>
                                </div>
                            </li>`)
            });
        })
            .fail(function() {
                alert( "error" );
            })
    }

    function showLecturers() {
        var hdr = $('#hdr')
        hdr.html('<li class="list-group-item">\n' +
            '                <div class="row row-cols-2">\n' +
            '                    <div class="col">ФИО Преподавателя</div>\n' +
            '                    <div class="col">ID</div>\n' +
            '                </div>\n' +
            '            </li>')
        var list_lecturers = $('#info')
        list_lecturers.html("")
        $.getJSON("http://localhost:8080/internal/api/get_lecturers", function(data) {
            var students = data
            students.forEach(student => {
                list_lecturers.append(`<li class="list-group-item">
                                <div class="row row-cols-2">
                                    <div class="col">${student['fio']}</div>
                                    <div class="col">${student['id']}</div>
                                </div>
                            </li>`)
            });
        })
            .fail(function() {
                alert( "error" );
            })
    }

    function showCathedras() {
        var hdr = $('#hdr')
        hdr.html('<li class="list-group-item">\n' +
            '                <div class="row row-cols-3">\n' +
            '                    <div class="col">Название кафедры</div>\n' +
            '                    <div class="col">Номер кафедры</div>\n' +
            '                    <div class="col">ID Кафедры</div>\n' +
            '                </div>\n' +
            '            </li>')
        var list_groups = $('#info')
        list_groups.html("")
        $.getJSON("http://localhost:8080/internal/api/get_cathedras", function(data) {
            var students = data
            students.forEach(student => {
                list_groups.append(`<li class="list-group-item">
                                <div class="row row-cols-3">
                                    <div class="col">${student['title']}</div>
                                    <div class="col">${student['number']}</div>
                                    <div class="col">${student['id']}</div>
                                </div>
                            </li>`)
            });
        })
            .fail(function() {
                alert( "error" );
            })
    }
});