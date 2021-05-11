Date.prototype.getMonthName = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'ru';
    return Date.locale[lang].month_names[this.getMonth()];
};

Date.prototype.getMonthNameShort = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'ru';
    return Date.locale[lang].month_names_short[this.getMonth()];
};

Date.locale = {
    ru: {
        month_names: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        month_names_short: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    }
};

var mark = {0:"-", 1:"1", 2:"2", 3:"3", 4:"4", 5:"5", 6:"Незачет", 7:"Зачет"}

$(document).ready(function(){
    var json_groups, json_subjects, json_statements, json_students, json_student_exams
    var switcher1 = $("#switcher-1")
    var swch_1 = $("#swch-1")
    var switcher2 = $("#switcher-2")
    var swch_2 = $("#swch-2")

    showSecondSwitcher()
    prepareGroupSwitchers()

    $('#by_groups').click(function(e) {
        e.preventDefault()
        showSecondSwitcher()
        prepareGroupSwitchers()
    })
    $('#by_students').click(function(e) {
        e.preventDefault();
        hideSecondSwitcher()
        prepareStudentsSwitcher()
    })

    function showSecondSwitcher() {
        switcher2.html(`
            <select id="swch-2" class="form-select" aria-label="Default select example"></select>
        `)
    }

    function hideSecondSwitcher() {
        switcher2.html("")
    }

    function prepareGroupSwitchers(){
        swch_1.html("")
        swch_2.html("")
        swch_1.append(`<option value="">Выберите группу</option>`)
        var get_groups = getGroups()
        get_groups.then(()=>{
            json_groups = get_groups.responseJSON
            json_groups.forEach((group)=>{
                swch_1.append(`<option value=${group.id}>${group.number}</option>`)
            })
            swch_2 = $("#swch-2")
            swch_2.append(`<option value="">Выберите предмет</option>`)
            get_subjects = getSubjects()
            get_subjects.then(()=>{
                json_subjects = get_subjects.responseJSON
                json_subjects.forEach((subject)=>{
                    swch_2.append(`<option value=${subject.id}>${subject.title}</option>`)
                })
            })
            swch_2.on('change', function() {
                group_id = swch_1.val()
                subject_id = this.value
                showGroupList(group_id, subject_id)
            });
        })
    }

    function prepareStudentsSwitcher() {
        swch_1.html("")
        swch_1.append(`<option value="">Выберите студента</option>`)
        get_students = getStudents()
        get_students.then(()=>{
            json_students = get_students.responseJSON
            json_students.forEach((student)=>{
                swch_1.append(`<option value="${student.FIO}">${student.FIO}</option>`)
            })
            swch_1.on('change', function() {
                student_fio = this.value
                showStudentList(student_fio)
            });
        })
    }
    
    function showStudentList(student_fio) {
        get_student_exams = getStudentExams(student_fio)
        get_student_exams.then(()=>{
            json_student_exams = get_student_exams.responseJSON
            var stmnts = $('#stmnts')
            stmnts.html('<li class="list-group-item">\n' +
                '                <div class="row row-cols-6">\n' +
                '                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">Назавание предмета</p></div>\n' +
                '                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">Дата</p></div>\n' +
                '                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">Кафедра</p></div>\n' +
                '                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">ФИО Преподавателя</p></div>\n' +
                '                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">ФИО Студента</p></div>\n' +
                '                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">Оценка</p></div>\n' +
                '                </div>\n' +
                '            </li>')
            list = $("#info")
            list.html("")
            if (json_student_exams.length>0){
                json_student_exams.forEach((exam)=>{
                    cath_number = json_student_exams[0].cath
                    fio = json_student_exams[0].fio
                    exam_date = new Date(json_student_exams[0].date)
                    exam_date = exam_date.getDate() + ' ' + exam_date.getMonthName() + ' ' + exam_date.getFullYear()
                    list.append(`<li class="list-group-item">
                                 <div class="row row-cols-6">
                                     <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${exam.subject_name}</p></div>
                                     <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${exam_date}</p></div>
                                     <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${exam.cath}</p></div>
                                     <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${exam.fio}</p></div>
                                     <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${exam.students_list}</p></div>
                                     <select class="select-mark" id="${cath_number}_${exam.subject_id}_${exam.students_list.replaceAll(' ', '_')}">
                                    </select>
                                 </div>
                             </li>`)

                    select_mark = $(`#${cath_number}_${exam.subject_id}_${exam.students_list.replaceAll(' ', '_')}`)
                    for (m in mark){
                        let attr = ""
                        if (m == exam.marks_list){
                            attr = "selected"
                        }
                        select_mark.append(`<option ${attr} val="${m}">${mark[m]}</option>`)
                    }
                    select_mark.on('change', function() {
                        parts = this.id.split('_')
                        mark_value = $(this).find(":selected").index().toString()
                        student_fio = ""
                        parts.forEach((part)=>{
                            if (parts.indexOf(part)>1){
                                student_fio = student_fio + ' ' + part
                            }
                        })
                        student_fio = student_fio.trim()
                        subj_id = parts[1]
                        setMark(mark_value, student_fio, subj_id)
                    });
                })
            }
            else{ list.append(`Произошла ошибка`) }

        })
    }

    function showGroupList(group_id, subject_id) {
        get_statements = getGroupStatements(group_id, subject_id)
        get_statements.then(()=>{
            list = $("#info")
            list.html("")
            subject_title_label = $(".subject_title").find(".value")
            fio_lecturer_label = $(".fio_lecturer").find(".value")
            date_label = $(".date").find(".value")
            cath_number_label = $(".cath_number").find(".value")
            json_statements = get_statements.responseJSON
            if (json_statements.length>0){

                cath_number = json_statements[0].cath
                exam_date = new Date(json_statements[0].date)
                exam_date = exam_date.getDate() + ' ' + exam_date.getMonthName() + ' ' + exam_date.getFullYear()
                fio = json_statements[0].fio
                title = json_statements[0].subject_name
                subject_title_label.html(title)
                fio_lecturer_label.html(fio)
                date_label.html(exam_date)
                cath_number_label.html(cath_number)

                json_statements.forEach((statement)=>{
                    list.append(`<li class="list-group-item">
                                 <div class="row row-cols-2">
                                     <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${statement.students_list}</p></div>
                                     <select class="select-mark" id="${cath_number}_${statement.students_list.replaceAll(' ', '_')}">
                                    </select>
                                 </div>
                             </li>`)

                    select_mark = $(`#${cath_number}_${statement.students_list.replaceAll(' ', '_')}`)
                    for (m in mark){
                        let attr = ""
                        if (m == mark[statement.marks_list]){
                                attr = "selected"
                        }
                        select_mark.append(`<option ${attr} val="${m}">${mark[m]}</option>`)
                    }
                    select_mark.on('change', function() {
                        mark_value = $(this).find(":selected").val()
                        student_fio = this.id.split('_')[1]+' '+this.id.split('_')[2]+' '+this.id.split('_')[3]
                        subj_id = swch_2.val()
                        setMark(mark_value, student_fio, subj_id)
                    });
                })
            }
            else{
                list.append(`Выбранная группа не сдает данный предмет`)
            }
        })
    }

    function setMark(mark_value, student_fio, subj_id) {
        $.ajax({
            dataType: "json",
            type: "post",
            url: "/internal/api/setMark",
            data: JSON.stringify( {
                "fio": student_fio,
                "subject": subj_id,
                "value": mark_value
            }),
            success: function (response) {
                console.log(response)
            },
            error: function(error) {
                console.log(error)
            }
        })
    }

    function getGroupStatements(group_id, subject_id) {
        return $.ajax({
            dataType: "json",
            type: "get",
            url: "/internal/api/get_statements",
            data: {
                "group" : group_id,
                "subject": subject_id,
            },
            success: function (response) {
                return response
            },
            error: function(error) {
                console.log(error)
            }
        })
    }

    function getGroups() {
        return $.getJSON("/internal/api/get_groups", function (data) {
            return data;
        }).fail(function (error) {
            console.log(error)
        });
    }

    function getSubjects() {
        return $.getJSON("/internal/api/get_subjects", function (data) {
            return data;
        }).fail(function (error) {
            console.log(error)
        })
    }

    function getStudents() {
        return $.getJSON("/internal/api/get_students", function (data) {
            return data;
        }).fail(function (error) {
            console.log(error)
            return null
        })
    }

    function getStudentExams(student_fio){
        return $.ajax({
            dataType: "json",
            type: "post",
            url: "/internal/api/get_statement_student",
            data: JSON.stringify( {student_fio}),
            success: function (response) {
                return response
            },
            error: function(error) {
                console.log(error)
            }
        })
    }
})