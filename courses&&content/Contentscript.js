function coursecontent(args){
    localStorage.setItem("selectedcourse",args);
    location.href="../content.html";
  }
  
  console.log("xxx",localStorage.getItem("selectedcourse"));
  var coursename=localStorage.getItem("selectedcourse")
  

// side navbar
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}



fetch("./JSONFILES/activities (1).json")
.then(function (response) {
    return response.json();
})
.then(function (content_data) {
  displaycontent(content_data,coursename);

})


  
  function displaycontent(content_data,coursename) {
    let dropdown_buttons= document.getElementById("mySidenav");
    console.log("course",coursename,content_data);
    for (key in content_data) {
        var courses_list =content_data[key];
        var clicked_course= courses_list[coursename];
        num_of_modules=courses_list[coursename][Object.keys(clicked_course)];
        list_modules=Object.keys(num_of_modules);
        

        // below for loop  generates dropdowns in sidenavbar
        for (var j = 0; j < list_modules.length; j++) {
            y=list_modules[j]
            units_list= num_of_modules[y];     
            console.log("lessonslen",units_list);
            // console.log("j",j);
            var dropdown_items= document.createElement("div");
            dropdown_items.id=j;
            dropdown_items.className="dropdown-content";
            dropdown_items.style.display="none";
            var id_dropdown_btn ="dropdown-btn"+j;
            dropdown_buttons.innerHTML+= `<button class="dropdown-btn" id=${id_dropdown_btn} onclick="getid(${j})" >${list_modules[j]}
            <i class="fa fa-caret-down"></i>
            </button>`;
           

            // below for loop used to generate dropdowns items 
            for (var i = 0; i < units_list.length; i++) {
               
              var lesson_items= document.createElement("div");
              lesson_items.id=j+"content"+i;
              lesson_items.className="contentdis";
              lesson_items.style.display="none";
              

                dropdown_items.innerHTML+=`<a  id="content${i}" class=${j} onclick="getunitid(this)" href="#"><h6>${units_list[i]["Units"]}</h6></a>`
                        
            dropdown_buttons.appendChild(dropdown_items);

            


          // lesson content display in main right palate
            
          var module_ =units_list[i]["Units"];
          var acctivitty=units_list[i]["Activities"];
          var mainn=document.getElementById('content_display_div');
          // console.log("iii",j,i,module_);


          if (module_=="MCQ"){
            var questions_list= (acctivitty["MCQ"]["activity_json"][0]["questions"]);
            var Title=(acctivitty["MCQ"]["activity_json"][0]["title"]);
            lesson_items.innerHTML+=`<h3 style="text-align: center;"><strong>${Title}</strong></h3>`;

            // Below for loop is to GET mcqs questions
            for(var m = 0; m < questions_list.length; m++){
              var ques_optdiv=document.createElement('div')
              ques_optdiv.id =j+"module_ques"+m;
              var options_list_div=document.createElement("div");
              options_list_div.id=j+"module_optionslist"+m;;
              ques_optdiv.innerHTML+= `<div id="${j}modulequestion${m}" style="font-size: 20px; font-weight: 200; margin: 1%; margin-top:3%;">
              <span >${(questions_list[m]["question_id"])}<strong>.</strong>${(questions_list[m]["questionText"][0]["text"])}</span></div> 
              `

              // Below for loop is to GET mcqs options for each question
              var options_list=(questions_list[m], questions_list[m]["options"]);
              
              for (var n = 0; n < options_list.length; n++){
                var uniq_id=j+"module_ques"+m+"opt"+n;
                var i_tag_id=j+"module_ques"+m+"opt"+n+"icontag";
                
              
                if ((options_list[n]["correct"])==true){

                  options_list_div.innerHTML+=
                      `   
                      <div class="correct" id="${uniq_id}" style="border: 2px solid #84c5fe; border-radius: 12px; padding: 5px; background-color:aliceblue; width: 50%; margin: 1%;" onclick="view_mcq_answ(this)">
                          <span style="padding:2%;">${options_list[n]["option"]} </span>
                          <i class="fa fa-check-circle" id="${i_tag_id}" style="font-size:24px; color: darkseagreen; float:right; display:none;"></i>
                      </div>`
                }

                      

                else{

                options_list_div.innerHTML+=
                      `   
                      <div  class="wrong" id="${uniq_id}"style="border: 2px solid #84c5fe; border-radius: 12px; padding: 5px; background-color:aliceblue; width: 50%; margin: 1%;"onclick="view_mcq_answ(this)">
                          <span style="padding:2%;">${options_list[n]["option"]} </span>
                          <i class="fa fa-times-circle" id=${i_tag_id} style="font-size:24px; color:red;float:right; display: none;"></i>
                      </div>`
                }
                  
                ques_optdiv.appendChild(options_list_div);       
              }    
              lesson_items.appendChild(ques_optdiv);
              mainn.appendChild(lesson_items);
            }
          }
          
              
          else if ((module_=="Submission")){
            lesson_items.innerHTML+=`
            <button type="button" class="btn btn btn" style="margin-bottom: 5%; background:#1fae51; color: white;"> Inprogress</button>
            <button type="button" class="btn btn btn" style="margin-bottom: 5%; margin-left: 3%; background: #7a8793; color: white;"> Submitted</button>
            <button type="button" class="btn btn btn" style="margin-bottom: 5%; margin-left: 3%; background:#7a8793; color: white;"> Completed</button>
                          </div>`
                lesson_items.innerHTML+=` <div >
                <h3>${(acctivitty[0]["activity_name"])}</h3>
                <p>${(acctivitty[0]["activity_json"])[0]["text"]}</p>
                </div>
                <form>
                  <div class="form-group" id="for_students">
                    <label for="submissionlink">Submit document below...</label>
                    <textarea class="form-control" rows="1" id="submissionlink" name="text" required></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary"style="margin-top:1%; margin:2% ;float:right;">Submit</button>
                </form>
                <br>
                <br>
                <br>
                <form class="form-group" name="For_mentors" >
                      Score: <input id="Score" type="number" name="Score" required> 
                      <br><br>
                      <label for="Feedback">Feedback:</label>
                      <textarea class="form-control" rows="2" id="Feedback" name="text" required></textarea>
                    <button type="submit" class="btn btn-primary" style="margin:2%;float:right;">Update Status</button>
                </form>`

                mainn.appendChild(lesson_items);
          }
        
        
        
          else if ((module_== "Re-Submission")){
            lesson_items.innerHTML+=`<div>
            <button type="button" class="btn btn btn" style="margin-bottom: 5%; background:#1fae51; color: white;"> Inprogress</button>
            <button type="button" class="btn btn btn" style="margin-bottom: 5%; margin-left: 3%; background: #7a8793; color: white;"> Re-Submitted</button>
            <button type="button" class="btn btn btn" style="margin-bottom: 5%; margin-left: 3%; background:#7a8793; color: white;"> Completed</button>
                          </div>`
            lesson_items.innerHTML+=` <div>
            <h3>${(acctivitty[0]["activity_name"])}</h3>
            <p>${(acctivitty[0]["activity_json"])[0]["text"]}</p>
            
            <form>
              <div class="form-group" id="for_students">
                <label for="submissionlink">Submit document below...</label>
                <textarea class="form-control" rows="1" id="submissionlink" name="text" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary"style="margin-top:1%; margin:2% ;float:right;">Submit</button>
            </form>
            <br>
            <br>
            <br>
            <form class="form-group" name="For_mentors" >
                  Score: <input id="Re-Score" type="number" name="Score" required> 
                  <br><br>
                  <label for="Feedback">Feedback:</label>
                  <textarea class="form-control" rows="2" id="Feedback" name="text" required></textarea>
                <button type="submit" class="btn btn-primary" style="margin:2%;float:right;">Update Status</button>
            </form>   
            `

            mainn.appendChild(lesson_items);
          }

          else{
            var vediotextcontent=document.createElement('div');
            for (var vn=0; vn< acctivitty.length; vn++){
              if (acctivitty[vn]["activity_type"]=="video"){
                var url_link=acctivitty[vn]["activity_path"];
                var link_url=url_link.replace("https://www.youtube.com/watch?v=", "//www.youtube.com/embed/");
                vediotextcontent.innerHTML+=`
                <div style="padding-bottom:3%">
                  <h3 style="padding-bottom:3%"; ><strong>${units_list[vn]["Units"]}</strong></h3>   
                  <center>          
                  <iframe width="420" height="345" src="${link_url}"></iframe>
                  </center>
                </div>`
              }
              
              if (acctivitty[vn]["activity_type"]=="notes"){
                vediotextcontent.innerHTML+=` <div>
                <p>${"car34",acctivitty[vn]["desc"]}</p>
                </div>`
              
              }
            }
            lesson_items.appendChild(vediotextcontent);
            mainn.appendChild(lesson_items);
        }
    }
}
}
}



