/**
 * Developed by Hossein bazrafkan
 * ho3ein.b.83@gmail.com
 * Github: @Ho3ein83
 */

class TextEditor {

    constructor( el, el2, el3 ) {

        let myClass = this;

        myClass.action = '';

        myClass.clickListener = [];

        myClass.element = el;
        myClass.elementView = el2;
        myClass.elementEl = el3;

        myClass.text = $(myClass.element).val();

        myClass.liveMode = false;

        $(document).on('keyup change click', $(myClass.element), function(){

            if(myClass.liveMode){

                myClass.updateEditor();

            }

            myClass.save();

        });

        return this;

    }

    getEl(){
        return this.element;
    }

    convertToHtml(text){

        let myClass = this;

        text = text.replace(/\n/gi, "<br>");

        let str = text;

        return str;

    }

    switchHtml(){

        let myClass = this;

        $(myClass.elementView).fadeOut(0);
        $(myClass.element).fadeIn();

        $(myClass.element).html(myClass.text);

        $('[data-editor-action="editor-show-html"]').fadeOut(0);
        $('[data-editor-action="editor-show-text"]').fadeIn();
        $('[data-editor-action="editor-live-mode"]').removeClass('active');

        return myClass;

    }

    switchText(){

        let myClass = this;

        $(myClass.element).fadeOut(0);
        $(myClass.elementView).fadeIn();

        $(this.elementView).html(myClass.text);

        $('[data-editor-action="editor-show-html"]').fadeIn();
        $('[data-editor-action="editor-show-text"]').fadeOut(0);
        $('[data-editor-action="editor-live-mode"]').removeClass('active');

        return myClass;

    }

    switchLiveMode(){

        let myClass = this;

        if(myClass.liveMode === false){

            $(myClass.element).fadeIn();
            $(myClass.elementView).fadeIn();

            $('[data-editor-action="editor-show-html"]').fadeOut(0);
            $('[data-editor-action="editor-show-text"]').fadeOut(0);
            $('[data-editor-action="editor-live-mode"]').addClass('active');

            myClass.liveMode = true;

        }
        else{

            $(myClass.element).fadeIn();
            $(myClass.elementView).fadeOut(0);

            $('[data-editor-action="editor-show-html"]').fadeOut(0);
            $('[data-editor-action="editor-show-text"]').fadeIn();
            $('[data-editor-action="editor-live-mode"]').removeClass('active');

            myClass.liveMode = false;

        }

    };

    onOptionClick(action, listener){

        let myClass = this;

        myClass.clickListener[action] = listener;

        return myClass;

    }

    updateEditor(){

        let myClass = this;

        $(myClass.elementView).html(myClass.convertToHtml(myClass.text));

    }

    save(){

        let myClass = this;

        myClass.text = $(myClass.element).val();

        myClass.updateEditor();

    }

