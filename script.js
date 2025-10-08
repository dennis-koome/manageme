var db = firebase.firestore();
db.enablePersistence().catch(e=>{
	if (e.code == 'failed-precondition') {
		console.error("Multiple tabs error."+e);
      } else if (e.code == 'unimplemented') {
      	console.error("error occurred during implementation." + e);
      }
});

var addednewdoc = false;


function toggleaddingdrecord(){
	var diaryfrm = document.getElementById("diaryfrm");
	var  dplus = document.getElementsByClassName("dplus")[0];
	if(window.getComputedStyle(diaryfrm).display == "block"){
		diaryfrm.style.display="none";
		dplus.innerHTML="+";
	}else{
		diaryfrm.style.display="block";
		dplus.innerHTML="-";
	}
}


function insertdiary(){
	var selectdate = document.getElementById("selectdate");
	var titled = document.getElementById("titled");
	var dialrdets = document.getElementById("dialrdets");
	var respondtodiary = document.getElementById("respondtodiary");
	respondtodiary.innerHTML="";
	var d = new Date(selectdate.value);
	var day = "";
	var month = "";
	var date = d.getDate();
	var year = d.getFullYear();
	var getdaybyno =d.getDay();
	var getmonthbyno = d.getMonth() + 1;
	switch(getdaybyno){
		case 0:
		day="Sun";
		break;

		case 1:
		day="Mon";
		break;

		case 2:
		day="Teu";
		break;

		case 3:
		day="Wed";
		break;

		case 4:
		day="Thur";
		break;

		case 5:
		day="Fri";
		break;

		case 6:
		day="Sat";
		break;

		default:
		day="Error";
	}

	switch(getmonthbyno){
		case 1:
		month="Jan";
		break;

		case 2:
		month="Feb";
		break;

		case 3:
		month="Mar";
		break;

		case 4:
		month="Apr";
		break;

		case 5:
		month="May";
		break;

		case 6:
		month="June";
		break;

		case 7:
		month="July";
		break;

		case 8:
		month="Aug";
		break;

		case 9:
		month="Sept";
		break;

		case 10:
		month="Oct";
		break;

		case 11:
		month="Nov";
		break;

		case 12:
		month="Dec";
		break;

		default:
		month="Error";
	}


	//adding a zero whenever a single digit
	var dateintodc = date.toLocaleString(undefined, {minimumIntegerDigits: 2});
	var monthintodc = getmonthbyno.toLocaleString(undefined, {minimumIntegerDigits: 2});

	//adding ordinal suffix th rd or st to the date
	function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}
	var carformart = dateintodc+"/"+monthintodc+"/"+year;
	var carreadformart = day+" "+dateintodc+nth(date)+" "+month+" "+year;


	var diarydata ={
			carendardate:carformart,
			datereadformart:carreadformart,
			datestring:d,
			title: titled.value,
			diary: dialrdets.value
		}

		//console.log(monthintodc);
	

	var ref = db.collection("mydiary").doc();
		ref.set(diarydata)
		.then(function() {
		    respondtodiary.innerHTML = "Successfully Added a Diary";
	})
		.catch(function(error) {
			console.log(error);
		   respondtodiary.innerHTML = "<p style='color:#fd2e0c'><span style='font-weight:bold;'>Error:</span> A Problem Occured While adding a diarly record</p>";
		});	
		var colomnColl = db.collection("TimetableConfig");
			colomnColl.where("userid","==",useridtoadd).orderBy("colomnNo","asc").onSnapshot(function(querySnapshot) {
				querySnapshot.docChanges().forEach(function(changed){
					if (change.type == "added") {
						var i = parseInt(changed.doc.data().colomnNo) - 1;
							var timetbIntrval = changed.doc.data().timetableInt;
								    		
								itmtdvar = document.createElement("td");
								itmtdvar.id = "itmtd" + wkno + i;								    			
								tablrow.appendChild(itmtdvar);
								var gtindxdata = "colmn"+changed.doc.data().colomnNo;
								itmtdvar.innerHTML=change.doc.data()[gtindxdata];
				    }

				    						    					
				});
					addedit();
				});
				
}


//DISPLAY DIARY REGION
/*
function displaydiary(){
	var salarymain = document.getElementById("salarymain");
	db.collection("mydiary").orderBy("datestring","asc")
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
        	let diarydata = change.doc.data();
            if (change.type === "added") {
            	salarymain.innerHTML += `
            		<div class="diaryitem">
						<h3>${change.doc.data().datereadformart}</h3>
						<h4>${change.doc.data().title}</h4>
						<p>${change.doc.data().diary}</p>
						
					</div>
            	`;
                //console.log("New city: ", change.doc.data());
            }
            if (change.type === "modified") {
               // console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                //console.log("Removed city: ", change.doc.data());
            }
        });
    });

}

displaydiary();
*/

//christian githae
//https://youtu.be/MP4Yl7F95Lk


function shwquotes(){
	var wrapper1 = document.getElementById("wrapper1");
	var wrapper2 = document.getElementById("wrapper2");
	var catwrapper = document.getElementById("catwrapper");
	var catwrapper2 = document.getElementById("catwrapper2");
	var addq = document.getElementById("addq");
	var addtdo = document.getElementById("addtdo");

	wrapper1.style.display = "block";
	wrapper2.style.display = "none";
	catwrapper.style.display = "block";
	catwrapper2.style.display = "none";

	//setting url when someone checks the schedule 
	var querystring = window.location.search;
	var urlParams = new URLSearchParams(querystring);
	var loc =  urlParams.get('loc');
	var myroot = window.location.origin+window.location.pathname;
	var state={id: "101"}; 
	window.history.pushState(state, "schedulepage", myroot);	


	if(window.getComputedStyle(wrapper1).display == "none"){
		addq.style.display="none";
		addtdo.style.display="block";
	}else if(window.getComputedStyle(wrapper1).display == "block"){
		addq.style.display="block";
		addtdo.style.display="none";
	}
}

function shwtimetable(){
	var wrapper1 = document.getElementById("wrapper1");
	var wrapper2 = document.getElementById("wrapper2");
	var catwrapper = document.getElementById("catwrapper");
	var catwrapper2 = document.getElementById("catwrapper2");

	wrapper1.style.display = "none";
	wrapper2.style.display = "block";
	catwrapper.style.display = "none";
	catwrapper2.style.display = "block";
}


//=======================Start timetable edit========================

function addConfigValues(colomn,intervalVal,refId){
	var configrespons = document.getElementById("configrespons");
	var useridtoadd = firebase.auth().currentUser.uid;
	configrespons.innerHTML = "";
	var ref = db.collection("TimetableConfig").doc();
		ref.set({
			colomnNo:colomn,
		  	timetableInt : intervalVal,
			refidentity : ref.id,
			userid : useridtoadd
		})
		.then(function() {
		    configrespons.innerHTML = "Successfully Adde A Colomn";
		})
		.catch(function(error) {
			console.log(error);
		   configrespons.innerHTML = "<p style='color:#fd2e0c'><span style='font-weight:bold;'>Error:</span> A Problem Occured While Sending Configuration Information</p>";
		});
}


function addTimetableItems(item,itemIndx){
	var ref = db.collection("TimetableItems").doc();
	var useridtoadd = firebase.auth().currentUser.uid;
	var reference = ref.id;
	ref.set({
		tItem:item,
		itemIndex:itemIndx=reference,
		userid:useridtoadd
	});
}


function addToDoList(tdoCat,tdoitem,tdoIndx,todoDate,timeStamp){
	var useridtoadd = firebase.auth().currentUser.uid;
	var ref = db.collection("ToDoList").doc();
	var reference = ref.id;
	ref.set({
		todoCat:tdoCat,
		todoItem:tdoitem,
		tdoIndex:tdoIndx=reference,
		todoDate:todoDate,
		timeStamp:timeStamp,
		userid:useridtoadd
	});
}



//toggle the form to add items in my timetable
function toggadditm(){
	var timetandtodo = document.getElementById("timetandtodo");
	var toggtmtablefrm = document.getElementById("toggtmtablefrm");
	if(window.getComputedStyle(timetandtodo).display=="none"){
		timetandtodo.style.display = "block";
		toggtmtablefrm.innerHTML="SHRINK TO HIDE YOUR TIMETABLE DETAILS";
		
	}else{
		timetandtodo.style.display = "none";
		toggtmtablefrm.innerHTML="EXPAND TO VIEW YOUR TIMETABLE DETAILS";
	}

}

//toggle todo list
function toggtodolist(){
	var todolistmainprev = document.getElementById("todolistmainprev");
	var toggtodo = document.getElementById("toggtodo");
	if(window.getComputedStyle(todolistmainprev).display=="none"){
		todolistmainprev.style.display = "block";
		toggtodo.innerHTML="SHRINK TO HIDE YOUR TODO LIST";
		
	}else{
		todolistmainprev.style.display = "none";
		toggtodo.innerHTML="EXPAND TO VIEW YOUR TODO LIST";
	}

}

function toggleaddcateg(){
	var addtodowrapper = document.getElementById("addtodowrapper");
	var addc = document.getElementById("addtdo");
	var wrapper2 = document.getElementById("wrapper2");
	var wrapper1 = document.getElementById("wrapper1");
	var catwrapper = document.getElementById("catwrapper");
	var catwrapper2 = document.getElementById("catwrapper2");
	//addtodowrapper.style.display="block";
	

	if(window.getComputedStyle(addtodowrapper).display=="none"){
		addc.innerHTML = "<span style='color:#ff3c3c'>Exit Add ToDo</span>";
		addc.style.border = "solid #ff3c3c 2px";
		addtodowrapper.style.display="block";
		wrapper2.style.display = "block";
		wrapper1.style.display = "none";
		catwrapper.style.display = "none";
		catwrapper2.style.display = "block";
	}else{	
		addtodowrapper.style.display="none";
		addc.innerHTML = "<span style='color:#fff'>Open Add ToDo</span>";
		addc.style.border = "solid #fff 1px";
	}

}


//checking the time not to go neyond 60
function checkTmLmt(inputval){
	var strtMin = document.getElementById("strtMin");
	if(inputval > 60){
		strtMin.value=0;
	}
}




