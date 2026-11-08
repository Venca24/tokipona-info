function initExercises(exercisesData, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let html = '<table class="w-100"><tbody>';

  exercisesData.forEach((ex, index) => {
    const maxLength = Math.max(...ex.answers.map(ans => ans.length));

    const prefixHtml = ex.prefix ? `${ex.prefix} ` : '';
    const suffixHtml = ex.suffix ? ` ${ex.suffix}` : '';

    html += `
        <tr>
            <td class="w-50 text-end pe-2 align-top"><em>${ex.prompt}</em></td>
            <td class="align-top">
                ${prefixHtml}
                <input class="exercise_field"
                       type="text"
                       size="${maxLength}"
                       maxlength="${maxLength}"
                       data-index="${index}"
                       autocomplete="off"
                       autocapitalize="off">
                ${suffixHtml}
                <span class="ms-2 exercise_status"></span>
            </td>
        </tr>
    `;
  });

  html += '</tbody></table>';
  container.innerHTML = html;

  container.addEventListener('input', function(event) {
    if (event.target.classList.contains('exercise_field')) {
      const inputField = event.target;
      const index = inputField.getAttribute('data-index');
      const expectedAnswers = exercisesData[index].answers;
      const statusSpan = inputField.parentNode.querySelector('.exercise_status');

      const userAnswer = inputField.value.trim();

      if (userAnswer === "") {
        statusSpan.textContent = "";
      } else if (expectedAnswers.includes(userAnswer)) {
        statusSpan.textContent = "✅";
      } else {
        statusSpan.textContent = "❌";
      }
    }
  });
}
