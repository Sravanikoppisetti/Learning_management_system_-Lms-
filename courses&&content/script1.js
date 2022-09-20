function coursecontent(args){
    localStorage.setItem("selectedcourse",args);
    location.href="./version1.html";
  }
  
  console.log("xxx",localStorage.getItem("selectedcourse"));
  var coursename=localStorage.getItem("selectedcourse")
  
  let sidebar= document.getElementById("mySidenav")
  let open= document.getElementById("openarrow")
  let close= document.getElementById("closecircle")
  
  function myFunction() {
    document.getElementById("mySidenav").style.width = "30%";
    document.getElementById("mySidenav").style.transition="0s";
    document.getElementById("main").style.marginLeft ="30%";
    document.getElementById("main").style.transition="0s";
    document.getElementById("openarrow").style.visibility="hidden";
  }
  
  close.onclick=function closeNav() {
    document.getElementById("mySidenav").style.width =  "0";
    document.getElementById("mySidenav").style.transition="0.5s";
    document.getElementById("main").style.marginLeft=  "0";
    document.getElementById("main").style.transition="0.5s";
    document.getElementById("openarrow").style.visibility="visible";
  }
  
  open.onclick=function openNav() {
    document.getElementById("mySidenav").style.width = "30%";
    document.getElementById("mySidenav").style.transition="0.5s";
    document.getElementById("main").style.marginLeft ="30%";
    document.getElementById("main").style.transition="0.5s";
    document.getElementById("openarrow").style.visibility="hidden";
  }
  
  
  
  fetch("./JSONFILES/activities (1).json")
  .then(function (response) {
      return response.json();
  })
  .then(function (content_data) {
    displaycontent(content_data,coursename);
   
  })
  
  function displaycontent(content_data,coursename) {
    let acc_final= document.getElementById('accordionPanelsStayOpenExample');
    var acc_item= document.createElement("div");
    acc_item.id="new";
    acc_item.className="accordion-item";
    
    // acc_item.innerHTML+= 
    //     `<div id="coursename"  style="background-color: #A3DBDB; padding: 15px;"><strong> Welcome to
    //     ${coursename}</strong>
    //     </div>`
    console.log("course",coursename,content_data);
    for (key in content_data) {
        var module =content_data[key];
        var x= module[coursename];
        num_of_modules=module[coursename][Object.keys(x)];
        list_modules=Object.keys(num_of_modules);
        for (var j = 0; j < list_modules.length; j++) {
            y=list_modules[j]
            kk= num_of_modules[y];     
            console.log("lessonslen",kk.length);
            console.log("j",j);

            acc_item.innerHTML+= `<p class="accordion-header" id="panelsStayOpen-headingOne"> 
            <button id="modulename" class="accordion-button" style="background-color: #EAF6F6"  type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              <strong> ${list_modules[j]}</strong>
            </button>
           </p> `
            var acc_body= document.createElement("div");
            acc_body.className="accordion-body";
            acc_body.id=j;
              
        
        for (var i = 0; i < kk.length; i++) {

            acc_body.innerHTML+=
                    `
                    <li><div class="node grey"></div><p style="background-color:E2F8FF"; id="${i}">${kk[i]["Units"]}</p></li> 
                    `;
    
                    
            if (i< ( kk.length-1)){
                acc_body.innerHTML+=`<li><div class="divider grey"></div></li> 
                ` ; 
            }
    
            if (i==( kk.length-1)) {
                acc_body.innerHTML+=`
                <li><div></div><p></p><br></li>`;
            }
        
               
        
   
  
          // lesson content 
  
          var carry =kk[i]["Units"];
          var acctive=kk[i]["Activities"];
          var mainn=document.getElementById('main');
          if (carry=="MCQ"){
            var divv= document.createElement("div");
            divv.innerHTML+=`
            <h3><strong>Choose the correct answers</strong></h3><br>`
            var questions_list= (acctive["MCQ"]["activity_json"][0]["questions"]);
            
            for(var m = 0; m < questions_list.length; m++){
            divv.innerHTML+= `<ul class="quiz">    
                <h6> ${(questions_list[m]["question_id"])}<strong>.</strong> ${(questions_list[m]["questionText"][0]["text"])}</h6>
              `
              var options_list=(questions_list[m], questions_list[m]["options"]);
              for (var n = 0; n < options_list.length; n++){
                  console.log("qq",questions_list[m], questions_list[m]["questionText"][0]["text"])
                  console.log("opp",options_list[n]["option"]);
                  console.log("opp",options_list[n]["correct"])
  
                      divv.innerHTML+=
                      `   <ul class="choices">
                            <li><label><input type="radio" name="question0" style="padding-left :;"value="A"><span>${options_list[n]["option"]}</span></label></li>
                          </ul>`
              }    
            divv.innerHTML+=
                          `
                          <button type="button" class="btn btn btn" style="margin-bottom: 2%; background:rgb(29, 138, 138);"> Check Answer</button>
                          </div>`
                      
            }
            mainn.appendChild(divv);
          }
              
          else if ((carry=="Submission") && ((acctive[0]["activity_type"]=="assessment"))){
                console.log("car2sub", (acctive[0]["activity_json"])[0]["text"]);
                console.log("car2resub", (acctive[0]["activity_json"])[0]["text"]);
                document.getElementById('main').innerHTML+=` <div style="display: none;">
                <h3>${(acctive[0]["activity_name"])}</h3>
                <p>${(acctive[0]["activity_json"])[0]["text"]}</p>
                </div>`
          }
          else if ((carry== "Re-Submission") && ((acctive[0]["activity_type"]=="assessment"))){
            console.log("car2resub", (acctive[0]["activity_json"])[0]["text"]);
            document.getElementById('main').innerHTML+=` <div style="display: none;">
            <h3>${(acctive[0]["activity_name"])}</h3>
            <p>${(acctive[0]["activity_json"])[0]["text"]}</p>
            </div>`
          }
          else {
            console.log("car3", acctive,acctive.length);
              if (acctive[0]["activity_type"]=="video"){
                console.log("car33",acctive[0]["activity_path"]);
                mainn.innerHTML+=`
                <div style="display: none;">
                  <h3 style="color:green;">${kk[0]["Units"]}</h3>   
                  <center>           
                  <video width="400" height="200" controls src="${acctive[0]["activity_path"]}"></video>
                  </center>
                  </div>`
  
              }
              if (acctive[0]["activity_type"]=="notes"){
                console.log("car33",acctive[0]["desc"]);
                document.getElementById('main').innerHTML+=` <div style="display: none;">
                <p>${"car34",acctive[0]["desc"]}</p>
                </div>`
              }
    }
  }
  acc_item.appendChild(acc_body);
  acc_final.append(acc_item);
  }
  }
  }
  
  