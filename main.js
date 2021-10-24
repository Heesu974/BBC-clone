(() => {
    // 전역 변수는 피하는 것이 좋습니다. 
    const stepElements = document.querySelectorAll(".step");
    const graphicElements = document.querySelectorAll(".graphic-item");
    let currentItem = graphicElements[0];
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => {
        // console.log(entries[0].target.dataset.index);
        ioIndex = parseInt(entries[0].target.dataset.index);
        // console.log(typeof ioIndex)
    })


    for (let i = 0; i < stepElements.length; i++) {
        io.observe(stepElements[i]);
        // >>어떤 대상을 관찰 할건지
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
        let temp = 0;
        // 현재, 전, 후 만 체크합시다.
        // 따라서, ioIndex - 1 == 전,
        // ioIndex + 1 == 후. 
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            // 왜 여기가 ioIndex + 2 인지 이해 안 감
            // >> i 값이 현재, 전 , 후 가 되도록 하기 위해서 후 보다 1이 커야 하기 때문에
            step = stepElements[i];

            if (!step) continue;
            boundingRect = step.getBoundingClientRect();

            temp++;

            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                // console.log(step.dataset.index);

                if (currentItem) {
                    inactivate();
                }
                currentItem = graphicElements[step.dataset.index];
                activate();

            };
        }; console.log(temp)
    });
    activate();
})();