const cards = Array.from(document.querySelectorAll(".card"));
    const winner = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [6, 7, 8, 9],
        [7, 8, 9, 10],
        [11, 12, 13, 14],
        [12, 13, 14, 15],
        [16, 17, 18, 19],
        [17, 18, 19, 20],
        [21, 22, 23, 24],
        [22, 23, 24, 25],
        [1, 6, 11, 16],
        [6, 11, 16, 21],
        [2, 7, 12, 17],
        [7, 12, 17, 22],
        [3, 8, 13, 18],
        [8, 13, 18, 23],
        [4, 9, 14, 19],
        [9, 14, 29, 24],
        [5, 10, 15, 20],
        [10, 15, 20, 25],
        [1, 7, 13, 19],
        [7, 13, 19, 25],
        [2, 8, 14, 20],
        [6, 12, 18, 24],
        [16, 12, 8, 4],
        [21, 17, 13, 9],
        [17, 13, 9, 5],
        [22, 18, 14, 10],
    ];
    let firstPlayer = [],
        secondPlayer = [],
        count = 0;
        
    /*******************************************************/
    function check(array) {
        let finalResult = false;
        for (let item of winner) {
            let res = item.every(val => array.indexOf(val) !== -1);
            if (res) {
                finalResult = true;
                break;
            }
        }
        return finalResult;
    }
    /*******************************************************/
    function winnerpleyr(p) {
        const modal = document.createElement("div");
        const player = document.createTextNode(p);
        const replay = document.createElement("button");
        modal.classList.add("winner");
        modal.appendChild(player);
        replay.appendChild(document.createTextNode("Replay"));

        // replay.setAttribute("onclick","rep();");
        replay.onclick = function() {
            rep()
        };
        modal.appendChild(replay);
        document.body.appendChild(modal);
    }
    /*******************************************************/
    function draw() {
        if (this.classList == "card") {
            count++;
            if (count % 2 !== 0) {
                this.classList.add("x");
                firstPlayer.push(Number(this.dataset.index));
                if (check(firstPlayer)) {
                    winnerpleyr("Congrats player one you win");
                    return true;
                }
            } else {
                this.classList.add("o");
                secondPlayer.push(Number(this.dataset.index));
                if (check(secondPlayer)) {
                    winnerpleyr("Congrats player two you win");
                    return true;
                }
            }
            if (count === 25) {
                winnerpleyr("Draw");
            }
        }
    }
    /*******************************************************/
    function rep() {
        const w = document.querySelector(".winner");
        // cards.forEach(card => card.classList = "card");
        firstPlayer = [];
        secondPlayer = [];
        count = 0;
        w.remove();
        [].forEach.call(cards, function(el) {
            el.classList.remove("x");
            el.classList.remove("o");
        });


    }

    /*******************************************************/
    cards.forEach(card => card.addEventListener("click", draw));