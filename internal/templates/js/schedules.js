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
    showDefaultSchedules();

    $('#students').click(function(e) {
        e.preventDefault();
        showStudents()
    })

    $('#groups').click(function(e) {
         e.preventDefault();
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

    function showByGroups(schedules, groupID) {
        let schGroups = schedules
        if (arguments.length == 2){
            schGroups = schedules.filter(function (schedule) {
                    return schedule['group_id'] === groupID;
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
                                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${schGroup['subject_id']}</p></div>
                                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${schGroup['group_id']}</p></div>
                                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${schGroup['cabinet']}</p></div>
                                    <div class="col d-flex align-items-center justify-content-center"><p class="m-0">${dateStr}</p></div>
                                </div>
                            </li>`)
        });
    }

    function getSchedules(){
        return $.getJSON("/internal/api/get_schedules", function(data){
            return data;
        }).fail(function () {
            console.log(error);
            return null;
        });
    }

   function showDefaultSchedules() {
        let sch = getSchedules();
        sch.then(()=>{
            resp = sch.responseJSON;
            showByGroups(resp);
        });
   }


});