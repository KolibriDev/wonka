define(['onLoad','cssTranslate','rafPolyfill','jquery','modernizr'], function(onLoad, cssTranslate, rafPolyfill, $, Modernizr) {

  if (Modernizr.touch) {
    return;
  }

  var lastScrollY = 0,
      ticking = false,
      $sections = $('[parallax]'),
      defaults = {
        divider: 3,
        max: true,
        reverse: false,
      };

  if ($sections.length <= 0) {
    return;
  }

  var updatePosition = function() {
    $sections.each(function(i,section){
      var $section = $(section),
          offset = $section.offset().top,
          $targets = $section.find('[px-target]'),
          translateValue, maxValue;
      $targets.each(function(ii,target){
        var $target = $(target),
            options;
        options = {
          divider: $target.attr('px-divider') ? $target.attr('px-divider') : defaults.divider,
          max: $target.attr('px-max') ? $target.attr('px-max') !== 'false' : defaults.max,
          reverse: $target.attr('px-reverse') ? $target.attr('px-reverse') !== 'false' : defaults.reverse,
        };
        maxValue = $target.height() - $section.outerHeight();
        translateValue = (lastScrollY + (offset > window.innerHeight ? window.innerHeight : 0) - offset) / options.divider;
        translateValue = translateValue < 0 ? 0 : translateValue;
        translateValue = options.max && translateValue >= maxValue ? maxValue : translateValue;
        translateValue = options.reverse ? translateValue * -1 : translateValue;

        cssTranslate.y($target.get(0), translateValue);
        $target.attr('px-alive',true);
      });
    });

    ticking = false;
  };

  var requestTick = function() {
    if (!ticking) {
      window.requestAnimationFrame(updatePosition);
      ticking = true;
    }
  };

  var doScroll = function() {
    lastScrollY = window.scrollY;
    requestTick();
  };

  onLoad(function() {
    $sections = $('[parallax]');
    rafPolyfill();
    window.onscroll = doScroll;
  });
});