function getconfigs(){
	var table = document.getElementById("table");
	var tfrm = document.getElementById("tfrm");
	var tfrmul = document.getElementById("tfrmul");	
	var colNo = document.getElementById("colNo");
	var Stime = document.getElementById("Stime");
	var disconfigs = document.getElementById("disconfigs");
	var frminedtul = document.getElementById("frminedtul");
	var useridtoadd = firebase.auth().currentUser.uid;

	//creating a table row to contain table titles like days/time sessions and edit
	var tableheadrw = document.createElement("tr");
	tableheadrw.id="tableheadrow";
	var dayss = document.createElement("th");//creating for days colomn
	dayss.id="days";
	dayss.innerHTML="Days";
	tableheadrw.appendChild(dayss);


	//creating colomn for edit and appending at the end
	var edt = document.createElement("th");
	edt.id="edit";
	edt.innerHTML="EDIT";
	tableheadrw.appendChild(edt);
	table.appendChild(tableheadrw);//appending the heading row


    //creating the adding data to timetable form first selector for the day
	tfrmul.innerHTML =`
		<li id="dayz">
				<label>DAY:</label><select id="dayzindex" name="id">
				<option value=1>Monday</option>
				<option value=2>Teusday</option>
				<option value=3>Wednesday</option>
				<option value=4>Thursday</option>
				<option value=5>Friday</option>
				<option value=6>Saturday</option>
				<option value=7>Sunday</option>	
				</select>
			
		</li>

		<li id="sendbtn">
				<input onclick="SendTmData(); return false" id="sendTym" type="submit" value="send" class="submit">
		</li>
	`;

	var sendbtn = document.getElementById("sendbtn");
	var thead;

	//getting the time intervals sessions from database
	var colomnColl = db.collection("TimetableConfig");
	colomnColl.where("userid","==",useridtoadd).orderBy("colomnNo","asc").onSnapshot(function(querySnapshot) {
	    querySnapshot.docChanges().forEach(function(change){
	    	if (change.type === "added") {
	    				colNo.value="1";
			    		var colomnnext = parseInt(change.doc.data().colomnNo) + 1;
			    		var Tint = change.doc.data().timetableInt;
			    		var frm = Tint.split("-")[1];

			    		//updating the add next colomn form
			    		colNo.value = colomnnext;			    		
			    		
			    		Stime.innerHTML=`
			    		<label style="color:#fff;">From:</label><br>
			    		<input type="text" id="newLwInt" value="${frm}">
			    		`;

			    		//inserting the colomn time interval values from database just before the edit colomn
						thead = document.createElement("th");
						thead.className = "thead";
						thead.id= change.doc.data().refidentity+"th";
						tableheadrw.insertBefore(thead, edt);
						thead.innerHTML=change.doc.data().timetableInt;

						//inserting the timetable time interval coloms on configuration colomn plus the X sign to remove the colomn
						disconfigs.innerHTML +=`
						<li id="${change.doc.data().refidentity}">${change.doc.data().timetableInt}<span onclick="deleteconfigitem(this.parentNode)" style="float:right; padding-right:5px; color:#f00">X</span></li>
						`;						

						//inserting time interval frm database and a select input in the insert data form
						var frmlist = document.createElement("li");
								frmlist.className = "frmlist";
								frmlist.id = change.doc.data().refidentity+"frmlst";
								frmlist.setAttribute('data-form',`${change.doc.data().timetableInt}`);
								frmlist.innerHTML=`
									<label class="inslabels">${change.doc.data().timetableInt}</label>
									<select id="items${change.doc.data().colomnNo}" data-select="${change.doc.data().timetableInt}">		
									</select>
								`;
								tfrmul.insertBefore(frmlist, sendbtn);

					


						
						var frmsel = document.getElementById("items" + change.doc.data().colomnNo);//getting the item plus colomn number as used to put ids in select inputs
						var colomnTitle = change.doc.data().timetableInt;
					

					//inserting the option values from timetable items table
					db.collection("TimetableItems").where("userid","==",useridtoadd).onSnapshot(function(querySnapshot) {
			    		querySnapshot.docChanges().forEach(function(change){
						    	if (change.type === "added") {
						    		if(change.doc.data().tItem != ""){
						    			frmsel.innerHTML+=`<option id="${change.doc.data().itemIndex}" value="${change.doc.data().tItem}">${change.doc.data().tItem}</option>`;
						    			var dayzindex = document.getElementById("dayzindex");
						    		}
						    	}

						   	 });
							});
	    		}

	    		//listening to delete method to remove without refresh
	    		if (change.type === "removed") {
			    	db.collection("rowtochange").doc("configdatatodelete")
					    .onSnapshot((doc) => {
					    	var datatodel = doc.data().configtobedel;
					    		var edittmdata=document.getElementById("edittmdata");
					    		var disconfigs = document.getElementById("disconfigs");
					    		var tableheadrow = document.getElementById("tableheadrow");
					    		var tfrmul = document.getElementById("tfrmul");
					    		var colNo = document.getElementById("colNo");
					    		var childtodel = document.getElementById(datatodel);
					    		var childtitletrem = document.getElementById(datatodel+"th");
					    		var frmlsttodel = document.getElementById(datatodel+"frmlst");
					    		disconfigs.removeChild(childtodel);
					    		tableheadrow.removeChild(childtitletrem);
					    		tfrmul.removeChild(frmlsttodel);
					    		colNo.value--;
					    		edittmdata.style.display="none";					    		
					    						    	 
					   });

	    			//alert("finally!!");

	    		}


			});//end of inserted items in select options

		});	



	}


	//deleting the timetable configuration item
	function deleteconfigitem(parenttobedeleted){
			var edittmdata=document.getElementById("edittmdata");
			edittmdata.style.display="block";
			edittmdata.innerHTML=`
				<div style="background-color:rgba(0,0,0,0.4); padding-bottom:20px;">
					<h3 style="font-weight:bold; margin-top:30vh; color:#fff; text-align:center;padding-top: 20px">Are you sure you want to delete the timetable time interval item?</h3>
					<button id="dontdelconf" style="width: 80px;line-height: 25px;font-weight: bold;margin-left: 45%;">NO</button>
					<button id="yesdelconf" style="width: 80px;line-height: 25px;font-weight: bold;">YES</button>
					<p id="respdelcat" style="text-align:center; color:#00FFFF; font-style:italic;"></p>
				</div>
			`;


			yesdelconf.addEventListener("click",()=>{
				db.collection("TimetableConfig").doc(parenttobedeleted.id).delete().then(()=>{
				console.log("Timetable title successfullydeleted");
				db.collection("rowtochange").doc("configdatatodelete").set({
					configtobedel:parenttobedeleted.id
				}).then(()=>{
					console.log("Successfully Written data to be deleted");
				}).catch(error=>{
					console.error("An error occurred while inserting the data to be deleted");
				});
				}).catch((error)=>{
					console.error("A Problem occurred during deleting of table title",error);
				});
			})

			dontdelconf.addEventListener("click",()=>{
				edittmdata.style.display="none";
			})

			
		}



	//showing the edit window and populating it with edit values
	function openEdtTime(edtid){
			var edittmdata = document.getElementById("edittmdata");			
			let docrow = edtid.parentNode.parentNode.id;
			var useridtoadd = firebase.auth().currentUser.uid;
			var dayoftheweek="";
			switch(docrow){
				 		case "row1":
				 		dayoftheweek = "monday";
				 		break;

				 		case  "row2":
				 		dayoftheweek = "Teusday";
				 		break;

				 		case  "row3":
				 		dayoftheweek = "Wednesday";
				 		break;

				 		case  "row4":
				 		dayoftheweek = "Thursday";
				 		break;

				 		case  "row5":
				 		dayoftheweek = "Friday";
				 		break;

				 		case  "row6":
				 		dayoftheweek = "Saturday";
				 		break;

				 		case  "row7":
				 		dayoftheweek = "Sunday";
				 		break;

				 		default:
				 	}
			numberofrw = docrow.split("_")[1];
			edittmdata.innerHTML = `
				<button style="float:right; margin-right: 10%; margin-top:10px; width:70px; height:30px" id="closeedt">CLOSE</button>

					<div id="editfrmdiv">				
						<div id="frminedt">
						<h2 style="color:#fff; font-size:22px; border-bottom:dotted 1px #ccc">Editing entries for ${dayoftheweek}</h2>
							<div id="editTimeTitle"></div>
							<ul id="frminedtul">
							<img id="gifld" src="Glowing Loader.gif">

							</ul>

							<input id="submittimetablechanges" type="submit" value="Edit Values" class="submit">
							<div id="responseonedttmtable"></div>

						</div>
					</div>
			`;

			

			var docRef = db.collection("TimetableData");
			var timeconfigs = db.collection("TimetableConfig");
			var count = 0;

			
			timeconfigs.where("userid","==",useridtoadd).orderBy("colomnNo", "asc").get().then(function(querySnapshot) {

					querySnapshot.forEach(function(docconfig){

						docRef.where("day","==",numberofrw).where("userid","==",useridtoadd).get().then(function(querySnapshot) {
							querySnapshot.forEach(function(doc){

								count++;
								var itmzzdata = doc.data();
								gifld.style.display="none";
								frminedtul.innerHTML += `
				    			<li>
									<label>${docconfig.data().timetableInt}</label><br>
									<input class="inputtoedit" value="${itmzzdata["colmn"+count]}" type="text" id="${docconfig.data().timetableInt}"><br><br>
								</li>

			    				`;		    				

							});

			    		}).catch(function(err){
			    			console.log("An error occured: ", err);
			    		});

					    	configdata = docconfig.data();		    		

					});
			    	
			 }).catch(function(error){
			 	console.log("There was a problem while getting the document", error);
			 });

		

			 submittimetablechanges.addEventListener("click",function(){
			 		var responseonedttmtable = document.getElementById("responseonedttmtable");	
			 		var docrowd = docrow.split("_")[0]+docrow.split("_")[1];		 	
				 	var docRef = db.collection("TimetableData").doc(docrowd);
				 	var testwichday = "row"+docrow.split("_")[1];
				 	var dayoftheweek;

				 	switch(testwichday){
				 		case "row1":
				 		dayoftheweek = "monday";
				 		break;

				 		case  "row2":
				 		dayoftheweek = "Teusday";
				 		break;

				 		case  "row3":
				 		dayoftheweek = "Wednesday";
				 		break;

				 		case  "row4":
				 		dayoftheweek = "Thursday";
				 		break;

				 		case  "row5":
				 		dayoftheweek = "Friday";
				 		break;

				 		case  "row6":
				 		dayoftheweek = "Saturday";
				 		break;

				 		case  "row7":
				 		dayoftheweek = "Sunday";
				 		break;

				 		default:
				 	}

				 	let editinputs = document.querySelectorAll(".inputtoedit");
				 	let count = 0;
				 	let obj = {};

				 	editinputs.forEach(function(inpts){
				 		count++;
				 		obj["colmn"+count] = inpts.value;
					 	return docRef.update(
							 	obj
					 	).then(function(){
					 		//uploading the changed row to the database to modify in all devices when accessed
					 		db.collection("rowtochange").doc("timetableeditedrow").set({
							   		rowidtoedit:docrow
									})
									.then((docRef) => {
									    console.log("row to edit added successfully ");
									    setTimeout(function(e){
									    	edittmdata.style.display="none";
									    },500);
									})
									.catch((error) => {
									    console.error("Error adding row to edit document: ", error);
								});
						 	responseonedttmtable.innerHTML = `<p style='color:#00ffff; font-style:italic;text-align:center'>Day <span style='font-weight:bold; font-style:normal'>${dayoftheweek}</span> updated Successfully</p>`;
				 			console.log("Timetable updated Successfully");
			 		}).catch(function(err){
			 			responseonedttmtable.innerHTML = `<p style='color:#f00; font-style:italic;text-align:center'>An error occured while updating the timetable</p>`;
			 			console.log("An error occured during timetable update: ", err);
			 			});		 		
			 		});
			 		
			 });


			 closeedt.addEventListener("click",function(){
				edittmdata.style.display = "none";

			});


			edittmdata.style.display="block";
			timetoeditid = edtid.parentNode.parentNode.id;
			return(edtid);
			

		}







