define(['jquery', 'jQeasing'], function($) {
  var smooth = {
    options: {
      duration: 750,
      ease: 'easeInOutExpo',
    },

    init: function(selectors){
      if ($(selectors).length <= 0) { return; }

      $(selectors).each(smooth.attachEvents);
    },

    attachEvents: function(index,elem) {
      $(elem).on('click.smoothscroll', function(evt){
        if (evt.ctrlKey || evt.metaKey || evt.which === 2) {
          return;
        }
        var $this = $(this),
            anchor;
        if (this.tagName === 'A') {
          evt.preventDefault();
        }
        anchor = anchor || $this.attr('href');
        if (anchor === '#_') { return; }
        anchor = anchor || $this.attr('smoothscroll');
        anchor = anchor || $this.attr('scroll-target');
        if (anchor) {
          smooth.scrollTo(anchor);
        }
      });
    },

    scrollTo: function(anchor) {
      anchor = anchor || '#top';
      var newScrollPos = (anchor === '#top' ? 0 : $(anchor).offset().top);
      try {
        $('html,body').stop().animate({
          scrollTop: newScrollPos
        },smooth.options.duration, smooth.options.ease);
      } catch (exception) {
        window.location.hash = anchor;
      }
    },

    processChapter: function(index,chapter){
      var newChapter = {};
      newChapter.$elem = $(chapter);
      newChapter.order = index + 1;
      newChapter.name = newChapter.$elem.attr('chapter-name') || '';

      newChapter.$elem.attr('alive', true);
      newChapter.$elem.attr('id', newChapter.name);
      newChapter.$elem.attr('data-order', newChapter.order);

      smooth.chapters.push(newChapter);
    },

    setOptions: function($item){
      var options = {
        duration: $item.attr('smooth-dur') || 750,
        ease: $item.attr('smooth-ease') || 'easeInOutExpo',
      };
      $item.data('smoothscroll-options', options);
      return options;
    },
  };

  return smooth;
});