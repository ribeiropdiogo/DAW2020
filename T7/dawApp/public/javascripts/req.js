function check() {
    for(i=1;i<=8;i++){
        var c = document.getElementById("tpc"+i);
        if (c.value == 1)
            c.checked = true;
    }
}

function checked(i) {
    if (document.getElementById('tpc'+i).checked) {
        return 1;
    } else {
        return 0;
    }
}

function update(){
    var data = {};
    data.number = $("input[name=number]").val();
    data.name  = $("input[name=name]").val();
    data.git  = $("input[name=git]").val();
    data.tpc = [checked(1),checked(2),checked(3),checked(4),checked(5),checked(6),checked(7),checked(8)];
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
       window.location.href = "/students/"+data.number;
    }

    xhr.open("PUT", '/students/'+data.number, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(json);
}


function deleteStudent(number){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        location.reload(); 
     }
    xhr.open("DELETE", '/students/'+number, true);
    xhr.send();
}