//populating the timetable data to the relevant colomns
function GetTmData(){
	var table = document.getElementById("table");
	var tableheadrow = document.getElementById("tableheadrow");
	var useridtoadd = firebase.auth().currentUser.uid;
	//table.innerHTML = "";


				db.collection("TimetableData").where("userid","==",useridtoadd).onSnapshot(function(querySnapshot) {
	    		querySnapshot.docChanges().forEach(function(change){
	    				var idrowtobedel;
				    	if (change.type === "added") {
				    		var wkno = change.doc.data().day;
					    	var weekday = change.doc.data().day;
					    	if(weekday == "1"){
					    		weekday = "Mon";
					    	}
					    	if(weekday == "2"){
					    		weekday = "Teu";
					    	}
					    	if(weekday == "3"){
					    		weekday = "Wed";
					    	}
					    	if(weekday == "4"){
					    		weekday = "Thur";
					    	}
					    	if(weekday == "5"){
					    		weekday = "Fri";
					    	}
					    	if(weekday == "6"){
					    		weekday = "Sat";
					    	}
					    	if(weekday == "7"){
					    		weekday = "Sun";
					    	}	

				    		var tablrow = document.createElement("tr");
				    		tablrow.id=useridtoadd+"row_"+change.doc.data().day;
				    		var daytd = document.createElement("td");
				    		daytd.innerHTML = weekday;
				    		tablrow.appendChild(daytd);

				    			var colomnColl = db.collection("TimetableConfig");
								colomnColl.where("userid","==",useridtoadd).orderBy("colomnNo","asc").onSnapshot(function(querySnapshot) {
								    querySnapshot.docChanges().forEach(function(changed){
								    	if (change.type == "added") {
								    		var i = parseInt(changed.doc.data().colomnNo) - 1;
								    		var timetbIntrval = changed.doc.data().timetableInt;
								    		
								    			itmtdvar = document.createElement("td");
								    			itmtdvar.id = "itmtd" + wkno + i;								    			
								    			tablrow.appendChild(itmtdvar);
								    			var gtindxdata = "colmn"+changed.doc.data().colomnNo;
								    			itmtdvar.innerHTML=change.doc.data()[gtindxdata];
				    					}

				    						    					
								    });
								    addedit();
								});

								


							var addedit = function(){
					    		var edttd = document.createElement("td");
					    		edttd.innerHTML = "<span onclick='comfirmdelete(this)'>X </span>|<span onclick='openEdtTime(this)'> Edit </span>";
					    		edttd.className="editTmtable";
					    		tablrow.appendChild(edttd);
				    		}

				    		table.appendChild(tablrow);
				    	}else if(change.type === "removed"){
				    		//listening to removed event and getting the value of the row to be deleted 

				    		db.collection("rowtochange").doc("rowid").onSnapshot(function(doc){
				    			idrowtobedel = doc.data().rowid;

								    	//getting the roe element to be deleted and removing it without page refresh
								    	var actualtodelete = document.getElementById(idrowtobedel);
							    		var tableel = actualtodelete.parentNode;
										var deletedrw = actualtodelete;
										tableel.removeChild(deletedrw);
							    		console.log(idrowtobedel);

				    		});

				    	}else if(change.type ==="modified"){

				    		db.collection("rowtochange").doc("timetableeditedrow").onSnapshot(function(doc){
				    			var tsplit = doc.data().rowidtoedit;
				    			var fstsplt = tsplit.split("_");
				    			idrowedited = fstsplt[0]+fstsplt[1];
				    			var rowtobeedited = document.getElementById(tsplit);				    			
				    			db.collection("TimetableData").doc(idrowedited)
								    .onSnapshot((doc) => {
								    	//choosing the rows to edit on midification
								    	var resultinarray = Object.values(doc.data());									    								    	
								    	for(var i=0;i<resultinarray.length-2;i++){
								    		rowtobeedited.children[i+1].innerHTML = resultinarray[i];	
								    								    		
								    	}
								        
								    });

				    		});

				    	}
				    });
	    		});

}




function SendTmData(){
	var colomnColl = db.collection("TimetableConfig");
	var elem={};
	var table = document.getElementById("table");
	var tableheadrow = document.getElementById("tableheadrow");
	var dayzindex = document.getElementById("dayzindex");
	var useridentity = firebase.auth().currentUser.uid;
	var frmsel="";


			function receivecolmns(){
				colomnColl.where("userid","==",useridentity).orderBy("colomnNo","asc").get().then(function(querySnapshot) {
					querySnapshot.forEach(function(doc){
						 if (doc.exists) {

						 	frmsel = document.getElementById("items" + doc.data().colomnNo);
				    		var indexdata = "colmn"+doc.data().colomnNo;				    		

				    		elem["day"] = dayzindex.value;
				    		elem[indexdata] = frmsel.value;
				    		elem["userid"]=useridentity;
				    		
						    } else {
						        console.log("Set your timetable first before adding items");
						   }
						
					});
					});
				}



			function sedntymT(){

						receivecolmns();

						setTimeout(function(){	
							var refTimetData = db.collection("TimetableData").doc(useridentity+"row"+dayzindex.value);
				    		refTimetData.set(elem).then(function() {
							    console.log("Document successfully written!");
							})
							.catch(function(error) {
							    console.error("Error writing document: ", error);
							});
							
						},5);						

					}

			sedntymT();
	}


//comfirm whether yes or no delete the timetable item
function comfirmdelete(tobedeleted){
	var edittmdata = document.getElementById("edittmdata");
	//var editfrmdiv =  document.getElementById("editfrmdiv");
	var doctodel;

	edittmdata.style.display="block";//display the delete panel on click of x button

	edittmdata.innerHTML=`
		<div id="editfrmdiv">
			<p style='color:red; text-align:center; font-size:20px; font-weight:bold; padding-top:20vh'>Are you sure you want to delete the Row?</p>
			<button id="deleteTrow" style="width:80px; height:30px; float:left; margin-left:40%;">Yes</button>
			<button id="dontdeleteTrow" style="width:80px; height:30px; float:left;">No</button>
		</div>
	`;

	/*
	editfrmdiv.innerHTML = `
		
	`;
	*/

	//event listener for yes comfirmation
	deleteTrow.addEventListener("click",function(){
			doctodel = tobedeleted.parentNode.parentNode.id;//getting the parent node of the x to determine the row to be deleted

			//putting the row to be deleted information in my database to sync with other apps
			db.collection("rowtochange").doc("rowid").set({
		   		rowid:doctodel
				})
				.then((docRef) => {
				    console.log("row to delete added successfully ");
				})
				.catch((error) => {
				    console.error("Error adding document: ", error);
			});

			var doctodelete = doctodel.split("_")[0]+doctodel.split("_")[1];

			//the actual deleting of the row
			db.collection("TimetableData").doc(doctodelete).delete().then(function() {
				edittmdata.style.display="none";
			}).catch(function(error) {
			    console.error("Error removing document: ", error);
			});



	});

	//closing the delete pane for instance the user doesnt want to delete
	dontdeleteTrow.addEventListener("click",function(){
		edittmdata.style.display="none";
	});

}



function deleteTimetableItem(btn){
	//deleting data from timetable
	var doctodel = btn.parentNode.parentNode.id;
	db.collection("TimetableData").doc(doctodel).delete().then(function() {
    	console.log("Document successfully deleted!");
	}).catch(function(error) {
	    console.error("Error removing document: ", error);
	});

	//removing the row after deleting data	
	var tableel = btn.parentNode.parentNode.parentNode;
	var deletedrw = btn.parentNode.parentNode;
	tableel.removeChild(deletedrw);
}

var colNo = document.getElementById("colNo");
var startHrs = document.getElementById("startHrs");
var strtMin = document.getElementById("strtMin");
var sessHrs = document.getElementById("sessHrs");
colNo.addEventListener("blur",()=>{
	var errcolno = document.getElementById("errcolno");
		if(colNo !=""){
			errcolno.style.display="none";
			colNo.style.border="solid 1px #000";
		}
	});

startHrs.addEventListener("blur",()=>{
	if(startHrs.value != "HRS"){
		errhr.style.display="none";
		startHrs.style.border="solid 1px #000";
	}
});

strtMin.addEventListener("blur",()=>{
	if(strtMin.value != ""){
		errmin.style.display="none";
		strtMin.style.border="solid 1px #000";
	}

});

