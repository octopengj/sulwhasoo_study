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