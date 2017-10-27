var app = {
	getQuizzy:function() {
		console.log('trying to get quiz');
		var url='https://opentdb.com/api.php?amount=10&category=29&type=multiple';
		$.getJSON(url, function(data){
			console.log('got the quiz');
			console.log(data);

			var fetchQuestion= function(question){
				console.log(question);
				$('#question').html(question.question);
				var correctOption= Math.floor(Math.random()*4);
				console.log('picked to be correct: ' +correctOption);
				for (var i =0; i < 4; i++) {
					if (correctOption===i) {
						$('#1' + i).html(question.correct_answer);
					} else {
						$('#1'+ i).html(question.incorrect_answers.pop());
					}
					
				}
				highlightOption(-1)
			};
			var selectedAnswer = -1;
			var highlightOption = function(selectedIndex) {
				for (var i = 0; i < 4; i++) {
					$('#1'+i).removeClass('selected');
					
			
				} 
				if (selectedIndex >=0) {
					selectedAnswer=selectedIndex;
					$('#1'+selectedIndex).addClass('selected');
					$('#checkAnswer').show();
				}else {
					selectedAnswer= -1;
					$('#checkAnswer').hide();
				}	
			};

			$('#10').click(function(){
				highlightOption(0);
			});
			$('#11').click(function(){
				console.log('Clicked 1');
				highlightOption(1);
			});
			$('#12').click(function(){
				console.log('Clicked 2');
				highlightOption(2);
			});
			$('#13').click(function(){
				console.log('Clicked 2');
				highlightOption(3)
			});

			var currentQuestion=0
			fetchQuestion(data.results[currentQuestion]);
			$('#nextQuestion').show();
			$('#scorecard').html('0 / 10');

			var score= 0;
			 $('#checkAnswer').click( function(){
			 	if (data.results[currentQuestion].correct_answer === $('#1' + selectedAnswer).html()) {
			 		score++;
			 		$('#scorecard').html(`Correct! ${score} / 10`);
			 	} else {
			 		$('#scorecard').html(`Incorrect! ${score}/ 10`);
			 	}
			 	$('#nextQuestion').show();
			 	$('#checkAnswer').hide();
			 })

			 $('#nextQuestion').click(function(){
			 	currentQuestion++;
			 	if (currentQuestion >= 10) {
			 		$('#scorecard').html('Quiz complete. You scored: ${score} / 10. Congatulations!');
			 	} else {
			 		fetchQuestion(data.results[currentQuestion]);
			 		$('#scorecard').html(`${score} / 10`);
			 	}
			 	$('#nextQuestion').show();
			 });
			});
	},
	refresh: function(){
		$('#quizzy').html('');
		this.getQuizzy();
	}

};
app.getQuizzy()