sessHrs.addEventListener("blur",()=>{
	if(sessHrs.value != "HRS"){
		errsession.style.display="none";
		sessHrs.style.border="solid 1px #000";
	}		
});


function sendtableconfig(){
	var tfrm = document.getElementById("tfrm");
	var frmlstz = document.getElementById("tfrmul");
	var tableheadrow = document.getElementById("tableheadrow");
	var configrespons = document.getElementById("configrespons");
	var newLwInt = document.getElementById("newLwInt");
	var timetandtodo = document.getElementById("timetandtodo");
	var toggtmtablefrm = document.getElementById("toggtmtablefrm");

	var errcolno = document.getElementById("errcolno");
	var errhr = document.getElementById("errhr");
	var errmin = document.getElementById("errmin");
	var errsession = document.getElementById("errsession");
	var configerror = document.getElementById("configerror");

	var useridtoadd = firebase.auth().currentUser.uid;
	var newintvStart;
	configrespons.innerHTML = "";
	timetandtodo.style.display="block";
	toggtmtablefrm.innerHTML = "SHRINK TO HIDE YOUR TIMETABLE DETAILS";


	var colNo = document.getElementById("colNo");
	var startHrs = document.getElementById("startHrs");
	var strtMin = document.getElementById("strtMin");
	var sessHrs = document.getElementById("sessHrs");
	var sessMin = document.getElementById("sessMin");
	var startHrstoMins;
	var startTimeinMins;
	var lowerInterval;
	var mintsvalue;


	if(sessMin.value == ""){
		sessMin.value = 0;
	}


	if(startHrs == null || startHrs == undefined || startHrs == ""){
		newintvStart = newLwInt.value.split(":");
		mintsvalue = newintvStart[1];
		startHrstoMins = parseInt(newintvStart[0]) * 60;
		startTimeinMins =startHrstoMins + parseInt(mintsvalue);
		lowerInterval = newLwInt.value;
	}else{
		mintsvalue = strtMin.value;
		startHrstoMins = parseInt(startHrs.value) * 60;
		startTimeinMins = startHrstoMins + parseInt(mintsvalue);
		lowerInterval = startHrs.value + ":" + mintsvalue;

	}


	if(startHrs){

		if(startHrs.value == "HRS"){
			errhr.style.display="block";
			startHrs.style.border="solid 1px #f00";
			return;
		}else if(strtMin.value == ""){
			errmin.style.display="block";
			strtMin.style.border="solid 1px #f00";
			return;
		}
	}

	
	if(colNo.value == ""){
		errcolno.style.display = "block";
		colNo.style.border="solid 1px #f00";
	}else if(sessHrs.value == "HRS"){
		errsession.style.display="block";
		sessHrs.style.border="solid 1px #f00";
	}else{
		var addSession = (parseInt(sessHrs.value)*60)+(parseInt(sessMin.value));
		var sessionend = startTimeinMins + addSession;

		sessionendHrs = Math.floor(sessionend/60);
		sessionendMin = sessionend%60;

		if(sessionendMin <10){
			sessionendMin = 0 + "" + sessionendMin;
		}
		var upperInterval = sessionendHrs + ":" + sessionendMin;
		
		if(mintsvalue == "" || mintsvalue=="0"){
				mintsvalue="00";
			}

		
		var upperInterval;
	 	var timeInterval = lowerInterval + "-" + upperInterval;


		var colomnColl = db.collection("TimetableConfig");
		colomnColl.where("userid","==",useridtoadd).orderBy("colomnNo","asc").onSnapshot(function(querySnapshot) {
		    querySnapshot.docChanges().forEach(function(change){
		    	if (change.type === "added") {
		    		var nextCol = parseInt(change.doc.data().colomnNo) + 1;
		    	}
			});
		});


	 	addConfigValues(colNo.value,timeInterval,"1");
	}


	
	

}


function delItem(ItemtoDelete){
	var tmtbitemsbookul = document.getElementById("tmtbitemsbookul");
	var itemresponsediv = document.getElementById("itemresponsediv");
	var todocatz = document.getElementById("todocatz");
	itemresponsediv.innerHTML="";
	var removeItemDiv = document.getElementById(ItemtoDelete);
	var remtodocatDiv = document.getElementById(ItemtoDelete+"tdo");

	db.collection("TimetableItems").doc(ItemtoDelete).delete().then(function() {
    	itemresponsediv.innerHTML="Timetable Item successfully deleted!";
	}).catch(function(error) {
	    itemresponsediv.innerHTML="<span style='color:red'>ERROR: Delete Unsuccessfull! </span>" + error;
	});

	tmtbitemsbookul.removeChild(removeItemDiv);
	todocatz.removeChild(remtodocatDiv);
}



function getTimetblItems(){
	var tmtbitemsbook = document.getElementById("tmtbitemsbook");
	var tmtbitemsbookul = document.getElementById("tmtbitemsbookul");
	var todocatz = document.getElementById("todocatz");
	var useridtoadd = firebase.auth().currentUser.uid;
	todocatz.innerHTML.innerHTML=`<option value="" selected="true" disabled="disabled">Select Day</option>`;
	todocatz.innerHTML +=`
	<option id="The Whole Week">The Whole Week</option>
	<option id="Monday">Monday</option>
	<option id="Teusday">Teusday</option>
	<option id="Wednesday">Wednesday</option>
	<option id="Thursday">Thursday</option>
	<option id="Friday">Friday</option>
	<option id="Saturday">Saturday</option>
	<option id="Sunday">Sunday</option>

	`;

	db.collection("TimetableItems").where("userid","==",useridtoadd).onSnapshot(function(querySnapshot) {
	    querySnapshot.docChanges().forEach(function(change){
	    	if (change.type === "added") {
	    		tmtbitemsbookul.innerHTML += `<li id="${change.doc.data().itemIndex}">${change.doc.data().tItem}
	    		<span onclick="delItem('${change.doc.data().itemIndex}')" style="float:right; color:red; font-size:13px; padding:1px;"> X</span></li>`;
	    		//todocatz.innerHTML +=`<option id="${change.doc.data().itemIndex}tdo">${change.doc.data().tItem}</option>`;
	    	}
	    });

	});

}


//getTimetblItems();

function insertitem(){
	var itemname = document.getElementById("itemname");
	var itemresponsediv = document.getElementById("itemresponsediv");
	itemresponsediv.innerHTML="";
	itemvalue = itemname.value;

	if(itemvalue == ""){
		itemresponsediv.innerHTML = "<span style='color:red'>Item value cannot be Empty</span>";
	}else{
		addTimetableItems(itemname.value,"1");
		itemresponsediv.innerHTML = "Timetable Item successfully added.";
	}

}


function remvTdoEdt(){
	var todowrapperedit = document.getElementById("todowrapperedit");
	todowrapperedit.style.display = "none";
}


function closecmfmrdeltodo(){
	var cmfrmDelTodo = document.getElementById("cmfrmDelTodo");
	cmfrmDelTodo.style.display="none";
}


function delTodoItem(indx){
	var cmfrmDelTodo = document.getElementById("cmfrmDelTodo");
	var deleteTodo = document.getElementById("deleteTodo");
	var dontdeleteTodo = document.getElementById("dontdeleteTodo");
	cmfrmDelTodo.style.display = "block";

	deleteTodo.addEventListener("click",function(){
		db.collection("ToDoList").doc(indx).delete().then(function() {
    	console.log("Document successfully deleted!");
		}).catch(function(error) {
		    console.error("Error removing document: ", error);
		});
		closecmfmrdeltodo();
	});

	dontdeleteTodo.addEventListener("click",function(){
		closecmfmrdeltodo()
	});

}


function editTodo(doindex,tododate,timestam){
	var edittmdata = document.getElementById("edittmdata");
	edittmdata.style.display="block";
	edittmdata.innerHTML=`	
			<div id="frmtdoedit">
				<h4 id="hideeditpane" style="color:#ff74c6; margin-top: 5px; border-top:dotted 1px #e1e1e1; border-bottom:dotted 1px #e1e1e1; float:right; padding:0px 5px; font-size: 16px">EXIT</h4>
				<div id="clear"></div>
				<h3 style="color:#04dfff; border-bottom:solid 1px #ccc; margin-bottom: 10px">Todo Item Edit</h3>
				<label>Todo Category</label><br><input id="tDoCatin" type="text" name="" value=""><br><br>
				<label>Todo List Item</label><br><textarea style="height:800px" id="tDoItmin" name="" value=""></textarea>
				<input id="editTdo" style="width:80%; float:none; clear: both; margin-left: 10%; background-color: #04dfff" type="submit" value="Edit ToDo Item">
				<div id="respedttodo"></div>
			</div>

	`;


	CKEDITOR.replace(tDoItmin);

	//getting the current todo items and inserting them in form inputs ready for edit
	var ref = db.collection("ToDoList").doc(doindex);
	ref.get().then(function(doc){
			tDoCatin.value = doc.data().todoCat;
			CKEDITOR.instances.tDoItmin.setData(doc.data().todoItem);
			//tDoItmin.value = doc.data().todoItem;	
	});


	editTdo.addEventListener("click",function(){
		var todocategory = document.getElementById("tDoCatin");
		var respedttodo = document.getElementById("respedttodo");
		var edittmdata = document.getElementById("edittmdata");
		var today = new Date();
	 	var times = Date.now();
	 	var datev = today.getDate()+ "/"+ today.getMonth()+"/"+today.getFullYear() + ", " +today.getHours()+ ":" +today.getMinutes();
	 	var todoitmval =  CKEDITOR.instances.tDoItmin.getData();


		return ref.update({
			tdoIndex:doindex,
			todoCat:todocategory.value,
			todoItem:todoitmval,
			todoDate:tododate,
			timeStamp:timestam,
			editedOn:datev
		}).then(function(){
				todocategory.value="";
				respedttodo.innerHTML=`<p style="color:cyan; font-size:18px; font-style:italic; text-align:center;">Successfully edited the todo list.</p>`;
				setTimeout(()=>{
					edittmdata.style.display="none";
				},800);
		}).catch(err=>{
			respedttodo.innerHTML=`<p style="color:red; font-size:18px; font-style:italic; text-align:center;">An error occurred during edit${err}.</p>`;
		});
	});


	//putting event listener on EXIT button
	hideeditpane.addEventListener("click",function(){
		edittmdata.style.display="none";
		return;
	});
}



