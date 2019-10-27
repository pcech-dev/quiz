const STORE = [
    {
        question: 'Who invented the Coca Cola recipe?',
        answers: ['Edward Teller', 'John Stith Pemberton', 'William Shockley', 'Linus Pauling'],
        correctAnswer: 'John Stith Pemberton'
    },
    {
        question: 'What were the two main ingredients on which the name “Coca Cola” is based?',
        answers: ['Cocoa and coca leaves', 'Coca leaves and kola nuts', 'Coca leaves and sugar', 'Cocoa and kola nuts'],
        correctAnswer: 'Coca leaves and kola nuts'
    },
    {
        question: 'In which city was the Coca-Cola Company established?',
        answers: ['New York', 'Boston', 'St. Louis', 'Atlanta'],
        correctAnswer: 'Atlanta'
    },
    {
        question: 'Since when is Coca-Cola a publicly traded company?',
        answers: ['1919', '1929', '1946', '1966'],
        correctAnswer: '1919'
    },
    {
        question: 'Under which ticker symbol is the stock of the Coca-Cola Company listed on the New York Stock Exchange?',
        answers: ['COCA', 'COLA', 'KO', 'KK'],
        correctAnswer: 'KO'
    },
    {
        question: 'Who became CEO of the Coca-Cola Company in 1980:',
        answers: ['Roberto Goizueta', 'Warren Buffet', 'Charlie Munger', 'Sam Walton'],
        correctAnswer: 'Roberto Goizueta'
    },
    {
        question: 'Which brand is currently not owned by Coca-Cola (2019):',
        answers: ['Fanta', 'Sprite', 'Schweppes tonic', 'Dr Pepper'],
        correctAnswer: 'Dr Pepper'
    }
];

let currentQuestionIndex = 0;
let score = 0;

function addStartListener() {
    $('.start-button').on('click', function (event) {
        $('.js-question').show();
        $('.records').show();
        $('.header-page').hide();
        $('.js-score').html(score);
        showQuestion();
    })
};

function showQuestion() {
    let currentQuestion = STORE[currentQuestionIndex];
    $('.js-question-number').text(currentQuestionIndex + 1);
    $('legend').text(currentQuestion.question);
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        $('label').eq(i).html(`<input type="radio" id="radio${i + 1}" name="answer" 
        value="${currentQuestion.answers[i]}" required>${currentQuestion.answers[i]}`);
    }
};


function addSubmitAnswerListener() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        let currentQuestion = STORE[currentQuestionIndex];
        let selectedAnswer = $('input:checked').val();
        $('.js-question').hide();
        if (selectedAnswer === currentQuestion.correctAnswer) {
            $('.correct-answer').show();
            score += 1;
            $('.js-score').html(score);
        }
        else {
            $('.wrong-answer').show();
            $('.js-hint').html(currentQuestion.correctAnswer);
        }
    })
}

function addNextQuestionListener() {
    $('.js-next-question').on('click', function (event) {
        $('.correct-answer').hide();
        $('.wrong-answer').hide();
        currentQuestionIndex++;
        if (currentQuestionIndex < STORE.length) {
            showQuestion();
            $('.js-question').show();
        } else {
            $('.final-score').show();
            $('.records').hide();
            showFinalMessage();
        }
    })
}

function showFinalMessage() {
    if (score === 7) {
        $('.final-score p').text('You could survive a zombie apocalypse.');
        $('.final-score img').attr('src',
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1d448964-d71e-4e65-81dc-34f57ee23f6c/dapcpgj-7bb92f10-41ab-4ec7-924f-df215f5476c3.jpg/v1/fill/w_1024,h_576,q_75,strp/christmas_truck_in_zombie_apocalypse_by_dhavlin_dapcpgj-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvMWQ0NDg5NjQtZDcxZS00ZTY1LTgxZGMtMzRmNTdlZTIzZjZjXC9kYXBjcGdqLTdiYjkyZjEwLTQxYWItNGVjNy05MjRmLWRmMjE1ZjU0NzZjMy5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.cEoNs_UI6yJvcRILdd9-Zbhfpy6og9J2KaL2iok4OGg')
            .attr('alt', 'Coca Cola truck driving in winter in zombie apocalypse');
    } else if (score > 3) {
        $('.final-score p').text('Your ability to come up with random factoids at just the right times is impressive.');
        $('.final-score img').attr('src',
            'https://cdn.pixabay.com/photo/2019/05/22/22/28/brainstorm-4222728_960_720.jpg').attr('alt', 
            'A women with glasses turned questionmarks into a light bulbs representing ideas');
    } else {
        $('.final-score p').text('There is always time to learn more about new things and try to better yourself.');
        $('.final-score img').attr('src', 'https://image.shutterstock.com/image-vector/funny-cute-soda-drink-red-600w-603971060.jpg')
        .attr('alt', 'red cup with a face is smiling');
    }
}

function addRestartListener() {
    $('.js-restart').on('click', function (event) {
        currentQuestionIndex = 0;
        score = 0;
        $('section').hide();
        $('.header-page').show();
    })
}

function initiliseQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    $('section').hide();
    $('.header-page').show();
    addStartListener();
    addSubmitAnswerListener();
    addNextQuestionListener();
    addRestartListener();
}



$(initiliseQuiz);