/****************************************************************************
 Copyright (c) 2014-2017 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var FacebookTest = cc.Layer.extend({
    _sceneTitleLabel:null,
    _quit: false,
    _title: "",

    ctor:function(title){
        this._super()
        // Get the sceensize
        var screensize = cc.winSize;

        // Add the generated background
        var background = new cc.Sprite(s_extensions_background);
        background.x = screensize.width / 2;
        background.y = screensize.height / 2;
        var bgRect = background.getTextureRect();
        background.scaleX = screensize.width/bgRect.width;
        background.scaleY = screensize.height/bgRect.height;
        this.addChild(background);

        // Add the ribbon
        var ribbon = new cc.Scale9Sprite(s_extensions_ribbon, cc.rect(1, 1, 48, 55));
        ribbon.width = screensize.width;
        ribbon.height = 57;
        ribbon.x = screensize.width / 2.0;
        ribbon.y = screensize.height - ribbon.height / 2.0;
        this.addChild(ribbon);

        // Add the title
        this._sceneTitleLabel = new cc.LabelTTF(this._title, "Arial", 12);
        this._sceneTitleLabel.x = screensize.width / 2;
        this._sceneTitleLabel.y = screensize.height - this._sceneTitleLabel.height / 2 - 5;
        this.addChild(this._sceneTitleLabel, 1);

        // Add the menu
        var item1 = new cc.MenuItemImage(s_pathB1, s_pathB2, this.previousCallback, this);
        var item2 = new cc.MenuItemImage(s_pathR1, s_pathR2, this.restartCallback, this);
        var item3 = new cc.MenuItemImage(s_pathF1, s_pathF2, this.nextCallback, this);

        var menu = new cc.Menu(item1, item3, item2);
        menu.x = 0;
        menu.y = 0;
        item1.x = screensize.width / 2 - 100;
        item1.y = 37;
        item2.x = screensize.width / 2;
        item2.y = 35;
        item3.x = screensize.width / 2 + 100;
        item3.y = 37;

        this.addChild(menu ,1);
    },

    restartCallback:function (sender) {
        if (this._quit) return;
        this._quit = true;
        (new FacebookTestScene()).runThisTest(__sceneIdx);
    },

    nextCallback:function (sender) {
        if (this._quit) return;
        this._quit = true;
        __sceneIdx++;
        __sceneIdx = __sceneIdx % arrayOfFacebookTest.length;
        (new FacebookTestScene()).runThisTest(__sceneIdx);
    },

    previousCallback:function (sender) {
        if (this._quit) return;
        this._quit = true;
        __sceneIdx--;
        if (__sceneIdx < 0)
            __sceneIdx += arrayOfFacebookTest.length;
        (new FacebookTestScene()).runThisTest(__sceneIdx);
    }
});