/*
var todoindex="";
function editTodo(doindex,tododate,timestam){
	var editTdo = document.getElementById("editTdo");
	todoindex=doindex;
	var todowrapperedit = document.getElementById("todowrapperedit");
	todowrapperedit.style.display = "block";
	var tDoCatin = document.getElementById("tDoCatin");
	var tDoItmin = document.getElementById("tDoItmin");
	var ref = db.collection("ToDoList").doc(todoindex);
	console.log(todoindex);
	ref.get().then(function(doc){
		tDoCatin.value = doc.data().todoCat;
		tDoItmin.value = doc.data().todoItem;
	});

	editTdo.addEventListener("click",function(){
		var today = new Date();
	 	var times = Date.now();
	 	var datev = today.getDate()+ "/"+ today.getMonth()+"/"+today.getFullYear() + ", " +today.getHours()+ ":" +today.getMinutes();

		return ref.update({
			tdoIndex:todoindex,
			todoCat:tDoCatin.value,
			todoItem:tDoItmin.value,
			todoDate:tododate,
			timeStamp:timestam,
			editedOn:datev
		}).then(function(){
			console.log(tDoItmin.value);
				tDoCatin.value="";
				tDoItmin.value="";
				console.log("successfull!!");

		});
	});

}
*/



function getTodo(){
	var tmtbitemsbook = document.getElementById("todoitemsbook");
	var respedttodo = document.getElementById("respedttodo");
	var todolistmainprev = document.getElementById("todolistmainprev");
	var tmtbitemsbookul = document.getElementById("todoitemsbookul");
	var useridentity = firebase.auth().currentUser.uid;
	var todoColl = db.collection("ToDoList");
	todolistmainprev .innerHTML = "";
	tmtbitemsbook.innerHTML = "";
	todolistmainprev .innerHTML='<h1 style="text-align: center; font-size: 24px; border-bottom: #00f 2px solid; font-weight: bold">My Daily To Do List</h1>';

	todoColl.where("userid","==",useridentity).orderBy("timeStamp","asc").onSnapshot(function(querySnapshot) {
	    querySnapshot.docChanges().forEach(function(change){
	    	var todoLitem = change.doc.data().todoItem;
	    	var ftodo = todoLitem.replace(/\r?\n/g, '</li><li>');
	    	var todolitemstr = todoLitem;
	    	var todolsubstr = todolitemstr.substr(0,100);
	    	if (change.type === "added") {
	    		tmtbitemsbook.innerHTML += `<div id="${change.doc.data().tdoIndex}tdo">
	    		<h4 id="todoheading${change.doc.data().tdoIndex}" style="margin-top:20px">${change.doc.data().todoCat}</h4>
	    		<div id="todoinnercon${change.doc.data().tdoIndex}">${todolsubstr}<span style="font-weight:bold;"> ...</span></div>
	    		<p style='font-size:11px; color:#006d7d; float:right'><span onclick="editTodo('${change.doc.data().tdoIndex}','${change.doc.data().todoDate}','${change.doc.data().timeStamp}')">Edit </span>|<span onclick="delTodoItem('${change.doc.data().tdoIndex}')"> Delete</span></p><div id='clear'></div>
	    		</div>`;


	    		todolistmainprev.innerHTML += `<div id="${change.doc.data().tdoIndex}tdomain" class="todomainpre"><h4 id="todoheadingm${change.doc.data().tdoIndex}" style="margin-top:20px">${change.doc.data().todoCat}</h4>
	    		<div id="todoinnerconm${change.doc.data().tdoIndex}">${todoLitem}</div>
	    		<div id='clear'></div></div>`;
	    	}

	    	if (change.type === "modified") {
	    		//on modify todo list change values in all the apps
	    		document.getElementById("todoheading"+change.doc.data().tdoIndex).innerHTML=change.doc.data().todoCat;
	    		document.getElementById("todoheadingm"+change.doc.data().tdoIndex).innerHTML=change.doc.data().todoCat;
	    		document.getElementById("todoinnercon"+change.doc.data().tdoIndex).innerHTML=todoLitem;
	    		document.getElementById("todoinnerconm"+change.doc.data().tdoIndex).innerHTML=todoLitem;	    			    			    		
	    		console.log("modified");
	    	}

	    	if (change.type === "removed") {
	    		var todoDelete = document.getElementById(change.doc.data().tdoIndex+"tdo");
	    		var todoDeletem = document.getElementById(change.doc.data().tdoIndex+"tdomain");
	    		tmtbitemsbook.removeChild(todoDelete);
	    		todolistmainprev.removeChild(todoDeletem);
	    	}
	    });

	});

}

//getTodo();

function inserttodo(){
	var todocatz = document.getElementById("todocatz");
	var itemresponsediv = document.getElementById("itemresponsedivtdo");
	var addtodowrapper = document.getElementById("addtodowrapper");
	var addtdo = document.getElementById("addtdo");
	var todocatzval = todocatz.value;
	var itemvalue = CKEDITOR.instances.todoname.getData();

	var today = new Date();
 	var times = Date.now();
 	var datev = today.getDate()+ "/"+ today.getMonth()+"/"+today.getFullYear() + ", " +today.getHours()+ ":" +today.getMinutes();


	if(todocatzval == ""){
		itemresponsediv.innerHTML="<span style='color:red'>Select a Todolist Category First</span>";
	}else if(itemvalue == ""){
		itemresponsediv.innerHTML="<span style='color:red'>The Todolist Items cannot be empty</span>";
	}else{
		addToDoList(todocatz.value,itemvalue,"1",datev,times);
		itemresponsediv.innerHTML="The Todolist Items Successfully added!";
		itemname.value = "";
		setTimeout(()=>{
			addtodowrapper.style.display="none";
			addtdo.style.border="solid 1px #fff";
			addtdo.style.color="#fff";
			addtdo.innerHTML="Open Add ToDo";

		},500);
		
	}
}


function sendTimetv(){
	var table = document.getElementById("table");
	var tfrmul = document.getElementById("tfrmul");
	//console.log(tfrmul);
	var dayzindex = document.getElementById("dayzindex");
	dayzindexval = dayzindex.value;

		if(dayzindexval == 1){
			dayzindexval = "Mon";
		}else if(dayzindexval == 2){
			dayzindexval = "Teu";
		}else if(dayzindexval == 3){
			dayzindexval = "Wed";
		}else if(dayzindexval == 4){
			dayzindexval = "Thur";
		}else if(dayzindexval == 5){
			dayzindexval = "Fri";
		}else if(dayzindexval == 6){
			dayzindexval = "Sat";
		}else if(dayzindexval == 7){
			dayzindexval = "Sun";
		}
	
		var ctr = document.createElement("tr");
		ctr.id = dayzindexval;
		ctr.innerHTML=`
				<td>${dayzindexval}</td>
				<td id="edt${dayzindexval}">X | Edit</td>
		`;

		table.appendChild(ctr);

		var timerow = document.getElementById(dayzindexval);
		var edtdata = document.getElementById("edt"+dayzindexval);


//===============INSERTING DATA TO THE TABLE=================
var colomnColl = db.collection("TimetableConfig");
	colomnColl.orderBy("colomnNo","asc").onSnapshot(function(querySnapshot) {
	    querySnapshot.docChanges().forEach(function(change){
	    	if (change.type === "added") {
	    		var colomnlength = querySnapshot.size;
	    		var ids = change.doc.data().colomnNo;
				var i2 = document.getElementById("items"+ids);
				var i2val = i2.value;
				var tabldata = document.createElement("td");
				tabldata.innerHTML = i2val;
				timerow.insertBefore(tabldata, edtdata);
				
			}
		});
	});


	
}

//====================end of timetable area==========================================

//var resp = document.getElementById("resp");
//resp.innerHTML ="";


function toggleaddquote(){
	var wrapperin = document.getElementById("wrapperin");
	var addquotewrapper = document.getElementById("addquotewrapper");
	 

	 //var resp = document.getElementById("resp");
	 var catwindow = document.getElementById("catwindow");
	 //resp.innerHTML = "";

setTimeout(()=>{
	if(window.getComputedStyle(addquotewrapper).display == "none"){
	 	addquotewrapper.style.display = "block";
	 	var createfrmadd = document.createElement("div");
	 	createfrmadd.id="frmadd";
	 	createfrmadd.innerHTML=`
			<h2>My Quotes Console</h2>
				<label>Quote or Note?</label><br>
				<select id="type">
					<option value="note">Note</option>
					<option value="quote">Quote</option>
				</select><br><br><br>

				<label>Title:</label><br>
				<input type="text" id="title"><br><br><br>

				<label>Quote:</label><br>
				<textarea name="message" id="message"></textarea><br><br><br>

				<label>Author:</label><br>
				<input type="text" id="author"><br><br><br>

				<label>Quote Category:</label><br>
				<select id="catadd">
				</select><br><br>
				<input type="submit" onclick="insertQuote(); return false" name="submit" class="submit" value="ADD QUOTE">
				<div id="response"><p id="resp"></p></div>
				<div id="toedit" onclick="toggleaddquote();">
				<h2>VIEW THE QUOTES - HOME</h2>
			</div>
	 	`;

	 	wrapperin.appendChild(createfrmadd);
	 	CKEDITOR.replace(message);
	 	getcategstoaddq();

	 	addq.innerHTML="Close Window";
	 	addq.style.border="solid 1px #f00";
	 	addq.style.color="red";
	 }else if(window.getComputedStyle(addquotewrapper).display == "block"){
	 	var frmadd = document.getElementById("frmadd");
	 	addquotewrapper.style.display = "none";
	 	addq.innerHTML="Add Quote";
	 	addq.style.border="solid 1px #fff";
	 	addq.style.color="#fff";
	 	frmadd.remove();
	 }
},200)
	 
	 	setTimeout(()=>{
			var addq = document.getElementById("addq");
			var addtdo = document.getElementById("addtdo");
			if(window.getComputedStyle(wrapper1).display == "none"){
				addq.style.display="none";
				addtdo.style.display="block";
			}else if(window.getComputedStyle(wrapper1).display == "block"){
				addq.style.display="block";
				addtdo.style.display="none";
			}
			console.log(window.getComputedStyle(wrapper1).display);
			},500);
	
	

/*
	 catwindow.addEventListener('click',function(){
			addquotewrapper.style.display="none";
			addq.innerHTML="Open Add Quotes";
		});
		*/

}

