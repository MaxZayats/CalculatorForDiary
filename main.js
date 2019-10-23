style=
`
<style>
#mydiv {
    position: absolute;
    z-index: 9;
    text-align: center;
}
#mydivheader {
    padding: 10px;
    cursor: move;
    z-index: 10;
    background-color: #222226!important;
    color: #CAD4D6;
}

.table_dark {
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
    font-size: 14px;
    text-align: left;
    border-collapse: collapse;
    background: #222226!important;
    cursor: default;
 
  }
  .table_dark th {
    color: #CAD4D6;
    border-bottom: 1px solid #999!important;
    padding: 12px 17px;
  }
  .table_dark td {
    color: #CAD4D6;
    border-bottom: 1px solid #9990!important;;
    border-right:1px solid #999!important;;
    padding: 7px 17px;
    transition: .2s;
  }
  .table_dark tr:last-child td {
    border-bottom: none;
  }
  .table_dark td:last-child {
    border-right: none;
  }
  .table_dark tr:hover td {
    transition: .2s;
    background: #333336!important;
  }
#first{
    width: 80px;
}  
#second{
    width: 50px;
}
#third{
}
.input{
    background-color:rgba(157, 22, 181, 0);
    border-color: rgba(157, 22, 181, 0);
    color: #CAD4D6;
    width: 100%;
    font-size: 100%;
    border:0;
    font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
}
#restart{
  cursor:pointer;
  transition: .5s;
  z-index: 100;
  position: absolute;
  left: 85%;
  top: 1px;
  font-size: 50px;
  color: #cad4d6;
}
#restart:hover{
  color: white;
  animation-delay: 0.1s;
  transition: .5s;
}
#add_extra{
  cursor:pointer;
  transition: .5s;
  z-index: 100;
  position: absolute;
  left: 74%;
  top: 1px;
  font-size: 50px;
  color: #cad4d6;
}
#add_extra:hover{
  transition: .5s;
  color: white;
}
.Select{
  background-color: rgba(157, 22, 181, 0);
  border-color: rgba(157, 22, 181, 0);
  color: #CAD4D6;
  font-size: 15px;
  left: -5%;  
  padding: 0;
  transition: .5s;
}
.Option{
  background-color: #222226!important; 
}

#CloseTable{
  cursor: pointer;
  transition: .5s;
  z-index: 100;
  position: absolute;
  left: 6px;
  top: 0px;
  font-size: 23px;
  color: #cad4d6;
}
#CloseTable:hover{
  transition: .3s;
  color: red;
}
.DelExtra{
  color: dimgrey;
  transition: .3s;
  width: 60px;
}
.DelExtra:hover{
  color:red;
  transition: .3s;
}
</style>
`

