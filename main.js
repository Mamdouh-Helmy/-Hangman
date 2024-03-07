// Letters
let lettersEnglish = 'abcdefghijklmnopqrstuvwxyz';
let lettersArabic = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'
let lettersArrary = Array.from(lettersEnglish)
let lettersArrary1 = Array.from(lettersArabic)
let check = true

let clcik = document.querySelector(".clcik");
clcik.addEventListener('click' , () => {

    lettersContainer.innerHTML = ""

    if(check){
        clcik.innerHTML = 'English'
        lettersArrary1.forEach(letter => {
            // Create Span
            let span = document.createElement("span");
        
            // Craete Letters Text Node
            let theLetter = document.createTextNode(letter);
        
            // Append The LEtter To Span
            span.appendChild(theLetter);
        
            // Add Class On Span
            span.className = 'letter-box';
        
            // Append Span To The Letters Container 
            lettersContainer.appendChild(span);
        });
        check = false;

    }else{
        clcik.innerHTML = 'Arabic'
        lettersArrary.forEach(letter => {
            // Create Span
            let span = document.createElement("span");
        
            // Craete Letters Text Node
            let theLetter = document.createTextNode(letter);
        
            // Append The LEtter To Span
            span.appendChild(theLetter);
        
            // Add Class On Span
            span.className = 'letter-box';
        
            // Append Span To The Letters Container 
            lettersContainer.appendChild(span);
        });
        check = true;
    }
})

//Video
let video = document.getElementById("mam")
let video1 = document.getElementById("mam1")

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArrary.forEach(letter => {
    // Create Span
    let span = document.createElement("span");

    // Craete Letters Text Node
    let theLetter = document.createTextNode(letter);

    // Append The LEtter To Span
    span.appendChild(theLetter);

    // Add Class On Span
    span.className = 'letter-box';

    // Append Span To The Letters Container 
    lettersContainer.appendChild(span);
});

//Object  Of Words + Categories
const words = {
    "حيونات": ['اسد' , 'كلب' , 'معزه' , 'خروف' , 'بغبغان' , 'قرد' , 'قطه' , 'فيل'],
    "افلام او مسلسلات": ['تيتو' , 'الواد السيد الشحات' , 'البرنس' , 'جعفر العمده' , 'قلب الاسد' , 'زكي شان' , 'X لارج' , 'البيت الكبير'],
    "جماد": ['كرسي' , 'كنبه' , 'لمبه' , 'شاشه' , 'باب' , 'تلفون'],
    "انسان": ['احمد' , 'محمد' , 'ممدوح' , 'حنين' , 'ملك' , 'يوسف' , 'حمزه', 'ليلي', 'عبيده', 'محمود', 'ريان', 'عبيده', 'داليا', 'اسلام', 'سمر'],
    "بلاد":['مصر','سوريا','امريكا','السعوديه','المغرب','انجلترا','المانيا','المكسيك']
}

// Get Random Property 
let allKeys = Object.keys(words); 
let randomPropNumber = Math.floor(Math.random() * allKeys.length)
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length)
let randomvalueValue = randomPropValue[randomValueNumber];

// set Category Info 
document.querySelector(".game-info .category span").innerHTML = `${randomPropName}`;

// select Letters Guess Element 
let lettersGuessContainer = document.querySelector(".letters-guess");

//Convert Chosen Word To Arrary
let lettersAndSpace = Array.from(randomvalueValue);

//Craete Spans Depened on Word
lettersAndSpace.forEach(letter => {
    //Create Empty sapn
    let emptySpan = document.createElement('span');

    //if Letter Is Space
    if(letter === " "){
        //Add class to the span
        emptySpan.className = 'with-space';
    }

    //Append Spans To The Letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
});

//Slect Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");
let arr = [];

// Set Worng Attempts
let WorngAttempts = 0;

// Slect The Draw Element
let theDraw = document.querySelector('.hangman-draw');

//Handel Clicking On Letters
lettersContainer.addEventListener('click' , (even) => {

    // Set The Chose Status
    let theStatus = false;

    if(even.target.className === 'letter-box'){

        even.target.classList.add("clicked");

        //Get Clicked Letter
        let theClickedLetter = even.target.innerHTML.toLowerCase();
        arr.push(theClickedLetter)
        console.log(arr.length)

        //The Chosen Word
        lettersAndSpace.forEach((wordLetter , wordIndex) => {

            // If The clicked Letter Equal To One Of The Chosen Word Letter
            if(theClickedLetter === wordLetter.toLowerCase()){
                
                theStatus = true;

                //Loop On All Guess Spans
                guessSpans.forEach((span , spanIndex) => {

                    if(wordIndex === spanIndex){

                        span.innerHTML = theClickedLetter;
                    }
                })
            }
        })

        // outside Loop

        // If Letter Is Worng
        if(theStatus !== true){

            //Increase The Worng Attempts
            WorngAttempts++;

            // Add Class Worng On The Draw Element 
            theDraw.classList.add(`wrong-${WorngAttempts}`);

            // Play fail Sound
            document.getElementById("fail1").play();

            if(WorngAttempts === 4){
                setTimeout(() => {
                    video.pause()
                    video.style.display = 'none';
                }, 12000)

                    video.style.display = 'block';
                    video.play()
            }

            if(WorngAttempts === 8){
                endGame1();
                lettersContainer.classList.add('finished');
                document.getElementById("fail").play();
                document.getElementById("fail1").pause();
            }
        }else{
            // Play success Sound
            document.getElementById("success1").play();

            let allGuessed = true;

            guessSpans.forEach(span => {
                if (span.innerHTML === '' && span.className !== 'with-space') {
                    allGuessed = false;
                }
            });

            if (allGuessed) {
                setTimeout(() => {
                    video1.play();
                    video1.style.display = 'block';
                    document.getElementById("success").pause(); 
                } , 2000)
                document.getElementById("success").play(); 
                endGame2();
                document.getElementById("success1").pause();
            }
        }
    }
})


// End Game Function
function endGame1(){
    
    // Crate Popup Div
    let div = document.createElement('div');

    let span = document.createElement('span');

    // Crate Text 
    div.textContent = 'Game Over, The Word Is'
    span.textContent = `${randomvalueValue}`;

    div.appendChild(span);

    // Add Class On Div 
    div.className = 'popup';

    document.body.appendChild(div)

    setTimeout(() => {
        location.reload();
    }, 5000)
}

function endGame2(){
    // Crate Popup Div
    let div = document.createElement('div');

    let span = document.createElement('span');

    let div1 = document.createElement('div');

    // Crate Text 
    div.textContent = `Congratulations to you and the word is `
    span.textContent = `${randomvalueValue}`;

    if(WorngAttempts === 0){
        div1.textContent = "There is no number of incorrect attempts"
    }else{
        div1.textContent = `Number of incorrect attempts :: ( ${WorngAttempts} )`
    }

    div.appendChild(span);
    div.appendChild(div1)

    // Add Class On Div 
    div.className = 'Good';

    document.body.appendChild(div)

    setTimeout(() => {
        location.reload();
    }, 12000)
}

console.log(randomvalueValue)