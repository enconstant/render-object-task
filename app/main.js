'use strict'

const testObject = { 'web-app': {
  'servlet': [   
    {
      'servlet-name': 'cofaxCDS',
      'servlet-class': 'org.cofax.cds.CDSServlet',
      'init-param': {
        'configGlossary:installationAt': 'Philadelphia, PA',
        'configGlossary:adminEmail': 'ksm@pobox.com',
        'configGlossary:poweredBy': 'Cofax',
        'configGlossary:poweredByIcon': '/images/cofax.gif',
        'configGlossary:staticPath': '/content/static',
        'templateProcessorClass': 'org.cofax.WysiwygTemplate',
        'templateLoaderClass': 'org.cofax.FilesTemplateLoader',
        'templatePath': 'templates',
        'templateOverridePath': '',
        'defaultListTemplate': 'listTemplate.htm',
        'defaultFileTemplate': 'articleTemplate.htm',
        'useJSP': false,
        'jspListTemplate': 'listTemplate.jsp',
        'jspFileTemplate': 'articleTemplate.jsp',
        'cachePackageTagsTrack': 200,
        'cachePackageTagsStore': 200,
        'cachePackageTagsRefresh': 60,
        'cacheTemplatesTrack': 100,
        'cacheTemplatesStore': 50,
        'cacheTemplatesRefresh': 15,
        'cachePagesTrack': 200,
        'cachePagesStore': 100,
        'cachePagesRefresh': 10,
        'cachePagesDirtyRead': 10,
        'searchEngineListTemplate': 'forSearchEnginesList.htm',
        'searchEngineFileTemplate': 'forSearchEngines.htm',
        'searchEngineRobotsDb': 'WEB-INF/robots.db',
        'useDataStore': true,
        'dataStoreClass': 'org.cofax.SqlDataStore',
        'redirectionClass': 'org.cofax.SqlRedirection',
        'dataStoreName': 'cofax',
        'dataStoreDriver': 'com.microsoft.jdbc.sqlserver.SQLServerDriver',
        'dataStoreUrl': 'jdbc:microsoft:sqlserver://LOCALHOST:1433;DatabaseName=goon',
        'dataStoreUser': 'sa',
        'dataStorePassword': 'dataStoreTestQuery',
        'dataStoreTestQuery': 'SET NOCOUNT ON;select test="test";',
        'dataStoreLogFile': '/usr/local/tomcat/logs/datastore.log',
        'dataStoreInitConns': 10,
        'dataStoreMaxConns': 100,
        'dataStoreConnUsageLimit': 100,
        'dataStoreLogLevel': 'debug',
        'maxUrlLength': 500}},
    {
      'servlet-name': 'cofaxEmail',
      'servlet-class':'org.cofax.cds.EmailServlet',
      'init-param': {
      'mailHost': 'mail1',
      'mailHostOverride': 'mail2'}},
    {
      'servlet-name': 'cofaxAdmin',
      'servlet-class': 'org.cofax.cds.AdminServlet'},
 
    {
      'servlet-name': 'fileServlet',
      'servlet-class': 'org.cofax.cds.FileServlet'},
    {
      'servlet-name': 'cofaxTools',
      'servlet-class': 'org.cofax.cms.CofaxToolsServlet',
      'init-param': {
        'templatePath': 'toolstemplates/',
        'log': 1,
        'logLocation': '/usr/local/tomcat/logs/CofaxTools.log',
        'logMaxSize': '',
        'dataLog': 1,
        'dataLogLocation': '/usr/local/tomcat/logs/dataLog.log',
        'dataLogMaxSize': '',
        'removePageCache': '/content/admin/remove?cache=pages&id=',
        'removeTemplateCache': '/content/admin/remove?cache=templates&id=',
        'fileTransferFolder': '/usr/local/tomcat/webapps/content/fileTransferFolder',
        'lookInContext': 1,
        'adminGroupID': 4,
        'betaServer': true} } ],
  'servlet-mapping': {
    'cofaxCD': '/',
    'cofaxEmail': '/cofaxutil/aemail/*',
    'cofaxAdmin': '/admin/*',
    'fileServlet': '/static/*',
    'cofaxTools': '/tools/*' },
 
  'taglib': {
    'taglib-uri': 'cofax.tld',
    'taglib-location': '/WEB-INF/tlds/cofax.tld' } } };

const object = {};

if (testObject && typeof testObject === 'object') {
  object.Object = testObject;
} else if (Array.isArray(testObject)) {
  object.Array = testObject;
} else {
  object.Error = 'not an object';
}

function draw(item, obj) {
  if (Array.isArray(obj[item])) {
    return `
            <p class='object-render__key-line'>
              <span class='object-render__key-name_extended'>${item}: [</span>
              <span class='object-render__bracket_hidden'>...]</span>
            </p>${drawObject(obj[item])}
            <span class='object-render__bracket'> ]</span>
    `;
  } else if (obj[item] && typeof obj[item] === 'object') {
    return `
            <p class='object-render__key-line'>
              <span class='object-render__key-name_extended'>${item}: {</span>
              <span class='object-render__bracket_hidden'>...}</span>
            </p>${drawObject(obj[item])}
            <span class='object-render__bracket'> }</span>
    `;
  }
  return `
          <p class='object-render__key-line'>
            <span class='object-render__key-name'>${item}: </span>
            <span>${obj[item]}</span>
          </p>
  `;
}

function drawObject(obj) {
  if (Array.isArray(obj)) {
    let text = '';
    obj.forEach((item, i) => {
      text += draw(i, obj);
    });
    return `<div class='object-render__object-block'>${text}</div>`;
  } else if (typeof obj === 'object' && obj) {
    const props = Object.keys(obj);
    let text = ' ';
    props.forEach((item) => {
      text += draw(item, obj);
    });
    return `<div class='object-render__object-block'>${text}</div>`;
  }
}

document.querySelector('.object-render').innerHTML = drawObject(object);

const container = document.querySelector('.object-render');
container.onclick = function (event) {
  let target = event.target;
  while (target !== container) {
    if (target.classList.contains('object-render__key-line')) {
      const nextElem = target.nextSibling.classList;

      if (nextElem.contains('object-render__object-block')) {
        nextElem.replace('object-render__object-block', 'object-render__object-block_collapsed');
      } else if (nextElem.contains('object-render__object-block_collapsed')) {
        nextElem.replace('object-render__object-block_collapsed', 'object-render__object-block');
      }

      const bracket = target.lastChild.previousSibling.classList;

      if (bracket.contains('object-render__bracket_hidden')) {
        bracket.replace('object-render__bracket_hidden', 'object-render__bracket');
      } else if (bracket.contains('object-render__bracket')) {
        bracket.replace('object-render__bracket', 'object-render__bracket_hidden');
      }

      const bracketClosing = target.nextSibling.nextSibling.nextSibling.classList;

      if (bracketClosing.contains('object-render__bracket_hidden')) {
        bracketClosing.replace('object-render__bracket_hidden', 'object-render__bracket');
      } else if (bracketClosing.contains('object-render__bracket')) {
        bracketClosing.replace('object-render__bracket', 'object-render__bracket_hidden');
      }

      const arrow = target.firstChild.nextSibling.classList;

      if (arrow.contains('object-render__key-name_collapsed')) {
        arrow.replace('object-render__key-name_collapsed', 'object-render__key-name_extended');
      } else if (arrow.contains('object-render__key-name_extended')) {
        arrow.replace('object-render__key-name_extended', 'object-render__key-name_collapsed');
      }

      return;
    }
    target = target.parentNode;
  }
};