// on click event for dropdown toggle
function getid(btn){
      var clicked_dropdown= document.getElementById("dropdown-btn"+btn)
      var dropdownContent = document.getElementById(btn);
      if (dropdownContent.style.display == "none") {
        dropdownContent.style.display ="block";
        clicked_dropdown.style.color="#F2AA4CFF";
      } else {
        dropdownContent.style.display = "none";
        clicked_dropdown.style.color= "#818181";
      }
}

// onclick event  to display content in right palate based on  dropdownitem click
function getunitid(buttn){ 
  document.getElementById("defaultopening").style.display="none";
  // //  0content2===> 0 represents drowpdown number and 2 represents lesson number in that dropdown
  var i_d= buttn.id;
  var cclass= buttn.className;
  var actual_id=cclass+i_d;
  var contenttt=document.getElementById("content_display_div");
  var divshowhide=document.getElementById("content_display_div").childElementCount;
  for ( v=0;v<divshowhide; v++){
    oChild = contenttt.childNodes[v];
    if (oChild.id==actual_id){
      (document.getElementById(oChild.id)).style.display="block";
      } else{
        (document.getElementById(oChild.id)).style.display="none";
      }
    }
}

 
// onclick event to display mcq answers
function view_mcq_answ(selectedoption){
  document.getElementById(selectedoption.id).style.borderColor="green";
  // clicked option status(whether it is correct or wrong need to dispaly it )
  var itag=document.getElementById(selectedoption.id).children[1];
  document.getElementById(itag.id).style.display="block";
  // Suppose if the user clicked wrong answer then to display correct option 
  if ((selectedoption.className)!="correct"){
    maindivid=document.getElementById(selectedoption.id).parentElement;
    var total_opt= document.getElementById(maindivid.id).children.length;
     for (var s=0; s<total_opt;s++){
      optionsdiv=document.getElementById(maindivid.id).children[s];
      if (optionsdiv.className=="correct"){
        var div_i=document.getElementById(optionsdiv.id).children[1];
      document.getElementById(div_i.id).style.display="block";
      }  
  }
}
}
