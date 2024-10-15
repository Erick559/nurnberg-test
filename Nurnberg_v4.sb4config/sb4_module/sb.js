/*
default SB4 customization module. Customization modules are loaded after most of the native modules are already intialized. 
*/
const saveTheStudentDetails = async (firstName, lastName, score) => {
  const studentDetails = {
    first_name: firstName.toLowerCase(),
    last_name: lastName.toLowerCase(),
    score: score
  };

  try {
    const response = await fetch('https://node-smartbuilder.vercel.app/saveStudentDetails',{
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(studentDetails),
    })

    const data = await response.json();
    if(response.ok){
      return data;
    }
  } catch (error) {
    return error;
  }

};


define([], function () {

  SB4API.functions.saveStudentDetails = async function(firstName, lastName, score) {
   saveTheStudentDetails(firstName, lastName, score)
   .then(data => alert(data.message) )
  };

  SB4API.functions.testFullScreen = function(video){
    parent.postMessage('fullscreen', '*');
  }


  SB4API.functions.createPDF = async(hs1,hs2,hs3,hs4,hs5,hs6,hs7,hs8) => {

    const selectedDestinations = [hs1,hs2,hs3,hs4,hs5,hs6,hs7,hs8];
    try {
        const response = await fetch('https://node-smartbuilder.vercel.app/combine-pdfs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checkboxStates: selectedDestinations }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Vision Board.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        alert('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again later.');
    }
  };
  
    /** 
     * default move animation duration
     * /
    // SB4API._CONF._MOVE_TIME=400;

    /** 
     * default layout animation duration 
     * /
    // SB4API._CONF._LAYOUT_TIME=100;

     /**
     * disable show error message. ex: send xapi error message
     * @type {boolean}
     */
    //SB4API.showErrorMessage=false;

  /**
   * LESSON: callback invoked right before the lesson goes active
   */   
    // SB4API.onLoadLesson=function() {
    //     //do something
    // };

   /**
   * LESSON: callback invoked when lesson close block is invoked
   */   
    // SB4API.onExitLesson=function() {
    //     $("body").css("background-color", "#ff0000");
    //    return function () {
    //        $("#exit-placeholder").html("Lesson has closed, please close this window");
    // 		  //let exit-placeholder div in the center of frame div.
     //       var frameDiv = $(".com_smartbuilder_axon_widget_frame").eq(0);
     //       $("#exit-placeholder").position({
     //           my: "center center",
     //           at: "center center",
     //           collision: 'fit',
     //           of: frameDiv
     //       });
     //   }
    // };


    /* FUNCTION: register functions that can be invoked using 
    *  "Advanced->Procedure->Invoke Registered Function" block
    */
    // SB4API.functions.getTimeStamp = function (m) {
    //     var d = new Date();
    //     return d.getTime();
    // };


    /* FUNCTION: a sample of browser hack to detect browser zoom (only works in chrome)
    */
    // SB4API.functions.isBrowserZoomedIn = function () {
    //     var isChrome = navigator.userAgent.indexOf("Chrome") >=0;
    //     return isChrome && Math.round(((window.outerWidth) / window.innerWidth)*100) / 100>=1.02;
    // };
    
    /* EVENT: sample (shell -> lesson): fire global event when mouse moves on the stage
    */
    // $( "#playerstage" ).mousemove(function( event ) {
    //     var msg = "Handler for .mousemove() called at ";
    //     msg += event.pageX + ", " + event.pageY;
    //     //SB4API.getGlobalVariable
    //     SB4API.fireGlobalEvent('onMouseMoveOnStage',[event.pageX , event.pageY]);
    // });

    /**
     * XAPI: change actor before lesson starts.
     */
   // SB4XAPI.tincan.lrs.actor=SB4XAPI.modifyActor({
   //    name:"User A",
   //    mbox:"mailto:usera@smartbuilder.com"
   // });

    /**
     * XAPI: replace xapi actor with SCORM learner info (when running in SCORM 1.2 or 2004 mode)
     */
//     if (SB4API.lms.type > 0) {
//       if (SB4API.SCORM2004 && SB4XAPI.tincan) {
//           let uname = SB4API.SCORM2004.getStudentName();
//           let uid = SB4API.SCORM2004.getStudentID();
//           if (uid != undefined && uid != "") {
//               SB4XAPI.tincan.lrs.actor = SB4XAPI.modifyActor({
//                   name: uname,
//                   mbox: uid
//               });
//           }
//       }
//   }

/**
 *  XAPI/SCORM: disable lesson  farewell handshake
 */
    // if (_.isObject(SB4API.lms) && SB4API.lms.type > 0) {
    //   unloadPage=function() {};
    // }


    /**
     * XAPI: registered  getLessonActivityId function
     */
    // SB4API.functions.getLessonActivityId = function () {
    //     if(SB4XAPI){
    //         return SB4XAPI.getLessonActivity()["id"];
    //     }else{
    //         return "";
    //     }
    // };
    
   /**
     * registered sendCustomAJAXRequest function
     * @param url
     * @param data
     * @param sync
     * @returns {*|{}}
     */
    // SB4API.functions.sendCustomAJAXRequest = function (url, num1, num2,sync) {
    //     var  method = "POST";
    //     var contentType = "application/json;charset=UTF-8";
    //     var timeout=0;
    //     var headers = {
    //         "req_source": "sb4_lesson"
    //     };

    //     alert(num1)

    //     if(!_.isBoolean(sync)){
    //         sync=false;
    //     }
    //     if(_.isObject(num1)){
    //         data = JSON.stringify(num1);
    //     }
    //     var ajaxResult = $.Deferred();
    //     $.ajax({
    //         url: 'localhost:3000/calculate',
    //         crossDomain: true,
    //         contentType: contentType,
    //         timeout: timeout,
    //         data: num1,
    //         method: method,
    //         xhrFields: {
    //             withCredentials: false,
    //         },
    //         headers: headers
    
    //     }).done(function (num1, textStatus, xhr) {
    //         ajaxResult.resolve(num1);
    //     }).fail(function (jqXHR, textStatus, errorThrown) {
    //         ajaxResult.resolve();
    //     });
    
    //     if (sync) {
    //         alert(ajaxResult)
    //         return ajaxResult;
    //     }
    // };
});
