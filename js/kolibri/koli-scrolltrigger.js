define(['jquery'], function() {
  var trigger = {
    elems: {},

    scrollTop: 0,
    windowHeight: 0,

    init: function(selectors){
      trigger.$window = $(window);

      if (typeof selectors === 'string') {
        selectors = [selectors];
      }

      $.each(selectors,function(index,selector){
        trigger.elems[index] = $(selector);
        trigger.elems[index].each(function(i,item){
          $(item).data('st-options', {
            trigger: $(item).attr('scrolltrigger') || 0.5,
            persist: $(item).attr('st-persist') === 'true' || false,
            direction: $(item).attr('st-dir') || 'down',
          });
        });
        trigger.elems[index].attr('alive','true');
        trigger.attachEvents(index,selector);
      });

      setTimeout(function(){
        trigger.$window.trigger('scrolltrigger');
      },1);
    },

    attachEvents: function(index,selector) {
      var $element = $(selector);
      if ($element.length <= 0) {
        return;
      }
      trigger.$window.on('resize.scrolltrigger-'+index,function(){
        $('[scrolltrigger="active"]').trigger('load');
        trigger.$window.trigger('scroll.scrolltrigger-'+index);
      });

      trigger.$window.on('scroll.scrolltrigger-'+index+' scrolltrigger',function(){
        trigger.scrollTop = trigger.$window.scrollTop();

        $element.each(function(i,item){
          var $item = $(item),
              elementTop = 0,
              elementBtm = 0,
              options = $item.data('st-options'),
              scrollTrigger = trigger.scrollTop + (trigger.windowHeight * (1-options.trigger)),
              scrollAntiTrigger = trigger.scrollTop + (trigger.windowHeight * (options.trigger));

          elementTop = $item.offset().top;
          elementBtm = $item.offset().top + $item.outerHeight(true);
          trigger.windowHeight = trigger.$window.height();

          var isAboveElTop, isBelowElTop, isAboveElBtm, isBelowElBtm, show, hide;
          isAboveElTop = scrollTrigger <= elementTop;
          isBelowElTop = scrollTrigger >= elementTop;
          isAboveElBtm = scrollAntiTrigger <= elementBtm;
          isBelowElBtm = scrollAntiTrigger >= elementBtm;

          show = isBelowElTop && isAboveElBtm && $item.attr('scrolltrigger') !== 'active';
          if (options.direction === 'up') {
            hide = (isBelowElBtm) && $item.attr('scrolltrigger') === 'active';
          } else if (options.direction === 'both') {
            hide = (isAboveElTop || isBelowElBtm) && $item.attr('scrolltrigger') === 'active';
          } else {
            hide = (isAboveElTop) && $item.attr('scrolltrigger') === 'active';
          }
          hide = options.persist ? false : hide;

          if (show) {
            $item.attr('scrolltrigger','active');
            $($item[0]).trigger('load');
          }
          if (hide) {
            $item.attr('scrolltrigger','inactive');
            $($item[0]).trigger('unload');
          }
        });
      });
    }
  };

  return trigger;
});