function checkAnswer(id, right_answer)
{
    const field = document.getElementById(id);

    if(field.value === right_answer)
    {
        field.style.backgroundColor = "#d4edda";
    }
    else
    {
        field.style.backgroundColor = "white";
    }
}
