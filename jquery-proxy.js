

var $ = function(selector) {

  const body = document.body;

  // Replacement of jQuery append function

  function appendFunction(appendString) {
      body.innerHTML += appendString;
  };

  // Replacement of jQuery document.ready function
  // Suggested by https://stackoverflow.com/questions/2304941/what-is-the-non-jquery-equivalent-of-document-ready

  function setOnReadyFunction(onReadyFunction) {
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', onReadyFunction);
    } else if (document.onreadystatechange) {
      document.onreadystatechange = function () {
        if (document.readyState == 'interactive') {
          onReadyFunction();
        }
      }
    }
  }

  // Detect kind of selector argument off of $ object

  const isBodySelector = (selector === 'body'),
        isDocumentSelector = (typeof selector === 'object' && selector.nodeType && selector.nodeType === 9);

  if (isBodySelector) {
    return {
      append: appendFunction
    }
  } else if (isDocumentSelector) {
    return {
      ready: setOnReadyFunction
    }
  }
}
