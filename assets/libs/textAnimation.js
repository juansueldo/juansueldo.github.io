export class TextAnimation {
    constructor(textElement) {
        this.textElement = textElement;
        this.letters = this.textElement.innerText.split('');
        this.init();
    }

    init() {
        this.animateLetters();
    }

    animateLetters() {
        this.textElement.innerHTML = this.letters.map((letter, i) =>
            `<span style="animation-delay: ${i * 200}ms">${letter}</span>`
        ).join('');
    }

    reanimate() {
        this.animateLetters();
    }
}