function exiteditquote(){
		var addquotewrapperedit = document.getElementById("addquotewrapperedit");
		addquotewrapperedit.style.display = "none";

	}


function toggleaddcat(){
	var addbox = document.getElementById("addbox");
	var addsign =document.getElementById("addsign");
	var catresponsediv = document.getElementById("catresponsediv");

	if(window.getComputedStyle(addbox).opacity == "0"){		
		addbox.style.opacity="1";
		addbox.style.visibility="visible";
		addsign.innerHTML = "-";
	}else{
		addbox.style.opacity="0";
		addbox.style.visibility="hidden";
		addsign.innerHTML = "+";
		catresponsediv.innerHTML="";
	}
	
}



function toggleconfigtime(){
	var addbox = document.getElementById("tmtconfig");
	var addbox2 = document.getElementById("additemsboxes");
	var addbox3 = document.getElementById("todoboxes");
	var addsign =document.getElementById("shwconfigtime");
	var addsign2 =document.getElementById("shwitems");
	var addsign3 =document.getElementById("shwtodo");

	if(window.getComputedStyle(addbox).display == "none"){		
		addbox.style.display="block";
		addbox2.style.display="none";
		addbox3.style.display="none";
		addsign.innerHTML = "-";
		addsign2.innerHTML = "+";
		addsign3.innerHTML = "+";
	}else{
		addbox.style.display="none";
		addsign.innerHTML = "+";
	}

}

function toggleshwitems(){
	var addbox = document.getElementById("additemsboxes");
	var addbox2 = document.getElementById("tmtconfig");
	var addbox3 = document.getElementById("todoboxes");
	var addsign =document.getElementById("shwitems");
	var addsign2 =document.getElementById("shwconfigtime");
	var addsign3 =document.getElementById("shwtodo");
	if(window.getComputedStyle(addbox).display == "none"){		
		addbox.style.display="block";
		addbox2.style.display="none";
		addbox3.style.display="none";
		addsign.innerHTML = "-";
		addsign2.innerHTML = "+";
		addsign3.innerHTML = "+";
	}else{
		addbox.style.display="none";
		addsign.innerHTML = "+";
	}
}


function toggletodolist(){
	var addbox = document.getElementById("todoboxes");
	var addbox2 = document.getElementById("tmtconfig");
	var addbox3 = document.getElementById("additemsboxes");
	var addsign =document.getElementById("shwtodo");
	var addsign2 =document.getElementById("shwconfigtime");
	var addsign3 =document.getElementById("shwitems");

	if(window.getComputedStyle(addbox).display == "none"){		
		addbox.style.display="block";
		addbox2.style.display="none";
		addbox3.style.display="none";
		addsign.innerHTML = "-";
		addsign2.innerHTML = "+";
		addsign3.innerHTML = "+";
	}else{
		addbox.style.display="none";
		addsign.innerHTML = "+";
	}
}


function togglecat(){
	var catwindow = document.getElementById("catwindow");
	var catforeground = document.getElementById("catforeground");
	 var cat=document.getElementById("catz");
	 
    	     cat.addEventListener('click',function(){
                if(window.getComputedStyle(catwindow).opacity == "0"){
            		catwindow.style.left="0px";
            		catwindow.style.opacity="0.99";
            		catforeground.style.opacity="1";
            		catforeground.style.left="60%";
            		catforeground.style.right="0px";
            	    }else{
            		catwindow.style.left="-61%";
            		catwindow.style.opacity="0";
            		catforeground.style.left="-40%";
            		catforeground.style.right="101%";    
        	    }
             });
}


function clickoutmenu(){
	var catwindow = document.getElementById("catwindow");
	var catforeground = document.getElementById("catforeground");
	
		document.addEventListener('click', function (event) {
			if(window.getComputedStyle(catwindow).opacity == "0.99"){
			    if (!event.target.closest('#catwindow')){
			    	catwindow.style.left="-61%";
					catwindow.style.opacity="0";
					catforeground.style.opacity="0";
					catforeground.style.left="-40%";
    				catforeground.style.right="101%"; 
			    }
		    }
			}, false);

}



function togglecomment(divno){
	var info = divno.parentNode;
	var quotecon = info.parentNode;
	var num = Array.from(quotecon.parentNode.children).indexOf(quotecon);
	var wrapper1child = document.getElementById("wrapper1").children;
	var innerchildren = wrapper1child[num].children;
	var commentdiv = innerchildren[2];
	if(window.getComputedStyle(commentdiv).visibility == "hidden"){
		commentdiv.style.visibility="visible";
		commentdiv.style.height = "auto";
		commentdiv.style.display="block";
	}else{
		commentdiv.style.visibility="hidden";
		commentdiv.style.height = "0px";
		commentdiv.style.display="none";
	}
}




function togglecomments(divno){
	var info = divno.parentNode;
	var quotecon = info.parentNode;
	var num = Array.from(quotecon.parentNode.children).indexOf(quotecon);
	var wrapper1child = document.getElementById("wrapper1sort").children;
	var innerchildren = wrapper1child[num].children;
	var commentdiv = innerchildren[2];
	if(window.getComputedStyle(commentdiv).visibility == "hidden"){
		commentdiv.style.visibility="visible";
		commentdiv.style.height = "auto";
		commentdiv.style.display="block";
	}else{
		commentdiv.style.visibility="hidden";
		commentdiv.style.height = "0px";
		commentdiv.style.display="none";
	}
	

}



function addQoutes(qtype,quoteid,title,message,author,date,cat,index){
	let useridtoadd = firebase.auth().currentUser.uid;
	var ref = db.collection("myQuotes").doc();
	referenceid = ref.id;
		ref.set({
			qtype:qtype,
		  	quotetitle : title,
			quote : message,
			author : author,
			date : date,
			cat:cat,
			identity:quoteid=referenceid,
			indexid:index,
			userid:useridtoadd
		})
		.then(function() {
			//addednewdoc = true;
			//wrapper1.prepend(wrapper1.lastElementChild);
			//window.scrollTo({ top: 0, behavior: 'smooth' });
		})
		.catch(function(error) {
		    //resp.innerHTML = "<p style='color:#f00'>Error posting the quote: </p>" + error;
		});
}


function addcat(name){
	let usernametouse = firebase.auth().currentUser.uid;
	var catresponsediv = document.getElementById("catresponsediv");
	var ref = db.collection("categories").doc();
	ref.set(
			{
				name:name,
				catid:ref.id,
				userid:usernametouse
			}
		).then(function() {
		    catresponsediv.innerHTML = "Category Successfully Added.";
		})
		.catch(function(error) {
		   catresponsediv.innerHTML = "<p style='color:#f00'>Error adding Category: </p>" + error;
		});
}


function addtocomment(name,comment,date,quoteid){
	var ref = db.collection("comments").doc();
	ref.set(
			{
				name:name,
				comment:comment,
				date:date,
				commentid:ref.id,
				quoteid:quoteid
			}
		).then(function() {
		   console.log("Successfully posted the note!");
		})
		.catch(function(error) {
		    console.log("Error posting the comment: ", error);
		});

}


//WHEN YOU CLICK THE SUBMIT QUOTE BUTTON
function insertQuote(){
 	resp.innerHTML = "";
	var frmadd = document.getElementById("frmadd");
	var addquotewrapper = document.getElementById("addquotewrapper");
	var addq = document.getElementById("addq");
	var frmchild = frmadd.children;
	var type	= frmchild[3];
	var title	= frmchild[9];
	var message = CKEDITOR.instances.message.getData();
	var author = frmchild[22];
	var cat = frmchild[28];

		typev = type.value;
		titlev = title.value;
		authorv = author.value;
		catv = cat.value;		

 	var today = new Date();
 	var times = Date.now();
 	var datev = today.getDate()+ "/"+ today.getMonth()+"/"+today.getFullYear() + ", " +today.getHours()+ ":" +today.getMinutes();


 	if (message === "") {
 		resp.innerHTML = "<p style=color:red;>ERROR: The quote cannot be empty please!!</p>";		
 	}else{
 	addQoutes(typev,1,titlev,message,authorv,datev,catv,times);
	title.value = "";
	message.value = "";
	author.value = "";
	cat.value = "";
	addednewdoc = true;
	setTimeout(()=>{
		frmadd.remove();
		addquotewrapper.style.display="none";
		addq.style.border="solid 1px #fff";
		addq.style.color="#fff";
		addq.innerHTML="Add a Record";
	},1000);	

 	}

 }



function deleteQuote(d,ident){

 	var dialog = document.getElementById("dialog");
	var dmessage = document.getElementById("dmessage");
	var idnum =ident;

 	dmessage.innerHTML = `<p>
 							Are you sure you want to delete quote <span style='font-style:italic; font-weight:bold; color:#0b507c'>"` + d +`"</span>
 						</p>
							
							<div class="row">
								<button onclick="deleteq('`+idnum+`')">YES</button>
								<button onclick="exitdialogue()">NO</button>
							</div>

 						`;




 	dialog.style.display = "block";

 	dialogw = dialog.offsetWidth;
	dmessagew = dmessage.offsetWidth;
	var mleft = (dialogw/2) - (dmessagew/2);
	dmessage.style.marginLeft = mleft + "px";

	var dialogh = dialog.offsetHeight;
	var dmessageh = dmessage.offsetHeight;
	var mtop = (dialogh/2) - (dmessageh/2);
	dmessage.style.marginTop = mtop + "px";

 	}



 	function exitdialogue(){
 		var dialog = document.getElementById("dialog");
 		dialog.style.display = "none";
 	}


 	function deleteq(idtodelete){
 		var quoteid = idtodelete;
 		db.collection("myQuotes").doc(idtodelete).delete().then(function() {
			    console.log("Document successfully deleted!");
			}).catch(function(error) {
			    console.error("Error removing document: ", error);
		});

 		exitdialogue();	

 	}

 	function deletecateg(cattodelete){
 		var edittmdata = document.getElementById("edittmdata");
 		edittmdata.innerHTML = `
 		<h3 style="font-weight:bold; margin-top:30vh; color:#fff; text-align:center">Are you sure you want to delete the quotes category item?</h3>
 		<button id="nodonttmi">No</button>
 		<button id="yesdotmi" style="width:80px; line-height:30px; font-weight:bold;">Yes</button>
 		<p style="text-align:center; color:#00FFFF; font-style:italic;" id="respdelcat"></p>

 		`;

 		edittmdata.style.display="block";

 		nodonttmi.addEventListener("click",()=>{
 			edittmdata.style.display="none";
 		});

		yesdotmi.addEventListener("click",()=>{
			db.collection("categories").doc(cattodelete).delete().then(function() {
				respdelcat.innerHTML="Category item successfully deleted.";
				setTimeout(()=>{
					edittmdata.style.display="none";
				},800);
			    //console.log("Category successfully deleted!");
			}).catch(function(error) {
				respdelcat.innerHTML=`<span style='color:red'>Error removing the category:${error}</span>`;
			    console.error("Error removing the category: ", error);
			});		

		});


 	}

