(() => {
    // 전역 변수는 피하는 것이 좋습니다. 
    const stepElements = document.querySelectorAll(".step");
    const graphicElements = document.querySelectorAll(".graphic-item");
    let currentItem = graphicElements[0];


    for (let i = 0; i < stepElements.length; i++) {
        // 첫번째 방법
        // stepElements[i].setAttribute("data-index", i);
        // 두번째 방법
        stepElements[i].dataset.index = i;
        graphicElements[i].dataset.index = i;
    }

    function activate() {
        currentItem.classList.add("visible");
    }
    function inactivate() {
        currentItem.classList.remove("visible")
    }

    window.addEventListener("scroll", () => {
        let step;
        let boundingRect;

        for (let i = 0; i < stepElements.length; i++) {
            step = stepElements[i];
            boundingRect = step.getBoundingClientRect();
            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                console.log(step.dataset.index);

                if (currentItem) {
                    inactivate();
                }
                currentItem = graphicElements[step.dataset.index];
                activate();

            };
        };
    });
    activate();
})();