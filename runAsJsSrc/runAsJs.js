(function () {

    if (typeof Prism === 'undefined' || typeof document === 'undefined' || !document.querySelector) {
        return;
    }

    if (!Prism.plugins.toolbar) {
        console.warn('runAsJs plugin loaded before Toolbar plugin.');

        return;
    }

    /**
     * Registers a Run button in prism toolbar.
     */
    Prism.plugins.toolbar.registerButton('Run', function (env) {

        if (env.language === "javascript") {
            let codePre;
            var linkCopy = document.createElement('button');
            linkCopy.className = 'run';
            linkCopy.setAttribute('type', 'button');
            var linkSpan = document.createElement('span');
            linkSpan.textContent = "Run"
            linkCopy.appendChild(linkSpan);
            linkCopy.addEventListener("click", () => {
                if (!env.element.getAttribute("data-customConsole")) {
                    let customConsole = document.createElement("div");
                    let outputSpan = document.createElement("span");
                    outputSpan.textContent = "Output: ";
                    customConsole.appendChild(outputSpan);
                    codePre = document.createElement("pre");
                    codePre.style.cssText = "color:#f5f5f5";
                    let closeDiv = document.createElement("div");
                    closeDiv.style.cssText = "position:absolute;right:0.2em;bottom: 0;top: 0;height: max-content;padding: 0.2rem;margin: 0 0.2rem 0 0.2rem;";
                    let closeButton = document.createElement("button");
                    closeButton.textContent = "Close";
                    closeButton.className = "output-close";
                    closeButton.addEventListener("click", () => {
                        env.element.removeAttribute("data-customConsole");
                        customConsole.remove();
                    });
                    closeDiv.appendChild(closeButton);
                    customConsole.appendChild(codePre);
                    customConsole.appendChild(closeDiv);
                    customConsole.className = "customConsole";
                    env.element.appendChild(customConsole);
                    env.element.setAttribute("data-customConsole", "true");
                }
                console.browserDefault = console.log;
                console.log = function (text) {
                    codePre.textContent += text + "\n";
                }
                try {
                    codePre.textContent = "";
                    new Function(env.code)();
                    codePre.style.cssText = "color:#f5f5f5";
                } catch (exception) {
                    codePre.textContent = "";
                    codePre.style.cssText = "color:#f54141";
                    console.log("Error>>> " + exception.message);
                }
                console.log = console.browserDefault;
            })
            return linkCopy;
        }
    });

}());
