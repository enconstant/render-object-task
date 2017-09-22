var testObject = {"web-app": {
  "servlet": [   
    {
      "servlet-name": "cofaxCDS",
      "servlet-class": "org.cofax.cds.CDSServlet",
      "init-param": {
        "configGlossary:installationAt": "Philadelphia, PA",
        "configGlossary:adminEmail": "ksm@pobox.com",
        "configGlossary:poweredBy": "Cofax",
        "configGlossary:poweredByIcon": "/images/cofax.gif",
        "configGlossary:staticPath": "/content/static",
        "templateProcessorClass": "org.cofax.WysiwygTemplate",
        "templateLoaderClass": "org.cofax.FilesTemplateLoader",
        "templatePath": "templates",
        "templateOverridePath": "",
        "defaultListTemplate": "listTemplate.htm",
        "defaultFileTemplate": "articleTemplate.htm",
        "useJSP": false,
        "jspListTemplate": "listTemplate.jsp",
        "jspFileTemplate": "articleTemplate.jsp",
        "cachePackageTagsTrack": 200,
        "cachePackageTagsStore": 200,
        "cachePackageTagsRefresh": 60,
        "cacheTemplatesTrack": 100,
        "cacheTemplatesStore": 50,
        "cacheTemplatesRefresh": 15,
        "cachePagesTrack": 200,
        "cachePagesStore": 100,
        "cachePagesRefresh": 10,
        "cachePagesDirtyRead": 10,
        "searchEngineListTemplate": "forSearchEnginesList.htm",
        "searchEngineFileTemplate": "forSearchEngines.htm",
        "searchEngineRobotsDb": "WEB-INF/robots.db",
        "useDataStore": true,
        "dataStoreClass": "org.cofax.SqlDataStore",
        "redirectionClass": "org.cofax.SqlRedirection",
        "dataStoreName": "cofax",
        "dataStoreDriver": "com.microsoft.jdbc.sqlserver.SQLServerDriver",
        "dataStoreUrl": "jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon",
        "dataStoreUser": "sa",
        "dataStorePassword": "dataStoreTestQuery",
        "dataStoreTestQuery": "SET NOCOUNT ON;select test='test';",
        "dataStoreLogFile": "/usr/local/tomcat/logs/datastore.log",
        "dataStoreInitConns": 10,
        "dataStoreMaxConns": 100,
        "dataStoreConnUsageLimit": 100,
        "dataStoreLogLevel": "debug",
        "maxUrlLength": 500}},
    {
      "servlet-name": "cofaxEmail",
      "servlet-class": "org.cofax.cds.EmailServlet",
      "init-param": {
      "mailHost": "mail1",
      "mailHostOverride": "mail2"}},
    {
      "servlet-name": "cofaxAdmin",
      "servlet-class": "org.cofax.cds.AdminServlet"},
 
    {
      "servlet-name": "fileServlet",
      "servlet-class": "org.cofax.cds.FileServlet"},
    {
      "servlet-name": "cofaxTools",
      "servlet-class": "org.cofax.cms.CofaxToolsServlet",
      "init-param": {
        "templatePath": "toolstemplates/",
        "log": 1,
        "logLocation": "/usr/local/tomcat/logs/CofaxTools.log",
        "logMaxSize": "",
        "dataLog": 1,
        "dataLogLocation": "/usr/local/tomcat/logs/dataLog.log",
        "dataLogMaxSize": "",
        "removePageCache": "/content/admin/remove?cache=pages&id=",
        "removeTemplateCache": "/content/admin/remove?cache=templates&id=",
        "fileTransferFolder": "/usr/local/tomcat/webapps/content/fileTransferFolder",
        "lookInContext": 1,
        "adminGroupID": 4,
        "betaServer": true}}],
  "servlet-mapping": {
    "cofaxCDS": "/",
    "cofaxEmail": "/cofaxutil/aemail/*",
    "cofaxAdmin": "/admin/*",
    "fileServlet": "/static/*",
    "cofaxTools": "/tools/*"},
 
  "taglib": {
    "taglib-uri": "cofax.tld",
    "taglib-location": "/WEB-INF/tlds/cofax.tld"}}};

var object = {};
if (testObject && typeof testObject === 'object') {
  object.Object = testObject;
} else if (Array.isArray(testObject)) {
  object.Array = testObject;
} else {
  object.Error = 'not an object';
};

function iterateObj (obj) {	
	var parents = document.getElementsByClassName('parent');
	var parent = parents[parents.length-1];
	
	

	if ( Array.isArray(obj) ) {
		for( var i = 0; i < obj.length; i++) {
			if ( obj[i] && typeof obj[i] === "object" ) {
				var nodeType = checkObjType(obj[i]);
				writeBlock ( obj, i, parent );
				iterateObj ( obj[i] );
			} else {
	    		console.log((i+1) + ": " + obj[i]);
	    		writeLine ( obj, i, parent);
			};
		};
	} else if (obj) {	
		for( var key in obj ) {
			if (obj[key] && typeof obj[key] === "object") {
				var nodeType = checkObjType(obj[key]);
				writeBlock ( obj, key, parent );
				iterateObj ( obj[key] );
			} else {
		    	writeLine ( obj, key,  parent);		    	
			};
		};
	};	
};

function checkObjType (obj) {
    if (Array.isArray(obj)) {
      return "array";     
    } else {
      return "object"     
    };
  };

function writeLine (obj , key ,  parent) {
	var keyMod;
	var elem = document.createElement('div');
	Array.isArray(obj) ? keyMod = key + 1 : keyMod = key;
	elem.innerHTML = "<span class='key'>" + keyMod + ": </span>" + "<span>" + obj[key] + "</span>";
	elem.classList.add('row');
	parent.appendChild(elem);
};


function writeBlock (obj , key , parent) {
	var bracketL,
		  bracketR,
      nodeType;
  nodeType = checkObjType(obj[key]);
	var wrapper = document.createElement('div');
	wrapper.classList.add("parent");
	var elem = document.createElement('div');
	nodeType === 'array' ? bracketL = '['  : bracketL = '{';
	nodeType === 'array' ? bracketR = "...]" :  bracketR = "...}";
	elem.innerHTML = '<span class="container key">' + key + ' : </span>'+'<span>' + bracketL + '</span><span class="hidden">'+bracketR+'</span>'; 
	elem.setAttribute('data-toggle', 'true');
	parent.appendChild(elem);
	parent.appendChild(wrapper);
	var bracket = document.createElement('span');
	bracket.innerHTML = bracketR;
	parent.appendChild(bracket);


};

function addBracket (obj) {
	var bracket,
      nodeType = checkObjType (obj)
	nodeType === 'array' ? bracket = ']' : bracket = '}';
	var parentsAll = document.getElementsByClassName('parent');
	var parent = parentsAll[parentsAll.length-1];
	var text = parent.lastChild.innerHTML;
};


iterateObj (object);


var container =  document.getElementById('container');
container.onclick = function (event) {
	var target = event.target;
	while (target != container) {
		if (target.hasAttribute('data-toggle')) {
			var nextElem = target.nextSibling;
			nextElem.classList.toggle('hidden');
			nextElem.nextSibling.classList.toggle('hidden');
			target.lastChild.classList.toggle('hidden');
			return;
		};
		target = target.parentNode;
	};
};








