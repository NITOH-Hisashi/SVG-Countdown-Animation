const { createApp, watch } = Vue;

createApp({
    template: '#app-template',
    setup() {
        const countdownSeconds = ref(180);
        const currentNumber = ref(180);
        const circleClass = ref('circle');
        const circle = ref(null);
        let countdownInterval;

        const startCountdown = () => {
            if (isNaN(countdownSeconds.value) || countdownSeconds.value <= 0) {
                alert('有効な秒数を入力してください');
                return;
            }
            currentNumber.value = countdownSeconds.value;
            animateCircle();
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            countdownInterval = setInterval(() => {
                currentNumber.value--;
                if (currentNumber.value > 0) {
                    animateCircle();
                } else {
                    clearInterval(countdownInterval);
                }
            }, 1000); // 1000ミリ秒ごとに数値カウントダウン
        };

        const animateCircle = () => {
            circleClass.value = 'circle reset';
            //console.log({ circleClass });
            void circle.value.offsetWidth; // Reflowをトリガー
            setTimeout(() => {
                circleClass.value = 'circle animate';
                //console.log({ circleClass });
            }, 50); // 50ミリ秒後に表示アニメーション動作
        };

        watch(currentNumber, (newValue) => {
            if (newValue <= 0 && countdownInterval) {
                clearInterval(countdownInterval);
            }
        });

        return {
            countdownSeconds,
            currentNumber,
            circleClass,
            circle,
            startCountdown,
        };
    }
}).mount('#app');
