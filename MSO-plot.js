$(function () {  
	var sdata = [], cdata = [],ldata = [],mdata = [],
	  	log7data = [],log6data = [],
	  	log5data = [],log4data = [],
	  	log3data = [],log2data = [],
	  	log1data = [],log0data = [],
		totalPoints = 1000, j=0, k=0, l=0,m=0,
		laStart=-2.0,laHeight=-0.1,laGap=-0.05,
		frmTop=2,frmBtm=-2,frmLABtm=-3.25,frmLeft=0,frmRight=999,
	  	trigPosH,triPosV,curAH,curAV,curBH,curBV;
		
	var trigPosH = 500;
	var trigPosV = 0.0;
//	var	trigPosV;
	var curAH = 110,curAV = 0.35;
	var curBH = 720,curBV = -0.85;
    var updateInterval = 30;
    var initCnt =0;
 //  $("button").button();
   
   
   
    var plotOptions = {  
       	colors: ["#f00080","#00f000",
			"#663300",//LA
			"#f00000",
			"#ff6000",
			"#f0f000",
			"#33cc00",
			"#0033cc",
			"#9900cc",
			"#505050",
			"#a00000",//TrigPosH
			"#a00000",//TrigPosV
			"#008000",//CurA
			"#008000",//CurA
			"#202080",//CurB
			"#202080"//CurB
		],
		crosshair: { mode: "x" },   
	    series: { lines:{lineWidth:1},shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: -3.25, max: 2.0,show:false},
        xaxis: { min: 0, max: 999,show: false },
		lineWidth: [0],
		//lines: { steps:true},
        grid: {hoverable: true,
        		clickable: true,
             backgroundColor: { colors: ["#000","#000"]},
			markings: [//draw grid
			  { xaxis: { from: 100, to: 100 }, yaxis: { from: -3.2, to: 2 }, color: "#202020" },
			  { xaxis: { from: 200, to: 200 }, yaxis: { from: -3.2, to: 2 }, color: "#202020" },
			  { xaxis: { from: 300, to: 300 }, yaxis: { from: -3.2, to: 2 }, color: "#202020" },
			  { xaxis: { from: 400, to: 400 }, yaxis: { from: -3.2, to: 2 }, color: "#202020" },
			  { xaxis: { from: 500, to: 500 }, yaxis: { from: -3.2, to: 2 }, color: "#202020" },
			  { xaxis: { from: 600, to: 600 }, yaxis: { from: -3.2, to: 2 }, color: "#202020" },
			  { xaxis: { from: 700, to: 700 }, yaxis: { from: -3.2, to: 2 }, color: "#202020" },
			  { xaxis: { from: 800, to: 800 }, yaxis: { from: -3.2, to: 2 }, color: "#202020" },
			  { xaxis: { from: 900, to: 900 }, yaxis: { from: -3.2, to: 2 }, color: "#202020" },
			  { xaxis: { from: 0, to: 999 }, yaxis: { from: 1.5, to: 1.5 }, color: "#202020" },
			  { xaxis: { from: 0, to: 999 }, yaxis: { from: 1.0, to: 1.0 }, color: "#202020" },
			  { xaxis: { from: 0, to: 999 }, yaxis: { from: 0.5, to: 0.5 }, color: "#202020" },
			  { xaxis: { from: 0, to: 999 }, yaxis: { from: 0, to: 0 }, color: "#202020" },
			  { xaxis: { from: 0, to: 999 }, yaxis: { from: -0.5, to: -0.5 }, color: "#202020" },
			  { xaxis: { from: 0, to: 999 }, yaxis: { from: -1.0, to: -1.0 }, color: "#202020" },
			  { xaxis: { from: 0, to: 999 }, yaxis: { from: -1.5, to: -1.5 }, color: "#202020" },
			  { xaxis: { from: 0, to: 999 }, yaxis: { from: -2, to: -2 }, color: "#202020" }
			]
        }
    };  

    var plot = $.plot($("#plotarea"), [getA1Data(),getA2Data(),
    	getLogData(0),getLogData(1),
    	getLogData(2),getLogData(3),
    	getLogData(4),getLogData(5),
    	getLogData(6),getLogData(7),
    	getCurH(trigPosH),getCurV(trigPosV),
    	getCurH(curAH),getCurV(curAV),
    	getCurH(curBH),getCurV(curBV)
    	], plotOptions);
 
 
 //var legends = $("#plotarea .legendLabel");
 //   legends.each(function () {
 //       // fix the widths so they don't jump around
 //       $(this).css('width', $(this).width());
 //   });

    var updateLegendTimeout = null;
    var latestPosition = null;
    var hoverOn = 0;
    
    function updateLegend() {
        updateLegendTimeout = null;
        
        var pos = latestPosition;
        var axes = plot.getAxes();
        

        if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
        	pos.y < axes.yaxis.min || pos.y > axes.yaxis.max)
            return;
  			$("#x").text(pos.x.toFixed(0));
            if(Math.abs(pos.x.toFixed(0)-trigPosH)<5) {
//		trigPosH = 200;
				if(hoverOn) hoverOn = 0;
				else hoverOn = 1;
				trigPosH = pos.x.toFixed(0);
				$("#y").text(trigPosH);


				changeStat = 1;
				reDraw = 1;
				
				if(!goStat){
					plot = $.plot($("#plotarea"), [getA1Data(),getA2Data(),
			    	getLogData(0),getLogData(1),
			    	getLogData(2),getLogData(3),
			    	getLogData(4),getLogData(5),
			    	getLogData(6),getLogData(7),
			    	getCurH(trigPosH),getCurV(trigPosV),
			    	getCurH(curAH),getCurV(curAV),
			    	getCurH(curBH),getCurV(curBV)
			    	], plotOptions);
		 		}
 		}
//legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
//		trigPosH = pos.x;
//		alert(trigPosH);
    }
    function updateLegend2() {
        updateLegendTimeout = null;
        
        var pos = latestPosition;
        var axes = plot.getAxes();

        if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
        	pos.y < axes.yaxis.min || pos.y > axes.yaxis.max)
            return;
//		trigPosH = 200;
		if(hoverOn){
			trigPosH = pos.x.toFixed(0);
			$("#y").text(trigPosH);
			changeStat = 1;
			reDraw = 1;
	
			if(!goStat){
				plot = $.plot($("#plotarea"), [getA1Data(),getA2Data(),
		    	getLogData(0),getLogData(1),
		    	getLogData(2),getLogData(3),
		    	getLogData(4),getLogData(5),
		    	getLogData(6),getLogData(7),
		    	getCurH(trigPosH),getCurV(trigPosV),
		    	getCurH(curAH),getCurV(curAV),
		    	getCurH(curBH),getCurV(curBV)
		    	], plotOptions);
	 		}
	 	}
    }
    
