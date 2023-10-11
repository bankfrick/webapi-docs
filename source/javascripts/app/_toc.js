//= require ../lib/_jquery
//= require ../lib/_imagesloaded.min
;(function () {
  'use strict';

  var htmlPattern = /<[^>]*>/g;
  var loaded = false;

  var debounce = function(func, waitTime) {
    var timeout = false;
    return function() {
      if (timeout === false) {
        setTimeout(function() {
          func();
          timeout = false;
        }, waitTime);
        timeout = true;
      }
    };
  };

  var closeToc = function() {
    $(".toc-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
    console.log('Toc closed.'); // Hinzugefügt
  };

  function loadToc($toc, tocLinkSelector, tocListSelector, scrollOffset) {
    console.log('loadToc function started.'); // Hinzugefügt
    var headerHeights = {};
    var pageHeight = 0;
    var windowHeight = 0;
    var originalTitle = document.title;

    var recacheHeights = function() {
      console.log('Recaching heights...'); // Hinzugefügt
      headerHeights = {};
      pageHeight = $(document).height();
      windowHeight = $(window).height();
      $toc.find(tocLinkSelector).each(function() {
        var targetId = $(this).attr('href');
        if (targetId[0] === "#") {
          headerHeights[targetId] = $(targetId).offset().top;
        }
      });
    };

    var refreshToc = function() {
      console.log('Refreshing TOC...'); // Hinzugefügt
      var currentTop = $(document).scrollTop() + scrollOffset;
      if (currentTop + windowHeight >= pageHeight) {
        currentTop = pageHeight + 1000;
      }

      var best = null;
      for (var name in headerHeights) {
        if ((headerHeights[name] < currentTop && headerHeights[name] > headerHeights[best]) || best === null) {
          best = name;
        }
      }

      if (currentTop == scrollOffset && !loaded) {
        best = window.location.hash;
        loaded = true;
      }

      var $best = $toc.find("[href='" + best + "']").first();
      var $bestParent = $best.parent();
      
      if (!$best.hasClass("active")) {
        $toc.find(".active").removeClass("active");
        $toc.find(".active-parent").removeClass("active-parent");
        $best.addClass("active");
        $best.parents(tocListSelector).addClass("active").siblings(tocLinkSelector).addClass('active-parent');
        $best.siblings(tocListSelector).addClass("active");
        $toc.find(tocListSelector).filter(":not(.active)").slideUp(150);
        $toc.find(tocListSelector).filter(".active").slideDown(150);
        if (window.history.replaceState) {
          window.history.replaceState(null, "", best);
        }
        var thisTitle = $best.data("title");
        if (thisTitle !== undefined && thisTitle.length > 0) {
          document.title = thisTitle + " – " + originalTitle;
        } else {
          document.title = originalTitle;
        }
        if ($bestParent.hasClass(tocListSelector)) {
          $bestParent.slideDown(150);
        }
      }
    };

    var makeToc = function() {
      console.log('makeToc function called.');
      recacheHeights();
      refreshToc();

      $("#nav-button").click(function() {
        $(".toc-wrapper").toggleClass('open');
        $("#nav-button").toggleClass('open');
        console.log('Toc button clicked.'); // Hinzugefügt
        return false;
      });
      $(".page-wrapper").click(closeToc);
      $(".toc-link").click(closeToc);

      $toc.find(tocLinkSelector).click(function() {
        console.log('Toc link clicked.'); // Hinzugefügt
        setTimeout(function() {
          refreshToc();
        }, 0);
      });

      $(window).scroll(debounce(refreshToc, 200));
      $(window).resize(debounce(recacheHeights, 200));
    };

    makeToc();

    window.recacheHeights = recacheHeights;
    window.refreshToc = refreshToc;
  }

  window.loadToc = loadToc;
})();
