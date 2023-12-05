//The URIs of the REST endpoint
IUPS = "";
RAI = "";

BLOB_ACCOUNT = "";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
 

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){

 
}

