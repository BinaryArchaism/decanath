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

$(document).ready(function(){
    var json_groups, json_subjects, json_statements
    var switcher1 = $("#switcher-1")
    var swch_1 = $("#swch-1")
    var switcher2 = $("#switcher-2")
    var swch_2 = $("#swch-2")

    $('#by_groups').click(function(e) {
        e.preventDefault()
        showSecondSwitcher()
        prepareGroupSwitchers()
    })
    $('#by_students').click(function(e) {
        e.preventDefault();
        hideSecondSwitcher()
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

    function showGroupList(group_id, subject_id) {
        get_statements = getGroupStatements(group_id, subject_id)
        get_statements.then(()=>{
            list = $("#info")
            subject_title_label = $(".subject_title").find(".value")
            fio_lecturer_label = $(".fio_lecturer").find(".value")
            date_label = $(".date").find(".value")
            cath_number_label = $(".cath_number").find(".value")
            json_statements = get_statements.responseJSON
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
                                     <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${statement.marks_list}</p></div>
                                 </div>
                             </li>`)
            })
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

})