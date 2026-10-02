function checkAnswer(id, right_answer)
{
    const field = document.getElementById(id);

    if(field.value === right_answer)
    {
        field.style.backgroundColor = "lightgreen";
    }
    else
    {
        field.style.backgroundColor = "white";
    }
}
