const QuizEnd = (item,index) => {
    return (
        <ul>
        {this.QuizData.map((item, index) =><li className="ui floating message options" key={index}> {item.answer} </li>
        )}
      </ul>
    )
}

export default QuizEnd