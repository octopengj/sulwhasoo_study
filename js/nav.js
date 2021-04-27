$(function(){
 
    const select_language = $('.select_language');
    const search_container = $('.search-container');
    const h_open_Btn= $('.h_open_search');
    const h_close = $('.sch_close');

    // nav
    const gnb = $('.gnb');//Active
    const gnb_menu_list = $('.nav_d1>a');//selector
    const sub_menu =$('.gnb_menu>li>ul');//On
    
    // mob_nav
    const mob_nav_btn = $('.mob_nav_btn');
    const mob_nav = $('.mob_nav ');
    const m_nav_bg = $('.m_nav_bg');
    const mob_btn =$('.m_nav_list_tit');
    const m_sub_menu =$('.m_nav_list li>dl');

    const main = $('#main')


    mob_nav_btn.click(function(){
        mob_nav.addClass('left_move');
        m_nav_bg.delay(500).fadeIn();
    })
    
    m_nav_bg.click(function(){
        mob_nav.removeClass('left_move');
        m_nav_bg.fadeOut(0);
    })


    mob_btn.click(function(){
        const str = $(this).attr('class');
        const idx = $('.m_nav_list_tit.On');
        console.log(str);

        idx.next(m_sub_menu).slideToggle()
        idx.toggleClass('On');

        if(str=="m_nav_list_tit On"){

        }
        else{
            $(this).toggleClass('On');
            $(this).next(m_sub_menu).slideToggle();
        }

    })


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