//    $("#plotarea").bind("plothover",  function (event, pos, item) {
    $("#plotarea").bind("plotclick",  function (event, pos, item) {
        latestPosition = pos;
        if (!updateLegendTimeout)
            updateLegendTimeout = setTimeout(updateLegend, 50);
    });
 
    $("#plotarea").bind("plothover",  function (event, pos, item) {
        latestPosition = pos;
        if (!updateLegendTimeout)
            updateLegendTimeout = setTimeout(updateLegend2, 50);
    });
 
 
    function getA1Data() {
	    var res = [];
       	res = a1array;
		return res;
    }
  
    function getA2Data() {
	    var res = [];
		res = a2array;
	    return res;
    }
 

    function calcLogData() {
		var y = [];
		var k;

//      	for(var i=100; i<= 200; ++i)
//		lAarray[i] = trigCnt;
		
       	for(var j=0; j<= lAarray.length; ++j){
			for (var i = 0; i < 8; ++i){
				if(lAarray[j] & (0x01<<i))
					 k = laStart + (laGap*i)+laGap+(laHeight*i);
				else
					 k = laStart + (laGap*i)+laGap+(laHeight*i)+laHeight;
				
				switch(i){
				  case 0: log0data[j]=k;break;
				  case 1: log1data[j]=k;break;
				  case 2: log2data[j]=k;break;
				  case 3: log3data[j]=k;break;
				  case 4: log4data[j]=k;break;
				  case 5: log5data[j]=k;break;
				  case 6: log6data[j]=k;break;
				  case 7: log7data[j]=k;break;
  				} 	 

			}
   		}
    }

    function getLogData(k) {
        var res = [];
        var tres = [];
        switch(k){
        	case 0: tres = log0data; break;
        	case 1: tres = log1data; break;
        	case 2: tres = log2data; break;
        	case 3: tres = log3data; break;
        	case 4: tres = log4data; break;
        	case 5: tres = log5data; break;
        	case 6: tres = log6data; break;
        	case 7: tres = log7data; break;
        	
        }
		if(dataZip==1){
	        res.push([0, tres[0]]);
	        for (var i = 1; i < tres.length; ++i){
	            if(tres[i]!=tres[i-1]){
	            	res.push([i, tres[i-1]]);
	            	res.push([i+1, tres[i]]);
				}
			}
           	res.push([i-1, tres[i-1]]);
		}
		else{
	        for (var i = 0; i < tres.length; ++i)
	            res.push([i, tres[i]]);
		}
		return res;
	}

	function getCurH(i){
        var res = [];
        var j = 7;
        frmBtm = laStart + (laGap*j)+laGap+(laHeight*j)+laHeight;
       	res.push([i, frmBtm]);
       	res.push([i, frmTop]);
		return res;
	}

	function getCurV(i){
        var res = [];
       	res.push([frmLeft,i]);
       	res.push([frmRight,i]);
		return res;
	}

