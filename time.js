const prompt = require("prompt");
prompt.start();
/**
 * 시각
 * 
 * 정수 N이 입력되면 00시 00분 00초 부터 N시 59분 59초까지 모ㅓ
 */
prompt.get(["hour"], function(err, firstRes){
    const { hour } = firstRes;
    let answer = 0;
    let answer2 = 0;

    /**
     * 풀이 1
     */
    // 00시 00분 00초부터 N시 59분 59초까지를 계산하기위해
    // N * 60 * 60(입력된 시간을 초로 변환) + 59 * 60(59분을 초로 계산) + 59초를 더해줘 전체 초를 구한다.
    const wholeSec = Number(hour) * 60 * 60 + 59 * 60 + 59;

    // 위에서 구한 전체 초만큼 for문을 돌린다.
    // 이때 1초부터 구한 초까지 for문을 돌린다.
    for (let i = 1; i <= wholeSec; i++) {

        // i를 초에 넣어준다
        let sec = i;
        // 시분초 변수를 선언한다.
        let hourStr, minStr, secStr = 0;

        // 먼저 시간만큼 나누고 소수점을 제거하여 있는지 확인한다.
        // 이때 위에서 총 구한 초 / 60 * 60(시간초)로 구한다.
        // 이게 0보다 크면 if문 안에 진입한다.
        if (Math.ceil(sec / (60 * 60))) {
            // hourStr에 위의 식으로 계산한 시간을 넣는다.
            hourStr = Math.ceil(sec / (60 * 60));
            // sec 변수에는 시간초만큼 나누고 남은 나머지 값을 넣어준다.
            sec %= 60 * 60;
        }

        // 먼저 분만큼 나누고 소수점을 제거하여 있는지 확인한다.
        // 이때 위에서 총 구한 초 / 60(분초)로 구한다.
        // 이게 0보다 크면 if문 안에 진입한다.
        if (Math.ceil(sec / 60)) {
            // minStr에 위의 식으로 계산한 시간을 넣는다.
            minStr = Math.ceil(sec / 60);
            // sec 변수에는 분초만큼 나누고 남은 나머지 값을 넣어준다.
            sec %= 60;
        }

        // 위에서 시분초를 나누고 남은 나머지를 초에 넣어준다.
        secStr = sec;

        // 위에서구한 시분초 변수를 템플릿 리터럴로 스트링 형식으로 만들고 3이 포함되면 answer에 +1해준다.
        if (`${hourStr}시 ${minStr}분 ${secStr}초`.includes('3')) {
            answer++;
        }
    }

    /**
     * 풀이2
     */
    // 시간만큼 for문 돌린다
    for (let i = 0; i <= Number(hour); i++) {
        // 그안에 59분 만큼돌린다
        for (let j = 0; j < 60; j++) {
            // 그다음 59초 만큼 돌린다.
            for (let k = 0; k < 60; k++) {
                let str = `${i}시 ${j}분 ${k}초`;
                if (str.includes('3')) {
                    answer2++;
                }
            }
        }
    }

    console.log('answer???', answer)
    console.log('answer2???', answer2)
});
