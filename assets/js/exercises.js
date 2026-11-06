function initExercises(exercisesData, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // 1. Vygenerování HTML kódu
  let html = '<table class="w-100"><tbody>';

  exercisesData.forEach((ex, index) => {
    // Nalezení nejdelší odpovědi pro dynamické nastavení délky pole
    const maxLength = Math.max(...ex.answers.map(ans => ans.length));

    // Podmíněné vložení prefixu a sufixu včetně mezer
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
                <span class="ms-2 exercise_status" id="status-${index}"></span>
            </td>
        </tr>
    `;
  });

  html += '</tbody></table>';
  container.innerHTML = html;

  // 2. Vyhodnocovací funkce (Event Delegation na událost 'input')
  container.addEventListener('input', function(event) {
    if (event.target.classList.contains('exercise_field')) {
      const inputField = event.target;
      const index = inputField.getAttribute('data-index');
      const expectedAnswers = exercisesData[index].answers;
      const statusSpan = document.getElementById(`status-${index}`);

      // Očištění vstupu od nechtěných mezer
      const userAnswer = inputField.value.trim();

      if (userAnswer === "") {
        // Pokud uživatel pole vymaže, skryjeme symbol
        statusSpan.textContent = "";
      } else if (expectedAnswers.includes(userAnswer)) {
        // Shoda s alespoň jednou odpovědí v poli
        statusSpan.textContent = "✅";
      } else {
        // Text neodpovídá žádné správné odpovědi
        statusSpan.textContent = "❌";
      }
    }
  });
}
