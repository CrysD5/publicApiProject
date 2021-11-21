function nasaRequest(){
    const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
    const apiKey = "dPt6lCz5HFhwvlQwlB6eQWz2hUJBCJiFCk23jgrO";
    const dateInput = document.querySelector("#datepicker");
    const title = document.querySelector("#title"); 
    const copyright = document.querySelector("#copyright");
    const mediaSection = document.querySelector("#media-section");
    const information = document.querySelector("#description");
    
    const currentDate =new Date().toISOString().slice(0, 10);
    
    
    const imageSection =`<a id="hdimg" href="" target="-blank">
        <div class="image-div">
        <img id="image_of_the_day" src="" alt="image-by-nasa">
        </div></a>
        <p id="hd"> Click the Image to veiw HD version.</p>
        `
    
    const videoSection=`<div class="video-div"> <iframe id="videoLink"></iframe></div>`
    
    let newDate = "&date="+dateInput.value+"&";
    
    
    function fetchData(){
            try{
                fetch(baseUrl+apiKey+newDate)
                .then(response=> response.json())
                .then(json=>{
                    console.log(json);
                    diplaydata(json)
                })
                }catch(error){
                    console.log(error)
                }
        }
        
    function diplaydata(data){
        
        title.innerHTML=data.title;
        
        if(data.hasOwnProperty("copyright")){
            copyright.innerHTML=data.copyright;
        } else{
            copyright.innerHTML=""
        }   
        
        date.innerHTML=data.date;
        dateInput.max=currentDate;
        dateInput.min="1995-06-16";
        
            if(data.media_type==="video"){
                mediaSection.innerHTML=videoSection;
                document.getElementById("videoLink").src=data.url;
               
            }else{
                mediaSection.innerHTML=imageSection;
                document.getElementById("hdimg").href=data.hdurl;
                document.getElementById("image_of_the_day").src=data.url;
            }
        information.innerHTML=data.explanation
    }

    fetchData();
    }
    
    const dateInput = document.querySelector("#datepicker");
    dateInput.addEventListener('change',(e)=>{
        e.preventDefault();
        nasaRequest();
    })
