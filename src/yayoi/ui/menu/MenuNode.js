"use strict";
yayoi.initPackages("yayoi.ui.menu");

yayoi.extend("yayoi.ui.menu.MenuNode", "yayoi.ui.common.BasicComponent", [], function() {
    this.menu = null;
    /**
     * sub menu
     * @type {yayoi.ui.menu.Menu}
     */
    this.subMenu = null;
    this.icon = null;
    this.text = null;
    this.click = null;
    this.disabled = false;

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-menunode'>";
        html += "<div class='yayoi-menunode-icon'></div>"
        html += "<span class='yayoi-menunode-text'></span>";
        html += "<span class='yayoi-menunode-sub'></span>";
        html += "</div >";
        container.html(html);
    };

    this.afterRender = function() {
        var container = this.getContainer();
        var that = this;

        var subMenuIcon = new yayoi.ui.common.Icon({icon: "play", size: "10px"});
        subMenuIcon.placeAt(container.find(".yayoi-menunode-sub"));

        this.setIcon(this.icon);
        this.setText(this.text);
        this.setClick(this.click);
        this.setSubMenu(this.subMenu);
        this.setDisabled(this.disabled);

        container.find(".yayoi-menunode").click(function(event) {
            if(!that.disabled) {
                if(that.click) {
                    that.click();
                }
                if(!that.subMenu) {
                    that.getMenu().hide();
                }
            }
        });
        container.find(".yayoi-menunode").hover(
            function() {
                if (!that.disabled && that.subMenu) {
                    that.subMenu.show();
                }
            },
            function() {
                if(that.subMenu) {
                    that.subMenu.hide(true);
                }
            }
        );
    };

    this._initIcon = function(icon) {
        var iconObject = null;
        var iconSize = "20px";
        if (icon) {
            if (typeof(icon) == "string") {
                iconObject = new yayoi.ui.common.Icon({
                    icon: icon
                });
            }
            if (typeof(icon) == "object") {
                if (icon instanceof yayoi.ui.commono.Icon) {
                    iconObject = icon;
                } else {
                    iconObject = new yayoi.ui.common.Icon(icon);
                }
            }
            iconObject.size = iconSize;
        }
        return iconObject;
    };

    this.setIcon = function(icon) {
        this.icon = this._initIcon(icon);
        var container = this.getContainer();
        var iconContaner = container.find(".yayoi-menunode-icon");
        iconContaner.hide();
        if (this.icon) {
            iconContaner = container.find(".yayoi-menunode-icon");
            this.icon.placeAt(iconContaner);
            iconContaner.show();
        }
    };

    this.setText = function(text) {
        this.text = text;
        var container = this.getContainer();
        container.find(".yayoi-menunode-text").html(this.text);
    };

    this.getText = function() {
        return this.text;
    };

    this.setClick = function(click) {
        this.click = click;
    };

    this.setSubMenu = function(menu) {
        if(!menu) {
            this.subMenu = null;
            var container = this.getContainer();
            container.find(".yayoi-menunode-sub").hide();
            return;
        }
        if(typeof(menu) == "object") {
            if(menu instanceof yayoi.ui.menu.Menu) {
                this.subMenu = menu;
                menu.setAutoHide(true);
                this.subMenu.setTarget(this);
            } else {
                var newMenu = new yayoi.ui.menu.Menu(menu);
                this.setSubMenu(newMenu);
            }
        }
    };

    this.getSubMenu = function() {
        return this.subMenu;
    };

    this.setMenu = function(menu) {
        this.menu = menu;
    };

    this.getMenu = function() {
        return this.menu
    };

    this.setDisabled = function(disabled) {
        var container = this.getContainer();
        if(disabled) {
            container.find(".yayoi-menunode").addClass("disabled");
        } else {
            container.find(".yayoi-menunode").removeClass("disabled");
        }
    }
});
