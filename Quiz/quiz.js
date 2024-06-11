// 1. APPLICATION STATE
const state = {
    fragen: [
        {
            frage: "Was ist die Hauptstadt von Deutschland?",
            optionen: ["Berlin", "München", "Hamburg", "Köln"],
            antwort: "Berlin"
        },
        {
            frage: "Wer hat die Relativitätstheorie entwickelt?",
            optionen: [
                "Isaac Newton",
                "Albert Einstein",
                "Nikola Tesla",
                "Thomas Edison"
            ],
            antwort: "Albert Einstein"
        },
        {
            frage: "Was ist der größte Planet in unserem Sonnensystem?",
            optionen: ["Erde", "Mars", "Jupiter", "Saturn"],
            antwort: "Jupiter"
        },
        {
            frage: "Wer hat das Buch '1984' geschrieben?",
            optionen: [
                "George Orwell",
                "Aldous Huxley",
                "J.K. Rowling",
                "Stephen King"
            ],
            antwort: "George Orwell"
        },
        {
            frage: "Was ist die Quadratwurzel von 81?",
            optionen: ["7", "8", "9", "10"],
            antwort: "9"
        },
        {
            frage: "Wer hat das World Wide Web erfunden?",
            optionen: [
                "Bill Gates",
                "Steve Jobs",
                "Tim Berners-Lee",
                "Mark Zuckerberg"
            ],
            antwort: "Tim Berners-Lee"
        },
        {
            frage: "In welchem Jahr fiel die Berliner Mauer?",
            optionen: ["1987", "1989", "1991", "1993"],
            antwort: "1989"
        },
        {
            frage: "Wer hat das iPhone erfunden?",
            optionen: ["Microsoft", "Apple", "Samsung", "Nokia"],
            antwort: "Apple"
        },
        {
            frage: "Wer hat das Gemälde 'Die Mona Lisa' gemalt?",
            optionen: [
                "Vincent Van Gogh",
                "Pablo Picasso",
                "Leonardo da Vinci",
                "Claude Monet"
            ],
            antwort: "Leonardo da Vinci"
        },
        {
            frage: "Was ist der höchste Berg der Welt?",
            optionen: ["K2", "Mount Everest", "Kilimandscharo", "Mont Blanc"],
            antwort: "Mount Everest"
        },
        {
            frage: "Wer hat das Buch 'Der Herr der Ringe' geschrieben?",
            optionen: [
                "J.K. Rowling",
                "George R.R. Martin",
                "J.R.R. Tolkien",
                "Stephen King"
            ],
            antwort: "J.R.R. Tolkien"
        },
        {
            frage: "Was ist der kleinste Kontinent der Welt?",
            optionen: ["Afrika", "Australien", "Antarktis", "Europa"],
            antwort: "Australien"
        },
        {
            frage: "Wer hat die Glühbirne erfunden?",
            optionen: [
                "Nikola Tesla",
                "Thomas Edison",
                "Alexander Graham Bell",
                "Benjamin Franklin"
            ],
            antwort: "Thomas Edison"
        },
        {
            frage: "In welchem Jahr wurde das Internet öffentlich zugänglich?",
            optionen: ["1983", "1991", "1995", "2000"],
            antwort: "1991"
        }
    ],
    aktuelleFrage: 0,
    punkte: 0
};

// 2. STATE ACCESSORS/MUTATORS FN'S
function getAktuelleFrage() {
    return state.fragen[state.aktuelleFrage];
}

function incrementFrageIndex() {
    state.aktuelleFrage++;
}

function incrementPunkte() {
    state.punkte++;
}

function resetQuiz() {
    state.aktuelleFrage = 0;
    state.punkte = 0;
}

// 3. DOM Node Refs
const quizContainer = document.getElementById('quiz-container');
const scoreDisplay = document.getElementById('score');

// 4. DOM Node Creation Fn's
function createButton(option) {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => onOptionClick(option);
    return button;
}

function createQuestionElement(frage) {
    const frageElement = document.createElement('h2');
    frageElement.textContent = frage;
    return frageElement;
}

function createRestartButton() {
    const button = document.createElement('button');
    button.textContent = "Neuer Versuch";
    button.onclick = onNeuerVersuchClick;
    return button;
}

// 5. RENDER FN
function renderFrage() {
    const frageObjekt = getAktuelleFrage();
    quizContainer.innerHTML = '';
    quizContainer.appendChild(createQuestionElement(frageObjekt.frage));
    frageObjekt.optionen.forEach(option => {
        quizContainer.appendChild(createButton(option));
    });
    updateScoreDisplay();
}

function renderErgebnis() {
    quizContainer.innerHTML = `Du hast ${state.punkte} von ${state.fragen.length} möglichen Punkten erreicht.`;
    quizContainer.appendChild(createRestartButton());
    updateScoreDisplay();
    const backgroundColor = state.punkte === state.fragen.length ? 'green' : 'red';
    quizContainer.style.background = backgroundColor;
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Aktuelle Punktzahl: ${state.punkte}`;
    scoreDisplay.style.background = `rgba(0, #93202033, 0, ${state.punkte / state.fragen.length})`;
}

// 6. EVENT HANDLERS
function onOptionClick(option) {
    const frageObjekt = getAktuelleFrage();
    if (option === frageObjekt.antwort) {
        incrementPunkte();
        alert('Richtig!');
    } else {
        alert(`Falsch! Die richtige Antwort ist: ${frageObjekt.antwort}`);
    }
    incrementFrageIndex();
    if (state.aktuelleFrage < state.fragen.length) {
        renderFrage();
    } else {
        renderErgebnis();
    }
}

function onNeuerVersuchClick() {
    resetQuiz();
    renderFrage();
}

// 7. INIT BINDINGS
document.addEventListener('DOMContentLoaded', () => {
    renderFrage();
});

// 8. INITIAL RENDER
renderFrage();
