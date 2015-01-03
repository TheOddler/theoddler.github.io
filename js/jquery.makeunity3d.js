(function ($) { //jquery wrapper

    var unity_missing_html =
    '<div class="unity_missing" style="text-align: center; margin: auto; position: relative; top: 50%;">\
        <a href="http:\/\/unity3d.com\/webplayer\/" title="Unity Web Player. Install now!">\
            <img alt="Unity Web Player. Install now!" src="\/\/webplayer.unity3d.com\/installation\/getunity.png"\/>\
        <\/a>\
    <\/div>\
    <div class="unity_broken" style="text-align: center; margin: auto; position: relative; top: 50%;">\
        <a href="http:\/\/unity3d.com\/webplayer\/" title="Unity Web Player. Install now! Restart your browser after install.">\
            <img alt="Unity Web Player. Install now! Restart your browser after install." src="http:\/\/webplayer.unity3d.com\/installation\/getunityrestart.png"\/>\
        <\/a>\
    <\/div>';

    function loadUnityObjectJs(callback) {
        var unityObjectUrl = "http://webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/UnityObject2.js";
        if (document.location.protocol == 'https:') {
            unityObjectUrl = unityObjectUrl.replace("http://", "https://ssl-");
        }
        jQuery.ajax({
            type: "GET",
            url: unityObjectUrl,
            success: callback,
            dataType: "script",
            cache: true
        });
    }

    function initUnity(unityPlayer, globalOptions) {
        var options = $.extend(globalOptions, unityPlayer.data("options"));

        var unityConfig = {
            width: options.width,
            height: options.height,
            params: { enableDebugging:"0" }
        };
        var u = new UnityObject2(unityConfig);

        unityPlayer.empty();
        if (options.addMissingHtml) {
            unityPlayer.append(unity_missing_html);
        }

        var $missingScreen = unityPlayer.find(".unity_missing");
        var $brokenScreen = unityPlayer.find(".unity_broken");
        $missingScreen.hide();
        $brokenScreen.hide();

        u.observeProgress(function (progress) {
            switch(progress.pluginStatus) {
                case "broken":
                    $brokenScreen.find("a").click(function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        u.installPlugin();
                        return false;
                    });
                    $brokenScreen.show();
                    break;
                case "missing":
                    $missingScreen.find("a").click(function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        u.installPlugin();
                        return false;
                    });
                    $missingScreen.show();
                    break;
                case "installed":
                    $missingScreen.remove();
                    break;
                case "first":
                    break;
            }
        });

        u.initPlugin(unityPlayer.get(0), options.url);
    };

    $.fn.makeUnity3D = function(options) {
        var defaults = {
            url: "",
            event: null,
            width: 800,
            height: 450,
            addMissingHtml: true
        };
        options = $.extend(defaults, options);

        var unityDivs = this;
        var callback = function() {
            if (options.activationEvent) {
                unityDivs.one( options.activationEvent, function() { initUnity($(this), options); } );
            }
            else {
                unityDivs.each( function() { initUnity($(this), options); } );
            }
        };

        loadUnityObjectJs(callback);

        return this;
    }

} (jQuery) ); //end jquery wrapper
