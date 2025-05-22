document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adoptionForm');
    const donationInput = document.getElementById('donation');
    const donationImpact = document.getElementById('donationImpact');
    const animalSelect = document.getElementById('animal');
    const animalImage = document.getElementById('animalImage');
    const progressBar = document.querySelector('.form-progress-bar');

    // Update form progress
    function updateFormProgress() {
        const formElements = form.querySelectorAll('input, select');
        let filledCount = 0;

        formElements.forEach(element => {
            if (element.type === 'checkbox') {
                if (element.checked) filledCount++;
            } else {
                if (element.value.trim() !== '') filledCount++;
            }
        });

        const progress = (filledCount / formElements.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Update donation impact text with animation
    function updateDonationImpact(amount) {
        const impacts = {
            50000: '1 paket makanan satwa',
            100000: '2 paket makanan satwa + vitamin',
            250000: '1 minggu perawatan kesehatan',
            500000: '1 bulan perawatan penuh',
            1000000: '1 bulan perawatan penuh + kontribusi konservasi habitat'
        };

        let impact = '';
        for (let threshold in impacts) {
            if (amount >= parseInt(threshold)) {
                impact = impacts[threshold];
            }
        }

        donationImpact.style.opacity = '0';
        setTimeout(() => {
            if (impact) {
                donationImpact.textContent = `Donasi Anda setara dengan: ${impact}`;
            } else {
                donationImpact.textContent = 'Minimal donasi Rp50.000';
            }
            donationImpact.style.opacity = '1';
        }, 200);
    }

    // Update animal image with smooth transition
    function updateAnimalImage(animal) {
        const images = {
            'harimau': 'assets/tiger.jpg',
            'orangutan': 'assets/orangutan.jpg',
            'badak': 'assets/rhino.jpg',
            'gajah': 'assets/elephant.jpg'
        };

        if (images[animal]) {
            animalImage.style.opacity = '0';
            setTimeout(() => {
                animalImage.src = images[animal];
                animalImage.alt = `${animal} di habitatnya`;
                animalImage.style.opacity = '1';
            }, 300);
        }
    }

    // Animate numbers in stats
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const finalNumber = parseInt(stat.textContent);
            let currentNumber = 0;
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = finalNumber / steps;
            const stepTime = duration / steps;

            const counter = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    stat.textContent = finalNumber + (stat.textContent.includes('+') ? '+' : '');
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentNumber);
                }
            }, stepTime);
        });
    }

    // Event listeners
    form.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('input', updateFormProgress);
    });

    donationInput.addEventListener('input', function() {
        updateDonationImpact(this.value);
    });

    animalSelect.addEventListener('change', function() {
        updateAnimalImage(this.value);
    });

    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const animal = document.getElementById('animal').value;
        const donation = document.getElementById('donation').value;
        const agreement = document.getElementById('agreement').checked;

        // Validation checks
        if (name.length < 3) {
            showError('Nama harus diisi minimal 3 karakter');
            return;
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showError('Masukkan alamat email yang valid');
            return;
        }

        if (!animal) {
            showError('Silakan pilih satwa yang ingin diadopsi');
            return;
        }

        if (donation < 50000) {
            showError('Minimal donasi Rp50.000');
            return;
        }

        if (!agreement) {
            showError('Anda harus menyetujui untuk berdonasi');
            return;
        }

        // If all validation passes
        showSuccess(`Terima kasih ${name}! Adopsi virtual Anda sedang diproses. Kami akan mengirimkan detail lebih lanjut ke email ${email}.`);
        form.reset();
        donationImpact.textContent = '';
        animalImage.src = 'assets/orangutan.jpg';
        progressBar.style.width = '0%';
    });

    // Error and success messages with better styling
    function showError(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-error';
        alert.textContent = message;
        form.insertBefore(alert, form.firstChild);
        setTimeout(() => alert.remove(), 5000);
    }

    function showSuccess(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.textContent = message;
        form.insertBefore(alert, form.firstChild);
        setTimeout(() => alert.remove(), 5000);
    }

    // Initialize animations
    animateNumbers();
}); 