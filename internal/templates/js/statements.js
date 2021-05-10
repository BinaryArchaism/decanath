$(document).ready(function(){
    var json_groups, json_subjects
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