/* 
 * ligerui 主面板初始化
 */ 
if (typeof sjt == "undefined") {
    sjt = new Object();
}
sjt.ligerui = function () {

    // 当前配置
    var $$Settings;

    /**
     * 创建配置参数
     * @returns {} 
     */
    function createConfig() {

        var settings = {
            // 菜单
            menu: null,
            // Tab 控件
            tab: null,
            // 左菜单 控件
            accordion: null,
            // 菜单数据
            menuData:null,
            // 菜单数据URL
            url: null,
            // 主面板 ID
            layoutId: "layout1",
            // Tab ID
            tabId: "framecenter",
            // Iframe 内容 ID
            iframeId: "home",
            // 左菜单 ID
            accordionId: "accordion1",
            // loadding 控件ID
            loaddingId: "pageloading"
        };
        return settings;
    } 

    // 高度自适应
    function heightChanged(options) {
            if ($$Settings.tab)
                $$Settings.tab.addHeight(options.diff);  
    }
        
    return {  
        // 初始化
        init: function (options) {

            // 配置绑定
            $$Settings = createConfig();
            if (options) {
                $.extend($$Settings, options);
            }

            //布局
            $("#"+$$Settings.layoutId).ligerLayout({
                leftWidth: 200,
                height: '100%',
                heightDiff: -34,
                space: 4,
                onHeightChanged: heightChanged 
            }); 

            // 面板高度
            var height = $(".l-layout-center").height(); 

            //Tab
            $("#"+$$Settings.tabId).ligerTab({ height: height }); 

            
            if($$Settings.menuData != undefined)
            {
                  var data =  $$Settings.menuData; 
                  $(data).each(function () { 
                      var item = this; 

                      var iconCss = "icon-folder-close";
                      if(item.icon!=undefined && item.icon!="")
                      {
                         iconCss = item.icon;
                      } 
                      var navItem = $("<div title=\"" + item.text + "\" tabid=\""+item.id+"\" url=\""+item.url+"\" icon=\""+iconCss+"\"  class=\"l-scroll\"></div>");
                      navItem.append("<div style=\"height:7px;\"></div>"); 
                      if (item.children) { 
                          $(item.children).each(function () { 

                             var itemIconCss = "icon-file" ;
                             if(this.icon!=undefined && this.icon!="")
                             {
                                itemIconCss = this.icon;
                             } 
                               
                              navItem.append("<a class=\"l-link\" href=\"javascript:f_addTab('tab_" + this.id + "','"+ this.text + "','"+ this.url + "',true)\" ><i style=\"font-size:14px;\" class=\""+itemIconCss+"\"></i>  "
                                  + this.text + "</a>");
                          });
                      } 
                      $("#" + $$Settings.accordionId).append(navItem);
                  });


                  // 初始化菜单样式
                  $("#" + $$Settings.accordionId).ligerAccordion({
                      speed: null
                  
              });
                  $$Settings.accordion = liger.get($$Settings.accordionId); 
                  // 处理移上去按钮显示效果
                  $(".l-link").hover(function () {
                      $(this).addClass("l-link-over");
                  }, function () {
                      $(this).removeClass("l-link-over");
                  }); 
                
            }else{
                // 菜单数据处理
                var menuUrl = $$Settings.url;
                var data;
                $.ajax({
                    type: "POST",
                    url: menuUrl.urlstamp(),
                    success: function (msg) {
                        // Get Data 后处理 
                        data = eval("(" + msg + ")"); 
                        $(data).each(function () { 
                            var item = this; 
                            var navItem = $("<div title=\"" + item.text + "\" class=\"l-scroll\"></div>");
                            navItem.append("<div style=\"height:7px;\"></div>"); 
                            if (item.children) { 
                                $(item.children).each(function () { 
                                    navItem.append("<a class=\"l-link\" href=\"javascript:f_addTab('tab_" + this.id + "','"+ this.text + "','"+ this.url + "',true)\" ><i class=\"icon-purchase-inquiry-manage icon-logo\"></i>  "
                                        + this.text + "</a>");
                                });
                            } 
                            $("#" + $$Settings.accordionId).append(navItem);
                        });


                        // 初始化菜单样式
                        $("#" + $$Settings.accordionId).ligerAccordion({
                            speed: null
                        
                    });
                        $$Settings.accordion = liger.get($$Settings.accordionId);

                        // 处理移上去按钮显示效果
                        $(".l-link").hover(function () {
                            $(this).addClass("l-link-over");
                        }, function () {
                            $(this).removeClass("l-link-over");
                        }); 
                    } 
                });  
            }

          
            
            // 控件注册
            $$Settings.tab = liger.get($$Settings.tabId);  
            $$Settings.accordion = liger.get($$Settings.accordionId);
            $("#" + $$Settings.loaddingId).hide(); 
            return $$Settings;
        } 

    }
}();








 