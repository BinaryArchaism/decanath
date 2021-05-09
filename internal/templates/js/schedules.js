//функция показа всех студентов, групп, преподов, кафедр
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
    var json_groups
    var json_subjects
    json_subjects = getSubjects()
    json_subjects.then(()=> {
        prepareGroupsSelect();
        showDefaultSchedules();
    })

    $('#by_groups').click(function(e) {
        e.preventDefault();
        json_subjects = getSubjects()
        json_subjects.then(()=>{
            prepareGroupsSelect();
            showDefaultSchedules();
        });
    })

    $('#by_lecturers').click(function(e) {
         e.preventDefault();
        showLecturers()
    })

    $('#by_cathedras').click(function (e) {
        e.preventDefault();
        showCathedras()
    })

    function showByGroups(schedules, groupID) {
        let schGroups = schedules
        if (arguments.length == 2 && groupID != ""){
            schGroups = schedules.filter(function (schedule) {
                    return schedule['group_id'] == groupID;
                }
            );
        }
        var schdls = $('#schdls')
        schdls.html('<li class="list-group-item">\n' +
            '                <div class="row row-cols-4">\n' +
            '                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">Название предмета</p></div>\n' +
            '                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">Номер группы</p></div>\n' +
            '                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">Кабинет</p></div>\n' +
            '                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">Дата</p></div>\n' +
            '                </div>\n' +
            '            </li>')
        var list_schls = $('#info')
        list_schls.html("")
        schGroups.forEach(schGroup=>{
            let schDate = new Date(schGroup.date)
            dateStr = schDate.getDay() + ' ' + schDate.getMonthName() + ' ' + schDate.getFullYear()
            list_schls.append(`<li class="list-group-item">
                                <div class="row row-cols-4">
                                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${subjectIDToNumber(schGroup.subject_id)}</p></div>
                                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${groupIDToNumber(schGroup.group_id)}</p></div>
                                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${schGroup.cabinet}</p></div>
                                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${dateStr}</p></div>
                                </div>
                            </li>`)
        });
    }

    function groupIDToNumber(ID) {
        group_by_id = json_groups.find(function (group) {
            return group.id == ID;
        });
        return group_by_id.number
    }

    function subjectIDToNumber(ID) {
        subjects = json_subjects.responseJSON
        subject_by_id = subjects.find(function (subject) {
            return subject.id == ID
        });
        return subject_by_id.title
    }

    function prepareGroupsSelect() {
        let groups = getGroups()
        groups.then(()=>{
            json_groups = groups.responseJSON
            var switcher = $('#switcher')
            switcher.html('')
            switcher.append('<select id="swch" class="form-select" aria-label="group select"></select>')
            let selector = $("#swch")
            selector.append(`<option value="">Все группы</option>`)
            selector.on('change', function() {
                showByGroups(resp, this.value)
            });
            json_groups.forEach((group)=>{
                selector.append(`<option value=${group.id}>${group.number}</option>`)
            })
        });
    }

    function getGroups() {
        return $.getJSON("/internal/api/get_groups", function (data) {
            return data;
        }).fail(function (error) {
            console.log(error)
        });
    }

    function getSchedules(){
        return $.getJSON("/internal/api/get_schedules", function(data){
            return data;
        }).fail(function (error) {
            console.log(error);
            return null;
        });
    }

    function getSubjects() {
        return $.getJSON("/internal/api/get_subjects", function (data) {
            return data;
        }).fail(function (error) {
            console.log(error)
        })
    }

   function showDefaultSchedules() {
        let sch = getSchedules();
        sch.then(()=>{
            resp = sch.responseJSON;
            showByGroups(resp);
        });
   }


});