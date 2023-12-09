//The URIs of the REST endpoint
IUPS = "https://prod-10.northeurope.logic.azure.com:443/workflows/e46c0e295ef1478ea162453699d3f550/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CugzizzWIBftHErzvQntVfJU08SS-ihFtJSyWJS8rCw";
RAI = "https://prod-49.northeurope.logic.azure.com:443/workflows/5d6a8f263c2545a6a32b3239ebf17391/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IPfQnmxfqDFCV6NJB15mxre9fzmaiE48vH90DtsI2WA";

BLOB_ACCOUNT = "https://videoshareb009303291.blob.core.windows.net";

RAAURI = "https://prod-51.northeurope.logic.azure.com/workflows/ae575d2d408442188f862d1044b3d015/triggers/manual/paths/invoke/rest/v1/assets/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3n6TeIGC7b0GXo8Afs-siCcHcSmxbV8peRPo2qRUEtg";
CIAURI = "https://prod-04.northeurope.logic.azure.com/workflows/69b893071b2e4357b1ac3a0293916662/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XXAX4jgoQ7bXFUocDwmQsIX2peXrv0OO8ImtIHwusdc";

DIAURI0 = "https://prod-56.northeurope.logic.azure.com/workflows/27e7cd0aa0bb42d4ab6ec2b2651ea166/triggers/manual/paths/invoke/rest/v1/users/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Yz2peWcyBk_Kid7yApOQxhRHtHYVdUXii6StEGl-F_8";
DIAURI1 = "";


//DOCUMENT READY FUNCTION

// Document ready function
$(document).ready(function() {
  // Creator.html
  $("#retAssets").click(function() {
      getAssetList();
  });
//upload videos
  $("#subNewForm").click(function() {
      submitNewAsset();
  });

  //register customer
  $("#subNewForm1").click(function() {
    submitNewAsset1();
});

  // CustomerSignup.html
  $("#retAssets").click(function() {
      window.location.href = 'customer-view.html';
  });

  // CustomerView.html
  $("#retImages").click(function() {
      getImages();
  });

  // CustomerView.html watching videos in customer view
  $("#watchVideosBtn").click(function() {
    viewVideos();
});


  

  // Additional button click handlers can be added here
});

function submitNewAsset() {
  const formData = new FormData();
  formData.append('FileName', $('#FileName').val());
  formData.append('userID', $('#userID').val());
  formData.append('userName', $('#userName').val());
  formData.append('Title', $('#Title').val());
  formData.append('Publisher', $('#Publisher').val());
  formData.append('Producer', $('#Producer').val());
  formData.append('Genre', $('#Genre').val());
  formData.append('Agerating', $('#Agerating').val());
  formData.append('File', $("#UpFile")[0].files[0]);

  $.ajax({
      url: IUPS,
      data: formData,
      cache: false,
      enctype: 'multipart/form-data',
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data) {
          alert('Video uploaded successfully: ' + data);
          getAssetList();
      },
      error: function(error) {
          console.error('Error uploading video:', error);
      }
  });
}

//function to register customer
function submitNewAsset1() {
  //Construct JSON Object for new item
  var subObj = {
    Cost: $('#Cost').val(),
    Email: $('#Email').val(),
    Username: $('#Username').val(),
    UPassword: $('#UPassword').val(),
    Address1: $('#Address1').val(),
    }
    //Convert to a JSON String
    subObj = JSON.stringify(subObj);
    //Post the JSON string to the endpoint, note the need to set the content type header
    $.post({
    url: CIAURI,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
    }).done(function (response) {
    // The registration was successful, show a confirmation message
    alert('Registered successfully');
    getAssetList();
    });
    }

function getAssetList() {
  $('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
  $.getJSON(RAAURI, function(data) {
      var items = [];
      $.each(data, function(key, val) {
          items.push("Cost: " + val["Cost"] + "<br/>");
          items.push("Email: " + val["Email"] + "<br/>");
          items.push("Username: " + val["Username"] + "<br/>");
          items.push("UPassword: " + val["UPassword"] + "<br/>");
          items.push("Address1: " + val["Address1"] + "<br/>");
      });
      $('#AssetList').empty();
      $("<ul/>", {
          "class": "my-new-list",
          html: items.join("")
      }).appendTo("#AssetList");
  });
}

function getImages() {
  $('#ImageList').html('<span class="sr-only"> &nbsp;</span>');
  $.getJSON(RAI, function(data) {
      var items = [];
      $.each(data, function(key, val) {
          items.push("<hr />");
          items.push("<video width='426' height='240' controls autoplay>");
          items.push('<source src="' + BLOB_ACCOUNT + val["filepath"] + '" type="video/mp4">');
          items.push('Your browser does not support the video tag</video>');
          items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")<br />");
          items.push("Title: " + val["Title"] + "<br />");
          items.push("Publisher: " + val["Publisher"] + "<br />");
          items.push("Producer: " + val["Producer"] + "<br />");
          items.push("Genre: " + val["Genre"] + "<br />");
          items.push("Agerating: " + val["Agerating"] + "<br />");
          items.push("<hr />");
      });
      
      $("<ul/>", {
          "class": "my-new-list",
          html: items.join("")
      }).appendTo("#ImageList");
  });
}


