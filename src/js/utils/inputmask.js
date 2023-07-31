import inputmask from "inputmask/dist/inputmask.es6.js";

inputmask({
    mask: "+99 999 999 99 99", //+63 493 343 34 34
    greedy: false,
    clearIncomplete: true,
    showMaskOnHover: true,
}).mask('input[name="phone"]'); 