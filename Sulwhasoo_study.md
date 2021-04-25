## Sulwhasoo_study



### header

- menu가 뒤에서 나와야해서 header에 z-index: 2

- header, header_wrap, select_language, header_link에 relative

- 각 자식들을 absolute

- text-transform: uppercase;

- jQuery로 js작성

  ```javascript
  $(function(){
   
      const select_language = $('.select_language');
      const search_container = $('.search-container');
      const h_open_Btn= $('.h_open_search');
      const h_close = $('.sch_close');
  
      // nav
      const gnb = $('.gnb');//Active
      const gnb_menu_list = $('.nav_d1>a');//selector
      const sub_menu =$('.gnb_menu>li>ul');//On
      
      gnb_menu_list.on('mouseenter',function(){
          if($(this).parent('li').index()==0){
              
              sub_menu.stop().removeClass('over')
              gnb.stop().removeClass('Active')
          }
          else{
              gnb_menu_list.not(this).next('ul').removeClass('over')
              $(this).next('ul').addClass('over');
              gnb.addClass('Active')
          }
      })
      
      sub_menu.mouseleave(function(){
          sub_menu.stop().removeClass('over')
          gnb.stop().removeClass('Active')
       })
      select_language.click(function(){
          $(this).toggleClass('show');
      })
      h_open_Btn.click(function(){
          search_container.addClass('show');
          main.addClass('On');
      })
      h_close.click(function(){
          search_container.removeClass('show');
      })
      main.click(function(){
          search_container.removeClass('show');
          $(this).removeClass('On');
      })
  })
  ```



### visual

- visual 전체 영역 z-index: 0 상단의 메뉴보다 뒤로 보여져야 함

- 버튼 z-index:2, 버튼 이미지 삽입

  ```css
  .visu_arrow{
      position:absolute;
      z-index:2;
      top:calc(50% - 29px);
      height:58px;
      width:30px;
      text-indent:-99999px;
      background-position: left top;
      background-repeat: no-repeat;
  }
  .visu_arrow.right{
      right:20px;
      background-image: url(../img/main-kv-arr-r.png);
  }
  .visu_arrow.left{
      left:20px;
      background-image: url(../img/main-kv-arr-l.png);
  }
  ```

- bottom 버튼

  - 활성화되면 width: 25px;
  - background-repeat: no-repeat;
    background-position: 0 0;
    background-size: contain;

  ```css
  .visu_btm_wrap li.visu_btm_list a{
      display:block;
      width:10px;
      height:10px;
      border-radius: 5px;
      background:#fff;
      text-indent:-9999px;
      transition:all 0.3s;
  }
  .visu_btm_wrap li.visu_btm_list.Act a{
      width:25px;
  }
  .visu_btm_wrap li.controls_wrap .control{
      width:10px;
      height: 10px;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-size: contain;
      position:absolute;
      text-indent:-9999px;
      /* background:#f00; */
      top:-3px;
  }
  .visu_btm_wrap li.controls_wrap .control.start{
      background-image: url(../img/btn-play-pc.png);
      display:none;
  }
  .visu_btm_wrap li.controls_wrap .control.stop{
      background-image: url(../img/btn-stop-pc.png);
  }
  ```

- js

  ```javascript
  $(function () {
  
      const visu_slide = $('.visu_slide');
      const visu_btm_list = $('.visu_btm_list');
      const visu_right = $('.visu_arrow.right'); //오른쪽버튼
      const visu_left = $('.visu_arrow.left'); //왼쪽버튼
      const play_Btn = $('.visu_btm_wrap li.controls_wrap .control.start');
      const stop_Btn = $('.visu_btm_wrap li.controls_wrap .control.stop');
  
      let slider_play=setInterval(auto,6000);
      let slider_stop;
  
      first();
  
  
      function auto(){
          visu_right.trigger('click')
      }
  
      function first() {
  
          visu_slide.eq(0).addClass('On');
  
          slide_Event();
      }
  
      function slide_Event() {
          const on_slide = $('.visual_wrap>li.On'); //활성화된 슬라이드 저장
          const idx = on_slide.index(); //활성화된 슬라이드의 순서값 저장
          const veil = on_slide.children('.visu_veil'); //활성화된 슬라이드 자식 veil
          const txt_wrap = on_slide.children('.visu_txt_wrap');
  
          veil.animate({
              'width': '44%',
              'opacity': '1'
          }, 1000);
          txt_wrap.delay(500).animate({
              'opacity': '1'
          }, 1000);
  
          visu_btm_list.eq(idx).addClass('Act');
      }
  
      visu_right.click(right)
      visu_left.click(left)
      visu_btm_list.click(bottom);
      stop_Btn.click(stop);
      play_Btn.click(play);
  
      function play(){
          stop_Btn.fadeIn();
          play_Btn.fadeOut();
  
          slider_play= setInterval(auto,6000);
      }
  
      function stop(){
          stop_Btn.fadeOut();
          play_Btn.fadeIn();
  
          slider_stop=clearInterval(slider_play);
      }
  
  
      function bottom(e) {
          e.preventDefault();
          const idx = $(this).index();
  
          reset();
          visu_slide.eq(idx).addClass('On');
  
          slide_Event()
      }
  
      function right(e) {
          e.preventDefault()
          const idx = $('.visual_wrap>li.On').index()
  
          reset();
  
          if (idx < 2) {
              visu_slide.eq(idx + 1).addClass('On');
          }
          if (idx == 2) {
              visu_slide.eq(0).addClass('On');
          }
  
          slide_Event()
      }
  
      function left(e) {
          e.preventDefault()
          const idx = $('.visual_wrap>li.On').index()
  
          reset();
  
          if (idx > 0) {
              visu_slide.eq(idx - 1).addClass('On');
          }
          if (idx == 0) {
              visu_slide.eq(2).addClass('On');
          }
  
          slide_Event()
      }
  
      function reset() {
          visu_slide.removeClass('On');
          visu_btm_list.removeClass('Act');
  
          visu_slide.children('.visu_veil').animate({
              'width': '0%',
              'opacity': '0'
          }, 1000);
  
          visu_slide.children('.visu_txt_wrap').delay(1000).animate({
              'opacity': '0'
          }, 1000);
      }
  
  })
  ```

  