var body = String.raw`
<div id="mydiv" class="ui-widget-content" style="top: 859%;left: 2%;">
    <div id="mydivheader">
        <h1>Журнал</h1>
    </div>
    <div id='restart'>↻</div>
    <div id='add_extra'>+</div>
    <div id="CloseTable">✖</div>
  <table id='maintable' class="table_dark" style="width: 480px;">
        <tr id='names'>
          <th id='first'>Предмет</th>
          <th id='second'>Ср.Балл</th>
          <th id='third'>Оценки</th>
          </tr>  
        <tr class='lessons'>
          
          </tr>
        </table>
</div>
<script>
//перемещение элемента mydiv
dragElement(document.getElementById(("mydiv")));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//конец блока
//-------------------------------


//size
$( function() {
    $( ".table_dark" ).resizable();
  } );
//------------


//основной код


les=['']; // все предеметы 
lessons=[ // для заполнения таблицы
  ['',[],[]]// структура ['предмет',[[оценка,дата]], србал,]
]; 
function fill_Les(){
  les=[''];
  let all=$('.lesson span');
  let count=all.length;
  let YorNo=0;//0-no(add) 1-yes(no add)
  for (let i = 0; i < count; i++) {
    YorNo=0;
    all[i]=all[i].innerHTML;
    all[i]=all[i].replace(/ /g,'').replace(/\n/g,'').replace(all[i][0],'').replace(all[i][1],'');
    for (let j = 0; j < les.length; j++) {
      for (let k = 0; k < lessons.length; k++) {
        if(all[i]==les[j]||all[i]==lessons[k][0]){
          YorNo=1;
          break
        }
      }  
    }
    if(YorNo==0){
      les.push(all[i]);
    }
  }
};

var ids=1000;//уникальное id для добавления новых предметов через селект
$('#restart').click(function(){
  les=[''];
  ids=1000;
  lessons=[
    ['',[],[]]// структура ['предмет',оценки, дата, србал]
  ];
  for (let i = 0; i < $("strong").length; i++) { // 
    val=$("strong")[i]; //select [i]strong
    selector=$(val).parent().parent().parent()[0];
    mark=val.innerHTML;
    lesson=$('span',selector)[0].innerHTML.replace(/ /g,'').replace(/\n/g,'');
    lesson=lesson.replace(lesson[0],'').replace(lesson[1],'');
    date=$(val).parent().parent().parent().parent().parent()[0].id.replace('db_table_','');
    for (let j = 0; j < lessons.length; j++) {
      if (lessons[j][0]==lesson && mark!==''){
        lessons[j][1].push([mark,date]);
        break;
      }  
      else if (j==lessons.length-1 && mark!==''){
          lessons.push([lesson,[[mark,date]],[]]);
          break;
      }
    };
  };
  $('.input').keyup(function(){ // обновление среднего балла
    
    value=String(calcAverange($(this).val()));
    id=String($(this).attr('id'));
    console.log(value,' ',id);
    let val=$(this).val()[$(this).val().length-1];

    if((!parseInt(val,10)) && (val !== '0') && (val !== ',') && (val !== ' ') && (val !== '/')){
      $(this).val($(this).val().replace(val,''));
      value=String(calcAverange($(this).val()));
      console.log('delete',val);
    }
    document.getElementById(id).innerHTML=value;
    if(!isNaN(calcAvrAvr())){ // общий ср балл
      document.getElementById('Avr').innerHTML=calcAvrAvr();
    }
    
  });
  clearTable();
  calculation(); 
  console.log(lessons); 
  lessons.sort();

  fill_Les();

  show();
  
  $('.input').keyup(function(){ // обновление среднего балла
    
    value=String(calcAverange($(this).val()));
    id=String($(this).attr('id'));
    console.log();
    let val=$(this).val()[$(this).val().length-1];

    if((!parseInt(val,10)) && (val !== '0') && (val !== ',') && (val !== ' ') && (val !== '/')){
      $(this).val($(this).val().replace(val,''));
      value=String(calcAverange($(this).val()));
      console.log('delete',val);
    }
    document.getElementById(id).innerHTML=value;
    if(!isNaN(calcAvrAvr())){ // общий ср балл
      document.getElementById('Avr').innerHTML=calcAvrAvr();
    }
    
  });
});





// структура ['предмет',[[оценки, дата]], србал]
function calculation(){ // для подсчёта начального среднего балла *будет замена*
  for (let i = 0; i < lessons.length; i++) { //в  предметах
    let sum=0;
    let n=0;
    for (let j = 0; j < lessons[i][1].length; j++) { // в оценках
      if (lessons[i][1][j][0].length==3){
        n+=2;
        sum+=parseInt(lessons[i][1][j][0],10);
        sum+=parseInt(lessons[i][1][j][0][2],10);  
      }  
      else if(lessons[i][1][j][0].length==5){
        n+=2;
        sum+=20;
      }
      else if(lessons[i][1][j][0].length==4){
        n+=2
        if(lessons[i][1][j][0][0]=='1'&& lessons[i][1][j][0][1]=='0'){ // if 10/x
          sum+=10;
          sum+=parseInt(lessons[i][1][j][0][3],10);
        }          
        else if(lessons[i][1][j][0][2]=='1' && lessons[i][1][j][0][3]=='0'){
          sum+=10;
          sum+=parseInt(lessons[i][1][j][0][0],10);
        }  
        }
      else{
        n+=1;
        sum+=parseInt(lessons[i][1][j][0],10);
      }
    try{
      lessons[i][2]=(sum/n).toFixed(3);
      
    } 
    catch{
      lessons[i][2]='0.0';
    }
    }  
  }
};  


function calcAverange(str){ // подсчёт среднего балла из получаемой строки (используется для инпута)
  str=str.replace(/ /g,'');
  str1=str.replace(/,/g,'').replace(/\//g,'').replace(/0/g,''); //замена символов для проверки
  for (let k = 0; k < str1.length; k++){
    if(!parseInt(str1[k],10)){
      return NaN
    };
  };
  str=str.split(',');
  let sum=0;
  let n=0;
  let avr=0;
  for (let j = 0; j < str.length; j++) {
    if (str[j].length==3){
      n+=2;
      sum+=parseInt(str[j][0],10);
      sum+=parseInt(str[j][2],10);  
    }  
    else if(str[j].length==5){
      n+=2;
      sum+=20;
    }
    else if(str[j].length==4){
      n+=2
      if(str[j][0]=='1'&& str[j][1]=='0'){ // if 10/x
        sum+=10;
        sum+=parseInt(str[j][3],10);
      }          
      else if(str[j][2]=='1' && str[j][3]=='0'){
        sum+=10;
        sum+=parseInt(str[j][0],10);
      }  
      }
    else{
      n+=1;
      sum+=parseInt(str[j],10);
    }
  try{
    avr=(sum/n).toFixed(3);
    
  } 
  catch{
    return '0.0';
  }
  };
  return avr
};


// структура ['предмет',[[оценки, дата]], србал]
function calcAvrAvr(){ // подсчет всего среднего бала
  let sum=0;
  allPos=$('.AverangeSc');
  for (let i = 0; i < allPos.length; i++) {  //в баллах
    sum+=Math.round(allPos[i].innerHTML);
  };
  return (sum/(allPos.length)).toFixed(3)
};


function show(){ // вывод в таблицу
  for (let i = 1; i < lessons.length; i++) { //в предметах
    lessons[i][1].sort(function(a, b){ // сортировка массива по датам
        var aa = a[1].split('.').reverse().join(),
            bb = b[1].split('.').reverse().join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
    });
    marks=[]; // для оценок
    for (let j = 0; j < lessons[i][1].length; j++){
      marks.push(lessons[i][1][j][0]); // добавление оценкок
    };
    addElement(String(lessons[i][0]),String(lessons[i][2]),String(marks).replace(/,/g,', ')); // вывод в таблицу
  };
  $('#maintable tbody').append('<tr id="Avrs" class="lessons"><td>Общий Ср.Балл</td><td style="font-size:18px" id="Avr">'+calcAvrAvr()+'</td></tr>'); 
  //добавление последней строки с общим баллом
};


function clearTable(){//очищение таблицы (используется для последующего выводы новой инфы)
  $('.lessons').remove();
};


function addElement(a,b,c){ // добавление в таблицу
  $('#maintable tbody').append('<tr class="lessons"><td>'+a+'</td><td style="padding-top: 7px;" class="AverangeSc" id="'+a+'">'+b+'</td><td style="padding-top: 5px;"><input value="'+String(c)+'" type="text" id="'+a+'" class="input"></td></tr>'); 
};
$('#add_extra').click(function(){
  
  let selectIn='';
  for (let i = 1; i < les.length; i++) {
    selectIn+='<option class="Option">'+les[i]+'</option>'
  };
  let select='<select class="Select">'+selectIn+'</select><div class="DelExtra">Удалить</div>';
  
  $('#Avrs').before('<tr class="lessons"><td>'+select+'</td><td style="padding-top: 21px;" class="AverangeSc" id="'+ids+'">NaN</td><td style="padding-top: 19px;" ><input type="text" id="'+ids+'" class="input"></td></tr>');
  ids+=1;
  $('.input').keyup(function(){ // обновление среднего балла
    
    value=String(calcAverange($(this).val()));
    id=String($(this).attr('id'));
    console.log(value,' ',id);
    let val=$(this).val()[$(this).val().length-1];

    if((!parseInt(val,10)) && (val !== '0') && (val !== ',') && (val !== ' ') && (val !== '/')){
      $(this).val($(this).val().replace(val,''));
      value=String(calcAverange($(this).val()));
      console.log('delete',val);
    }
    document.getElementById(id).innerHTML=value;
    if(!isNaN(calcAvrAvr())){ // общий ср балл
      document.getElementById('Avr').innerHTML=calcAvrAvr();
    }
    
  });
  $('.DelExtra').click(function(){
    $(this).parent().parent().remove()
  });
});



$('#CloseTable').click(function(){
  clearTable();
  document.getElementById('mydiv').style="top: 859%;left: 2%;";
  document.getElementById('maintable').style="width: 480px; height: 10px;";
});

</script>
</body>
`

head=`
<head>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">
    <script src="jquery-3.1.0.min.js"></script>
</head>
`

$(function(){  
    $('head').append(head);
    $('html').append(style);
    $('.pp_line_actions__item').append(body);
});