/*

 	function deletecateg(cattodelete){
 		db.collection("categories").doc(cattodelete).delete().then(function() {
			    console.log("Category successfully deleted!");
			}).catch(function(error) {
			    console.error("Error removing the category: ", error);
		});

 	}
 	*/



function getvaluestoedit(geturlid){
	urlid = geturlid;
	//var addquotewrapperedit = document.getElementById("addquotewrapperedit");


	//creating and appending the edit quote window
	var bdy = document.getElementsByTagName("body")[0];
	var addquotewrapperedit = document.createElement("div");
	addquotewrapperedit.id="addquotewrapperedit";

	addquotewrapperedit.innerHTML=`
		<div id="wrapperinedit">	
			<div id="frmedit">
				<h2>EDIT QUOTES CONSOLE</h2>

				<label>Quote or Note?</label><br>
				<input type="text" id="typeed"><br><br><br>

				<label>Title:</label><br>
				<input type="text" id="titleed"><br><br><br>

				<label>Quote:</label><br>
				<textarea id="messageedt"></textarea><br><br><br>

				<label>Author:</label><br>
				<input type="text" id="authored"><br><br><br>

				<label>Quote Category:</label><br>
				
				<input type="text" id="cated">

				<input type="submit" id="editquote" name="submit" class="submit" value="EDIT QUOTE">

				<div id="responsed"><p id="respded"></p></div>

			</div>

			<div id="toeditedit" onclick="exitaddq();">
				<h2>EXIT EDIT QUOTE</h2>
			</div>
		</div>
	`;
	bdy.appendChild(addquotewrapperedit);
	addquotewrapperedit.style.display="block";
	var wrapper1 = document.getElementById("wrapper1");
	CKEDITOR.replace(messageedt);

var resp = document.getElementById("respd");	
	var toedit = db.collection("myQuotes").doc(urlid);
	toedit.get().then(function(docs){	
		CKEDITOR.instances.messageedt.setData(docs.data().quote);
		typeed.value = docs.data().qtype;
		titleed.value = docs.data().quotetitle;
		authored.value = docs.data().author;
		cated.value = docs.data().cat;
		
	});


	//UPDATE DATA TO THE DATABASE ON  CLICKING
		editquote.addEventListener("click",function(){
			var messageel = CKEDITOR.instances.messageedt.getData();
		 	if (messageel === "") {
		 		resp.innerHTML = "<p style='color:red; width:100%'>ERROR: The quote cannot be empty please!!</p>";		
		 	}else{		
		 		var tedit = db.collection("myQuotes").doc(urlid);
		 		return tedit.update({
		 			qtype: typeed.value,
					quotetitle : titleed.value,
					quote : messageel,
					author : authored.value,
					cat : cated.value
				}).then(function() {
				    respded.innerHTML = "<p style='color:#71ff66; font-style: italic; font-family: tahoma; font-weight: bold;'>Quote successfully updated</p>";
				    setTimeout(e=>{
				    	typeed.innerHTML = "";
						addquotewrapperedit.style.display="none";
						addquotewrapperedit.remove();
				    },300);
				})
				.catch(function(error) {
				    respded.innerHTML = "<p style='color:#f00'>An Error Occured during update </p>" + error;
				});
		 	}
		});
}



function exitaddq(){
	var addquotewrapperedit = document.getElementById("addquotewrapperedit");
	var respd =  document.getElementById("respd");
	typeed.innerHTML = "";
	addquotewrapperedit.style.display="none";
	addquotewrapperedit.remove();
}


function insertcat(){
	var catname = document.getElementById("catname");
	var catresponsediv = document.getElementById("catresponsediv");

	if(catname.value !=""){
		addcat(catname.value);
	}else{
		catresponsediv.innerHTML = "<span style='color:red'>Category name cannot be empty</span>";
	}

	catname.value="";
}


function getcategs(){
	var catlist = document.getElementById("catlist");
	//var frmadd = document.getElementById("frmadd");
	var catresponsediv = document.getElementById("catresponsediv");
	let useidlogged = firebase.auth().currentUser.uid;
	//var frmchild = frmadd.children;
	//var cat = document.getElementById("catadd");

	db.collection("categories").where("userid","==",useidlogged).onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change){
    	if (change.type === "added") {
    		catlist.innerHTML+=
				`
				<p class="catr" id="c`+change.doc.data().catid+`" onclick="loadclickedQuotes(null,'`+change.doc.data().name+`','');">`+change.doc.data().name+`<span class="decat" onclick="event.stopPropagation(); deletecateg('`+change.doc.data().catid+`')">x</span></p>

				`
    	}

      if (change.type === "removed") {
 				var select = document.querySelector("#c"+change.doc.data().catid);
 				catlist.removeChild(select);
 				catresponsediv.innerHTML = "<p style='color:#f0b5fb'>Category Successfully Removed</p>";
       }
    	});
    });

}


function getcategstoaddq(){
	let useidlogged = firebase.auth().currentUser.uid;
	catadd.innerHTML="";
	db.collection("categories").where("userid","==",useidlogged).onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change){
    	if (change.type === "added") {
			catadd.innerHTML+=`
			<option>${change.doc.data().name}</option>
			`;
    	}

      if (change.type === "removed") {
 			var select = document.querySelector("#c"+change.doc.data().catid);	
       }
    	});
    });

}



//compressing to see less
function readless(ident){
	var docRef = db.collection("myQuotes").doc(ident);

	var readalldiv = document.querySelector("#notes"+ident);

	//scrolling to where the quote was previously
	var prevposition = localStorage.getItem("scrollPosition");
	setTimeout(function(){
		window.scrollTo(0, prevposition);
	},10);


	docRef.get().then(function(doc) {
		var notes = doc.data().quote
		notes = notes.substring(0,250)+`...<span class="readmore" onclick="readall('`+ident+`')"> Read more</span>`;
		readalldiv.innerHTML = 	notes;
	});
}


function readlessq(ident){
	var docRef = db.collection("myQuotes").doc(ident);
	var readalldiv = document.querySelector("#notes"+ident);
	//scrolling to where the quote was previously
	var prevposition = localStorage.getItem("scrollPosition");
	setTimeout(function(){
		window.scrollTo(0, prevposition);
	},10);

	docRef.get().then(function(doc) {
		var notes = doc.data().quote
		notes = notes.substring(0,250)+`...<span class="readmore" onclick="readallq('`+ident+`')"> Read more</span>`;
		readalldiv.innerHTML = notes;		
	});
}


//contracting with see less in category area
function readlessqcat(ident){
	var docRef = db.collection("myQuotes").doc(ident);
	var readalldiv = document.querySelector("#notesc"+ident);
	//scrolling to where the quote was previously
	var prevposition = localStorage.getItem("scrollPosition");
	setTimeout(function(){
		window.scrollTo(0, prevposition);
	},10);

	docRef.get().then(function(doc) {
		var notes = doc.data().quote
		notes = notes.substring(0,250)+`...<span class="readmore" onclick="readallqcat('`+ident+`')"> Read more</span>`;
		readalldiv.innerHTML = notes;		
	});

}

//expanding the quote to see more
function readall(ident){
	var docRef = db.collection("myQuotes").doc(ident);
	var readalldiv = document.querySelector("#notes"+ident);
	var scrllposition = window.pageYOffset;
	localStorage.setItem("scrollPosition",scrllposition);

	docRef.get().then(function(doc) {
		var notes = doc.data().quote+`<br><span class="readmore" onclick="readless('`+ident+`')"> See less</span>`;
		readalldiv.innerHTML = notes;		
	});

}


function readallq(ident){
	var docRef = db.collection("myQuotes").doc(ident);
	var readalldiv = document.querySelector("#notes"+ident);
	var scrllposition = window.pageYOffset;
	localStorage.setItem("scrollPosition",scrllposition);

	docRef.get().then(function(doc) {
		var notes = doc.data().quote+`<br><span class="readmore" onclick="readlessq('`+ident+`')"> See less</span>`;
		readalldiv.innerHTML = notes;
	});

	
}

//expadning the quotes in category region
function readallqcat(ident){
	var docRef = db.collection("myQuotes").doc(ident);
	var readalldiv = document.querySelector("#notesc"+ident);
	var scrllposition = window.pageYOffset;
	localStorage.setItem("scrollPosition",scrllposition);

	docRef.get().then(function(doc) {
		var notes = doc.data().quote+`<br><span class="readmore" onclick="readlessqcat('`+ident+`')"> See less</span>`;
		readalldiv.innerHTML = notes;
	});

}


function loadNextQuoteBatch(lastdivindex){
	

}

var quotetypevar = null;
var quotecategvar = null;


