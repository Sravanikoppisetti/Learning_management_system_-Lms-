function coursecontent(args){
    localStorage.setItem("selectedcourse",args);
    location.href="./mentor_submission.html";
  }
  
  console.log("xxx",localStorage.getItem("selectedcourse"));
  var course=localStorage.getItem("selectedcourse");
  
  fetch("./JSONFILES/data (1).json")
  .then(function (response) {
      return response.json();
  })
  .then(function (content_data) {
    displayData(content_data,course);
   
  })
  function display(){
    fetchdata().then(response=>{
    displayData(response)
  })
}
    function displayData(content_data, course)
    {
      console.log(content_data,course);
    let card = document.getElementById('submissionCards');   
    for(let i=0; i<content_data.length; i++){   
      if (content_data[i].coursename==course)
      { 
        console.log("AI")
        card.innerHTML=`
        <div class="card">
        <img src="${content_data[i].image}" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="course-title"><b>Course:</b>&nbsp;${content_data[i].coursename}</p>
          <p class="course-status"><b>Course Status:</b> &nbsp; Ongoing</p>
          <a href="#" class=btn>Evaluations<span class="fas fa-caret-right"></span></a>
          <a href="content.html" class=btn> Course Content</a> 
        </div>
      </div>`
      }
    }
}

  