/*	function rotateFile(){
//		switch(fileNum){
//			case 0: fileNm = "tst1.csv"; break;
//			case 1: fileNm = "tst2.csv"; break;
//			case 2: fileNm = "tst3.csv"; break;
// //			case 0: fileNm = "msodata.csv"; break;
// //			case 1: fileNm = "tst2.csv"; break;
// //			case 2: fileNm = "tst3.csv"; break;
//		}
		fileNm = "/cgi-bin/msodata.csv"
		if (!dataReceived)	makeRequest(fileNm,1);
//		fileNum++;
//		if(fileNum > 2)	fileNum = 0;
	}*/
	
	function getDataFile(){
//		fileNm = "/cgi-bin/msodata.csv";
		fileNm = "/cgi-bin/msodata.csv?sid="+ new Date().getTime();
//		dataReceived = 0;
//		if (!dataReceived)	makeRequest(fileNm,1);
		makeRequest(fileNm,1);
	}
	
  

	function MsoConnect(Cnct){
		var Cncs;
//		alert('tst1');
		if(Cnct=="on")Cncs="C";
		else Cncs = "Q";

		$.ajax({
		  type: 'GET',
			url: "/cgi-bin/mso28ctl.cgi",
			data: "i="+Cncs
		});
	}
//	function MsoStart(){
//		MsoConnect("on");
//		update();
//	}

	function MsoStat(){
//		makeRequest("/cgi-bin/mso28ctl.cgi?i=T",0);
		dataReceived = 0;
		makeRequest("/cgi-bin/mso28ctl.cgi?i=t",0);


	}

	function MsoReadBuffer(){
		$.ajax({
		  type: 'GET',
		  url: "/cgi-bin/mso28ctl.cgi",
		  data: "i=B",
		});
//		makeRequest("/cgi-bin/mso28ctl.cgi?i=B",1);
	}


	function MsoInit(){

		$.ajax({
		  type: 'GET',
		  url: "/cgi-bin/mso28ctl.cgi",
		  data: "i=I",
		});
	}
	
	function MsoArm(i){
		var outMsg;
	//	alert(TRSPIWD);
	if(i=='A'){
		outMsg = "TSAMP="+nsClkRate+
		"&VDIV0="+VDIV0+
		"&VDIV1="+VDIV1+
		"&VOFF0="+OffsetDbl0+
		"&VOFF1="+OffsetDbl1+
		"&ACDC0="+DC0+
		"&ACDC1="+DC1+
		"&LAFM="+LAFM+
		"&TRIGV0="+TRIGV0+
		"&TRIGV1="+TRIGV1+
		"&TRSLP0="+TRSLP0+
		"&TRSLP1="+TRSLP1+
		"&TRIGWD0="+TRIGWD0+
		"&TRIGWD1="+TRIGWD1+
		"&TRMODE0="+TRMODE0+
		"&TRMODE1="+TRMODE1+
		"&TRLASLP="+TRLASLP+
		"&TRPOS="+trigPosH+
		"&TRGCH="+TRGCH+
		"&TRLAWD="+TRLAWD+
		"&TRI2CWD="+TRI2CWD+
		"&TRSPIWD="+TRSPIWD+
		"&SPIMODE="+SPIMODE+
		"&i="+i;
//		outMsg = "TSAMP="+100+"&i="+i;
	}
	else{
		outMsg = "i="+i;
	}
//alert(outMsg);
	$.ajax({
		  type: 'GET',
		  url: "/cgi-bin/mso28ctl.cgi",
		  data: outMsg,
//		  data: "i="+i,
//		  data: "Armed="+i+"&DCA="+DCA+"&DCB="+DCB+"&ATA="+$("#vDiv1").val()+"&ATB="+$("#vDiv2").val(),
//		  success: success,
//		  dataType: dataType
		});
	}
