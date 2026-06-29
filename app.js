document.addEventListener('DOMContentLoaded', () => {
    const intakeForm = document.getElementById('patientIntakeForm');
    const casesList = document.getElementById('casesList');
    const emptyState = document.getElementById('emptyState');

    let caseCounter = 0;

    intakeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retrieve values
        const fullName = document.getElementById('fullName').value.trim();
        const age = document.getElementById('age').value.trim();
        const symptoms = document.getElementById('symptoms').value.trim();

        // Simple validation check
        if (!fullName || !age || !symptoms) {
            alert('يرجى ملء جميع الحقول المطلوبة.');
            return;
        }

        // Increment case ID counter
        caseCounter++;

        // Hide empty state if visible
        if (emptyState) {
            emptyState.style.display = 'none';
        }

        // Create new case card elements
        const caseCard = document.createElement('article');
        caseCard.className = 'case-card';
        caseCard.id = `case-${caseCounter}`;

        caseCard.innerHTML = `
            <div class="case-header">
                <span class="case-name">${escapeHTML(fullName)}</span>
                <span class="case-age">${escapeHTML(age)} سنة</span>
            </div>
            <p class="case-symptoms">${escapeHTML(symptoms)}</p>
            <div class="treatment-area">
                <label for="treatment-${caseCounter}">الخطة العلاجية والوصفة الطبية:</label>
                <textarea 
                    id="treatment-${caseCounter}" 
                    class="form-control" 
                    placeholder="اكتب الخطة العلاجية والوصفة الطبية هنا... (يتم الحفظ تلقائياً)"
                ></textarea>
                <span class="save-badge" id="badge-${caseCounter}">تم الحفظ</span>
            </div>
        `;

        // Prepend to cases list (newest case at the top)
        casesList.insertBefore(caseCard, casesList.firstChild);

        // Add auto-save simulation to the treatment textarea
        const treatmentTextarea = caseCard.querySelector('textarea');
        const saveBadge = caseCard.querySelector('.save-badge');
        let saveTimeout;

        treatmentTextarea.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                saveBadge.classList.add('show');
                setTimeout(() => {
                    saveBadge.classList.remove('show');
                }, 1500);
            }, 800); // Trigger auto-save simulation 800ms after user stops typing
        });

        // Reset form & focus first element
        intakeForm.reset();
        document.getElementById('fullName').focus();

        // Soft visual flash effect for form button to confirm send
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>تم الإرسال بنجاح!</span>`;
        submitBtn.style.backgroundColor = '#2E7D32'; // temporarily green

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
        }, 2000);
    });

    // Helper to escape HTML and prevent XSS in mockup
    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
