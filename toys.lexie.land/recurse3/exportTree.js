import stringifyStylesheet from '../libraries/stringify-css-rule.js'

document.querySelector("input[target='export']").addEventListener('click', function() {
    exportTree();
});

function exportTree() {
    const tree = document.querySelector("#treeBranch");

    const blendmode_mix = document.querySelector("#br_blendMode_mix");
    const blendmode_bg = document.querySelector("#br_blendMode_bg");
    const selectedmix = blendmode_mix.options[blendmode_mix.selectedIndex].text;
    const selectedbg = blendmode_bg.options[blendmode_bg.selectedIndex].text;

    const fl_blendmode_mix = document.querySelector("#fl_blendMode_mix");
    const fl_blendmode_bg = document.querySelector("#fl_blendMode_bg");
    const fl_selectedmix = fl_blendmode_mix.options[fl_blendmode_mix.selectedIndex].text;
    const fl_selectedbg = fl_blendmode_bg.options[fl_blendmode_bg.selectedIndex].text;

    const branchStyle = document.createElement("style");
    document.head.appendChild(branchStyle);
    const branchSheet = branchStyle.sheet;
    branchSheet.insertRule(`
        :root {
            --styleBoxWidth: 20%;
            /* branch vars */
            --branchWidth: 4px;
            --branchHeight: ${document.querySelector("#br_height").value}px;
            --branchBorderRad_topL: ${document.querySelector("#br_borderRadius_topL").value}px;
            --branchBorderRad_topR: ${document.querySelector("#br_borderRadius_topR").value}px;
            --branchBorderRad_bottomL: ${document.querySelector("#br_borderRadius_bottomL").value}px;
            --branchBorderRad_bottomR: ${document.querySelector("#br_borderRadius_bottomR").value}px;
            --branchBlendMode_mix: ${selectedmix};
            --branchBlendMode_bg: ${selectedbg};
            --branchBackground: ${document.querySelector("#br_background").value};
            --branchBorderWidth: ${document.querySelector("#br_borderWidth").value}px;
            --branchBorderColour: ${document.querySelector("#br_borderColour").value};
            --branchBorderType: ${document.querySelector("#br_borderType").value};
            --branchBoxShadowSetMode: ${document.querySelector("#br_boxshadow_setMode").value};
            --branchBoxShadowXpos: ${document.querySelector("#br_boxshadow_xOffset").value}px;
            --branchBoxShadowYpos: ${document.querySelector("#br_boxshadow_yOffset").value}px;
            --branchBoxShadowBlur: ${document.querySelector("#br_boxshadow_blurRad").value}px;
            --branchBoxShadowSpread: ${document.querySelector("#br_boxshadow_spreadRad").value}px;
            --branchBoxShadowColour: ${document.querySelector("#br_boxshadow_color").value};
            /* flower vars */
            --flowerBorderRad_topL: ${document.querySelector("#fl_borderRadius_topL").value}px;
            --flowerBorderRad_topR: ${document.querySelector("#fl_borderRadius_topR").value}px;
            --flowerBorderRad_bottomL: ${document.querySelector("#fl_borderRadius_bottomL").value}px;
            --flowerBorderRad_bottomR: ${document.querySelector("#fl_borderRadius_bottomR").value}px;
            --flowerBackground: ${document.querySelector("#fl_background").value};
            --flowerBorderWidth: ${document.querySelector("#fl_borderWidth").value}px;
            --flowerBorderColour: ${document.querySelector("#fl_borderColour").value};
            --flowerBorderType: ${document.querySelector("#fl_borderType").value};
            --flowerBlendMode_mix: ${fl_selectedmix};
            --flowerBlendMode_bg: ${fl_selectedbg};
            --flowerBoxShadowSetmode: ${document.querySelector("#fl_boxshadow_setMode").value};
            --flowerBoxShadowXpos: ${document.querySelector("#fl_boxshadow_xOffset").value}px;
            --flowerBoxShadowYpos: ${document.querySelector("#fl_boxshadow_yOffset").value}px;
            --flowerBoxShadowBlur: ${document.querySelector("#fl_boxshadow_blurRad").value}px;
            --flowerBoxShadowSpread: ${document.querySelector("#fl_boxshadow_spreadRad").value}px;
            --flowerBoxShadowColor: ${document.querySelector("#fl_boxshadow_color").value};
        }
    `, branchSheet.cssRules.length);
    branchSheet.insertRule(`
        .branch {
            position: absolute;
            left: 100%;
            transform-origin: 0% 50%;
            display: flex;
            box-sizing: border-box;
            width: var(--w);
            transform: rotate(var(--a));
            height: var(--branchWidth);
            border-radius: var(--branchBorderRad_topL) var(--branchBorderRad_topR) var(--branchBorderRad_bottomL) var(--branchBorderRad_bottomR);
            border-width: var(--branchBorderWidth);
            border-style: var(--branchBorderType);
            border-color: var(--branchBorderColour);
            background: var(--branchBackground);
            box-shadow: var(--branchBoxShadowSetMode)
                        var(--branchBoxShadowXpos)
                        var(--branchBoxShadowYpos)
                        var(--branchBoxShadowBlur)
                        var(--branchBoxShadowSpread)
                        var(--branchBoxShadowColour);
            mix-blend-mode: var(--branchBlendMode_mix);
            background-blend-mode: var(--branchBlendMode_bg);
        }
    `, branchSheet.cssRules.length);
    branchSheet.insertRule(`
        .root {
            left: 50%;
            top: 100%;
            transform-origin: 0% 0%;
        }
    `, branchSheet.cssRules.length);
    branchSheet.insertRule(`
        .flower {
            position: absolute;
            display: flex;
            box-sizing: border-box;
            left: 100%;
            top: 50%;
            transform-origin: 0% 25%;
            transform: Rotate(180deg);
            /* styling vars */
            height: var(--h);
            width: var(--w);
            border-radius:  var(--flowerBorderRad_topL)
                            var(--flowerBorderRad_topR)
                            var(--flowerBorderRad_bottomL)
                            var(--flowerBorderRad_bottomR);
            
            background: var(--flowerBackground);
            mix-blend-mode: var(--flowerBlendMode_mix);
            background-blend-mode: var(--flowerBlendMode_bg);
            box-shadow: var(--flowerBoxShadow);
            border-width: var(--flowerBorderWidth);
            border-color: var(--flowerBorderColour);
            border-style: var(--flowerBorderType);
            box-shadow: var(--flowerBoxShadowSetmode)
                        var(--flowerBoxShadowXpos)
                        var(--flowerBoxShadowYpos)
                        var(--flowerBoxShadowBlur)
                        var(--flowerBoxShadowSpread)
                        var(--flowerBoxShadowColor);
            animation: anim-flower duration timing-function delay iteration-count direction fill-mode;
        }
    `, branchSheet.cssRules.length);

    let htmlContent = [`<!DOCTYPE html><head><style>${stringifyStylesheet(branchSheet)}</style></head><body>${treeBranch.outerHTML}</body>`];
    let bl = new Blob(htmlContent, {type: "text/html"});

    let a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = "drag-me-into-flippabook.html";
    a.hidden = true;
    document.body.appendChild(a);
    a.innerHTML = "beep boop downloading";
    a.click();
}