//	function MsoGo(){
//		MsoArm("on");
//		update();
//	}

	function MsoCplA(i){
		//alert('test5');
		$.ajax({
		  type: 'GET',
		  url: "/cgi-bin/mso28ctl.cgi",
		  data: "DC0="+i,
		});
	}

	function MsoCplB(i){

		$.ajax({
		  type: 'GET',
		  url: "/cgi-bin/mso28ctl.cgi",
		  data: "DC1="+i,
		});
	}

	function loop2(){

		switch(currState){

			case msoState.waitMso:
				if(!statReqSent) nextState = msoState.chkMso;
				else{
					if(dataReceived ==1){
//					if(dataReceived){
						if(msoRawStat != 31) nextState = msoState.initMso;
						else{//No MSO check again
							nextState = msoState.chkMso;
							statReqSent = 0;
						}
					}
					else nextState = msoState.waitMso;
					
				}
				break;



//			case msoState.noMso:
//				if(msoInitStat) nextState = msoState.ncMso;
//				else nextState = msoState.noMso;
//				break;
			case msoState.ncMso:
//alert("tst 2.1");
				if(dataReceived) nextState = msoState.stbyMso;
				else nextState = msoState.ncMso;
				break;
			case msoState.stbyMso:
					if(!statReqSent) nextState = msoState.statReqMso;
					else{
//					if(dataReceived ==1){
						if(dataReceived){
							if((msoRawStat == 31)&&(dataReceived ==1)) nextState = msoState.chkMso;//trap MSO disconnect
							else{
								if(!msoConnected) nextState = msoState.ncMso;//trap MSO off
								else{//MSO On
									if(goStat && !goStatPrev && !dataRdy){
										if(TrgLoop == 0){
												setGoStat(false);
												TrgLoop = 1;	
												$("#radio4").attr("checked",false).button("refresh");
												$("#radio5").attr("checked",true).button("refresh");
										}
										else{
											if(changeStat)								
												nextState = msoState.armMso;
											else
												nextState = msoState.reArmMso;
											if(TrgLoop == 1) TrgLoop = 0;
										}
									} 
									else if(!goStat && goStatPrev)nextState = msoState.stopMso;
			//						else if((goStat && goStatPrev) && ((msoRawStat-16)==6) && (rdBufReqSent==0)) nextState = msoState.rbMso;
			//						else if((goStat && goStatPrev) && ((msoRawStat-16)==1) && (rdBufReqSent==1)) nextState = msoState.getData;
									else if((goStat && goStatPrev) && ((msoRawStat-16)==1) && (rdBufReqSent==0)) nextState = msoState.reArmMso;
									else if((goStat && goStatPrev) && ((msoRawStat-16)==13) && rdBufReqSent == 0) nextState = msoState.getData;
									else {
//										if(goStat && goStatPrev && (TrgLoop == 3) && (statCnt>10))
										if(goStat && goStatPrev && (TrgLoop == 3) && (statCnt > autoWait[$( "#slider-vertical3" ).slider( "value" )]))
											nextState = msoState.forceCapMso;
										else
											nextState = msoState.statReqMso;
									}
								}//MSO On
							}//MSO Connected
						}//Data Received
						else{
							
							nextState = msoState.stbyMso;
							
						}
					}
				break;
			case msoState.statReqMso:
				nextState = msoState.stbyMso;
				break;
			case msoState.chkMso:
				nextState = msoState.waitMso;
				break;
			case msoState.initMso:
					nextState = msoState.stbyMso;
				break;
			case msoState.armMso:
				nextState = msoState.stbyMso;
				break;
			case msoState.stopMso:
				nextState = msoState.stbyMso;
				break;
			case msoState.forceCapMso:
				nextState = msoState.stbyMso;
				break;
			case msoState.rbMso:
				nextState = msoState.stbyMso;
				break;
			case msoState.reArmMso:
				nextState = msoState.stbyMso;
				break;
			case msoState.getData:
				nextState = msoState.statReqMso;
				break;
			case msoState.wTrigMso:
				break;
			case msoState.triggedgMso:
				break;
		}
		
//		if(!msoConnected) nextState = msoState.ncMso;//trap MSO disconnect
//		if(!msoConnected) nextState = msoState.chkMso;//trap MSO disconnect
		
//	currState = nextState;	
		
//		switch(currState){
		switch(nextState){
			case msoState.chkMso:
//alert("chkMso "+msoRawStat);
//				MsoArm('F');

				MsoStat();
				statReqSent = 1;
				updateInterval = 50;
			break;
			case msoState.waitMso:
//alert("waitMso "+msoRawStat);
				goStatPrev = 0;
				rdBufReqSent = 0;
				updateInterval = 50;
			break;

			case msoState.initMso:
//alert("initMso "+msoRawStat);
				statReqSent = 0;
				MsoInit();
				msoInitStat = 1;
				changeStat = 1;
				statReqSent = 0;
				updateInterval =1000;//1000
				break;
			case msoState.ncMso:
//alert("ncMSO "+msoRawStat);
				MsoConnect("on");
//				MsoStat();
				changeStat = 1;
				statReqSent = 0;
				trigCnt = 0;
				drawCnt = 0;
				statCnt = 0;
				updateInterval =500;//500
				break;
			case msoState.stbyMso:
//alert("stbyMso "+msoRawStat);
//				statReqSent = 0;
				//if(dataReceived == 2)dataReceived = 0;
				updateInterval = 10;
				break;
			case msoState.statReqMso:
//alert("statReqMso");
				statCnt++;
				MsoStat();
				statReqSent = 1;
				updateInterval = 20;//20
				break;
			case msoState.armMso:
//alert("Arm A");
				MsoArm('A');
				goStatPrev = 1;
				changeStat = 0;
				statReqSent = 0;
				rdBufReqSent = 0;
				trigCnt = 0;
				drawCnt = 0;
				statCnt = 0;	
//				rdBufReqSent=0;
				updateInterval = 70;//70
				break;
			case msoState.stopMso:
				MsoArm('F');
				goStatPrev = 0;
				rdBufReqSent=0;
				statReqSent = 0;
				updateInterval = 10;
				break;
			case msoState.forceCapMso:
				MsoArm('X');
				statCnt = 0;
				updateInterval = 10;
				break;
			case msoState.rbMso:
				MsoReadBuffer();
				rdBufReqSent = 1;
//				trigCnt++;
				updateInterval = 10;
				break;
			case msoState.reArmMso:
//alert("reArm a");
				MsoArm('a');
				goStatPrev = 1;
				statReqSent = 0;
				rdBufReqSent = 0;
//				rdBufReqSent=0;
				updateInterval = 70;//70
				break;
			case msoState.getData:
				getDataFile();
				goStatPrev = 0;
				rdBufReqSent=0;
				statReqSent = 0;
				statCnt = 0;
				rdBufReqSent = 1;
				trigCnt++;
				updateInterval = 20;//20

				break;

			case msoState.wTrigMso:
				break;
			case msoState.triggedgMso:
				break;
		}
		trigPosV = 	($( "#slider-verticalTrgA1" ).slider( "value" )-19)/10;

		if(goStat){
			if(dataRdy == 1){
		  	calcLogData();
			plot.setData([getA1Data(),getA2Data(),
		    	getLogData(0),getLogData(1),
		    	getLogData(2),getLogData(3),
		    	getLogData(4),getLogData(5),
		    	getLogData(6),getLogData(7),
				getCurH(trigPosH),getCurV(trigPosV),
				getCurH(curAH),getCurV(curAV),
				getCurH(curBH),getCurV(curBV)
				]);
//			goStatPrev = 0;
	        plot.draw();	
			dataRdy = 0;
	        drawCnt++;
	       	}
		}//goStat				

//	        plot.draw();	

	currState = nextState;	
	setTimeout(loop2,updateInterval);
//	setTimeout(loop2,50);
	}


//	window.onload = MsoStart();

		  
 // 	update();
	window.onload=loop2; 



}
);