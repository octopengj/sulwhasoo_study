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



### recommend

- html 구조

  ```html
  <ul>
  	<li>
             <div class="recomm_img">
               <img src="img/recom_04.jpg" alt="04">
             </div>
             <div class="recomm_name">
             	 제품이름
             </div>
             <div class="buy_view_layer">
               <a href="#" class="btn_view">자세히보기</a>
             </div>
       </li>
  </ul>
  ```

- css

  리스트가 전부 보이면 안되니까 none처리후 act가 붙으면 flex;

  ```css
  .recomm_list{
      display:none;
  }
  .recomm_list.Act{
      display:flex;
  }
  ```

  가려진 view가 hover되면 보이게

  ```css
  .buy_view_layer{
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background:rgba(242,242,242,0.5);
    display:flex;
    align-items: center;
    justify-content: center;
    opacity:0;
    transition:all 0.2s;
    cursor: pointer;
  }
  .recomm_list li:hover .buy_view_layer{
    opacity:1;
  }
  ```

- js

  탭을 클릭하면 on되고 act

  ```javascript
  $(function(){
  
      const btn_tab = $('.recomm_tab a.btn_tab');
      const recomm_list = $('.recomm_list');
  
      btn_tab.click(recomm);
  
      function recomm(e){
          e.preventDefault();
  
          const idx = $(this).index();
          console.log(idx)
  
          btn_tab.removeClass('On');
          $(this).addClass('On');
  
          recomm_list.removeClass('Act');
          recomm_list.eq(idx).addClass('Act');
      }
  })
  ```

### recommend2

- html

  lounge lou01과 lou02로 구분해서 작성

  ```html
  <div class="lounge lou01">
    <div class="lounge_cont">
      <div class="lounge_img">
        <a href="#">
          <img src="img/lou_01.jpg" alt="liu01">
        </a>
     </div>
      <div class="lounge_txt_wrap">
        <h3>SHADE picker</h3>
        <p class="sub_tit">
          나에게 맞는 컬러가 <br>
          궁금하다면?
        </p>
        <p class="desc">
          사용 중인 페이스 메이크업 제품 정보를 통 <br>
          같은 컬러의 설화수 제품을 찾아드립니다.
        </p>
        <div class="btn_wrap">
          <a href="#" class="btn_view">자세히보기</a>
        </div>
      </div>
    </div>
  </div>
  <div class="lounge lou02">
      
  </div>
  ```

- css

  flex 배치

  ```css
  .lounge_cont{
      display:flex;
      height: 100%;
      justify-content: space-between;
      align-items: center;
  }
  ```

  lou2를 order:2;로 순서 변경

  ```css
  .lounge.lou02 .lounge_img{
      order:2;
  }
  ```



### flag

- html

  ```html
   <div class="flagship">
        <h2 class="cont_title">
          설화수 플래그십 스토어 & 스파
        </h2>
        <div class="flag_wrap">
          <ul class="flag_slider">
            <li class="fl_01">slider</li>
            <li class="fl_02">slider</li>
            <li class="fl_03">slider</li>
            <li class="fl_04">slider</li>
          </ul>
          <ul class="flag_btm_wrap">
            <li><a href="#">0</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
          </ul>
          <div class="flag_txt_wrap">
            <p>
              등불이 어둠을 밝혀 길을 안내하 듯, <br>
              아시아의 지혜를 담아 아름다움을 비추는<br>
              설화수 플래그십 스토어와 스파를 <br>
              방문해보세요.
            </p>
            <a href="#" class="btn_view">
              자세히보기
            </a>
          </div>
          <a href="#" class="flagside left">left</a>
          <a href="#" class="flagside right">right</a>
   </div>
  ```

- js

  ```javascript
  $(function(){
      const fl_slider = $('.flag_slider li');
      const fl_btm_List =$('.flag_btm_wrap li');
      const fl_left_btn= $('.flagside.left');
      const fl_right_btn= $('.flagside.right');
  
      first();
  
      function first(){
          fl_slider.eq(0).addClass('On');
          fl_btm_List.eq(0).addClass('Act');
      }
      
      fl_right_btn.click(right_Event);
      fl_left_btn.click(left_Event);
      fl_btm_List.click(fl_btm_Event)
      
      function fl_btm_Event(e){
          e.preventDefault();
  
          const idx = $(this).index();
          reset();
          fl_slider.eq(idx).addClass('On');
          fl_btm_List.eq(idx).addClass('Act');
      }
  
      function left_Event(e){
          e.preventDefault();
          let idx = $('.flag_slider li.On').index();
          reset();
      
          if(idx>0){
              fl_slider.eq(idx-1).addClass('On');
              fl_btm_List.eq(idx-1).addClass('Act');
          }
          if(idx==0){
              idx=3;
              fl_slider.eq(idx).addClass('On');
              fl_btm_List.eq(idx).addClass('Act');
          }
      }
  
      function right_Event(e){
          e.preventDefault();
          let idx = $('.flag_slider li.On').index();
          reset();
      
          if(idx<3){
              fl_slider.eq(idx+1).addClass('On');
              fl_btm_List.eq(idx+1).addClass('Act'); 
          }
          if(idx==3){
              idx=0;
              fl_slider.eq(idx).addClass('On');
              fl_btm_List.eq(idx).addClass('Act');
          }   
      }
  
      function reset(){
          fl_slider.removeClass('On');
          fl_btm_List.removeClass('Act');
      }
  })
  ```

  