    start(){

        let myClass = this;

        $(myClass.elementEl).html('<div class="hb-editor-elements">\n' +
            '\n' +
            '                    <div data-editor-action="editor-bold">\n' +
            '                        <i class="fa fa-bold"></i>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-italic">\n' +
            '                        <i class="fa fa-italic"></i>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-underline">\n' +
            '                        <i class="fa fa-underline"></i>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="spacer"></div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-erase">\n' +
            '                        <i class="fa fa-eraser"></i>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="spacer"></div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-link">\n' +
            '                        <i class="fa fa-link"></i>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-image">\n' +
            '                        <i class="fa fa-file-image-o"></i>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="spacer"></div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-align-right">\n' +
            '                        <i class="fa fa-align-right"></i>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-align-center">\n' +
            '                        <i class="fa fa-align-center"></i>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-align-left">\n' +
            '                        <i class="fa fa-align-left"></i>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-align-justify">\n' +
            '                        <i class="fa fa-align-justify"></i>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="spacer"></div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-show-html" style="display: none;">\n' +
            '                        <i class="fa fa-file-text"></i>\n' +
            '                        HTML\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-show-text">\n' +
            '                        <i class="fa fa-file-text-o"></i>\n' +
            '                        Text\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div data-editor-action="editor-live-mode">\n' +
            '                        <i class="fa fa-circle"></i>\n' +
            '                        Live\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="spacer"></div>\n' +
            '\n' +
            '                </div>');

        $("[data-editor-action]").click(function(){

            let actionText = $(this).attr('data-editor-action');
            myClass.action = actionText;

            if(myClass.clickListener.hasOwnProperty(actionText)){

                myClass.clickListener[actionText]();

            }

        });

        myClass.onOptionClick('editor-live-mode', function(){
            myClass.switchLiveMode()
        });

        myClass.onOptionClick('editor-show-html', function(){
            myClass.switchHtml()
        });

        myClass.onOptionClick('editor-show-text', function(){
            myClass.switchText()
        });

        myClass.onOptionClick('editor-bold', function(){

            var $selectedEl = $(myClass.getEl());
            var selectedText = $selectedEl.fieldSelection();
            let boldText = selectedText.text.toString().trim();

            if(boldText.length > 0){
                let bTag = '<b>' + boldText + '</b>';
                $selectedEl.fieldSelection(bTag);
                myClass.save();
            }

        });

        myClass.onOptionClick('editor-italic', function(){

            var $selectedEl = $(myClass.getEl());
            var selectedText = $selectedEl.fieldSelection();
            let italicText = selectedText.text.toString().trim();

            if(italicText.length > 0){
                let iTag = '<i>' + italicText + '</i>';
                $selectedEl.fieldSelection(iTag);
                myClass.save();
            }

        });

        myClass.onOptionClick('editor-underline', function(){

            var $selectedEl = $(myClass.getEl());
            var selectedText = $selectedEl.fieldSelection();
            let underlineText = selectedText.text.toString().trim();

            if(underlineText.length > 0){
                let uTag = '<u>' + underlineText + '</u>';
                $selectedEl.fieldSelection(uTag);
                myClass.save();
            }

        });

        myClass.onOptionClick('editor-erase', function(){

            var $selectedEl = $(myClass.getEl());
            $selectedEl.fieldSelection("");
            myClass.save();

        });

        myClass.onOptionClick('editor-align-right', function(){

            var $selectedEl = $(myClass.getEl());
            var selectedText = $selectedEl.fieldSelection();
            let rightText = selectedText.text.toString().trim();

            if(rightText.length > 0){
                let divTag = '<div style="text-align: right;">' + rightText + '</div>';
                $selectedEl.fieldSelection(divTag);
                myClass.save();
            }

        });

        myClass.onOptionClick('editor-align-center', function(){

            var $selectedEl = $(myClass.getEl());
            var selectedText = $selectedEl.fieldSelection();
            let centerText = selectedText.text.toString().trim();

            if(centerText.length > 0){
                let divTag = '<div style="text-align: center;">' + centerText + '</div>';
                $selectedEl.fieldSelection(divTag);
                myClass.save();
            }

        });

        myClass.onOptionClick('editor-align-left', function(){

            var $selectedEl = $(myClass.getEl());
            var selectedText = $selectedEl.fieldSelection();
            let leftText = selectedText.text.toString().trim();

            if(leftText.length > 0){
                let divTag = '<div style="text-align: left;">' + leftText + '</div>';
                $selectedEl.fieldSelection(divTag);
                myClass.save();
            }

        });

        myClass.onOptionClick('editor-align-justify', function(){

            var $selectedEl = $(myClass.getEl());
            var selectedText = $selectedEl.fieldSelection();
            let justifyText = selectedText.text.toString().trim();

            if(justifyText.length > 0){
                let divTag = '<div style="text-align: justify;">' + justifyText + '</div>';
                $selectedEl.fieldSelection(divTag);
                myClass.save();
            }

        });

        myClass.onOptionClick('editor-link', function(){

            var $selectedEl = $(myClass.getEl());
            var selectedText = $selectedEl.fieldSelection();
            let linkText = selectedText.text.toString().trim();

            let text = prompt('Please enter link text', linkText);

            if(text != null){

                let url = prompt('Please enter link URL');

                if(url != null){

                    let blank = false;

                    if(confirm("Open in new tab?")){
                        blank = true;
                    }

                    let aTag = '<a href="' + (url.length > 0 ? url : '#') + '"' + (blank === true ? ' target="_blank"' : '') + '>' + (text.length > 0 ? text : '') + '</a>';
                    $selectedEl.fieldSelection(aTag);
                    myClass.save();

                }

            }
        });

        myClass.onOptionClick('editor-image', function(){

            var $selectedEl = $(myClass.getEl());
            var selectedText = $selectedEl.fieldSelection();
            let altText = selectedText.text.toString().trim();

            let alt = prompt('Please enter image alt text:', altText);

            if(alt != null){

                let url = prompt('Please enter image URL:');

                if(url != null){

                    let width = prompt('Enter image width:', 'auto');

                    if(width != null){

                        let imgTag = '<img src="' + (url.length > 0 ? url : '') + '"' + (width != null ? ' style="width: ' + width + '; height: auto;"' : '') + (alt.length > 0 ? 'alt="' + alt + '"' : '') + '>';
                        $selectedEl.fieldSelection(imgTag);
                        myClass.save();

                    }

                }

            }
        });

        return myClass;

    }

}