import React from 'react';

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
			highlightedAnswer: '',
            classNames: ['', '', '', '']
        }
        
		this.highlightAnswer = this.highlightAnswer.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }
    
	highlightAnswer(e) {
		let { highlightedAnswer } = this.props;
		let elem = e.currentTarget;
		let updatedClassNames = this.state.classNames;
		let answer = Number(elem.dataset.id);
		updatedClassNames[this.state.highlightAnswer-1] = '';
		updatedClassNames[answer-1] = 'selected';
		
		this.setState({
			classNames: updatedClassNames,
			highlightAnswer: answer
		});
	}
	
    checkAnswer(e) {
        let { isAnswered } = this.props;
		//Checking if they have selected an answer before submitting
        if(!this.state.highlightAnswer){
			alert("You need to select an answer");
		}
        if(!isAnswered) {
            let { correctAnswer, increaseScore } = this.props;
            let answer = this.state.highlightAnswer;
            let updatedClassNames = this.state.classNames;

            if(answer === correctAnswer){
                updatedClassNames[answer-1] = 'right';
                increaseScore();
            }
            else {
                updatedClassNames[answer-1] = 'wrong';
            }
            
            this.setState({
                classNames: updatedClassNames
            })
        }
    }
    
    shouldComponentUpdate() {
        return true;
    }
    
    render() {
        let { answers } = this.props;
        let { classNames } = this.state;
        
        let transition = {
            transitionName: "example",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 300
        }
        
        return (
			<div>
				<div id="answers">
					<ul>
						<li onClick={this.highlightAnswer} className={classNames[0]} data-id="1"><span>A</span> <p>{answers[0]}</p></li>
						<li onClick={this.highlightAnswer} className={classNames[1]} data-id="2"><span>B</span> <p>{answers[1]}</p></li>
						<li onClick={this.highlightAnswer} className={classNames[2]} data-id="3"><span>C</span> <p>{answers[2]}</p></li>
						<li onClick={this.highlightAnswer} className={classNames[3]} data-id="4"><span>D</span> <p>{answers[3]}</p></li>
					</ul>
				</div>	
				<div class="horizontal-line"></div>
				<button className="fancy-btn" onClick={this.checkAnswer}>Check Answer</button>
				<div class="horizontal-line"></div>
			</div>
        );
    }
}

export default Answers