function getQuotes(quotetype,quotecateg,doctoloadfrm){
		quotetypevar = quotetype;
		quotecategvar = quotecateg;
		var wrapper1 = document.getElementById("wrapper1");
		var testing = document.getElementById("testing");
		let useidlogged = firebase.auth().currentUser.uid;
		//wrapper1.innerHTML="";
		var wrapper1sort = document.getElementById("wrapper1sort");
		wrapper1sort.style.display="none";
		wrapper1.style.display="block";
		let query = db.collection("myQuotes").where("userid","==",useidlogged);

		let filterclause = null;

		if(quotecategvar == null){
			if(quotetypevar == "" || quotetypevar == null){
				filterclause = query;
				}else{
					filterclause = query.where("qtype","==",quotetype);
				}
		}else{
			filterclause = query.where("cat","==",quotecategvar);
		}

		let filterandordered = filterclause.orderBy("indexid","desc");
		
	 	filterandordered.startAfter(doctoloadfrm).limit(10).onSnapshot(function(querySnapshot) {

	    querySnapshot.docChanges().forEach(function(change){
	    	//console.log(change.doc.data());


	    		if (change.type === "added") {

	    				//creating a substring where there is a long string
		    			if(change.doc.data().qtype == "quote"){
			    			var notes = change.doc.data().quote;

							if(notes.length > 250){
								notes = notes.substring(0,250)+`...<span class="readmore" onclick="readallq('`+change.doc.data().identity+`')"> Read more</span>`;
							}

	    					wrapper1.innerHTML +=`
									<div id="id${change.doc.data().identity}" class="q${change.doc.data().identity} quotecon">
										<div id="title">
											<h1> `+ change.doc.data().quotetitle + `</h1>
										</div>
										<div id="quote">
											<div class="qts" id="notes${change.doc.data().identity}">${notes}</div>
										</div>

										<div id="commentdiv">
											<div id="vcomments">
												<div id="macomments`+change.doc.data().identity+`">									
												</div>
											</div>
											<div id="cerror`+change.doc.data().identity+`">
											</div>

													<input type="text" id="names`+change.doc.data().identity+`" placeholder="Type your name">
													<input type="text" id="comments`+change.doc.data().identity+`" placeholder="Write a Comment">
													<button class="sendbtn" onclick="commenttable('`+change.doc.data().identity+`')">Send Comment</button>
										
											<div id="clear"></div>
										</div>

										<div id="editing">
											<ul>
											<li onclick="getvaluestoedit('`+change.doc.data().identity+`')">Edit</li>
											<li onclick="deleteQuote('`+change.doc.data().quotetitle+`','`+change.doc.data().identity+`')">Delete</li>
											</ul>

											<div id="clear"></div>
										</div>
											
										<div id="info">
											<p id="comment" onclick="togglecomment(this); return false">comment</p>
											<p id="author">author:`+change.doc.data().author+`</p>
											<p id="date">date:`+change.doc.data().date+`</p>
											
										</div>
										<div id="clear">
										</div>
									</div>
								`;
								
		            }else if(change.doc.data().qtype == "note"){
		            	var notes = change.doc.data().quote;
						//notes = notes.replace(/\r?\n/g, '</li><li>');

						if(notes.length > 250){
							notes = notes.substring(0,250)+`...<span class="readmore" onclick="readall('`+change.doc.data().identity+`')"> Read more</span>`;
						}


		            	wrapper1.innerHTML +=`
										<div id="id${change.doc.data().identity}" class="q${change.doc.data().identity} quotecon">
											<div id="title">
												<h1> `+ change.doc.data().quotetitle + `</h1>
											</div>
											<div id="quote">
												<div class="nts" id="notes`+change.doc.data().identity+`">`+notes+`</div>
											</div>

											<div id="commentdiv">
												<div id="vcomments">
													<div id="macomments`+change.doc.data().identity+`">									
													</div>
												</div>
												<div id="cerror`+change.doc.data().identity+`">
												</div>

														<input type="text" id="names`+change.doc.data().identity+`" placeholder="Type your name">
														<input type="text" id="comments`+change.doc.data().identity+`" placeholder="Write a Comment">
														<button class="sendbtn" onclick="commenttable('`+change.doc.data().identity+`')">Send Comment</button>
											
												<div id="clear"></div>
											</div>

											<div id="editing">
												<ul>
												<li onclick="getvaluestoedit('`+change.doc.data().identity+`')">Edit</li>
												<li onclick="deleteQuote('`+change.doc.data().quotetitle+`','`+change.doc.data().identity+`')">Delete</li>
												</ul>

												<div id="clear"></div>
											</div>
												
											<div id="info">
												<p id="comment" onclick="togglecomment(this); return false">comment</p>
												<p id="author">author:`+change.doc.data().author+`</p>
												<p id="date">date:`+change.doc.data().date+`</p>
												
											</div>
											<div id="clear">
											</div>
										</div>
									`;			

		            }else{
		            	wrapper1.innerHTML +=`
										<div id="quotecon" class="q`+change.doc.data().identity+`">
											<div id="title">
												<h1> `+ change.doc.data().quotetitle + `</h1>
											</div>
											<div id="quote">
												<p>`+change.doc.data().quote+`</p>
											</div>

											<div id="commentdiv">
												<div id="vcomments">
													<div id="macomments`+change.doc.data().identity+`">									
													</div>
												</div>
												<div id="cerror`+change.doc.data().identity+`">
												</div>

														<input type="text" id="names`+change.doc.data().identity+`" placeholder="Type your name">
														<input type="text" id="comments`+change.doc.data().identity+`" placeholder="Write a Comment">
														<button class="sendbtn" onclick="commenttable('`+change.doc.data().identity+`')">Send Comment</button>
											
												<div id="clear"></div>
											</div>

											<div id="editing">
												<ul>
												<li onclick="getvaluestoedit('`+change.doc.data().identity+`')">Edit</li>
												<li onclick="deleteQuote('`+change.doc.data().quotetitle+`','`+change.doc.data().identity+`')">Delete</li>
												</ul>

												<div id="clear"></div>
											</div>
												
											<div id="info">
												<p id="comment" onclick="togglecomment(this); return false">comment</p>
												<p id="author">author:`+change.doc.data().author+`</p>
												<p id="date">date:`+change.doc.data().date+`</p>
												
											</div>
											<div id="clear">
											</div>
										</div>
									`;
									
		            }

		            if(addednewdoc == true){
		            	wrapper1.prepend(wrapper1.lastElementChild);
						window.scrollTo({ top: 0, behavior: 'smooth' });
						addednewdoc = false;
		            }




	            }


	            if (change.type === "modified") {
	            	var tomodify = document.getElementsByClassName("q"+change.doc.data().identity);
	 				var select = document.querySelector(".q"+change.doc.data().identity);
	 				select.innerHTML=`<div id="title">
											<h1> `+ change.doc.data().quotetitle + `</h1>
										</div>
										<div id="quote">
											<p>`+change.doc.data().quote+`</p>
										</div>

										<div id="commentdiv">
											<div id="vcomments">
												<div id="macomments`+change.doc.data().identity+`">									
												</div>
											</div>
											<div id="cerror`+change.doc.data().identity+`">
											</div>

													<input type="text" id="names`+change.doc.data().identity+`" placeholder="Type your name">
													<input type="text" id="comments`+change.doc.data().identity+`" placeholder="Write a Comment">
													<button class="sendbtn" onclick="commenttable(`+change.doc.data().identity+`)">Send Comment</button>
										
											<div id="clear"></div>
										</div>

										<div id="editing">
											<ul>
											<li onclick="getvaluestoedit('`+change.doc.data().identity+`')">Edit</li>
											<li onclick="deleteQuote('`+change.doc.data().quotetitle+`','`+change.doc.data().identity+`')">Delete</li>
											</ul>

											<div id="clear"></div>
										</div>
											
										<div id="info">
											<p id="comment" onclick="togglecomment(this); return false">comment</p>
											<p id="author">author:`+change.doc.data().author+`</p>
											<p id="date">date:`+change.doc.data().date+`</p>
											
										</div>
										<div id="clear">
										</div>`;
					console.log("modified");

	            }


	            if (change.type === "removed") {
	 				var todelete = document.getElementsByClassName(change.doc.data().identity);
	 				var select = document.querySelector(".q"+change.doc.data().identity);
	 				wrapper1.removeChild(select);
	            }  

			displaycomments(change.doc.data().identity);

	    });	

		var lastdoctrack = "";

		function scrollHandler(){
			   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
		    	var wrapper = document.getElementById("wrapper1");

				var wrapperchildren = wrapper.children;
				let lastdocument = wrapperchildren[wrapperchildren.length-1].id.substring(2);
				let getlastdc = db.collection("myQuotes").doc(lastdocument);

				getlastdc.get().then(lastdoc=>{
					var thelastdoc = "";
					if (lastdoc.exists) {
						var lastdocumentdata = lastdoc.data();

						//getQuotes(quotetype,quotecateg,doctoloadfrm);
						if(lastdoctrack !== lastdoc.data().identity){
							thelastdoc = lastdoc;
							getQuotes(quotetypevar,quotecategvar,thelastdoc);
						}

						lastdoctrack = lastdocument;
						
				    } else {
				        console.log("No such document!");
				    }
				});
		    	
		    }

		}	

		if (!window.scrollEventAdded) {
		    window.addEventListener("scroll", scrollHandler);
		    window.scrollEventAdded = true;
		}

		/*
	    window.addEventListener("scroll", () => {	    	
		 
		}); 
		*/
	     						
	  
	});

}


function loadclickedQuotes(quotetype,quotecateg,doctoloadfrm){
	document.getElementById("wrapper1").innerHTML = "";
	getQuotes(quotetype,quotecateg,doctoloadfrm);

}

function displaycomments(quoteid){
		    var refcomm = db.collection("comments").where("quoteid", "==", quoteid).onSnapshot(function(querySnapshot){
	     	var macomments = document.getElementById("macomments"+quoteid);
	     	querySnapshot.docChanges().forEach(function(changed){	     		
	     					macomments.innerHTML +=`
								<div class="row">
									<p id="name"><strong>`+changed.doc.data().name+`:</strong></p>
									<p id="tcomment">`+changed.doc.data().comment+`</p>
								</div>

								`;								
	     		});
	     });
}


function commenttable(s){
	quoteids = s;
	var names =  document.getElementById("names"+quoteids);
	var comments = document.getElementById("comments"+quoteids);
	var today = new Date();
 	var datev = today.getDate()+ "/"+ today.getMonth()+"/"+today.getFullYear() + ", " +today.getHours()+ ":" +today.getMinutes();
 	var cerror = document.getElementById("cerror" + quoteids);
 	cerror.innerHTML = "";

	if(comments.value ==""){
		cerror.innerHTML = "<p style='color:#f00; font-style:italic; font-size:12px'>The comment field cannot be empty!</p>";
	}else{
		addtocomment(names.value,comments.value,datev,quoteids);				
	}

}







